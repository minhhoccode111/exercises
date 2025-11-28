# Files and Directories

### Overview

- **Context**: This section explores how file systems manage persistent storage in operating systems. The goal is to understand how files and directories are structured, accessed, and managed within a computer system

**Key Questions**:

- What is a file and how is it represented within the system?
- How do directories organize and access files?
- What are the key file system operations like reading, writing, and deleting files?
- How do links and permissions work in a file system?

### Introduction

- **Virtualization and Persistence**:
  - Two fundamental abstractions in an OS are **processes** (virtualizing the CPU) and **address spaces** (virtualizing memory)
  - The next step in the virtualization journey involves persistent storage, using hard disks or solid-state storage devices to store data permanently, even when the power is off
- **Persistent Storage**:
  - Persistent storage maintains data across reboots and power failures, requiring special handling and protection
  - This section introduces how the OS manages these devices and provides an interface for applications to access stored data

### Files and Directories

- **Files**:
  - A file is a linear collection of bytes that can be read or written
  - Each file is associated with an **inode number**, a low-level name used by the system to refer to the file
  - The file system ensures that when you request data from a file, you get back exactly what you put in
- **Directories**:

  - A directory is a collection of (user-readable name, inode number) pairs
  - Directories map user-friendly names to low-level inode numbers and organize files hierarchically in a **directory tree**
  - The directory tree starts at the root directory (e.g., `/` in UNIX systems) and uses separators (e.g., `/`) to specify sub-directories and files

- **Example**:
  - A file named `bar.txt` created in the directory `foo` would have the absolute pathname `/foo/bar.txt`
  - The file `bar.txt` could exist in multiple locations, e.g., `/foo/bar.txt` and `/bar/foo/bar.txt`, but each has a distinct inode number

### The File System Interface

- **Creating Files**:

  - Use the `open()` system call with the `O_CREAT` flag to create a new file
  - Example:

    ```c
    int fd = open("foo", O_CREAT|O_WRONLY|O_TRUNC, S_IRUSR|S_IWUSR);
    ```

    - This creates a new file named `foo` in the current working directory
    - The permissions are set to allow the owner to read and write to the file

- **Reading and Writing Files**:
  - Use `read()` and `write()` system calls to access files
  - Files are opened using `open()`, and a file descriptor is returned, which is used for further operations
- **Sequential and Non-Sequential Access**:
  - By default, files are read and written sequentially, from start to finish
  - For random access, use the `lseek()` system call to move the file offset to a specific position

### Shared File Table Entries

- **fork() and dup()**:
  - When a process creates a child process using `fork()`, the child inherits all open file descriptors from the parent
  - This means both the parent and child share the same file table entry, which keeps track of the current file offset and other metadata
  - Similarly, the `dup()` system call creates a new file descriptor that points to the same open file table entry

### Ensuring Data Persistence: `fsync()`

- **Writing Data Immediately**:
  - When a file is written to, the data may not be immediately stored on the disk for performance reasons
  - The `fsync()` system call forces the OS to write all modified (dirty) data to the disk, ensuring that the data is safely stored

### File Renaming

- **`rename()` System Call**:

  - The `rename()` system call is used to rename a file and is typically designed to be atomic
  - Example:

    ```c
    rename("foo.txt.tmp", "foo.txt");
    ```

    - This call ensures that even if the system crashes, the file will either have the old name or the new name, never a corrupted state

### Hard Links and Symbolic Links

1. **Hard Links**:

   - A hard link is a directory entry that points to the same inode as another file
   - Deleting one hard link does not delete the file until all links to the inode are removed
   - Example:

     ```sh
     ln file file2
     ```

     - Creates a new link named `file2` that refers to the same inode as `file`

2. **Symbolic Links**:

   - A symbolic link (or soft link) is a file that points to another file using a pathname
   - Unlike hard links, symbolic links can point to directories or files on different partitions
   - Example:

     ```sh
     ln -s file file2
     ```

     - Creates a symbolic link named `file2` that points to `file`

- **Difference**:
  - Deleting the original file breaks the symbolic link, but not the hard link

### Permissions and Access Control

