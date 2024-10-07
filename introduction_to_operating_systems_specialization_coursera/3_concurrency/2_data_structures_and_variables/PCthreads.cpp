#include <pthread.h>
#include <stdio.h>

int buffer;
int count = 0; // Initially, empty

void put(int value) {
  assert(count == 0);
  count = 1;
  buffer = value;
}

int get() {
  assert(count == 1);
  count = 0;
  return buffer;
}

void *producer(void *arg) {
  int i;
  int loops = (int)arg;
  for (i = 0; i < loops; i++) {
    put(i);
  }
  return NULL;
}

void *consumer(void *arg) {
  while (1) {
    int tmp = get();
    printf("%d\n", tmp);
  }
  return NULL;
}
