#include <stdio.h>

int main() {
  int T_completion;
  int T_turnaround;
  int T_arrival = 0;

  // explain the assumption
  printf("Assumption: All jobs arrive at the same itme, T_arrival = 0.\n\n");

  // get the completion time from the user
  printf("Enter the completion time (T_completion) for the job: ");
  scanf("%d", &T_completion);

  // calculation the turnaround time
  T_turnaround = T_completion - T_arrival;

  // display the result
  printf("\nGiven T_completion = %d and T_arrival = %d (assumed), \n",
         T_completion, T_arrival);
  printf("\nThe turnaround time (T_turnaround) is: %d\n", T_turnaround);
}
