# Packets, IP Addressing, DNS, DHCP, and NAT

After watching this video, you will be able to:

- Explain what packets and IP addresses are and how they relate to networking,
- Explain the importance of DNS, DHCP servers, and the NAT process

### Packets

- Everything you do on the Internet involves packets
- Packets (also called frames, blocks, cells, or segments) are units of data transmission
- Data (such as emails or web pages) is broken down into packets, which travel independently over the network and are reassembled at their destination

### Transmission Modes

There are three data transmission modes:

1. Simplex: Unidirectional communication (e.g., radio, keyboard)
2. Half-duplex: Both stations can transmit and receive, but not simultaneously (e.g., walkie-talkie)
3. Full-duplex: Both stations can transmit and receive at the same time (e.g., phone, messaging apps)

### Transmission Types for IP Packets

1. Unicast: Transmission to a single, specific destination (used for most internet traffic)
2. Anycast: Transmission to the closest of multiple nodes with the same unicast address
3. Multicast: Transmission to all nodes subscribed to the destination multicast group (uses UDP protocol)
4. Broadcast: Transmission to all nodes on the subnet (limited to IPv4 and UDP)

### Internet Protocol (IP)

- IPv4: A core protocol developed to identify network devices, using 32-bit addresses. It can support around 4.3 billion IP addresses
- IPv6: The newer protocol with a 128-bit address space, allowing over 340 undecillion IP addresses. IPv6 provides more security and greater efficiency than IPv4

### IP Address Types

- Static IP addresses: Manually assigned, typically for network servers or devices with specific protocols
- Dynamic IP addresses: Automatically assigned and change with each network connection
- Public IP addresses: Used for communication outside of the local network (connected to the internet)
- Private IP addresses: Used for communication within a private network (not connected to the internet)
- Loopback IP address: Used for local device communication
- Reserved IP addresses: Reserved by IETF and IANA for specific purposes

### DNS (Domain Name System)

- DNS is the phonebook of the Internet. It translates human-friendly URLs (like <www.google.com>) into machine-readable IP addresses
- When a URL is entered, the browser sends the request to a DNS server, which returns the correct IP address, allowing the browser to connect to the website

### DHCP (Dynamic Host Configuration Protocol)

- DHCP automates the configuration of IP network devices by assigning IP addresses from a reserved pool
- DHCP has different allocation types:
  - Static: Assigns a manually designated permanent IP address
  - Dynamic: Assigns a different IP address every time the device connects
  - Automatic: Automatically assigns a permanent IP address

### Subnetting

- Subnetting divides a large network into smaller subnetworks, making network routing more efficient
- A subnet mask helps identify the boundary between the IP network and host, and routers use it to direct packets

### APIPA (Automatic Private IP Addressing)

- APIPA allows computers to self-configure an IP address when the DHCP server is unreachable, allowing local network access but not internet access

### NAT (Network Address Translation)

- NAT maps multiple private IP addresses to a public one before transferring information. It is used to conserve public IP addresses and improve security
- NAT allows devices in a local network to connect to the internet without revealing their private IP addresses

### MAC Addresses

- MAC Address: The physical address of a device, consisting of six sets of two characters (e.g., 00:14:22:01:23:45)
- Types of MAC addresses:
  - UAA (Universally Administered Address): Assigned by the manufacturer
  - LAA (Locally Administered Address): Assigned by software or network administrators, overriding the device’s original MAC address

### Summary

- Data packets travel across networks in any order and are reassembled upon receipt
- The three types of data transmission modes are simplex, half-duplex, and full-duplex
- IPv4 and IPv6 are core internet protocols, with IPv6 offering improved efficiency and security
- Different IP address types serve different purposes for communication and security
- Subnetting optimizes network traffic, while NAT enables multiple devices to share a single public IP address
