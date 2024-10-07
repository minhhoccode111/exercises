# Complete Virtual Memory Systems

### Introduction

- In this section, we take a deeper look at how complete virtual memory (VM) systems are built
- We’ll analyze two different systems:
  1. **VAX/VMS Operating System**: One of the earliest examples of a modern VM manager, developed in the 1970s
  2. **Linux Operating System**: A widely used OS with highly adaptable virtualization technology for diverse hardware, ranging from small devices to large-scale data centers

**Key Question**: What features are required to create a fully functional virtual memory system, and how do they improve the system’s performance, security, and functionality?

### VAX/VMS Virtual Memory

**Background**

- The **VAX-11 architecture** was released by Digital Equipment Corporation (DEC) in the late 1970s
- The VAX-11/780 and VAX-11/750 systems implemented the architecture
- VAX/VMS (Virtual Memory System) was designed by Dave Cutler, who later led the development of Microsoft’s Windows NT

**Challenges**

- VMS needed to support a wide range of VAX machines, from low-cost models to high-end computers, and had to function effectively across these different systems
- The VAX hardware had a limited page size of 512 bytes, chosen for historical reasons, causing overly large linear page tables

**Solutions in VAX/VMS**

1. **Segmented User Address Space**:

   - Divided user address space into two segments:
     - **P0**: User program segment
     - **P1**: User stack segment
   - The OS avoided reserving page table space between the stack and heap by segmenting the user address space

2. **Page Table Management in Kernel Virtual Memory (KVM)**:

   - User page tables for segments P0 and P1 are stored in kernel virtual memory (segment S)
   - The OS could move these page tables to disk during memory stress, freeing up physical memory

3. **Complicated Address Translation**:

   - Due to kernel-stored page tables, address translation required looking up the page table entry in its own page table (P0 or P1), which may involve consulting the system page table in physical memory

4. **Hardware-Managed TLBs**:
   - VAX systems used hardware-managed TLBs to speed up address translation, minimizing the need for costly lookups

### A Real Address Space

- **VMS Address Space Structure**:

  - A real address space is more complex than a simple user code, data, and heap address space
  - The **kernel virtual address space** is part of each user’s address space
  - The kernel appears to programs as a protected library and is mapped into each user address space for easier data access during system calls

- **Memory Protection**:
  - The VAX system used page table protection bits to enforce access levels
  - Attempts to access kernel memory from user code resulted in OS traps and termination of the offending process

### Page Replacement in VMS

**Challenges**:

- The VAX hardware did not include a reference bit to track active pages
- The OS needed a fair page replacement policy that could handle memory-intensive applications

**Segmented FIFO Replacement Policy**:

- Each process had a **resident set size (RSS)** limit
- When a process exceeded its RSS, the “first-in” page in its FIFO list was evicted
- To improve FIFO performance, VMS used:
  - **Global Clean-Page Free List**: Pages that were not modified since being loaded into memory
  - **Global Dirty-Page List**: Pages that were modified and needed to be written back to disk before being evicted

**Page Clustering**:

- The OS grouped large batches of pages for swapping in and out, optimizing I/O operations and improving performance

### Other VM Techniques in VAX/VMS

1. **Demand Zeroing**:

   - When a page is added to the address space, the OS marks it unavailable
   - If the process accesses the page, the OS zeroes the page and maps it to the process’s address space
   - This technique avoids the overhead of zeroing pages that are never used

2. **Copy-On-Write (COW)**:
   - Instead of copying a page from one address space to another, the OS maps it as read-only in both address spaces
   - If either address space writes to the page, the OS copies the page and updates the address space accordingly
   - COW is used extensively in UNIX systems, especially for `fork()` and `exec()` operations

### Linux Virtual Memory

**Introduction**

- Linux is a widely used OS with adaptable VM techniques for a broad range of systems, from mobile phones to data centers
- Linux’s VM system is designed to balance performance and scalability across diverse workloads

**Page Table Management in Linux**

- Uses a **multi-level page table structure** to support large address spaces efficiently
- Uses various replacement policies, such as **Least Recently Used (LRU)** and **Clock Algorithm** variants, to manage memory effectively

**Handling Memory Pressure**

- Uses techniques like **swapping** and **page compaction** to manage memory pressure and reduce fragmentation
- Supports **Transparent Huge Pages (THP)**, which use larger pages to reduce TLB misses and improve performance

### Summary

- VAX/VMS and Linux provide two distinct implementations of complete virtual memory systems, each with unique strategies for memory management
- **VAX/VMS**:
  - Early solutions like segmented address spaces, kernel-managed page tables, and copy-on-write optimizations laid the foundation for modern VM systems
- **Linux**:
  - Uses advanced multi-level page tables, effective replacement policies, and memory pressure management techniques to provide scalable virtualization for modern computing environments

Understanding these systems provides valuable insight into how complex virtual memory systems are designed and optimized for different types of hardware and workloads

### Questions

1. Complete the following paragraph about VMS

Memory was split into **4** segments: **2** for user programs, **1** for the OS and the rest is unused space.

The virtual address contained 3 pieces of information:

- The first **2** bits indicated which of these 4 parts of memory
- The next 21 bits refer to the **virtual page number**
- The last 9 bits refer to the **page offset**

VMS uses a mix of segmentation and paging

2.Which of the following is true about the VAX/VMS handling of pages?

- A dirty list tracks modified pages
- A clean list tracks un-modified pages
- A modified FIFO policy decides what pages are removed from memory

3. Which of the following decribes situations where the above optimization s save time?

- Two processes referring to the same page without writting to it
- De-allocating memory that is not re-allocated
