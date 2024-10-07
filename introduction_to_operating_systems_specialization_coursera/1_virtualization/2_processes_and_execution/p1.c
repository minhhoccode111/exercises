#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  printf("Starting the program... (pid:%d)\n", (int)getpid());
  int child = fork(); // parent process creates a child process
  if (child < 0) {
    // child process failed, exit the program
    fprintf(stderr, "Child process was not created\n");
    exit(1);
  } else if (child == 0) {
    // child process created successfully
    printf("Hello from the child process (pid:%d)\n", (int)getpid());
  } else {
    // parent process runs this branch
    printf("Hello from the parent process (pid:%d)\n", child, (int)getpid());
  }
  return 0;
}
