#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  printf("Starting the program... (pid: %d)\n", (int)getpid());
  int child = fork();
  if (child < 0) {
    // child process failed, exit the program
    fprintf(stderr, "Child process was not created\n");
    exit(1);

  } else if (child == 0) {
    // child process created successfully
    printf("Hello from the child process (pid: %d)\n", (int)getpid());
    char *exampleargs[3];
    exampleargs[0] = strdup("wc");       // calls the word count programm
    exampleargs[1] = strdup("p3.c");     // file for the word count program
    exampleargs[2] = NULL;               // signifies the end of array
    execvp(exampleargs[0], exampleargs); // exec call for word count
    printf("this shouldn't print out\n");
  } else {
    // parent process runs this branch
    int waiting = wait(NULL);
    printf("Hello from the parent process (waiting: %d) (pid: %d)\n", waiting,
           (int)getpid());
  }
  return 0;
}
