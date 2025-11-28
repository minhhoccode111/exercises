# Protocol Table

After watching this video, you will be able to:

- Explain the difference between TCP and UDP,
- Describe the relationship between ports and protocols,
- List common protocols and their uses

### What is a Network Protocol?

- A network protocol is a set of rules that determine how data is transmitted between devices on the same network
- There are thousands of network protocols, but they generally perform one of three main functions:
  1. Security,
  2. Communication,
  3. Network management

### What is a Port?

- A port is the first and last stop for information sent across a network
- Ports are communication endpoints that work alongside a specific protocol and application
- A network device can have up to 65,536 ports, and default port numbers do not change

### TCP vs. UDP

1. TCP (Transmission Control Protocol):

   - Guarantees that sent data makes it to its intended recipient
   - Slower but more reliable
   - Used in applications like web browsing, email, and file transfer

2. UDP (User Datagram Protocol):
   - Does not guarantee all packets will arrive
   - Faster and requires fewer resources
   - Used in live streaming, online gaming, and calls over the Internet

### Common Network Protocols and Their Ports

#### Web Page Protocols

- HTTP (Hypertext Transfer Protocol):
  - Used for standard internet webpage access
  - Port 80
- HTTPS (Hypertext Transfer Protocol Secure):
  - Used for encrypted webpage access (important for sensitive data)
  - Port 443

#### File Transfer Protocols

- FTP (File Transfer Protocol):
  - Used for file transfers to and from an FTP server
  - Port 21
- SFTP (Secure File Transfer Protocol):
  - Used for encrypted file transfers
  - Port 22

#### Remote Access Protocols

- Telnet:
  - Used for remote device control via console (but insecure because it’s in clear text)
  - Port 23
- SSH (Secure Shell):
  - Used for secure remote control of a device via console with encryption
  - Port 22 (shared with SFTP)
- RDP (Remote Desktop Protocol):
  - Used to remotely control another computer via a graphical interface (GUI)
  - Port 3389

#### Email Protocols

- POP3 (Post Office Protocol version 3):
  - Older protocol that downloads email to a device and then deletes it from the server
  - Port 110
- IMAP4 (Internet Message Access Protocol version 4):
  - Synchronizes emails across multiple devices by storing emails on the server
  - Port 143
- SMTP (Simple Mail Transfer Protocol):
  - Used for sending emails
  - Port 25

#### Network Protocols

- DHCP (Dynamic Host Configuration Protocol):
  - Automatically assigns IP addresses to devices
  - Ports 67 and 68
- DNS (Domain Name System):
  - Translates domain names into IP addresses
  - Port 53
- SMB (Server Message Block):
  - Enables sharing files and printers on the network
  - Ports 137-139
- SNMP (Simple Network Management Protocol):
  - Monitors the network
  - Port 161
- LDAP (Lightweight Directory Access Protocol):
  - Stores and shares authentication data like usernames and passwords over the network
  - Port 389

### Summary

- Ports serve as communication endpoints for network devices, working with protocols to send and receive data
- TCP and UDP are the two primary internet protocols, with TCP offering reliability and UDP offering speed
- Common protocols include HTTP/HTTPS for web pages, FTP/SFTP for file transfers, and Telnet/SSH/RDP for remote access
- POP3, IMAP4, and SMTP manage email, while DHCP, DNS, and SNMP help manage networks
