package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "USER_SESSION")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SESSION_ID")
    private Long sessionId;

    @Column(name = "USER_ID")
    private String userid;

    @Column(name = "REFRESH_TOKEN")
    private String refreshToken;

    @Column(name = "SESSION_STARTED_AT", insertable = false, updatable = false)
    private Timestamp sessionStartedAt;

    @Column(name = "SESSION_ENDED_AT")
    private Timestamp sessionEndedAt;

    @Column(name = "DEVICE_ID")
    private String deviceId;


}
