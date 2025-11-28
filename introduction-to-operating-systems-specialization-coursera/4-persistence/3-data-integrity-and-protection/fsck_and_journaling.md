# FSCK and Journaling

### Overview

- **Introduction to Crash Consistency**:
  - A file system must handle persistent data structures in a reliable manner, even when power loss or system crashes occur
  - Crashes or sudden power losses can cause inconsistent on-disk structures, leading to a corrupted file system
  - This chapter explores how file systems manage such inconsistencies using tools like `fsck` (File System Consistency Check) and advanced techniques like journaling

**Key Questions**:

- How can a file system maintain consistency despite crashes?
- What are the techniques used to handle inconsistency, such as `fsck` and journaling?
- How does journaling improve the efficiency of post-crash recovery?

### Crash Consistency Problem

- **Scenario**:

  - Imagine needing to update two on-disk structures, `A` and `B`, to complete a task
  - Because a disk can only service one request at a time, either `A` or `B` will be updated first
  - If a crash or power loss occurs after `A` is updated but before `B` is updated, the file system will be left in an inconsistent state

- **Challenge**:
  - The file system must ensure that the disk’s on-disk state remains in a reasonable condition even after a crash
  - This issue, known as **crash consistency** or the **consistent-update problem**, requires the file system to recover or fix inconsistencies without losing data

### Solution #1: Using `fsck`

- **File System Consistency Check (fsck)**:

  - Early file systems used a tool called `fsck` to discover and repair inconsistencies
  - `fsck` operates by scanning the entire file system after a crash and identifying mismatches between inodes, data blocks, and bitmaps

- **How `fsck` Works**:

  - **Superblock Check**: Validates the superblock, which stores critical information about the file system, such as its size
  - **Free Block Check**: Scans inodes, indirect blocks, and other structures to build a correct view of allocated and free blocks
  - **Inode State Check**: Verifies that all inodes are marked correctly in the inode bitmaps and checks for inode corruption
  - **Link Count Check**: Validates the link count of each inode, ensuring that it matches the number of directory entries referencing it
  - **Duplicate Block Check**: Detects if multiple inodes reference the same data block
  - **Bad Block Check**: Checks for block pointers that refer to addresses outside the partition size
  - **Directory Check**: Ensures that directories have correct structure, such as `.` and `..` entries, and checks for consistency in directory hierarchies

- **Drawbacks**:
  - **Performance**: Scanning a large disk volume can take minutes or hours, making `fsck` impractical for modern, large-scale storage systems
  - `fsck` became less feasible as disk sizes increased and RAID adoption grew

### Solution #2: Journaling

- **Journaling**:

  - Journaling, also known as **write-ahead logging**, is used by modern file systems (e.g., Linux ext3/ext4, NTFS, XFS) to maintain consistency with less overhead
  - **Basic Idea**: Before updating the file system, record the intended changes in a separate area called the **journal**. This journal entry allows the system to replay or undo changes if a crash occurs during the update

- **How Journaling Works**:

  - When making changes to the file system, the process is divided into three steps:
    1. **Journal Write**: Write a record of the intended changes (e.g., block allocations, data writes) to the journal
    2. **Journal Commit**: Write a commit block to indicate that the changes have been recorded completely
    3. **Checkpoint**: Write the changes to their final locations on disk

- **Crash Recovery**:

  - If a crash occurs before the journal commit, the changes are discarded
  - If the crash occurs after the commit but before the checkpoint, the file system replays the journal to apply the changes

- **Types of Journaling**:

  1. **Data Journaling**:
     - Both data and metadata are recorded in the journal
     - Ensures that all file content and metadata are consistent, but adds significant I/O overhead
  2. **Metadata Journaling**:
     - Only metadata is recorded in the journal, while data blocks are written directly to their final locations
     - Reduces I/O overhead but can lead to inconsistencies in file content after a crash

- **Performance Optimization**:
  - Use **ordered journaling** to ensure that data is written before metadata, preventing pointers from referencing invalid data blocks

### Recovery and Log Management

- **Recovery Using the Journal**:

  - During recovery, the file system scans the journal for committed transactions and replays them in order
  - This method, called **redo logging**, ensures that the file system reaches a consistent state quickly

- **Handling Log Space**:
  - Journals are implemented as **circular logs**. When the journal is full, older transactions are discarded after checkpointing to free space for new entries

### Batching Log Updates

- **Batching**:

  - Instead of committing each update separately, file systems batch multiple updates into a single global transaction
  - Example: When creating two files in the same directory, `fsck` would update the inode bitmap, file inodes, directory entries, and parent directory inode separately. Batching these updates into one transaction reduces the number of writes

- **Efficiency**:
  - Batching minimizes I/O overhead and speeds up the commit process

### Finite Log Space and Metadata Journaling

- **Finite Log Management**:

  - Journaling file systems use a **journal superblock** to track non-checkpointed transactions
  - This allows the journal to be reused as a circular buffer, and transactions are freed after checkpointing

- **Metadata Journaling**:
  - Metadata journaling writes only metadata to the journal, significantly reducing the amount of I/O needed
  - For some workloads, metadata journaling can improve performance by eliminating unnecessary data writes

### Summary

- **Crash Consistency**:
  - Handling file system updates in the presence of crashes is a critical problem. Solutions like `fsck` and journaling provide ways to recover from crashes
- **Journaling**:
  - Journaling simplifies crash recovery by recording changes before applying them
  - Metadata-only journaling is commonly used due to its balance between performance and reliability

By understanding these techniques, file systems can be designed to be both reliable and efficient, ensuring data integrity even in the event of unexpected system failures

### Questions

1. File system data structures must persist because…

Data such as files, directories, and metadata must be stored on media that keep data even when power is lost

2. Running a tool like fsck is prohibitive because it is very slow and inefficient

3. Write-ahead logging or journaling…

- writes a small note ahead of an action that can be referenced in the case of a crash

- has a journal that is contained with the block group

Write-ahead logging or journaling has a journal that is contained with the block group. It also writes a small note ahead of an action that can be referenced in the case of a crash

4. Data journaling is the process of logging the transaction, the dirty data, its metadata, and a transaction end block, then performing a checkpoint where the pending data and metadata is updated to their final physical locations

- True

5. Fill in the blanks to complete the statement below

A file system can use **journaling** to **recover** after a system crash

6. To avoid unnecessary disk traffic, some file systems **buffer all updates into a global transaction**

7. Using the journal superblock allows for data journaling file systems to use a **circular** log to keep the space in the journal free

8. Metadata journaling has become popular because **it allows for faster file system operation**. It also **decreases the I/O write traffic significantly**

9. The following are additional methods that are used to improve metadata consistency in file systems:

**Copy-on-write**, **backpointer-based consistency**, **optimistic crash consistency**, and **soft updates** are all additional methods that are used to improve metadata consistency in file systems
