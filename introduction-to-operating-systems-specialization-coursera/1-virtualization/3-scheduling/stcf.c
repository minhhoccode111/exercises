#include <stdio.h>

typedef struct {
  int job_id;
  int duration;
  int arrival_time;
  int remaining_time;
  int started;
} Job;

void stcf_scheduler(Job jobs[], int count) {
  int currentTime = 0;
  int currentIndex = -1;

  while (1) {
    int minTime = 99999;
    int chosenIndex = -1;

    // check for job arrivals and preemtion
    for (int i = 0; i < count; i++) {
      if (jobs[i].arrival_time <= currentTime && jobs[i].remaining_time > 0 &&
          jobs[i].remaining_time < minTime) {
        minTime = jobs[i].remaining_time;
        chosenIndex = i;
      }
    }

    // if no jobs remain, exit loop
    if (chosenIndex == -1) {
      currentTime++; // increase time if no job is found
      continue;
    }

    // if the chosen job is different from the currently running job, it is
    // preempted
    if (currentIndex != chosenIndex) {
      if (currentIndex != -1) {
        printf("Time: %d - Preempting Job %d\n", currentTime,
               jobs[currentIndex].job_id);
      }
      printf("Time: %d - Starting Job %d\n", currentTime,
             jobs[chosenIndex].job_id);
    }

    // execute chosen job for 1 second
    jobs[chosenIndex].remaining_time--;
    if (jobs[chosenIndex].remaining_time == 0) {
      printf("Time: %d - Completed Job %d\n", currentTime + 1,
             jobs[chosenIndex].job_id);
    }

    currentIndex = chosenIndex;
    currentTime++;
  }
}

int main() {
  Job jobs[] = {
      {1, 100, 0, 100, 0},
      {2, 10, 10, 10, 0},
      {3, 10, 15, 10, 0},
  };

  stcf_scheduler(jobs, sizeof(jobs) / sizeof(jobs[0]));
  return 0;
}
