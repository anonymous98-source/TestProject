@Transactional(rollbackFor = Exception.class)
public ResponseEntity<ResponseVO<Map<String, Object>>> createNewRequest(Map<String, Object> request) {
    ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
    Map<String, Object> result = new HashMap<>();

    UserRequest savedRequest = null;
    UserRequestDto dto = null;
    String targetUserId = null;

    try {
        // 1. Parse + map input
        dto = objectMapper.convertValue(request, UserRequestDto.class);

        targetUserId = request.get("targetUserId").toString();
        String requestType = request.get("requestType").toString();

        UserRequest userRequest = objectMapper.convertValue(request, UserRequest.class);
        userRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));

        // 2. Fetch current user state
        User user = userRepository.findUserByUserId(targetUserId);

        // 3. Business validation
        if (userRequestRepository.countUserPendingRequests(targetUserId) > 0) {
            // Already pending request
            setConflictResult(result, "There is already a pending request for this user", responseVo);
        } else if (requestType.equalsIgnoreCase(Constant.CREATE) && user != null) {
            // Trying to create existing user
            setConflictResult(result, "User already exists", responseVo);
        } else if (!requestType.equalsIgnoreCase(Constant.CREATE) && user == null) {
            // Trying to modify non-existing user
            setConflictResult(result, "User does not exist", responseVo);
        } else {
            // 4. Happy path – save userRequest
            userRequest.setRequestStatus(Constant.PENDING);
            log.info("User Request: {}", userRequest);

            savedRequest = userRequestRepository.save(userRequest);

            result.put("userRequest", savedRequest);
            result.put(STATUS, true);
            result.put(MESSAGE, "New request created");

            responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CREATED.value()));
            responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());
        }

        // 5. Notification (for both success + business failure)
        boolean success = Boolean.TRUE.equals(result.get(STATUS));
        String message = (String) result.getOrDefault(MESSAGE, "No message");
        createRequestNotification(dto, targetUserId, savedRequest, success, message, "PENDING");

        responseVo.setResult(result);

    } catch (IllegalArgumentException e) {
        log.error("Invalid request payload", e);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
        responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
        responseVo.setResult(Collections.emptyMap());
    }

    return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
}

/**
 * Small helper to avoid repeating conflict response setup.
 */
private void setConflictResult(Map<String, Object> result,
                               String message,
                               ResponseVO<Map<String, Object>> responseVo) {
    result.put(STATUS, false);
    result.put(MESSAGE, message);
    responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CONFLICT.value()));
    responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
}


-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*



@Transactional(rollbackFor = Exception.class)
public ResponseEntity<ResponseVO<Map<String, Object>>> acceptOrRejectUserRequest(UserRequestDto userRequestDto,
                                                                                String ipAddress) {
    ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
    Map<String, Object> result = new HashMap<>();

    String actionFlag = userRequestDto.getActionFlag();
    String approverUserId = userRequestDto.getApproverUserId();

    long requestId = userRequestDto.getRequestId();
    UserRequest userRequest = userRequestRepository.findUserRequestsByRequestId(requestId);

    userRequest.setApproverUserId(approverUserId);
    userRequest.setApprovalDate(new Timestamp(System.currentTimeMillis()));

    String requestFlag = userRequest.getRequestType();

    if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
        handleAcceptFlow(userRequestDto, ipAddress, userRequest, requestFlag, result);
    } else if (actionFlag.equalsIgnoreCase(Constant.REJECT)) {
        handleRejectFlow(userRequestDto, userRequest, result);
    } else {
        result.put("status", false);
        result.put("message", "Invalid action flag");
    }

    // Final request status only when ACCEPT and business success
    if (actionFlag.equalsIgnoreCase(Constant.ACCEPT) && Boolean.TRUE.equals(result.get("status"))) {
        userRequest.setRequestStatus(Constant.ACCEPTED);
        userRequestRepository.save(userRequest);
    }

    // ---------- Notification ----------
    boolean success = Boolean.TRUE.equals(result.get("status"));
    String infoMessage = (String) result.getOrDefault("message", "No message");
    createRequestNotification(userRequestDto,
                              userRequest.getTargetUserId(),
                              userRequest,
                              success,
                              infoMessage,
                              actionFlag);
    // ----------------------------------

    responseVo.setResult(result);
    responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.OK.value()));
    responseVo.setMessage(HttpStatus.OK.getReasonPhrase());
    return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
}

/**
 * Handles the ACCEPT path: create/modify/lock/unlock/delete.
 */
private void handleAcceptFlow(UserRequestDto userRequestDto,
                              String ipAddress,
                              UserRequest userRequest,
                              String requestFlag,
                              Map<String, Object> result) {

    String approverUserId = userRequestDto.getApproverUserId();
    long requestId = userRequestDto.getRequestId();

    // Init audit log (only meaningful when change actually happens)
    AuditLog newLog = new AuditLog();
    newLog.setRequestId(requestId);
    newLog.setUserId(approverUserId);
    newLog.setOldValue(userRequestDto.getOldValue());
    newLog.setChangeType(Constant.USER);
    newLog.setActionType(Constant.USER + requestFlag + "ED");
    newLog.setNewValue(userRequest.getRequestPayload());
    newLog.setIpAddress(ipAddress);

    User user = userRepository.findUserByUserId(userRequest.getTargetUserId());

    if (user == null && !(requestFlag.equalsIgnoreCase(Constant.CREATE))) {
        result.put("status", false);
        result.put("message", "User not found");
        return;
    }

    if (user != null && (requestFlag.equalsIgnoreCase(Constant.CREATE))) {
        result.put("status", false);
        result.put("message", "User already present");
        return;
    }

    if (requestFlag.equalsIgnoreCase(Constant.MODIFY) || requestFlag.equals(Constant.CREATE)) {
        handleCreateOrModifyUser(userRequest, requestFlag, user, result);
    } else if (requestFlag.equalsIgnoreCase(Constant.LOCK) || requestFlag.equalsIgnoreCase(Constant.UNLOCK)) {
        handleLockUnlockUser(requestFlag, user, result);
    } else if (requestFlag.equalsIgnoreCase("D")) {
        handleDeleteUser(user, result);
    } else {
        result.put("status", false);
        result.put("message", "Invalid request flag");
    }
}

