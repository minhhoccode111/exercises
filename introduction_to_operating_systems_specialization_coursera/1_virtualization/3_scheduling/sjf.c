#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
  int jobCount = 3;
  int jobTimes[3], arrivalTimes[3];
  int totalTurnaround = 0;
  int currentTime = 0;

  printf("sjf scheduling simulator\n\n");

  // get arrival times and execution times for each job
  for (int i = 0; i < jobCount; i++) {
    printf("enter arrival time and execution time for job %c (separated by a "
           "space): ",
           'A' + i);

    scanf("%d %d", &arrivalTimes[i], &jobTimes[i]);
  }

  // simulate sjf
  int shortestTime, shortestJob;
  for (int i = 0; i < jobCount; i++) {
    shortestTime = INT_MAX;
    shortestJob = -1;

    for (int j = 0; j < jobCount; j++) {
      if (arrivalTimes[j] <= currentTime && jobTimes[j] < shortestTime &&
          jobTimes[j] != -1) {
        shortestTime = jobTimes[j];
        shortestJob = j;
      }

      if (shortestJob == -1) {
        currentTime++;
        i--;
        continue;
      }

      // execute shortest job found
      currentTime += jobTimes[shortestJob];
      totalTurnaround += (currentTime - arrivalTimes[shortestJob]);
      jobTimes[shortestJob] = -1; // mark job as completed
    }

    // display the average turnaround time
    printf("\n The average turnaround time is: %.2f seconds\n",
           (float)totalTurnaround / jobCount);

    return 0;
  }
}
