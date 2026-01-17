---

🚀 Spring Boot & React Interview Questions with Sample Answers (4+ Years Experience)


---

📌 Spring Boot Interview Questions


---

1️⃣ Core Concepts & Annotations

❓ Explain the internal workings of @SpringBootApplication

Answer:
@SpringBootApplication is a convenience annotation that combines:

@Configuration → Marks the class as a source of bean definitions

@EnableAutoConfiguration → Enables Spring Boot’s auto-configuration

@ComponentScan → Scans components from the package and sub-packages


This reduces boilerplate configuration and bootstraps the application.


---

❓ What is @EnableAutoConfiguration?

Answer:
It enables Spring Boot to automatically configure beans based on:

Classpath dependencies

Existing beans

Application properties


For example, if spring-boot-starter-data-jpa is on the classpath, Spring auto-configures EntityManager, DataSource, etc.


---

❓ What is Convention over Configuration?

Answer:
It means Spring Boot provides default configurations so developers don’t need to configure everything manually.
Example:

Default application.properties

Embedded Tomcat

Auto-configured Jackson for JSON


Customization is needed only when deviating from defaults.


---

❓ Difference between @Component, @Service, @Repository, @Controller

Answer:

Annotation	Purpose

@Component	Generic Spring-managed bean
@Service	Business logic layer
@Repository	DAO layer, adds exception translation
@Controller	Handles web requests (MVC)



---

❓ Constructor vs Setter vs Field Injection

Answer:

Constructor Injection (Preferred)

Immutable

Better for testing

Fails fast


Setter Injection

Optional dependencies


Field Injection

Not recommended (hard to test, reflection-based)




---

2️⃣ Data & Persistence

❓ What is Spring Data JPA?

Answer:
Spring Data JPA abstracts boilerplate JPA code and provides:

CRUD operations

Pagination

Sorting

Query methods by naming convention


It reduces manual DAO implementation compared to JDBC or Hibernate.


---

❓ Explain @Transactional

Answer:
@Transactional ensures atomicity of database operations.

Key attributes:

Propagation – Defines transaction behavior (REQUIRED, REQUIRES_NEW)

Isolation – Controls data visibility (READ_COMMITTED, SERIALIZABLE)

RollbackFor – Custom rollback conditions



---

❓ How do you handle DB migrations?

Answer:
Using tools like:

Flyway – Versioned SQL-based migrations

Liquibase – XML/YAML/SQL based migrations


They ensure schema consistency across environments.


---

3️⃣ REST APIs & Exception Handling

❓ How do you build RESTful services?

Answer:

Use proper HTTP verbs

Return meaningful status codes

Use DTOs instead of entities

Follow REST naming conventions



---

❓ How do you implement global exception handling?

Answer:
Using @RestControllerAdvice:

Centralizes exception handling

Improves consistency

Separates error logic from controllers



---

❓ How do you configure CORS?

Answer:
Via:

@CrossOrigin

Global CORS configuration using WebMvcConfigurer


Essential for React frontend integration.


---

4️⃣ Security & Operations

❓ How do you secure Spring Boot applications?

Answer:
Using Spring Security:

Authentication & Authorization

JWT-based stateless auth

Role-based access

CSRF protection (disabled for APIs)



---

❓ What are Actuator endpoints?

Answer:
They expose operational insights:

/health

/metrics

/info


Used for monitoring and alerting in production.


---

❓ What are Spring Profiles?

Answer:
Profiles allow environment-specific configurations:

dev

test

prod


Activated via:

Properties

Environment variables

JVM arguments



---

5️⃣ Advanced Topics

❓ When would you use Spring WebFlux?

Answer:
Use WebFlux when:

High concurrency

Non-blocking I/O

Streaming APIs


Not ideal for traditional CRUD apps.


---

❓ How do you handle circular dependencies?

Answer:

Refactor logic

Use constructor injection

Introduce interfaces

Avoid @Lazy unless unavoidable



---

⚛️ React Interview Questions


---

1️⃣ Core Concepts

❓ What is Virtual DOM?

Answer:
A lightweight JS representation of the real DOM. React updates only changed nodes using diffing, improving performance.


---

❓ Functional vs Class Components

Answer:
Functional components:

Simpler

Hooks-based

Better performance

Preferred in modern React



---

❓ Props vs State

Answer:

Props	State

Read-only	Mutable
Passed from parent	Managed internally
Immutable	Changes trigger re-render



---

2️⃣ Hooks

❓ Explain useEffect

Answer:
Used for side effects:

API calls

