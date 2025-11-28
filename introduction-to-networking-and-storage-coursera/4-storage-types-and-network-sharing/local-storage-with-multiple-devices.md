# Local Storage with Multiple Drives

Welcome to “Local Storage with Multiple Drives.”
After watching this video, you will be able to:

- List the differences between SSHDs and Hybrid Disk Arrays
- Define ephemeral storage
- Explain how RAID works

## Hybrid Disk Arrays

Hybrid Disk Arrays combine multiple SSD and HDD devices into an array that offers:

- The speed of solid-state drives
- The cost-effectiveness and higher capacity of hard disk drives

Key Features:

- Small and fast
- Lower setup costs than pure SSDs
- Complex to manage and maintain
- Some performance concerns

Best For: When you need both speed and high capacity

## Direct-Attached Storage (DAS)

DAS is one or more storage units within an external enclosure, directly connected to a computer. It can contain:

- Hard drives,
- Solid-state drives,
- Optical disc drives

Best For: Small to medium networks with moderately high storage needs

External Drives: Portable DAS that connect via USB

## Ephemeral vs Persistent Storage

Ephemeral Storage:

- Deletes saved data on restart
- Used for application demos or OS restarts in computer labs

Persistent Storage:

- Keeps saved data on restart
- Used in personal computers and network archives
- Most storage drives are configured for persistent storage

## RAID (Redundant Array of Independent Disks)

RAID spreads data across multiple drives for better performance and fault tolerance

### RAID Levels

RAID 0 (Striping):

- Splits data into blocks and stores across two or more drives
- 100% usable capacity, very fast, but not fault tolerant
- If one drive fails, all data is lost
- Popular with gamers and photographers

RAID 1 (Mirroring):

- Copies and stores data across two drives
- 50% usable capacity, but fault tolerant
- If one drive fails, no data is lost

RAID 10:

- Combines RAID 0 and RAID 1
- Fast and fault tolerant, but if three drives fail, all data is lost

RAID 5 (Striping with Parity):

- Most common RAID type
- Stores data across three or more drives with parity bits for error checking
- Fast and fault tolerant
- If one drive fails, no data is lost

RAID Benefits:

- Can use SSDs, HDDs, and hybrid drives
- Provides durability and performance
- Rare multiple drive failures, but backup routines are essential to prevent data loss

## Conclusion

In this video, you learned that:

- Hybrid Disk Arrays combine SSDs and HDDs for speed, high capacity, and low cost
- DAS are external storage drives directly attached to a computer for additional storage
- Ephemeral storage deletes data on restart, while persistent storage retains it
- RAID uses multiple drives to enhance performance and prevent data loss
