# Direct Execution

After reading this document, you will be able to:

- Understand the challenges of virtualizing the CPU,
- Learn how Limited Direct Execution (LDE) works,
- Explore how the operating system (OS) maintains control of the CPU

### Introduction to Limited Direct Execution (LDE)

- Virtualization allows multiple processes to run concurrently by sharing the CPU
- The goal of Limited Direct Execution is to run programs directly on the CPU as efficiently as possible, but with the OS maintaining control to manage the system

### Basic Technique: Limited Direct Execution

- Direct Execution runs the program directly on the CPU, starting by creating a process, allocating memory, loading the program, and running it
- The OS must manage two challenges:
  1. Ensuring that a process doesn’t perform unauthorized actions (e.g., accessing the disk),
  2. Switching between processes during time-sharing to maintain virtualization

### Restricted Operations: User & Kernel Mode

- User mode: Limits the actions that can be performed by user programs, preventing access to restricted operations such as I/O requests
- Kernel mode: Grants full system control, allowing privileged operations like managing I/O and memory access
- The OS uses these two modes to control what a process can and cannot do

### System Calls

- System calls allow user processes to request services from the kernel, like accessing files, creating or killing processes, and allocating memory
- A system call triggers a trap instruction, which switches the process from user mode to kernel mode, allowing the OS to handle the privileged operation
- The OS uses a return-from-trap instruction to return control to the user process after the requested action is complete

### Trap Tables

- During boot, the OS sets up trap tables that tell the hardware which code to run when specific system events (like system calls) occur
- Each system call has a unique number that directs the OS to the correct code in the trap table

### Problem 2: Switching Between Processes

- When a process is running, the OS is not, so it must regain control to switch between processes
- Cooperative approach: Processes voluntarily give control back to the OS when making system calls or encountering illegal operations (e.g., dividing by zero)
- Non-cooperative approach: The OS uses a timer interrupt to regain control of the CPU if a process doesn’t make system calls or if it monopolizes the CPU

### Saving and Restoring Context (Context Switching)

- A context switch occurs when the OS saves the state (registers, program counter) of the current process and restores the state of the next process to be run
- This allows the system to continue running the new process where it left off, ensuring seamless multitasking

### Concurrency Concerns

- During interrupt or trap handling, the OS must manage the risk of multiple interrupts occurring simultaneously. It may disable interrupts temporarily to avoid issues
- Modern operating systems use locking mechanisms to manage access to shared data, ensuring safe and efficient multitasking on multiprocessor systems

### Summary

- Limited Direct Execution (LDE) runs programs efficiently on the CPU while maintaining OS control over privileged operations
- The OS baby-proofs the CPU by setting up trap tables and ensuring processes only run in user mode unless they need OS services via system calls
- Timer interrupts and context switches enable the OS to manage multiple processes and enforce non-cooperative CPU scheduling
- The OS ensures safe and smooth execution by controlling the CPU virtualization process without compromising performance

### Questions

1. A basic direct execution happens in the following order:

- The OS creates an entry for a process list
- The OS allocates memory for a program
- The OS Loads a program into memory
- The OS sets up the stack with argc/argv
- The OS clears registers
- The OS calls main()
- The Program runs main()
- The Program returns from main()
- The OS frees the memory of a process
- The OS removes the entry from the process list

A program does not have permission to manage memory or underlying hardware itself.

2.

- **Kernel Mode** is where the OS runs. It allows code to do as it pleases, including privileged operations like issuing I/O requests.

- **User Mode** limits the capabilities of code running in it. It cannot perform privileged operations

3. Represent how a program in user-mode can perform a task that requires kernel-mode access.

- Create trap table
- Initial system call
- Trap into the kernel
- Perform task
- Return from trap

4. How does a system perform a timer interrupt when a timer interrupt is currently happening?

- Thread locking

5. What mechanism causes the operating system to change from Process A to Process B?

Timer interrupt

The timer interrupt takes control of a running process after a specified amount of time. In the simulation, processes are alloted 5 time units. When the timer gets to 0, the system takes control and switches to the next process.

6. Assume that Process A has not yet finished as the system to Process. Where is the information stored for Process A?

- Registers

When a timer interrupt switches from Process A to Process B, the operating systems stores information about Process A in registers.
