# Hard Disk Drives

### Overview

- This section delves into the intricacies of hard disk drives (HDDs), exploring how they function, how data is stored and accessed, and how performance can be optimized through scheduling mechanisms

**Key Questions**:

- How do modern hard disk drives store data?
- How is information organized and accessed?
- How does disk scheduling improve performance?

### Introduction

- **Hard Disk Drives (HDDs)**: Persistent storage devices that retain data even when powered off
- **Purpose**: Understanding HDD internals is crucial for designing file system software that effectively controls data storage and retrieval

- **Interface**:
  - HDDs must support both **reading** and **writing** operations
  - A typical hard drive consists of a **controller** that exports the interface and manages the operation of each I/O request given to the device

### Hard Disk Interface

- The **hard disk interface** connects the HDD to the host computer and transfers data between the disk’s cache and the host’s memory
- The quality of the interface affects system performance significantly

- **Types of Hard Disk Interfaces**:

  1. **IDE**: Mostly used in consumer electronics and some servers
  2. **SATA**: Common in home markets, with different versions like SATA, SATA II, and SATA III
  3. **SCSI**: Predominantly used in servers
  4. **SAS**: Offers higher performance and is used in enterprise environments
  5. **Fiber Channel**: Used in high-end servers due to its high cost and superior performance

- **Geometry**:
  - HDDs are composed of **platters**, which are circular surfaces where data is stored using magnetic variations
  - Each platter has two sides, called **surfaces**
  - Platters are connected around a **spindle** driven by a motor, spinning at a constant speed measured in **rotations per minute (RPM)**
  - The **disk head** performs read/write operations by sensing (reading) or creating changes in (writing) the magnetic patterns on the disk

### Basic Geometry and Structure

- **Disk Components**:

  - A modern disk can have one or more **platters**, with each platter containing thousands of **tracks**
  - A **track** is a concentric circle on a surface, and each track is subdivided into sectors
  - Multiple tracks at the same position on different platters form a **cylinder**

- **Read/Write Operations**:

  - Consist of three parts:
    1. **Seek**: Positioning the read/write head over the desired track
    2. **Rotation**: Waiting for the target sector to rotate under the head
    3. **Transfer**: Performing the read/write operation
  - The majority of time in a well-designed drive should be spent on transferring data

- **Persistent Storage**: Data remains intact even when the device is powered off

### Disk Scheduling

- **Disk Scheduling** optimizes the order in which disk I/O requests are handled, reducing the time spent on seeks and rotations

1. **First-Come, First-Served (FCFS)**:

   - Handles requests in the order they arrive
   - Easy to implement but can result in poor performance if requests are far apart on the disk

2. **Shortest Seek Time First (SSTF)**:

   - Handles the request that is closest to the current head position
   - Minimizes seek time but can cause **starvation** for requests that are far away

3. **SCAN and C-SCAN**:

   - The disk arm moves in one direction, handling requests along the way, and then reverses direction (for SCAN) or jumps back to the start (for C-SCAN)
   - Ensures better average response times but can still cause starvation

4. **LOOK and C-LOOK**:
   - Similar to SCAN and C-SCAN but only moves as far as the furthest request, rather than to the end of the disk

### Time for I/O: Doing the Math

- **Disk Response Time**:

  - The average time a request spends waiting for an I/O operation
  - Calculated as:
    \[
    \text{Disk Response Time} = \text{Seek Time} + \text{Rotational Latency} + \text{Transfer Time}
    \]

- **I/O Rate**:

  - The rate of I/O operations is used to compare drive performance
  - It’s calculated based on the number of I/O operations completed per second

- **Performance Considerations**:

  - There are two main markets when designing disk drives:
    1. **High Performance**: Emphasizes fast seek times and high data transfer rates
    2. **Capacity Market**: Prioritizes cost per byte and maximizes storage capacity

- **Workloads**:
  1. **Random Workloads**: Read small blocks of data from random locations on the disk. Database management systems often use random workloads
  2. **Sequential Workloads**: Read several sectors from the disk linearly. This pattern is common in many applications

### Example: Comparing Two Hard Drives

- **Drive A**:

  - Capacity: 1 TB
  - RPM: 5400
  - Average Seek: 13 ms
  - Max Transfer: 140 MB/s
  - Platters: 1
  - Cache: 128 MB
  - Interface: SATA

- **Drive B**:

  - Capacity: 36.7 GB
  - RPM: 7200
  - Average Seek: 6.3 ms
  - Max Transfer: 160 MB/s
  - Platters: 4
  - Cache: 4 MB
  - Interface: SCSI

- **Performance Analysis**:
  - For random workloads, Drive B performs significantly better due to its lower seek time and higher RPM
  - For sequential workloads, both drives have comparable performance, but Drive B has a slight edge due to its higher transfer rate

### Summary

- HDDs are complex devices with several moving parts, including platters, disk heads, and spindles
- Understanding the geometry and internal structure of HDDs is essential for optimizing disk scheduling and I/O operations
- The performance of a hard drive can be analyzed by considering seek time, rotational delay, and data transfer rates
- Different workloads (random vs. sequential) require different optimizations, and disk scheduling algorithms like SCAN, C-SCAN, and LOOK can improve efficiency depending on the access pattern

Efficient disk scheduling and understanding the characteristics of different HDD interfaces and architectures are crucial for achieving high performance in data-intensive applications

### Questions

1. Fill in the blanks to complete the statement below.

The **hard disk interface** is a device that connects a hard drive to a computer and transports data between the hard disk cache and host memory. It consists of multiple 512-byte **sectors** that make up the drive, having **addresses spaces** ranging from 0 to n-1.

2. Fill in the blanks to describe the parts of a read/write operation.

Rotational Delay: **Waiting for the target sector to rotate under the head**

Transfer: **Performing the read/write operation**

Seek: **Positioning the read/write head over desired track**
