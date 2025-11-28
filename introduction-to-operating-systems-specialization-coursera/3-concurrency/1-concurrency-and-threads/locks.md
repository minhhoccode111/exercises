# Locks

### Introduction

- **Context**: In concurrent programming, one of the primary challenges is executing a set of instructions atomically. Interrupts on a single processor or multiple threads on different processors executing concurrently can disrupt the atomicity of these instructions
- **Solution**: Introduce a mechanism called a **lock** to ensure mutual exclusion, enabling critical code sections to execute as if they were a single atomic instruction
- Programmers use locks to annotate source code, placing them around key parts to ensure that only one thread can access the critical section at a time

**Key Questions**:

- How do we design and implement locks?
- What are the different types of locks available in programming libraries like POSIX?
- How do we evaluate the efficiency and fairness of different lock implementations?

### The Basic Concept of Locks

- A **lock** is a data structure that controls access to a critical section
- **Lock()** and **Unlock()** have simple semantics:

  1. If no other thread holds the lock (i.e., it is free), a thread can acquire the lock and enter the critical section
  2. If another thread holds the lock, any thread attempting to acquire it will be blocked until the lock is released

- **Example**:

  - A simple shared variable update:

    ```c
    int shared_data = 0;
    pthread_mutex_lock(&mutex);
    shared_data++;
    pthread_mutex_unlock(&mutex);
    ```

  - This code ensures that no two threads can modify `shared_data` at the same time

- **Critical Section**:
  - A section of code that accesses shared resources and must not be executed concurrently by more than one thread

### Pthread Locks

- **POSIX** defines a lock as a **mutex** (mutual exclusion)
- Example POSIX threads code:

  ```c
  pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

  pthread_mutex_lock(&lock);
  // Critical section
  pthread_mutex_unlock(&lock);
  ```

- Each lock variable has a state indicating whether it is free or held by a thread. It can also contain additional information, like the identity of the lock holder or a queue for ordering lock acquisition

**Locking Mechanism**:

- Multiple locks can be used to protect different data structures, allowing more threads to execute in locked code simultaneously

### Building a Lock

- We need hardware and OS support to develop a robust lock
- **Hardware Primitives**:

  - Various computer architectures have special hardware instructions for implementing locks (e.g., `Test-and-Set`, `Compare-and-Swap`)
  - These instructions are used to build a mutual exclusion primitive like a lock

- **OS Support**:
  - Operating systems provide support to ensure efficient and fair locking mechanisms

### Evaluating Locks

- **Mutual Exclusion**: Does the lock prevent multiple threads from accessing the critical section simultaneously?
- **Fairness**: Does each thread competing for the lock have a reasonable chance of acquiring it once it becomes available?
  - Consider scenarios where threads may starve or be indefinitely delayed while waiting for the lock
- **Performance**: Measure time overheads under different scenarios:
  - **No Contention**: Overhead when a single thread takes and releases the lock
  - **High Contention**: Performance when multiple threads compete for the same lock on a single CPU or multiple CPUs

### Controlling Interrupts

- **Single-Processor Systems**:
  - Early solutions to mutual exclusion involved disabling interrupts around critical sections
  - While effective on single CPUs, this approach has significant drawbacks:
    - **Trust**: Threads must not abuse privileges (e.g., disabling interrupts indefinitely)
    - **Multi-Processor Incompatibility**: This solution does not work on multi-processor systems
    - **Performance Issues**: Modern CPUs handle interrupt masking slowly, making this approach inefficient

### Simple Locks: Just Using Loads/Stores

- **Using a Single Flag Variable**:
  - A basic lock can be implemented using a flag variable to indicate if a thread holds the lock
  - However, this approach has both **correctness** and **performance** issues:
    - **Race Condition**: If two threads set the flag to 1 simultaneously, both may enter the critical section
    - **Busy Waiting**: Waiting threads waste CPU cycles by repeatedly checking the flag

### Spin Locks: Test-And-Set

- **Test-and-Set Instruction**:

  - A hardware-supported atomic operation that tests and sets a value in a single instruction
  - Spin locks use this instruction to implement a basic locking mechanism:

    ```c
    while (TestAndSet(&flag, 1) == 1);  // Spin until lock is acquired
    ```

  - **Problem**: While effective, spin locks can cause busy waiting, wasting CPU cycles when threads are waiting for a lock

