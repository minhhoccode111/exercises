# Network File System (NFS)

### Overview

- **Network File System (NFS)** is a distributed file system protocol developed by Sun Microsystems that allows clients to access files over a network as if they were stored locally
- NFS is one of the most widely used distributed file systems and has been designed for simplicity, performance, and stateless operation, making it robust for client/server configurations

**Key Questions**:

- How does NFS enable transparent access to files in a distributed environment?
- What are the core components of the NFS protocol?
- How does NFS handle server crashes and maintain consistency?

### Introduction

- **Distributed File Systems**:
  - Distributed file systems, like NFS, enable multiple clients to access shared data stored on a central server
  - Clients interact with the server using standard file operations like `open()`, `read()`, and `write()`, with all communication handled via network messages
- **Why Use a Distributed File System?**:

  - Centralized storage enables easy data management, backup, and access control
  - A distributed file system also allows multiple clients to access and share data, making it ideal for collaborative environments

- **Core Advantages**:
  - **Centralized Administration**: Managing a few server machines is easier than managing many client systems
  - **Security**: Centralized servers can be located in secure environments to protect data from unauthorized access

### NFS Design

- **Design Considerations**:

  - NFS is built around a stateless client-server protocol, which ensures that server failures do not cause inconsistency or loss of state between clients
  - By using a stateless approach, NFS simplifies server crash recovery and minimizes the need for complex state management

- **Basic Components**:
  - **Client-Side File System**: Translates local file system operations into NFS protocol requests
  - **Server-Side File System**: Responds to client requests by providing the requested data or performing the requested file operations

### NFS Protocol

- **Statelessness**:
  - NFS uses a **stateless protocol**, meaning that the server does not maintain information about client states
  - Each request from a client contains all the necessary information for the server to process the request independently
- **Handling State**:

  - Consider a stateful operation like `open()`. In a stateful system, opening a file returns a file descriptor that both client and server track
  - In a stateless system like NFS, the server does not track which clients have which files open. Instead, every read or write request from a client contains the file handle, offset, and data length

- **Idempotent Operations**:
  - An operation is **idempotent** if performing it multiple times has the same effect as performing it once
  - NFS makes most operations idempotent so that if a client resends a request due to a timeout or server crash, the end result is consistent

### NFSv2: The Stateless Protocol

- **NFSv2 Overview**:

  - The NFSv2 protocol is the classic stateless NFS protocol. It provides simple and fast server recovery because clients can simply resend requests when a server fails

- **File Handle**:

  - NFS uses a **file handle** to uniquely identify files and directories
  - Each file handle includes:
    - **Volume Identifier**: Identifies the file system volume
    - **Inode Number**: Specifies the file or directory within the volume
    - **Generation Number**: Prevents stale file handles from accessing incorrect files when inodes are reused

- **Basic Protocol Operations**:
  - `LOOKUP`: Used to obtain the file handle for a given file or directory name
  - `READ` and `WRITE`: Access file data based on the file handle, offset, and byte count
  - `GETATTR`: Retrieves file attributes like modification time, ownership, and size

### Caching in NFS

- **Client-Side Caching**:

  - To improve performance, NFS clients cache file data and metadata locally
  - Initial reads and writes generate network traffic, but subsequent operations can be served from the client’s cache

- **Cache Consistency**:

  - **Cache Consistency Problem**: Maintaining consistency between multiple client caches is a major challenge
  - If a file is modified on one client, other clients must be aware of the change to avoid reading stale data

- **Solutions**:

  1. **Flush-on-Close**: When a client writes to and then closes a file, all changes are flushed to the server
  2. **Attribute Caching**: Before accessing cached data, the client issues a `GETATTR` request to check if the file has been modified on the server

- **Drawbacks**:
  - Frequent `GETATTR` requests increase server load and can reduce performance

### Server-Side Write Buffering

- **Write Buffering**:

  - NFS servers use write buffers to temporarily store incoming writes before committing them to disk
  - This improves performance but introduces challenges in ensuring data is not lost if the server crashes before writes are committed to stable storage

- **Issue**:

  - If a client writes three blocks (`a`, `b`, and `c`) and the server commits only the first and last blocks (`a` and `c`), the final file contents may not match the client’s expectations

- **Solution**:
  - NFS servers must ensure all writes are committed to stable storage before acknowledging success to the client

### NFS Cache Consistency

- **Consistency Mechanisms**:

  - NFS clients check with the server before accessing cached data to ensure they have the latest version
  - To avoid overloading the server, clients use **attribute caches** that store file attributes for a short period (e.g., 3 seconds)

- **Implications**:

  - While this reduces network traffic, it can lead to clients seeing slightly outdated data

- **Balancing Consistency and Performance**:
  - NFS implements a best-effort approach to maintain cache consistency, resulting in a trade-off between performance and strict consistency

### Handling Failures and Idempotency

- **Handling Server Failures**:

  - In NFS, clients resend requests if they do not receive a response from the server
  - Idempotent operations ensure that repeated requests do not lead to incorrect results

- **Idempotent Operations in NFS**:
  - **LOOKUP** and **READ** operations are trivially idempotent
  - **WRITE** operations are also idempotent because they include the file handle, data, offset, and length in the request, making repeated writes result in the same data

### Summary

- **NFS Fundamentals**:

  - NFS provides a stateless, client-server distributed file system that enables transparent file access over a network
  - The protocol’s stateless nature simplifies crash recovery and ensures that server failures do not disrupt client operations

- **Caching and Consistency**:

  - Client-side caching improves performance but introduces consistency challenges
  - NFS clients use `GETATTR` requests to validate cached data, balancing consistency and performance

- **Handling Failures**:
  - NFS clients handle server failures by retrying idempotent operations until they succeed, making the system robust against transient failures

Understanding the design principles and mechanisms of NFS helps in deploying distributed file systems that are reliable, consistent, and performant in real-world scenarios

### Questions

1. A few benefits of a client/server system are

- Security

- Centralized administration

- Data sharing

A few benefits of a client/server system are data sharing, centralized administration, and security

2. The two key components of a distributed file system are the **client-side file** system and the **file server**

3. The Sun Network File System was created with a(n) **open** protocol. This led to **many** other groups developing their own NFS server

4. In a multi-client, single-server environment, if the server fails **the entire system fails**

5. The **stateless** server will include all necessary information for a client operation

6. A file handle has three key components: **volume identification** tells the server which file system the request is for, the **inode number**, which tells the server which file in that partition the request is going to, and the **generation number**, used when reusing inode numbers

7. The client-side file system keeps track of **open** files and turns application requests into **relevant** protocol messages. The server will then **respond to** protocol messages, which will have all the information needed

8. Idempotency is the idea that **some operations can be repeated with no consequences to the outcome**

9. First accessing data from the server is client-side caching’s **most expensive** operation

10. The issue that arises when multiple clients are storing different versions of a file is known as **update visibility**. The issue of clients using out-dated versions of a file that has been recently updated on the server is known as **stale cache**

11. With cache consistency, sometimes an old version of a file could be accessed simply because **the attribute cache hasn’t timed out yet**.

12. In order to avoid intermingled file contents, NFS servers **must** commit each write to persistent storage before telling the client of success.
