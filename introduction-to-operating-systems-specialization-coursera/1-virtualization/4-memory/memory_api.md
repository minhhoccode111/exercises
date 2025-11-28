# Memory Allocation Interfaces in UNIX Systems

### Introduction

- This section covers the memory allocation interfaces found in UNIX systems
- **Key Questions**:
  - What types of interfaces are often used to allocate and manage memory?
  - What mistakes should be avoided?
- Provides an empty `.c` program and terminal for hands-on practice

### Types of Memory

1. **Stack Memory**:

   - Managed implicitly by the compiler
   - Declaring memory on the stack is simple, such as `int x;` within a function
   - The compiler ensures there is enough stack space and deallocates memory when the function returns
   - **Limitation**: Stack memory is not long-lived; data is lost after returning from a function

2. **Heap Memory**:
   - Managed explicitly by the programmer
   - Use `malloc()` to allocate memory on the heap, such as `int *x = (int *)malloc(sizeof(int));`
   - Heap memory must be manually deallocated using `free()`
   - **Challenge**: More complex to manage compared to stack memory

### `malloc()` and Memory Allocation

- **`malloc()`**: Allocates a specified number of bytes in memory

  - Returns a reference to the allocated space or `NULL` on failure
  - Include the `<stdlib.h>` header to use `malloc()`
  - Example:

    ```c
    double *d = (double *)malloc(sizeof(double));
    ```

  - **Common Practices**:
    - Use the `sizeof()` operator to determine the amount of space needed
    - Be cautious when using `sizeof()` with variable names, as it may not always work as expected

### `free()` and Memory Deallocation

- **`free()`**: Used to deallocate heap memory that is no longer in use
  - Takes a pointer returned by `malloc()` as input
  - Memory-allocation library tracks the size of allocated areas

### Common `malloc()` and `free()` Errors

1. **Forgetting to Allocate Memory**:

   - Calling a routine like `strcpy()` without allocating memory for the destination
   - Results in a segmentation fault

2. **Not Allocating Enough Memory**:

   - Causes buffer overflows when copying data
   - May result in a program crash or overwriting critical variables

3. **Forgetting to Initialize Allocated Memory**:

   - Results in uninitialized reads, potentially leading to unexpected behavior

4. **Forgetting to Free Memory**:

   - Results in memory leaks, which are particularly problematic for long-running applications

5. **Other Mistakes Using `free()`**:
   - **Dangling Pointer**: Freeing memory before you’re done with it
   - **Double Free**: Freeing memory twice, leading to program crashes
   - **Incorrect `free()` Usage**: Passing values that were not allocated with `malloc()`

### Underlying OS Support: `brk` and `sbrk`

- `malloc()` and `free()` are library calls, not system calls
- **`brk` and `sbrk`**:

  - Used to control how much memory is allocated to the process’s data segment
  - **`brk()`**: Sets the program break to increase or decrease the heap’s size
  - **`sbrk()`**: Takes an increment to adjust the break value

- **Warning**: Do not call `brk()` or `sbrk()` directly. Use `malloc()` and `free()` instead

### Underlying OS Support: `mmap()`

- **`mmap()`**: Used to map files or devices into memory
  - Can establish an anonymous memory region within a program
  - Allows control over a memory region as if it were a heap

### Additional Memory Functions

1. **`calloc()`**:

   - Allocates memory and initializes it to zero
   - Useful when needing zeroed memory for arrays
   - Example:

     ```c
     int *ptr = (int *)calloc(5, sizeof(int));  // Allocates space for 5 integers
     ```

2. **`realloc()`**:

   - Resizes a previously allocated memory block
   - Copies the contents of the old memory to a new location and deallocates the old memory
   - Useful when adding elements to an existing array
   - Example:

     ```c
     int *ptr = realloc(ptr, new_size);
     ```

### Summary

- Explored memory management interfaces in UNIX systems
- **Key Interfaces**:
  - `malloc()`: Allocates memory on the heap
  - `free()`: Deallocates heap memory
  - `brk()` and `sbrk()`: Underlying system calls used by `malloc()` (not for direct use)
  - `mmap()`: Allocates memory from the OS
  - `calloc()`: Allocates and zeros memory
  - `realloc()`: Resizes allocated memory
- Discussed common errors and best practices for memory allocation and deallocation in C programming

### Hands-On Exercises

- **Practice with the provided `.c` files** (`sbrk.c`, `mmap.c`, `calloc.c`, and `realloc.c`) to understand memory allocation and deallocation
- Experiment with different allocation and deallocation scenarios to observe behavior and identify common pitfalls
