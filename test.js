package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
@Table(name = "ROLE_PERMISSIONS")
public class RolePermissions {


    /*ROLE_ID, PERMISSION_ID*/

    @Id
    @Column(name = "ROLE_ID")
    int roleId;

    @Column(name = "PERMISSION_ID")
    int permissionId;


}
