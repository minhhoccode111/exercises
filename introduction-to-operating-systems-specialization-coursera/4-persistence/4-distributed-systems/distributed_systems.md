# Distributed Systems

### Overview

- This section introduces the fundamental concepts of distributed systems, which consist of multiple machines working together to provide a cohesive service
- Distributed systems can provide high availability, scalability, and fault tolerance, making them essential for modern web services like Google and Facebook

**Key Questions**:

- What are the primary challenges when building distributed systems?
- How can distributed systems remain reliable and consistent despite component failures?
- What communication mechanisms are used to connect machines in a distributed system?

### Introduction

- **Distributed Systems**:

  - A distributed system is composed of multiple machines that work together as a single unit to deliver services
  - Common examples include web servers, cloud services, and distributed databases
  - Large-scale services rely on thousands of machines cooperating to provide a seamless user experience

- **Challenges in Distributed Systems**:
  - Building a distributed system introduces new challenges, such as handling failures and ensuring reliable communication
  - Unlike standalone systems, where component failure is rare, failure is a normal occurrence in distributed systems due to the sheer number of components involved
  - **Focus on Failure**:
    - Distributed systems must be designed to work despite the frequent failure of individual components, ensuring the overall system continues to function correctly

### Building Systems That Work When Parts Fail

- **Fault Tolerance**:

  - A core concept of distributed systems is fault tolerance, which allows a system to continue functioning even when some parts fail
  - Redundancy and replication are common strategies used to provide fault tolerance, similar to how RAID arrays protect against disk failures

- **Example**:

  - In a web service, multiple servers may handle incoming requests. If one server fails, the load can be redirected to another server without disrupting the service

- **System Reliability**:
  - A distributed system should appear reliable to clients, even when some of its components are down
  - Services like Google and Facebook build highly redundant and fault-tolerant systems to ensure high availability and minimal downtime

### Communication Basics

- **Communication in Distributed Systems**:

  - Machines in a distributed system communicate over a network, such as the Internet or a local high-speed network
  - Communication in distributed systems is inherently unreliable, with potential issues like packet loss, delays, and message corruption

- **Packet Loss**:

  - Packet loss can occur due to network congestion, signal interference, or hardware failures in routers and switches
  - Even if all links and components work correctly, packet loss can still occur if the network is overwhelmed by incoming data

- **Handling Packet Loss**:
  - Distributed systems must be designed to detect and recover from packet loss, using mechanisms like retries, acknowledgments, and timeouts

### Unreliable Communication Layers

- **UDP (User Datagram Protocol)**:

  - UDP is an example of an unreliable communication protocol used in distributed systems
  - It is lightweight and does not guarantee message delivery, order, or error checking
  - UDP is suitable for applications that can tolerate occasional packet loss, such as real-time video streaming

- **Handling Packet Loss in UDP**:

  - Since UDP does not guarantee delivery, applications using UDP must implement their own mechanisms to detect lost packets and retransmit them if necessary
  - **Checksums**:
    - UDP includes a checksum to detect packet tampering or corruption

- **When to Use Unreliable Communication**:
  - Unreliable communication is useful for scenarios where performance is critical and some data loss is acceptable

### Reliable Communication Layers

- **Reliable Communication**:

  - Reliable communication protocols, like TCP (Transmission Control Protocol), ensure that messages are delivered correctly and in order
  - TCP uses sequence numbers, acknowledgments, and retransmissions to provide a reliable communication channel

- **Timeout and Retransmission**:

  - If a message is sent but not acknowledged within a specific time, the sender assumes it was lost and retransmits it
  - This process is called **timeout/retry**

- **Handling Duplicates**:
  - TCP uses sequence numbers to identify duplicate messages and avoid processing them multiple times
  - Sequence numbers also ensure that packets are processed in the correct order, even if they arrive out of sequence

### Communication Abstractions

- **Remote Procedure Call (RPC)**:

  - RPC is a popular communication abstraction used in distributed systems
  - RPC allows a client to call a function on a remote server as if it were a local function
  - The RPC system handles the details of packing function arguments into messages, sending them to the remote server, and unpacking the results

- **RPC Components**:

  1. **Client Stub**: Packs function arguments into a message and sends it to the server
  2. **Server Stub**: Unpacks the message, calls the function on the server, and sends the result back to the client
  3. **Run-Time Library**: Manages network communication, retries, and timeouts

- **Benefits of RPC**:
  - Simplifies communication between distributed components by abstracting away the underlying networking details
  - Allows developers to focus on the logic of distributed interactions without worrying about low-level network operations

### Remote Procedure Call (RPC) Implementation

- **RPC System**:

  - An RPC system consists of a client-side stub, a server-side stub, and a run-time library
  - The client and server communicate through stubs generated by an RPC compiler

- **Stub Generator**:

  - The stub generator automates the process of packing function parameters into messages and unpacking them
  - It ensures that function calls made by the client are properly formatted and sent to the server, and vice versa

- **Run-Time Library**:
  - The run-time library handles network communication, retries, and managing connections between clients and servers
  - It abstracts the complexity of dealing with unreliable networks, providing a reliable RPC interface

### Summary

- **Distributed Systems**:

  - Distributed systems connect multiple machines to work together as a cohesive unit
  - They must handle failures, ensure reliable communication, and provide consistent services across all nodes

- **Communication**:

  - Communication is a fundamental aspect of distributed systems
  - Reliable and unreliable communication layers provide different trade-offs in terms of performance and reliability

- **RPC**:
  - RPC is a powerful abstraction that simplifies the development of distributed applications by providing a mechanism to invoke remote functions as if they were local

Understanding these fundamental concepts is crucial for designing reliable and scalable distributed systems capable of handling the complexities of modern applications

### Questions

1. A fundamental issue when working with a distributed system is a matter of managing **failure** in different parts of the system. **Security** is another major concern of distributed systems

2. Communication in modern networking is viewed as unreliable because even if all links, routers, and cables are functioning correctly, a packet can still be **dropped** due to insufficient buffer space

3. UDP/IP networking stack has an **unreliable** layer that can be found on **almost all** modern computers

4. A reliable communication system might have a receiver use a **sequence counter** to verify whether or not they need to pass information to the application

5. Distributed shared memory is no longer used today because its greatest flaws were:

- Dealing with failure and performance

Distributed shared memory is no longer used today because its greatest flaws were how is dealt with failure and its performance

6. The remote procedure call is a **programming language abstraction**

7. A stub generator is an interface that **makes it easy to generate new pieces of code**, **automates message packaging**, and **includes all information needed to run correctly**

8. A frequent issue with the runtime library is **naming**
