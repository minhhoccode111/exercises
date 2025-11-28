# Process API

After reading this document, you will be able to:

- Define what the Process API is,
- Explain how to create and control processes,
- Understand the different system calls related to process creation and management

### What is Process API?

- The Process API is a set of controls provided by the operating system to manage processes
- These include operations like:
  - Create: Starting a new process
  - Destroy: Terminating a process
  - Wait: Waiting for a process to finish
  - Miscellaneous Control: Such as pausing and resuming processes
  - Status: Querying information about a process, such as its current state or how long it has been running

### Key System Calls in Process API

1. fork():

   - Creates a new process, known as the child process, which is almost an identical copy of the parent process
   - The parent receives the PID of the new child process, while the child gets a return code of 0
   - Both processes run simultaneously, but the execution order is non-deterministic

2. wait():

   - Used by a parent process to wait for the child process to finish before continuing its execution
   - This ensures deterministic behavior, where the child completes first, and then the parent resumes

3. exec():
   - Used to replace the current process with a new one. The child process stops executing its original code and starts running the specified program
   - The `exec()` call never returns if successful

### Why Separate fork() and exec()?

- Separating fork() and exec() is important in building a UNIX shell. It allows the shell to set up the environment for a program after calling fork() but before exec()
- This setup enables useful features like redirection (sending output to files) and pipes (chaining processes where one process's output is used as the next process's input)

### Redirection and Pipes

- Redirection: Redirects the output of a program to a file instead of the screen (e.g., `wc p3.c > newfile.txt`)
- Pipes: Allow the output of one process to serve as the input to another process (e.g., `grep foo footester.txt | wc -l`)

### Process Control

- Signals: Processes can be controlled via signals (e.g., `SIGINT` for termination, `SIGTSTP` for pausing)
- kill(): Sends signals to control processes, such as pausing or terminating them

### Users and Process Management

- Superuser (root) has full control over all processes and can issue commands like killing processes that aren't their own
- Regular users can only control processes they initiated

### Useful Tools

- ps: Displays running processes
- top: Shows active processes and their resource consumption
- kill: Terminates processes by sending signals

### Summary

- The Process API includes calls like fork(), exec(), and wait() to manage process creation and control
- Processes are identified by Process IDs (PIDs) and can be controlled through signals
- Redirection and pipes allow for more complex process control in environments like the UNIX shell

### Questions

1. **Process API** is a collection of controls for controlling processes.

The Process API is a set of system calls that may be used by processes.

2.

```c
int fork_or_end() {
  int rc = fork();
  assert(rc >= 0);
  return rc;
}
```

3.

```c
void wait_or_end() {
   int rc = wait(NULL);
   assert(rc > 0);
}
```

4.

- **Fork** - Creates another instance of the same program
- **Exec** - Launches a different program

5. What is the benefit of separating the fork() and exec() calls?

- Run code after calling **fork()** but before calling **exec()**.

The benefit of separating the two system calls is that you can call code after the `fork()` but before `exec()`.

6.

- `kill()` - sends pause, or terminate, signals to a process
- `wait()` - delays execution until another process finishes
- `fork()` - creates a new, nearly-identical process
- `exec()` - creates a new, unique process

7.

- `Root`
- `Superuser`

The superuser and root users do not have any restrictions placed on them.

8. Which branch is for the parent branch?

- Branch B

When you call fork() the OS returns a number great than 0 for the parent. So Brach B would be the correct answer.

9. Which is branch is for the child process?

- Branch A

The operating systems returns 0 for the child process after calling fork(). So the correct answer is Branch A.

10. Which branch is for when the fork fails?

- Branch C

11. How many times will the program print hello if you add the following code to the IDE?

```c
  fork();
  fork();
  printf("hello\n");
```

- 4

12. How many times will the program print hello if you add the following code to the IDE?

```c
  fork();
  fork();
  fork();
  printf("hello\n");
```

- 8

13. What is the general rule for how many time the program will print `hello` when you call `fork()` _n_ number of times?

- 2^n

14. Where do you add wait(NULL); in the program so that the output is:

```
Hello from child
Hello from parent
```

- Put wait(NULL); in the else branch.

15.

```c
#include<stdio.h>
#include<sys/wait.h>
#include<unistd.h>

int main() {
  int id = fork();
  int n;

  if (id == 0) {
    n = 1;
  } else {
    wait(NULL);
    n = 6;
  }

  int i;
  for (i = n; i < n + 5; i++) {
    printf("%d ", i);
  }

  return 0;
}
```
