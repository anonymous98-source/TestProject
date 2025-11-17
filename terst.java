public ResponseEntity<ResponseVO<Map<String, Object>>> acceptOrRejectUserRequest(UserRequestDto userRequestDto, String ipAddress) {
        ResponseVO<Map<String, Object>> responseVo = new ResponseVO();
        Map<String, Object> result = new HashMap<>();
        String actionFlag = userRequestDto.getActionFlag();
        String approverUserId = userRequestDto.getApproverUserId();

        long requestId = userRequestDto.getRequestId();
        UserRequest userRequest = userRequestRepository.findUserRequestsByRequestId(requestId);
        userRequest.setApproverUserId(approverUserId);
        userRequest.setApprovalDate(new Timestamp(System.currentTimeMillis()));
        String requestFlag = userRequest.getRequestType();


        if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
            /*Initalizing log - save log only when a change is performed on  master table( i.e, when a request is accepted) */
            AuditLog newLog = new AuditLog();
            newLog.setRequestId(requestId);
            newLog.setUserId(approverUserId);
            newLog.setOldValue(userRequestDto.getOldValue());
            newLog.setChangeType(Constant.USER);
            newLog.setActionType(Constant.USER + requestFlag + "ED");
            newLog.setNewValue(userRequest.getRequestPayload());
            newLog.setIpAddress(ipAddress);
            User user = userRepository.findUserByUserId(userRequest.getTargetUserId());

            if (user == null && !(requestFlag.equalsIgnoreCase(Constant.CREATE))) {   /*The user id we are trying to modify/lock/unlock/delete is not present*/
                result.put("status", false);
                result.put("message", "User not found");
            } else if (user != null && (requestFlag.equalsIgnoreCase(Constant.CREATE))) {   /*The user id we are trying to create is already present*/
                result.put("status", false);
                result.put("message", "User already present");
            } else if (requestFlag.equalsIgnoreCase(Constant.MODIFY) || requestFlag.equals(Constant.CREATE)) {

                if (requestFlag.equals(Constant.CREATE)) {
                    user = new User();
                    user.setAccountStatus(Constant.ACTIVE);
                    user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
                    user.setIsDeleted('N');
                    user.setUserWrongPasswordCount(0);
                }

                Map userMap = null;
                try {
                    userMap = objectMapper.readValue(userRequest.getRequestPayload(), new TypeReference<Map<String, Object>>() {
                    });

                    user.setUserId(userRequest.getTargetUserId());
                    user.setFirstName(Objects.toString(userMap.get("firstName"), null));
                    user.setMiddleName(Objects.toString(userMap.get("middleName"), null));
                    user.setLastName(Objects.toString(userMap.get("lastName"), null));
                    user.setEmail(userMap.get("email").toString());
                    user.setPhoneNumber(userMap.get("phoneNumber").toString());
                    user.setBranch(Integer.parseInt(userMap.get("branch").toString()));
                    user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
                    userRepository.save(user);
                    UserRole userRole = userRoleRepository.getUserRolesByUserId(userRequest.getTargetUserId());
                    if (userRole == null) {
                        userRole = new UserRole();
                    }
                    userRole.setUserId(userMap.get("userId").toString());
                    userRole.setRoleId(Integer.parseInt(userMap.get("roleId").toString()));
                    userRoleRepository.save(userRole);
                    result.put("status", true);

                    result.put("message", requestFlag.equalsIgnoreCase(Constant.CREATE) ? "USER CREATED" : " USER UPDATED");
                } catch (JsonProcessingException e) {
                    result.put("status", false);
                    result.put("message", e.getMessage());
                }

            } else if (requestFlag.equalsIgnoreCase(Constant.LOCK) || requestFlag.equalsIgnoreCase(Constant.UNLOCK)) {
                user.setAccountStatus(requestFlag.equalsIgnoreCase(Constant.UNLOCK) ? Constant.ACTIVE : Constant.LOCKED);

                userRepository.save(user);
                result.put("status", true);
                result.put("message", requestFlag.equalsIgnoreCase(Constant.UNLOCK) ? "USER UNLOCKED" : " USER LOCKED");
            } else if (requestFlag.equalsIgnoreCase("D")) {

                try {
                    userRepository.delete(user);
                    result.put("status", true);
                    result.put("message", "User deleted successfully");
                } catch (Exception e) {
                    result.put("status", false);
                    result.put("message", "Failed to delete user");
                }

            } else {
                result.put("status", false);
                result.put("message", "Invalid request flag");
            }


        } else if (actionFlag.equalsIgnoreCase(Constant.REJECT)) {
            userRequest.setRequestStatus(Constant.REJECTED);
            userRequest.setReasonForRejection(userRequestDto.getRemarks());
            result.put("status", true);
            result.put("message", "User request rejected");
            userRequestRepository.save(userRequest);
        } else {
            result.put("status", false);
            result.put("message", "Invalid action flag");
        }

        if (!(result.get("status") == null || result.get("status") == Boolean.FALSE)) {
            userRequest.setRequestStatus(Constant.ACCEPTED);
            userRequestRepository.save(userRequest);
        }


        responseVo.setResult(result);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.OK.value()));
        responseVo.setMessage(HttpStatus.OK.getReasonPhrase());
        return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
    }
