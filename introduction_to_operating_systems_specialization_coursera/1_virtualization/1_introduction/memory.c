#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <unistd.h>

double getTime() {
  struct timeval t;
  gettimeofday(&t, NULL);
  return (double)t.tv_sec + (double)t.tv_usec / 1e6;
}

void wait(int howlong) {
  double t = getTime();
  while ((getTime() - t) < (double)howlong)
    ; // wait ...
}

int main(int argc, char *argv[]) {
  int *p;
  // allocates memory
  p = malloc(sizeof(int));

  // prints address of memory, inserting 0
  printf("(%d) addr pointed to by p: %p\n", (int)getpid(), p);

  // assign input to address store in p
  *p = atoi(argv[1]);

  // loop every second and increment address value of p
  while (1) {
    wait(1);
    *p = *p + 1;
    printf("(%d) value of p: %d\n", getpid(), *p);
  }
  return 0;
}
