Absolutely ✅
Here is the complete Full Stack Java Developer Interview Q&A (80 Questions + Answers) in a single clean text document — no download needed.
You can copy, save, or convert it anywhere.


---

✅ FULL STACK JAVA INTERVIEW QUESTIONS & ANSWERS (80 Questions)

✅ Suited for 5–8 years experienced Full Stack Java Developers

(Java + Spring Boot + Microservices + DB + Security + DevOps + React + System Design)


---

✅ 1. Difference between HashMap, ConcurrentHashMap, and SynchronizedMap

HashMap: Not thread-safe, allows null, fastest for single-thread use.

SynchronizedMap: Thread-safe, but entire map locked → slow.

ConcurrentHashMap: Thread-safe with segment-level locking, very fast, no null allowed.



---

✅ 2. JVM Memory Model

Heap → objects

Stack → method calls, local variables

Metaspace → class metadata

PC Register & Native Stack → thread instructions & JNI code
Garbage Collection automatically removes unreachable objects. Latest is G1 GC, reduces pause time.



---

✅ 3. volatile vs synchronized vs ReentrantLock

volatile → visibility only, no locking

synchronized → mutual exclusion, auto-release lock

ReentrantLock → advanced features (fairness, tryLock, manual unlock)



---

✅ 4. ThreadLocal

Stores variable separately for each thread.
Used for request context, user session, logging trace IDs.


---

✅ 5. Functional Programming in Java

Supports lambdas, Streams, Optional.
Makes code concise and supports parallel processing.

Example:

list.stream().filter(x -> x > 10).collect(Collectors.toList());


---

✅ 6. equals() & hashCode() contract

If two objects are equal, they must have same hashCode.
Otherwise HashSet / HashMap will behave incorrectly.


---

✅ 7. Runnable vs Callable

Runnable: no return value, no checked exception

Callable: returns value, can throw checked exception



---

✅ 8. Immutable Class

private + final fields

no setters

defensive copies
Thread-safe without synchronization.



---

✅ 9. Garbage Collection

GC clears unused objects from heap.
Types: Serial, Parallel, CMS, G1 GC (best modern option).


---

✅ 10. Spring MVC Request Flow

Client → DispatcherServlet → HandlerMapping → Controller → Service → Repository → ViewResolver → Response


---

✅ 11. @Component, @Service, @Repository, @Controller

@Component generic bean

@Service business logic

@Repository DB access + exception translation

@Controller MVC controller

@RestController returns JSON



---

✅ 12. Bean Lifecycle

1. Instantiate


2. Dependency injection


3. @PostConstruct


4. Ready


5. @PreDestroy




---

✅ 13. AOP (Aspect-Oriented Programming)

Used for cross-cutting concerns:

Logging

Security

Transactions

Auditing



---

✅ 14. @Transactional Propagation

REQUIRED → use existing or create new

REQUIRES_NEW → always start new

SUPPORTS → optional

MANDATORY → must have existing

NEVER → throws error if transaction exists



---

✅ 15. RestTemplate vs WebClient vs Feign

RestTemplate → blocking, synchronous

WebClient → non-blocking, async

Feign → declarative HTTP client for microservices



---

✅ 16. JWT Authentication

JWT = Header + Payload + Signature
Sent in HTTP header: Authorization: Bearer <token>
Stateless, no server-side session.


---

✅ 17. Circuit Breaker (Resilience4j)

Stops calling failing service, returns fallback, avoids cascading failure.
States: Closed → Open → Half-open


---

✅ 18. Service Discovery

Instead of hardcoding IP addresses:
Services register themselves to Eureka/Consul, callers find them by name.


---

✅ 19. API Gateway

One entry point for all requests:

Auth

Routing

Rate limiting

Logging
Examples: Spring Cloud Gateway, Zuul, Nginx.



---

✅ 20. Idempotency

Calling same request multiple times results in same effect.
Safe REST methods: PUT, DELETE.
Used in payments, order creation (via idempotency keys).


---

✅ 21. Saga vs Two-Phase Commit

Saga: break transaction into events + compensation.
2PC: strict consistency, slow, blocking.
Saga preferred in microservices.


---

✅ 22. Event-Driven Architecture

Services talk using events (Kafka/RabbitMQ), not direct API calls.
Improves scalability & decoupling.


---

✅ 23. API Versioning

/v1/users

Header: X-API-VERSION

Query param: ?version=2



---

✅ 24. ACID vs CAP

ACID → DB consistency

CAP → distributed systems choose 2 of Consistency, Availability, Partition tolerance



---

✅ 25. SQL JOINs

INNER → only matching rows

LEFT → left + matches

RIGHT → right + matches



---

✅ 26. Indexing

Improves read speed.
Bad for heavy inserts/updates.
Best on search columns.


---

✅ 27. Fixing Slow SQL

Add index

Avoid SELECT *

Use JOIN instead of subquery

Analyze execution plan

Cache results



---

✅ 28. Optimistic vs Pessimistic Locking

Optimistic → version check, no lock

Pessimistic → lock row until commit



---

✅ 29. Why NoSQL?

High scalability

JSON storage

Fast reads/writes

Flexible schema



---

✅ 30. Sharding vs Partitioning

Partitioning → within same DB server

Sharding → across multiple servers



---

✅ 31. Connection Pooling

Reuse DB connections instead of creating new each time.
Spring Boot uses HikariCP.


---

✅ 32. Isolation Levels

Read Uncommitted

