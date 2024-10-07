#include <assert.h>
#include <fcntl.h> // Include this for O_CREATE, etc.
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) { // Parent Process
  int fd = open("essay.txt", O_CREAT | O_RDONLY);
  assert(fd >= 0);
  int rc = fork(); // uses fork to create a child process
  if (rc == 0) {
    rc = lseek(fd, 10, SEEK_SET); // child calls lseek to adjust offset to 10
    printf("child offset = %d\n", rc);
  } else if (rc > 0) {
    (void)wait(NULL); // parent waits for child to finish
    printf("parent offset = %d\n",
           (int)lseek(fd, 0, SEEK_CUR)); // parent checks offset and prints
  }
  return 0;
}
