#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  char *srcPointer = "memory management is hard";
  char *dstPointer = (char *)malloc(strlen(srcPointer) + 1); // allocate memory
  strcpy(dstPointer, srcPointer);
  printf("%s\n", dstPointer);
  return 0;
}