Subscriptions

DOM updates


Dependency array controls execution.


---

❓ useMemo vs useCallback

Answer:

useMemo → Memoizes computed values

useCallback → Memoizes functions


Used to prevent unnecessary re-renders.


---

❓ When to use useReducer?

Answer:
When:

Complex state transitions

Multiple related state values

Redux-like patterns



---

3️⃣ Architecture & Patterns

❓ What is Prop Drilling?

Answer:
Passing props through multiple layers unnecessarily.
Solved using Context API or state management libraries.


---

❓ Redux vs Context API

Answer:

Redux	Context

Global state	Simple state
Middleware support	No middleware
Better debugging	Lightweight



---

4️⃣ Performance & Testing

❓ How do you optimize React apps?

Answer:

Code splitting

Lazy loading

Memoization

Virtualized lists



---

❓ What are Error Boundaries?

Answer:
They catch runtime errors in rendering and display fallback UI without crashing the app.


---

❓ How do you test React apps?

Answer:

Jest → Unit tests

React Testing Library → Component behavior tests



---

🔗 Spring Boot + React Integration


---

❓ JWT Authentication Flow

Answer:

1. User logs in from React


2. Backend generates JWT


3. Token stored securely


4. Token sent with API requests


5. Backend validates token




---

❓ Deployment Strategy

Answer:

React → Build & deploy via Nginx

Spring Boot → JAR/Docker

Use reverse proxy for API calls



---

Here are clear, interview-ready answers to all 21 questions:


---

1. Volatile vs Transient

volatile: Ensures visibility of changes to a variable across threads (used in multithreading).

transient: Prevents a variable from being serialized.



---

2. Vector vs ArrayList

Vector is synchronized (thread-safe) → slower.

ArrayList is not synchronized → faster.

Vector is legacy; ArrayList is preferred.



---

3. Collection vs Collections

Collection: Interface (List, Set, Queue extend it).

Collections: Utility class with static methods (sort, reverse, synchronize).



---

4. ... in method parameters

Varargs (variable-length arguments).


void test(int... nums)

Allows passing 0 or more arguments.


---

5. Thread-safe Singleton (Best Practice)

class Singleton {
    private Singleton() {}

    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}


---

6. Importance of hashCode() & equals()

Used by HashMap, HashSet.

Contract:

If equals() is true → hashCode() must be same.

Same hashCode ≠ equals necessarily.




---

7. classpath vs path

PATH: OS-level → locates executables (java, javac).

CLASSPATH: JVM-level → locates .class files & libraries.



---

8. Result of code and why

👉 Code not provided
Result depends on:

Static vs instance

Overloading vs overriding

Autoboxing

Exception handling



---

9. Helping a colleague with Serialization issues

Ensure class implements Serializable

Mark non-serializable fields as transient

Handle serialVersionUID

Avoid serializing resources (DB connections, streams)



---

10. wait(): if or loop?

✅ Always use loop

while(conditionNotMet) {
    wait();
}

Prevents spurious wakeups.


---

11. HashMap in multithreading

❌ Not thread-safe. ✅ Use:

Collections.synchronizedMap()

ConcurrentHashMap (best choice)



---

12. Result of code

👉 Code missing
Common interview traps:

Integer caching

String pool

Static binding

Try-catch-finally



---

13. Result of Java code

👉 Code missing
Outcome depends on:

Order of execution

Exception handling

Static initialization blocks



---

14. Result of 1.0 / 0.0

✅ Infinity

System.out.println(1.0 / 0.0); // Infinity

(No exception for floating-point division)


---

15. Can child throw RuntimeException if parent throws NPE?

❌ No

NullPointerException is already a RuntimeException.

You cannot broaden unchecked exceptions in overriding.



---

16. String literal vs new()

String s1 = "Java";
String s2 = new String("Java");

Literal → String Pool

new → Heap (different object)

Literals save memory



---

17. Output of code

👉 Code missing
Likely based on:

String immutability

== vs equals

Autoboxing



---

18. Result of program

👉 Code missing
Depends on:

Thread behavior

Exception flow

Inheritance rules



---

19. Output and why

👉 Code missing
Interviewers usually test:

Operator precedence

Post/pre increment

Method hiding vs overriding



---

20. Should all immutable objects be final?

❌ Not mandatory
But best practice:

Class should be final

Fields should be final

No setters

Defensive copies



---

21. Factory Design Pattern

Creates objects without exposing instantiation logic

Promotes loose coupling


interface Shape { }
class Circle implements Shape { }

