/*
 * THIS WORK MOSTLY THE SAME LIKE NORMAL LINKED_LISTS BUT INSERT VALUES IN
 * SORTED ORDER
 */

#include <limits.h>
#include <stdio.h>

typedef struct {
  int value;
  struct node *next;
} node;

typedef struct {
  int size;
  node *head;
  node *tail;
} list;

// TODO: implement createList, isEmpty, at, push, printList, freeList,

// push an item to a list in sorted order
// return 0 for success, INT_MIN for fail allocate memory
int push(list *l) {
  return 0; // for success
}

int main(void) {
  //
  return 0;
}
