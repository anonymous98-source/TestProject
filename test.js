package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * DTO that represents user details along with login and token info.
 *
 * Used across authentication and profile flows for passing
 * consolidated user information between layers.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements UserLoginDTO {

    /** Unique identifier for the user. */
    private String userId;

    /** Role ID or level assigned to the user. */
    private int userrole;

    /** First name of the user. */
    private String firstName;

    /** Middle name of the user, if provided. */
    private String middleName;

    /** Last name of the user. */
    private String lastName;

    /** Registered phone number. */
    private String phoneNumber;

    /** User's email address. */
    private String email;

    /** Stored password hash for authentication. */
    private String passwordHash;

    /** Plain password (usually used temporarily during validation). */
    private String password;

    /** Current role status (ACTIVE / INACTIVE). */
    private String roleStatus;

    /** Timestamp when the account was created. */
    private Timestamp createdAt;

    /** Timestamp when the user record was last updated. */
    private Timestamp updatedAt;

    /** Timestamp of the user’s last successful login. */
    private Timestamp lastLoginAt;

    /** Soft delete flag (Y/N). */
    private String isDeleted;

    /** Timestamp when the user was deleted (if applicable). */
    private Timestamp deletedAt;

    /** Time when a temporary password was last set. */
    private Timestamp tempPasswordSetAt;

    /** Number of failed password attempts. */
    private int userWrongPasswordCount;

    /** Branch or location code associated with the user. */
    private int branch;

    /** Optional status message returned from operations. */
    private String message;

    /** Login method used (P - Password, O - OTP, etc.). */
    private char loginMethod;

    /** Current status of the user account. */
    private String userStatus;

    /** Access token issued after login. */
    private String accessToken;

    /** Refresh token for renewing session without re-login. */
    private String refreshToken;

    /** Flag indicating if the password needs to be updated. */
    private boolean updatePassword;

    /** Whether the user exists and is valid in system. */
    private boolean userCheck;

    /** Remaining attempts before account lockout. */
    private int attemptsLeft;

    /** True if credentials are valid during authentication. */
    private boolean validCredentials;

    /** Status of password login attempt. */
    private String passwordLoginStatus;

    /** Token-related data, if available. */
    private UserTokenDataDto user;
}
