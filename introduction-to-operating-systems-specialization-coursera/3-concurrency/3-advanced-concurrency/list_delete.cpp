
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct __Node_t {
  int value;
  struct __Node_t *next;
} Node_t;

Node_t *head = NULL;
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;

void List_Push(int value) {
  Node_t *new_node = (Node_t *)malloc(sizeof(Node_t));
  if (new_node == NULL) {
    fprintf(stderr, "Failed to allocate memory for new node\n");
    return;
  }
  new_node->value = value;
  new_node->next = head;
  head = new_node;
}

int List_Pop() {
  pthread_mutex_lock(&m); // Acquire the lock before accessing the shared list

  if (head == NULL) {
    pthread_mutex_unlock(&m);
    return -1; // List is empty
  }

  Node_t *tmp = head;      // remember old head
  int value = head->value; // and its value
  head = head->next;       // advance head to next pointer
  free(tmp);               // free old head

  pthread_mutex_unlock(&m); // Release the lock after the operation
  return value;             // return value at head
}

int main() {
  // Example usage of List_Pop and List_Push
  List_Push(10);
  List_Push(20);

  printf("Popped: %d\n", List_Pop());
  printf("Popped: %d\n", List_Pop());

  return 0;
}
