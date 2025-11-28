#include <assert.h>
#include <dirent.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {

  DIR *dp = opendir(".");
  assert(dp != NULL);

  struct dirent *d;

  while ((d = readdir(dp)) != NULL) {
    printf("%lu %s\n", (unsigned long)d->d_ino, d->d_name);
  }

  closedir(dp);
  return 0;
}
