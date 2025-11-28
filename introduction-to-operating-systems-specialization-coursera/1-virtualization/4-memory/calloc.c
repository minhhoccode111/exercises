#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

int main(int argc, char *argv[]) {
  int *arr = calloc(sizeof(int), 10);

  int i;
  for (i = 0; i < 10; i++) {
    printf("[%d]", arr[i]);
  }

  return 0;
}