- **UNIX Permission Bits**:

  - Each file and directory has three sets of permission bits: owner, group, and others
  - The permissions are represented as `rwx` (read, write, execute) for each set
  - Example:

    ```
    -rw-r--r--  1 user group  0 Aug 24 16:29 foo.txt
    ```

    - This file allows the owner to read and write (`rw-`), while group members and others can only read (`r--`)

- **Access Control Lists (ACLs)**:
  - ACLs provide more fine-grained control over file permissions compared to standard UNIX permission bits
  - ACLs can specify different permissions for multiple users or groups

### Making and Mounting a File System

- **Creating a File System**:

  - The `mkfs` utility is used to create a new file system on a disk partition
  - Example:

    ```sh
    mkfs -t ext3 /dev/sda1
    ```

    - Creates an `ext3` file system on the device `/dev/sda1`

- **Mounting a File System**:

  - Use the `mount()` system call to attach a new file system to an existing directory tree
  - Example:

    ```sh
    mount -t ext3 /dev/sda1 /home/users
    ```

    - Mounts the `ext3` file system on `/dev/sda1` to the directory `/home/users`

### Summary

- **Files and Directories**:
  - Files are represented by inodes and accessed using file descriptors
  - Directories map human-readable names to inode numbers, forming a directory hierarchy
  - The file system interface includes operations like reading, writing, renaming, and deleting files
- **Links**:
  - Hard links and symbolic links provide ways to create multiple references to a file
- **Permissions**:
  - File permissions are controlled using permission bits and ACLs
- **File Systems**:
  - Creating and mounting file systems involves setting up disk partitions and integrating them into the directory tree

Understanding these fundamental file system concepts is essential for interacting with files and directories in a UNIX-based operating system

### Questions

1. Which of the following file descriptors will an initial call to open() return?

- `3`

An initial call to open() will return file descriptor `3`. `0`, `1`, and `2` belong to the standard input, standard output, and standard error files respectively

2. Fill in the blanks to complete the statements below

If `whence` is `SEEK_END` , the offset is set to **size of file + offset bytes**

If `whence` is `SEEK_CUR` , the offset is set to **current location + offset bytes**

If `whence` is `SEEK_SET` , the offset is set to **offset bytes**

3. Which of the following functions can be used to share open file table entries?

- `dup2()`

- `fork()`

- `dup()`

`fork()`, `dup()`, and `dup2()` can all be used to facilitate open file table sharing

4. Programs use buffers before writing files to disk because…

- It allows for performance optimization

Programs use buffer before writing files to disk because it allows for performance optimization

5. Which of the following is the correctly written function call for renaming the following file?

Select your response and click the button below to submit

Original File Name: husky.jpg
New File Name: husky.jpg.tmp

- `rename("husky.jpg", "husky.jpg.tmp")`

`mv` uses the system function `rename(char *old, char*new)` that takes the old file name and new file name as arguments. To change `husky.jpg` to `husky.jpg.tmp,` you’d use the `rename("husky.jpg"; "husky.jpg.tmp")` command

6. Which of the following pieces of information are included in a file’s metadata?

A file’s metadata includes information like:

- Information on when the file was viewed or modified
- Ownership information
- Inode number
- The file’s size in bytes

7. Fill in the blank to complete the statement below

The `rm` command is used to remove a file

8. True or False: You can directly write information to a directory

- False

False: Directories cannot be directly written to. A directory is considered metadata, so they can only be updated indirectly by creating things within them

9. The `ls` program uses three functions to read a directory: `opendir()`, `readdir()`, and `closedir()`

10. How do the potential consequences of removing a directory `rmdir` differ from removing a file?

Deleting a directory might erase huge amounts of data

11. When is a file completely removed from the directory?

- When the inode number’s reference count returns zero

A file is completely removed from the directory when the inode number’s reference count returns zero

12. A symbolic link is…

- A symbolic link is a third type of file the system recognizes. Similar to files and directories

13. The following permission bits: `rw-r—r—` give what type of access to the group members?

- Read-only

- The same permissions as other/anyone

14. Fill in the blanks to complete the statement

Making and mounting a file system using the `mkfs` tool and the `mount()` call is achieved by writing an `empty` file system starting with the root directory. It uses this to target a `mount point` to paste a new file system onto an existing directory tree.
