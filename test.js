package com.fincore.gateway.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="PERMISSIONS")
public class Permissions {

    /*MENU_ID, MENU_TITLE, MENU_ICON, MENU_SUBMENU, MENU_ACTION, MENU_URL, MENU_COMPONENT_ROUTE, MENU_ORDER, MENU_DEPENDANT*/

    @Id
    @Column(name="MENU_ID")
    private int menuId;

    @Column(name="MENU_TITLE")
    private String menuTitle;

    @Column(name="MENU_ICON")
    private String menuIcon;

    @Column(name = "MENU_SUBMENU")
    private String subMenu;

    @Column(name = "MENU_ACTION")
    private String menuAction;

    @Column(name = "MENU_URL")
    private String menuUrl;

    @Column(name = "MENU_COMPONENT_PATH")
    private String componentPath;

    @Column(name = "MENU_DESCRIPTION")
    private String menuDescription;

    @Column(name = "MENU_DEPENDANT")
    private String dependent;
    
    private int orderId;

}
