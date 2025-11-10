package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO that carries minimal user data embedded inside a token.
 *
 * This object is typically serialized within access or refresh tokens
 * to represent the authenticated user's identity and basic profile info.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenDataDto {

    /** Unique identifier of the user. */
    private String userId;

    /** Numeric role ID assigned to the user. */
    private Integer role;

    /** Name of the role (e.g. ADMIN, MANAGER, USER). */
    private String roleName;

    /** First name of the user. */
    private String firstName;

    /** Middle name, if provided. */
    private String middleName;

    /** Last name of the user. */
    private String lastName;

    /** Contact number registered with the user. */
    private String phoneNumber;

    /** Email address associated with the user account. */
    private String email;

    /** Branch or office code where the user is mapped. */
    private int branch;
}
