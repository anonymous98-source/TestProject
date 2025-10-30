/*controller*/
@GetMapping("/pending-role-requests")
	public ResponseEntity getPendingRequests(@RequestHeader("Authorization") String token) {
		String userId = JwtUtil.getUserIdFromToken(token);
		return roleRequestService.getPendingRoleRequests(userId);
	}

/*Service*/
public ResponseEntity getPendingRoleRequests(String userId) {
		ResponseVO<Map<String, Object>> responseVo = new ResponseVO<>();
		Map<String, Object> result = new HashMap<>();

		try {
			// String userId = (String) params.get("userId");
			List<UserRequest> pendingRequests = roleRequestRepository.findPendingRoleRequests(userId);
			log.info(pendingRequests.toString());

			if (pendingRequests.isEmpty()) {
				result.put(MESSAGE, "No pending requests");
			} else {
				result.put(MESSAGE, String.format("%d pending requests found ", pendingRequests.size()));
				result.put("pendingRequests", pendingRequests);
				result.put("pendingRequestsCount", pendingRequests.size());

			}
			result.put(STATUS, true);
			responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.OK.value()));
			responseVo.setMessage(HttpStatus.OK.getReasonPhrase());

		} catch (Exception e) {
			e.printStackTrace();
			result.put(STATUS, false);
			result.put(MESSAGE, "Invalid User Id and parameters" + e.getMessage());
			responseVo.setStatusCode(HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()));
			responseVo.setMessage(HttpStatus.BAD_REQUEST.getReasonPhrase());
		}
		responseVo.setResult(result);
		return new ResponseEntity(responseVo, responseVo.getStatusCode());
	}
	
/*repository*/
@Query(value = """
						SELECT
			    request_id,
			    request_type,
			    requestor_user_id,
			    target_role_id,
			    request_payload,
			    request_status,
			    request_date,
			    approval_date,
			    approver_user_id,
			    reason_for_rejection,
			    execution_date,
			    execution_details
			FROM
			    role_requests
			WHERE
			        requestor_user_id != :requestedByUserId
			    AND request_status = 'PENDING'
						""", nativeQuery = true)
	List<UserRequest> findPendingRoleRequests(@RequestParam("requestedByUserId") String requestedByUserId);
	
/*modal*/
@Table(name = "USER_REQUESTS")
public class UserRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REQUEST_ID")
	private int requestId;
	
	@Column(name = "REQUEST_TYPE")
	private String requestType;
	
	@Column(name = "REQUESTOR_USER_ID")
	private String requestorUserId;
	
	@Column(name = "TARGET_USER_ID")
	private String targetUserId;
	
	@Column(name = "REQUEST_PAYLOAD")
	private String requestPayload;
	
	@Column(name = "REQUEST_STATUS")
	private String requestStatus;
	
	@Column(name = "REQUEST_DATE", nullable = false, insertable = false, updatable = false)
	private Timestamp requestDate;
	
	@Column(name = "APPROVAL_DATE")
	private Timestamp approvalDate;
	
	@Column(name = "APPROVER_USER_ID")
	private String approverUserId;
	
	@Column(name = "REASON_FOR_REJECTION")
	private String reasonForRejection;
	
	@Column(name = "EXECUTION_DATE")
	private Timestamp executionDate;
	
	@Column(name = "EXECUTION_DETAILS")
	private String executionDetails;
}


/*Error*/
2025-10-30 :: 15:27:10.908 || [34mINFO :: DirectJDKLog.java: | 173 |[0;39m ::  Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-10-30 :: 15:27:10.908 || [34mINFO :: FrameworkServlet.java: | 532 |[0;39m ::  Initializing Servlet 'dispatcherServlet'
2025-10-30 :: 15:27:10.910 || [34mINFO :: FrameworkServlet.java: | 554 |[0;39m ::  Completed initialization in 2 ms
org.springframework.core.convert.ConversionFailedException: Failed to convert from type [java.lang.Object[]] to type [com.tcs.userservice.model.UserRequest] for value [{...}]
	at org.springframework.core.convert.support.ConversionUtils.invokeConverter(ConversionUtils.java:47)
	at org.springframework.core.convert.support.GenericConversionService.convert(GenericConversionService.java:182)
	at org.springframework.core.convert.support.GenericConversionService.convert(GenericConversionService.java:165)
	at org.springframework.data.repository.query.ResultProcessor$ProjectingConverter.convert(ResultProcessor.java:305)
	at org.springframework.data.repository.query.ResultProcessor$ChainingConverter.lambda$and$0(ResultProcessor.java:233)
	at org.springframework.data.repository.query.ResultProcessor$ChainingConverter.convert(ResultProcessor.java:240)
	at org.springframework.data.repository.query.ResultProcessor.processResult(ResultProcessor.java:160)
	at org.springframework.data.jpa.repository.query.AbstractJpaQuery.doExecute(AbstractJpaQuery.java:155)
	at org.springframework.data.jpa.repository.query.AbstractJpaQuery.execute(AbstractJpaQuery.java:140)
	at org.springframework.data.repository.core.support.RepositoryMethodInvoker.doInvoke(RepositoryMethodInvoker.java:170)
	at org.springframework.data.repository.core.support.RepositoryMethodInvoker.invoke(RepositoryMethodInvoker.java:158)
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.doInvoke(QueryExecutorMethodInterceptor.java:164)
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.invoke(QueryExecutorMethodInterceptor.java:143)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.data.projection.DefaultMethodInvokingMethodInterceptor.invoke(DefaultMethodInvokingMethodInterceptor.java:70)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:123)
	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:392)
	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:137)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:136)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:223)
	at jdk.proxy16/jdk.proxy16.$Proxy282.findPendingRoleRequests(Unknown Source)
	at com.tcs.userservice.service.RoleRequestServiceImpl.getPendingRoleRequests(RoleRequestServiceImpl.java:175)
	at com.tcs.userservice.controller.RoleRequestController.getPendingRequests(RoleRequestController.java:33)
	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:103)
	at java.base/java.lang.reflect.Method.invoke(Method.java:580)
