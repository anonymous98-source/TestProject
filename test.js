package com.fincore.gateway.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

/**
 * Entity representing user session details along with the refresh token.
 * 
 * Maps to USER_SESSION table and keeps track of when a session was started,
 * ended, and from which device it was initiated.
 */
@Entity
@Getter
@Setter
@Table(name = "USER_SESSION")
public class RefreshToken {

    /** Primary key for the user session. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SESSION_ID")
    private Long sessionId;

    /** Unique ID of the user associated with this session. */
    @Column(name = "USER_ID")
    private String userId;

    /** Refresh token assigned to the current session. */
    @Column(name = "REFRESH_TOKEN")
    private String refreshToken;

    /** Timestamp indicating when the session started. */
    @Column(name = "SESSION_STARTED_AT", insertable = false, updatable = false)
    private Timestamp sessionStartedAt;

    /** Timestamp indicating when the session ended. */
    @Column(name = "SESSION_ENDED_AT")
    private Timestamp sessionEndedAt;

    /** Device identifier or token from which session was created. */
    @Column(name = "DEVICE_ID")
    private String deviceId;
}
