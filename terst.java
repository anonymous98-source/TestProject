// import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
public ResponseEntity<ResponseVO<Map<String, Object>>> createNewRequest(Map<String, Object> request) {

    ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
    Map<String, Object> result = new HashMap<>();

    UserRequest savedRequest = null;
    boolean success = false;
    String businessMessage = null;

    try {
        String targetUserId    = request.get("targetUserId").toString();
        String requestorUserId = request.get("requestorUserId").toString();
        String requestType     = request.get("requestType").toString();
        String requestPayload  = request.get("requestPayload").toString();

        // Assuming you have a DTO used for notification (like in your second snippet)
        UserRequestDto dto = objectMapper.convertValue(request, UserRequestDto.class);

        UserRequest userRequest = objectMapper.convertValue(request, UserRequest.class);
        userRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));

        User user = userRepository.findUserByUserId(targetUserId);

        // ---- BUSINESS VALIDATIONS ----
        if (userRequestRepository.countUserPendingRequests(targetUserId) > 0) {

            businessMessage = "There is already a pending request for this user";
            result.put(STATUS, false);
            result.put(MESSAGE, businessMessage);

            responseVo.setStatusCode(HttpStatus.CONFLICT);
            responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

        } else if (requestType.equalsIgnoreCase(Constant.CREATE) && user != null) {

            businessMessage = "User already exists";
            result.put(STATUS, false);
            result.put(MESSAGE, businessMessage);

            responseVo.setStatusCode(HttpStatus.CONFLICT);
            responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

        } else if (!requestType.equalsIgnoreCase(Constant.CREATE) && user == null) {

            businessMessage = "User does not exist";
            result.put(STATUS, false);
            result.put(MESSAGE, businessMessage);

            responseVo.setStatusCode(HttpStatus.CONFLICT);
            responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

        } else {
            // ---- HAPPY PATH: SAVE REQUEST ----
            userRequest.setRequestStatus(Constant.PENDING);
            log.info("User Request: {}", userRequest);

            savedRequest = userRequestRepository.save(userRequest);

            result.put("userRequest", savedRequest);
            result.put(STATUS, true);
            businessMessage = "New request created";

            responseVo.setStatusCode(HttpStatus.CREATED);
            responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());

            success = true;
        }

        // ---- NOTIFICATION (for both success and failure) ----
        // targetId: you were using this in your notification code
        String targetId = targetUserId;
        createRequestNotification(dto, targetId, savedRequest, success, businessMessage);

        responseVo.setResult(result);




// Helper method – called from createNewRequest()
// If this throws, the @Transactional on createNewRequest will roll back everything.
private void createRequestNotification(UserRequestDto dto,
                                       String targetId,
                                       UserRequest savedRequest,
                                       boolean success,
                                       String businessMessage) {

    try {
        // 1. Fetch Config from CACHE/DB
        String requestTypeKey = dto.getRequestType().name(); // e.g., "SEGMENT_CODE"
        log.info("Request Type String to fetch role ids from PERMISSIONS: {}", requestTypeKey);

        NotificationConfigDto config = permissionConfigService.getConfig(requestTypeKey);

        // 2. Build Message
        String action = dto.getChangeType().name(); // ADD, UPDATE, DELETE
        String statusText = success ? "pending" : "failed";

        String message = "New " + action + " request (" + targetId + ") "
                + statusText + " for " + dto.getRequestType()
                + (businessMessage != null ? (": " + businessMessage) : "");

        // 3. Send Notification (group)
        String referenceId = (savedRequest != null) ? savedRequest.getId().toString() : null;

        notificationWriterService.createNotification(
                null,                       // userId is null (targeting a group)
                config.getTargetRoles(),    // "51,55"
                message,
                config.getTargetUrl(),      // e.g. "/segment-requests"
                referenceId,
                EVENT_SOURCE
        );

    } catch (Exception e) {
        Long requestId = (savedRequest != null) ? savedRequest.getId() : null;
        log.error("CRITICAL: Failed to create notification for request: {}. Rolling back transaction.",
                  requestId, e);
        throw new RuntimeException("Failed to create notification event, rolling back request creation.", e);
    }
}
    } catch (IllegalArgumentException e) {

        log.error("Invalid request payload", e);

        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
        responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
        responseVo.setResult(Collections.emptyMap());
    }

    return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
}




