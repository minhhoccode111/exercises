# Condition Variables

### Introduction

- **Overview**: We have previously explored locks and their proper implementation using hardware and operating system support. However, locks are not the only primitives needed to construct concurrent applications
- In many scenarios, threads must check whether a certain condition is true before continuing their execution
  - For example, a parent thread may need to wait for a child thread to finish before proceeding (known as a `join()`)
- Simply using a shared variable and busy-waiting (spinning) until the condition becomes true is wasteful and inefficient
- **Solution**: Use **condition variables** to sleep and wake threads based on specific conditions

**Key Questions**:

- What is the correct way for a thread to wait for a condition?
- How can condition variables be used to implement thread synchronization?

### Definition and Routines

- A **condition variable** is a queue that threads can join when some condition in the program is not as expected. When the condition changes, another thread can wake one (or more) of those waiting threads
- The concept originated from Dijkstra’s usage of “private semaphores” and was further refined by Hoare’s work on monitors, which introduced the idea of a condition variable

**POSIX Condition Variables**:

1. **Create a condition variable**:

   ```c
   pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
   ```

2. **Basic Operations**:
   - `pthread_cond_wait()`: Puts a thread to sleep and releases the associated lock
   - `pthread_cond_signal()`: Wakes up one sleeping thread waiting on the condition
   - `pthread_cond_broadcast()`: Wakes up all threads waiting on the condition

- **Using Condition Variables**:
  - A thread that wants to wait for a condition calls `pthread_cond_wait()`, which takes a condition variable and a mutex as arguments
  - The `wait()` function is responsible for releasing the lock and putting the thread to sleep atomically. When the thread wakes up, it must re-acquire the lock before continuing execution
  - This approach avoids race conditions that could occur while a thread attempts to go to sleep

### Example: Using Condition Variables for Thread Synchronization

- Consider a parent thread that creates a child thread and then waits for it to finish before continuing
- **Correct Implementation**:
  - The parent thread calls `pthread_cond_wait()` to sleep, releasing the lock
  - The child thread sets a state variable (e.g., `done`) and calls `pthread_cond_signal()` to wake the parent thread

**Example Code**:

```c
pthread_mutex_lock(&lock);
while (done == 0) {
    pthread_cond_wait(&cond, &lock);
}
pthread_mutex_unlock(&lock);
```

- **Note**: Always use a `while` loop instead of an `if` statement to recheck the condition after waking up. This ensures correctness even if the condition changes before the waiting thread acquires the lock again

### Producer/Consumer Problem (Bounded Buffer)

- The **producer/consumer problem** (or bounded buffer problem) involves two types of threads:
  1. **Producer Threads**: Create data items and store them in a buffer
  2. **Consumer Threads**: Retrieve data items from the buffer and use them
- The problem is commonly seen in scenarios like multi-threaded web servers and UNIX pipes
- To ensure synchronized access to the buffer (a shared resource), condition variables are used to manage producer and consumer activity

**Implementation Challenges**:

- A producer should only add data to the buffer when it is not full
- A consumer should only retrieve data from the buffer when it is not empty
- If implemented incorrectly, the program can have race conditions or deadlocks

### A Broken Solution

- **Incorrect Implementation**:
  - A simple implementation using a single condition variable for both producers and consumers is flawed when more than one producer or consumer is involved
  - Multiple consumers can access the buffer simultaneously, leading to race conditions where a consumer tries to consume data from an empty buffer
- **Problem Analysis**:
  - Consider two consumers and one producer:
    - One consumer may consume the only data in the buffer while another consumer is about to wake up, causing an assertion failure when it tries to consume from the now-empty buffer

### Using While Instead of If

- The solution to the broken implementation is to always use a `while` loop around the `pthread_cond_wait()` call
- **Why**:
  - Condition variables follow **Mesa semantics**, meaning that signaling a thread only wakes it up—it does not guarantee the thread will run immediately
  - While the thread is awake, the condition may change again, so it must recheck the condition before proceeding

**Correct Implementation**:

- Use separate condition variables for “empty” and “full” states to distinguish between producers and consumers

### The Right Producer/Consumer Solution

- **Separate Condition Variables**:
  - Use one condition variable (`empty`) for producer threads and another (`full`) for consumer threads
  - Producers wait on `empty` and signal `full` when they add an item
  - Consumers wait on `full` and signal `empty` when they consume an item

