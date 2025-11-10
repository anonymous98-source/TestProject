package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyUserDTO {

    private String userId;

    private String message;

    private char loginMethod;

    private String userStatus;

    private String roleStatus;

    private boolean updatePassword;

    private boolean userCheck;

    private String passwordLoginStatus;

}
