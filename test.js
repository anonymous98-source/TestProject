@SuppressWarnings("unchecked")
	public ResponseEntity createNewRoleRequest(Map<String, Object> request) {
		ResponseVO responseVo = new ResponseVO();
		Map<String, Object> result = new HashMap<>();
		try {

			String[] requestParameters = { "requestType", "requestPayload", "targetRoleId", "requestorUserId" };

			if (RequestUtility.verifyRequest(request, requestParameters)) {
				result.put(STATUS, false);
				result.put(MESSAGE, "Invalid Request");

				return new ResponseEntity(responseVo, responseVo.getStatusCode());
			}

			RoleRequest roleRequest = objectMapper.convertValue(request, RoleRequest.class);
			roleRequest.setRequestStatus(Constant.PENDING);
			roleRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));
			int roleId = roleRequest.getTargetRoleId();
			String roleName = (String) request.get("roleName");
			log.info("Role id {}", roleId);
			String requestorUserId = roleRequest.getRequestorUserId();
			String requestPayload = roleRequest.getRequestPayload();
			String requestFlag = request.get("requestType").toString();

			if ((roleRepository.findRoleByRoleId(roleId) != null) && requestFlag.equalsIgnoreCase(Constant.CREATE)) {
				log.info("Create, already exists");
				result.put(STATUS, false);
				result.put(MESSAGE, "There is already a role with that id.");
			} else if ((roleRepository.findRoleByRoleId(roleId) != null) && requestFlag.equals(Constant.CREATE)) {
				log.info("Create, already exists");
				result.put(STATUS, false);
				result.put(MESSAGE, "The role already exists.");
			} else if (roleRequestRepository.countPendingRoleRequests(roleId) > 0
					&& !requestFlag.equals(Constant.CREATE)) {

				result.put(STATUS, false);
				result.put(MESSAGE, "There is already a pending request for this role");

			} else if (roleRequestRepository.countPendingRoleRequestsByRoleName(roleName.toLowerCase()) > 0
					&& requestFlag.equals(Constant.CREATE)) {
				result.put(STATUS, false);
				result.put(MESSAGE, "There is already a role cration request pending for this role");
			} else {
				if (requestFlag.equals(Constant.CREATE)) {
					roleRequest.setTargetRoleId(roleRequestRepository.getNewRoleIdOnCreation());
				}
				roleRequestRepository.save(roleRequest);
				result.put("roleRequest", roleRequest);
				result.put(STATUS, true);
				result.put(MESSAGE, "New request created");
				responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CREATED.value()));
				responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());

			}
			responseVo.setResult(result);

		} catch (IllegalArgumentException e) {

			responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
			responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());

		}

		return new ResponseEntity(responseVo, responseVo.getStatusCode());
	}
