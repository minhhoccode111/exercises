# Variables and Semaphores

### Introduction

- **Context**: To handle a wide range of concurrency problems, we need both locks and condition variables. However, managing these separately can become complex
- **Solution**: The **semaphore** was introduced as a single primitive for synchronization, which can be used as both locks and condition variables

**Key Questions**:

- How can we replace locks and condition variables with semaphores?
- What is a semaphore’s definition?
- How do binary semaphores (locks) work?

### What is a Semaphore?

- A semaphore is an object with an integer value, which can be modified using two functions: `sem_wait()` and `sem_post()` (POSIX standard)

- **Definition**:

  - `sem_wait()`: Decrements the semaphore value. If the value is 0 or less, the thread is blocked until another thread increments the value
  - `sem_post()`: Increments the semaphore value. If there are threads waiting on the semaphore, one is woken up

- **Behavior**:
  - A semaphore can be used to coordinate threads by making one thread wait until another signals it to continue
  - It can be used to ensure mutual exclusion (similar to a lock) or as an ordering mechanism (similar to a condition variable)

### Binary Semaphores (Locks)

- A binary semaphore is a semaphore with only two possible values: 0 (unavailable) and 1 (available)
- **Using a Semaphore as a Lock**:
  - The semaphore is initialized with a value of 1
  - When a thread wants to enter a critical section, it calls `sem_wait()` to decrement the semaphore value
  - If the value is 0, the thread waits. If the value is 1, it continues and sets the semaphore to 0
  - After leaving the critical section, the thread calls `sem_post()` to set the value back to 1

**Example**:

```c
sem_t lock;
sem_init(&lock, 0, 1); // Initialize semaphore to 1 (binary semaphore)

void critical_section() {
    sem_wait(&lock);  // Acquire lock
    // Critical section code here
    sem_post(&lock);  // Release lock
}
```

- **Correctness**: Binary semaphores can ensure mutual exclusion, similar to a lock

### Semaphores for Ordering

- Semaphores can also be used to order events in a concurrent program

**Example**:

- A parent thread creates a child thread and wants to wait until the child thread finishes before proceeding

- **Correct Usage**:

  - The parent calls `sem_wait()` to wait until the child signals completion
  - The child thread calls `sem_post()` after finishing its work

- **Initialization**:

  - The semaphore is initialized to 0, indicating that the parent should wait until the child signals

- **Scenarios**:
  1. If the parent reaches `sem_wait()` before the child finishes, it will wait
  2. If the child finishes before the parent reaches `sem_wait()`, the parent will not block

**Example Code**:

```c
sem_t done;
sem_init(&done, 0, 0); // Initialize to 0

void child_thread() {
    // Child thread work here
    sem_post(&done);  // Signal completion
}

void parent_thread() {
    sem_wait(&done);  // Wait for child to complete
    printf("Child completed.\n");
}
```

### Producer/Consumer Problem (Bounded Buffer)

- The **producer/consumer problem** involves producers adding data to a shared buffer and consumers removing data
- Condition variables can be used to ensure synchronization between producers and consumers

- **Initial Approach with Semaphores**:

  - Use two semaphores:
    - `empty`: Tracks empty slots in the buffer
    - `full`: Tracks filled slots in the buffer

  **Example**:

  - When a producer adds data, it decrements `empty` and increments `full`
  - When a consumer removes data, it decrements `full` and increments `empty`

- **Race Condition**:
  - If two producers add data simultaneously, or two consumers remove data simultaneously, they may overwrite each other's operations, causing data loss or corruption
  - **Solution**: Add a **mutex** (binary semaphore) to protect access to the buffer, ensuring mutual exclusion

**Correct Implementation**:

