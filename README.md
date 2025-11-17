public ResponseEntity<ResponseVO<Map<String,Object>>> createNewRequest(Map<String,Object> request)
    {    ResponseVO responseVo = new ResponseVO();

        try{

           Map<String,Object> result = new HashMap<>();
            String targetUserId = request.get("targetUserId").toString();
            String requestorUserId = request.get("requestorUserId").toString();
            String requestType = request.get("requestType").toString();
            String requestPayload = request.get("requestPayload").toString();
           UserRequest userRequest = objectMapper.convertValue(request, UserRequest.class);
           userRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));

            User user = userRepository.findUserByUserId(targetUserId);

            if(userRequestRepository.countUserPendingRequests(targetUserId)>0)
            {
               result.put(STATUS, false);
               result.put(MESSAGE, "There is already a pending request for this user");
               responseVo.setStatusCode(HttpStatus.CONFLICT);
               responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
            }
            else if ((requestType.equalsIgnoreCase(Constant.CREATE)) && (user!=null) ) {

                result.put(STATUS, false);
                result.put(MESSAGE, "User already exists");
                responseVo.setStatusCode(HttpStatus.CONFLICT);
                responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
            }
            else if((!requestType.equalsIgnoreCase(Constant.CREATE)) && (user==null) )
            {
                result.put(STATUS, false);
                result.put(MESSAGE, "User does not exist");
                responseVo.setStatusCode(HttpStatus.CONFLICT);
                responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
            }

            else{
            	
            	userRequest.setRequestStatus(Constant.PENDING);
            	log.info("User Request:{}",userRequest);
            	userRequestRepository.save(userRequest);

                result.put("userRequest",userRequest);
                result.put(STATUS,true);
                result.put(MESSAGE, "New request created");
                responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CREATED.value()));
                responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());

            }
            responseVo.setResult(result);




        }
        catch (IllegalArgumentException  e)
        {

            responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());




--------------------------------------------------------------------------------------------------------------------------------------------------------


try {
            // --- NOTIFICATION LOGIC ---

            // 1. Fetch Config from CACHE (Fast)
            String requestTypeKey = dto.getRequestType().name(); // e.g., "SEGMENT_CODE"
            log.info("Request Type String to fetch role ids from PERMISSIONS: {}", requestTypeKey);

            NotificationConfigDto config = permissionConfigService.getConfig(requestTypeKey);

            // 2. Customize Message
            String action = dto.getChangeType().name(); // ADD, UPDATE, DELETE
            String message = "New " + action + " request (" + targetId + ") pending for " + dto.getRequestType();

            // 3. Send to Group (1-to-Many via Outbox)
            notificationWriterService.createNotification(
                    null,                       // userId is null (we are targeting a group)
                    config.getTargetRoles(),    // "51,55" (Fetched from Cache/DB)
                    message,
                    config.getTargetUrl(),      // "/segment-requests" (Fetched from Cache/DB)
                    savedRequest.getId().toString(),
                    EVENT_SOURCE
            );

        } catch (Exception e) {
            // Log the error and re-throw as a RuntimeException to force a rollback.
            log.error("CRITICAL: Failed to create 'pending' notification for request: {}. Rolling back transaction.", savedRequest.getId(), e);
            throw new RuntimeException("Failed to create notification event, rolling back request creation.", e);
        }

        }

        return new ResponseEntity(responseVo,responseVo.getStatusCode());
    }
