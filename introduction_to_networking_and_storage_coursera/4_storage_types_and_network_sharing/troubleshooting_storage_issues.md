# Troubleshooting Storage Issues

### Key Learning Objectives

- Describe common causes of storage failures
- Explain the troubleshooting steps for various storage types
- Investigate and resolve slow performance

### Common Causes of Disk Failure

- **Disk failure or hard drive failure** can be caused by:
  - Wear and tear over time
  - Faulty manufacturing
  - Power loss (especially when the disk is reading or writing)

### Symptoms of Disk Failure

- **Read/Write Failure**: Error message when opening or saving a file
- **Blue Screen of Death (BSoD)**: System STOP error caused by a severe read/write failure
- **Bad Sectors Error**: Indicates part of a disk is unreliable and needs to be fixed
- **Constant LED Activity (Disk Thrashing)**: May indicate insufficient RAM, causing data to move back and forth between RAM and the hard disk
- **Clicking or Grinding Noise**: Sign of a problem; replace the disk to avoid data loss

### Disk Monitoring and Troubleshooting Tools

- **chkdsk Tool**: Monitors and troubleshoots disk health
- **SMART Program** (Self-Monitoring, Analysis, and Reporting Technology): Can be set to send an alert when a disk is unreliable
  - **Check Disk Tools**:
    - **chkdsk /r**: Locates bad sectors each time it is run
    - **chkdsk /f**: Fixes file system errors (does not find bad sectors)
- **Additional Diagnostic Programs**: Available from software and hardware vendors, or may come prepackaged with certain systems

### Boot Failure Troubleshooting

- When a computer fails to boot:
  - **Check for Lights and Sounds** associated with power up
    - If none, check if the device is plugged in
  - If the device powers up but still does not boot:
    - **Check Drive Configuration**:
      - Ensure firmware system setup has the correct boot sequence
      - No removable disks are present
      - Data cables are connected correctly and free from damage
      - Motherboard port is not disabled by system setup
  - If the drive configuration is fine, it may be a filesystem error:
    - Use the Windows setup disc to boot into the recovery environment
    - Enter “C:” in the command prompt
    - If it says, “Invalid media type”, try the bootrec tool or reformat the disk (erases all data)
    - If it says, “Invalid drive specification”, check the partition structure with diskpart

### Boot Error Causes and Resolutions

- **Boot Errors**: Caused by disk corruption, incorrect OS installation, or viruses
  - **Resolve Boot Errors**:
    - Use antivirus software’s boot disk option to detect potential viruses
    - Use antivirus software’s recovery disk option, if available
    - If the problem persists, boot with the original product disk and choose Repair
      - **Try Startup Repair First**
      - Use the command prompt to:
        - Fix MBR
        - Fix boot sector
        - Correct missing installations in the Boot Configuration Database
      - Restart the computer

### File Recovery

- For computers that won’t boot, recover files by:
  - Removing the hard drive and connecting it to another computer
  - Using external enclosure kits to secure the removed drive and connect via USB cable
  - If possible, inspect and recover the drive’s files via Windows Disk Management
  - Use chkdsk to restore fragments of corrupted files, but third-party file recovery software may work better

### Disk Performance Troubleshooting

- Disk performance can slow due to:
  - Older disks
  - Disk being too full
  - Files not optimized for fast access
  - **Improve Performance**:
    - Defragment the drive for faster file access
    - Add RAM
    - Upgrade to a solid state drive or hybrid drive
    - Remove files and applications, or add additional drive space

### Optical Drives Troubleshooting

- **Optical Drives**: Laser-based, do not physically touch disks
  - **Useful Optical Drive Tips**:
    - Cleaning kits can often resolve common read/write errors
    - CD-ROM drives cannot read DVD-ROM disks
    - Third-party software is available for DVD and Blu-Ray disk support
    - Writable disks have recommended write speeds that affect quality and vary depending on the brand
    - When the OS is too slow for the optical drive’s write process (buffer underrun), errors occur
      - **To Fix**:
        - Use the latest CD and DVD writers
        - Burn at a lower write speed
        - Close all other applications when burning, or copy data to the hard drive instead of to disk

### RAID Troubleshooting Steps

- If a RAID array is not detected at setup or boot:
  - Ensure RAID controller drivers are installed and verify status
- If the configuration tool is unavailable:
  - The controller may have failed
- If a RAID disk fails:
  - You will get an alert
  - If the RAID array supports redundant drives and hot swapping:
    - Insert a new drive
    - Rebuild the array with the configuration tool
  - **Performance is impacted during RAID array rebuilding**, as it commonly involves large data transfers
  - Take care to only remove the failed disk
    - Removing a healthy disk can also cause a RAID array to fail
- **If too many disks fail**:
  - Use backup and recovery solutions
  - **A non-redundant RAID failure** (like RAID 0) means both disk and data are lost
  - If the controller fails:
    - Install a new controller or import the disks into another system

### Summary

- Disk failure is caused by faulty manufacturing, wear and tear over time, or power loss
- Disk integrity is checked with chkdsk and SMART
- In boot failure, first, check for power up (lights and sounds), then drive configuration
- Space, RAM, or new drives improve performance
- Fast write speeds cause optical drive errors
- Rebuilding a RAID array slows performance
- Removing a healthy disk can cause RAID failure
