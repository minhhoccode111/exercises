/*
Write a program that calls fork().
Before calling fork(), have the main() process access the variable num and
set its value to 100. The parent process should print the value of num in the
format value in parent process: 100 The child process should also print the
value of num in the same format on the following line.
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int num;

int main(int argc, char *argv[]) {
  num = 100;
  int child = fork();
  if (child < 0) {
    exit(1);
  } else if (child == 0) {
    printf("value in child process: %d\n", num);
  } else {
    printf("value in parent process: %d\n", num);
  }
  return 0;
}
