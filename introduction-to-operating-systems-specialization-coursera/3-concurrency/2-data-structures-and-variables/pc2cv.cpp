
#include <pthread.h>
#include <stdio.h>

cond_t empty, fill; // Condition variables for synchronization
mutex_t mutex;      // Mutex for protecting shared data

void *producer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // Acquire the mutex for exclusive access
    while (count == 1) // Check if the buffer is full (use a while loop to
                       // handle spurious wake-ups)
      Pthread_cond_wait(&empty, &mutex); // Wait for the buffer to become empty
    put(i);                              // Put the value into the buffer
    Pthread_cond_signal(&fill);   // Signal that the buffer is no longer empty
    Pthread_mutex_unlock(&mutex); // Release the mutex
  }
}

void *consumer(void *arg) {
  int i;
  for (i = 0; i < loops; i++) {
    Pthread_mutex_lock(&mutex); // Acquire the mutex for exclusive access
    while (count == 0) // Check if the buffer is empty (use a while loop to
                       // handle spurious wake-ups)
      Pthread_cond_wait(&fill, &mutex); // Wait for the buffer to become full
    int tmp = get();                    // Get a value from the buffer
    Pthread_cond_signal(&empty);  // Signal that the buffer is no longer full
    Pthread_mutex_unlock(&mutex); // Release the mutex
    printf("%d\n", tmp);          // Print the retrieved value
  }
}
