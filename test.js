package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Entity representing the mapping between roles and permissions.
 * 
 * Each entry defines which permission belongs to which role.
 * This acts as a bridge table between USER_ROLES and PERMISSIONS.
 */
@Entity
@Data
@Table(name = "ROLE_PERMISSIONS")
public class RolePermissions {

    /** ID of the role. */
    @Id
    @Column(name = "ROLE_ID")
    private int roleId;

    /** ID of the permission linked to the role. */
    @Column(name = "PERMISSION_ID")
    private int permissionId;
}
