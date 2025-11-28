# Event-Based Concurrency

### Introduction

- **Overview**: So far, we’ve focused on threads as the primary means of building concurrent applications. However, there is another approach, particularly common in GUI applications and internet servers: **event-based concurrency**
  - This method has become popular with frameworks like Node.js and originates from C/UNIX systems
- **Two Main Problems Solved by Event-Based Concurrency**:

  1. **Simplifying concurrency**: Multi-threaded systems can be difficult to manage due to race conditions, deadlocks, and other issues. Event-based systems avoid some of these pitfalls
  2. **More control over scheduling**: In thread-based systems, developers rely on the operating system to schedule threads. In event-based systems, scheduling is handled explicitly within the application

- **Objective**: Learn how to build concurrent servers **without** threads

### The Basic Idea: An Event Loop

- **Concept**:
  - The core concept of event-based concurrency is the **event loop**
  - In this model, the system waits for events (e.g., I/O operations, network messages) to occur and then processes them one by one through **event handlers**
- **Event Loop Example**:

  - Pseudocode:

    ```c
    while (1) {
        events = getEvents();
        for (event in events) {
            processEvent(event);
        }
    }
    ```

  - The event loop waits for events, processes each event in turn, and never blocks or multitasks unless necessary

- **Main Advantage**:
  - The event-based approach offers **explicit control** over scheduling, as the event loop determines which event to handle next

### An Important API: `select()` (or `poll()`)

- The **select()** (or **poll()**) system calls are fundamental to event-based concurrency
  - These calls monitor multiple file descriptors and wait until one or more of them are ready for I/O operations (e.g., reading or writing)
- **Using `select()`**:

  - An event-based server can use `select()` to monitor network sockets for incoming messages
  - Pseudocode:

    ```c
    FD_ZERO(&fdset);  // Clear the set of file descriptors
    FD_SET(sock, &fdset);  // Add socket to the set
    select(maxfd + 1, &fdset, NULL, NULL, NULL);  // Wait for an event
    if (FD_ISSET(sock, &fdset)) {
        // Process incoming data
    }
    ```

  - The server enters an infinite loop, uses `select()` to monitor sockets, and processes data as it arrives

- **Why Simpler? No Locks Needed**:
  - Event-based concurrency eliminates the need for locks because only one event is processed at a time. Since there’s no simultaneous access to shared data, issues like race conditions and deadlocks are avoided

### A Problem: Blocking System Calls

- **Blocking System Calls**:

  - One challenge of event-based concurrency is dealing with blocking system calls (e.g., `read()` or `write()`)
  - If a system call blocks, it stops the entire event loop, halting all other event processing

- **Example**:
  - A server needs to read a file from disk after receiving a network request. If the file is not already in memory, the `read()` system call will block the event loop while waiting for the data to be retrieved from disk

### A Solution: Asynchronous I/O

- **Asynchronous I/O** solves the problem of blocking calls by allowing the event loop to issue I/O requests and continue processing other events while waiting for the I/O to complete

- **Asynchronous Read Example** (Mac OS API):

  - An asynchronous read request can be issued using the `aio_read()` function, which allows the event loop to keep running:

    ```c
    struct aiocb aio_req;
    aio_read(&aio_req);  // Issue asynchronous I/O
    ```

  - The application can then poll for the I/O completion using `aio_error()` to check the status

- **Challenge**:
  - Polling for I/O completion can be inefficient, requiring a balance between polling too often or waiting too long
  - Some systems solve this by using **interrupt-based** techniques, where a signal is sent when the I/O completes

### Another Problem: State Management

- **State Management**:

  - In thread-based programs, the state is naturally stored on the thread’s stack. However, in event-based systems, the state must be managed manually across different events
  - This requires **manual stack management**, where the state is stored in data structures that can be accessed by the event handler once the I/O operation completes

- **Example**:
  - In a thread-based system, a thread reading from a file and writing to a socket retains state (e.g., file descriptor) on its stack
  - In an event-based system, the file descriptor and other state information must be stored explicitly in a data structure (e.g., a hash table) so that it can be accessed when the next event is processed

### Challenges with Event-Based Concurrency

1. **Multi-Core Systems**:

   - The simplicity of event-based concurrency diminishes with the advent of multi-core systems
   - To utilize multiple cores, event handlers must run in parallel, reintroducing the need for synchronization mechanisms like locks

2. **Implicit Blocking**:

   - Implicit blocking due to page faults (e.g., accessing memory not currently in RAM) can halt the event loop, leading to performance degradation

3. **API Evolution**:

   - Changes in API behavior (e.g., a non-blocking function becoming blocking) require significant modifications to event-based code, making maintenance difficult

4. **Asynchronous I/O Limitations**:
   - Asynchronous disk I/O is now available on most platforms, but it doesn’t integrate seamlessly with network I/O, requiring the use of both `select()` for networking and asynchronous calls for disk operations

### Summary

- **Event-Based Concurrency** is a powerful alternative to thread-based concurrency, offering explicit control over event scheduling and eliminating many concurrency issues like race conditions and deadlocks
- However, it introduces complexity in state management, blocking system calls, and adapting to multi-core systems
- **Key Concepts**:
  - Event loop
  - Asynchronous I/O
  - Manual stack management
  - Handling blocking calls and managing state across events

Both event-based concurrency and thread-based concurrency will likely continue to coexist as viable solutions to concurrent programming problems, each with its strengths and weaknesses

### Questions

1. What happens in event based concurrency when event does not happen?

- wait

The strategy is straightforward: you simply wait for something like an “event” to happen. Unless there is a timeout signal

2. What does `fds` stand for?

- Functional Design Specification

Functional Design Specification or FDS is a document that describes how a process or a control system will operate

3. if event handler makes a blocking call, it will use threads to avoid blocking the the system

- False

There are no other threads to run in an event-based method, only the main event loop. And this means that if an event handler makes a blocking call, the entire server will do the same: block until the call is completed

4. Which of the following is not needed for an asynchronous read to occur?

- the time it takes for the request

The following information must be entered before an asynchronous read can occur:

- The file descriptor of the file to be read (aio_fildes)
- The offset within the file (aio_offset)
- The length of the request (aionbytes),
- The target memory location into which the read results should be copied (aio_buf)

5. Which of the following is not a difficulty with event based programs?

- Complicated to have explicit control over scheduling

When a handler processes an event, it is the only activity taking place in the system; thus, deciding which event to handle next is equivalent to scheduling. This explicit control over scheduling is one of the fundamental advantages of the event based approach

6. Concurrent program don’t need locks

- True

Because just one event is handled at a time, there is no need for locks to be acquired or released