**Advantages**:

- Avoids signaling the wrong thread type
- Ensures correct communication between producers and consumers

### Covering Conditions

- In some situations, signaling a single thread may not suffice because the program does not know which thread to wake up
- **Covering Conditions**:

  - Use `pthread_cond_broadcast()` to wake up all waiting threads, ensuring that any thread that can proceed will do so
  - The downside is that this approach may wake up unnecessary threads, causing performance issues

- **Example**: A memory allocation library where different threads may wait for different amounts of free memory
  - Use `pthread_cond_broadcast()` to wake up all waiting threads when memory is freed, as there is no way to know which specific thread needs to be woken up

### Summary

- **Condition Variables** provide a mechanism for threads to wait for a condition to be true before proceeding
- **Key Points**:

  - Always use `pthread_cond_wait()` inside a `while` loop to avoid race conditions
  - Use separate condition variables for different states (e.g., empty and full) to distinguish between different thread types
  - Use `pthread_cond_broadcast()` when it is unclear which thread should be woken up, but be aware of potential performance overhead

- Properly using condition variables ensures efficient and correct synchronization between threads, avoiding issues like race conditions and deadlocks

### Questions

1. In the given scenario, why is spinning not an ideal solution for the parent thread to wait for the child thread to complete?

- It wastes CPU resources

Spinning is inefficient because it involves the parent thread repeatedly checking a shared variable to see if the child is done. This constant checking consumes CPU cycles without doing any productive work, leading to a waste of CPU resources

2. In the described threading scenario, the `thr_exit` function is used by the parent thread to signal completion, while the `thr_join` function is used by the child thread to check if it is done

- False

In the given scenario, the roles of the `thr_exit` and `thr_join` functions are reversed. The `thr_exit` function is called by the child thread to signal its completion. It does this by setting a state variable (usually done), signaling the condition variable, and unlocking the mutex. On the other hand, the `thr_join` function is used by the parent thread to wait for the child thread’s completion. It checks if the done variable is set and waits on the condition variable if it’s not set, ensuring the parent waits efficiently for the child to finish

3. What happens if we don't require synchronized access to the bounded buffer because it is a shared resource?

- race condition

A race condition is an undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time

4. Which of the following is a name of consumer/producer issue?

- bounded buffer problem

The producer/consumer problem is also known as the bounded buffer problem

5. Which of the following is best to use when a condition variable is involved

- WHile

An easy tip to remember with condition variables is to always use while loops

6. how do we avoid the following?

- **Consumer** threads, wait for fill and then signal empty. **Producer** threads wait for the condition empty in the code while signals fill

Producer threads wait for the condition empty in the code while signals fill. Consumer threads, on the other hand, wait for fill and then signal empty. By doing so, the second difficulty is avoided by design: a consumer can never wake a consumer by accident, and a producer can never wake a producer by accident

7. In the improved producer/consumer model with multiple buffers, what is the main purpose of introducing a circular buffer with fill_ptr and use_ptr?

- To manage the buffer slots efficiently

The introduction of a circular buffer using `fill_ptr` (fill pointer) and `use_ptr` (use pointer) in the producer/consumer model is meant to efficiently manage the buffer slots. This approach allows multiple values to be produced and consumed in an orderly manner without frequent sleeping or unnecessary context switches. It efficiently handles the adding and removing of items from the buffer, ensuring smooth operation in systems with multiple producers and consumers

8. Based on Lampson and Redell’s solution, what happened when you call on a thread that is not ready?

- Those threads will simply wake up, re-evaluate the situation, and then return to sleep

Lampson and Redell’s solution will wake up, all sleeping threads. Access if it can allocate any resources. Then go back to sleep

9. What is the primary synchronization requirement in the basic Producer/Consumer model?

- Producers can only add data to the buffer when the count is 0 (buffer is empty), and consumers can only retrieve data when the count is 1 (buffer is full)

The main synchronization requirement in the basic Producer/Consumer model is ensuring that producers only put data into the buffer when it is empty (count is 0), and consumers only retrieve data when the buffer is full (count is 1). This synchronization prevents race conditions where producers might add to an already full buffer or consumers might try to retrieve from an empty buffer, both of which could lead to errors in the system
