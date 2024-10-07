# Multi-CPU Scheduling

### Overview

- This section explores how to schedule jobs on multiple CPUs, focusing on the complexities that arise and the methods used to address them
- **Key Questions**:
  - How do we schedule jobs on multiple CPUs?
  - What new issues emerge with multi-CPU scheduling?
  - How can we manage load balancing in a multi-queue multiprocessor scheduler?

### Introduction

- **Multiprocessor Systems**:

  - Multiprocessor systems are common in desktops, laptops, and mobile devices due to the difficulties in increasing single-CPU speeds without excessive power consumption
  - While adding more CPUs doesn’t automatically speed up applications, multi-threaded software can utilize these additional CPU resources to run faster

- **Problem**:
  - A typical single-threaded application uses only one CPU
  - Software must be redesigned to support parallel execution with multiple threads to take advantage of multi-CPU systems
  - The OS now faces a new challenge: efficiently scheduling multiple jobs on multiple CPUs

### Multiprocessor Architecture: Caches

- **Caches in Single vs. Multiprocessor Systems**:

  - In single-CPU systems, caches are used to speed up access to frequently accessed data in main memory
  - Multiprocessor systems, however, face a unique challenge: maintaining **cache coherence**

- **Cache Coherence Problem**:

  - Consider a program running on CPU 1 that reads a data item at address `A` and loads it into its cache
  - If the program is moved to CPU 2 and reads the same address `A`, CPU 2’s cache may contain a stale copy of the data if the value at `A` has changed
  - **Solution**: Use hardware-based cache coherence protocols like **bus snooping** to maintain a consistent view of memory across CPUs

- **Bus Snooping**:
  - Caches monitor the bus connecting them to main memory
  - When a CPU updates a data item in its cache, other CPUs invalidate or update their copies accordingly

### Synchronization

- **Concurrency Issues**:

  - Even with cache coherence, concurrent access to shared data structures (e.g., queues) by multiple CPUs can lead to race conditions and incorrect results
  - **Solution**: Use locks to protect shared data structures and ensure atomic operations

- **Impact of Locks on Performance**:
  - Lock contention can significantly slow down performance, especially as the number of CPUs increases
  - The overhead of acquiring and releasing locks becomes a bottleneck, reducing scalability

### Cache Affinity

- **Cache Affinity**:
  - A process running on a CPU accumulates state in the CPU’s caches and TLBs
  - If the process is moved to another CPU, it loses this state, and its execution is slowed down
  - **Solution**: The scheduler should consider cache affinity by keeping processes on the same CPU whenever possible

### Single-Queue Scheduling (SQMS)

- **Single-Queue Multiprocessor Scheduling (SQMS)**:

  - The simplest approach to multiprocessor scheduling is to use a single queue of jobs for all CPUs
  - Each CPU picks the next job to run from the shared queue

- **Issues with SQMS**:

  1. **Scalability**: Locking mechanisms used to access the shared queue become a bottleneck as the number of CPUs increases
  2. **Cache Affinity**: Jobs may be frequently moved between CPUs, breaking cache affinity and reducing performance

- **Example**:
  - Suppose we have 5 jobs (A, B, C, D, E) and 4 CPUs. In an SQMS system, each CPU takes the next available job from the queue
  - This can cause jobs to bounce from CPU to CPU, disrupting cache affinity

### Multi-Queue Scheduling (MQMS)

- **Multi-Queue Multiprocessor Scheduling (MQMS)**:

  - To address the issues of SQMS, MQMS uses multiple queues, one per CPU
  - Each CPU has its own scheduling queue, and jobs are assigned to a specific queue

- **Advantages**:

  - **Scalability**: As the number of CPUs increases, the number of queues also increases, reducing lock contention
  - **Cache Affinity**: Jobs are more likely to remain on the same CPU, improving cache performance

- **New Issue: Load Imbalance**:
  - Different queues may become imbalanced if some CPUs have more jobs than others
  - Load imbalance can result in idle CPUs while others are overloaded

### Handling Load Imbalance

- **Migration**:

  - The OS can migrate jobs between CPUs to achieve load balancing
  - If one CPU becomes idle while another is busy, a job from the busy CPU can be moved to the idle CPU

- **Work Stealing**:

  - A load balancing technique where an idle CPU “steals” jobs from a busy CPU’s queue
  - Work stealing introduces overhead due to queue monitoring but can effectively balance the load

- **Example**:
  - Suppose jobs A, B, C, and D are distributed between CPU 0 and CPU 1
  - If job C completes, leaving CPU 0 idle while CPU 1 is still busy, the scheduler can migrate a job (e.g., B) from CPU 1 to CPU 0

### Summary

- **Single-Queue Scheduling (SQMS)**:
  - Simple to implement but suffers from poor scalability and cache affinity issues
- **Multi-Queue Scheduling (MQMS)**:

  - Scales better and maintains cache affinity but introduces load balancing challenges

- **Load Balancing Techniques**:
  - Job migration and work stealing can help achieve better load distribution across CPUs

Building a robust multi-CPU scheduler requires considering factors like lock contention, cache affinity, and load balancing, making it a complex and critical component of modern operating systems

### Questions

1. What is the purpose of caches?

A cache’s primary purpose is to decrease data retrieval time by reducing the need to access the underlying slower storage layer

- True

A cache is a special storage space for temporary files that makes a device, browser, or app run faster and more efficiently. It does so by creating a copy of the data from main memory. When that data is needed again, the cache is the first place that is looked at, so easier access

2. Consider a program on CPU 1 reading a data item (with value D) at address A. It retrieves the value D from main memory because the data is not in the cache on CPU 1. The program then updates its cache with the new value D′ at address A. Now we trying to move the program to CPU 2

Put the following in correct order. Not all the instructions need to be used

- The program reads the value at address A again
- CPU 2’s cache is checked
- the system fetches it from main memory
- which returns the old value D instead of D'

Writing data to main memory is slow, so the system does it later. Assume the OS then decides to stop the program and move it to CPU 2. The program then reads the value at address A again. CPU 2’s cache does not contain this data, so the system fetches it from main memory, which returns the old value D instead of D′

3. Which of the following is a fault that comes with our approach?

- decrease in performance

Especially in terms of performance. Access to a synchronized shared data structure gets quite slow as the number of CPUs grows

4. Why does cache affinity improve performance?

- It improves performance because it reduces cache problems as there is no delay with a dedicated core

A multiprocessor scheduler should consider Cache affinity when scheduling, and thus if possible keeping a process on the same CPU

5. Queues can peak at other queues to see how busy they are

- True

When work-stealing takes place, a queue that is low on jobs occasionally peeks into another queue, to determine how full it is

6. Which of the following stand for MQMS?

- Multi-Queue Multiprocessor Scheduling

Previously, we covered that called Multi-Queue Multiprocessor Scheduling (or MQMS)

7. True or False: In a typical application we can use more Central Processing Unit in order to make our program run faster?

- False

A typical application (i.e., a C program you wrote) only uses one CPU. Adding more CPUs does not make it run faster
