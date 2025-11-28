
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

#define MAX 10   // Define the size of the buffer
#define loops 20 // Define the number of iterations

int buffer[MAX]; // Shared buffer
int fill = 0;    // Index for the next item to be produced
int use = 0;     // Index for the next item to be consumed
sem_t empty;     // Semaphore indicating the number of empty slots
sem_t full;      // Semaphore indicating the number of full slots
sem_t mutex;     // Binary semaphore used as a mutex

void put(int value) {
  buffer[fill] = value;
  fill = (fill + 1) % MAX;
}

int get() {
  int tmp = buffer[use];
  use = (use + 1) % MAX;
  return tmp;
}

void *producer(void *arg) {
  for (int i = 0; i < loops; i++) {
    sem_wait(&empty); // Wait for an empty slot
    sem_wait(&mutex); // Acquire mutex
    put(i);           // Produce an item
    sem_post(&mutex); // Release mutex
    sem_post(&full);  // Signal that a new item is available
  }
  return NULL;
}

void *consumer(void *arg) {
  for (int i = 0; i < loops; i++) {
    sem_wait(&full);  // Wait for a full slot
    sem_wait(&mutex); // Acquire mutex
    int tmp = get();  // Consume an item
    sem_post(&mutex); // Release mutex
    sem_post(&empty); // Signal that a slot is now empty
    printf("Consumed: %d\n", tmp);
  }
  return NULL;
}

int main(int argc, char *argv[]) {
  // Initialize semaphores
  sem_init(&empty, 0, MAX);
  sem_init(&full, 0, 0);
  sem_init(&mutex, 0, 1);

  // Create producer and consumer threads
  pthread_t p, c;
  pthread_create(&p, NULL, producer, NULL);
  pthread_create(&c, NULL, consumer, NULL);

  // Wait for threads to complete
  pthread_join(p, NULL);
  pthread_join(c, NULL);

  // Clean up
  sem_destroy(&empty);
  sem_destroy(&full);
  sem_destroy(&mutex);

  return 0;
}
