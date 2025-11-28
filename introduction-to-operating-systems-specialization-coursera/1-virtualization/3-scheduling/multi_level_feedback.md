# Multi-Level Feedback Queue (MLFQ) Scheduling

After reading this document, you will be able to:

- Understand how the Multi-Level Feedback Queue (MLFQ) scheduling algorithm works,
- Learn how job priority changes over time,
- Explore examples of MLFQ in different scenarios

### Introduction to MLFQ

The Multi-Level Feedback Queue (MLFQ) scheduler is used in modern systems to handle two main goals:

1. Optimize turnaround time by prioritizing shorter jobs
2. Improve responsiveness for interactive jobs by adjusting priorities based on observed behavior

### MLFQ: Basic Rules

- MLFQ uses multiple queues, each with a different priority level
- A job's priority is determined by its behavior, not by fixed parameters

#### Key Rules

- Rule 1: If Priority(A) > Priority(B), then A runs (B does not)
- Rule 2: If Priority(A) = Priority(B), A and B run in Round-Robin

### Priority Adjustment

MLFQ uses feedback to adjust the priority of jobs based on how they use the CPU:

- Rule 3: When a job enters the system, it starts with the highest priority (topmost queue)
- Rule 4a: A job’s priority is lowered if it uses up its entire time slice
- Rule 4b: A job retains its priority if it voluntarily relinquishes the CPU before the time slice expires

### Example 1: A Long-Running Job

- A single long-running job starts in the highest queue but gradually drops in priority after each time slice is exhausted
- Eventually, it remains in the lowest priority queue, running only when no higher-priority jobs are available

### Example 2: A Short Job

- When a short interactive job enters the system, it is placed in the highest queue
- If it finishes quickly, it retains its high priority, simulating Shortest Job First (SJF) behavior for short jobs

### Handling I/O-Bound Jobs

- Rule 4b ensures that jobs that frequently perform I/O (such as interactive jobs) retain their high priority by releasing the CPU early
- This keeps interactive jobs responsive, as they stay in higher-priority queues

### Issues with MLFQ

#### 1. Starvation

- If too many interactive jobs occupy the CPU, long-running jobs may be starved

#### 2. Gaming the Scheduler

- Clever users can manipulate the scheduler by performing I/O operations just before the time slice expires, allowing them to remain in higher queues

### Attempt 2: The Priority Boost

To avoid starvation, MLFQ introduces a priority boost:

- Rule 5: After a set period (S), all jobs are moved back to the highest priority queue

This ensures that even long-running jobs make progress and get a fair share of the CPU

### Attempt 3: Better Accounting

To prevent users from gaming the scheduler, MLFQ can track CPU usage more accurately:

- New Rule 4: A job’s priority is lowered after it consumes its total CPU allotment, regardless of how often it relinquishes the CPU

### Tuning MLFQ

- MLFQ can be customized by adjusting parameters like time slice length and priority boost frequency
- Administrators can modify MLFQ to handle specific workloads better

### Summary

- MLFQ dynamically adjusts job priorities based on observed behavior, making it suitable for a mix of interactive and long-running jobs
- It optimizes for short job turnaround and interactive responsiveness while ensuring long-running jobs make progress

These MLFQ rules are provided here for your convenience:

- Rule 1: If Priority(A) > Priority(B), then A runs
- Rule 2: If Priority(A) = Priority(B), then they are both run using a round-robin policy
- Rule 3: Jobs entering the system are placed in the topmost queue with the highest priority
- Rule 4: If a job takes longer than a specified time (even if it frees up the CPU), it’s priority is downgraded
- Rule 5: Move all jobs to the topmost queue after some time period S

### Lab

Use the mlfq.py simulator to experiment with MLFQ by creating jobs with different CPU and I/O demands. Adjust parameters like time slice and priority boosts to see how different settings affect job performance and scheduling efficiency
