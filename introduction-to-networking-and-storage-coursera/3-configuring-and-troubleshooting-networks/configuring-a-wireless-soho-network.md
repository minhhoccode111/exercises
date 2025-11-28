# Configuring a Wireless SOHO Network

Welcome to “Configuring a (wireless) SOHO network.”  
After watching this video, you will be able to:

- List the features of a SOHO wireless network
- Describe how to configure a WAP, SSID, security, and encryption
- Explain how to test and troubleshoot a SOHO wireless network

## SOHO Wireless Network Overview

A small office/home office, or SOHO, wireless network is a wireless local area network (WLAN) that serves a small physical space with a small number of employees or home users

A SOHO wireless network can be configured with the help of a central wireless access point (WAP), which can cover a range of wireless devices within a small office or home

SOHO networks often use email, website, and cloud subscription services since maintenance and reliability are included

## Common Broadband Types

Some common broadband types that enable network connection include:

- **Dynamic Host Configuration Protocol (DHCP)**: The most common broadband type, used in cable modem connections
- **PPPoE (Point-to-Point Protocol over Ethernet)**: Used in DSL connections in areas that don’t have newer options
- **Static IP**: More common in business settings

DHCP is the easiest broadband type to use. Internet Service Providers can provide other options if needed

## Wireless Network Security

Wireless networks can be set up to be either open or encrypted:

- **Open Networks**: Popular in public spaces, as they don’t require a password, but are easily exploited
- **Encrypted Networks**: Require a password before users can connect, with WPA2 being the strongest wifi encryption

A **captive portal** is a web page popup that authenticates users trying to log in to wifi, commonly found in apartment houses, hotel rooms, and small business centers. However, it is not a secure connection

## Wireless Router Configuration

On the rear of a typical wireless router, you’ll see several connections:

- A **power input jack**
- One or more **wired Ethernet jacks** for wired connections, including a jack for broadband connection, often labeled **“WAN” or “Internet”**
- A **USB port** for connecting a printer or external hard drive for sharing on the network
- A **wifi on/off button** for easily enabling or disabling a wireless network

### Find the Default IP Address

1. Type “cmd” into the Windows search bar to open the command prompt
2. Type `ipconfig` in the command prompt window to see IP information for your network
3. Copy the Default Gateway IP address, paste it into a web browser, and hit enter
4. A login screen will appear. The default router username and password are usually “Admin.”

Change these during setup to protect the network.  
Whenever a change is made, “Save Settings” must be clicked

If the Web cannot be accessed after setup, the router may not be connected due to the wrong broadband connection type being chosen for your service

## SSID (Service Set Identifier)

An SSID is the name of a wireless network, chosen during setup

- Choose a unique name to distinguish your router from neighboring routers nearby
- Each country determines band usage and available 802.11 modes
  - The supported modes for the 2.4 GHz band are 802.11 (b/g/n)
  - The supported modes for the 5 GHz band are 802.11 (a/n/ac)
- Every router has a default option supporting all types. If unsure, select the default mode

## Wireless Network Encryption

Most wireless network users select one of the common forms of secure encryption:

- **WEP (Wired Equivalent Privacy)**: The first security protocol developed but retired due to security flaws
- **WPA (Wireless Protected Access)**: Stronger than WEP, supports a wide variety of devices
- **WPA2**: The strongest and most common encryption, supported on newer devices

### Configuring Encryption

When configuring your encryption, select **WPA2** security mode.  
Set your **Pre-Shared Key** (WPA password). It must be 8 to 63 characters long. Choose a longer, harder-to-guess key for stronger security

Once the router is configured, your wireless network is ready.  
Users will see it among available wireless networks when they click the wifi icon on PC screens or the drop-down menu on mobile devices

## Testing and Troubleshooting Wireless Network Performance

Test network performance and Internet connectivity on each wireless device in the vicinity of the WAP

### Troubleshooting Performance Issues

If network lags, glitches, or blocked access occur, troubleshoot with the following actions:

- Check the router configuration settings
- Run security tools
- Check for updates
- Restart devices
- Run diagnostics
- Reboot the router or modem
- Check equipment for damage

## Conclusion

In this video, you learned that:

- A SOHO wireless network is configured with a central Wireless Access Point (WAP) to cover all wireless devices within a small office or home
- DHCP is the most common broadband type, over PPPoE and Static IP
- The `ipconfig` tool lists the IP address of a host on a network and the IP address of its assigned default gateway
- SSID is the name of a network and can be changed in the router settings
- WPA2 is the best encryption choice because it is the strongest
