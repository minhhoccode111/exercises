#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int value;
  struct node *next;
} node;

typedef struct list {
  int size;
  node *head;
  node *tail;
} list;

/*
 *    head[0]        tail[3]
 *    |              |
 *    v              V
 *    1 -> 2 -> 3 -> 4 -> NULL
 * ^            ^         ^
 * |            |         |
 * prepend      [2]       append
 */

// TODO: implement: create, append(value), prepend(value), size, head, tail,
// at(index), pop(), contains(value), find(value), printList(), insertAt(value,
// index), removeAt(index)

void createList(list *l) {
  l->size = 0;
  l->head = NULL;
  l->tail = NULL;
  return;
}

void append(list *l, int val) {
  //
  return;
}

void prepend(list *l, int val) { return; }

void at(list *l, int index) { return; }

void pop(list *l) { return; }

void contains(list *l, int val) { return; }

void find(list *l, int val) { return; }

void insertAt(list *l, int val, int index) { return; }

void removeAt(list *l, int index) { return; }

void toString(list *l) {
  printf("head --> ");

  for (node *ptr = l->head; ptr != NULL; ptr = ptr->next) {
    printf("%d", ptr->value);
  }

  printf("NULL <-- tail\n");
  return;
}

void freeList(node *head) {
  if (head == NULL) {
    return;
  }
  freeList(head->next);
  free(head);
}

int main(void) {
  list *l = NULL;

  createList(l);

  return 0;
}
