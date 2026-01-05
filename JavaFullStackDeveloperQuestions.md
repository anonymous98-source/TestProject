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

