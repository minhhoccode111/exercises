
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

int main(int argc, char *argv[]) {
#define PAGESIZE 4096

  void *pointer1 = mmap(NULL, PAGESIZE, PROT_READ | PROT_WRITE,
                        MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);

  void *pointer2 = mmap(NULL, PAGESIZE, PROT_READ | PROT_WRITE,
                        MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);

  printf("First page: %p\n", pointer1);
  printf("Second page: %p\n", pointer2);

  // First page: 0x7984b77b5000
  // Second page: 0x7984b77b4000
  return 0;
}
