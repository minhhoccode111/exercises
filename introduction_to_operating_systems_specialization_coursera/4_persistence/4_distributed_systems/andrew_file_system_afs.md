# Andrew File System (AFS)

### Overview

- The **Andrew File System (AFS)** was developed at Carnegie Mellon University (CMU) in the 1980s to create a **scalable distributed file system** capable of supporting numerous clients
- AFS aimed to address the limitations of existing distributed file systems by introducing whole-file caching, callbacks, and other mechanisms to improve performance and scalability

**Key Questions**:

- How does AFS ensure efficient file sharing across a large number of clients?
- What were the key design changes between AFSv1 and AFSv2?
- How does AFS handle client-server interactions and cache consistency?

### Introduction

- **Motivation**:

  - Traditional distributed file systems, like NFS, struggled with scalability due to frequent client-server interactions and inefficient cache consistency mechanisms
  - AFS was designed to reduce these interactions and provide better performance, particularly in read-heavy workloads

- **Design Goals**:

  - AFS aimed to scale to as many clients as possible by reducing the load on file servers
  - The system focused on reducing client-server communication and maintaining user-visible behavior that was straightforward to reason about

- **Difference from NFS**:
  - Unlike NFS, which uses block-level caching, AFS uses whole-file caching, storing entire files on the client’s local disk
  - AFS employs a stateful approach with client-server callbacks, ensuring better cache consistency compared to NFS’s stateless design

### AFS Version 1

- **Whole-File Caching**:

  - In AFSv1, when a client opens a file, the entire file is fetched from the server and stored locally on the client’s disk
  - Subsequent `read()` and `write()` operations are performed on this local copy, avoiding network communication and enhancing performance

- **Client-Server Protocol**:

  - AFSv1 used a client component called **Venus** and a server component called **Vice**
  - The `Fetch` protocol message is used to request a file from the server, while the `Store` message is used to send modified files back to the server when the client closes them

- **AFSv1 Consistency**:
  - AFSv1 implemented a `TestAuth` protocol message to check if a locally cached file was still valid
  - This mechanism reduced the frequency of server contacts but still created a significant amount of traffic

### Problems with Version 1

- **Server Bottlenecks**:

  - The `TestAuth` protocol generated excessive traffic, leading to high server load and limiting scalability
  - Each client request required the server to traverse directory paths, consuming CPU and network bandwidth

- **Directory Traversal Overhead**:

  - Each time a client accessed a file, the server had to walk through the directory structure, causing high overhead and making the server a bottleneck for the entire system

- **Single-Process Server Model**:
  - AFSv1 used a single process per client, causing significant context-switching overhead and limiting the number of clients a server could handle

### Improving the Protocol

- **AFSv2 Protocol Enhancements**:
  - The AFS design team introduced **callbacks** and **file identifiers (FIDs)** to address the limitations of AFSv1 and enhance scalability

1. **Callbacks**:

   - A callback is a promise from the server to notify the client when a file has changed
   - Clients do not need to repeatedly check with the server (as in `TestAuth`). Instead, they assume the file is valid until the server informs them otherwise

2. **File Identifiers (FIDs)**:

   - Instead of using full pathnames, AFSv2 uses FIDs, which consist of three parts: volume, file, and a “uniquifier.”
   - This approach reduces directory traversal overhead and makes server interactions more efficient

3. **Threaded Server Architecture**:
   - AFSv2 introduced a multi-threaded server architecture, reducing context-switching overhead and enabling the server to handle more clients

### AFS Version 2

- **Key Features of AFSv2**:

  - AFSv2 was designed to scale more effectively by reducing server load and optimizing client-server communication
  - The use of callbacks minimized the need for clients to send frequent validation requests, reducing the server’s CPU and network usage

- **File Identifier System**:

  - The FID system enables the server to quickly locate files without traversing the entire directory tree
  - FIDs ensure efficient file lookup and retrieval, further improving performance compared to the pathname-based system in AFSv1

