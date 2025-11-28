# Fast File System (FFS)

### Overview

- The Fast File System (FFS) was designed to address performance issues in earlier file systems used in UNIX
- FFS improves disk performance by reorganizing on-disk structures and employing disk-aware allocation policies
- **Key Questions**:
  - What problems did older file systems encounter?
  - How does FFS improve upon these limitations?
  - What are the key features and allocation policies of FFS?

### Introduction

- The first file system for UNIX, created by Ken Thompson, was referred to as the **“old UNIX file system”**. It was basic but introduced the fundamental abstractions of files and directories
- Despite its simplicity and ease of use, this file system had severe performance limitations, particularly as the file system filled up and fragmented over time

- **Old File System Structure**:

  - The disk was divided into:
    1. **Superblock**: Contained information about the entire file system, such as volume size and inode count
    2. **Inode Area**: Contained all file system inodes
    3. **Data Blocks**: Occupied most of the disk space, storing the actual file data

- **Performance Issue**:
  - As data blocks were scattered across the disk without considering spatial locality, accessing files required numerous seeks, severely impacting performance
  - Fragmentation due to poor free space management meant logically contiguous files were physically scattered across the disk, reducing read/write performance

### The Poor Performance Problem

- The old UNIX file system’s performance degraded significantly over time, delivering as little as **2% of the disk’s total bandwidth**
- The problem stemmed from treating the disk like random-access memory, without considering the high costs of disk seeks and rotational delays

- **Fragmentation Example**:

  - Consider four files (`A`, `B`, `C`, and `D`), each consisting of two data blocks
  - If `B` and `D` are deleted, the free space is fragmented into two separate two-block regions
  - Allocating a new four-block file `E` forces it to be split into two disjoint regions, causing expensive seek operations when accessing the file

- **Inefficient Block Size**:
  - The old file system used small 512-byte blocks, reducing internal fragmentation but making data transfer inefficient due to increased positioning overhead

### FFS: Disk Awareness

- The Fast File System (FFS) was developed to make file system structures and allocation policies more “disk-aware.”
- FFS retains the same file system interface (APIs like `open()`, `read()`, `write()`, `close()`), ensuring compatibility while improving internal performance and reliability

- **Design Philosophy**:
  - Modern file systems often keep the same interface while upgrading internal implementation for performance, reliability, or other reasons
- **Key Improvement**:
  - FFS introduces the concept of **cylinder groups** to optimize data placement and reduce seek times

### Organizing Structure: The Cylinder Group

- FFS partitions the disk into **cylinder groups**. A cylinder group is a collection of cylinders (a group of tracks) that are the same distance from the center of the disk
- By grouping related data together within cylinder groups, FFS can minimize long seeks and improve access times

- **Cylinder Group Composition**:

  - Each cylinder group contains the following components:
    1. **Superblock**: A copy of the file system’s superblock for reliability
    2. **Inode Space**: Stores file inodes
    3. **Data Block Space**: Stores file data
    4. **Per-Group Inode and Data Block Bitmaps**: Track allocated and free inodes/data blocks within the group
  - The use of bitmaps makes it easier to detect large contiguous free regions, reducing fragmentation

- **Advantages**:
  - By placing files and directories within the same cylinder group, FFS reduces the cost of seeking between related data

### Policies: File and Directory Allocation

- **Basic Policy**: Keep related items together and place unrelated items far apart
- FFS uses several simple heuristics to decide what constitutes “related” data and places them in the same cylinder group

1. **Directory Placement**:

   - Directories are placed in the cylinder group with the fewest allocated directories and the most free inodes
   - This ensures that directories are spread out evenly across cylinder groups, balancing file allocation

2. **File Placement**:

   - Files are allocated in the same group as their parent directory’s inode
   - This keeps data blocks close to their inodes, avoiding long seeks
   - FFS tries to keep the first few files in a directory close together and spreads subsequent files across different groups

3. **Large Files**:
   - FFS uses a special policy for large files that would otherwise fill up a single group and displace smaller files
   - Large files are spread across multiple cylinder groups, ensuring that no single group becomes overfull

### Measuring File Locality

- **File Locality**: The extent to which files accessed close in time are also close in the directory hierarchy
- Using file system access traces, we can measure file locality based on the distance between two accessed files in the directory tree

  - A small distance indicates high locality (files are in the same or nearby directories)
  - High locality reduces seek times and improves performance

- **FFS Heuristics**:
  - FFS heuristics are based on common sense rather than comprehensive studies of file system traffic
  - FFS generally improves performance by reducing seek times between related files

### Large-File Exception

- Large files are an exception to the usual file placement approach in FFS
- If a large file were to fill up a single cylinder group, it would displace other files, reducing locality
- Instead, FFS distributes large files across groups, placing chunks of data in different groups

- **Impact on Performance**:
  - This policy reduces performance for sequential access patterns but can be managed by choosing appropriate chunk sizes
  - By transferring larger chunks, FFS can amortize the cost of seek times, achieving better overall performance

### Summary

- The Fast File System (FFS) significantly improved the performance of the old UNIX file system by being more disk-aware and using sophisticated allocation policies
- **Key Concepts**:

  - **Cylinder Groups**: Grouping related data reduces seek times and fragmentation
  - **File and Directory Placement**: Heuristics based on locality and balancing ensure better performance
  - **Large File Handling**: Special handling of large files prevents single cylinder groups from becoming overfull

- **Legacy**: Many modern file systems, such as Linux’s ext2 and ext3, are intellectual descendants of FFS and continue to use similar design principles

Understanding FFS and its allocation strategies is crucial for appreciating how file systems optimize performance and manage disk resources efficiently

### Questions

1. In the first file system, which of the following held information about the entire file system?

- None of the Above

The superblock held information about the entire file system.

2. Which of the following were key issues with the “old file system” that caused poor performance?

FFS: Poor Performance

- Fragmentation

- Block Size

- Random-memory Access

Block size, random-memory access, and fragmentation were key issues with the “old file system” that caused poor performance.

3. The Fast File System solved many of the old file systems problems by…

- Making the structures and allocation policies "disk aware".

FFS solved many of the old system’s problems by making the structures and allocation policies “disk aware”.

4. Fill in the blanks to complete the statement below.

Using **cylinder groups** allows the FFS to avoid **long disk seeks** when accessing them one after the other. Using per-group inode and data bitmaps allows the FFS to solve some of the **fragmentation** from the previous very simple file system.

5. Fill in the blanks to complete the statement below

The FFS uses **namespace-based locality** and **common sense** to bundle and link files together for increased performance and reduced search times.

6. The FFS handles large file placement by…

- Spreading the file between groups

The FFS handles large file placement by spreading the file between groups.
