#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int value;
  struct node *next;
} node;

// TODO: implement: create, append(value), prepend(value), size, head, tail,
// at(index), pop(), contains(value), find(value), printList(), insertAt(value,
// index), removeAt(index)

int add(node *list, int val) {
  node *current = malloc(sizeof(node));

  if (current == NULL) {
    return -1;
  }

  current->value = val;
  current->next = list;
  list = current;
  return 0;
}

void freeList(node *list) {
  if (list == NULL) {
    return;
  }

  freeList(list->next);
  free(list);
}

void printList(node *list) {
  //
  return;
}

int main(void) {
  node *list = NULL;

  return 0;
}