- **Client-Server Interaction**:
  - A client sets up callbacks for directories and files when they are fetched from the server
  - If a file is modified on another client, the server breaks the callback, and the client must re-fetch the file, ensuring that it does not use stale data

### Cache Consistency

- **AFS Cache Consistency Mechanism**:

  - AFS ensures consistency using a combination of whole-file caching and callbacks
  - When a file is closed after being modified, the server updates the file and breaks callbacks for all clients with cached copies of that file

- **Visibility of Updates**:

  - Updates become visible on the server only when the file is closed by the client
  - If multiple clients modify a file simultaneously, the **last writer wins**: the final client to close the file overwrites previous changes

- **Cross-Machine Consistency**:
  - In AFS, consistency between processes on different machines is handled by breaking callbacks
  - If a client’s callback is broken, it must re-fetch the latest version from the server

### Crash Recovery

- **Client Crash Recovery**:

  - After a client crash and reboot, it must revalidate its cached files with the server
  - If the cached files are still valid, the client can continue using them. Otherwise, it must re-fetch the files from the server

- **Server Crash Recovery**:
  - Server crashes are more complex because the server loses all in-memory callbacks
  - Upon restart, clients must revalidate all cached files with the server to avoid using stale data
  - This process can be managed using heartbeat messages or explicit invalidation messages from the server

### Performance and Scalability of Version 2

- **Improved Scalability**:

  - With callbacks and FIDs, AFSv2 servers can handle more clients (up to 50 per server, compared to 20 in AFSv1)
  - The majority of file access operations are local, reducing server load and making client-side performance comparable to local file system performance

- **Comparison with NFS**:

  - AFS outperforms NFS in scenarios involving re-reading large files due to its large local disk cache
  - However, NFS is more efficient for small random accesses and updates, as AFS must retrieve entire files even for small modifications

- **Drawbacks**:
  - AFS performs poorly in scenarios where only small portions of large files are accessed, as the protocol requires fetching the entire file

### Other Improvements

- **Global Namespace**:

  - AFS provides a consistent global namespace across all clients, ensuring that files are named consistently across the entire system

- **Security and Access Control**:

  - AFS supports user authentication and access control lists (ACLs), providing fine-grained control over file access
  - These security features were more advanced than the limited UID/GID-based permissions of NFS at the time

- **Ease of Administration**:
  - AFS introduces tools for easier server management, making it a more user-friendly system for administrators

### Summary

- **AFS’s Contributions**:

  - AFS introduced innovative techniques like whole-file caching and callbacks, which reduced server load and improved scalability
  - The system’s stateful design and use of FIDs enabled better client-server interactions compared to traditional distributed file systems like NFS

- **Performance and Scalability**:

  - AFS provided high performance for read-heavy workloads but was less effective for write-heavy or random-access patterns

- **Legacy and Adoption**:
  - While AFS’s adoption has declined over time, its concepts have influenced modern file systems like NFSv4, which incorporates server state and other AFS-like features

Understanding AFS’s design and implementation helps in building scalable distributed systems and sheds light on the evolution of distributed file system technologies

### Questions

1. The Andrew File System has always prioritized **scalability** and **sensible** user-visible behavior.

2. AFS uses **whole-file** caching to reduce network communication and increase performance.

3. One major issue the authors found with AFSv1 was that too many TestAuth protocol messages being issued by the client would

- generate a lot of traffic.

Clients sending too many TestAuth protocol messages **generate a lot of traffic**.

4. AFS uses callbacks to **reduce the number of client/server interactions**.

5. When working on different machines, if Client 1 modifies a file that is cached on Client 2, the server will “break” the callback and require a re-fetch by Client 2 to receive the latest version of the file.

- True

6. In the AFS protocol, if a client has crashed, upon rebooting, it should **send a TestAuth message to the server to verify whether its contents are up-to-date or not**.

7. Features like user authentication and true global namespace were added to AFSv2 in order to make the system easier to use and manage.

- True