Read Committed

Repeatable Read

Serializable



---

✅ 33. Lazy vs Eager Loading

Lazy → loads when accessed (preferred)
Eager → loads immediately (can cause huge joins)


---

✅ 34. N+1 Query Problem

1 query for parent, N queries for children.
Fix → JOIN FETCH or EntityGraph.


---

✅ 35. Hibernate Caching

L1 → session
L2 → shared across sessions (Ehcache, Redis)


---

✅ 36. OneToMany / ManyToMany

OneToMany uses mappedBy, ManyToMany uses join table.
Always use LAZY for collections.


---

✅ 37. SPA vs MPA

SPA → React/angular, fast navigation, API calls
MPA → full reload (JSP/Thymeleaf)


---

✅ 38. React State Management

useState

Context API

Redux (large apps)



---

✅ 39. Virtual DOM

React uses diff algorithm, updates only changed nodes, improves performance.


---

✅ 40. CORS

Browser blocks cross-origin.
Fix with @CrossOrigin or global config.


---

✅ 41. REST Constraints

Stateless

Cacheable

Client-server

Uniform interface

Layered system



---

✅ 42. HATEOAS

REST responses contain hyperlinks to next actions.


---

✅ 43. Pagination / Filtering / Sorting

/users?page=1&size=10&sort=name,asc&status=ACTIVE


---

✅ 44. Common HTTP Status Codes

200 OK
201 Created
400 Bad request
401 Unauthorized
403 Forbidden
404 Not found
409 Conflict
500 Server error


---

✅ 45. Secure File Upload

Validate extension + size

Scan malware

Store outside web root

Use S3, not local path



---

✅ 46. Docker Image vs Container

Image → blueprint
Container → running instance


---

✅ 47. Dockerfile Example

FROM openjdk:17
COPY app.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]


---

✅ 48. Docker Compose

Runs multiple services together (app + DB + Redis).


---

✅ 49. Kubernetes

Orchestration: scaling, rolling updates, self-healing pods.


---

✅ 50. Blue-Green vs Canary Deploy

Blue-Green → switch full traffic
Canary → release to small users first


---

✅ 51. CI/CD

Automated build → test → deploy
Tools: Jenkins, GitHub Actions, GitLab


---

✅ 52. Reverse Proxy vs Load Balancer

Reverse Proxy → routes request internally
Load Balancer → distributes load evenly


---

✅ 53. JWT Structure

header.payload.signature


---

✅ 54. OAuth2

Authorization protocol (Google, GitHub login).


---

✅ 55. Prevent SQL Injection

PreparedStatement, ORM, input validation.


---

✅ 56. Prevent XSS

Escape output, sanitize input, CSP header.


---

✅ 57. CSRF

Attack using valid user cookies.
Fix: CSRF token, SameSite cookies.


---

✅ 58. URL Shortener System Design

Base62 hash

Redis cache

DB persistence

302 redirect



---

✅ 59. Load Balancing Strategies

Round robin

Least connections

Weighted

IP hash



---

✅ 60. Unit vs Integration Test

Unit → test single class
Integration → full flow with DB


---

✅ 61. @Mock, @Spy, @InjectMocks

Mock → dummy object
Spy → real object + stubbing
InjectMocks → DI into target class


---

✅ 62. Testcontainers

Runs real DB/Kafka inside Docker during tests.


---

✅ 63. Sync vs Async

Sync → waits
Async → non-blocking (Kafka)


---

✅ 64. Kafka Usage

Event-driven microservices, logs, analytics, streaming.


---

✅ 65. Producer / Consumer / Topic / Partition

Topic → category
Partition → scalability
Producer → send
Consumer → read


---

✅ 66. Idempotency Key

Prevent duplicate operations (payments, orders).


---

✅ 67. Monolith vs Microservices vs Serverless

Monolith → one big codebase
Microservices → small services
Serverless → functions, pay-per-use


---

✅ 68. Distributed Tracing

Trace request across services: Zipkin, Jaeger.


---

✅ 69. Caching Types

Local (Ehcache), Distributed (Redis), In-memory (Map)


---

✅ 70. Horizontal vs Vertical Scaling

Horizontal → more servers
Vertical → bigger server


---

✅ 71. PUT vs POST vs PATCH

PUT → replace
POST → create
PATCH → partial update


---

✅ 72. 3-Tier Architecture

Frontend (React) → Backend (Spring Boot) → DB


---

✅ 73. CQRS

Separate read/write models for scale.


---

✅ 74. Event Sourcing

Store events instead of final state.


---

✅ 75. Producer–Consumer

BlockingQueue, wait/notify, semaphores.


---

✅ 76. LRU Cache

HashMap + Doubly Linked List → O(1)


---

✅ 77. Detect Cycle in LinkedList

Slow/fast pointer algorithm.


---

✅ 78. Redis Use Cases

Cache, session store, rate limit, pub/sub.


---

✅ 79. When to use NoSQL

High volume, horizontal scale, flexible schema, JSON.


---

✅ 80. HR — Biggest Challenge Solved

Use STAR format:

Situation

Task

Action

Result


Example:
Optimized microservice with caching + Kafka → reduced response time by 80%, DB load by 70%.


---

✅ Complete text document delivered. You can copy and save anywhere.


---

✅ Want bonus content?

✔ 100 Microservices-only questions
✔ DevOps interview set
✔ System Design mini book
✔ SQL tricky questions

Just tell me what you’d like next.