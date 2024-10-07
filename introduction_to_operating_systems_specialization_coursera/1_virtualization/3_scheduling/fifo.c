#include <stdio.h>

int main() {
  int jobCount = 3;
  int jobTimes[3];
  int totalTurnaround = 0;
  int currentTime = 0;

  printf("fifo scheduling simulator\n\n");
  printf("assumption: jobs a, b, and c arrive in the order a -> b -> c.\n\n");

  // get execution times for each job
  for (int i = 0; i < jobCount; i++) {
    printf("enter execution time for job %c (in seconds): ", 'A' + i);

    scanf("%d", &jobTimes[i]);

    // calculate turnaround for current job
    totalTurnaround += (currentTime + jobTimes[i]);

    // update current time for next job's arrival
    currentTime += jobTimes[i];
  }

  // display the average turnaround time
  printf("\n the average turnaround time is: %d seconds\n",
         totalTurnaround / jobCount);

  return 0;
}
