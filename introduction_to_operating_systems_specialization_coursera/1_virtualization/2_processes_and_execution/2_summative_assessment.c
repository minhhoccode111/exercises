/*
Write another program using fork().
    The child process should print Hello from the child
    The parent process should print Goodbye from the parent.
    Make sure that the child process always prints first without calling wait()
    in the parent process.
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int child = fork();
  if (child < 0) {
    exit(1);
  } else if (child == 0) {
    printf("Hello from the child\n");
  } else {
    sleep(1);
    printf("Goodbye from the parent\n");
  }
  return 0;
}
