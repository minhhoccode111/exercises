#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  char *txt;

  txt = (char *)malloc(6);
  strcpy(txt, "Hello");
  printf("String: %s,  Address: %p\n", txt, txt);

  txt = (char *)realloc(txt, 25);
  strcat(txt, " World");
  printf("String: %s,  Address: %p\n", txt, txt);

  free(txt);
  printf("String: %s,  Address: %p\n", txt, txt);

  return (0);
}
