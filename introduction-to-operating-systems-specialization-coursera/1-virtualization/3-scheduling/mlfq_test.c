#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_PROCESSES 100
#define NUM_QUEUES 3

typedef struct {
  int id;
  int duration;
  int remaining_time;
  int waiting_time;
  int turnaround_time;
  int arrival_time;
} Process;

typedef struct {
  Process *processes[MAX_PROCESSES];
  int front, rear;
  int time_quantum;
} Queue;

Queue queues[NUM_QUEUES];
Process *all_processes[MAX_PROCESSES];
int num_processes = 0;
int current_time = 0;

void initializeQueues() {
  queues[0].time_quantum = 2; // High priority queue
  queues[1].time_quantum = 4; // Medium priority queue
  queues[2].time_quantum = 8; // Low priority queue

  for (int i = 0; i < NUM_QUEUES; i++) {
    queues[i].front = queues[i].rear = -1;
  }
}

void enqueue(Queue *q, Process *p) {
  if (q->rear == MAX_PROCESSES - 1)
    return;
  if (q->front == -1)
    q->front = 0;
  q->rear++;
  q->processes[q->rear] = p;
  printf("Process %d enqueued in queue with time quantum %d\n", p->id,
         q->time_quantum);
}

Process *dequeue(Queue *q) {
  if (q->front == -1)
    return NULL;
  Process *p = q->processes[q->front];
  if (q->front == q->rear)
    q->front = q->rear = -1;
  else
    q->front++;
  printf("Process %d dequeued from queue with time quantum %d\n", p->id,
         q->time_quantum);
  return p;
}

bool isQueueEmpty(Queue *q) { return q->front == -1; }

void runProcess(Process *p, int time_quantum, int current_queue) {
  printf("Process %d is running in ", p->id);
  switch (current_queue) {
  case 0:
    printf("high");
    break;
  case 1:
    printf("medium");
    break;
  case 2:
    printf("low");
    break;
  }
  printf(" priority queue\n");

  int execution_time =
      (p->remaining_time < time_quantum) ? p->remaining_time : time_quantum;
  p->remaining_time -= execution_time;
  current_time += execution_time;

  for (int i = 0; i < num_processes; i++) {
    if (all_processes[i]->remaining_time > 0 && all_processes[i] != p) {
      all_processes[i]->waiting_time += execution_time;
    }
  }

  if (p->remaining_time == 0) {
    printf("Process %d finished execution\n", p->id);
    p->turnaround_time = current_time - p->arrival_time;
  }
}

void mlfqScheduler() {
  while (1) {
    bool all_finished = true;
    for (int i = 0; i < NUM_QUEUES; i++) {
      while (!isQueueEmpty(&queues[i])) {
        Process *p = dequeue(&queues[i]);
        runProcess(p, queues[i].time_quantum, i);

        if (p->remaining_time > 0) {
          if (i < NUM_QUEUES - 1) {
            enqueue(&queues[i + 1], p);
          } else {
            enqueue(&queues[i], p);
          }
        }

        all_finished = false;
        break;
      }
      if (!all_finished)
        break;
    }
    if (all_finished)
      break;
  }
}

int main() {
  initializeQueues();

  printf("Enter the number of processes: ");
  scanf("%d", &num_processes);

  for (int i = 0; i < num_processes; i++) {
    all_processes[i] = malloc(sizeof(Process));
    all_processes[i]->id = i + 1;
    printf("Enter duration for process %d: ", i + 1);
    scanf("%d", &all_processes[i]->duration);
    all_processes[i]->remaining_time = all_processes[i]->duration;
    all_processes[i]->waiting_time = 0;
    all_processes[i]->turnaround_time = 0;
    all_processes[i]->arrival_time = current_time;
    enqueue(&queues[0], all_processes[i]);
  }

  mlfqScheduler();

  printf("Process\tDuration\tWaiting Time\tTurnaround Time\n");
  float total_waiting_time = 0, total_turnaround_time = 0;
  for (int i = 0; i < num_processes; i++) {
    printf("%d\t%d\t\t%d\t\t%d\n", all_processes[i]->id,
           all_processes[i]->duration, all_processes[i]->waiting_time,
           all_processes[i]->turnaround_time);
    total_waiting_time += all_processes[i]->waiting_time;
    total_turnaround_time += all_processes[i]->turnaround_time;
    free(all_processes[i]);
  }

  return 0;
}
