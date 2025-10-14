Excellent — I see exactly what you’re doing 👌

You’re fetching permissions from your repository (permissionsRepository.findAll()), which returns a List of Permission entities, and now you want to convert that list into a List of PermissionDto objects using the Builder pattern you defined earlier.

Let’s go step by step 👇


---

✅ 1️⃣ Your existing setup

You already have:

Entity → Permission.java

@Entity
@Table(name = "PERMISSIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {
    @Id
    @Column(name = "MENU_ID")
    private Integer menuId;

    @Column(name = "MENU_TITLE")
    private String menuTitle;

    @Column(name = "MENU_ICON")
    private String menuIcon;

    @Column(name = "MENU_ORDER")
    private Integer menuOrder;
    
    @Column(name = "MENU_URL")
    private String menuUrl;

    @Column(name = "MENU_COMPONENT_PATH")
    private String menuComponentPath;
}

DTO → PermissionDto.java

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionDto {
    private Integer id;        // MENU_ID
    private String title;      // MENU_TITLE
    private String icon;       // MENU_ICON
    private Integer order;     // MENU_ORDER
    private String url;        // MENU_URL (optional)
    private String component;  // MENU_COMPONENT_PATH (optional)
}


---

✅ 2️⃣ Mapping Logic Using Builder

In your service method (getAllPermissions()), after fetching the list,
map each entity to a DTO like this:

@Override
public ResponseEntity getAllPermissions() {
    ResponseVO<List<PermissionDto>> responseVo = new ResponseVO<>();
    
    // Fetch entities
    List<Permission> permissions = permissionsRepository.findAll();
    
    if (permissions.isEmpty()) {
        responseVo.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
        responseVo.setStatusCode(HttpStatus.NOT_FOUND.value());
    } else {
        // Convert to DTO list using Builder
        List<PermissionDto> dtoList = permissions.stream()
            .map(p -> PermissionDto.builder()
                    .id(p.getMenuId())
                    .title(p.getMenuTitle())
                    .icon(p.getMenuIcon())
                    .order(p.getMenuOrder())
                    .url(p.getMenuUrl())
                    .component(p.getMenuComponentPath())
                    .build())
            .toList();

        responseVo.setMessage(HttpStatus.FOUND.getReasonPhrase());
        responseVo.setResult(dtoList);
        responseVo.setStatusCode(HttpStatus.FOUND.value());
    }

    return new ResponseEntity<>(responseVo, HttpStatus.valueOf(responseVo.getStatusCode()));
}


---

✅ 3️⃣ Explanation

Step	Description

.stream()	Converts your list of entities to a stream for transformation
.map(p -> PermissionDto.builder()...)	Builds a new PermissionDto for each Permission
.toList()	Collects the mapped DTOs back into a List
responseVo.setResult(dtoList)	Puts the DTO list into your response body



---

✅ 4️⃣ Sample JSON Output

When you hit this endpoint, you’ll get something like:

{
  "statusCode": 302,
  "message": "Found",
  "result": [
    {
      "id": 1,
      "title": "Dashboard",
      "icon": "HomeIcon",
      "order": 1,
      "url": "/dashboard",
      "component": "DashboardComponent"
    },
    {
      "id": 2,
      "title": "Settings",
      "icon": "SettingsIcon",
      "order": 2,
      "url": "/settings",
      "component": "SettingsComponent"
    }
  ]
}


---

✅ 5️⃣ If You Want to Move Mapping Out of Service (Cleaner Code)

Create a separate mapper class:

PermissionMapper.java

package com.tcs.usersservice.mapper;

import com.tcs.usersservice.dto.PermissionDto;
import com.tcs.usersservice.model.Permission;
import java.util.List;
import java.util.stream.Collectors;

public class PermissionMapper {
    public static PermissionDto toDto(Permission p) {
        return PermissionDto.builder()
                .id(p.getMenuId())
                .title(p.getMenuTitle())
                .icon(p.getMenuIcon())
                .order(p.getMenuOrder())
                .url(p.getMenuUrl())
                .component(p.getMenuComponentPath())
                .build();
    }

    public static List<PermissionDto> toDtoList(List<Permission> permissions) {
        return permissions.stream()
                .map(PermissionMapper::toDto)
                .collect(Collectors.toList());
    }
}

Then in your service:

List<PermissionDto> dtoList = PermissionMapper.toDtoList(permissions);
responseVo.setResult(dtoList);

✅ Clean and reusable for any other service.


---

⚙️ Quick Recap

✅ Use .map() + .builder() to transform List<Permission> → List<PermissionDto>.

✅ If code repeats, move mapping to a separate PermissionMapper.

✅ Your function will now return DTOs instead of entities, keeping your response clean and frontend-ready.



---

Would you like me to show how to do the same mapping for RoleWithPermissions → RoleDto, including mapping inner permissions list with the builder pattern (for consistent DTO structure)?

