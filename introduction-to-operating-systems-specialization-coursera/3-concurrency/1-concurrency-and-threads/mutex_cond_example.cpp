#include <iostream>
#include <pthread.h>
#include <unistd.h> // For sleep()

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER; // Mutex
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;   // Condition variable

// Shared variable
bool ready = false;

// Thread function that waits for the condition
void *wait_thread(void *arg) {
  pthread_mutex_lock(&lock);

  while (!ready) { // Using while loop for spurious wake-ups
    std::cout << "Waiting thread is waiting for the condition..." << std::endl;
    pthread_cond_wait(&cond, &lock);
  }

  std::cout << "Waiting thread received the signal." << std::endl;

  pthread_mutex_unlock(&lock);
  return NULL;
}

// Thread function that signals the condition
void *signal_thread(void *arg) {
  sleep(1); // Sleep for demonstration purposes

  pthread_mutex_lock(&lock);

  ready = true;
  std::cout << "Signaling thread is signaling the condition..." << std::endl;
  pthread_cond_signal(&cond);

  pthread_mutex_unlock(&lock);
  return NULL;
}

int main() {
  pthread_t waitThread, signalThread;

  // Create threads
  pthread_create(&waitThread, NULL, wait_thread, NULL);
  pthread_create(&signalThread, NULL, signal_thread, NULL);

  // Wait for threads to finish
  pthread_join(waitThread, NULL);
  pthread_join(signalThread, NULL);

  // Clean up
  pthread_mutex_destroy(&lock);
  pthread_cond_destroy(&cond);

  return 0;
}
