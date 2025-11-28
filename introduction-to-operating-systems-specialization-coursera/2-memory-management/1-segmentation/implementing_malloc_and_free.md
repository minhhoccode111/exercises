# Implementing `malloc()` and `free()` for Dynamic Memory Management

### Introduction

- This section explains how to implement the `malloc()` and `free()` functions, commonly used for dynamic memory allocation and deallocation in C
- We’ll look at how memory blocks are represented, how the allocator manages free and used blocks, and how splitting and merging blocks can help efficiently handle memory

### Representing Memory Blocks

- Each memory block has a **metadata header** that stores information about the block

  - **Metadata Block Structure**:

    ```c
    struct block {
        size_t size;    // Size of the memory block
        int free;       // Indicates if the block is free (1) or not (0)
        struct block *next; // Pointer to the next metadata block
    };
    ```

  - This metadata is stored just before the actual allocated memory and helps manage the linked list of free and allocated blocks

### The Header File

- Create a header file (`mymalloc.h`) to include necessary definitions and libraries:

  ```c
  #include <stdio.h>
  #include <stddef.h>
  ```

  - Declare the memory array that will be managed:

    ```c
    char memory[20000]; // 20,000 bytes of memory for allocation
    ```

- Initialize a pointer of type `block` called `freeList` to point to the starting address of the memory array:

  ```c
  struct block *freeList = (void*)memory;
  ```

### Memory Management Functions

- **Function Definitions**:
  - `void initialize();` : Initializes the memory
  - `void split(struct block *fitting_slot, size_t size);` : Splits a large free block into two
  - `void *MyMalloc(size_t noOfBytes);` : Allocates memory of the requested size
  - `void merge();` : Merges adjacent free blocks
  - `void MyFree(void *ptr);` : Frees a previously allocated memory block

### Function Implementations

1. **Initialize**:

   - Initializes the memory and sets up the first metadata block
   - The `freeList` pointer points to the start of the memory array:

     ```c
     void initialize() {
         freeList->size = 20000 - sizeof(struct block); // Allocate remaining space
         freeList->free = 1; // Block is free
         freeList->next = NULL; // No other blocks yet
     }
     ```

2. **Split**:

   - Splits a free block into two smaller blocks if the free block is larger than the requested size
   - Creates a new metadata block for the remaining free space:

     ```c
     void split(struct block *fitting_slot, size_t size) {
         struct block *new = (void*)((void*)fitting_slot + size + sizeof(struct block));
         new->size = (fitting_slot->size) - size - sizeof(struct block);
         new->free = 1;
         new->next = fitting_slot->next;
         fitting_slot->size = size;
         fitting_slot->free = 0;
         fitting_slot->next = new;
     }
     ```

3. **`MyMalloc()`**:

   - Allocates memory using the First-Fit algorithm to find the first suitable free block:

     ```c
     void *MyMalloc(size_t noOfBytes) {
         struct block *curr, *prev;
         void *result;

         // Initialize memory if not already initialized
         if (!(freeList->size)) {
             initialize();
             printf("Memory initialized\n");
         }

         curr = freeList;
         // Search for a suitable free block
         while (((curr->size) < noOfBytes || (curr->free) == 0) && (curr->next != NULL)) {
             prev = curr;
             curr = curr->next;
             printf("One block checked\n");
         }

         // Allocate exact fitting block
         if (curr->size == noOfBytes) {
             curr->free = 0;
             result = (void*)(++curr);
             printf("Exact fitting block allocated\n");
             return result;
         }
         // Split if the block is larger than requested size
         else if ((curr->size) > (noOfBytes + sizeof(struct block))) {
             split(curr, noOfBytes);
             result = (void*)(++curr);
             printf("Fitting block allocated with a split\n");
             return result;
         }
         // No suitable block found
         else {
             result = NULL;
             printf("Sorry. No sufficient memory to allocate\n");
             return result;
         }
     }
     ```

4. **Merge**:

   - Combines consecutive free blocks to reduce fragmentation:

     ```c
     void merge() {
         struct block *curr = freeList;
         while (curr && curr->next != NULL) {
             if ((curr->free) && (curr->next->free)) {
                 curr->size += (curr->next->size) + sizeof(struct block);
                 curr->next = curr->next->next;
             }
             curr = curr->next;
         }
     }
     ```

5. **`MyFree()`**:

   - Frees the memory block and merges adjacent free blocks:

     ```c
     void MyFree(void *ptr) {
         if (((void*)memory <= ptr) && (ptr <= (void*)(memory + 20000))) {
             struct block* curr = ptr;
             --curr;
             curr->free = 1;
             merge(); // Merge adjacent free blocks
         } else {
             printf("Please provide a valid pointer allocated by MyMalloc\n");
         }
     }
     ```

### Running the Implementation

- Compile the program:

  ```bash
  gcc Main.c -o Main
  ```

- Run the program to see the custom `malloc()` and `free()` in action:

  ```bash
  ./Main
  ```

### Summary

- Implemented a simple dynamic memory allocator using `malloc()` and `free()`
- Functions covered:
  - **`initialize()`**: Sets up the initial memory block
  - **`split()`**: Splits a free block to accommodate an allocation
  - **`MyMalloc()`**: Allocates memory using the First-Fit strategy
  - **`merge()`**: Merges consecutive free blocks
  - **`MyFree()`**: Frees a memory block and merges adjacent free blocks
- **Key Concepts**: Metadata blocks, linked list management of memory, splitting and coalescing of free space

This approach provides a foundational understanding of how dynamic memory allocation works under the hood, laying the groundwork for more advanced memory management techniques
