#include <stdio.h>
#include <stdlib.h>

// Define the Process structure
typedef struct {
  int id;
  int duration;
  int waiting_time;
  int turnaround_time;
} Process;

// Function to compare processes for qsort
int compare(const void *a, const void *b) {
  return ((Process *)a)->duration - ((Process *)b)->duration;
}

// Function to calculate waiting time and turnaround time
void calculateTimes(Process *processes, int n) {
  int total_time = 0;
  for (int i = 0; i < n; i++) {
    processes[i].waiting_time = total_time;
    processes[i].turnaround_time = total_time + processes[i].duration;
    total_time += processes[i].duration;
  }
}

// Function to calculate average waiting time and average turnaround time
void calculateAverages(Process *processes, int n, float *avg_waiting_time,
                       float *avg_turnaround_time) {
  float total_waiting_time = 0, total_turnaround_time = 0;
  for (int i = 0; i < n; i++) {
    total_waiting_time += processes[i].waiting_time;
    total_turnaround_time += processes[i].turnaround_time;
  }
  *avg_waiting_time = total_waiting_time / n;
  *avg_turnaround_time = total_turnaround_time / n;
}

int main() {
  int n;
  printf("Enter the number of processes: ");
  scanf("%d", &n);

  Process *processes = (Process *)malloc(n * sizeof(Process));

  // Gather input
  for (int i = 0; i < n; i++) {
    processes[i].id = i + 1;
    printf("Enter execution time for process %d: ", i + 1);
    scanf("%d", &processes[i].duration);
  }

  // Sort processes based on duration (SJF)
  qsort(processes, n, sizeof(Process), compare);

  // Calculate waiting time and turnaround time
  calculateTimes(processes, n);

  // Calculate averages
  float avg_waiting_time, avg_turnaround_time;
  calculateAverages(processes, n, &avg_waiting_time, &avg_turnaround_time);

  // Display results
  printf("Process\tExecution Time\tWaiting Time\tTurnaround Time\n");
  // printf("\nProcess\tExecution Time\tWaiting Time\tTurnaround Time\n");
  for (int i = 0; i < n; i++) {
    printf("%d\t%d\t\t%d\t\t%d\n", processes[i].id, processes[i].duration,
           processes[i].waiting_time, processes[i].turnaround_time);
  }

  printf("\nAverage Waiting Time: %.2f\n", avg_waiting_time);
  printf("Average Turnaround Time: %.2f\n", avg_turnaround_time);

  free(processes);
  return 0;
}
