
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  int size = 20;
  char buffer[size];

  int fd =
      open("peter.txt.tmp", O_WRONLY | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
  write(fd, buffer, size); // write new version of file
  fsync(fd);
  close(fd);
  rename("peter.txt.tmp", "peter.txt");

  return 0;
}
