# Redundant Disk Arrays (RAID)

### Overview

- **Introduction to RAID**: RAID (Redundant Array of Independent Disks) is a technology that combines multiple disk drives into a single logical unit to improve performance, increase capacity, and provide redundancy

**Key Questions**:

- How can we build a storage system that is fast, large, and dependable?
- What are the most important techniques used in RAID?
- What are the trade-offs between different RAID levels?

### Introduction

- **I/O Performance**: Input/Output (I/O) operations can become a bottleneck in a system, limiting overall performance

  - We may want storage systems to be:
    1. **Faster**: Reducing read/write times
    2. **Larger**: Increasing storage capacity
    3. **More Reliable**: Providing redundancy to prevent data loss

- **RAID** addresses these needs by distributing data across multiple disks and using techniques like mirroring and parity
  - A RAID setup appears to the OS as a single, large disk

### RAID Architecture

- **RAID Internals**:

  - A RAID system consists of:
    1. Multiple physical disks
    2. Memory (volatile and non-volatile)
    3. One or more processors

- **Hardware RAID**:

  - A dedicated computer system that manages a set of disks
  - Advantages include improved performance, capacity, and reliability compared to a single disk

- **Main Functions of RAID**:

  1. **Block Access**: Uses striping to distribute data blocks across disks, reducing seek time
  2. **Parallel Reads**: Allows simultaneous reads from multiple disks, reducing overall access time
  3. **Mirroring and Parity**: Protects against data loss by storing copies or parity information

- **Transparency**:
  - RAID is transparent to the OS and applications, making it easy to replace a failed disk without software modifications

### RAID Levels

1. **RAID Level 0 (Striping)**:

   - **Description**: Data is divided into stripes and written across multiple disks
   - **Performance**: High performance for read/write operations since multiple disks can be accessed simultaneously
   - **Reliability**: No redundancy. If one disk fails, all data is lost
   - **Use Case**: High-performance applications that don’t require redundancy

   **Evaluation**:

   - **Reliability**: Low (single point of failure)
   - **Capacity**: All disk space is usable for storage

2. **RAID Level 1 (Mirroring)**:

   - **Description**: Each disk has a mirrored copy, providing redundancy
   - **Performance**: Read performance is improved by reading from both disks simultaneously. Write performance is similar to a single disk
   - **Reliability**: High, as data is duplicated across disks
   - **Use Case**: Systems where data reliability is more important than capacity

   **Evaluation**:

   - **Reliability**: High (can withstand one disk failure)
   - **Capacity**: Only half of the total disk space is usable due to mirroring

3. **RAID Level 4 (Block-Level Striping with Parity)**:

   - **Description**: Data is striped at the block level, and a dedicated disk stores parity information
   - **Performance**: High read performance but write operations require parity calculations, leading to slower writes
   - **Reliability**: Can recover from a single disk failure using parity
   - **Use Case**: Environments requiring a balance between performance and redundancy

   **Evaluation**:

   - **Reliability**: Medium (can tolerate one disk failure)
   - **Capacity**: One disk is reserved for parity storage

4. **RAID Level 5 (Distributed Parity)**:

   - **Description**: Similar to RAID 4 but with parity information distributed across all disks, avoiding the single parity disk bottleneck
   - **Performance**: Improved write performance compared to RAID 4
   - **Reliability**: Can recover from a single disk failure
   - **Use Case**: General-purpose servers that require both performance and reliability

   **Evaluation**:

   - **Reliability**: Medium (tolerates one disk failure)
   - **Capacity**: One disk’s worth of space is used for parity

5. **RAID Level 10 (1+0, Mirroring + Striping)**:

   - **Description**: Combines RAID 1 and RAID 0. Data is first mirrored, and then striped across multiple disks
   - **Performance**: High read and write performance, as data is both mirrored and striped
   - **Reliability**: High, as it can tolerate multiple disk failures
   - **Use Case**: High-performance applications requiring both speed and redundancy

   **Evaluation**:

   - **Reliability**: High (can handle multiple disk failures)
   - **Capacity**: Only half of the total disk space is usable due to mirroring

### Fault Model

