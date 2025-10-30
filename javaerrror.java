Nice — below is a complete, working solution (entity, repository, service, controller and a small ResponseVO) that fixes the conversion error and follows the recommended JPQL approach. I made these safe assumptions to make it self-contained and correct:

The DB table is role_requests (because your original native SQL selected from role_requests).

The DB column names are the same as the column list you showed (e.g. request_id, request_type, requestor_user_id, target_role_id, ...).

We use JPQL (recommended) so JPA maps rows directly to the UserRequest entity (no Object[] conversion).

Repository parameter uses @Param (Spring Data).

Uses Lombok to cut boilerplate (@Data, @NoArgsConstructor, @AllArgsConstructor, @Builder).


Copy these classes into your project (adjust package names to match your project).


---

1) Entity — UserRequest.java

package com.example.userservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "role_requests") // matches the actual DB table you're selecting from
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "request_type")
    private String requestType;

    @Column(name = "requestor_user_id")
    private String requestorUserId;

    // original query referred to target_role_id, so keep that name:
    @Column(name = "target_role_id")
    private String targetRoleId;

    @Column(name = "request_payload")
    private String requestPayload;

    @Column(name = "request_status")
    private String requestStatus;

    @Column(name = "request_date", nullable = false, insertable = false, updatable = false)
    private Timestamp requestDate;

    @Column(name = "approval_date")
    private Timestamp approvalDate;

    @Column(name = "approver_user_id")
    private String approverUserId;

    @Column(name = "reason_for_rejection")
    private String reasonForRejection;

    @Column(name = "execution_date")
    private Timestamp executionDate;

    @Column(name = "execution_details")
    private String executionDetails;
}


---

2) Repository — RoleRequestRepository.java

package com.example.userservice.repository;

import com.example.userservice.model.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRequestRepository extends JpaRepository<UserRequest, Integer> {

    // JPQL approach: JPA will map to UserRequest entity
    @Query("SELECT r FROM UserRequest r " +
           "WHERE r.requestorUserId <> :requestedByUserId " +
           "AND r.requestStatus = 'PENDING'")
    List<UserRequest> findPendingRoleRequests(@Param("requestedByUserId") String requestedByUserId);
}


---

3) Service interface — RoleRequestService.java

package com.example.userservice.service;

import org.springframework.http.ResponseEntity;

public interface RoleRequestService {
    ResponseEntity getPendingRoleRequests(String userId);
}


---

4) Service implementation — RoleRequestServiceImpl.java

package com.example.userservice.service.impl;

import com.example.userservice.model.UserRequest;
import com.example.userservice.repository.RoleRequestRepository;
import com.example.userservice.service.RoleRequestService;
import com.example.userservice.vo.ResponseVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleRequestServiceImpl implements RoleRequestService {

    private final RoleRequestRepository roleRequestRepository;

    private static final String STATUS = "status";
    private static final String MESSAGE = "message";

    @Override
    public ResponseEntity getPendingRoleRequests(String userId) {
        ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
        Map<String, Object> result = new HashMap<>();

        try {
            List<UserRequest> pendingRequests = roleRequestRepository.findPendingRoleRequests(userId);
            log.info("pendingRequests size: {}", pendingRequests == null ? 0 : pendingRequests.size());

            if (pendingRequests == null || pendingRequests.isEmpty()) {
                result.put(MESSAGE, "No pending requests");
                result.put("pendingRequests", List.of());
                result.put("pendingRequestsCount", 0);
            } else {
                result.put(MESSAGE, String.format("%d pending requests found", pendingRequests.size()));
                result.put("pendingRequests", pendingRequests);
                result.put("pendingRequestsCount", pendingRequests.size());
            }

            result.put(STATUS, true);

            responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.OK.value()));
            responseVo.setMessage(HttpStatus.OK.getReasonPhrase());
            responseVo.setResult(result);
        } catch (Exception e) {
            log.error("Error while fetching pending role requests", e);
            result.put(STATUS, false);
            result.put(MESSAGE, "Invalid User Id and parameters: " + e.getMessage());

            responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
            responseVo.setResult(result);
        }

        return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
    }
}


---

5) Controller — RoleRequestController.java

package com.example.userservice.controller;

import com.example.userservice.service.RoleRequestService;
import com.example.userservice.util.JwtUtil; // keep your existing JwtUtil
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role-requests")
@RequiredArgsConstructor
public class RoleRequestController {

    private final RoleRequestService roleRequestService;

    @GetMapping("/pending-role-requests")
    public ResponseEntity getPendingRequests(@RequestHeader("Authorization") String token) {
        // extract userId from token (your existing JwtUtil)
        String userId = JwtUtil.getUserIdFromToken(token);
        return roleRequestService.getPendingRoleRequests(userId);
    }
}


---

6) Simple ResponseVO — ResponseVO.java

(so the example compiles — replace with your actual ResponseVO if you already have one)

package com.example.userservice.vo;

import lombok.Data;
import org.springframework.http.HttpStatusCode;

@Data
public class ResponseVO<T> {
    private HttpStatusCode statusCode;
    private String message;
    private T result;
}


---

Notes, why this solves your error

No native query: JPQL returns UserRequest entities directly, so Spring Data JPA doesn't return Object[] and there is no conversion failure.

Property names match: JPQL uses the entity's Java property names (requestorUserId, requestStatus) so mapping is consistent.

@Param used: fixed binding on repository method parameter so Spring Data injects the value correctly.

Entity -> DB column mapping: @Column(name = "...") maps entity fields to DB columns; make sure these match your real DB columns. I used the exact column names from your earlier SQL.



---

If your DB table is actually user_requests (not role_requests)

Change the @Table(name = "...") on UserRequest to the actual table name. If the column names differ, update the @Column(name=...) values to match the actual DB columns.


---

Optional alternative (if you must use native SQL)

If you absolutely need native SQL (complex joins or vendor-specific features), then either:

Select all columns that map to the entity and use nativeQuery = true and pass UserRequest.class as the result type when using EntityManager.createNativeQuery(...), or

Return List<Object[]> from the repository and manually map to UserRequest in the service.


But JPQL is simpler and recommended for this use-case.


---

If you want, I can:

adapt this to your exact package names & ResponseVO implementation, or

provide the nativeQuery version (with @SqlResultSetMapping or EntityManager usage) if you need features only available in native SQL.


Which of those would you like next?