class ShapeFactory {
    static Shape getShape(String type) {
        return new Circle();
    }
}


---

Below is a Capgemini-style Microservices + Spring Boot mock interview tailored for a Java Full-Stack / Backend profile (3–6 yrs).
Answers are crisp, practical, and scenario-driven—exactly what interviewers expect.


---

🔹 ROUND 1 – Core Microservices (Easy → Medium)

1. What is a microservice? Why not monolith?

Answer:
A microservice is an independently deployable service focused on a single business capability.
It improves scalability, fault isolation, and faster deployments compared to monolithic architecture.


---

2. How does Spring Boot help in microservices?

Answer:
Spring Boot provides:

Embedded server (Tomcat)

Auto-configuration

Production-ready features (Actuator)

Easy integration with Spring Cloud components



---

3. How do microservices communicate?

Answer:

Synchronous: REST (HTTP)

Asynchronous: Kafka / RabbitMQ
Asynchronous communication is preferred for better resilience.



---

4. What is service discovery?

Answer:
Service discovery allows microservices to dynamically locate each other without hard-coded URLs.
Example: Eureka Server.


---

5. Difference between REST and Feign Client

Answer:
Feign Client provides a declarative REST client, reducing boilerplate code compared to RestTemplate.


---

🔹 ROUND 2 – Spring Cloud & Architecture (Medium)

6. What is an API Gateway?

Answer:
An API Gateway acts as a single entry point that handles:

Authentication

Routing

Rate limiting

Load balancing


Example: Spring Cloud Gateway


---

7. How do you handle configuration across microservices?

Answer:
Using Spring Cloud Config Server, configurations are centralized and version-controlled using Git.


---

8. How do you secure microservices?

Answer:

OAuth2 / JWT

API Gateway authentication

Role-based authorization

HTTPS



---

9. What is Circuit Breaker?

Answer:
Circuit Breaker prevents cascading failures when a dependent service is down.
Spring uses Resilience4j.


---

10. Difference between Load Balancer & API Gateway

Answer:

Load Balancer distributes traffic.

API Gateway manages cross-cutting concerns like security and routing.



---

🔹 ROUND 3 – Data, Transactions & Resilience (Medium → Hard)

11. Can multiple microservices share a database?

Answer:
No. Each microservice must have its own database to maintain loose coupling.


---

12. How do you manage transactions across microservices?

Answer:
Using Saga Pattern:

Choreography (event-based)

Orchestration (central coordinator)



---

13. How do you handle failures in microservices?

Answer:

Circuit Breaker

Retry

Timeout

Fallback mechanisms



---

14. Difference between @Transactional in monolith vs microservices

Answer:
@Transactional works within a single service/database.
Distributed transactions are handled via Saga, not traditional ACID.


---

15. How do you handle versioning in microservices APIs?

Answer:

URL versioning (/v1/orders)

Header-based versioning

Backward compatibility is preferred



---

🔹 ROUND 4 – Spring Boot Deep Dive (Hard)

16. Difference between RestTemplate and WebClient

Answer:

RestTemplate is blocking (deprecated)

WebClient is non-blocking and reactive



---

17. How does Spring Boot auto-configuration work?

Answer:
Spring Boot uses:

@EnableAutoConfiguration

spring.factories

Conditional annotations (@ConditionalOnClass)



---

18. What are Actuator endpoints?

Answer:
They expose application health and metrics:

/health

/metrics

/info



---

19. How do you handle logging and tracing?

Answer:

Centralized logging (ELK Stack)

Distributed tracing using Sleuth + Zipkin



---

20. What happens when one microservice is slow?

Answer:
It can block dependent services.
Handled using:

Timeouts

Circuit breakers

Asynchronous messaging



---

🔹 ROUND 5 – Real-Time Capgemini Scenario Questions

21. Payment service is down. Order service should still work. How?

Answer:
Use:

Circuit breaker

Message queue

Eventual consistency



---

22. How do you deploy microservices?

Answer:

Docker containers

Kubernetes

CI/CD pipelines (Jenkins/GitHub Actions)



---

23. How do you monitor microservices in production?

Answer:

Actuator

Prometheus + Grafana

Centralized logging



---

24. How do you scale microservices?

Answer:
Horizontally scale specific services using containers and load balancers.


---

25. When would you NOT use microservices?

Answer:

Small applications

Tight deadlines

Limited DevOps maturity



---

🔥 Capgemini Final Interview Tip

> Focus on real project usage, not definitions.
Use keywords: Resilience, Scalability, Fault Isolation, Loose Coupling.




---
