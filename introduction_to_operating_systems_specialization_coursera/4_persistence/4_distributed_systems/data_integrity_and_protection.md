# Data Integrity and Protection

### Overview

- This section explores how file systems and storage systems maintain data integrity and protect against failures such as latent sector errors and corruption
- Techniques like checksumming, scrubbing, and error recovery mechanisms are employed to ensure that stored data remains consistent and can be recovered in case of errors

**Key Questions**:

- How do storage systems protect data written to disks?
- What techniques are used to detect and handle errors?
- How can these techniques be made efficient in terms of space and time?

### Introduction

- **Data Integrity**:

  - Data integrity refers to ensuring that data remains accurate and consistent when stored and retrieved from disk
  - Data corruption, latent sector errors, and other types of disk failures can compromise data integrity, leading to loss or incorrect information

- **Focus on Reliability**:

  - Modern storage technologies are prone to various failure modes, requiring robust mechanisms to detect and correct errors

- **Crux**:
  - Systems must implement data integrity techniques that protect against these failures efficiently

### Disk Failure Modes

- **Types of Disk Failures**:

  - **Fail-Stop Model**: Traditional RAID systems were built around the concept of fail-stop, where a disk either worked or failed completely
  - **Latent Sector Errors (LSEs)**: Occur when a disk sector is destroyed or becomes unreadable. This can be caused by physical damage, cosmic rays, or other factors
  - **Block Corruption**: Occurs when the data in a disk block becomes incorrect due to disk or bus faults. These errors are often silent and can go undetected until the corrupted data is read

- **Common Characteristics**:

  - Modern disks may still operate correctly overall but have localized errors like LSEs or corrupted blocks
  - LSEs and corruption are often detected through disk scrubbing or error correction codes (ECC) built into the drives

- **Prevalence**:
  - Studies have shown that both cheap and expensive drives experience LSEs and corruption, with rates varying across drive types and manufacturers

### Handling Latent Sector Errors

- **Definition**:

  - Latent Sector Errors (LSEs) are block-level faults where certain sectors become inaccessible due to surface damage or other issues

- **Detection and Recovery**:

  - When a disk encounters an LSE, the storage system should leverage redundancy mechanisms to retrieve accurate data
  - In mirrored RAID setups, data can be read from the redundant copy. In parity-based RAID (e.g., RAID-5), the block can be reconstructed from parity information

- **RAID Adaptations**:
  - Modern RAID systems like NetApp’s RAID-DP use additional parity blocks to handle LSEs more effectively. This ensures that when an LSE is detected during disk reconstruction, data can still be recovered

### Detecting Data Corruption

- **Challenge**:

  - Detecting corruption is more difficult because it often happens silently. The disk may return corrupted data without signaling an error

- **Checksums**:
  - **Checksums** are used to detect data corruption. A checksum is a small piece of data derived from a larger block of data using a mathematical function
  - When data is written to disk, a checksum is computed and stored alongside the data
  - Upon reading the data, the system re-computes the checksum and compares it with the stored value. If the two do not match, corruption has occurred

### Common Checksum Functions

- **Checksum Functions**:
  - Checksums vary in terms of strength (ability to detect errors) and computation speed

1. **XOR-Based Checksum**:

   - Each data chunk is XORed together to produce a single value representing the entire block
   - This method is fast but may fail to detect certain errors (e.g., if two bits in the same position flip)

2. **Addition-Based Checksum**:

   - Uses simple addition to compute the checksum. It can detect many errors but not those resulting from bit shifts

3. **Fletcher Checksum**:

   - Named after John G. Fletcher, it computes two checksum values (`s1` and `s2`) across the data
   - Detects most single-bit, double-bit, and multiple burst errors

4. **Cyclic Redundancy Check (CRC)**:
   - A more robust checksum that divides the data block by a predetermined value, with the remainder being the CRC value
   - Efficiently implemented and widely used in networking and storage systems

- **No Perfect Checksum**:
  - Despite their effectiveness, no checksum can guarantee the detection of all errors. The probability of collisions (different data blocks having the same checksum) can be minimized but not eliminated

### Checksum Layout and Usage

- **Checksum Storage**:
  - Checksums can be stored within each disk block or separately in dedicated checksum blocks

1. **In-Block Storage**:

   - The checksum is stored alongside the data block. This layout simplifies integrity checking but may waste space

2. **Separate Checksum Blocks**:
   - Checksum blocks are written after every few data blocks, reducing overhead but complicating updates

- **Checksum Verification**:
  - Upon reading a block, the checksum is retrieved and compared to a newly computed checksum over the data
  - If the checksums match, the data is returned to the user. If not, a recovery procedure is initiated

### Misdirected Writes and Lost Writes

1. **Misdirected Writes**:

   - Occur when the data is written to the wrong location due to a controller or disk error
   - **Solution**: Include physical identifiers (e.g., disk number and block offset) in the checksum to detect misdirected writes

2. **Lost Writes**:
   - Occur when a write operation is reported as completed, but the data is not actually written to disk
   - **Detection**: Use techniques like write verification (read-after-write) to ensure data is properly persisted

### Scrubbing

- **Data Scrubbing**:
  - Scrubbing involves periodically reading all data blocks and verifying their checksums to detect latent errors
  - Most systems perform scrubbing during periods of low activity to avoid performance degradation

### Overheads of Checksumming

- **Space Overhead**:

  - Checksums require additional space to store. For example, an 8-byte checksum per 4 KB block consumes 0.19% of the disk’s capacity

- **Time Overhead**:
  - Checksumming adds CPU overhead, as the checksum must be computed and verified each time data is read or written
  - Systems often combine checksumming with other processes, such as data copying, to minimize overhead

### Summary

- **Data Integrity**:
  - Maintaining data integrity involves detecting and correcting errors using techniques like checksumming and redundancy
- **Error Handling**:
  - Handling latent sector errors and corruption requires robust mechanisms to ensure reliable data retrieval and error recovery
- **Overheads**:
  - Checksumming introduces space and time overheads but is essential for detecting and managing disk failures

These techniques are vital for building reliable storage systems that can handle the challenges of modern hardware and data integrity requirements

### Questions

1. **Latent-sector errors** and **block corruption** are two of the most common single-block problems

2. LSEs are **easier** to address because their errors are **detected**

3. The checksum allows systems to pass a chunk of data into a function and produce a small summary to be matched with the original storage value

- True

The checksum allows systems to pass a chunk of data into a function and produce a small summary to be matched with the original storage value

4.

- Cyclic Redundancy Check: the remainder of division by a large binary number

- Fletcher Checksum: is computed by computing two check bytes

- XOR: a reasonable but limited checksum that will not detect a corruption if two bits in the same position change within the checksummed unit

- Addition: a fast method that can identify many changes in data, but not shifted data

5. A checksum is stored with each **disk sector**

6. Fill in the blanks to complete the statements

- If the computed checksum is **equal to** the stored checksum, the data is assumed to be **safe**

- If the computed checksum is **not equal to** the stored checksum, the data is assumed to be **corrupted**

7. **Misdirected writes** occur when data is written to the wrong location.

8. Which of the following occurs when the upper layer reports that a write has completed but it is not persisted, retaining the old contents of a block?

- Lost Writes

Lost writes occur when the upper layer reports that a write has completed but it is not persisted, retaining the old contents of a block

9. The disk system can lessen the probability of all copies of a data item being **corrupted** by periodically reading over every block and checking **checksums**.

10. While **space overheads** are minor, **time overheads** from check-summing can be significant.
