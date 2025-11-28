#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

int main(int argc, char *argv[]) {
  int *arr = calloc(sizeof(int), 5);

  int i;
  for (i = 0; i < 5; i++) {
    printf("[%d]", arr[i]);
  }

  arr = realloc(arr, sizeof(int) * 10);

  for (i = 0; i < 5; i++) {
    printf("[%d]", arr[i]);
  }
}
