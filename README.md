Perfect 👍 — this clears everything up.

From your new image, the schema is:

ROLES(ROLE_ID, ROLE_NAME, DESCRIPTION, ROLE_STATUS)

PERMISSIONS(MENU_ID, MENU_TITLE, MENU_ICON, MENU_ORDER, …)

ROLE_PERMISSION(ROLE_ID, PERMISSION_ID) → joins ROLES ↔ PERMISSIONS


That means the correct relationship is:

ROLES ──< ROLE_PERMISSION >── PERMISSIONS

(not directly ROLES.ROLE_ID = PERMISSIONS.ROLE_ID).

So your native query must join via the ROLE_PERMISSION table.


---

✅ Corrected Query

Here’s the right SQL query to use:

SELECT 
    r.ROLE_ID,
    r.ROLE_NAME,
    r.DESCRIPTION,
    r.ROLE_STATUS,
    p.MENU_ID,
    p.MENU_TITLE,
    p.MENU_ICON,
    p.MENU_ORDER
FROM ROLES r
LEFT JOIN ROLE_PERMISSION rp ON r.ROLE_ID = rp.ROLE_ID
LEFT JOIN PERMISSIONS p ON rp.PERMISSION_ID = p.MENU_ID
ORDER BY r.ROLE_ID, p.MENU_ORDER

This will:

Return all roles,

Include permissions linked through ROLE_PERMISSION,

Still show roles with no permissions (because of LEFT JOINs).



---

🧩 Update Your Repository

Replace your old query with this one:

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Integer> {

    @Query(value = """
        SELECT 
            r.ROLE_ID,
            r.ROLE_NAME,
            r.DESCRIPTION,
            r.ROLE_STATUS,
            p.MENU_ID,
            p.MENU_TITLE,
            p.MENU_ICON,
            p.MENU_ORDER
        FROM ROLES r
        LEFT JOIN ROLE_PERMISSION rp ON r.ROLE_ID = rp.ROLE_ID
        LEFT JOIN PERMISSIONS p ON rp.PERMISSION_ID = p.MENU_ID
        ORDER BY r.ROLE_ID, p.MENU_ORDER
        """, nativeQuery = true)
    List<Object[]> findAllRolesWithPermissionsRaw();
}

(Using Java 15+ text blocks makes this cleaner.)


---

🧩 Rest of the files remain same as I gave you earlier

✅ Keep the same:

RoleDto.java

PermissionDto.java

RoleService.java (manual mapping logic)

RoleController.java


That service will correctly group by roleId and map the permission details.


---

💡 Optional: add a few extra permission columns

If you want to include extra fields like MENU_URL or MENU_COMPONENT_PATH from your PERMISSIONS table, just extend the query:

SELECT 
    r.ROLE_ID,
    r.ROLE_NAME,
    r.DESCRIPTION,
    r.ROLE_STATUS,
    p.MENU_ID,
    p.MENU_TITLE,
    p.MENU_ICON,
    p.MENU_ORDER,
    p.MENU_URL,
    p.MENU_COMPONENT_PATH
FROM ROLES r
LEFT JOIN ROLE_PERMISSION rp ON r.ROLE_ID = rp.ROLE_ID
LEFT JOIN PERMISSIONS p ON rp.PERMISSION_ID = p.MENU_ID
ORDER BY r.ROLE_ID, p.MENU_ORDER

Then update PermissionDto to include those fields.


---

🧾 Example Output

After you plug in this query and run /api/roles-with-permissions,
you’ll get JSON exactly like your screenshot:

{
  "statusCode": "OK",
  "message": "OK",
  "result": {
    "roles": [
      {
        "roleId": 51,
        "roleName": "UCO",
        "description": "users will be responsible for managing user access",
        "roleStatus": "ACTIVE",
        "permissions": [
          { "id": 1, "title": "test1", "icon": "Dashboard", "order": 1 },
          { "id": 2, "title": "test2", "icon": "SettingsApplication", "order": 2 },
          { "id": 3, "title": "test3", "icon": "Person", "order": 3 }
        ]
      },
      {
        "roleId": 52,
        "roleName": "XYZ",
        "description": "some desc",
        "roleStatus": "INACTIVE",
        "permissions": []
      }
    ]
  }
}


---

✅ Summary of changes to fix your current error and schema alignment:

File	What to Change	Why

RoleRepository.java	Use the 3-table join (ROLES → ROLE_PERMISSION → PERMISSIONS)	Fixes wrong join, resolves ConverterNotFoundException
RoleService.java	Keep mapping logic same	It now maps valid rows correctly
RoleDto & PermissionDto	No change (optional: add fields if needed)	Works with new join output
Controller	Same	Produces JSON as expected



---

Would you like me to include optional fields like MENU_URL and MENU_COMPONENT_PATH in the PermissionDto and query too? I can extend your full DTO + mapper code accordingly.

