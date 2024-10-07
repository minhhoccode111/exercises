#include <stdio.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  void *programBreak = sbrk(0);
  printf("Original program break: %p\n", programBreak);
  programBreak = (void *)programBreak + 1;
  printf("New break value: %p\n", programBreak);
  brk(programBreak);
  printf("New program break: %p\n", sbrk(0));

  return (0);
}
