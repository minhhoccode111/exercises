# Introduction to Paging

### Overview

- This section explores how to virtualize memory using **paging**, addressing segmentation issues
- **Key Questions**:
  - How can we virtualize memory with pages without encountering segmentation issues?
  - What are the basic concepts of paging?
  - How can we implement paging efficiently while saving space and time?

### Introduction

- Memory virtualization can be achieved in two ways:
  1. **Variable-sized sections** (e.g., segmentation): Dividing memory into variable-sized segments like code, heap, and stack. However, this leads to fragmentation, making allocation difficult over time
  2. **Fixed-sized chunks**: Known as **paging** in virtual memory. Divides a process’s address space into fixed-sized units called pages and treats physical memory as an array of fixed-sized slots called page frames

### Basic Concepts of Paging

- **Paging**: Divides memory into fixed-sized pages. Each virtual page is mapped to a physical frame in memory
- **Page**: Fixed-sized unit in virtual memory
- **Page Frame**: Fixed-sized slot in physical memory where a virtual page is stored

- **Advantages of Paging**:

  - More flexible than segmentation
  - Eliminates external fragmentation
  - Simplifies free space management

- **Address Translation**:
  - The OS uses a **page table** to keep track of where each virtual page of a process is located in physical memory
  - The page table is a per-process data structure that stores address translations, mapping each virtual page (VPN) to a physical frame (PFN)

### Address Translation Example

- A virtual address is divided into two parts:

  1. **Virtual Page Number (VPN)**: Identifies the page
  2. **Offset**: Specifies the exact location within the page

- **Translation Process**:

  1. Use the VPN to index into the page table
  2. The page table entry (PTE) provides the corresponding PFN
  3. Combine the PFN with the offset to get the physical address

- **Example**:
  - Suppose we have a 16-byte address space with 4 pages (each 4 bytes in size)
  - Virtual Address: `21`
    - Binary: `010101`
    - VPN: `01` (first 2 bits)
    - Offset: `01` (last 4 bits)
  - The page table maps virtual page 1 (VPN = `01`) to physical frame 2 (PFN = `10`)
  - The resulting physical address is `0x22` (in hexadecimal)

### Page Table Storage

- Page tables are stored in physical memory and can be very large, especially in systems with large address spaces
- **Page Table Structure**:
  - A linear page table is simply an array
  - Each entry (PTE) maps a VPN to a PFN
  - Additional bits in each PTE include:
    - **Valid Bit**: Indicates if the page is currently mapped to a physical frame
    - **Protection Bits**: Specify read/write/execute permissions
    - **Present Bit**: Shows if a page is in RAM or has been swapped out
    - **Dirty Bit**: Indicates if a page has been modified since it was loaded into memory
    - **Reference Bit**: Tracks if a page has been accessed, useful for page replacement

### Address Translation Implementation

- The hardware, along with the OS, is responsible for translating virtual addresses into physical addresses
- **Steps**:
  1. Retrieve the PTE from the page table in memory
  2. Extract the PFN and combine it with the offset to get the physical address
  3. Load the data from the physical memory into a register (e.g., `eax`)

### Paging Performance Considerations

- **Paging Can Be Slow**:
  - Each memory reference (instruction fetch, load, store) requires a translation from the page table
  - This adds extra memory accesses, potentially slowing down the system
  - Performance can be improved using techniques like Translation Lookaside Buffers (TLBs), which cache recent translations

### Lab: Understanding Paging with a Simulator

1. **Simulator**: `paging-linear-translate.py`

   - Simulates virtual-to-physical address translation with linear page tables
   - Use the `-h` flag to see available options:

     ```bash
     ./paging-linear-translate.py -h
     ```

   - Run the program without any arguments to see default outputs:

     ```bash
     ./paging-linear-translate.py
     ```

2. **Exploring Parameters**:

   - Use various flags to alter address space and physical memory sizes:
     - `-P` : Page size
     - `-a` : Size of address space
     - `-p` : Size of physical memory
     - `-n` : Number of addresses to translate
     - `-u` : Fraction of valid pages (0% to 100%)

3. **Example Commands**:

   - Test different scenarios to see how the address space affects the size of page tables:

     ```bash
     ./paging-linear-translate.py -P 1k -a 1m -p 512m -v -n 0
     ./paging-linear-translate.py -P 2k -a 2m -p 512m -v -n 0
     ./paging-linear-translate.py -P 4k -a 4m -p 512m -v -n 0
     ```

   - Observe how the size of the page table changes as address space and page size grow

4. **Advanced Examples**:

   - Test random seeds and unusual address space configurations:

     ```bash
     ./paging-linear-translate.py -P 8 -a 32 -p 1024 -v -s 1
     ./paging-linear-translate.py -P 8k -a 32k -p 1m -v -s 2
     ./paging-linear-translate.py -P 1m -a 256m -p 512m -v -s 3
     ```

   - Evaluate how realistic each parameter combination is

### Summary

- Paging divides memory into fixed-size pages to virtualize memory efficiently
- **Advantages of Paging**:
  - Eliminates external fragmentation
  - Supports large address spaces
- **Challenges**:

  - Large page tables require significant memory
  - Extra memory accesses during address translation can slow down the system

- **Lab Exercises**:
  - Use the provided simulator to explore virtual-to-physical address translation
  - Experiment with different address space sizes, page sizes, and memory configurations to understand the impact on paging performance

### Questions

1. Which of the following describes generally how paging works?

- Address spaces and physical memory of each process is divided into fixed-sized units

2. Fill in the blanks to complete the statement below

- In the case of paging, we can think of physical memory as being an array of fixed-sized slots called **page frames**. Each of which can hold a single virtual memory **page**.

3. Which of the following describe a page table?

- A data structure that stores translations of virtual address to physical addresses
