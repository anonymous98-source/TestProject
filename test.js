package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements UserLoginDTO {

    private String userId;

    private int userrole;

    private String firstName;

    private String middleName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private String passwordHash;

    private String password;

     private String roleStatus;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Timestamp lastLoginAt;

    private String isDeleted;

    private Timestamp deletedAt;

    private Timestamp tempPasswordSetAt;

    private int userWrongPasswordCount;

    private int branch;

    private String message;

    private char loginMethod;

    private String userStatus;    

    private String accessToken;

    private String refreshToken;

    private boolean updatePassword;

    private boolean userCheck;

    private int attemptsLeft;

    private boolean validCredentials;

    private String passwordLoginStatus;
    
    private UserTokenDataDto user;

}
