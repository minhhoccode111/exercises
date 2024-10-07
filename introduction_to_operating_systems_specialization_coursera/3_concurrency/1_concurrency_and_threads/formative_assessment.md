# Formative Assessment

1. Do threads share memory?

- True

Threads share memory. It is safe if both threads are reading.

2. What is the role of the os scheduler?

- The OS scheduler determines how to move processes between the ready and run queues
- Schedulers are special system software which handle process scheduling in various ways

Both answers at the beginning are correct when referring to OS schedulers but last one is a reference to parallelism

3. What are the two types of actions taken by a condition variable:

- Wait
- Signal

A conditional variable in operating system programming is a special kind of variable that is used to determine if a certain condition has been met or not. The two main actions are `wait` and `signal`

4. A thread waits for a lock that is already held

- By repeatedly checking the flag

A thread waits for a lock that is already held: by repeatedly checking the value of flag

5. What does `Lock()` return when a the lock is being held?

- `1`

`Lock()` returns `0` when the lock is not held
