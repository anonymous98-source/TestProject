@Override
public ResponseEntity<ResponseVO<List<PermissionDto>>> getAllPermissions() {
    ResponseVO<List<PermissionDto>> responseVo = new ResponseVO<>();

    List<Permission> permissions = permissionsRepository.findAll();

    // Handle empty list first
    if (permissions == null || permissions.isEmpty()) {
        responseVo.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
        responseVo.setStatusCode(HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(responseVo, HttpStatus.NOT_FOUND);
    }

    // Map entities to DTOs using builder
    List<PermissionDto> permissionDtos = permissions.stream()
            .map(p -> PermissionDto.builder()
                    .id(p.getMenuId())
                    .title(p.getMenuTitle())
                    .icon(p.getMenuIcon())
                    .order(p.getMenuOrder())
                    .url(p.getMenuUrl())
                    .component(p.getMenuComponentPath())
                    .build())
            .toList(); // ✅ Java 16+ (use collect(Collectors.toList()) if lower)

    // Build final response
    responseVo.setMessage(HttpStatus.FOUND.getReasonPhrase());
    responseVo.setResult(permissionDtos);
    responseVo.setStatusCode(HttpStatus.FOUND.value());

    return new ResponseEntity<>(responseVo, HttpStatus.FOUND);
}