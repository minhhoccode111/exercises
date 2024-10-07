# Configuring a Wired SOHO Network

Welcome to “Configuring a Wired SOHO Network.”  
After watching this video, you will be able to:

- Describe the features of a SOHO network
- List the requirements for setting up a SOHO network
- Explain how to configure, test, and troubleshoot a SOHO network

## SOHO Network Overview

A small office/home office, or SOHO, network is a local area network (LAN) with fewer than 10 computers that serves a small physical space with a small number of employees or home users.  
It can be a wired Ethernet LAN or a LAN made of both wired and wireless devices

A typical wired SOHO network includes:

- A router with a software-based firewall
- A switch with 4 to 8 Ethernet LAN ports
- A printer
- Several desktops or laptops

SOHO networks often use email, website, and cloud subscription services since maintenance and reliability are included.  
Internet is provided via cable, DSL, or ISDN.  
Basic equipment maintenance is easy since there are only a handful of devices and cables to consider

## Requirements for Setting Up a SOHO Network

When setting up a SOHO network, knowing the compatibility requirements is very important.  
The hardware, software, adapter cards, and cables all need to be compatible for the network to function properly

Before setting up any SOHO network, review and confirm everything in your plan to ensure a successful installation

### Hardware Setup

SOHO networks need a switch to act as the hub of the network.  
If Internet is desired, a router can be added or used instead.  
SOHO routers often have other integrated features, like a cable or DSL modem, switch ports, and a built-in firewall

- **Modem**: Provides an Internet connection
- **Ethernet Cables**: Provide a wired connection. Category 5, 5E, and 6 cables are the current standard
- **Router**: Automatically assigns IP addresses to each device on the network, necessary for sharing the Internet connection with all connected devices
- **Switch**: Typically allows 4 to 8 connected devices to communicate but does not assign IP addresses or provide Internet access. Best used to expand the number of LAN ports

## Steps to Set Up a Wired SOHO Network

1. **Plug the switch or router into a power source.**
2. **Connect the switch to the router** (if necessary)
   - Plug one end of an Ethernet cable into any LAN port on the router and the other into any LAN port on the switch. This expands the network to the rest of the LAN ports on the switch
3. **Connect your modem to your router** (if necessary)
   - If you're sharing an Internet connection from a modem, connect the modem to the WAN/INTERNET port on the router. This port is usually a different color from the other ports
4. **Connect your computers to open LAN ports.**
   - Use Ethernet cables to connect each computer to any open LAN port on your router or switch. Keep devices close to the router or switch since Ethernet doesn’t transfer data reliably over long distances (100 meters maximum)

## Router Configuration

### Log in to router settings

1. **Enter `ipconfig` into a command prompt window to find your router’s public IP address.**
   - It will be listed next to “default gateway.”
2. **Enter the IP address into a browser and log in.**

### Update user name and password

- All routers have default administrator user names and passwords. Anyone with access can change the admin password or other settings and even lock you out
- To improve security, always change the default user name and password

### Update firmware

- Updating router firmware solves operational problems and enhances security
- Check the manufacturer website for available firmware updates
- Download and install if your firmware is not up to date

As you configure, remember that the model number, revision number, and login defaults are printed on the router or its manual, and that the local or private IP address of any router is usually set to 192.168.1.1

## Network Security

The security of a wired SOHO network primarily depends on a firewall since all data packets in a wired network travel through secure Ethernet cables.  
Most broadband routers have a built-in firewall, and additional software firewalls can be installed on individual machines

- Servers and hardware have built-in Dynamic Host Configuration Protocol (DHCP) and Network Address Translation (NAT) actions
- DHCP servers use IP addresses to provide network hosts, while NAT maps a public IPv4 address to private IP addresses
- SOHO network administrators don’t have to configure firewall or server settings unless more than a basic setup is required

### User Account Setup

User account setup is included in most operating systems. Apple or Linux setup steps will vary.  
In Windows, open the Control Panel and select **User Accounts**.  
Configure your account and settings.  
Add or configure other users by selecting **Manage another account**.  
If you wish to add and configure local users and groups, search and select **Computer Management**, then select **Local Users and Groups**

In Windows 10 or higher, **Device Manager** allows you to add devices to a network, set default printers, and more

If the network firewall uses MAC filtering, be sure to modify the whitelist for each authorized client

## Network Performance

Network performance depends on:

- Internet strength
- Cable specification
- Installation quality
- Connected devices
- Network and software settings

### Troubleshooting Performance

To troubleshoot performance:

- Run security tools
- Check for updates
- Restart devices
- Run diagnostics
- Reboot the router or modem
- Check equipment for damage

## Conclusion

In this video, you learned that:

- Wired SOHO networks have a router, switch, printer, and connected devices
- Compatibility requirements are very important
- Physical setup includes connecting the router to the modem, and a device to the router
- `ipconfig` shows your router’s public IP address
- Router settings are configured from a browser
- Groups and users are configured through the Control Panel and Computer Management Tools
