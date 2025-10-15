public List<RoleDto> getAllRolesWithPermissions(boolean permissions) {
		
		List<RoleDto> roles = roleRepository.findAll()
				.stream()
				.map(vd ->
						RoleDto
						.builder()
						.roleId(vd.getRoleId())
						.roleName(vd.getRoleName())
						.roleStatus(vd.getStatus())
						.description(vd.getStatus())
						.build()).toList();
		
		List<Object[]> rows = rolePermissionRepository.findAllRolesWithPermissionsRaw();

		// Use LinkedHashMap to preserve order
		Map<Integer, RoleDto> roleMap = new LinkedHashMap<>();

		for (Object[] row : rows) {			
			Integer roleId = safeNumberToInteger(row[0]);
			String roleName = safeToString(row[1]);
			String description = safeToString(row[2]);
			String roleStatus = safeToString(row[3]);

			// find or create RoleDto
			RoleDto role = roleMap.computeIfAbsent(roleId, id -> {
				RoleDto r = RoleDto.builder().roleId(id).roleName(roleName).description(description)
						.roleStatus(roleStatus).permissions(new ArrayList<>()).build();
				return r;
			});

			// permission columns may be null (left join)
			if (row[4] != null) {
				Integer menuId = safeNumberToInteger(row[4]);
				String menuTitle = safeToString(row[5]);
				String menuIcon = safeToString(row[6]);
				Integer menuOrder = safeNumberToInteger(row[7]);

				PermissionDto p = PermissionDto.builder().id(menuId).title(menuTitle).icon(menuIcon).order(menuOrder)
						.build();

				role.getPermissions().add(p);
			}
		}

		return new ArrayList<>(roleMap.values());
	}
