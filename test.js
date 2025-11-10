package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO used for handling password update requests and responses.
 *
 * Carries basic details like userId, password, OTP, and a flag
 * indicating whether the password was successfully updated or not.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordDTO {

    /** Unique ID of the user performing password update. */
    private String userId;

    /** Message describing update status or additional info. */
    private String message;

    /** The new password to be set for the user. */
    private String password;

    /** Flag that indicates if password update was successful. */
    private boolean updateFlag;

    /** OTP value used for verifying the password change. */
    private String otp;
}
