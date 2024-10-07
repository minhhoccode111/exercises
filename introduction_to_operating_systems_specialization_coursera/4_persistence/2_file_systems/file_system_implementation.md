# File System Implementation

### Overview

- This section introduces the **Very Simple File System (VSFS)**, a basic file system model that provides insights into on-disk structures, data management, and access mechanisms
- The chapter serves as a foundation for understanding more complex file systems used in practice, such as ext3 or XFS

**Key Questions**:

- How can we build a simple file system?
- What structures are needed on the disk to track data?
- How are files organized and accessed?

### Thinking About File Systems

- File systems can be understood from two primary perspectives:

  1. **Data Structures**: On-disk structures that organize file system data and metadata
  2. **Access Mechanisms**: How system calls like `open()`, `read()`, and `write()` interact with these data structures

- Understanding both perspectives helps in grasping how a file system works, including how it manages disk space, organizes files, and optimizes access patterns

### Implementing a Simple File System

- **Disk Layout**:

  - The disk is divided into **blocks** (e.g., 4KB blocks), and the entire file system is seen as a series of these blocks, numbered from 0 to N-1
  - For a 64-block disk, the layout is as follows:
    - First block: **Superblock** (stores metadata about the file system)
    - Next few blocks: **Inode Table** (holds file metadata)
    - Remaining blocks: **Data Blocks** (store file data)

- **Inodes**:

  - Inodes are small data structures (e.g., 128 or 256 bytes) that store information about files, such as file size, owner, permissions, and pointers to data blocks
  - An inode table holds a fixed number of inodes. For example, with 4KB blocks and 256-byte inodes, each block can store 16 inodes

- **Bitmaps**:
  - Bitmaps are used to track free and allocated blocks within the inode table and data area
  - Each bit in the bitmap represents a block, with `0` indicating free and `1` indicating in-use

### File Organization: The Inode

- **Inode Details**:

  - Each inode is identified by an **inode number** and stores essential information like file type, size, permissions, timestamps, and pointers to data blocks
  - Inodes can use direct pointers (point directly to data blocks) and indirect pointers (point to blocks that hold further pointers to data)

- **Multi-Level Index**:

  - To support larger files, file systems use **multi-level indexing**:
    1. **Direct Pointers**: Point directly to data blocks (e.g., 12 direct pointers)
    2. **Single Indirect Pointer**: Points to a block containing pointers to data blocks
    3. **Double Indirect Pointer**: Points to a block containing pointers to blocks that hold pointers to data blocks
    4. **Triple Indirect Pointer**: Points to a block containing pointers to blocks that hold pointers to blocks that hold pointers to data blocks

- **Example**:
  - With 12 direct pointers, 1 single indirect pointer, and 4KB blocks, an inode can address up to 4GB of file data

### Directory Organization

- **Directory Structure**:

  - Directories are simple files that store mappings of filenames to inode numbers (e.g., `filename -> inode number` pairs)
  - This structure allows the file system to resolve a pathname by starting from the root directory and following each directory entry

- **Example**:

  - A directory `dir` (inode 5) contains three files: `foo`, `bar`, and `foobar`, with inode numbers 12, 13, and 24
  - The directory file stores entries like:
    - `(12, foo)`, `(13, bar)`, `(24, foobar)`

- **Handling Deletions**:
  - When a file is deleted, its entry in the directory is marked with a reserved inode number (e.g., 0) to indicate that the space is available for reuse

### Free Space Management

- File systems use **bitmaps** to track free and allocated inodes and data blocks
- **Example**:

  - When creating a file, the file system searches the inode bitmap for a free inode, allocates it, and updates the bitmap to reflect its new state

- **Block Allocation**:
  - File systems often allocate a group of contiguous blocks to a file for better performance
  - Pre-allocating multiple blocks reduces fragmentation and improves access times

### Reading a File from Disk

- **Reading Process**:

  1. Locate the inode using its inode number
  2. Traverse the directory structure, starting from the root directory (`/`), to find the desired file
  3. Read the inode to determine the file’s size, permissions, and pointers to data blocks
  4. Read data blocks as specified by the inode

- **Pathname Resolution**:
  - The file system must read each directory in the pathname (e.g., `/foo/bar`) to find the final inode number for the file

### Writing a File to Disk

- **Writing Process**:

  - Writing requires updating not only the file data but also the metadata
  - For example, when writing to a new file:
    - Allocate a new inode
    - Update the directory to include the file’s name and inode number
    - Allocate data blocks and update the inode with their addresses

- **Example**:
  - Creating a new file `/foo/bar` with three blocks involves:
    - Reading the directory inode
    - Allocating three data blocks
    - Updating the directory and data bitmaps
    - Writing data to each block and updating the inode

### Caching and Buffering

- **Caching**:

  - To reduce I/O overhead, file systems cache frequently accessed blocks in memory
  - When a file is read, its inode and data blocks are cached, so subsequent accesses do not require additional I/O

- **Write Buffering**:

  - Write buffering temporarily stores data in memory before writing it to disk, reducing the number of writes and allowing for better organization
  - Write-back policies can delay writes for several seconds, but introduce the risk of data loss if the system crashes before the data is written

- **Trade-Off**:
  - Applications like databases may use `fsync()` or direct I/O to ensure that data is written immediately to disk, avoiding write buffering

### Summary

- **File Systems**:
  - Inode structures and directory files organize and track data on disk
  - Bitmaps help manage free space and allocation
  - Multi-level indices and directory hierarchies provide scalability and efficient access
- **Caching**:
  - Caching and buffering reduce the number of disk I/O operations, enhancing performance

This foundational knowledge of file system implementation is critical for understanding more advanced file systems and optimizing storage management in operating systems

### Questions

1. Fill in the blanks to complete the statement below.

Click the button below to submit.

- Data Structures: How the file systems organize their metadata and data on disk
- Access Methods: How the file system determines which structures are read or written during a system call, and the efficiency of these actions.

2. Fill in the blanks to match the file system’s components with their descriptions.

- The **inode bitmap** tracks whether an inode or data block is allocated or free.
- The OS will read the **superblock** to set up some parameters before joining the disk to the file system tree.
- The file system uses **metadata** to track specific information about a file. This data is stored in an **inode structure**.
- In our file system’s partition on the disk, the **data region** is where we store user information.

3. Which of the following pieces of information are NOT stored in inodes?

- Filepath

- User Data

- Total Number of Data Blocks

Inodes store information like:

- User and group IDs
- File Access Permissions
- File Sizes

The **filepath** is stored in the directory. **User data** is stored in the data region. The superblock holds information on the **total number of data blocks**.

4. In a multi-level index, the first level index block would point to the disk blocks occupied by **a second level index block**. The second level then points to **the disk blocks occupied by the file**.

5. A directory has a type field that is set to…

- directory

A directory has a type field that is set to directory.

6. Bitmaps are used to…

- manage what inodes and data blocks are free.

7. Fill in the blank to complete the statement below.

To find a desired inode, the file system has to **traverse** , or follow, the pathname.

8. Fill in the blank to complete the statement below.

Creating files generates a lot of **write** traffic.

9. Using cache means that after a file is opened the first time, future opens will require the directory’s inode and data I/O from disk every time.

- False

The first time you open a file (or a directory), you may need to read the directory’s inode and data, but future opens will use the cache and require no I/O.

10.
