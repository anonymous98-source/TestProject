package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "ROLES")
public class UserRoles {

    @Id
    @Column(name = "ROLE_ID")
    private Integer role;

    @Column(name = "ROLE_NAME")
    private String roleName;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "ROLE_STATUS")
    private String roleStatus;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ROLE_MENU_ACCESS", joinColumns = @JoinColumn(name = "ROLE_ID"), inverseJoinColumns = @JoinColumn(name = "MENU_ITEM_ID"))
    private Set<MenuItems> accessibleMenuItems;

}
