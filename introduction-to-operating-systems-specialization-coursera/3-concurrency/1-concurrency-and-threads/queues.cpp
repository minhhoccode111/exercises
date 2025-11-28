
// Define a structure for the lock
typedef struct __lock_t {
  int flag;   // 0 if lock is available, 1 if locked
  int guard;  // To prevent concurrent guard lock
  queue_t *q; // Queue to hold waiting threads
} lock_t;

// Initialize the lock
void lock_init(lock_t *m) {
  m->flag = 0;      // Lock is initially available
  m->guard = 0;     // Guard is initially free
  queue_init(m->q); // Initialize the queue for waiting threads
}

// Acquire the lock
void lock(lock_t *m) {
  while (TestAndSet(&m->guard, 1) == 1)
    ; // Acquire guard lock by spinning

  if (m->flag == 0) {
    m->flag = 1;  // Lock is acquired
    m->guard = 0; // Release the guard lock
  } else {
    queue_add(m->q, gettid()); // Add current thread to the waiting queue
    m->guard = 0;              // Release the guard lock
    park();                    // Put the thread to sleep
  }
}

// Release the lock
void unlock(lock_t *m) {
  while (TestAndSet(&m->guard, 1) == 1)
    ; // Acquire guard lock by spinning

  if (queue_empty(m->q))
    m->flag = 0; // Release the lock; no one wants it
  else
    unpark(queue_remove(m->q)); // Wake up the next waiting thread
  m->guard = 0;                 // Release the guard lock
}
