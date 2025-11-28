# CPU Scheduling

After reading this document, you will be able to:

- Understand the basic CPU scheduling policies,
- Explore key scheduling assumptions and metrics,
- Learn different CPU scheduling algorithms and their trade-offs

### Introduction to CPU Scheduling

- CPU scheduling is crucial for managing processes within an operating system. The goal is to determine which process should be run at any given time to optimize performance
- Early scheduling approaches were drawn from operations management, and the focus is often on efficiency

### Key Assumptions in Scheduling

Before exploring policies, the following assumptions about workloads (or jobs) are made:

1. All jobs run for the same amount of time
2. All jobs arrive at the same time
3. Once started, jobs run to completion
4. All jobs only use the CPU (no I/O)
5. The run-time of each job is known

These assumptions are initially unrealistic but are used to simplify the explanation of scheduling

### Scheduling Metrics

The main metric of interest is turnaround time:

\[
T{\text{turnaround}} = T{\text{completion}} - T\_{\text{arrival}}
\]

Turnaround time measures how long a job takes to complete from the time it arrives in the system

### FIFO (First In, First Out) Scheduling

- FIFO is the simplest scheduling policy: the first job to arrive runs first
- Example: If jobs A, B, and C each run for 10 seconds, they are executed in the order they arrive. A finishes at 10 seconds, B at 20, and C at 30, giving an average turnaround time of 20 seconds

Problem: Convoy effect occurs when long jobs delay shorter ones, leading to inefficient scheduling

### SJF (Shortest Job First)

- SJF solves the convoy effect by always running the shortest job first
- Example: If job A takes 100 seconds and jobs B and C take 10 seconds each, SJF runs B and C before A, reducing the average turnaround time from 110 seconds (FIFO) to 50 seconds

Problem: SJF is non-preemptive, meaning once a job starts, it cannot be interrupted, which can lead to delays for newly arrived short jobs

### STCF (Shortest Time-to-Completion First)

- STCF, or Preemptive SJF, allows preemption. When a shorter job arrives, the scheduler interrupts the current job to run the shorter one
- Example: If jobs B and C arrive after job A starts, STCF preempts A to finish B and C first, reducing the average turnaround time to 50 seconds

### Response Time Metric

- Response time measures how quickly a job is scheduled after arriving:

\[
T{\text{response}} = T{\text{firstrun}} - T\_{\text{arrival}}
\]

- STCF is good for turnaround time but poor for response time, especially for interactive systems

### Round Robin (RR) Scheduling

- RR addresses the response time issue by running jobs for a small time slice before switching to the next job in the queue
- Example: If jobs A, B, and C run for 5 seconds each, RR cycles between them, improving response time but worsening turnaround time
- Trade-off: Shorter time slices improve response time, but too short a time slice leads to inefficiencies due to frequent context switching

### Incorporating I/O

- In real systems, jobs perform I/O operations. When a job is waiting for I/O, the CPU can run another job to maximize utilization
- By treating CPU bursts as separate jobs, the scheduler can run CPU-intensive jobs while I/O-bound jobs wait

### Summary

- SJF and STCF optimize turnaround time but suffer from poor response time
- RR optimizes response time but performs poorly for turnaround time
- Scheduling is about balancing trade-offs between performance metrics like turnaround time and response time
