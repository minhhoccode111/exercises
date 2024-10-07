
#include <pthread.h>
#include <stdio.h>

static volatile int counter = 0;

void *mythread(void *arg) {
  printf("%s: begin\n", (char *)arg);
  fflush(stdout);
  for (int i = 0; i < 29221040; i++) { // reduced loop count for quick execution
    counter = counter + 1;
  }
  printf("%s: done\n", (char *)arg);
  fflush(stdout);
  return NULL;
}

int main() {
  pthread_t p1, p2;
  printf("main: begin (counter = %d)\n", counter);
  fflush(stdout);

  pthread_create(&p1, NULL, mythread, (void *)"A");
  pthread_create(&p2, NULL, mythread, (void *)"B");

  pthread_join(p1, NULL);
  pthread_join(p2, NULL);
  printf("main: done with both (counter = %d)\n", counter);
  fflush(stdout);

  return 0;
}
