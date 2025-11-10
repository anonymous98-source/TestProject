package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

/**
 * Entity representing the roles assigned within the system.
 * 
 * Each role defines a set of permissions and accessible menu items.
 * Roles are linked to users and control access levels across the app.
 */
@Data
@Entity
@Table(name = "ROLES")
public class UserRoles {

    /** Unique ID assigned to the role. */
    @Id
    @Column(name = "ROLE_ID")
    private Integer roleId;

    /** Name of the role (e.g. ADMIN, MANAGER, USER). */
    @Column(name = "ROLE_NAME")
    private String roleName;

    /** ID of the user to whom this role belongs. */
    @Column(name = "USER_ID")
    private String userId;

    /** Status of the role (e.g. ACTIVE, INACTIVE). */
    @Column(name = "ROLE_STATUS")
    private String roleStatus;

    /**
     * Menu items this role has access to.
     * Defines many-to-many mapping between roles and menu items.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "ROLE_MENU_ACCESS",
            joinColumns = @JoinColumn(name = "ROLE_ID"),
            inverseJoinColumns = @JoinColumn(name = "MENU_ITEM_ID")
    )
    private Set<MenuItems> accessibleMenuItems;
}
