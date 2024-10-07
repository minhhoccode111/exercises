# Address Spaces and Virtual Memory

### Overview

- This section explores how the OS virtualizes memory
- **Key Question**:
  - How can the OS represent a private, possibly huge address space for multiple running processes that all share memory on top of a single physical memory?

### Introduction

- Early machines did not provide much memory abstraction
  - The OS was just a set of routines in memory starting at physical address 0
  - A single running program (a process) consumed the rest of memory
- As machines became more expensive, **multiprogramming** (running multiple processes at the same time) became popular to improve CPU efficiency
- **Time Sharing**:
  - Processes shared memory, and the OS switched between them to maintain system interactivity
  - Efficient memory sharing and protection became critical to prevent one process from interfering with another

### The Address Space

- **Address Space**: A program’s view of memory, providing the OS with an abstraction of physical memory
  - A process’ address space contains the program’s memory state, including code, stack, and heap
  - The heap and stack grow in opposite directions to accommodate dynamic memory usage

### Virtualizing Memory

- **Virtual Memory**: The OS’s abstraction of memory addresses for running programs
  - The OS provides the illusion of a large address space, but the actual physical memory is different
  - Each virtual address is translated by the OS and hardware to a physical address
  - This allows multiple processes to coexist in memory without interfering with each other

### Where’s My Program?

- Every address seen by a program is a **virtual address**
  - The actual physical location is only known by the OS
  - When printing a pointer in C, the displayed address is virtual
  - Code, heap, and stack are stored at different virtual addresses in the program’s address space

### OS Goals for Virtual Memory

1. **Transparency**:

   - The OS should implement virtual memory in a way that is invisible to the program
   - The program should operate as if it has its own private physical memory

2. **Efficiency**:

   - The OS should optimize virtualization for both time (minimize performance overhead) and space (minimize memory usage for virtualization structures)
   - Time-efficient virtualization often requires hardware features like Translation Lookaside Buffers (TLBs)

3. **Protection**:
   - The OS should protect processes from each other and from itself
   - Processes should not be able to access or change the memory contents of other processes

### Summary

- **Virtual Memory (VM)** is a major OS subsystem that provides programs with the illusion of a large, private address space to store their instructions and data
- The OS converts each of these virtual memory references into physical addresses
- **Key Goals**: Transparency, efficiency, and protection

### Lab 1: Examining Virtual Memory on Linux

1. Use the `free` tool to view memory usage on Linux-based systems
   - Run `man free` to explore its manual page
   - Use `free -m` to show memory totals in megabytes
   - Check memory usage for total, used, and free memory

### Lab 2: Creating a Memory Usage Program

1. Write a program `memory-user.c` to:

   - Take one command-line argument: the number of megabytes of memory to use
   - Allocate an array and loop through it indefinitely

2. Compile and run the program, then use the `free` tool in another terminal to observe memory usage

3. Experiment with different memory usage amounts and observe how it affects system memory using the `free` tool

### Topics Covered

- **Multiprogramming and Time Sharing**
- **The Address Space**
- **Virtualizing Memory**
- **OS Goals for Virtual Memory**: Transparency, Efficiency, and Protection
- **Lab Exercises**: Exploring memory usage with Linux tools and writing a C program to manipulate memory
