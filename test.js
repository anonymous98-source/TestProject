package com.fincore.gateway.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.sql.Timestamp;

/**
 * Entity representing a user in the system.
 * 
 * Holds user profile information, credentials, and audit details
 * such as creation date, last login, and deletion timestamp.
 */
@Data
@Entity
@Table(name = "USERS")
public class User {

    /** Unique identifier for the user. */
    @Id
    @Column(name = "USER_ID")
    private String userId;

    /** First name of the user. */
    @Column(name = "FIRST_NAME")
    private String firstName;

    /** Middle name, if provided. */
    @Column(name = "MIDDLE_NAME")
    private String middleName;

    /** Last name of the user. */
    @Column(name = "LAST_NAME")
    private String lastName;

    /** Registered phone number of the user. */
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    /** Email address used for login or notifications. */
    @Column(name = "EMAIL")
    private String email;

    /** Encrypted password hash used for authentication. */
    @Column(name = "PASSWORD_HASH")
    private String passwordHash;

    /** Current status of the account (e.g. ACTIVE, INACTIVE, LOCKED). */
    @Column(name = "ACCOUNT_STATUS")
    private String accountStatus;

    /** Timestamp when the user record was created. */
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    /** Timestamp when the record was last updated. */
    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;

    /** Timestamp of the user's last successful login. */
    @Column(name = "LAST_LOGIN_AT")
    private Timestamp lastLoginAt;

    /** Flag to indicate soft delete status (Y/N). */
    @Column(name = "IS_DELETED")
    private String isDeleted;

    /** Timestamp when the user was marked as deleted. */
    @Column(name = "DELETED_AT")
    private Timestamp deletedAt;

    /** When the temporary password was last set, if applicable. */
    @Column(name = "TEMP_PASSWORD_SET_AT")
    private Timestamp tempPasswordSetAt;

    /** Count of consecutive wrong password attempts. */
    @Column(name = "USER_WRONG_PASSWORD_COUNT")
    private int userWrongPasswordCount;

    /** Branch or location code assigned to the user. */
    @Column(name = "BRANCH")
    private int branch;

    /** Indicates if password login is enabled or not. */
    @Column(name = "PASSWORD_LOGIN")
    private String passwordLogin;
}
