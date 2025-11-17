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

        }

        return new ResponseEntity(responseVo,responseVo.getStatusCode());
    }
