# Log-Structured File System (LFS)

### Overview

- **Log-Structured File System (LFS)**: A file system designed to optimize write performance by writing all modifications (data and metadata) sequentially to disk, rather than performing in-place updates
- LFS is particularly effective for workloads where data is frequently written, such as databases or applications with heavy logging

**Key Questions**:

- How does LFS improve write performance?
- What are the key on-disk structures in LFS, and how do they help maintain consistency?
- How does LFS handle file updates and garbage collection?

### Introduction

- **Motivation**: Traditional file systems, such as FFS, suffer from poor write performance due to frequent seeks and small random writes
- **Solution**: LFS aims to improve performance by grouping writes together and performing large sequential writes to disk. This approach reduces seek overhead and maximizes disk bandwidth utilization

### Writing to Disk Sequentially

- LFS changes the way data and metadata are written to disk
- Instead of modifying existing blocks on disk, LFS **appends** all updates to the end of the log
- This technique has two key advantages:
  1. **Minimized Seeks**: Sequential writes reduce the number of seeks, improving overall performance
  2. **Write Coalescing**: By buffering multiple small writes and writing them as a single large operation, LFS achieves higher effective write throughput

### Writing Sequentially and Effectively

- LFS batches updates into segments (e.g., 1 MB or 2 MB segments), which are written to disk as a single large operation
- The size of the segment is crucial for achieving peak performance. Larger segments reduce the relative overhead of positioning time (seek and rotational latency) compared to the data transfer time

- **Mathematical Model**:

  - Suppose `Tposition` is the positioning overhead (in seconds) and `Rpeak` is the peak transfer rate (in MB/s)
  - If `D` is the size of the segment (in MB), then the total time to write the segment (`Twrite`) is given by:
    \[
    Twrite = Tposition + \frac{D}{Rpeak}
    \]
  - The effective write rate (`Reffective`) can be calculated as:
    \[
    Reffective = \frac{D}{Tposition + \frac{D}{Rpeak}}
    \]
  - To achieve a certain fraction `F` of the peak rate (e.g., 90%), solve for `D` such that:
    \[
    Reffective \approx F \times Rpeak
    \]

- **Example**:
  - For a disk with a positioning time of 10 milliseconds and a peak transfer rate of 100 MB/s, the effective write rate for 90% peak bandwidth can be calculated by choosing an appropriate segment size

### Finding Inodes

- In a conventional file system like FFS, inodes are stored in a fixed location. This makes locating inodes straightforward but leads to fragmentation and poor performance for writes

- **LFS Challenge**:

  - In LFS, inodes are not fixed; they move with each write to new locations on disk. This flexibility complicates inode lookup because the inode’s location is constantly changing

- **Solution**: Use an **inode map** (imap) that tracks the current location of each inode

### The Inode Map

- The inode map (imap) serves as a layer of indirection between inode numbers and their disk addresses
- **How It Works**:

  - When an inode is written to a new location, the imap is updated with the inode’s new disk address
  - The imap itself must be stored persistently on disk, but its location can change with each update

- **Optimizing Imap Storage**:
  - To reduce overhead, LFS writes portions of the imap near the new inode locations, minimizing the need for additional disk seeks

### The Checkpoint Region

- The **checkpoint region (CR)** is a fixed location on disk that stores pointers to the most recent imap and other metadata
- During a crash recovery, the file system starts by reading the CR to find the latest version of the imap and other essential structures

- **Dual Checkpoints**:

  - LFS maintains two checkpoint regions to ensure atomic updates. By alternating between the two checkpoints, LFS can guarantee that at least one CR is always consistent

- **Checkpointing Frequency**:
  - The CR is updated periodically (e.g., every 30 seconds) or when a significant number of updates have been made to the file system

### Reading a File from Disk

- To read a file in LFS:

  1. Start by reading the checkpoint region to get the most recent imap
  2. Use the imap to locate the inode of the file
  3. Read the inode to get pointers to the data blocks
  4. Use direct or indirect pointers to locate the file’s data blocks and read them

- **Performance**:
  - LFS caching reduces the need to read the imap repeatedly, making reads comparable to traditional file systems

### Directory Access

- Directories in LFS store `(filename, inode number)` pairs, similar to traditional file systems
- Creating a new file involves:

  - Allocating a new inode and data block
  - Updating the directory’s inode and data block with the new filename and inode number
  - Writing these updates sequentially to disk, along with the directory’s updated imap entry

- **Optimizing Directory Access**:
  - By co-locating directory inodes and data blocks, LFS reduces the number of seeks required for directory operations

### Garbage Collection

- As LFS appends updates to new locations, old versions of data and inodes accumulate on disk, leading to fragmentation
- **Garbage Collection**:

  - LFS uses a **cleaner** process to identify and reclaim old, unused versions of inodes and data blocks
  - The cleaner reads segments from disk, determines which blocks are live, and rewrites these blocks to new segments

- **Segment Cleaning**:
  - Cleaning is performed periodically to free up space for new writes
  - The cleaner consolidates live blocks into fewer segments, reducing fragmentation and improving performance

### Block Liveness

- Determining whether a block is live or garbage requires tracking its most recent version
- LFS uses a **segment summary block** to store metadata about each block within a segment, including its inode number and offset
- The imap is consulted to determine if the block’s current address matches its location in the segment

### Crash Recovery and The Log

- If a crash occurs while LFS is writing, the log can be used to recover the file system
- **Crash Recovery**:
  - LFS replays the log from the checkpoint region to the end of the log, applying or discarding changes as necessary
  - This process is similar to rolling forward a database transaction log

### Summary

- **Log-Structured File System (LFS)**:
  - Writes data sequentially to disk, improving write performance and reducing seek overhead
  - Uses an inode map and checkpoint region to track inode locations and ensure consistency
  - Employs a cleaner process to reclaim space by consolidating live data blocks

LFS’s design principles have influenced many modern file systems, such as ZFS, btrfs, and flash-based storage systems, due to its efficient handling of write-heavy workloads and robust crash recovery mechanisms

### Questions

1. The log-structured file system increases system performance because:

- all changes are buffered and written in a single continuous sequential transfer
- the RAID is being used efficiently, and
- it buffers all changes into an in-memory segment

2. A log-structured file systems core idea is to write all updates to disk **sequentially**

3. **Write buffering** and **segmenting** are how a log-structured file system are able to use disk space efficiently and increase performance

4. LFS’ solution to finding inodes is to **persistently store new data together with its inode and a section of its imap**

5. A checkpoint region is **a fixed and known location with the addresses to the last known chunks of the imap**

6. The **checkpoint region** must be read first. Next, LFS can use the inode number to look up the disk address stored in the **imap**. Finally, a block can be read from the file using different types of **pointers**, as needed

7. LFS avoids recursive updating by using the **inode map**

8. **Cleaning**, a type of garbage collection, is used to automatically free up memory in LFS

9. LFS uses a **segment summary block** to store extra information needed to determine whether a segment is alive or dead

10. To minimize data loss if a crash occurs while LFS is writing to segment, LFS maintains **two** checkpoint regions

11. LFS is a great file-system for performance in many devices. One of its major drawbacks is **garbage production**
