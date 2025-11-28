# Cloud-Based Storage Devices

### Key Learning Objectives

- Explain how File, Block, and Object storage differ
- Identify the three types of storage gateways
- List which storage is best for large backups

### Overview of Cloud Storage

- **Cloud Storage**: When files and applications are stored and accessed via the Internet
- **Cloud Companies**: Manage data centers around the world to keep applications functioning properly and user data stored securely
- Multiple cloud offerings have different features depending on each user’s needs:
  - **Public Cloud**: Provides offsite storage for Internet users
  - **Private Cloud**: Provides collaboration and access to private network users
  - **Hybrid Cloud**: A mix of both public and private cloud storage
    - Offers public sharing and restricted private areas via cloud storage and cloud-hosted apps

### Types of Cloud Data Storage

1. **File Storage**

   - Saves all data in a single file and organizes it by a hierarchical path of folders and subfolders
   - Uses app extensions like `.jpg`, `.doc`, or `.mp3`
   - **Key Features**:
     - Familiar and easy for most users
     - Has user-level customization
     - Expensive and hard to manage at larger scales

2. **Block Storage**

   - Splits data into fixed blocks and stores them with unique identifiers
   - Blocks can be stored in different environments (e.g., one block in Linux, the rest in Windows)
   - **Key Features**:
     - Default storage for data that is frequently updated
     - Fast, reliable, and easy to change
     - No metadata, not searchable, and expensive
     - Often used in databases and email servers

3. **Object Storage**
   - Divides data into self-contained units stored at the same level
   - No sub-directories like in file storage
   - Uses metadata for fast searching
   - Each object has a unique number
   - Requires an API to access and manage objects
   - **Best for**:
     - Large amounts of unstructured data
     - AI, machine learning, and big data analytics

### Types of Storage Gateways

- **Storage Gateway**: A service that connects on-premises devices with cloud storage

  1. **File Gateway**:
     - A file server in the cloud that stores data files using the **S3**, **NFS**, and **SMB** protocols
     - **S3 (Simple Storage Service)**: Enables the storage of block data in categories called “buckets.”
     - **NFS (Network File System)**: Enables server-to-server file sharing
     - **SMB (Server Message Block)**: Enables file and print sharing for network users
  2. **Tape Gateway**:

     - A backup server in the cloud
     - Uses **S3**, **Glacier**, and **Glacier Deep Archive** protocols to store virtual tape backups
     - **Glacier**: Features instant archive retrieval
     - **Glacier Deep Archive**: Features 12-to-48-hour data retrieval and lower cost

  3. **Volume Gateway**:
     - Uses the **Internet Small Computer System Interface (iSCSI)** protocol
     - Enables on-premises applications to transfer block data to cloud storage over TCP/IP networks
     - Has two modes:
       - **Stored Mode**: Creates S3 backups of all locally stored content for recovery purposes
       - **Cached Mode**: Only keeps frequently-used data on-premises, requiring much less infrastructure

### Archival Storage and Backup Options

- **Archival Storage**:

  - Moves data out of regular production file areas into long-term storage
  - Can be accessed and brought back into regular use easily
  - Options include:
    - **Tape Drives**: Best for large backups
    - **Flash Storage**
    - **Hard Drives**
    - **Cloud Solutions**
  - **Benefits**:
    - Low-cost and high capacity

- **Backups**:

  - Copies of files, operating systems, settings, and more stored in a separate location in case of disk failure or data loss
  - **Snapshot**: Similar to backups but used in storage arrays or SANs at the enterprise level, capturing a point in time
    - Start off with a full backup
    - **Types of Backups**:
      1. **Full Backup/Snapshot**: Copies everything on a disk selected for backup
      2. **Differential Backup/Snapshot**: Copies only the files that changed since the last full backup
      3. **Incremental Backup/Snapshot**: Copies only the files that changed since any backup

- Backups and snapshots can be automated or manual
- Deleting the original instance of data only retains manual backups
- It is recommended to keep **3 backups** or snapshots saved locally and in the cloud
- Periodically test backups and snapshots to ensure they can restore data in case of corruption

### Summary

- **Object Storage**: Used in AI and machine learning, suitable for large amounts of unstructured data
- **Block Storage**: Used in databases and email servers due to its speed, reliability, and ease of change
- **File Storage**: Familiar, customizable, but not scalable for large systems
- **Three Types of Storage Gateways**: File, Tape, and Volume
- **Tape Drives**: Best for large data backups
- **Three Types of Backups**: Full, Differential, and Incremental
