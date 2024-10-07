
#include <pthread.h>
#include <stdio.h>

cond_t empty, fill; // Condition variables for synchronization
mutex_t mutex;      // Mutex for protecting shared data

void *producer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // p1: Acquire the mutex for exclusive access
    while (count == MAX) // p2: Check if the buffer is full (use a while loop to
                         // handle spurious wake-ups)
      Pthread_cond_wait(&empty,
                        &mutex); // p3: Wait for the buffer to have space
    put(i);                      // p4: Put the value into the buffer
    Pthread_cond_signal(&fill); // p5: Signal that the buffer is no longer empty
    Pthread_mutex_unlock(&mutex); // p6: Release the mutex
  }
}

void *consumer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // c1: Acquire the mutex for exclusive access
    while (count == 0) // c2: Check if the buffer is empty (use a while loop to
                       // handle spurious wake-ups)
      Pthread_cond_wait(&fill, &mutex); // c3: Wait for the buffer to have data
    int tmp = get();                    // c4: Get a value from the buffer
    Pthread_cond_signal(&empty); // c5: Signal that the buffer is no longer full
    Pthread_mutex_unlock(&mutex); // c6: Release the mutex
    printf("%d\n", tmp);          // Print the retrieved value
  }
}