private void handleRejectFlow(UserRequestDto userRequestDto,
                              UserRequest userRequest,
                              Map<String, Object> result) {
    userRequest.setRequestStatus(Constant.REJECTED);
    userRequest.setReasonForRejection(userRequestDto.getRemarks());
    userRequestRepository.save(userRequest);

    result.put("status", true);
    result.put("message", "User request rejected");
}

/**
 * CREATE / MODIFY logic for User + UserRole.
 */
private void handleCreateOrModifyUser(UserRequest userRequest,
                                      String requestFlag,
                                      User user,
                                      Map<String, Object> result) {
    if (requestFlag.equals(Constant.CREATE)) {
        user = new User();
        user.setAccountStatus(Constant.ACTIVE);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        user.setIsDeleted('N');
        user.setUserWrongPasswordCount(0);
    }

    try {
        Map<String, Object> userMap = objectMapper.readValue(
                userRequest.getRequestPayload(),
                new TypeReference<Map<String, Object>>() {}
        );

        applyUserPayloadToEntity(user, userRequest, userMap);
        userRepository.save(user);

        UserRole userRole = userRoleRepository.getUserRolesByUserId(userRequest.getTargetUserId());
        if (userRole == null) {
            userRole = new UserRole();
        }
        userRole.setUserId(userMap.get("userId").toString());
        userRole.setRoleId(Integer.parseInt(userMap.get("roleId").toString()));
        userRoleRepository.save(userRole);

        result.put("status", true);
        result.put("message", requestFlag.equalsIgnoreCase(Constant.CREATE)
                ? "USER CREATED"
                : "USER UPDATED");

    } catch (JsonProcessingException e) {
        result.put("status", false);
        result.put("message", e.getMessage());
    }
}

/**
 * LOCK / UNLOCK logic.
 */
private void handleLockUnlockUser(String requestFlag,
                                  User user,
                                  Map<String, Object> result) {
    user.setAccountStatus(requestFlag.equalsIgnoreCase(Constant.UNLOCK)
            ? Constant.ACTIVE
            : Constant.LOCKED);

    userRepository.save(user);
    result.put("status", true);
    result.put("message", requestFlag.equalsIgnoreCase(Constant.UNLOCK)
            ? "USER UNLOCKED"
            : "USER LOCKED");
}

/**
 * DELETE logic.
 */
private void handleDeleteUser(User user,
                              Map<String, Object> result) {
    try {
        userRepository.delete(user);
        result.put("status", true);
        result.put("message", "User deleted successfully");
    } catch (Exception e) {
        result.put("status", false);
        result.put("message", "Failed to delete user");
    }
}

/**
 * Maps JSON payload -> User entity fields.
 */
private void applyUserPayloadToEntity(User user,
                                      UserRequest userRequest,
                                      Map<String, Object> userMap) {
    user.setUserId(userRequest.getTargetUserId());
    user.setFirstName(Objects.toString(userMap.get("firstName"), null));
    user.setMiddleName(Objects.toString(userMap.get("middleName"), null));
    user.setLastName(Objects.toString(userMap.get("lastName"), null));
    user.setEmail(userMap.get("email").toString());
    user.setPhoneNumber(userMap.get("phoneNumber").toString());
    user.setBranch(Integer.parseInt(userMap.get("branch").toString()));
    user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
}


-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


private void createRequestNotification(UserRequestDto dto,
                                       String targetId,
                                       UserRequest savedRequest,
                                       boolean success,
                                       String infoMessage,
                                       String actionFlag) {
    try {
        String requestTypeKey = dto.getRequestType().name(); // e.g. "USER_CREATE"
        log.info("Request Type String to fetch role ids from PERMISSIONS: {}", requestTypeKey);

        NotificationConfigDto config = permissionConfigService.getConfig(requestTypeKey);

        String statusText;
        if ("PENDING".equalsIgnoreCase(actionFlag)) {
            statusText = success ? "PENDING" : "FAILED";
        } else if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
            statusText = success ? "APPROVED" : "FAILED";
        } else if (actionFlag.equalsIgnoreCase(Constant.REJECT)) {
            statusText = "REJECTED";
        } else {
            statusText = "UNKNOWN";
        }

        String message = "[" + statusText + "] " + dto.getRequestType()
                + " request for " + targetId
                + " - " + infoMessage;

        String referenceId = (savedRequest != null && savedRequest.getId() != null)
                ? savedRequest.getId().toString()
                : String.valueOf(dto.getRequestId());

        notificationWriterService.createNotification(
                null,                       // group notification
                config.getTargetRoles(),    // e.g. "51,55"
                message,
                config.getTargetUrl(),      // e.g. "/user-requests"
                referenceId,
                EVENT_SOURCE
        );

    } catch (Exception e) {
        log.error("CRITICAL: Failed to create notification for request: {}. Rolling back transaction.",
                dto.getRequestId(), e);
        throw new RuntimeException("Failed to create notification event, rolling back.", e);
    }
}