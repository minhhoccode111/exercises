# Flash-Based Solid State Drives (SSDs)

### Overview

- This section explores the architecture and operation of **flash-based solid-state drives (SSDs)**
- SSDs are a modern alternative to hard disk drives (HDDs), offering superior performance for random I/O and reduced latency

**Key Questions**:

- How does flash-based storage differ from traditional hard disk drives?
- What are the basic operations and characteristics of flash memory?
- How do SSDs manage wear and tear and optimize performance?

### Introduction

- **SSDs vs. HDDs**:

  - Unlike HDDs, which use magnetic storage and mechanical movements, SSDs are entirely electronic, built using **flash memory**
  - Flash memory retains data even when power is lost, making SSDs suitable for long-term storage
  - The absence of mechanical parts results in faster access times and greater reliability

- **Flash Memory Properties**:
  - Flash memory has certain unique properties:
    1. **Erasing Before Writing**: To write to a flash page, you must first erase a larger block containing that page
    2. **Wear-out**: Writing to a page repeatedly will eventually wear it out
  - These characteristics pose challenges for building robust and efficient SSDs

### Flash Memory Structure

- **Bits, Banks, and Planes**:

  - Flash memory cells store one or more binary values, represented by different levels of charge
  - A **Single-Level Cell (SLC)** stores 1 bit per cell, while a **Triple-Level Cell (TLC)** stores 3 bits per cell
  - SLC flash is faster and more reliable but more expensive compared to TLC flash

- **Flash Organization**:
  - Flash memory is organized into **banks** or **planes**, which contain **blocks** (also called erase blocks)
  - Each block is further divided into **pages** (e.g., 4 KB pages)
  - Understanding the distinction between blocks and pages is crucial because writing to a page requires first erasing the entire block

### Basic Flash Operations

1. **Read**:

   - The read command retrieves a page from flash memory
   - Flash reads are state-independent and generally very fast, taking tens of microseconds or less

2. **Erase**:

   - To modify a page, the entire block containing that page must first be erased
   - The erase operation resets all pages in the block, making them programmable again
   - Erase operations are much slower than read operations, taking several milliseconds to complete

3. **Program**:
   - The program command converts 1s to 0s and writes the desired content to a page
   - Programming is faster than erasing but slower than reading

- **State Transitions**:
  - Pages in a block begin as **INVALID**
  - After being erased, their state changes to **VALID** and they can be read or written to
  - Once programmed, pages can only be modified by erasing the entire block again

### Performance and Reliability

- **Flash Performance**:

  - Flash chips have excellent read latencies, but program and erase latencies increase with higher bit densities (e.g., SLC vs. MLC vs. TLC)
  - SSDs improve performance by employing multiple flash chips in parallel

- **Flash Reliability**:

  - Flash memory is prone to wear-out due to repeated erase/program cycles
  - Manufacturers rate MLC-based blocks for around 10,000 program/erase cycles and SLC-based blocks for around 100,000 cycles

- **Disturbances**:
  - Reading or programming a page can disturb adjacent pages, causing bit flips known as **read disturbs** or **program disturbs**

### Building an SSD: Flash Translation Layer (FTL)

- **Flash Translation Layer (FTL)**:

  - The FTL abstracts the raw flash memory by providing a standard block-based read/write interface
  - It maps logical block addresses (used by the file system) to physical flash locations and handles read, erase, and program commands

- **Mapping and Caching**:

  - FTL maintains mapping tables in memory, allowing it to quickly locate physical blocks corresponding to logical block addresses

- **Write Amplification**:
  - Write amplification occurs when the amount of data written to flash exceeds the original data due to garbage collection and other internal processes
  - A well-designed FTL minimizes write amplification, reducing wear and improving SSD longevity

### Log-Structured FTL

- **Log-Structured Technique**:

  - Instead of updating pages in place, a log-structured FTL appends writes to free pages
  - This technique avoids costly erase operations but creates garbage (old versions of data), necessitating **garbage collection**

- **Garbage Collection**:
  - The garbage collector consolidates valid pages and erases blocks with a high percentage of invalid pages
  - This process frees up space but can incur significant overhead if not managed properly

### Mapping Techniques

1. **Page-Level Mapping**:

   - Maps each logical page to a physical page
   - Provides high flexibility but requires a large in-memory mapping table

2. **Block-Level Mapping**:

   - Maps logical blocks to physical blocks
   - Reduces memory overhead but leads to performance issues when writing small amounts of data

3. **Hybrid Mapping**:
   - Combines page-level and block-level mappings
   - Uses page-level mappings for a few log blocks and block-level mappings for the rest
   - Reduces memory overhead while maintaining good performance

### Wear Leveling

- **Wear Leveling**:
  - The FTL must distribute writes evenly across the SSD to prevent some blocks from wearing out prematurely
  - Garbage collection and wear leveling work together to extend the SSD’s lifespan

### SSD Performance and Cost

- **Performance**:

  - SSDs provide superior random I/O performance compared to HDDs, with much lower access latencies
  - The performance gap between sequential and random I/O is smaller for SSDs, but still important for file system design

- **Cost**:
  - SSDs are significantly more expensive per gigabyte compared to HDDs
  - SSDs are often used for “hot” data (frequently accessed) due to their performance, while HDDs are used for “cold” data (infrequently accessed)

### Summary

- **Flash-Based SSDs**:
  - SSDs provide high performance by leveraging parallelism and sophisticated mapping techniques
  - The Flash Translation Layer (FTL) handles logical-to-physical mapping and optimizes read, write, and erase operations
  - Wear leveling and garbage collection are crucial for managing flash memory’s limited lifespan

Understanding these fundamental concepts is essential for designing efficient SSDs and optimizing their use in storage systems

### Questions

1. Solid-state drives are made entirely of transistors. This allows them to preserve data even when power is lost.

2. Flash chips cells are grouped into large **banks** or **planes**.

3. In order to alter the contents programmed to a page, you must **delete the entire block the page is within**.

4. When using flash chips, **reading** to pages is fairly straightforward. On the other hand, **writing** is more complex because entire blocks must be erased before a single page can be programmed.

5. The most expensive cost for raw flash chips comes from **erasing**.

6. Flash Translation Layer functions to **convert** client reads and writes into the internal flash operations read, erase, and program.

7. A direct mapped FTL, is unreliable and slow due to **having to read, erase, and program for every logical write**.

8. FTL uses an **in-memory mapping table** to store the logical to physical location pair.

9. Block-level mapping cuts down the amount of **address translations**.

10. Hybrid mapping presents two mapping tables:

- a log-table, and
- a data table

11. The FTL can cut costs by holding a **working set** of translations in-memory.

12. Wear leveling is the act of **spreading erase/program cycles across all flash blocks**.
