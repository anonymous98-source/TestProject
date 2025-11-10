package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenDataDto {

    private String userId;

    private Integer role;

    private String roleName;

    private String firstName;

    private String middleName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private int branch;
}
