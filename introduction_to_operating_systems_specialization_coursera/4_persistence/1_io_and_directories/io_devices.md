# I/O Devices

### Overview

- This section explores how to integrate I/O (Input/Output) into a computer system effectively
- **Key Questions**:
  - What is the best way to integrate I/O into a system?
  - What are the basic mechanisms at work?
  - What can we do to make I/O operations more efficient?

### Introduction

- **Importance of I/O**:

  - I/O allows the system to receive information, process it, and produce an output
  - When we refer to I/O devices, we generally mean components that are not memory and are connected to a computer system

- **Types of I/O Devices**:
  - **Storage Devices**: SSDs, Hard Drives
  - **Graphics Devices**: Graphics Cards
  - **Networking Devices**: Network Adapters
  - **Input Devices**: Mouse, Keyboards
  - **Audio Devices**: Sound Cards

### System Architecture: The Bus

- **What is a Bus?**

  - A bus is a system for transferring data between components inside a computer or between computers
  - The **CPU** is connected to the system’s main memory through a **memory bus**
  - High-performance I/O devices (e.g., graphics cards) are connected through a **general I/O bus** like PCI
  - Slower devices (e.g., disks, mouse, keyboards) connect through peripheral buses like SCSI, SATA, and USB

- **Why a Bus Hierarchy?**
  - **Physics and Cost**:
    - Faster buses need to be shorter due to signal integrity issues
    - Designing multiple high-performance buses is expensive, so only high-performance parts are connected closer to the CPU, while lower-performance parts are further away
    - This hierarchy helps the CPU manage multiple devices effectively

### What is a Peripheral?

- A peripheral is an internal or external device that connects directly to a computer but doesn’t contribute to the computer’s primary function
- Examples include printers, scanners, and external hard drives

### A Canonical Device

- Let’s consider a **canonical device** to understand the machinery needed for efficient device interaction
- A device includes two essential parts:

  1. **Hardware Interface**: Allows the system software to control its operation
  2. **Internal Structure**: The internal implementation that executes the device’s tasks

- **Device Protocol**:

  - The canonical device has three registers:
    1. **Status Register**: Indicates the current status of the device
    2. **Command Register**: Used to send commands to the device
    3. **Data Register**: Used to send and receive data

- **OS Interaction**:

  - The OS communicates with the device using the following protocol:
    - Poll the status register until the device is free
    - Send data to the data register
    - Write a command to the command register
    - Poll the status register until the device completes the command

- **Issue**:
  - This approach is inefficient because it wastes CPU time polling the device for status updates

### Lowering CPU Overhead With Interrupts

- **Interrupts** allow the CPU to perform other tasks while waiting for a device to complete its job
- **How Interrupts Work**:

  - The OS sends a request to the device and puts the calling process to sleep
  - The CPU switches to another task
  - When the device finishes the request, it sends a **hardware interrupt** to notify the CPU
  - The CPU enters the OS’s interrupt handler to wake up the waiting process

- **Advantages**:
  - Computation and I/O can overlap, improving system efficiency
- **When to Use Interrupts**:
  - Use interrupts if the device is slow enough to allow for overlapping
  - Use polling if the device is fast, as handling interrupts may introduce unnecessary overhead
  - If device speed is unpredictable, a hybrid approach can be used

### Moving Data With DMA

- **Direct Memory Access (DMA)** is a technique that offloads the job of transferring data between devices and main memory from the CPU
- **How DMA Works**:

  - The OS tells the DMA engine where and how much data to transfer
  - The DMA engine handles the data transfer independently
  - When the transfer is complete, the DMA engine raises an interrupt to notify the OS

- **Advantages**:
  - The CPU is free to perform other tasks while the DMA engine transfers data, leading to better utilization of CPU resources

### Methods of Device Interaction

- There are two primary ways for a device’s hardware to communicate with the OS:

1. **Explicit I/O Instructions**:

   - The OS uses special I/O instructions to deliver data to specific device registers
   - These instructions are privileged and can only be executed by the OS

2. **Memory-Mapped I/O**:
   - Device registers are treated as memory addresses
   - The OS issues `load` (to read) or `store` (to write) instructions to these addresses
   - The hardware directs the `load/store` to the device instead of main memory

- **Comparison**:
  - Memory-mapped I/O simplifies programming as it doesn’t require special instructions, making it a widely used approach

### The Device Driver

- A **device driver** is a piece of software that encapsulates the device’s interface functionalities
- The OS uses device drivers to abstract hardware details, making the OS neutral for different types of devices

- **Linux File System Software Stack**:

  - The file system or application sends read and write requests to the **generic block layer**, which routes them to the appropriate driver
  - This abstraction layer ensures that the OS doesn’t need to worry about specific disk classes

- **Drawbacks of Device Drivers**:
  - If a device has unique features, these features may not be fully utilized if the driver must present a generic interface to the OS

### Summary

- We’ve explored various methods to integrate I/O devices into an operating system:
  - **Buses** are used to connect the CPU, memory, and devices
  - The **canonical device** model provides a simple interface for device communication
  - **Interrupts** reduce CPU overhead by allowing overlap between computation and I/O
  - **DMA** offloads data transfer tasks, freeing up the CPU
  - **Device drivers** abstract device details, simplifying OS design
- Understanding these concepts is crucial for designing efficient systems that can handle multiple devices effectively

### Questions

1. Which of the following is NOT true of I/O bus hierarchy?

- Peripheral buses are shorter and located close to the CPU.

“Peripheral buses are shorter and located close to the CPU.”

This is not true. Peripheral busses are longer and located farther away from the CPU.

2. There are two essential parts of a canonical device. Which of the following belong within the interface of the canonical device?

- Status Register

- Command Register

- Data Register

The interface lets the system software control its operation. The status, command, and data registers belong to a canonical device’s interface.

3. Match the Canonical Device Register with its description.

**Command Register** - This is used to instruct the device to perform a specific action.
**Data Register** - This is used to send and receive data.
**Status Register** - This is read to check the devices current status.

4. When would it be more efficient to use an interrupt?

Interrupts might be your best bet if **the device is slow enough to allow overlapping** .

Polling may be a better option if the device completes its task quickly.

5. Which of the following allows the CPU use of a dedicated memory controller?

- Direct Memory Access

Using **Direct Memory Access**, the CPU can delegate memory transfer operations to a dedicated controller, freeing it up for other tasks.

6. Fill in the blanks to complete the statements below.

- Explicit I/O - Contains instructions that describe how the OS delivers data to specific device registers.
- Memory-mapped I/O - Device registers are accessible in the same way as if they were memory addresses.

7. Which of the following is a piece of software that encapsulates the functionalities of a device’s interface?

- Device Driver

A device interface’s functionality is contained within the device driver.
