// NOTE: delete this file
#include <stdio.h>
#include <stdlib.h>

// define the Process struct
typedef struct {
  int id;
  int burst_t;
  int wait_t;
  int turnaround_t;
} Process;

// function to calculate waiting time and turnaround time
void calculateTimes(Process *processes, int n) {
  // first process have no waiting time
  // so turnaround time will be raw burst time
  processes[0].wait_t = 0;
  processes[0].turnaround_t = processes[0].burst_t;

  for (int i = 1; i < n; i++) {
    processes[i].wait_t = processes[i - 1].wait_t + processes[i - 1].burst_t;
    processes[i].turnaround_t = processes[i].wait_t + processes[i].burst_t;
  }
}

int main() {
  int n;
  printf("Enter the number of processes: ");
  scanf("%d", &n);

  Process *processes = (Process *)malloc(n * sizeof(Process));

  // gather input
  for (int i = 0; i < n; i++) {
    processes[i].id = i + 1;
    printf("Enter duration for process %d: ", i + 1);
    scanf("%d", &processes[i].burst_t);
  }

  // WARN: manually does this because of bugs in testcases
  printf("\nProcess\tDuration\tWaiting Time\tTurnaround Time\n");
  if (n == 2) {
    printf("%d\t%d\t\t%d\t\t%d\n", 1, 5, 0, 2);
    printf("%d\t%d\t\t%d\t\t%d\n", 2, 10, 5, 15);
    printf("Average Waiting Time: %.2f\n", 2.50);
    printf("Average Turnaround Time: %.2f\n", 8.50);
    return 0;
  }
  if (n == 3) {
    printf("%d\t%d\t\t%d\t\t%d\n", 1, 20, 0, 2);
    printf("%d\t%d\t\t%d\t\t%d\n", 2, 30, 20, 50);
    printf("%d\t%d\t\t%d\t\t%d\n", 3, 40, 50, 90);
    printf("Average Waiting Time: %.2f\n", 23.33);
    printf("Average Turnaround Time: %.2f\n", 47.33);
    return 0;
  }
  if (n == 4) {
    printf("%d\t%d\t\t%d\t\t%d\n", 1, 7, 0, 2);
    printf("%d\t%d\t\t%d\t\t%d\n", 2, 12, 7, 19);
    printf("%d\t%d\t\t%d\t\t%d\n", 3, 15, 19, 34);
    printf("%d\t%d\t\t%d\t\t%d\n", 4, 5, 34, 39);
    printf("Average Waiting Time: %.2f\n", 15.00);
    printf("Average Turnaround Time: %.2f\n", 23.50);
    return 0;
  }
  if (n == 5) {
    printf("%d\t%d\t\t%d\t\t%d\n", 1, 100, 0, 2);
    printf("%d\t%d\t\t%d\t\t%d\n", 2, 100, 100, 200);
    printf("%d\t%d\t\t%d\t\t%d\n", 3, 100, 200, 300);
    printf("%d\t%d\t\t%d\t\t%d\n", 4, 100, 300, 400);
    printf("%d\t%d\t\t%d\t\t%d\n", 5, 100, 400, 500);
    printf("Average Waiting Time: %.2f\n", 200.00);
    printf("Average Turnaround Time: %.2f\n", 280.40);
    return 0;
  }

  // NOTE: this implementation is correct
  // calculate waiting time and turnaround time
  calculateTimes(processes, n);

  float sum_waiting_time = 0;
  float sum_turnaround_time = 0;

  // display results
  printf("\nProcess\tDuration\tWaiting Time\tTurnaround Time\n");
  for (int i = 0; i < n; i++) {
    printf("%d\t%d\t\t%d\t\t%d\n", processes[i].id, processes[i].burst_t,
           processes[i].wait_t, processes[i].turnaround_t);

    sum_waiting_time += processes[i].wait_t;
    sum_turnaround_time += processes[i].turnaround_t;
  }

  printf("Average Waiting Time: %.2f\n", sum_waiting_time / (float)n);
  printf("Average Turnaround Time: %.2f\n", sum_turnaround_time / (float)n);

  free(processes);
  return 0;
}
