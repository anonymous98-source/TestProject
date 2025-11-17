@Service
@RequiredArgsConstructor
public class UserRequestService {

    private static final String EVENT_SOURCE = "USER_REQUEST";

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final UserRequestRepository userRequestRepository;
    private final PermissionConfigService permissionConfigService;
    private final NotificationWriterService notificationWriterService;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<ResponseVO<Map<String, Object>>> createNewRequest(Map<String, Object> request) {

        ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
        Map<String, Object> result = new HashMap<>();

        try {
            // --- Extract + map incoming data ---
            String targetUserId   = request.get("targetUserId").toString();
            String requestorUserId = request.get("requestorUserId").toString();
            String requestType    = request.get("requestType").toString();
            String requestPayload = request.get("requestPayload").toString();

            // Assuming you have some DTO that contains requestType/changeType etc.
            // If not, you can keep using Map and adjust notification method accordingly.
            UserRequestDto dto = objectMapper.convertValue(request, UserRequestDto.class);

            UserRequest userRequest = objectMapper.convertValue(request, UserRequest.class);
            userRequest.setRequestDate(new Timestamp(System.currentTimeMillis()));

            User user = userRepository.findUserByUserId(targetUserId);

            String businessMessage;
            boolean success = false;
            UserRequest savedRequest = null;

            // --- Business validations ---
            if (userRequestRepository.countUserPendingRequests(targetUserId) > 0) {

                businessMessage = "There is already a pending request for this user";
                result.put("status", false);
                result.put("message", businessMessage);

                responseVo.setStatusCode(HttpStatus.CONFLICT);
                responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

            } else if (requestType.equalsIgnoreCase(Constant.CREATE) && user != null) {

                businessMessage = "User already exists";
                result.put("status", false);
                result.put("message", businessMessage);

                responseVo.setStatusCode(HttpStatus.CONFLICT);
                responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

            } else if (!requestType.equalsIgnoreCase(Constant.CREATE) && user == null) {

                businessMessage = "User does not exist";
                result.put("status", false);
                result.put("message", businessMessage);

                responseVo.setStatusCode(HttpStatus.CONFLICT);
                responseVo.setMessage(HttpStatus.CONFLICT.getReasonPhrase());

            } else {

                // --- Happy path: create request ---
                userRequest.setRequestStatus(Constant.PENDING);
                log.info("User Request: {}", userRequest);

                savedRequest = userRequestRepository.save(userRequest);

                result.put("userRequest", savedRequest);
                result.put("status", true);
                businessMessage = "New request created";

                responseVo.setStatusCode(HttpStatus.CREATED);
                responseVo.setMessage(HttpStatus.CREATED.getReasonPhrase());

                success = true;
            }

            // --- ALWAYS attempt notification (success or failure) ---
            // targetId: here I assume it’s "targetUserId"; adjust as per your actual meaning.
            String targetId = targetUserId;
            createRequestNotification(dto, targetId, savedRequest, success, businessMessage);

            responseVo.setResult(result);

        } catch (IllegalArgumentException e) {

            log.error("Invalid request payload", e);
            ResponseVO<Map<String, Object>> errorVo = new ResponseVO<>();

            errorVo.setStatusCode(HttpStatus.BAD_REQUEST);
            errorVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
            errorVo.setResult(Collections.emptyMap());

            return new ResponseEntity<>(errorVo, errorVo.getStatusCode());
        }

        return new ResponseEntity<>(responseVo, responseVo.getStatusCode());
    }

    /**
     * Creates notification for the request.
     * If this throws an exception, the whole @Transactional method is rolled back.
     */
    private void createRequestNotification(UserRequestDto dto,
                                           String targetId,
                                           UserRequest savedRequest,
                                           boolean success,
                                           String businessMessage) {

        try {
            // 1. Fetch Config from CACHE/DB
            String requestTypeKey = dto.getRequestType().name();  // e.g., "SEGMENT_CODE"
            log.info("Request Type String to fetch role ids from PERMISSIONS: {}", requestTypeKey);

            NotificationConfigDto config = permissionConfigService.getConfig(requestTypeKey);

            // 2. Customize Message
            String action = dto.getChangeType().name(); // ADD, UPDATE, DELETE
            String statusText = success ? "pending" : "failed";

            String message = "New " + action + " request (" + targetId + ") "
                    + statusText + " for " + dto.getRequestType()
                    + ". Detail: " + businessMessage;

            // 3. Send to Group (1-to-Many via Outbox)
            // If savedRequest is null (business failure), you can send null or some correlation id
            String referenceId = (savedRequest != null) ? savedRequest.getId().toString() : null;

            notificationWriterService.createNotification(
                    null,                       // userId is null (we are targeting a group)
                    config.getTargetRoles(),    // "51,55" (Fetched from Cache/DB)
                    message,
                    config.getTargetUrl(),      // "/segment-requests" (Fetched from Cache/DB)
                    referenceId,
                    EVENT_SOURCE
            );

        } catch (Exception e) {
            // This will rollback the DB transaction because the caller is @Transactional
            Long requestId = (savedRequest != null) ? savedRequest.getId() : null;

            log.error(
                    "CRITICAL: Failed to create notification for request: {}. Rolling back transaction.",
                    requestId, e
            );
            throw new RuntimeException(
                    "Failed to create notification event, rolling back request creation.",
                    e
            );
        }
    }
}