- **Fail-Stop Model**:

  - The simplest fault model assumes that when a disk fails, all data on it is lost and cannot be recovered
  - RAID systems are designed to detect and handle such failures quickly, allowing data recovery if redundancy is available

- **Other Fault Models**:
  - More complex scenarios, like data corruption or inaccessible blocks on otherwise functional disks, are not considered in the fail-stop model

### Evaluating RAID Performance

- **Performance Metrics**:

  - **Single-Request Latency**: Measures the time to complete a single I/O operation
  - **Steady-State Throughput**: Measures the sustained bandwidth for a series of I/O operations

- **Workloads**:

  - **Sequential Workloads**: Large, continuous reads/writes. RAID systems perform best under these conditions
  - **Random Workloads**: Small, scattered reads/writes. Performance depends on seek times and rotational delays

- **Chunk Size**:
  - The size of each data stripe (chunk size) affects RAID performance
  - Larger chunks reduce the number of disks involved in a single read/write, leading to fewer seeks but lower parallelism

### Advanced RAID Levels

1. **RAID-2**:

   - Uses bit-level striping with Hamming code parity for error correction
   - Not commonly used due to complexity

2. **RAID-3**:

   - Uses byte-level striping with a dedicated parity disk
   - Limited use due to the bottleneck of the parity disk

3. **RAID-6**:

   - Uses distributed double parity, allowing the system to recover from two simultaneous disk failures
   - Commonly used in enterprise environments where data reliability is critical

4. **Hybrid RAIDs**:
   - Combine different RAID levels to achieve specific goals (e.g., RAID 10 for performance and redundancy)

### Summary

- **RAID** provides an effective way to combine multiple disks into a single, more dependable unit
- Choosing the right RAID level depends on the specific needs for performance, capacity, and reliability
  - RAID-1 (mirroring) offers simplicity and redundancy
  - RAID-5 and RAID-6 offer a balance between performance and data protection
  - RAID-0 is suitable for non-critical applications requiring high performance but no redundancy

Understanding the trade-offs between different RAID levels is essential for configuring storage systems that meet specific performance and reliability requirements

### Questions

1. What are the three major ways that RAIDs outperform single disks?

- Performance

- Capacity

- Reliability

RAIDS outperform single disk storage systems in performance, capacity, and reliability

2. Fill in the blank to match the internal RAID component with its description

- Non-volatile memory (NVM): These are responsible for buffering writes safely
- Parity: These include special logic for calculating missing data
- Microcontrollers: These run firmware to control the RAID
- Volatile memory (DRAM): These buffer data blocks that are being read or written

3. A disk can be in one of two states when using the fail-stop failure model

- Working, where all blocks can be read or written

- Failed, where we lose all of the data for good

4. Which of the following is NOT a parameter we use to evaluate a RAID?

- **Mirroring** is a method of copying data, but we don’t use it to evaluate RAID models

5. Which of the following describes a method of splitting data across multiple regions?

- **Striping** is a method of splitting data across multiple areas

6

- **Sequential Request** - Accesses data in a continuous fashion
- **Random Workloads** - Accesses small requests to different random disk locations
- **Steady-State Throughput** - The total bandwidth consumed by requests
- **Single-Request Latency** - The time it takes a RAID to respond to a single logical I/O request demonstrates how much parallelism is possible

7. Which of the following best describes RAID-1?

- Increased reliability because the raid controller can move over to the working disc if one disc fails

- Decreased capacity because half of the space available is always being used to store a copy of the data

RAID-1 experiences increased reliability because if one disc fails the raid controller can simply move over to the working disc. It also gives us decreased capacity because half of the space available is always being used to store a copy of the data

7. Fill in the Blanks to complete the statement below.

- In RAID-4, data is **striped** at the block level. It uses a parity-based technique to **save-space** . The parity bits are **stored on a single disk** .

8. Fill in the blanks to complete the statement below.

- RAID-5 is similar to RAID-4 because it **uses a parity-based technique** . However, RAID-5 has increased space efficiency and improved write performance because it **distributes the parity blocks across all discs** .

9. RAID-10 is an efficient option because the data is…

In a RAID-10 system:

- Data is mirrored across at least two disks.
- It is also striped across at least two disks.
- A pair of drives must fail to mess up the system.
