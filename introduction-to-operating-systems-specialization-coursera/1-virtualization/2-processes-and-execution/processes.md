# Processes

After reading this document, you will be able to:

- Define what a process is,
- Explain how processes are created and managed,
- Understand process states and transitions

### What is a Process?

- A process is a running program. The operating system runs applications by turning programs into processes
- The machine state includes all the components a process interacts with during execution:
  - Memory: Contains instructions and data the process reads and writes
  - Registers: Important for process execution, especially the Program Counter (which tracks the next instruction) and the Stack Pointer (which manages parameters, variables, and return addresses)

### Process Creation

1. Loading a Program: The operating system reads the program from the disk, loads its code and data into memory, allocates memory for the stack, and prepares for I/O requests
2. Initializing Stack and Heap: For C programs, the stack handles local variables, and the heap stores dynamically allocated data (e.g., using `malloc()`)
3. Starting Execution: The operating system jumps to the `main()` function to start the process

### Process States

A process can be in various states:

- Running: Actively using the CPU
- Ready: Ready to run but not currently executing
- Blocked: Waiting for an event (e.g., I/O completion)

The operating system manages state transitions based on system requirements:

- Scheduling: The OS moves processes from ready to running
- Blocking: When a process initiates an I/O operation, it becomes blocked until the I/O completes

### Process Control Block (PCB)

- The PCB is a data structure that holds information about each process, including:
  - Register contents,
  - Memory state,
  - I/O operations

### Summary

- A process is an abstraction for a running program, tracked by the OS through its state (running, ready, blocked), memory, registers, and I/O information
- The OS uses the Process API to create, destroy, control, and track processes
- Key concepts include time-sharing, scheduling policies, and space-sharing to manage multiple processes effectively

### Questions

1. A **process** is a program that is currently executing.

2.

**Registers** - used to decode, execute, and fetch instructions

**Memory** - the instructions and data the executing program reads and writes

3. Select all of the tasks performed before a program is executed.

- Read the bytes of the program.

- Get ready for any I/O requests.

- Set aside memory for the run-time stack of the program.

- Load these bytes into memory, which is the process’s address space.

Executing the main() function in only done once the other four tasks have been completed.

4. Only one process can run at a time, so you cannot have two separate process with the states **Running** and **Running**.

5. A process is **ready** when it is ready to be run but the CPU is busy with another process. A process is **blocked** when it needs something else to happen before it can continue. A process is **running** when it is using the CPU.

6. Select the best device usage when maximizing resources.

The best answer is:

CPU - 71%
I/O - 67%

You want to keep both the CPU and I/O device running as much as possible to maximize your resources. So the best answer is when both devices are running at high percentages.

7. Which of the following is a data structure that holds information about a particular process?

- Process Control Block

A **Process Control Block** (PCB) is a C structure that holds information about each process (also sometimes called a process descriptor).

8. Fill in the blank to complete the statement below.

- A **process list** holds information about all processes in a system. This information entries can be found within a **process control block**.

The process list is a data structure used to keep track of the status of all the processes running. The information for each process is stored in a process control block.

9. What should the CPU utilization be (what percentage of the time the CPU is in use)?

- 100%

The 100 to the right of the colon in the -l command line parameter specifies that CPU usage should be 100%.

10. This simulation has two processes. One has four instructions, all of which require the CPU. The other process issues an I/O request and waits for it to complete.

How long does it take for both processes to be completed?

- 11 clock ticks

`./process-run.py -l 4:100,1:0 -c -p`

Stats: Total Time 11
CPU Busy for 6 ticks + IO Busy for 5 ticks = 11 Total ticks

11. Does it matter if you switch the order of the processes? Why or why not?

- Yes, because the process using CPU can run while the I/O is waiting.

It always makes sense to start CPU processes before I/O processes because I/O can be a bottleneck.

12. What happens if you run these two processes, with the first doing I/O and the second doing CPU work?

- The OS **does not switch** to Process 2 while Process 1 is doing I/O.

With this order of processes, the second process will not begin until the first process completes the I/O tasks.

13. What happens if you run this simulation and the processes switch while waiting?

- The OS **switches** to Process 2 while Process 1 issues I/O.

The SWITCH_ON_IO flag means that other processes can begin if there is a process waiting on I/O) tasks.

14. What happens when you run this simulation?

- The I/O process issues 1 request, then waits for all other processes to complete before issuing the remaining I/O requests.

The **IO_RUN_LATER** flag means that processes won’t be interrupted for I/O, they will complete first.

15. Describe the behavior of the processes when the process launching the I/O runs immediately.

- The I/O process allows other processes to run while waiting for the I/O requests to complete, increasing efficiency.

The **IO_RUN_IMMEDIATE** flag means that other processes can run while waiting for I/O tasks to complete, this is more efficient.
