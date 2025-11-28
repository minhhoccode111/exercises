# Translation Lookaside Buffers (TLBs)

### Introduction

- **Paging** as the primary mechanism for virtual memory can result in performance penalties
- Paging requires mapping information for each virtual address, and this information is usually stored in physical memory
- **Challenge**: Each virtual memory reference necessitates an additional memory lookup for translation information, slowing down instruction fetches, loads, and stores
- **Solution**: Use a **Translation Lookaside Buffer (TLB)**, a hardware cache of popular virtual-to-physical address translations, to speed up address translation

### The Role of the TLB

- **TLB**: A hardware cache that stores frequently used virtual-to-physical address mappings, located in the Memory Management Unit (MMU)
- When the CPU generates a virtual memory reference, it first checks the TLB to see if the translation is cached
  - **TLB Hit**: If the translation is found, the physical address is obtained quickly, avoiding the need to access the page table
  - **TLB Miss**: If not found, the page table must be accessed, which involves an additional memory reference, slowing down the process

### Basic TLB Algorithm

1. Extract the **Virtual Page Number (VPN)** from the virtual address:
   - `VPN = (VirtualAddress & VPN_MASK) >> SHIFT`
2. **TLB Lookup**:
   - `(Success, TlbEntry) = TLB_Lookup(VPN)`
   - If `Success == True` (TLB hit):
     1. Check `TlbEntry.ProtectBits` to see if the access is allowed
     2. Compute the **Physical Address (PA)** using the **Page Frame Number (PFN)** from the TLB and the offset from the virtual address:
        - `PhysAddr = (TlbEntry.PFN << SHIFT) | Offset`
     3. Access the memory location at the computed physical address
   - If `Success == False` (TLB miss):
     1. Retrieve the Page Table Entry (PTE) from the page table in memory
     2. Check the validity and access rights of the PTE
     3. Insert the new translation into the TLB
     4. Retry the instruction, resulting in a TLB hit

### Array Access Example with TLB

- Consider an array of 10 integers (each 4 bytes) starting at virtual address `100`
- Suppose we have an 8-bit virtual address space with 16-byte pages:
  - Virtual address is split into:
    - 4-bit **VPN** (16 virtual pages)
    - 4-bit **Offset** (16 bytes per page)
- **Array Breakdown**:
  - First entry (`a[0]`) is at VPN `06` with an offset of `04`
  - Array elements `a[3]` to `a[6]` are on the next page (VPN `07`)
  - Last three entries (`a[7]` to `a[9]`) are on VPN `08`
- **TLB Behavior**:
  - **First Access** (`a[0]`): TLB miss (first access to VPN `06`)
  - **Next Access** (`a[1]` and `a[2]`): TLB hits (same VPN `06`)
  - **Access `a[3]`**: TLB miss (new VPN `07`)
  - **Next Access** (`a[4]` to `a[6]`): TLB hits (same VPN `07`)
  - **Access `a[7]`**: TLB miss (new VPN `08`)
  - **Next Access** (`a[8]` and `a[9]`): TLB hits (same VPN `08`)
- **Result**: For 10 array accesses, we have 3 TLB misses and 7 TLB hits (70% hit rate)

### TLB Miss Handling: Hardware vs. Software

- **Hardware-Managed TLB** (e.g., CISC architectures like Intel x86):

  - Hardware handles the TLB miss, accessing the page table and updating the TLB automatically
  - The hardware must know the exact location and format of the page tables

- **Software-Managed TLB** (e.g., RISC architectures like MIPS and SPARC):
  - Hardware raises a TLB miss exception
  - The OS trap handler looks up the page table, updates the TLB, and retries the instruction

### Inside the TLB

- A TLB entry typically contains:
  - **VPN**: Virtual Page Number
  - **PFN**: Page Frame Number (physical frame)
  - **Valid Bit**: Indicates if the translation is valid
  - **Protection Bits**: Define access permissions (read, write, execute)
  - Additional fields may include:
    - **Dirty Bit**: Indicates if the page has been modified
    - **Reference Bit**: Tracks if the page has been accessed (useful for replacement algorithms)
    - **Address-Space Identification (ASID)**: Distinguishes translations for different processes

### TLB Issue: Context Switching

- When the CPU switches processes, the TLB entries from the previous process are no longer valid
- **Solution 1**: Flush the TLB on context switches
  - This approach is simple but results in frequent TLB misses and performance loss
- **Solution 2**: Use an **Address-Space Identifier (ASID)**
  - Each TLB entry includes an ASID to identify the process
  - Allows TLB entries from different processes to coexist without interference

### Replacement Policy for TLB Entries

- When adding a new TLB entry, an existing entry must be replaced
- **Replacement Strategies**:
  1. **Least Recently Used (LRU)**: Evict the entry that hasn’t been used for the longest time
  2. **Random Replacement**: Evict a randomly selected entry

### Real-World TLB Example: MIPS R4000

- **MIPS R4000 TLB**:

  - 32-bit address space with 4KB pages
  - Uses a software-managed TLB with 32 or 64 entries
  - Each TLB entry contains:
    - **19-bit VPN**: User addresses from half of the address space
    - **24-bit PFN**: Supports up to 64GB of physical memory
    - **Global Bit (G)**: Shared pages between processes
    - **ASID**: Distinguishes address spaces
    - **Dirty Bit**: Indicates modifications
    - **Valid Bit**: Indicates if the entry is valid

- **Software Control**:
  - Instructions like `TLBP`, `TLBR`, `TLBWI`, and `TLBWR` allow the OS to probe, read, write, and replace TLB entries

### Summary

- TLBs are essential for efficient address translation in virtual memory systems
- **TLB Advantages**:
  - Reduce the need to access page tables
  - Improve memory access speed significantly
- **Challenges**:
  - Context switching can cause TLB entries to become invalid
  - TLB misses can slow down the system, but ASIDs and replacement policies can mitigate these issues
- **Future Considerations**:
  - Larger page sizes and virtual-indexed caches can further enhance TLB performance and coverage

TLBs play a crucial role in modern systems, enabling efficient use of paging while maintaining performance

### Questions

1. Fill in the paragraph below to describe the address translation process with a TLB

- The operating system gets a **virtual page number (VPN)** from a process. It then translates it to a **page frame number (PFN)**.
- Instead of going to the **page table** on the disk, the OS can use a **Translation Lookaside Buffer (TLB)** on the MMu.
- There are some helpful bits in the TLB entry that including things like **process ID (PID)**.
- Other helpful bits include whether that memory location is writable, global or valid.

2. Which of the following is true about the different approach to context switching?

- Flushing is the easiest approach to implement (you set all valid bits in the TLB to 0) but it causes a lot of TLB misses which hurt performance
- Tracking the process or address space ID is harder to implement (you have to store and check PID or ASID), but it increases TLB hits which helps performance

3. Complete the paragrap below to describe how the OS handles TLB logistics

- Many systems use a software-driven approach to handling TLB misses called a **trap handler**, which allows flexibility in TLB implemention.
- When a miss occurs and a new entry is added to the TLB, an o ld emtry must be replaced. Which entry is determined by the **replacement policy**.
- One way to pick is by replacing the **least recently used** entry, which leverages locality, but there are certain contexts where replacing a **random** entry performs better.
