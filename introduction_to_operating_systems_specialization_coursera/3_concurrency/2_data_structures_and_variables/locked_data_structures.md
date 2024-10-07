# Locked Data Structures

### Introduction

- **Context**: Before moving on to lock-free data structures, it's essential to understand how locks are applied to traditional data structures to ensure thread safety
- **Objective**: Learn how to make common data structures thread-safe using locks. The way locks are added to data structures can significantly impact performance and accuracy
- **Key Questions**:
  - How do we add locks to a data structure to ensure thread safety?
  - How do we optimize lock usage to maintain high performance when multiple threads access the structure simultaneously?

### Concurrent Counters

- **Problem**: A counter is a basic data structure that increments or decrements a shared value. When multiple threads update the same counter concurrently, race conditions can occur, leading to incorrect results

- **Solution**: Introduce a lock around the increment and decrement operations to prevent multiple threads from accessing the counter simultaneously

  **Basic Thread-Safe Counter**:

  ```c
  pthread_mutex_t lock;

  void increment() {
      pthread_mutex_lock(&lock);
      counter++;
      pthread_mutex_unlock(&lock);
  }
  ```

- **Performance Issue**:

  - Adding a single lock makes the counter thread-safe but may degrade performance as the number of threads increases
  - Figure 29.5 (in the document) shows that performance scales poorly when multiple threads update a shared counter due to lock contention

- **Scalable Counting**:
  - Researchers have developed more scalable counters, such as **approximation counters**, which use local counters per CPU core
  - **Approximation Counters**:
    - Each CPU core has its own local counter
    - When a thread increments the counter, it first updates its local counter
    - Once the local counter reaches a threshold, its value is transferred to a global counter using a global lock
  - **Trade-off**:
    - A higher threshold improves scalability but reduces the accuracy of the global counter at any given moment
    - Lower threshold values increase contention and reduce scalability but ensure that the global counter is more accurate

### Concurrent Linked Lists

- **Basic Implementation**:

  - To make a linked list thread-safe, acquire a lock when inserting or deleting nodes
  - Example of locking in a linked list insertion operation:

    ```c
    pthread_mutex_lock(&list_lock);
    // Insert node into the list
    pthread_mutex_unlock(&list_lock);
    ```

  - While this approach works, it does not scale well with many threads accessing the list concurrently

- **Hand-Over-Hand Locking (Lock Coupling)**:

  - Instead of a single lock for the entire list, each node in the list has its own lock
  - When traversing the list, a thread holds the lock for the current node and acquires the lock for the next node before releasing the previous lock
  - This approach allows for finer-grained locking, enabling multiple threads to traverse different parts of the list concurrently

  **Challenges**:

  - The overhead of acquiring and releasing locks for each node can outweigh the benefits of increased concurrency
  - Hand-over-hand locking is best suited for scenarios with a large number of threads and long lists

### Concurrent Queues

- **Traditional Queue Implementation**:

  - A queue typically has a `head` and a `tail` pointer, which point to the first and last elements, respectively
  - Adding a single lock around enqueue and dequeue operations makes the queue thread-safe but reduces performance when multiple threads try to enqueue and dequeue simultaneously

- **Michael and Scott's Concurrent Queue**:

  - Uses separate locks for the head and tail pointers
  - Allows enqueue and dequeue operations to run concurrently without interference
  - Uses a dummy node to simplify the logic and maintain separation between the head and tail

  **Advantages**:

  - Allows high concurrency for multi-threaded applications
  - Reduces contention by using separate locks for head and tail

  **Limitations**:

  - While lock-based queues perform well in many scenarios, they may still suffer from performance issues when the queue is heavily used

### Concurrent Hash Tables

- **Basic Hash Table**:

  - A hash table uses buckets to store key-value pairs. Each bucket can be represented as a linked list
  - A basic thread-safe hash table uses a single lock for all operations, leading to poor performance when many threads try to access or update the table simultaneously

- **Fine-Grained Locking**:

  - Use a separate lock for each bucket (or list) in the hash table
  - This approach allows multiple threads to access different buckets concurrently

  **Example**:

  ```c
  pthread_mutex_lock(&bucket_lock[index]);
  // Access or update the bucket
  pthread_mutex_unlock(&bucket_lock[index]);
  ```

- **Performance**:
  - The hash table performs well when there are many concurrent updates spread across different buckets
  - Performance degrades when threads contend for the same bucket, especially if the hash function does not distribute keys evenly

### Summary

- The chapter provides a comprehensive overview of making various data structures thread-safe using locks
- **Key Takeaways**:
  - Adding locks to data structures ensures thread safety but may introduce performance bottlenecks
  - **Concurrent Counters**: Use approximation counters to reduce contention and improve scalability
  - **Concurrent Linked Lists**: Hand-over-hand locking allows fine-grained locking but has high overhead
  - **Concurrent Queues**: Use separate locks for head and tail to enable concurrent enqueues and dequeues
  - **Concurrent Hash Tables**: Use per-bucket locking to enable concurrent access to different parts of the table

Understanding and implementing locked data structures is essential for building efficient and correct multi-threaded applications. These foundational concepts set the stage for exploring more advanced techniques like lock-free data structures, which further improve concurrency and performance

### Questions

1. True of False:

- Just adding a single lock can help with the accuracy and correctness of a data structure

How locks are added determine both the correctness and performance of the data structure

2. What is perfect scaling?

- Process as to which threads should complete just as quickly on several processors as they do on a single processor

The threads should complete just as quickly on several processors as they do on a single processor. The process of achieving this goal is known as perfect scaling

3. In the context of an approximation counter on a multicore system, what is the primary purpose of using local counters?

- To reduce contention across CPU cores when incrementing the counter

Local counters in an approximation counter are used primarily to reduce contention across CPU cores. Each thread updates its corresponding local counter, which is more efficient and minimizes conflicts between threads on different cores. This design is key to enhancing scalability on multicore systems

4. Why is it important to release the lock before failing the insert operation is case of a `malloc()` failure during the insert method in a concurrent linked list?

- To avoid deadlocks in the system

Releasing the lock before failing the insert operation in the event of a `malloc()` failure is crucial to avoid deadlocks. If the lock is not released, other threads waiting to acquire the lock for their operations could be indefinitely blocked, leading to a deadlock situation

5. In hand-over-hand locking for a linked list, a single lock is used for the entire list, which is acquired at the beginning of an operation and released at the end

- False

The statement is false. In hand-over-hand locking, a lock is added to each node of the list. As one traverses the list, they acquire the next node’s lock before releasing the current one. This method contrasts with using a single lock for the entire list, as it allows more parallelism but can also introduce significant overhead, especially with large lists and many threads

6. What is the primary advantage of allocating a separate lock for each hash bucket in a concurrent hash table?

- It allows multiple operations to occur simultaneously, enhancing performance

The primary advantage of allocating a separate lock for each hash bucket in a concurrent hash table is that it allows multiple operations (like insertions, deletions, and lookups) to occur simultaneously in different parts of the hash table. This significantly enhances the performance of the hash table, especially under high concurrency, as compared to using a single lock for the entire table

7. In the approximation counter approach, the global counter’s value is always up-to-date and accurate

- Flase

The statement is false. In the approximation counter approach, the global counter’s value is periodically updated from the local counters. This means there can be a lag in the accuracy of the global count, especially between local-to-global updates. The approximation counter represents a trade-off between scalability and the accuracy of the global count
