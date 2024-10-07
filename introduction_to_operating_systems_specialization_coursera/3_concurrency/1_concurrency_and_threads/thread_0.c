
#include <pthread.h>
#include <stdio.h>

void *mythread(void *arg) {
  printf("%s\n", (char *)arg);
  return NULL;
}

int main() {
  pthread_t thread1, thread2;

  // Create two threads
  pthread_create(&thread1, NULL, mythread, "Thread1");
  pthread_create(&thread2, NULL, mythread, "Thread2");

  // Wait for the threads to complete
  pthread_join(thread1, NULL);
  pthread_join(thread2, NULL);

  return 0;
}
