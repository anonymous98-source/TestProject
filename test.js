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


optimise this if else code block

This code block can be optimized by refactoring redundant condition checks, reducing nesting, and using early returns to clarify logic. The main improvements include grouping similar logic, avoiding repeated variable assignments, and extracting common actions. Here’s an optimized version with cleaner structure and readability:

```java
if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
    Role role = roleRepository.findRoleByRoleId(roleRequest.getTargetRoleId());
    roleRequest.setRequestStatus(Constant.ACCEPTED);

    // Check presence for MODIFY, LOCK, UNLOCK, DELETE
    boolean isCreate = requestFlag.equalsIgnoreCase(Constant.CREATE);
    boolean isModify = requestFlag.equalsIgnoreCase(Constant.MODIFY);
    boolean isLock = requestFlag.equalsIgnoreCase(Constant.LOCK);
    boolean isUnlock = requestFlag.equalsIgnoreCase(Constant.UNLOCK);
    boolean isDelete = requestFlag.equalsIgnoreCase(Constant.DELETE);

    if (role == null && !isCreate) {
        result.put(STATUS, false);
        result.put(MESSAGE, "Role not found");
        return result;
    }
    if (role != null && isCreate) {
        result.put(STATUS, false);
        result.put(MESSAGE, "User already present");
        return result;
    }

    if (isCreate || isModify) {
        if (isCreate) role = new Role();

        try {
            Map<String, Object> roleMap = objectMapper.readValue(roleRequest.getRequestPayload(), new TypeReference<Map<String, Object>>() {});
            role.setRoleName(String.valueOf(roleMap.get("roleName")));
            role.setDescription(String.valueOf(roleMap.get("description")));
            roleRepository.save(role);

            result.put(STATUS, true);
            result.put(MESSAGE, isCreate ? "USER CREATED" : "USER UPDATED");
            roleRequestRepository.save(roleRequest);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    if (isLock || isUnlock) {
        role.setStatus(isUnlock ? "ACTIVE" : "LOCKED");
        roleRepository.save(role);

        result.put(STATUS, true);
        result.put(MESSAGE, isUnlock ? "USER UNLOCKED" : "USER LOCKED");
        roleRequestRepository.save(roleRequest);
        return result;
    }

    if (isDelete) {
        try {
            roleRepository.delete(role);
            result.put(STATUS, true);
            result.put(MESSAGE, "User Deleted");
            roleRequestRepository.save(roleRequest);
        } catch (Exception e) {
            result.put(STATUS, false);
            result.put(MESSAGE, e.getMessage());
        }
        return result;
    }

    result.put(STATUS, false);
    result.put(MESSAGE, "Invalid Action Flag");
    return result;

} else {
    roleRequest.setRequestStatus("REJECTED");
    roleRequestRepository.save(roleRequest);
    result.put(STATUS, true);
    result.put(MESSAGE, "User request rejected");
    return result;
}
```

### Key Optimizations
- Uses boolean flags to avoid repetitive `equalsIgnoreCase` calls.
- Applies **early returns** to minimize nesting and improve clarity.
- Consolidates logic for create/modify and lock/unlock actions.
- Handles exceptions only where needed.
- Keeps all status updates and result assignments in one spot for each branch.

This widens code maintainability and readability and avoids unnecessary computation.



if (actionFlag.equalsIgnoreCase(Constant.ACCEPT)) {
    Role role = roleRepository.findRoleByRoleId(roleRequest.getTargetRoleId());
    roleRequest.setRequestStatus(Constant.ACCEPTED);

    // Check presence for MODIFY, LOCK, UNLOCK, DELETE
    boolean isCreate = requestFlag.equalsIgnoreCase(Constant.CREATE);
    boolean isModify = requestFlag.equalsIgnoreCase(Constant.MODIFY);
    boolean isLock = requestFlag.equalsIgnoreCase(Constant.LOCK);
    boolean isUnlock = requestFlag.equalsIgnoreCase(Constant.UNLOCK);
    boolean isDelete = requestFlag.equalsIgnoreCase(Constant.DELETE);

    if (role == null && !isCreate) {
        result.put(STATUS, false);
        result.put(MESSAGE, "Role not found");
        return result;
    }
    if (role != null && isCreate) {
        result.put(STATUS, false);
        result.put(MESSAGE, "User already present");
        return result;
    }

    if (isCreate || isModify) {
        if (isCreate) role = new Role();

        try {
            Map<String, Object> roleMap = objectMapper.readValue(roleRequest.getRequestPayload(), new TypeReference<Map<String, Object>>() {});
            role.setRoleName(String.valueOf(roleMap.get("roleName")));
            role.setDescription(String.valueOf(roleMap.get("description")));
            roleRepository.save(role);

            result.put(STATUS, true);
            result.put(MESSAGE, isCreate ? "USER CREATED" : "USER UPDATED");
            roleRequestRepository.save(roleRequest);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    if (isLock || isUnlock) {
        role.setStatus(isUnlock ? "ACTIVE" : "LOCKED");
        roleRepository.save(role);

        result.put(STATUS, true);
        result.put(MESSAGE, isUnlock ? "USER UNLOCKED" : "USER LOCKED");
        roleRequestRepository.save(roleRequest);
        return result;
    }

    if (isDelete) {
        try {
            roleRepository.delete(role);
            result.put(STATUS, true);
            result.put(MESSAGE, "User Deleted");
            roleRequestRepository.save(roleRequest);
        } catch (Exception e) {
            result.put(STATUS, false);
            result.put(MESSAGE, e.getMessage());
        }
        return result;
    }

    result.put(STATUS, false);
    result.put(MESSAGE, "Invalid Action Flag");
    return result;

} else {
    roleRequest.setRequestStatus("REJECTED");
    roleRequestRepository.save(roleRequest);
    result.put(STATUS, true);
    result.put(MESSAGE, "User request rejected");
    return result;
}