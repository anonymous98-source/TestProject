Here’s a clean, optimized, and properly refactored version of your getAllRolesWithPermissions method — which returns only basic roles if permissions == false, or returns roles with their permissions if permissions == true.

✅ Changes made:

Eliminated redundant code execution when permissions is false.

Clear separation of logic for performance.

Preserved immutability and clean coding principles.

Used consistent naming and builder usage.



---

✅ Refactored Code

public List<RoleDto> getAllRolesWithPermissions(boolean permissions) {

    // Case 1: If permissions flag is false, just return basic role details
    if (!permissions) {
        return roleRepository.findAll()
                .stream()
                .map(role -> RoleDto.builder()
                        .roleId(role.getRoleId())
                        .roleName(role.getRoleName())
                        .roleStatus(role.getStatus())
                        .description(role.getDescription())
                        .build())
                .toList();
    }

    // Case 2: If permissions flag is true, return roles with permission details
    List<Object[]> rows = rolePermissionRepository.findAllRolesWithPermissionsRaw();
    Map<Integer, RoleDto> roleMap = new LinkedHashMap<>();

    for (Object[] row : rows) {
        Integer roleId = safeNumberToInteger(row[0]);
        String roleName = safeToString(row[1]);
        String description = safeToString(row[2]);
        String roleStatus = safeToString(row[3]);

        RoleDto role = roleMap.computeIfAbsent(roleId, id ->
                RoleDto.builder()
                        .roleId(id)
                        .roleName(roleName)
                        .description(description)
                        .roleStatus(roleStatus)
                        .permissions(new ArrayList<>())
                        .build()
        );

        // Add permission only if present
        if (row[4] != null) {
            Integer menuId = safeNumberToInteger(row[4]);
            String menuTitle = safeToString(row[5]);
            String menuIcon = safeToString(row[6]);
            Integer menuOrder = safeNumberToInteger(row[7]);

            PermissionDto permission = PermissionDto.builder()
                    .id(menuId)
                    .title(menuTitle)
                    .icon(menuIcon)
                    .order(menuOrder)
                    .build();

            role.getPermissions().add(permission);
        }
    }

    return new ArrayList<>(roleMap.values());
}


---

🧠 Explanation:

If permissions == false → returns list from roleRepository.findAll() without hitting rolePermissionRepository (faster).

If permissions == true → joins permissions data and builds nested structure.

Used LinkedHashMap to maintain order of roles as in the result set.

Preserved builder pattern for clarity and immutability.



---

Would you like me to also make it return a sorted list of permissions (e.g., by menuOrder) within each role for better UI consistency?

