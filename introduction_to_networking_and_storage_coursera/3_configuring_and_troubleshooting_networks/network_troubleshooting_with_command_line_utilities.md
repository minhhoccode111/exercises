# Network Troubleshooting with Command Line Utilities

Welcome to "Network Troubleshooting with Command Line Utilities."
After watching this video, you will be able to:

- List common network-related command line utilities.
- Explain the function of each utility.
- Describe how to use each one.

## Common Command Line Utilities

1. **ipconfig**
2. **ping**
3. **nslookup**
4. **tracert**
5. **netstat**

### 1. ipconfig

Displays **network adapter** info:

- IP address, subnet mask, default gateway.

If an adapter isn’t configured, it will show **“media disconnected”**.

### 2. ping

Sends **echo requests** to another computer:

- **ping IP** addresses or **domains** to check connectivity.
- If reply is received, the network connection is active.
- **“Request timed out”** means no response or unreachable destination.

### 3. nslookup

Resolves **IP address** of a domain or host:

- Lists the **server and IP** used for the query, and the domain’s IP.
- Useful for resolving **DNS problems**.
- Run on a different DNS server for verification.

### 4. tracert

Traces the **route** a data packet takes to its destination:

- Lists **transfer points**, **locations**, and **time taken** at each step.
- Helps discover where **network issues** occur.

### 5. netstat

Displays network **statistics**:

- Lists connection’s **protocol**, **local/foreign addresses**, and **state**.
- Useful for finding issues with **server ports** (email, file-sharing).

## Conclusion

In this video, you learned that:

- **ipconfig** shows IP, subnet mask, and gateway.
- **ping** checks data transmission between devices.
- **nslookup** resolves IPs for domains.
- **tracert** tracks data packet routes.
- **netstat** shows server port connections.
