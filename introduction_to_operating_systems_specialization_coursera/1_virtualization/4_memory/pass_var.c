#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  int *x = malloc(10 * sizeof(int));
  printf("%ld\n", sizeof(x));
  return 0;
}
