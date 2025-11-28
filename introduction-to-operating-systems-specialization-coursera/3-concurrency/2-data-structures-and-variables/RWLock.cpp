
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

typedef struct _rwlock_t {
  sem_t lock;      // Binary semaphore (basic lock)
  sem_t writelock; // Allow ONE writer/MANY readers
  int readers;     // Number of readers in critical section
} rwlock_t;

void rwlock_init(rwlock_t *rw) {
  rw->readers = 0;
  sem_init(&rw->lock, 0, 1);
  sem_init(&rw->writelock, 0, 1);
}

void rwlock_acquire_readlock(rwlock_t *rw) {
  sem_wait(&rw->lock);
  rw->readers++;
  if (rw->readers == 1) // First reader gets writelock
    sem_wait(&rw->writelock);
  sem_post(&rw->lock);
  printf("Reader acquired read lock\n");
}

void rwlock_release_readlock(rwlock_t *rw) {
  sem_wait(&rw->lock);
  rw->readers--;
  if (rw->readers == 0) // Last reader lets it go
    sem_post(&rw->writelock);
  sem_post(&rw->lock);
  printf("Reader released read lock\n");
}

void rwlock_acquire_writelock(rwlock_t *rw) {
  sem_wait(&rw->writelock);
  printf("Writer acquired write lock\n");
}

void rwlock_release_writelock(rwlock_t *rw) {
  sem_post(&rw->writelock);
  printf("Writer released write lock\n");
}

void *reader(void *arg) {
  rwlock_t *rw = (rwlock_t *)arg;
  rwlock_acquire_readlock(rw);
  // Simulate reading operation
  rwlock_release_readlock(rw);
  return NULL;
}

void *writer(void *arg) {
  rwlock_t *rw = (rwlock_t *)arg;
  rwlock_acquire_writelock(rw);
  // Simulate writing operation
  rwlock_release_writelock(rw);
  return NULL;
}

int main() {
  rwlock_t rwlock;
  rwlock_init(&rwlock);

  pthread_t r1, r2, w1, w2;
  pthread_create(&r1, NULL, reader, &rwlock);
  pthread_create(&r2, NULL, reader, &rwlock);
  pthread_create(&w1, NULL, writer, &rwlock);
  pthread_create(&w2, NULL, writer, &rwlock);

  pthread_join(r1, NULL);
  pthread_join(r2, NULL);
  pthread_join(w1, NULL);
  pthread_join(w2, NULL);

  return 0;
}
