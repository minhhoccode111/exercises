#include <stdio.h>
struct Number {
  int num;
};

int main(int argc, char *argv[]) {
  struct Number *p = NULL;
  printf("%d\n", p->num);
  return 0;
}