```c
sem_t empty, full, mutex;
sem_init(&empty, 0, MAX);  // MAX is the buffer size
sem_init(&full, 0, 0);
sem_init(&mutex, 0, 1);

void produce(int item) {
    sem_wait(&empty);  // Wait for empty slot
    sem_wait(&mutex);  // Protect access to buffer
    // Add item to buffer
    sem_post(&mutex);  // Release lock
    sem_post(&full);   // Signal a filled slot
}

void consume() {
    sem_wait(&full);   // Wait for filled slot
    sem_wait(&mutex);  // Protect access to buffer
    // Remove item from buffer
    sem_post(&mutex);  // Release lock
    sem_post(&empty);  // Signal an empty slot
}
```

### Reader-Writer Locks

- **Reader-Writer Locks**: Allow multiple readers to access a shared resource concurrently, but only one writer at a time
- **Implementation**:
  - Use a `writelock` semaphore to manage write access
  - Use a counter to track the number of active readers
  - Writers must wait until no readers are active
  - The last reader to finish releases the `writelock`, allowing a waiting writer to proceed

**Example**:

```c
int readers = 0;
sem_t readLock, writeLock;
sem_init(&readLock, 0, 1);
sem_init(&writeLock, 0, 1);

void startRead() {
    sem_wait(&readLock);
    readers++;
    if (readers == 1) sem_wait(&writeLock); // First reader locks writers
    sem_post(&readLock);
}

void endRead() {
    sem_wait(&readLock);
    readers--;
    if (readers == 0) sem_post(&writeLock); // Last reader unlocks writers
    sem_post(&readLock);
}

void startWrite() {
    sem_wait(&writeLock);  // Only one writer at a time
}

void endWrite() {
    sem_post(&writeLock);
}
```

- **Considerations**:
  - Reader-writer locks must balance fairness between readers and writers
  - Unfair implementations can cause writers or readers to starve

### Summary

- **Semaphores** are versatile synchronization primitives that can be used as locks or to order events
- **Binary Semaphores** provide mutual exclusion, while general semaphores can handle complex scenarios like producer/consumer problems and reader-writer locks
- Understanding how to implement and use semaphores effectively is crucial for developing robust concurrent applications

### Questions

1. Which of the following are functions we can use once a semaphore is initiated

- `sem_wait()`
- `sem_post()`

semaphore has been initialized, we can interact with it using one of two functions: `sem_wait()` or `sem_post()`

2. In the first example mentioned above could the semaphore be considered a binary semaphore

- True

Binary Semaphores (Locks) can only have two values 0 and 1. if the value is -1 then it would not count as one

3. What is the primary role of the pthread_mutex_lock and pthread_mutex_unlock in the producer and consumer functions?

- To ensure mutual exclusion when accessing the shared buffer.

In the modified code for the producer/consumer problem, `pthread_mutex_lock` and `pthread_mutex_unlock` are used in both the put and get functions to ensure mutual exclusion when accessing the shared buffer. The `mutex` lock prevents more than one thread (either producer or consumer) from entering the critical section of the code (i.e., accessing the shared buffer) at the same time. This mechanism addresses the race condition problem by ensuring that buffer operations by different threads do not interfere with each other.

4. What is the max value of a binary semaphore?

- `1`

It can have only two values – 0 and 1. Its value is initialized to 1

5. Inserts just read the data structure (and so require a typical critical section)

- True

Insert adds a new node with the given key to the beginning of the linked list while ensuring thread safety by using a mutex to protect access to the list structure

6. What hand do philosophers have to fork in order to eat based on the Dining philosophers problem?

- left

A philosopher requires two forks, one on their left and one on their right, to eat. We explore this subject in concurrent programming because of the competition for these forks and the synchronization issues that result

7. In the context of concurrency control, what is the purpose of thread throttling with semaphores?

- To minimize the number of threads running simultaneously

Thread throttling with semaphores is used to limit the number of threads running simultaneously to prevent system slowdowns. It is a technique to control and reduce concurrency in specific scenarios

8. Fill In The Blank with the correct value

- we set it to `0` the semaphore will act as an ordering mechanism
- we set the value to `1` the semaphore will act as a lock

We’ve seen two different ways to start a semaphore. If we set the value to 1 for the first case, the semaphore will act as a lock, and if we set it to 0 for the second case, the semaphore will act as an ordering mechanism
