package com.fincore.gateway.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entity representing permission details for each menu or action in the system.
 * 
 * Maps to the PERMISSIONS table and defines information such as menu title,
 * icon, sub-menu, related action, and route path used within the application.
 */
@Entity
@Data
@Table(name = "PERMISSIONS")
public class Permissions {

    /** Unique ID for the menu or permission entry. */
    @Id
    @Column(name = "MENU_ID")
    private int menuId;

    /** Title displayed for this menu item or feature. */
    @Column(name = "MENU_TITLE")
    private String menuTitle;

    /** Icon associated with the menu item (used in UI). */
    @Column(name = "MENU_ICON")
    private String menuIcon;

    /** Name of the parent or sub menu this item belongs to. */
    @Column(name = "MENU_SUBMENU")
    private String subMenu;

    /** Specific action type or permission (like VIEW, EDIT, DELETE etc). */
    @Column(name = "MENU_ACTION")
    private String menuAction;

    /** URL path or endpoint linked with this menu. */
    @Column(name = "MENU_URL")
    private String menuUrl;

    /** Component path or frontend route used for navigation. */
    @Column(name = "MENU_COMPONENT_PATH")
    private String componentPath;

    /** Short description explaining what this permission or menu does. */
    @Column(name = "MENU_DESCRIPTION")
    private String menuDescription;

    /** Indicates if this menu depends on another one. */
    @Column(name = "MENU_DEPENDANT")
    private String dependent;

    /** Order in which the menu appears in UI. */
    @Column(name = "MENU_ORDER")
    private int orderId;
}
