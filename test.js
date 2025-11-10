package com.fincore.gateway.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "MENU_ITEMS")
@Data
public class MenuItems {

    @Id
    @Column(name = "MENU_ID")
    private Integer id;

    @Column(name = "MENU_TITLE")
    private String title;

    @Column(name = "MENU_ICON")
    private String icon;

    @Column(name = "MENU_ROUTE")
    private String route;

    @Column(name = "MENU_HAS_CHILDREN")
    private boolean hasChildren;

    // Embedded screen details
    @Column(name = "MENU_SCREEN_ID")
    private String screenId;

    @Column(name = "MENU_SCREEN_TITLE")
    private String screenTitle;

    @Column(name = "MENU_SCREEN_ROUTE")
    private String screenRoute;

    // @Column(name = "MENU_PARENT_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MENU_PARENT_ID")
    private MenuItems parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MenuItems> children;

    @ManyToMany(mappedBy = "accessibleMenuItems")
    private Set<UserRoles> roles;

}

