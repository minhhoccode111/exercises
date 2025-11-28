#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

#define MEMORY_SIZE 10000 // adjust as needed
#define METADATA_SIZE sizeof(struct BlockMetadata)

static char memory[MEMORY_SIZE];
static bool initialized = false;

struct BlockMetadata {
  size_t size;
  bool is_free;
  struct BlockMetadata *next;
};

void initialize_memory() {
  struct BlockMetadata *initial_block = (struct BlockMetadata *)memory;
  initial_block->size = MEMORY_SIZE - METADATA_SIZE;
  initial_block->is_free = true;
  initial_block->next = NULL;
  initialized = true;
}

void *MyMalloc(size_t noOfBytes) {
  if (!initialized) {
    initialize_memory();
  }

  struct BlockMetadata *current = (struct BlockMetadata *)memory;
  while (current != NULL) {
    if (current->is_free && current->size >= noOfBytes) {
      if (current->size == noOfBytes) {
        current->is_free = false;
        return (void *)((char *)current + METADATA_SIZE);
      } else if (current->size > noOfBytes + METADATA_SIZE) {
        struct BlockMetadata *new_block =
            (struct BlockMetadata *)((char *)current + METADATA_SIZE +
                                     noOfBytes);
        new_block->size = current->size - noOfBytes - METADATA_SIZE;
        new_block->is_free = true;
        new_block->next = current->next;

        current->size = noOfBytes;
        current->is_free = false;
        current->next = new_block;

        return (void *)((char *)current + METADATA_SIZE);
      }
    }
    current = current->next;
  }

  printf("Sorry. No sufficient memory to allocate.\n");
  return NULL;
}

void MyFree(void *ptr) {
  if (ptr == NULL || (char *)ptr < memory ||
      (char *)ptr >= memory + MEMORY_SIZE) {
    printf("Please provide a valid allocated pointer\n");
    return;
  }

  struct BlockMetadata *block_to_free =
      (struct BlockMetadata *)((char *)ptr - METADATA_SIZE);
  block_to_free->is_free = true;

  // merge free blocks
  struct BlockMetadata *current = (struct BlockMetadata *)memory;
  while (current != NULL && current->next != NULL) {
    if (current->is_free && current->next->is_free) {
      current->size += current->next->size + METADATA_SIZE;
      current->next = current->next->next;
    } else {
      current = current->next;
    }
  }
}
