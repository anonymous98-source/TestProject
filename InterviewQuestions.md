
---

✅ TOP 30 MOST-ASKED INTERVIEW QUESTIONS

Java Backend Developer (5+ Years)


---

🧠 CORE JAVA (Basics decide rejection fast)


---

1. What happens if you override equals() but not hashCode()?

Rule:

If two objects are equal using equals(), they must have the same hashCode().

What breaks in production?

Collections like HashMap, HashSet, HashTable use hashCode() to find buckets.

If:

obj1.equals(obj2) == true
but obj1.hashCode() != obj2.hashCode()

Then:

HashMap.get() may fail

Duplicate keys appear

Data loss / cache miss bugs


Real impact:

Login systems, cache keys, session tokens fail unpredictably.


---

2. Explain HashMap internal working (Java 8+)

Uses array of buckets

Each bucket holds:

Linked List (default)

Tree (Red-Black Tree when large)



Steps for put():

1. Compute hash(key)


2. Index = (n - 1) & hash


3. Insert into bucket:

If empty → new Node

If collision → linked list / tree




Java 8 improvement:

Converts long chains into trees → O(log n) lookup



---

3. When does HashMap convert bucket into tree?

Conditions:

Bucket size > 8

Table capacity ≥ 64


Otherwise it resizes instead of treeifying.


---

4. Why is String immutable?

Security:

Used in:

DB URLs

Classloaders

Passwords


If mutable → attacker can change value after validation


Performance:

String pool reuse

Hashcode cached

Thread-safe by default



---

5. Comparable vs Comparator (multiple sorting logic)

Comparable	Comparator

Natural order	Custom order
Implemented in class	Separate class/lambda
Single logic	Multiple logics


Example:

Collections.sort(list, Comparator.comparing(User::getAge));
Collections.sort(list, Comparator.comparing(User::getSalary));


---

⚡ JAVA 8 / STREAM API


---

6. map() vs flatMap() (real example)

map():

Stream<List<String>> → Stream<Stream<String>>

flatMap():

Stream<List<String>> → Stream<String>

Real case: Orders → OrderItems
Use flatMap() to flatten items.


---

7. findFirst() vs findAny() in parallel streams

findFirst() → preserves order (slower)

findAny() → any element (faster in parallel)


Use findAny() for performance in parallel streams.


---

8. When are streams slower than loops?

Streams are worse when:

Small collections

Heavy boxing/unboxing

Complex lambdas

Parallel overhead > benefit


For critical loops → use for loop.


---

9. groupingBy() with downstream collectors

Map<String, Long> map =
list.stream()
.collect(Collectors.groupingBy(
User::getDept,
Collectors.counting()
));

Downstream:

counting()

summingInt()

mapping()

toSet()



---

10. Why Optional should NOT be class field?

Not Serializable friendly

Breaks JPA

Designed for return types only

Makes JSON ugly


Bad:

Optional<String> name;

Good:

String name;
Optional.ofNullable(name)


---

🌱 SPRING / SPRING BOOT


---

11. @Component vs @Service vs @Repository

All are @Component technically.

Annotation	Special Feature

@Repository	Exception translation (SQL → Spring exception)
@Service	Business logic marker
@Component	Generic



---

12. Spring Bean lifecycle

1. Instantiate


2. Populate properties


3. BeanNameAware


4. BeanFactoryAware


5. postProcessBeforeInit


6. @PostConstruct


7. InitializingBean.afterPropertiesSet()


8. postProcessAfterInit


9. Ready to use


10. @PreDestroy


11. destroy()




---

13. @Transactional REQUIRED vs REQUIRES_NEW

REQUIRED → joins existing TX

REQUIRES_NEW → suspends current, creates new


Use case: Audit logging must commit even if business fails.


---

14. Global exception handling in REST

@RestControllerAdvice
public class GlobalExceptionHandler {

@ExceptionHandler(NotFoundException.class)
public ResponseEntity<?> handle() {}
}

Return:

HTTP status

message

timestamp

traceId



---

15. Spring Boot startup & AutoConfiguration

Steps:

1. SpringApplication.run()


2. Load ApplicationContext


3. Scan components


4. Load spring.factories


5. EnableAutoConfiguration


6. Conditional beans loaded




---

🌍 MICROSERVICES


---

16. Sync vs Async communication

REST is bad when:

Long processing

High traffic

Chained services

Failure propagation


Use async (Kafka/RabbitMQ) for:

Payments

Notifications

Logs



---

17. Circuit Breaker solves?

Prevents:

Cascading failure

Thread exhaustion

Slow downstream blocking


States:

Closed

Open

Half-open



---

18. Idempotency (payment example)

Multiple retries must not double charge.

Use:

Idempotency key

Unique transaction ID



---

19. Change config without restart

Spring Cloud Config

Consul

Kubernetes ConfigMap

@RefreshScope



---

20. API versioning strategies

URI: /api/v1/users

Header: Accept: v1

Param: ?version=1


Best: URI versioning


---

🗄 DATABASE / JPA


---

21. N+1 problem

1 query for parent
N queries for children

Detect:

Enable SQL logs


Fix:

fetch join

EntityGraph

batch size



---

22. Lazy vs Eager fetching

Wrong EAGER:

Huge joins

Memory blowup


Lazy preferred by default.


---

23. When index NOT used?

Like %abc

Function on column

Small tables

Type mismatch

Not selective



---

24. Optimistic vs Pessimistic locking

Optimistic	Pessimistic

Version column	DB lock
High read, low conflict	High conflict
Better performance	Safer



---

25. Pagination for huge tables

Avoid offset for big tables.

Use:

WHERE id > last_seen_id LIMIT 20

(Keyset pagination)


---

🏗 SYSTEM DESIGN / PRODUCTION


---

26. Wallet transfer consistency

Use:

DB transaction

Row locking

Deduct → Add → Commit

Saga pattern for microservices



---

27. Scale high-traffic API

Load balancer

Horizontal scaling

Cache (Redis)

DB indexing

Async processing



---

28. When caching is harmful?

Frequently changing data

Financial systems

Strong consistency needed

Wrong TTL → stale data



---

29. Rate limiting

Use:

Token bucket

Redis counter

API Gateway


Example: 100 req/min per IP


---

30. First 30 minutes of production issue

1. Check alerts/logs


2. Identify scope


3. Rollback if needed


4. Check DB/CPU/memory


5. Communicate status


6. Apply hotfix


7. Post-mortem




---

✅ END


---
