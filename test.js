package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

/**
 * Entity class that stores details of each user login attempt.
 * 
 * Maps to the USER_LOGIN_ATTEMPTS table and keeps track of 
 * login activity such as user ID, login method, IP address, 
 * timestamp, and whether the attempt was successful or not.
 */
@Entity
@Getter
@Setter
@Table(name = "USER_LOGIN_ATTEMPTS")
public class LoginAttempt {

    /** Primary key for the login attempt record. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ATTEMPT_ID")
    private Long attemptId;

    /** ID of the user who tried to log in. */
    @Column(name = "USER_ID")
    private String userId;

    /** Type of login method used (e.g. PASSWORD, OTP, BIOMETRIC). */
    @Column(name = "LOGIN_METHOD")
    private String loginMethod;

    /** IP address from which the login attempt was made. */
    @Column(name = "IP_ADDRESS")
    private String ipAddress;

    /**
     * Timestamp when the login attempt occurred.
     * 
     * This is managed at the database level and not manually updated in code.
     */
    @Column(name = "ATTEMPT_TIME", nullable = false, updatable = false, insertable = false)
    private Timestamp attemptTime;

    /** Indicates if the login was successful (Y/N). */
    @Column(name = "SUCCESS")
    private String success;

    /** Reason for failure, if the attempt was not successful. */
    @Column(name = "FAILURE_REASON")
    private String failureReason;
}
