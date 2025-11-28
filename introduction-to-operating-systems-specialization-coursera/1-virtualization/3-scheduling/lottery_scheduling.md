**Lottery Scheduling and Completely Fair Scheduler (CFS)**

### Overview

- This section covers sharing CPU proportionally using a **proportional-share scheduler** (or fair-share scheduler).
- **Key Questions**:
  - How can we build a scheduler to share the CPU proportionally?
  - What are the key mechanisms we should use?
  - How effective are they?

### Proportional-Share Scheduler

- **Proportional-Share Scheduler**: Instead of optimizing for turnaround or response time, seeks to guarantee each job gets a certain percentage of CPU time.
- The idea is to hold a **lottery** periodically to decide which process should run next.
- Processes that should run more often have more chances (tickets) to win.

### Tickets Represent Share

- **Tickets** represent the share of a resource a process should receive.
- A process’s percentage of tickets represents its share of a system resource.
  - Example:
    - Two processes, A and B.
    - If A has 75 tickets and B has 25 tickets, A should get 75% of the CPU time.
- The scheduler picks a **winning ticket** from 0 to the total number of tickets and determines which process runs based on the winner.

### Ticket Mechanisms

1. **Ticket Currency**:

   - Users can allocate tickets among their own jobs in any currency they like, and the system converts this currency into a global value.

2. **Ticket Transfer**:

   - A process can temporarily hand off its tickets to another process (useful in client/server scenarios).

3. **Ticket Inflation**:
   - A process can temporarily increase or decrease the number of tickets it holds.

### Implementation of Lottery Scheduling

- To implement lottery scheduling, you need:

  - A strong random number generator.
  - A data structure to track the system’s processes (like a list).
  - The total number of tickets.

- **Process**:
  - Pick a random number (the winner) from the total number of tickets.
  - Traverse the list of processes using a counter.
  - When the counter exceeds the value of the winning ticket, the current process is chosen.

### Example of Lottery Scheduling

- Consider two jobs, A and B, with 75 and 25 tickets respectively.
- The randomness in lottery scheduling results in probability correctness but not certainty.

### Completely Fair Scheduler (CFS)

- **CFS** implements fair-share scheduling in an efficient and scalable way.
- Uses **virtual runtime (vruntime)** to track the fairness of scheduling decisions.
- When a scheduling decision is made, CFS picks the process with the lowest vruntime to run next.

### CFS Mechanisms

1. **sched_latency**:

   - Used to determine how long a process should run before switching.

2. **min_granularity**:

   - Ensures that a process’s time slice does not fall below a minimum value, reducing excessive scheduling overhead.

3. **Weighting (Niceness)**:

   - Using the UNIX `nice` level, users or administrators can prioritize processes by giving them a larger share of the CPU.

4. **Red-Black Trees**:
   - CFS stores processes in a red-black tree to maintain efficiency and logarithmic operations.

### Handling I/O and Sleeping Processes

- CFS adjusts a job’s vruntime when it wakes up to avoid starvation, but it may not get its fair portion of CPU time if it sleeps frequently.

### Summary

- Introduced proportional-share scheduling methods:
  - **Lottery Scheduling** uses randomness to achieve proportional sharing.
  - **Completely Fair Scheduler (CFS)** attempts to share CPU fairly using dynamic time slices.
- No scheduler is perfect; some general-purpose schedulers like MLFQ or comparable Linux schedulers may solve specific concerns automatically.

### Lab Exercise

1. Simulate and compute solutions for different scenarios using `lottery.py`.
2. Modify the number of jobs and tickets to explore the behavior of the lottery scheduler.
3. Evaluate the fairness of the scheduler with various configurations and seeds.
