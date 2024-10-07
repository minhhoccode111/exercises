/*
Objective: in this lab, our goal is to implement the MLFQ scheduling algorithm
with at least 3 queues, each having a different time quantum. Processes should
be moved between queues based on their behavior and estimation of CPU duration
The Multi-Level Feedback Queue (MLFQ) scheduling algorithm is a complex CPU
scheduling algorithm designed to optimize turnaround time, response time, and
CPU utilization. It utilizes multiple queues with different priority levels,
adjusting the priority of processes based on their behavior and requirements How
MLFQ Works:
1. Multiple Queues: MLFQ involves multiple queues with different priority
levels. A higher-priority queue has a shorter time quantum, and a lower-priority
queue has a longer time quantum
2. Adjusting Priorities: Processes start in the highest-priority queue. If a
process uses up its time quantum without completing, it is moved to a
lower-priority queue. If a process yields the CPU before its time quantum is up,
it stays in the same queue
3. Boosting: To prevent starvation, there is a mechanism to periodically boost
the priority of processes in lower-priority queues

Rules of MLFQ
- If Priority(A) > Priority(B), A runs (B doesn’t).
- If Priority(A) = Priority(B), A & B run in round robin fashion using the
- time quantum of the given queue. When a job enters the system, it is placed at
- the highest priority (the topmost queue). Once a job uses up its time
allotment
- at a given level (regardless of how many times it has been given CPU time),
its
- priority is reduced (i.e., it moves down one queue). After some time period, S
, move all the jobs in the system to the topmost queue.
*/

// 1. Include necessary libraries
#include <stdio.h>
#include <stdlib.h>

// 2. Define the process and queue structures
// Process: represents a process with attributes like: id, duration,
// remaining_time, waiting_time, and turnaround_time
typedef struct {
  int id;
  int duration;
  int remaining_time;
  int wait_t;
  int turnaround_t;
} Process;
// Queue: represents a queue that holds processes. It has attributes like
// processes (an array of pointers to Process), front, rear, and time_quantum
typedef struct {
  Process *processes[100];
  int front, rear;
  int time_quantum;
} Queue;

// 3. Initialize the queue
// we need a function to initialize our queue. This function sets the front and
// rear pointers to -1 (indicating an empty queue) and sets the time quantum for
// the queue
void initializeQueue(Queue *q, int time_quantum) {
  q->front = q->rear = -1;
  q->time_quantum = time_quantum;
}

// 4. Implement queue operations
// we also need functions t add (enqueue) and remove (dequeue) processes from
// the queue
void enqueue(Queue *q, Process *p) {
  if (q->rear == 99) {
    printf("Queue is full!\n");
    return;
  }

  q->processes[++q->rear] = p;
  if (q->front == -1) {
    q->front = 0;
  }
  printf("Process %d enqueued in queue with time quantum %d\n", p->id,
         q->time_quantum);
}

Process *dequeue(Queue *q) {
  if (q->front == -1)
    return NULL;

  Process *p = q->processes[q->front];
  if (q->front == q->rear) {
    q->front = q->rear = -1;

  } else {
    q->front++;
  }
  printf("Process %d dequeued from queue with time quantum %d\n", p->id,
         q->time_quantum);
  return p;
}

// 5. Implement the MLFQ scheduling logic
void mlfq_scheduling(Queue *high_priority_q, Queue *medium_priority_q,
                     Queue *low_priority_q, int n) {
  int total_time = 0;
  while (1) {
    Process *p = dequeue(high_priority_q);
    if (p != NULL) {
      printf("Process %d is running in high priority queue\n", p->id);
      if (p->remaining_time <= high_priority_q->time_quantum) {
        total_time += p->remaining_time;
        p->remaining_time = 0;
        p->wait_t = total_time - p->duration;
        p->turnaround_t = total_time;
        printf("Process %d finished execution\n", p->id);
      } else {
        p->remaining_time -= high_priority_q->time_quantum;
        total_time += high_priority_q->time_quantum;
        enqueue(medium_priority_q, p);
      }
    } else {
      p = dequeue(medium_priority_q);
      if (p != NULL) {
        printf("Process %d is running in medium priority queue\n", p->id);
        if (p->remaining_time <= medium_priority_q->time_quantum) {
          total_time += p->remaining_time;
          p->remaining_time = 0;
          p->wait_t = total_time - p->duration;
          p->turnaround_t = total_time;
          printf("Process %d finished execution\n", p->id);
        } else {
          p->remaining_time -= medium_priority_q->time_quantum;
          total_time += medium_priority_q->time_quantum;
          enqueue(low_priority_q, p);
        }
      } else {
        p = dequeue(low_priority_q);
        if (p != NULL) {
          printf("Process %d is running in low priority queue\n", p->id);
          if (p->remaining_time <= low_priority_q->time_quantum) {
            total_time += p->remaining_time;
            p->remaining_time = 0;
            p->wait_t = total_time - p->duration;
            p->turnaround_t = total_time;
            printf("Process %d finished execution\n", p->id);
          } else {
            p->remaining_time -= low_priority_q->time_quantum;
            total_time += low_priority_q->time_quantum;
            enqueue(low_priority_q, p);
          }
        } else {
          break;
        }
      }
    }
  }
}

int main() {
  // Step 6.1: Initialize the Queues
  Queue high_priority_q, medium_priority_q, low_priority_q;
  initializeQueue(&high_priority_q,
                  2); // High priority queue with time quantum of 2
  initializeQueue(&medium_priority_q,
                  4); // Medium priority queue with time quantum of 4
  initializeQueue(&low_priority_q,
                  8); // Low priority queue with time quantum of 8

  // Step 6.2: Take User Input for Number of Processes
  int n;
  printf("Enter the number of processes: ");
  scanf("%d", &n);

  // Step 6.3: Allocate Memory for Processes and Take Their Input
  Process *processes = (Process *)malloc(n * sizeof(Process));
  for (int i = 0; i < n; i++) {
    printf("Enter duration for process %d: ", i + 1);
    scanf("%d", &processes[i].duration);
    processes[i].id = i + 1;
    processes[i].remaining_time = processes[i].duration;
    processes[i].wait_t = 0;
    processes[i].turnaround_t = 0;
    enqueue(&high_priority_q, &processes[i]); // Enqueue all processes to high
                                              // priority queue initially
  }

  // Step 6.4: Invoke the MLFQ Scheduling Function
  mlfq_scheduling(&high_priority_q, &medium_priority_q, &low_priority_q, n);

  // Step 6.5: Display the Results
  printf("Process\tDuration\tWaiting Time\tTurnaround Time\n");
  for (int i = 0; i < n; i++) {
    printf("%d\t%d\t\t%d\t\t%d\n", processes[i].id, processes[i].duration,
           processes[i].wait_t, processes[i].turnaround_t);
  }

  // Step 6.6: Free the Allocated Memory
  free(processes);
  return 0;
}
