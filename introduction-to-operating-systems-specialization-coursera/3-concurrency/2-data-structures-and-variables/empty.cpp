
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

#define MAX 10 // Size of the buffer

int buffer[MAX];
int fill = 0;
int use = 0;
sem_t empty;
sem_t full;
pthread_mutex_t buffer_mutex = PTHREAD_MUTEX_INITIALIZER;

void put(int value) {
  pthread_mutex_lock(&buffer_mutex);
  buffer[fill] = value;
  fill = (fill + 1) % MAX;
  pthread_mutex_unlock(&buffer_mutex);
}

int get() {
  pthread_mutex_lock(&buffer_mutex);
  int tmp = buffer[use];
  use = (use + 1) % MAX;
  pthread_mutex_unlock(&buffer_mutex);
  return tmp;
}

void *producer(void *arg) {
  for (int i = 0; i < 20; i++) {
    sem_wait(&empty);
    put(i);
    printf("Produced: %d\n", i);
    sem_post(&full);
  }
  return NULL;
}

void *consumer(void *arg) {
  int tmp = 0;
  while (tmp != -1) {
    sem_wait(&full);
    tmp = get();
    sem_post(&empty);
    printf("Consumed: %d\n", tmp);
  }
  return NULL;
}

int main(int argc, char *argv[]) {
  sem_init(&empty, 0, MAX); // MAX slots are empty
  sem_init(&full, 0, 0);    // 0 slots are full

  pthread_t p, c;
  pthread_create(&p, NULL, producer, NULL);
  pthread_create(&c, NULL, consumer, NULL);

  pthread_join(p, NULL);
  pthread_join(c, NULL);

  sem_destroy(&empty);
  sem_destroy(&full);
  pthread_mutex_destroy(&buffer_mutex);

  return 0;
}
