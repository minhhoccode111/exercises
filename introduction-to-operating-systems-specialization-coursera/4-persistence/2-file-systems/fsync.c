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

  int fd = open("zoo", O_CREAT | O_WRONLY | O_TRUNC | S_IRUSR | S_IWUSR);
  assert(fd > -1);
  int rc = write(fd, buffer, size);

  assert(rc == size);
  rc = fsync(fd);
  assert(rc == 0);

  return 0;
}
