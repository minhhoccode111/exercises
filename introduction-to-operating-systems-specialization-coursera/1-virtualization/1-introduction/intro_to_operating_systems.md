# Intro to Operating Systems

## What is an Operating System?

1. Definition of OS:

   - The operating system (OS) is essential software that ensures the system runs efficiently
   - It helps manage and coordinate both software and hardware, enabling smooth operation

2. Purpose of the OS:

   - The OS makes it easy to run multiple programs by sharing memory between them
   - It facilitates interaction between programs and hardware without direct user involvement

3. Program Execution:

   - When a program runs, the OS manages the instructions provided by the program
   - Each instruction goes through three main phases performed by the CPU:
     1. Fetch: The CPU retrieves the instruction
     2. Decode: The CPU identifies the instruction type
     3. Execute: The CPU processes and executes the instruction
   - This cycle repeats millions or billions of times per second until the program completes

4. OS Role in Managing Programs:
   - While your code runs, the OS handles multiple background tasks to ensure the system operates smoothly, making it easier for users to interact with the machine

## Virtualization

1. Virtualization in OS:

   - Virtualization is a key component of the OS that transforms physical resources (CPU, memory, storage) into virtual, user-friendly forms
   - It allows multiple programs to run simultaneously, sharing system resources like CPU, memory, and storage

2. Resource Management:

   - Since many programs share the same resources, the OS is often referred to as a resource manager
   - The OS manages resources like the CPU, memory, and devices, ensuring that each program can function properly without directly competing for these resources

3. CPU Virtualization:

   - With the help of hardware, the OS creates virtual CPUs, giving each running program the illusion that it has its own dedicated CPU
   - This abstraction simplifies multitasking, allowing multiple processes to run efficiently on a single physical CPU

4. Example Program [cpu.c](cpu.c):
   - The provided program continuously prints a given string and waits for 2 seconds between prints
   - The program demonstrates a simple use of the CPU by continuously executing a task (printing) and simulating a wait using a loop to delay the next action
   - Code overview:
     1. `getTime()`: Retrieves the current time
     2. `wait(int howlong)`: A function that waits for the specified number of seconds
     3. `main()`: The main loop that repeatedly prints the input string and waits for 2 seconds before repeating
   - This example shows how a simple program can make use of the CPU in a single-processor system, showcasing the role of the OS in managing resources

## Memory

1. Memory in Programs:

   - Programs access memory constantly, both for reading and writing data
   - Data structures are maintained in memory and accessed via load (read), store (write), and other memory-related instructions
   - Each program instruction is also stored in memory, so memory access happens during every instruction fetch

2. Example: Memory Virtualization:

   - Memory virtualization allows each process to have its own private virtual memory space, distinct from other processes and the OS
   - The OS maps virtual memory into the physical memory of the machine, ensuring that memory references in one program do not affect others

3. How [memory.c](memory.c) Works:

   - The provided program demonstrates how memory is allocated and accessed using `malloc()` and how the virtual memory system works:
     1. Memory Allocation: The program uses `malloc()` to allocate memory
     2. Displaying Memory Address: It prints the memory address and inserts the value `0` into the allocated memory
     3. Updating Memory Value: It inserts the input value into the allocated memory and enters an infinite loop that increments and prints the value every second
     4. PID Display: Every print statement includes the Process Identifier (PID), which is unique to each running process

4. Running Multiple Instances:

   - When multiple instances of the program run simultaneously, each instance will have its own virtual memory space
   - The output from different processes will show unique memory addresses and values for each process, even though they are running the same program
   - This demonstrates the isolation of virtual memory for each process

5. Physical vs. Virtual Memory:

   - Virtual Memory: Each process has its own virtual address space, managed by the OS
   - Physical Memory: Shared among processes, but the OS ensures each program's memory references stay within their allocated virtual memory space

6. Terminating Programs:
   - The `pkill memory` command can be used to terminate the running instances of the program

## Concurrency

1. Concurrency:

   - Concurrency refers to handling multiple processes simultaneously
   - It originated from how the OS manages multiple tasks unpredictably, which can cause issues in multi-threaded systems

2. Multi-Threading Example:

   - The provided [concurrency.c](concurrency.c) code creates two threads that increment a shared counter for the inputted number of times
   - If both threads increment the counter 1000 times each, the expected final value is 2000

3. Concurrency Problem:

   - When running with larger loop values, the final result may not match expectations due to concurrency issues
   - The problem arises because incrementing the counter involves three instructions:
     1. Loading the counter from memory
     2. Incrementing the value
     3. Storing it back in memory
   - These instructions do not execute simultaneously, leading to potential conflicts between threads (a classic concurrency issue)
   - highlights the core issue of concurrency in multi-threaded programs, where thread execution is not synchronized, causing unexpected results in shared resources like the counter

4. Code Overview:
   - `worker()`: Each thread runs this function to increment the counter
   - `pthread_create()`: Creates two threads that run concurrently
   - `pthread_join()`: Waits for both threads to finish before printing the final counter value

## Persistence

1. Volatile Memory:

   - Data in system memory is volatile, meaning it is lost when the system crashes or loses power
   - To prevent data loss, hardware (hard drives, SSDs) and software (file systems) are used to store data persistently

2. File Systems:

   - The operating system manages input/output (I/O) devices like hard drives and SSDs through the file system, which stores user files reliably and efficiently
   - Unlike CPU and memory virtualization, storage is shared among programs without virtualization

3. I/O Example:

   - The provided program [io.c](io.c) demonstrates how data is stored persistently:
     1. open(): Opens or creates a file
     2. write(): Writes data to the file
     3. close(): Closes the file after writing
   - The OS routes these system calls to the file system, which manages the actual writing of data to disk

4. File System Complexity:

   - The file system must determine where data will be stored on the disk and keep track of it using various data structures
   - These structures can range from simple lists to complex trees (e.g., B-trees) to optimize storage and retrieval

5. System Calls and Device Access:
   - The OS provides a standardized way to access storage devices via system calls, making it easier for programs to perform common tasks like file reading and writing

## Summary

What does an Operating System do?

- Takes physical resources (CPU, memory, disk, etc) and **virtualizes** them
- Manages the shared **memory** between programs
- Handles tough issues related to **concurrency**
- Stores files **persistently**, makeing it safe for long-term

### Questions

1. The operating system has a variety of responsibilities. These include, but are not limited to:

- Ensuring the system runs smoothly and efficiently
- Allowing programs to share memory resources
- Allowing programs to interact with various devices

The correct answer is **All of the Above**

2. Through **virtualization**, the operating system abstracts physical hardware into simplified representations. These representations are accessed through **interfaces**. The operating system handles these requests, acting as a **resource manager**

3. Memory is…

- virtualized by the operating system

- accessed constantly to fetch instructions, read and write data, etc.

4. **Concurrency issues happen because instructions from different programs are run in random order**. A single processor can only run 1 thing at a time, so the operating system chops up the tasks and feeds them to the processor, yielding unpredictable results.
