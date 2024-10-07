# Advanced Page Tables

### Overview

- This section covers advanced paging techniques to address the issue of large page tables
- **Key Questions**:
  - How can we reduce the size of page tables?
  - What are some effective data structures and methods for implementing page tables?

### Introduction

- **Problem**: Page tables, especially linear page tables, are often too large and consume too much memory
  - Example: In a 32-bit address space (4 GB total) with 4 KB pages, there are approximately one million virtual pages
  - If each Page Table Entry (PTE) is 4 bytes, the page table size is 4 MB per process
  - With multiple processes, this can result in hundreds of megabytes being used for page tables alone
- **Goal**: Find techniques to reduce the memory footprint of page tables

### Larger Pages

- **Strategy**: Use larger pages to reduce the number of page table entries
  - Example: A 32-bit address space with 16 KB pages (instead of 4 KB)
  - Reduces the page table size by a factor of 4, resulting in a 1 MB page table
- **Drawback**:
  - Larger pages increase **internal fragmentation** (memory waste within a page)
  - Applications may not fully utilize the large pages, leading to inefficient memory use
  - As a result, most systems use relatively small pages (e.g., 4 KB for x86 or 8 KB for SPARC)

### Paging and Segmentation

- **Combining Paging and Segmentation**:
  - Use a hybrid approach to reduce the size of page tables
  - Each logical segment (e.g., code, heap, stack) has its own page table
  - Only valid pages within each segment are tracked in the page table, reducing the overall size
- **Implementation**:
  - The MMU (Memory Management Unit) uses a base register for each segment, which points to the start of the segment’s page table
  - A bounds register indicates the size of the page table for each segment
- **Advantages**:
  - Saves memory by avoiding empty or invalid entries in the page table
- **Drawbacks**:
  - Still requires segmentation, which is less flexible
  - External fragmentation can occur when segments have varying sizes

### Multi-Level Page Tables

- **Concept**: Transform a linear page table into a tree-like structure
  - Divide the page table into smaller page-sized units
  - Use a **page directory** to track which parts of the page table are valid and where they are stored
- **Example**:
  - A two-level page table structure:
    - **First Level**: Page directory
    - **Second Level**: Pages of the page table
  - Only allocate memory for valid pages of the page table, saving space
- **Address Translation**:
  1. Use the **top bits** of the VPN (Virtual Page Number) to index into the page directory
  2. Retrieve the corresponding page table and use the next bits of the VPN to index into the page table
  3. Retrieve the PTE and combine it with the offset to get the physical address
- **Advantages**:
  - Reduces memory usage for page tables
  - Supports sparse address spaces efficiently
- **Drawbacks**:
  - More complex lookup process, especially for TLB misses
  - Increased overhead with multiple memory accesses

### Multi-Level Page Table Example

- **Example Address Space**:
  - A 16 KB address space with 64-byte pages
  - The virtual address has 8 bits for the VPN and 6 bits for the offset
- **Two-Level Page Table Breakdown**:
  - The page table is divided into 16 pages, each holding 16 PTEs
  - The top 4 bits of the VPN index into the page directory
  - The next 4 bits index into the page table
- **Result**:
  - Instead of allocating the entire 16 pages for the linear page table, only 3 pages are used:
    1. One for the page directory
    2. Two for the valid page table entries (e.g., code and heap segments)

### More Than Two Levels

- Multi-level page tables are not limited to two levels
- **Higher-Level Page Tables**:
  - Additional levels are added to handle larger address spaces
  - Each level reduces the memory needed for the page table but increases the complexity of address translation
- **Example**:
  - A 30-bit address space with 512-byte pages
  - The virtual address is divided into 21 bits for the VPN and 9 bits for the offset
  - With only two levels, the page directory would still be too large, so additional levels are introduced

### Inverted Page Tables

- **Concept**: Instead of having many page tables (one for each process), use a single page table with an entry for each physical page in the system
  - Each entry indicates which process is using the physical page and which virtual page of that process corresponds to this physical page
- **Advantages**:
  - Space-efficient since there is only one page table, regardless of the number of processes
- **Implementation**:
  - Use a hash table to speed up lookups in the inverted page table
  - Example architecture: PowerPC
- **Drawbacks**:
  - Complex to manage and implement
  - Hash collisions can slow down lookups

### Swapping Page Tables to Disk

- If page tables are too large to fit in memory, store them in **kernel virtual memory**
- Portions of these page tables can be swapped to disk if memory becomes scarce
- Allows systems to handle large page tables without consuming excessive physical memory

### Summary

- Advanced page table structures provide ways to optimize memory usage for large address spaces
- **Techniques Covered**:
  - **Larger Pages**: Reduce page table size but increase internal fragmentation
  - **Paging and Segmentation**: Combines both techniques for more efficient memory usage
  - **Multi-Level Page Tables**: Tree-like structure to reduce memory footprint of page tables
  - **Inverted Page Tables**: Single page table for all processes, using less memory
  - **Swapping Page Tables to Disk**: Swaps parts of page tables to disk when memory is limited
- **Key Trade-Offs**:
  - Smaller page tables may increase the complexity and cost of address translation
  - The choice of page table structure depends on the system’s constraints and workload characteristics

### Lab Exercise: Exploring Multi-Level Page Tables

1. **Simulator**: `paging-multilevel-translate.py`

   - Simulates translations with multi-level page tables
   - Allows exploration of different configurations (e.g., two-level or three-level page tables)
   - Use the `-c` flag to check answers and understand the number of memory references required for each translation

2. **Questions**:
   1. How many registers are needed to locate a two-level page table? A three-level table?
   2. How do memory references to the page table behave in the cache? What impact does this have on access times?

By understanding these advanced page table techniques, you can design efficient memory management systems for operating systems with large address spaces
