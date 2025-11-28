
#include <pthread.h>

// Maximum heap size
#define MAX_HEAP_SIZE (1024)

// How many bytes of the heap are free?
int bytesLeft = MAX_HEAP_SIZE;

// Need lock and condition too
cond_t c;
mutex_t m;

void *allocate(int size) {
  Pthread_mutex_lock(&m);
  while (bytesLeft < size)
    Pthread_cond_wait(&c, &m);

  void *ptr = ...; // Get memory from the heap
  bytesLeft -= size;
  Pthread_mutex_unlock(&m);
  return ptr;
}

void free(void *ptr, int size) {
  Pthread_mutex_lock(&m);
  bytesLeft += size;
  Pthread_cond_signal(&c); // Whom to signal??
  Pthread_mutex_unlock(&m);
}