- **Use Case**:
  - Spin locks perform well when multiple CPUs are involved, as the critical section is short and CPU cycles are saved by not using context switches

### Advanced Locking Techniques

1. **Compare-And-Swap**:

   - Another atomic instruction provided by hardware
   - Checks if a memory location has a specified value and, if so, updates it with a new value
   - More robust than `Test-and-Set` and used in many modern locking algorithms

2. **Load-Linked and Store-Conditional**:

   - Used on platforms like MIPS and ARM
   - Ensures that no other thread modifies the memory between a load and store operation

3. **Fetch-And-Add**:
   - Atomically increments a value and returns its previous value
   - Used to build more sophisticated locks like ticket locks

### Too Much Spinning: Alternatives to Spin Locks

- **Problem**: Spin locks waste CPU cycles when threads are waiting for a lock on a single processor
- **Yielding**:

  - Threads voluntarily yield the CPU to allow other threads to run, reducing waste
  - However, this approach does not solve fairness issues and can cause starvation

- **Sleeping Instead of Spinning**:

  - Threads waiting for a lock can be put to sleep and woken up when the lock is available, using system calls like `park()` and `unpark()` (Solaris) or `futex()` (Linux)

- **Two-Phase Locks**:
  - A combination of spinning and sleeping
  - Threads first spin for a short period. If the lock is still unavailable, they are put to sleep until the lock is released

### Summary

- **Locks** provide mutual exclusion to protect critical sections in concurrent programming
- **Evaluation Criteria**:

  - Correctness: Ensuring mutual exclusion
  - Fairness: Preventing starvation and ensuring reasonable lock acquisition
  - Performance: Minimizing overhead in scenarios with and without contention

- **Advanced Locks**:
  - Use hardware support (e.g., atomic instructions) and OS support (e.g., park/unpark) to create efficient and fair locking mechanisms
  - Implementations like two-phase locks balance spinning and sleeping to minimize CPU waste

Understanding and implementing effective locks is critical for building robust concurrent applications and ensuring that multi-threaded programs function correctly and efficiently

### Questions

1. True of False:
   You must declare a lock variable of some kind in order to use a lock

- True

A lock is just a variable, and thus to use one, you must declare a lock variable of some kind

2. Why does the POSIX library calls a lock a mutex?

- It is used to provide mutual exclusion between threads

The POSIX library calls a lock a mutex because it is used to provide mutual exclusion between threads

3. Which of the following are not drawbacks of the method above?

- Simplicity

This method's key benefit is its simplicity

4. How does a thread waits for a lock that is already held?

- By repeatedly checking the flag

A thread waits for a lock that is already held: by repeatedly checking the value of flag

5. What will `TestAndSet()` return if another thread has the lock?

- `0`

`TestAndSet()` will always return `1` if another thread has the lock; therefore, this thread will keep spinning until the lock is released

6. What happens the lock is not gained during the first spin phase?

- It enters a race condition

If the lock is not gained during the first spin phase, the caller is put to sleep and awakened when the lock becomes free.

7. What does `Lock()` return when the lock is being held?

- `1`

`Lock()` returns `0` when the lock is not held

8. What does the fetch and add instruction combine?

- Ticket
- Turn variable

This method combines a ticket and turn variable

9. Arrange the order of events

- a timer interrupt occurs
- thread 0 is rerun
- the lock is released
- thread 1 acquire the lock

10. Which of the following is NOT a state a therad can be in?

- schedule

A thread can be in one of three states: running, ready, or blocked

11. What is a race condition?

- Occurs when two or more threads try to access the same resource and they try to change it at the same time

A race condition occurs when two or more threads try to access the same resource and they try to change it at the same time and could to so in such a way as to cause unexpected results

12. Which of the following are arguments for futex wait address?

- `wait(address, expected)`

The call to futex `wait(address, expected)` puts the caller thread to sleep. If it's not equal, the all ends. The futex wake(address) method wakes one thread one the queue

13. Which of the following is not a criterion for evaluating a lock?

- none of the above

All the answers above are questions we ask ourselves when evaluating a lock
