---
For a Java developer with four years of experience, interviews will focus on a deep understanding of core concepts, multithreading, Java 8 features, design patterns, and problem-solving skills. 
?? Core Java & OOPs Concepts
Explain the internal working of HashMap and how it handles collisions.
Answer: HashMap works on the principle of hashing. It uses an array of buckets, and each bucket is a linked list (or a balanced tree in Java 8 for large buckets to mitigate performance issues). When you put an object, it calculates the hashcode of the key, determines the bucket index, and stores the key-value pair as a Node in that bucket. Collisions are handled by storing multiple entries in the linked list/tree at the same bucket index. You should also discuss factors affecting performance, such as initial capacity and load factor.

What is the difference between == operator and equals() method?
Answer: The == operator compares memory addresses (references) for objects to check if they are the same instance. The equals() method compares the values or contents of objects, and it can be overridden in custom classes to define specific business logic for equality. For strings created with literals, == might return true due to the string constant pool, but for objects created with new String(), it returns false because they have different memory locations.

Differentiate between an Abstract Class and an Interface.
Answer: An abstract class can have abstract and non-abstract methods, as well as instance variables and constructors. It supports single inheritance. An interface, as of Java 8, can have abstract methods, default methods, static methods, and static final variables. A class can implement multiple interfaces, allowing for multiple inheritances of behavior. The key difference is an abstract class defines what an object is, while an interface defines what a class can do (a contract). 
---
?? Multithreading & Concurrency
Explain the Java thread lifecycle.
Answer: A thread goes through several states: New, Runnable (ready to run), Running (executing), Blocked (waiting for a lock), Waiting (indefinitely waiting for another thread to perform an action), Timed Waiting (waiting for a specified time), and Terminated.

What is the difference between synchronized and ReentrantLock?
Answer: synchronized is a keyword built into the language, providing basic locking and memory visibility. ReentrantLock is a class in the java.util.concurrent.locks package, offering more advanced features like lock polling (tryLock()), timed locks (tryLock(long timeout, TimeUnit unit)), and the ability to create separate conditions for waiting/notifying.

How do you create a deadlock scenario programmatically in Java, and how can it be avoided?
Answer: A deadlock occurs when two or more threads are blocked forever, each waiting for the other to release a resource. It can be created with a scenario where Thread 1 holds a lock on Object A and waits for Object B, while Thread 2 holds a lock on Object B and waits for Object A. It can be avoided by ensuring a consistent lock acquisition order across all threads. 
---
?? Java 8 Features & Best Practices
What are lambda expressions and functional interfaces in Java 8?
Answer: Lambda expressions provide a concise way to represent an anonymous function. A functional interface is an interface with a single abstract method, which can be instantiated using a lambda expression.

How do you use the Stream API to find duplicate elements or perform calculations on a list?
Answer: The Stream API allows for functional-style operations on streams of elements, such as filtering, mapping, and reducing, which can be processed sequentially or in parallel. For example, you can use list.stream().filter(e -> Collections.frequency(list, e) > 1).collect(Collectors.toSet()) to find duplicates.

Why are String objects immutable in Java?
Answer: Immutability provides several benefits, including thread safety (strings can be safely shared across multiple threads), security (important for class loading and network connections), and efficient use of the string constant pool, which saves memory by allowing multiple references to the same object with the same value. 

---

?? Design & Architecture
Explain the Singleton design pattern and different ways to implement it.
Answer: The Singleton pattern ensures a class has only one instance and provides a global point of access to it. Implementations include eager initialization, lazy initialization (using synchronized methods or blocks for thread safety), the Bill Pugh singleton, or using enums, which is often considered the best approach.

What is dependency injection, and why is it beneficial?
Answer: Dependency Injection (DI) is a design pattern where dependencies (required objects) are provided to a class by an external entity (like a Spring framework container) rather than the class creating them itself. This promotes loose coupling, making code easier to test, maintain, and reuse. 
---
