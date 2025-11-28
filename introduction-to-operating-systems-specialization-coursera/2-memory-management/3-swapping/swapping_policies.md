# Swapping Policies

### Introduction

- **When There is Plenty of Memory**:

  - Memory management is straightforward when there is a lot of free RAM
  - When a page fault occurs, the OS can simply assign a free page to the faulting page

- **When Memory is Scarce**:
  - The OS must **evict pages** from memory to free up space for actively used pages
  - The decision of **which page(s) to evict** is one of the most critical aspects of virtual memory management
  - The **replacement policy** determines which pages are removed, significantly affecting system performance

**Key Question**: How does the OS choose which pages to remove from memory?

### Cache Management

- **Memory as a Cache**:

  - Main memory can be viewed as a cache for virtual memory pages in the system
  - The goal of a good replacement policy is to **minimize the number of cache misses** (or page faults) and **maximize the number of cache hits**

- **Average Memory Access Time (AMAT)**:

  - AMAT is used to calculate the overall efficiency of the memory system
  - **Formula**:  
    \[
    AMAT = TM + (PMiss \times TD)
    \]
    - **TM**: Time to access memory
    - **PMiss**: Probability of a cache miss (miss rate)
    - **TD**: Time to access disk

- **Example**:

  - Consider a machine with a 4 KB address space divided into 256-byte pages
  - If the miss rate is 10%, and the cost of accessing memory (TM) is 100 ns while accessing disk (TD) is 10 ms:
    \[
    AMAT = 100 \text{ ns} + (0.1 \times 10 \text{ ms}) = 1.0001 \text{ ms}
    \]
  - As the hit rate approaches 100%, the AMAT approaches the cost of accessing memory (100 ns)

- **Conclusion**:
  - Even a small miss rate can have a significant impact on performance due to the high cost of disk access
  - Therefore, having an effective replacement policy is crucial

### The Optimal Replacement Policy

- **Optimal Replacement Policy**: Replaces the page that will not be used for the longest period in the future
- **Intuition**:
  - If a page must be removed, the best candidate is the one that won’t be needed for the longest time
- **Example**:

  - With a three-page cache, the optimal policy selects the page that will be accessed furthest in the future for eviction

- **Drawback**:
  - The future is unknown, so the optimal policy is not feasible in practice
  - It serves as a benchmark to measure other policies against

### FIFO (First-In, First-Out) Policy

- **FIFO Policy**:
  - Pages are placed in a queue when they enter the system
  - When a replacement is needed, the page at the tail of the queue (the oldest page) is evicted
- **Advantages**:
  - Simple to implement
- **Disadvantages**:
  - Does not take into account the frequency or recency of page accesses
  - May evict critical pages that are still in use

### Random Policy

- **Random Policy**:
  - Randomly selects a page to replace when memory is full
- **Advantages**:
  - Simple and easy to implement
- **Disadvantages**:
  - Does not utilize any historical information about page usage
  - Performance can vary greatly depending on which pages are randomly chosen

### Least Recently Used (LRU) Policy

- **LRU Policy**:
  - Evicts the page that has not been used for the longest time
  - Based on the principle of locality: recently accessed pages are more likely to be accessed again soon
- **Advantages**:
  - Utilizes historical information to make more informed decisions
- **Disadvantages**:
  - Requires tracking the order of page accesses, which can be costly

### Workload Examples

- **80-20 Workload**:
  - 80% of references are to 20% of the pages (hot pages), and 20% are to the remaining 80% (cold pages)
  - LRU performs better than FIFO and Random because it is more likely to keep the hot pages in memory
- **Looping Sequential Workload**:
  - Accesses pages in a cyclical manner
  - Both FIFO and LRU can perform poorly in this scenario because they keep evicting pages that will be needed soon

### Historical Algorithm Implementation

- **Implementing LRU**:
  - Requires maintaining a list or using hardware support to track the most recently used pages
  - Every memory reference must be tracked, which can impact performance

### Approximating LRU

- **Use Bit**:
  - Each page has a use bit (or reference bit) that is set when the page is accessed
  - The OS periodically clears these bits and uses them to approximate LRU behavior
- **Clock Algorithm**:
  - Organizes pages in a circular structure
  - A clock hand points to pages, checking their use bits and clearing them as needed
  - If the use bit is 0, the page is a candidate for replacement

### Dirty Pages

- **Clean vs. Dirty Pages**:
  - Clean Page: Has not been modified; can be evicted without writing back to disk
  - Dirty Page: Has been modified; must be written back to disk before eviction
- **Modified Bit (Dirty Bit)**:
  - Indicates whether a page has been modified
  - Clock algorithms can be modified to prefer evicting clean pages over dirty pages

### Other VM Policies

- **Page Selection Policy**:

  - Determines when to load a page into memory
  - Demand Paging: Pages are loaded only when needed
  - Prefetching: Pages are loaded in advance based on predicted future accesses

- **Write Policy**:
  - Controls how the OS writes pages to disk
  - Clustering: Multiple writes are grouped together for efficiency

### Thrashing

- **Thrashing**: Continuous paging due to lack of free memory, causing severe performance degradation
- **Solutions**:
  - **Admission Control**: Reduce the number of active processes so that their working sets fit in memory
  - **Out-of-Memory Killer**: Some systems (e.g., Linux) may terminate memory-intensive processes to free up space

### Summary

- Various page replacement policies, such as FIFO, Random, and LRU, are used in modern operating systems
- **LRU and its approximations** generally provide better performance by leveraging the locality principle
- **Complex Workloads**: Real-world applications can exhibit different behaviors, and no single policy is ideal for all scenarios
- **Thrashing** can occur when memory demands exceed capacity, and different strategies must be employed to handle it effectively
- **Final Takeaway**: As the performance gap between memory and disk increases, investing in more RAM is often the simplest and most effective solution to improve performance

Understanding these swapping policies is essential for optimizing virtual memory management and designing efficient operating systems

### Questions

1. If a policy trace has 15 hits out of 20 accesses, what is the Pmiss value?

- 25% or 0.25
  Phit = 15/20 = 0.75
  Pmiss = 1 - Phit = 1 - 0.75 = 0.25

2. Complete the following sentence based on the optimal policy trace above

- If we calculate the cache's hit rate based on the trace above, we see there are **6** hits and **5** misses.
- This represents a **P_hit** of 54.5% and a **P_miss** of 45.5%

3. Complete the following paragraph about the above policies applied to 3 different systems.

- In a system with hundreds of pages accessed randomly thousands of times, **FIFO and random perform about the same**.
- In a system with pages accessed unevenly (where 80% of accesses were only 20% of the pages), **FIFO and random perform about the same**.
- In a “looping sequential” system where pages are accessed in order and cache size is one less than the number of pages (e.g. a cache of size 3 that accessed 0,1,2,3,0,1,2,3), **random out performs FIFO**.

4. Complete the following paragraph about the FIFO, random, and LRU policies applied to 3 different systems.

- In a system with hundreds of pages accessed randomly thousands of times, **FIFO, random, and LRU perform about the same**.
- In a system with pages accessed unevenly (where 80% of accesses were only 20% of the pages), **LRU performs the best**.
- In a “looping sequential” system where pages are accessed in order and cache size is one less than the number of pages (e.g. a cache of size 3 that accessed 0,1,2,3,0,1,2,3), **random performs best**.

5. Which of the following are controlled by VM policies

- When and what to write to the disk
- When and what to page in
