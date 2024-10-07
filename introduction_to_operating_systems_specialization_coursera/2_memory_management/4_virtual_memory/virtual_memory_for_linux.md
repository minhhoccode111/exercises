# Virtual Memory for Linux

### Introduction

- This section covers some of the more intriguing features of the Linux virtual memory (VM) system
- Linux development was driven by real-world engineering challenges, resulting in a comprehensive and feature-rich VM system
- While we cannot cover every feature of Linux VM, we will focus on its most significant aspects, especially where it diverges from earlier systems like VAX/VMS
- We’ll look at the Linux VM system primarily for Intel x86 architecture, as it is the most common deployment and the foundation for other architectures

**Key Questions**:

- How does Linux handle virtual memory for different address spaces?
- What mechanisms does it use to manage large pages and memory caches?
- How does Linux handle security concerns, such as buffer overflows and speculative execution vulnerabilities?

### The Linux Address Space

- The Linux virtual address space consists of a **user segment** and a **kernel segment**

  - **User Segment**: Contains user program code, stack, heap, and other components. Changes with context switches
  - **Kernel Segment**: Contains kernel code, stacks, heap, and other parts. Remains constant across context switches

- **32-bit Linux**:
  - The user/kernel split occurs at `0xC0000000` (3 GB), with kernel virtual addresses from `0xC0000000` to `0xFFFFFFFF`
- **64-bit Linux**:

  - Has different split points depending on system configuration

- **Kernel Address Types**:

  1. **Kernel Logical Addresses**:
     - Used for regular kernel memory allocations (e.g., `kmalloc`)
     - Has a direct one-to-one mapping with physical memory, making address translation simple
     - Contiguous in logical address space, so suitable for activities requiring contiguous physical memory (e.g., I/O transfers)
  2. **Kernel Virtual Addresses**:
     - Allocated using `vmalloc`, which returns a nearly contiguous region
     - Not necessarily contiguous in physical memory and not suitable for direct memory access (DMA)
     - Used for large buffers where finding contiguous physical memory is challenging

### Page Table Structure

- **32-bit Linux**:
  - Uses a two-level page table structure due to the 32-bit limitation
- **64-bit Linux**:

  - Uses a four-level page table structure (P1 to P4)
  - The top 16 bits of a 64-bit virtual address are unused, while the bottom 12 bits are used as the offset within a page
  - The middle 36 bits are translated through multiple levels of page tables
  - Modern systems may use five or even six levels of page tables as memory sizes grow

- **Page Table Levels in Modern x86 Systems**:
  - The levels are traversed one at a time, making page table lookups more complex
  - Each level of translation adds overhead but supports large virtual address spaces

### Large Page Support

- Linux supports various page sizes beyond the default 4 KB, such as 2 MB and 1 GB pages, depending on the hardware
- **Advantages of Large Pages**:

  - Require fewer mappings in the page table
  - Improve TLB performance, as fewer entries are needed to cover large memory areas
  - Reduce TLB misses, leading to better performance for memory-intensive workloads

- **Transparent Huge Pages (THP)**:

  - Initially, large pages were only available through explicit requests (e.g., using `mmap` or `shmget`)
  - Later, Linux added support for **transparent huge pages**, which automatically allocates large pages for applications that can benefit from them

- **Challenges of Large Pages**:
  - **Internal Fragmentation**: Large pages may waste memory if not fully utilized
  - **Swapping Issues**: Managing large pages in swap space can increase I/O overhead
  - **Allocation Overhead**: Finding and allocating large pages can be time-consuming

### The Page Cache

- The Linux **page cache** is used to cache popular data items in memory, reducing access costs to persistent storage
- Pages in the cache come from:

  1. **Memory-mapped files**
  2. **Device file contents and metadata**
  3. **Anonymous memory** (e.g., process heap and stack pages)

- Cached pages are either:

  - **Clean**: Read but not modified
  - **Dirty**: Modified and need to be written back to storage

- **Page Cache Replacement**:
  - Uses a modified 2Q replacement strategy to manage the cache
  - Pages are placed in an **inactive list** on first access and promoted to an **active list** upon further references
  - Two lists help handle typical access patterns and prevent the entire cache from being replaced by large files

### Security and Buffer Overflows

- **Security Concerns**:

  - Buffer overflow attacks can be used to gain unauthorized access or execute malicious code
  - Attackers exploit flaws to inject code into a program’s address space

- **Defensive Mechanisms**:

  1. **Non-Executable (NX) Bit**:
     - Prevents execution of code in certain memory regions (e.g., the stack)
     - AMD’s x86 architecture includes an NX bit, which is also supported by Intel with the XD (Execute Disable) bit
  2. **Return-Oriented Programming (ROP)**:

     - Attackers manipulate return addresses to execute arbitrary code sequences
     - Linux counters ROP using **Address Space Layout Randomization (ASLR)**

  3. **ASLR**:

     - Randomizes the location of the stack, heap, and code to make it harder for attackers to predict memory addresses

  4. **Kernel Address Space Layout Randomization (KASLR)**:
     - Randomizes kernel address space, further increasing security

### Other Security Problems: Meltdown and Spectre

- **Meltdown and Spectre** are vulnerabilities that exploit speculative execution in modern CPUs
- Speculative execution leaves traces in the system (e.g., CPU caches), making memory susceptible even when secured by the MMU
- **Kernel Page-Table Isolation (KPTI)**:

  - Isolates kernel address space from user processes to mitigate these attacks
  - Introduces a performance cost due to the need for frequent page table switching

- **Challenges**:
  - Complete solutions require in-depth changes to both hardware and software
  - Future systems need to balance performance and security more effectively

### Summary

- Linux VM features include a rich set of mechanisms to manage different address spaces, optimize memory performance, and handle security concerns
- **Key Features**:
  - Support for large pages (e.g., 2 MB, 1 GB) to optimize TLB usage
  - A robust page cache replacement policy (modified 2Q) to handle complex access patterns
  - Security mechanisms like NX bits, ASLR, and KASLR to defend against modern attacks
- **Current Challenges**:
  - Handling large page fragmentation, managing TLB entries for large address spaces, and addressing speculative execution vulnerabilities like Meltdown and Spectre

The Linux VM system continues to evolve, balancing performance, security, and scalability for diverse hardware and workloads

### Questions

1. Use your knowledge of the address space to indicate what portion of the address space each address resides in (assuming 32-bit Linux system)

| Address    | What is there?   |
| ---------- | ---------------- |
| 0x00000000 | **Invalid**      |
| 0xB0000000 | **User Program** |
| 0xD0000000 | **Kernel**       |

2. Linux uses a multi-level page table

- True

The reason for P1…P4 in the virtual address is that there are 4 levels of the page table, instead of 1 linear table.

3. Which of the following does Linux page management track?

- If a page is clean or dirty
- If dirty pages need to be cleaned
- The most actively used pages

Linux tracks a page’s cleanliness, similar to VMS, and bulk writes changes using pdflush, when there are too many dirty pages.

Linux’s page replacement policy tracks which pages are used via the active list.

4. Which of the following ways can you protect your system?

- Randomize virtual addresses in physical memory
- Deny access to particular regions of address space
