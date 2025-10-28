// Tip: mark the class @Service and the method @Transactional if appropriate.
public ResponseEntity<ResponseVO> createNewRoleRequest(final Map<String, Object> request) {
    final ResponseVO responseVo = new ResponseVO();
    final Map<String, Object> result = new HashMap<>();

    // 1) Basic request validation (return early)
    final String[] required = { "requestType", "requestPayload", "targetRoleId", "requestorUserId" };
    if (RequestUtility.verifyRequest(request, required)) { // assuming 'true' means invalid, as in your code
        result.put(STATUS, false);
        result.put(MESSAGE, "Invalid request.");
        responseVo.setResult(result);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
        responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseVo);
    }

    // 2) Parse payload safely
    final RoleRequest roleRequest;
    try {
        roleRequest = objectMapper.convertValue(request, RoleRequest.class);
    } catch (IllegalArgumentException ex) {
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
        responseVo.setMessage("Malformed request payload.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseVo);
    }

    // 3) Canonicalize inputs
    roleRequest.setRequestStatus(Constant.PENDING);
    roleRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));

    final String requestFlag = String.valueOf(request.get("requestType"));
    final boolean isCreate = Constant.CREATE.equalsIgnoreCase(requestFlag);

    final int targetRoleId = roleRequest.getTargetRoleId();
    final String roleName = String.valueOf(request.get("roleName")); // might be null; your existing code allowed it
    final String requestorUserId = roleRequest.getRequestorUserId();
    final String requestPayload = roleRequest.getRequestPayload();

    log.info("Role request: flag={}, targetRoleId={}, roleName={}, requestorUserId={}",
            requestFlag, targetRoleId, roleName, requestorUserId);

    // 4) Fetch things once (avoid duplicate repository hits)
    final var existingRole = roleRepository.findRoleByRoleId(targetRoleId);
    final long pendingById = isCreate ? 0L : roleRequestRepository.countPendingRoleRequests(targetRoleId);
    final long pendingByName = isCreate && roleName != null
            ? roleRequestRepository.countPendingRoleRequestsByRoleName(roleName.toLowerCase())
            : 0L;

    // 5) Business rules (return early on failure)
    if (isCreate && existingRole != null) {
        log.info("Create denied: role with id {} already exists", targetRoleId);
        result.put(STATUS, false);
        result.put(MESSAGE, "A role with this ID already exists.");
        responseVo.setResult(result);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CONFLICT.value()));
        responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseVo);
    }

    if (!isCreate && pendingById > 0) {
        result.put(STATUS, false);
        result.put(MESSAGE, "There is already a pending request for this role.");
        responseVo.setResult(result);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CONFLICT.value()));
        responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseVo);
    }

    if (isCreate && pendingByName > 0) {
        result.put(STATUS, false);
        result.put(MESSAGE, "There is already a role creation request pending for this role.");
        responseVo.setResult(result);
        responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CONFLICT.value()));
        responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseVo);
    }

    // 6) Finalize and persist
    if (isCreate) {
        // if your DB uses sequences/identity, consider letting JPA assign; keeping your behavior here
        roleRequest.setTargetRoleId(roleRequestRepository.getNewRoleIdOnCreation());
    }

    roleRequestRepository.save(roleRequest);

    result.put("roleRequest", roleRequest);
    result.put(STATUS, true);
    result.put(MESSAGE, "New request created.");
    responseVo.setResult(result);
    responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.CREATED.value()));
    responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());

    return ResponseEntity.status(HttpStatus.CREATED).body(responseVo);
}