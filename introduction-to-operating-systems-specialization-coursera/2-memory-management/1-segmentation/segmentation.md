# Segmentation and Memory Virtualization

### Overview

- This section explores how to support a larger address space and address challenges like free space between stack and heap
- **Key Question**:
  - How can we support a large address space that could have a lot of free space between the stack and the heap?

### Introduction

- Traditional memory allocation stores each process’s complete address space in memory
- The OS can move processes around using base and bounds registers
- There is often a large "free" area between the stack and the heap, which wastes physical memory when the entire address space is relocated
- **Challenge**: Using a single base and bounds register for memory virtualization becomes inefficient

### Segmentation: Generalized Base/Bounds

- **Segmentation**: Addresses the inefficiency of traditional memory virtualization by using a base and bounds pair for each logical segment of the address space

  - A segment is an uninterrupted piece of the address space with a specific length
  - There are three typical logical segments:
    1. **Code**
    2. **Stack**
    3. **Heap**

- **Advantages**:

  - Segmentation allows each segment to be placed independently in physical memory
  - The OS avoids filling physical memory with unused virtual address space

- The MMU (Memory Management Unit) requires a set of three base and bounds register pairs to handle segmentation effectively
  - Each bounds register indicates the size of a segment and allows the hardware to detect when a software attempts to access data outside of these bounds

### Segmentation Faults

- A **Segmentation Fault** occurs when a program references memory outside its allocated segment
- The hardware traps this illegal access and alerts the OS, which typically terminates the offending process

### Determining the Segment

- The hardware uses segment registers to determine the offset into a segment and identifies which segment an address belongs to
- **Explicit Approach**:

  - Divide the address space into segments using the first few bits of the virtual address
  - Example: In a 16-bit virtual address, the top 2 bits might determine if the address belongs to the code, heap, or stack segment

- **Implicit Approach**:
  - Determines the segment based on the type of address
  - Instruction fetch addresses belong to the code segment, addresses from the stack pointer belong to the stack segment, and all others are in the heap

### Stack Growth and Management

- Segmentation supports stack growth in the negative direction (towards lower addresses)
- The hardware must know which way each segment grows (positive or negative)
- Example:
  - The stack starts at a higher address and grows backward, while the heap starts at a lower address and grows upward

### Support for Sharing

- Segmentation allows shared memory segments between processes, which saves memory
- **Protection Bits**: Specify whether a program can read, write, or execute code in a shared segment
  - **Code Sharing**: Setting a code segment as read-only allows multiple processes to share it without compromising isolation

### Fine-Grained vs. Coarse-Grained Segmentation

- **Coarse-Grained Segmentation**:

  - Cuts the address space into relatively large chunks (e.g., code, stack, heap)

- **Fine-Grained Segmentation**:
  - Splits address spaces into a large number of smaller segments, allowing for more flexible memory allocation
  - Requires additional hardware support, like a segment table stored in memory

### OS Support for Segmentation

1. **Context Switching**:

   - The OS must save and restore segment registers during context switches
   - Each process has its own virtual address space, which the OS must correctly set up before execution

2. **Dynamic Segment Growth**:

   - When a segment (e.g., heap) needs to expand, the memory-allocation library (e.g., `malloc()`) may use a system call (e.g., `sbrk()`) to request more space
   - The OS updates the segment size register and informs the library of success or failure

3. **Managing Free Space**:
   - Segmentation can lead to **external fragmentation**, where free memory is divided into non-contiguous chunks, making it hard to assign new segments or expand old ones
   - The OS might rearrange memory to compact free space, but this is memory-intensive and affects performance

### Summary

- Segmentation improves memory virtualization by:

  - Reducing memory waste
  - Allowing larger virtual address spaces
  - Supporting shared segments for processes

- **Challenges**:
  - **External Fragmentation**: Free memory divided into small chunks makes allocation challenging
  - **Limited Flexibility**: Segmentation is not flexible enough to support fully generalized, sparse address spaces

### Lab: Address Translation with Segmentation

1. **Simulator**: `segmentation.py`

   - Simulates address translation with two segments
   - Segment 0: Grows positively (for code)
   - Segment 1: Grows negatively (for stack)

2. **Running the Simulator**:

   - Run without the `-c` flag to generate address translations
   - Run with the `-c` flag to check your answers
   - Example command:

     ```bash
     ./segmentation.py -s 0 -a 1k -p 16k
     ```

   - Results show whether addresses translate to physical addresses or cause segmentation violations

3. **Experiment**:

   - Use different flags to create new challenges:
     - `-s` or `-seed`: Random seed for generating problems
     - `-a`: Address space size
     - `-p`: Physical memory size

4. **Advanced Exercises**:
   - Configure the simulator to generate a specific number of segmentation violations or valid addresses
   - Experiment with larger address spaces and physical memories

### Key Takeaways

- Segmentation solves many challenges in memory virtualization but introduces new issues like external fragmentation
- Understanding segmentation and how it manages memory allocation helps address these challenges effectively
