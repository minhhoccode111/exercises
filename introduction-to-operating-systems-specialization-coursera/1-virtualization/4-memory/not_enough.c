#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {

  // add your code below this line

  int *arr;
  int sz = 10;
  arr = (int *)malloc(sz * sizeof(int));
  printf("%d\n", arr[6]); // access uninitialized data

  // add your code above this line

  return (0);
}
