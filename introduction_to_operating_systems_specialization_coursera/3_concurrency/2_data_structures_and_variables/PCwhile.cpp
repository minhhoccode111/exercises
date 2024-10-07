
#include <pthread.h>
#include <stdio.h>

int loops;     // The number of iterations for both producer and consumer
cond_t cond;   // Condition variable for synchronization
mutex_t mutex; // Mutex for protecting shared data

void *producer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // p1: Acquire the mutex for exclusive access
    while (count == 1) // p2: Check if the buffer is full (use a while loop to
                       // handle spurious wake-ups)
      Pthread_cond_wait(&cond,
                        &mutex); // p3: Wait for the buffer to become empty
    put(i);                      // p4: Put the value into the buffer
    Pthread_cond_signal(&cond); // p5: Signal that the buffer is no longer empty
    Pthread_mutex_unlock(&mutex); // p6: Release the mutex
  }
}

void *consumer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // c1: Acquire the mutex for exclusive access
    while (count == 0) // c2: Check if the buffer is empty (use a while loop to
                       // handle spurious wake-ups)
      Pthread_cond_wait(&cond,
                        &mutex); // c3: Wait for the buffer to become full
    int tmp = get();             // c4: Get a value from the buffer
    Pthread_cond_signal(&cond);  // c5: Signal that the buffer is no longer full
    Pthread_mutex_unlock(&mutex); // c6: Release the mutex
    printf("%d\n", tmp);          // Print the retrieved value
  }
}
