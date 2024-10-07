# Swapping Mechanisms

### Introduction

- **Context**: Previously, we assumed that the address space of each process fits entirely into physical memory. Now, we will explore how to support multiple large address spaces simultaneously
- **Challenge**: When the OS needs to support large address spaces, not all pages can reside in physical memory at the same time
  - The OS must find a way to store portions of address spaces that are not in high demand
  - This requires the addition of a new memory hierarchy level, using storage that is larger but slower than memory
- **Solution**: Use disk space, known as **swap space**, to store portions of address spaces temporarily

**Key Question**: How can the OS make use of a larger, slower hardware component (disk) to create the illusion of a vast virtual address space, while remaining transparent to processes?

### Swap Space

- **Swap Space**: Reserved disk space for paging, used to swap pages out of and back into physical memory
  - Swap space is allocated in page-sized units, allowing the OS to manage pages similarly to memory
  - The amount of swap space limits the maximum number of memory pages that a system can use at any given time
- **Example**:

  - A system with 4 pages of physical memory and 8 pages of swap space can support up to 12 pages of active memory usage

- **Types of Data in Swap Space**:
  - **Process Memory**: Portions of a process’s address space not currently in use can be moved to swap space
  - **Code Pages**: Binary programs (e.g., system commands) are often stored on disk. Code pages are loaded into memory as needed and can be swapped out to save space

### The Present Bit

- **Present Bit**: Indicates if a page is currently in physical memory
  - When the OS uses a **hardware-managed TLB**, it relies on the present bit in each Page Table Entry (PTE) to determine if a page is in memory
  - If a page is not in memory (present bit is 0), a **page fault** occurs

### Page Fault Handling

- **Page Fault**: Occurs when a program accesses a page that is not in physical memory
  - The OS is called to handle the fault through a **page-fault handler**
  - The page-fault handler determines whether the page is in swap space and needs to be brought back into physical memory
  - The OS uses the PTE’s data (e.g., a disk address) to locate and load the required page

**Process of Handling a Page Fault**:

1. The page-fault handler finds the location of the page on disk
2. It reads the page from swap space into a free physical frame
3. The page table and TLB are updated to reflect the new location of the page in physical memory
4. The instruction that caused the page fault is retried

- **Performance Impact**:
  - The process is blocked while the page is being loaded from disk
  - During this time, the OS can run other ready processes to maximize system utilization
  - **Overlapping I/O**: Multiple page faults from different processes can be handled simultaneously to improve efficiency

### What to Do with Full Memory

- **Problem**: What happens if memory is full when a page needs to be brought in from swap space?
  - **Page Replacement**: The OS must decide which page(s) to evict from memory to make room for the new page(s)
- **Page Replacement Policy**: Determines which pages should be removed or replaced
  - Choosing the wrong page can significantly degrade program performance, causing the system to run at disk-like speeds (e.g., 10,000 times slower than memory speeds)

### When Replacements Happen

- It’s not ideal to wait until memory is completely full before evicting pages
- **High Watermark (HW) and Low Watermark (LW)**:

  - The OS maintains a small amount of free memory by starting to evict pages when the number of free pages falls below the low watermark (LW)
  - When the number of free pages exceeds the high watermark (HW), the eviction process stops

- **Swap Daemon (Page Daemon)**:

  - A background process responsible for freeing memory by evicting pages when necessary
  - The swap daemon ensures that there is always some free memory available for running processes

- **Performance Optimization**:
  - Many systems cluster or group pages and write them out to swap space in batches, reducing disk seek and rotational overhead

### Summary

- **Swapping** allows the OS to create the illusion of a larger address space by storing portions of memory in swap space on disk
- **Page Table and Present Bit**: Each page table entry has a present bit to indicate whether a page is in physical memory. If not, a page fault occurs
- **Page Fault Handling**: The OS handles page faults by loading the required page from disk into memory, updating the page table, and retrying the instruction
- **Page Replacement**: When memory is full, the OS uses a page replacement policy to evict one or more pages from memory to make room for new pages
- **Watermarks and Swap Daemon**: The OS maintains a small amount of free memory by using high and low watermarks, and the swap daemon handles background page evictions

This understanding of swapping mechanisms is crucial for effectively managing memory in modern operating systems, allowing for better utilization of physical memory and seamless execution of large processes

### Questions

1. Which of the following statements are true about swap space?

- Swap space extends the memory available to a process beyond the system RAM.
- A portion of disk space is reserved for swapping pages in and out of memory.
- Swap space supports multiple processes running at the same time in that they aren’t limited by the available memory.

2. Fill in the blanks below to create a correct statement

- The **present bit** in the **page-table entry (PTE)** informs the **operaing system** that a page exists in **physical memory**.

3. Fill in the blanks to explain how the operating system manages page replacement.

- A proper page replacement strategy will optimize **program performance**. Most operating systems will **evict** pages from memory when there are more than the **high** watermark. Another way page replacement can be optimized is by writing pages out to disk **in a clusters**.

4. Which of the following statements were true when the program zero was running? There may be more than once.

- The amount of free memory went down
- Pages were swapped in
- Pages were swapped out
