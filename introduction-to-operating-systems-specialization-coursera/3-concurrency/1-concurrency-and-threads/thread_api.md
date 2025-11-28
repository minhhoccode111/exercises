# Threads and Thread API

### Introduction

- This section introduces the core components of the thread API and provides examples of thread creation, synchronization using locks, and signaling using condition variables
- Threads allow for concurrent execution within the same process, sharing the same memory address space

**Key Questions**:

- How does the OS support thread creation and management?
- What are the basic interfaces for creating and controlling threads?
- How do threads coordinate and communicate safely without race conditions?

### Thread Creation

- To implement a multi-threaded program, you must first create new threads
- The POSIX thread creation function (`pthread_create`) is used for this purpose

**Thread Creation Function**:

```c
pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void *), void *arg);
```

1. **Parameters**:

   - `pthread_t *thread`: Pointer to a thread structure, which is initialized by `pthread_create()`
   - `const pthread_attr_t *attr`: Specifies thread attributes such as stack size or scheduling priority. Typically set to `NULL` for default attributes
   - `void *(*start_routine)(void *)`: Function pointer specifying the function where the thread will start execution
   - `void *arg`: Argument passed to the thread’s start routine. Typically, a pointer to a data structure or a value cast to `void *`

2. **Example**:

   - Creating a thread that prints “Hello”:

     ```c
     void *print_message(void *arg) {
         printf("Hello from thread!\n");
         return NULL;
     }

     pthread_t thread;
     pthread_create(&thread, NULL, print_message, NULL);
     ```

   - This code creates a new thread that executes `print_message()` and prints “Hello from thread!”

3. **Usage of `void *` Argument**:
   - `void *` allows passing any type of argument to the thread’s start routine
   - The thread can then cast it back to the expected type

### Thread Completion

- **Thread Join**: To wait for a thread to finish, use the `pthread_join()` function

**Thread Join Function**:

```c
pthread_join(pthread_t thread, void **retval);
```

- `pthread_join()` takes two arguments:

  1. `pthread_t thread`: The thread to wait for
  2. `void **retval`: A pointer to the value returned by the thread

- **Example**:

  - Create a thread, pass it arguments, and wait for it to finish:

    ```c
    pthread_t thread;
    int result;
    pthread_create(&thread, NULL, my_function, &myarg);
    pthread_join(thread, (void **)&result);
    printf("Thread returned %d\n", result);
    ```

  - This code creates a thread, waits for it to finish, and prints its return value

- **Thread Return Values**:
  - Threads can return a value using a pointer (e.g., `void *`)
  - Avoid returning pointers to stack-allocated variables, as they will not be valid after the thread exits

### Locks

- **Mutual Exclusion (Mutex)**:
  - POSIX threads provide mutual exclusion locks (`pthread_mutex_t`) to ensure that only one thread can execute a critical section of code at a time

**Mutex Lock Functions**:

- `pthread_mutex_lock(pthread_mutex_t *mutex)`: Acquires the lock. Blocks if another thread has it
- `pthread_mutex_unlock(pthread_mutex_t *mutex)`: Releases the lock

**Example**:

- Protecting shared data with a mutex:

  ```c
  pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

  pthread_mutex_lock(&lock);
  // Critical section
  pthread_mutex_unlock(&lock);
  ```

- **Common Mistakes**:
  - Failing to initialize locks
  - Not checking return codes for lock functions
  - Calling `pthread_mutex_destroy()` to clean up locks after use

### Condition Variables

- **Condition Variables**: Used for signaling between threads, allowing one thread to wait for a condition to be true before proceeding
- A condition variable is always associated with a lock

**Condition Variable Functions**:

- `pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex)`: Waits for the condition to be signaled. Automatically releases the associated lock while waiting
- `pthread_cond_signal(pthread_cond_t *cond)`: Signals one waiting thread to wake up
- `pthread_cond_broadcast(pthread_cond_t *cond)`: Signals all waiting threads

**Example**:

- Using condition variables to control thread execution:

  ```c
  pthread_mutex_t lock;
  pthread_cond_t cond;

  pthread_mutex_lock(&lock);
  while (!ready) {
      pthread_cond_wait(&cond, &lock);
  }
  pthread_mutex_unlock(&lock);
  ```

- The waiting thread releases the lock while sleeping and reacquires it upon waking up

**Common Pitfalls**:

- Always use a `while` loop to recheck the condition after waking up
- Avoid using simple flags in place of condition variables

### Compiling and Running

- Include the `pthread.h` header and link with the `-pthread` flag
- **Example Command**:

  ```bash
  gcc -pthread main.c -o main
  ./main
  ```

### Thread API Guidelines

1. **Keep it Simple**:

   - Thread creation, locking, and signaling code should be as simple and clear as possible
   - Complex interactions between threads can lead to bugs and difficult-to-debug issues

2. **Initialize Locks and Condition Variables**:

   - Uninitialized locks or condition variables can lead to undefined behavior

3. **Check Return Codes**:

   - Always verify return codes for thread library calls

4. **Carefully Handle Arguments and Return Values**:

   - Avoid passing stack-allocated variables to threads
   - Use dynamically allocated memory or global variables for shared data

5. **Use Condition Variables for Communication**:
   - Use condition variables instead of busy-waiting loops or ad-hoc synchronization methods

### Summary

- **Thread Creation and Joining**: Use `pthread_create()` to spawn new threads and `pthread_join()` to wait for them
- **Synchronization**: Use mutexes to protect shared data and condition variables to signal between threads
- **Best Practices**: Simplify thread interactions, verify return codes, and use condition variables instead of flags

Following these guidelines helps create robust, efficient, and easy-to-maintain multi-threaded programs. Understanding the POSIX thread API is crucial for developing concurrent applications in C/C++ and effectively leveraging multi-core processors

### Questions

1. What is the purpose of the `pthread_create` function in POSIX?

- To create a new thread

The `pthread_create` function in POSIX is used for creating a new thread. This function initializes a thread with specified attributes and a start routine, adding a new, independently executing entity to the program.

2. All code that is multi-threaded uses the join routine

- False

We should note that not all code that is multi-threaded uses the join routine. Not all multi-threaded programming uses the join routine.

3. Fill in the Blanks

- **tryLock** acquires the lock only if is free at the time of invocation

Timedlock with a timeout of 0 is a tryLock. However, trylock is more correct in case.

4. Which of the following are the actions that can be taken with condition variables:

- wait
- signal

Condition variables are useful when some kind of signaling must take place between treads, if one thread is waiting for another to do something before it can continue

5. True of False:

In POSIX, the start routime specified in the `pthread_create` function must always take an integer as an argument and return an integer.

- False

The start routine in the `pthread_create` function is a function pointer in C that typically takes a signle `void*` argument and return a `void*`. This allows for flexibility in the type of argument passed to the thread's start function. The statement is false as it incorrectly suggests that the start routine must always take and return an integer
