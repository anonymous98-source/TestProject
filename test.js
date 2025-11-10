package com.fincore.gateway.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity representing the system-wide login configuration paramters.
 * 
 * Maps to the LOGIN_PARAM table, which holds information such as 
 * the active login mode, OTP validity period, password validity period, 
 * allowed wrong attempts, and interval between attempts.
 */
@Entity
@Getter
@Setter
@ToString
@Table(name = "LOGIN_PARAM")
public class LoginParam {

    /** Defines the currently active login mode in the system. */
    @Id
    @Column(name = "ACTIVE_LOGIN_MODE")
    private char activeLoginMode;

    /** OTP validity period in minutes. */
    @Column(name = "OTP_VALIDITY")
    private int otpValidity;

    /** Password validity period in days. */
    @Column(name = "PASSWORD_VALIDITY")
    private int passwordValidity;

    /** Number of consecutive wrong password attemps allowed before blocking. */
    @Column(name = "WRONG_PASSWORD_ATTEMPTS")
    private int wrongPasswordAttempts;

    /** Time interval (in minutes) after which a new login attempt is allowed. */
    @Column(name = "ATTEMPT_INTERVAL")
    private int attemptInterval;
}
