# Free Space Management and Memory Allocation

### Overview

- This section explores how to manage free space in memory
- **Key Questions**:
  - How should variable-size memory requests be managed?
  - How can fragmentation be reduced?
  - What are the time and space overheads of different approaches?

### Introduction

- Memory management involves handling free space efficiently for dynamic allocation
- In systems with fixed-size units (like paging), keeping track of free space is straightforward
- With **variable-size allocations**, managing free space is more complex due to **external fragmentation**: free space is divided into small chunks, preventing large allocations despite having enough total free memory
- **External Fragmentation Example**:
  - Total free space: 16 bytes (divided into two 8-byte segments)
  - A request for 16 bytes fails, as no contiguous block can satisfy the request

### Assumptions

1. **Basic Interface**:

   - The interface is similar to `malloc(size_t size)` and `free(void *ptr)`
   - `malloc()` takes a size and returns a pointer to a region of that size (or larger)
   - `free()` takes a pointer and frees the corresponding chunk, but the library must track sizes internally

2. **External Fragmentation**:

   - Focus on external fragmentation, where free space gets divided into unusable chunks

3. **Memory Cannot Be Moved**:

   - Once allocated, memory cannot be moved to a new location until it is freed
   - No free space compaction is allowed, complicating fragmentation management

4. **Allocator Manages a Fixed Byte Range**:
   - Allocators handle a defined range and do not dynamically request or release memory from the OS

### Low-Level Mechanisms: Splitting and Coalescing

- **Splitting**:

  - When a large free chunk is requested for a smaller allocation, it is split into two chunks
  - One chunk is allocated, while the remaining free chunk stays in the list

- **Coalescing**:
  - When adjacent free chunks are found, they are merged (coalesced) into a larger free chunk to reduce fragmentation
  - Coalescing helps ensure larger free extents are available for future allocations

### Tracking the Size of Allocated Regions

- Allocators store additional information in a **header** located just before the allocated memory region
- **Header Information**:

  - Size of the allocated region
  - Magic number for integrity checking
  - Additional pointers to speed up deallocation

- **Example Header**:

  ```c
  typedef struct {
      int size;
      int magic;
  } header_t;
  ```

  - When `free(ptr)` is called, the library calculates the size of the region using pointer arithmetic:

    ```c
    void free(void *ptr) {
        header_t *hptr = (header_t *)ptr - 1;
        ..
    }
    ```

### Embedding a Free List

- A free list tracks available memory in the heap
- Instead of creating separate list nodes, the list is embedded within the free space
- **Example**:

  - Free list node structure:

    ```c
    typedef struct __node_t {
        int size;
        struct __node_t *next;
    } node_t;
    ```

  - When a free chunk is split, a node is inserted within the newly freed space

- **Free List Management**:
  - Keeps track of allocated and free chunks
  - Handles splitting and coalescing during allocation and deallocation

### Growing the Heap

- When the heap runs out of space, the allocator can either:
  - **Fail**: Return `NULL` if no more memory is available
  - **Expand the Heap**: Use a system call like `sbrk()` to request more memory from the OS

### Basic Allocation Strategies

1. **Best Fit**:

   - Search the free list for chunks equal to or larger than the requested size
   - Return the smallest chunk that fits
   - Leaves minimal leftover space but can create many small fragments

2. **Worst Fit**:

   - Search for the largest free chunk and allocate from it
   - Attempts to prevent many small chunks but can cause excessive fragmentation

3. **First Fit**:

   - Allocates from the first free chunk that can fit the request
   - Fast and simple but may lead to small fragments at the start of the list

4. **Next Fit**:
   - Similar to First Fit but starts searching from the last allocated position
   - Aims to distribute allocations more evenly across the free space

### Examples of Allocation Strategies

- **Example Free List**: [10, 30, 20] bytes
  - **Best Fit (request 15 bytes)**:
    - Allocates from the 20-byte chunk, leaving a 5-byte chunk
  - **Worst Fit (request 15 bytes)**:
    - Allocates from the 30-byte chunk, leaving a 15-byte chunk
  - **First Fit (request 15 bytes)**:
    - Allocates from the first available 20-byte chunk

### Other Allocation Approaches

1. **Segregated Lists**:

   - Separate lists for different size classes (e.g., small, medium, large allocations)
   - Quick allocation for predefined sizes but adds complexity

2. **Buddy Allocation**:

   - Divides free memory into power-of-two-sized blocks
   - Efficiently coalesces memory but can lead to internal fragmentation

3. **Slab Allocation**:

   - Allocates memory for objects of a specific type or size
   - Often used in kernel memory management for frequently used data structures

4. **Binary Trees**:
   - Use trees to track free memory chunks
   - Provides fast searching and insertion but adds overhead

### Summary

- Free space management is crucial for efficient memory allocation
- Techniques like splitting and coalescing help manage fragmentation
- Allocation strategies (Best Fit, Worst Fit, First Fit) have trade-offs in terms of speed and fragmentation
- Advanced strategies (Segregated Lists, Buddy Allocation) provide more sophisticated ways to handle memory allocation

### Lab: Exploring Memory Allocation

1. **Simulator**: `malloc.py`

   - Simulates memory allocation with options for free list management, coalescing, and various allocation policies

2. **Running the Simulator**:

   - Run with different policies and observe how allocations and free list management are affected
   - Example command:

     ```bash
     ./malloc.py -S 100 -b 1000 -H 4 -a 4 -l ADDRSORT -p BEST -n 5 -c
     ```

   - Explore different configurations, like increasing random allocations (`-n 1000`), enabling coalescing (`-C`), and varying policies (`-p BEST`, `-p WORST`)

3. **Lab Exercises**:
   - Predict allocation outcomes
   - Experiment with different strategies and settings
   - Analyze the impact of coalescing and list ordering on fragmentation

### Key Takeaways

- Free space management strategies have unique strengths and weaknesses
- Techniques like coalescing and segmentation help reduce fragmentation
- Allocation strategies should be tailored to the workload for optimal performance

### Questions

1. Which of the following allows allocators to store extra information like the size of an allocated region, a magic number, and additional pointers?

- Header

2. Fill in the blanks to match the Memory Management technique with its description:

- **Worst Fit** - searches the free list for memory chunks larger than the required size and returns the largest. It tries to reduce segmentation but still requires a full search.
- **Slab Allocation** - is used to create a segregated list. The object caches are individually segregated free lists of a given size that serve memory allocation and free requests efficiently.
- **Buddy System** - requires recursively dividing free space by two until a block large enough to meet the request is found. Once the block is freed, the allocator checks for a free neighboring block and merges them.
- **First Fit** - finds the first block that is large enough to accommodate the request. It has the potential to clog the beginning of the free list with little objects.
- **Next Fit** - keeps an extra pointer to the last chunk's location in the free list. Avoids splintering at the start of the list and has the benefit of speed.
- **Best Fit** - searches the free list for chunks of free memory that are larger or equal to the requested size and returns the smallest of those candidates. It tries to decrease wasted space but may suffer a big performance penalty.
- **Quick Fit** - if a specific application makes a popular-size request, it keeps a separate list solely for managing items of that size.
