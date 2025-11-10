package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO used during user verification process.
 *
 * Contains essential details about the user’s login state,
 * role validation, and password update requirements.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyUserDTO {

    /** Unique ID of the user being verified. */
    private String userId;

    /** Message conveying status or feedback from verification. */
    private String message;

    /** Login method used (P - Password, O - OTP, etc.). */
    private char loginMethod;

    /** Current status of the user account. */
    private String userStatus;

    /** Current status of the user's role (ACTIVE / INACTIVE). */
    private String roleStatus;

    /** Indicates if user needs to update their password. */
    private boolean updatePassword;

    /** Whether the user exists and passes basic checks. */
    private boolean userCheck;

    /** Status of password login attempt. */
    private String passwordLoginStatus;
}
