# Models, Standards, Protocols, and Ports

After watching this video, you will be able to:

- Explain networking models and standards,
- List the role of each protocol type,
- Define common ports

### Networking Models

- A networking model describes the architecture, components, and design used for communication between source and destination systems
- Data packets follow the protocols set by these network models

There are two main types of networking models:

1. OSI (Open Systems Interconnection) Model:

   - A conceptual framework used to describe the functions of a networking system
   - It has 7 layers:
     1. Application: Direct interaction between users and software applications
     2. Presentation: Ensures data is in a usable format and handles encryption
     3. Session: Manages information flow between computers (authentication, reconnections)
     4. Transport: Manages data delivery and error checking (often uses TCP)
     5. Network: Interprets addresses and directs the data path
     6. Data Link: Defines the data format on the network and corrects errors
     7. Physical: Transmits raw data over physical media

2. TCP/IP (Transmission Control Protocol/Internet Protocol) Model:
   - A set of standards that allow computers to communicate over a network
   - Based on the OSI model, but organized into fewer layers

### Network Standards

- Network standards define the rules for data communication to ensure interoperability across different technologies
- Two types of standards:

  1. De-jure (Formal Standards): Developed by official bodies (e.g., HTTP, IP, Ethernet 802.3)
  2. De-facto Standards: Adopted through market practice (e.g., Microsoft Windows, QWERTY keyboard)

- Standards ensure compatibility across vendors and industries, established by organizations like:
  - ISO: Developed the OSI model
  - ITU: Standardized international telecom and radio frequencies
  - DARPA: Established the TCP/IP protocol suite
  - IEEE: Created the IEEE 802 standards
  - W3C: Set the standard for the World Wide Web
  - IETF: Maintains the TCP/IP protocol suite and the RFC standard

### Network Protocols

- Network protocols are rules that dictate how data is transmitted between devices in a network
- There are thousands of protocols, performing one of three main tasks:

  1. Security,
  2. Communication,
  3. Network management

- Common protocols include:

  - TCP (Transmission Control Protocol): Guarantees data delivery, often used for web browsing, emails, and file transfer. It's slower but reliable
  - UDP (User Datagram Protocol): Faster but doesn't guarantee data delivery. Used for live streaming, gaming, and VoIP

- The TCP/IP suite is a collection of protocols providing a complete networking solution

### Ports

- A port is a communication endpoint used for sending and receiving information across a network
- Each port is associated with a specific protocol and application
- Network devices can have up to 65,536 ports

- Socket: A two-way communication channel consisting of:
  - A source IP address,
  - A protocol,
  - A port number,
  - A destination IP address

### Summary

- Network models (OSI and TCP/IP) describe how data is structured and transmitted across networks
- Network standards ensure compatibility across devices and technologies
- Network protocols establish rules for data transmission, with TCP and UDP being two core protocols for Internet communication
- Ports and sockets facilitate communication between network devices, ensuring data reaches the correct destination
