#include <pthread.h>
#include <stdio.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
volatile int done = 0;

void *child(void *arg) {
  printf("child\n");
  pthread_mutex_lock(&mutex);
  done = 1;
  pthread_cond_signal(&cond); // Signal the parent thread
  pthread_mutex_unlock(&mutex);
  return NULL;
}

int main(int argc, char *argv[]) {
  printf("parent: begin\n");
  pthread_t c;

  pthread_mutex_lock(&mutex);
  pthread_create(&c, NULL, child, NULL); // Create child

  while (done == 0) {
    pthread_cond_wait(&cond, &mutex); // Wait for signal
  }
  pthread_mutex_unlock(&mutex);

  printf("parent: end\n");
  return 0;
}
