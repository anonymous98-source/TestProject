package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

/**
 * Entity representing a menu item in the application.
 * 
 * Each record in MENU_ITEMS defines a single menu entry — which may
 * have a parent (for nested menus), child items, or be directly linked
 * to a screen route. This structure helps build dynamic menu hierarchies
 * based on user roles and permissions.
 */
@Entity
@Table(name = "MENU_ITEMS")
@Data
public class MenuItems {

    /** Unique ID for the menu item. */
    @Id
    @Column(name = "MENU_ID")
    private Integer id;

    /** Display title of the menu item. */
    @Column(name = "MENU_TITLE")
    private String title;

    /** Icon name or path used for the menu item UI. */
    @Column(name = "MENU_ICON")
    private String icon;

    /** Route or navigation path associated with the menu item. */
    @Column(name = "MENU_ROUTE")
    private String route;

    /** Flag to indicate if this menu item contains child items. */
    @Column(name = "MENU_HAS_CHILDREN")
    private boolean hasChildren;

    // Embedded screen level details
    /** Screen ID linked with this menu item (if applicable). */
    @Column(name = "MENU_SCREEN_ID")
    private String screenId;

    /** Title of the screen linked with this menu item. */
    @Column(name = "MENU_SCREEN_TITLE")
    private String screenTitle;

    /** Route of the screen linked with this menu item. */
    @Column(name = "MENU_SCREEN_ROUTE")
    private String screenRoute;

    /**
     * Parent menu item, used for hierarchical navigation.
     * A menu can have zero or one parent.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENU_PARENT_ID")
    private MenuItems parent;

    /**
     * List of child menu items linked to this parent.
     * If the menu has no children, this list will be empty.
     */
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MenuItems> children;

    /**
     * Roles that have access to this menu item.
     * A menu item can be visible to multiple roles.
     */
    @ManyToMany(mappedBy = "accessibleMenuItems")
    private Set<UserRoles> roles;
}
