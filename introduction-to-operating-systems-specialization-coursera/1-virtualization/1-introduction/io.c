#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  // creates file
  int file = open("/tmp/file", O_WRONLY | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
  char buffer[40];
  sprintf(buffer, "I will persist!\n");
  // writes data to file
  write(file, buffer, strlen(buffer));
  fsync(file);
  // closes the file
  close(file);
  return 0;
}
