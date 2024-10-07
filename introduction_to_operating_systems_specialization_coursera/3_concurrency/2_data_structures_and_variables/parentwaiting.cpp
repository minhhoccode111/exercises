
#include <pthread.h>
#include <stdio.h>

int done = 0;
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t c = PTHREAD_COND_INITIALIZER;

void thr_exit() {
  pthread_mutex_lock(&m);
  done = 1;
  pthread_cond_signal(&c); // Signal the parent thread
  pthread_mutex_unlock(&m);
}

void *child(void *arg) {
  printf("child\n");
  thr_exit(); // Child signals it's done
  return NULL;
}

void thr_join() {
  pthread_mutex_lock(&m);
  while (done == 0) {
    pthread_cond_wait(&c, &m); // Wait for the child to signal
  }
  pthread_mutex_unlock(&m);
}

int main(int argc, char *argv[]) {
  printf("parent: begin\n");
  pthread_t p;
  pthread_create(&p, NULL, child, NULL); // Create child
  thr_join();                            // Wait for child
  printf("parent: end\n");
  return 0;
}
