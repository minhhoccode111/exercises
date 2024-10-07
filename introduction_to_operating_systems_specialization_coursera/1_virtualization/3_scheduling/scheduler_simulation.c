#include <stdio.h> // Include the standard I/O header file for printf function
#include <unistd.h> // Include the Unix standard header file for the sleep function

#define JOB_COUNT 3 // Define a macro for the number of jobs, set to 3
#define DURATION                                                               \
  5 // Define a macro for the default duration of each job, set to 5 seconds

// Define a structure named Job with two integer attributes: job_id and duration
typedef struct {
  int job_id;   // Unique identifier for each job
  int duration; // Duration for which the job runs
} Job;

// Function to schedule and run jobs one after the other
void scheduler(Job jobs[], int count) { // Loop through each job
  for (int i = 0; i < count;
       i++) { // Print message indicating the start of a job's execution
    printf("Executing Job %d for %d seconds...\n", jobs[i].job_id,
           jobs[i].duration); // Pause the program execution for the duration of
                              // the current job
    sleep(jobs[i].duration);  // Print message indicating the completion of a
                              // job's execution
    printf("Job %d completed!\n", jobs[i].job_id);
  }
}

// The main function where program execution starts
int main() { // Define and initialize an array of jobs with the given JOB_COUNT
             // and DURATION
  Job jobs[JOB_COUNT] = {{1, DURATION}, {2, DURATION}, {3, DURATION}};

  // Call the scheduler function to execute the jobs
  scheduler(jobs, JOB_COUNT);

  // Return 0 to indicate successful completion of the program
  return 0;
}
