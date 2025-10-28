if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
			Role role = roleRepository.findRoleByRoleId(roleRequest.getTargetRoleId());
			roleRequest.setRequestStatus(Constant.ACCEPTED);
			if (role == null && !(requestFlag.equalsIgnoreCase(
					Constant.CREATE))) { /* The user id we are trying to modify/lock/unlock/delete is not present */
				result.put(STATUS, false);
				result.put(MESSAGE, "Role not found");
			} else if (role != null && (requestFlag
					.equalsIgnoreCase(Constant.CREATE))) { /* The user id we are trying to create is already present */
				result.put(STATUS, false);
				result.put(MESSAGE, "User already present");
			} else if (requestFlag.equalsIgnoreCase(Constant.CREATE) || requestFlag.equalsIgnoreCase(Constant.MODIFY)) {

				if (requestFlag.equalsIgnoreCase(Constant.CREATE)) {
					role = new Role();
				}
				Map roleMap = null;
				try {
					roleMap = objectMapper.readValue(roleRequest.getRequestPayload(),
							new TypeReference<Map<String, Object>>() {
							});
				} catch (JsonProcessingException e) {
					throw new RuntimeException(e);
				}
				role.setRoleName(roleMap.get("roleName").toString());
				role.setDescription(roleMap.get("description").toString());
				roleRepository.save(role);
				result.put(STATUS, true);
				result.put(MESSAGE, requestFlag.equalsIgnoreCase("CREATE") ? "USER CREATED" : " USER UPDATED");
				roleRequestRepository.save(roleRequest);

			} else if (requestFlag.equalsIgnoreCase(Constant.LOCK) || requestFlag.equalsIgnoreCase(Constant.UNLOCK)) {
				role.setStatus(requestFlag.equalsIgnoreCase(Constant.UNLOCK) ? "ACTIVE" : "LOCKED");
				roleRepository.save(role);
				result.put(STATUS, true);
				result.put(MESSAGE, requestFlag.equalsIgnoreCase("UNLOCK") ? "USER UNLOCKED" : " USER LOCKED");
				roleRequestRepository.save(roleRequest);
			} else if (requestFlag.equalsIgnoreCase(Constant.DELETE)) {
				try {
					roleRepository.delete(role);
					result.put(STATUS, true);
					result.put(MESSAGE, "User Deleted");
					roleRequestRepository.save(roleRequest);
				} catch (Exception e) {
					result.put(STATUS, false);
					result.put(MESSAGE, e.getMessage());
				}

			} else {
				result.put(STATUS, false);
				result.put(MESSAGE, "Invalid Action Flag");

			}

		} else {
			roleRequest.setRequestStatus("REJECTED");
			roleRequestRepository.save(roleRequest);
			result.put(STATUS, true);
			result.put(MESSAGE, "User request rejected");

		}
