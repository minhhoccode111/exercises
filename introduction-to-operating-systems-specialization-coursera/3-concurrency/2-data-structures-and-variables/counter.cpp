
#include <pthread.h>
#include <stdio.h>

// Counter with lock
typedef struct __counter_t {
  int value;
  pthread_mutex_t lock;
} counter_t;

void init(counter_t *c) {
  c->value = 0;
  pthread_mutex_init(&c->lock, NULL);
}

void increment(counter_t *c) {
  pthread_mutex_lock(&c->lock);
  c->value++;
  printf("Incremented: %d\n", c->value);
  pthread_mutex_unlock(&c->lock);
}

void decrement(counter_t *c) {
  pthread_mutex_lock(&c->lock);
  c->value--;
  printf("Decremented: %d\n", c->value);
  pthread_mutex_unlock(&c->lock);
}

int get(counter_t *c) {
  pthread_mutex_lock(&c->lock);
  int rc = c->value;
  pthread_mutex_unlock(&c->lock);
  return rc;
}

void *threadFunction(void *arg) {
  counter_t *c = (counter_t *)arg;

  for (int i = 0; i < 5; ++i) {
    increment(c);
  }

  for (int i = 0; i < 3; ++i) {
    decrement(c);
  }

  printf("Final value in thread: %d\n", get(c));
  return NULL;
}

int main() {
  counter_t counter;
  init(&counter);

  pthread_t threads[2];

  for (int i = 0; i < 2; ++i) {
    pthread_create(&threads[i], NULL, threadFunction, &counter);
  }

  for (int i = 0; i < 2; ++i) {
    pthread_join(threads[i], NULL);
  }

  printf("Final value in main: %d\n", get(&counter));
  return 0;
}
