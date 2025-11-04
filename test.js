Short answer: don’t change the Permissions entity if permission_order lives in role_permissions. That column isn’t in PERMISSIONS, so adding @Column("PERMISSION_ORDER") to the entity will fail.
Instead, return a projection/DTO from the native query that includes rp.permission_order, and use that in your service.

1) Create a projection

public interface PermissionRow {
    int getMenuId();
    String getMenuTitle();
    String getMenuIcon();
    String getSubMenu();
    String getMenuAction();
    String getMenuUrl();
    String getComponentPath();
    String getMenuDescription();
    String getDependant();
    int getPermissionOrder();   // from rp.permission_order
}

2) Update repository method

public interface RolePermissionsRepository extends JpaRepository<RolePermissions, Integer> {

    @Query(value = """
        SELECT DISTINCT
            p.menu_id               AS menuId,
            p.menu_title            AS menuTitle,
            p.menu_icon             AS menuIcon,
            p.menu_submenu          AS subMenu,
            p.menu_action           AS menuAction,
            p.menu_url              AS menuUrl,
            p.menu_component_path   AS componentPath,
            p.menu_description      AS menuDescription,
            p.menu_dependant        AS dependant,
            rp.permission_order     AS permissionOrder
        FROM permissions p
        JOIN role_permissions rp ON p.menu_id = rp.permission_id
        JOIN user_roles ur ON ur.role_id = rp.role_id
        WHERE ur.user_id = :userid
        ORDER BY rp.permission_order
        """, nativeQuery = true)
    List<PermissionRow> findAllByUserId(@Param("userid") String userId);
}

3) Use it in your service (sort already handled by SQL)

List<PermissionRow> rows = repo.findAllByUserId(userId);

List<ChildMenu> children = rows.stream()
    .filter(r -> r.getSubMenu() != null)
    .map(r -> {
        ChildMenu c = new ChildMenu();
        c.setId(r.getMenuId());
        c.setTitle(r.getSubMenu());
        c.setIcon(r.getMenuIcon());
        c.setRoute(r.getMenuUrl());
        c.setComponentPath(r.getComponentPath());
        c.setScreenDescription(r.getMenuDescription());
        c.setOrderId(r.getPermissionOrder()); // <-- comes from rp
        return c;
    })
    .toList();


---

If you insist on keeping List<Permissions> as the return type

You have two safe alternatives:

1. Create a DB view that joins and exposes PERMISSION_ORDER, then map your Permissions entity to that view; or


2. Use @SqlResultSetMapping/Tuple and manually set a @Transient Integer permissionOrder field.



But the projection approach above is the cleanest and avoids changing your existing PERMISSIONS table.