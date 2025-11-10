package com.fincore.gateway.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "LOGIN_PARAM")
public class LoginParam {

    @Id
    @Column(name = "ACTIVE_LOGIN_MODE")
    private char activeLoginMode;

    @Column(name = "OTP_VALIDITY")
    private int otpValidity;

    @Column(name = "PASSWORD_VALIDITY")
    private int passwordValidity;

    @Column(name = "WRONG_PASSWORD_ATTEMPTS")
    private int wrongPasswordAttempts;
    
    @Column(name = "ATTEMPT_INTERVAL")
    private int attemptInterval;
}
