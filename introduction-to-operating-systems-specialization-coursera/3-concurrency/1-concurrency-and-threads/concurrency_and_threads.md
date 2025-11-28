# Concurrency and Threads

### Introduction

- **Overview**: So far, we’ve explored how the OS abstracts hardware to provide multiple virtual CPUs, allowing the illusion of simultaneous program execution. We’ve also covered how processes can appear to have large private address spaces through memory management

- **Threads**: A novel abstraction within a single process, enabling multiple execution points (or threads) within the same process. Threads share the same address space and can access the same data, unlike separate processes that have their own isolated address spaces

- **Key Differences from Processes**:
  - Threads are similar to processes but share the same address space, allowing for easier data sharing
  - Each thread has its own **Program Counter (PC)**, **register set**, and **stack**
  - Threads require a **Thread Control Block (TCB)** to manage their state, similar to a Process Control Block (PCB) for processes

### Why Use Threads?

- **Two Main Reasons**:

  1. **Parallelism**:

     - Multiple threads can work on different parts of a problem concurrently, leveraging multi-core CPUs to speed up program execution
     - Example: Adding two large arrays can be divided among multiple threads to improve performance

  2. **Avoiding I/O Blocking**:
     - While one thread is waiting for I/O (e.g., reading a file or waiting for a network request), other threads can continue executing
     - Useful for programs that perform heavy I/O operations, such as web servers or database management systems

- **Comparison with Processes**:
  - Threads are better suited for tasks requiring shared data and memory space, such as parallel computations or concurrent I/O handling
  - Processes are more appropriate for logically independent tasks that require memory isolation

### Thread Creation Example

- **Simple Program**: A program that spawns two threads, each printing “A” or “B.”

  - The main thread creates two new threads (T1 and T2)
  - The scheduler determines when each thread runs, potentially allowing them to run simultaneously on multiple processors

- **Thread Join**:

  - The `pthread_join()` function is used to wait for a thread to finish before continuing
  - In the example, the main thread waits for T1 and T2 to complete, then prints “main: end” and exits

- **Execution Order**:
  - Threads introduce unpredictability in execution order
  - Depending on scheduling, output may vary each time the program is run, as shown in different execution diagrams

### Why It Gets Worse: Shared Data

- **Issue**: Threads complicate program execution, making it hard to predict the order of operations

- **Example**: Two threads updating a shared global variable

  - When multiple threads access and modify shared data concurrently, race conditions can occur, leading to incorrect or inconsistent results
  - **Race Condition**: Occurs when the outcome of a program depends on the relative timing of thread execution

- **Increment Example**:
  - Two threads increment a shared counter
  - Due to context switching, both threads may read the same initial value, increment it, and write it back, resulting in only one increment instead of two
  - This problem arises because the operations are not performed atomically

### The Heart of the Problem: Uncontrolled Scheduling

- **Code Example**:

  - Assume a shared counter variable and two threads running on a single CPU
  - If one thread is interrupted midway through incrementing the counter, the other thread may also read the same initial value and cause a race condition

- **Context Switching and Data Races**:

  - The outcome of the program changes depending on where context switches occur, resulting in different and indeterminate results

- **Critical Section**:
  - A segment of code that accesses shared variables and must not be concurrently executed by more than one thread
  - Requires **mutual exclusion** to ensure that only one thread can access the critical section at a time

### The Wish for Atomicity

- **Atomic Instructions**:

  - One solution to prevent race conditions is to use atomic instructions that complete without interruption
  - Atomicity ensures that a series of operations are performed as a single, indivisible unit

- **Example of Atomic Instruction**:

  - Assume a single instruction that updates a memory address atomically
  - The hardware guarantees that the operation cannot be interrupted mid-way, preventing race conditions

- **Challenge**:
  - Most operations cannot be reduced to a single atomic instruction
  - More complex operations, like updating data structures, require more sophisticated synchronization mechanisms

### Waiting for Another Thread

- **Inter-Thread Communication**:

  - Sometimes, one thread must wait for another to perform an action before it can proceed
  - This behavior is similar to processes waiting for I/O operations, and managing it properly is crucial for avoiding deadlocks and ensuring correct program execution

- **Synchronization Primitives**:
  - Mechanisms like **condition variables** and **mutexes** are used to coordinate between threads and prevent race conditions
  - These allow threads to wait for specific conditions and signal each other when conditions are met

### Summary

- **Threads** provide a way to achieve parallelism and avoid blocking I/O by allowing multiple execution points within a single process
- However, they introduce complexities like race conditions, data sharing issues, and unpredictable execution order
- **Critical Sections** and **Synchronization**:
  - Threads accessing shared data must use synchronization primitives to ensure mutual exclusion and correct program behavior
  - Properly synchronized programs avoid race conditions and produce deterministic results
- **Key Concepts**:
  - **Race Condition**: Occurs when threads attempt to update the same data structure simultaneously
  - **Critical Section**: A code section that accesses shared resources and must not be executed by more than one thread at a time
  - **Atomicity**: Ensuring that a series of operations are completed as a single, indivisible unit
  - **Synchronization Primitives**: Tools like mutexes and condition variables that help threads coordinate access to shared resources

Understanding threads and concurrency is crucial for building efficient and correct multi-threaded applications, especially in modern operating systems and complex software systems

### Questions

1. Which of the following best describe the function of the Program Counter (PC) in the context of threads?

- It keeps track of where a thread is in its execution

The Program Counter (PC) in a thread functions like a bookmark, indicating the current position or state of execution of the thread. It does not manage memory allocation, store shared data, or handle context switching directly.

2. Which of the following are reasons to use threads?

- Parallelism
- Avoid slow I/O obstructing program progress

Multiple threads allow you to speed up your program by spreading the work over multiple processors, this is called parallelism. With multiple threads, other tasks can run while at the same time as I/O tasks which would otherwise be a bottleneck.

3. Fill in the blank

- The **scheduler** can start a thread immediately or put in the "ready" state.

In CS, scheduling is the action of assigning resources to perform tasks. The scheduler can start a thread immediately or put in the “ready” state.

4. True or False:
   The cause of the inconsistency on multiple runs is because both threads are trying to update the counter at the same time

- True

Both threads are trying to update the counter at the same time. It is referred to as a race condition

5. What does a race condition refer to?

- The results depend on the timing execution of the code

A race condition is when the results depend on the timing of the code execution

6. What does atomically refer to?

- Either the instruction has not run at all, or it has run to completion; there is no in-between state.

Atomically means that an instruction will always run to completion once it has begun.

7. Fill in the blank for the following

- In an operating system, multiple execution paths within the same process, allowing parallel processing and resource sharing, are known as **threads**
- When two or more threads access shared data and try to change it at the same time, leading to unpredictable results, it’s called a **Race Condition**
- The concept that ensures operations in multi-threaded environments are completed in one step without interruption is called **atomicity**
- The ability of an operating system to allow multiple threads or processes to execute simultaneously is referred to as **concurrency**

Threads: Understanding what threads are and how they function within a process is crucial for grasping the basics of concurrency and parallel processing in operating systems.

Race Condition: Recognizing race conditions helps in understanding the complexities and challenges of multi-threaded programming, especially regarding shared data access.

Atomicity: The concept of atomicity is fundamental in ensuring that operations in multi-threaded environments don’t leave shared data in an inconsistent state.

Concurrency: Comprehension of concurrency is key to understanding how modern operating systems handle multiple processes and threads, enhancing efficiency and responsiveness.
