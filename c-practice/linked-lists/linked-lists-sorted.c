/*
 * THIS WORK MOSTLY THE SAME LIKE NORMAL LINKED_LISTS BUT INSERT VALUES IN
 * SORTED ORDER ASCENDANT
 */

#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int value;
  struct node *next;
} node;

typedef struct {
  int size;
  node *head;
  node *tail;
} list;

// TODO: implement createList, isEmpty, at, removeAt, find, push, printList,
// freeList,

void createList(list *l) {
  l->size = 0;
  l->head = NULL;
  l->tail = NULL;
}

// push an item to a list in sorted order
// return 0 for success, INT_MIN for fail allocate memory
int add(list *l, int val) {
  // create new node
  node *currNode = malloc(sizeof(node));
  // check if success allocate memory
  if (currNode == NULL) {
    return INT_MIN;
  }

  currNode->value = val;

  // check for size special case (size == 0)
  // if size == 0, point both head and tail to node
  if (l->size == 0) {
    currNode->next = NULL;
    l->head = currNode;
    l->tail = currNode;
    l->size++;
    return 0;
  }

  int i = 0;
  // if size != 0, move from start to end to insert
  for (node *ptr = l->head; ptr != NULL; ptr = ptr->next) {
    // check for insert special cases (insert at list[0] or list[list->size -
    // 1])
    // if val < list[0], make new head
    if (i == 0 && val <= ptr->value) {
      currNode->next = l->head;
      l->head = currNode;
      goto end_loop;
    }
    // if val > list[list->size - 1], make new tail, or reach the end
    if (ptr->next == NULL) {
      currNode->next = NULL;
      l->tail->next = currNode;
      l->tail = currNode;
      goto end_loop;
    }
    // else find position where val > current and val < next, then insert
    if (ptr->value <= val && val <= ptr->next->value) {
      currNode->next = ptr->next;
      ptr->next = currNode;
      goto end_loop;
    }

    i++;
  }
end_loop:
  // last increase size and return success (0)
  l->size++;
  return 0;
}

void printList(list *l) {
  printf("head --> ");

  for (node *ptr = l->head; ptr != NULL; ptr = ptr->next) {
    printf("%d --> ", ptr->value);
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
  list *l = malloc(sizeof(list));

  createList(l);

  add(l, 1);
  add(l, 11111);
  add(l, 111);
  add(l, 1111);
  add(l, 11);
  add(l, 111111);

  printList(l);

  // head --> 1 --> 11 --> 111 --> 1111 --> 11111 --> 111111 --> NULL <-- tail

  freeList(l->head);

  return 0;
}
