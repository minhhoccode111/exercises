
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

typedef struct __Zem_t {
  int value;
  pthread_cond_t cond;
  pthread_mutex_t lock;
} Zem_t;

void Zem_init(Zem_t *s, int value) {
  s->value = value;
  pthread_cond_init(&s->cond, NULL);
  pthread_mutex_init(&s->lock, NULL);
}

void Zem_wait(Zem_t *s) {
  pthread_mutex_lock(&s->lock);
  while (s->value <= 0) {
    pthread_cond_wait(&s->cond, &s->lock);
  }
  s->value--;
  pthread_mutex_unlock(&s->lock);
}

void Zem_post(Zem_t *s) {
  pthread_mutex_lock(&s->lock);
  s->value++;
  pthread_cond_signal(&s->cond);
  pthread_mutex_unlock(&s->lock);
}

int main() {
  Zem_t semaphore;
  Zem_init(&semaphore, 1); // Initialize semaphore with a value of 1

  // Example usage of Zem_wait and Zem_post
  Zem_wait(&semaphore);
  printf("Semaphore acquired\n");
  Zem_post(&semaphore);
  printf("Semaphore released\n");

  return 0;
}
