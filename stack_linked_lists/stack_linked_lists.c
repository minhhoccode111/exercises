#include <limits.h> // INT_MIN and INT_MAX
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int value;
  struct node *next;
} node;

typedef struct {
  node *items; // a linked lists
  int size;    // keep track of stack size
} stack;

void initStack(stack *s) {
  s->size = 0;     // init to size 0
  s->items = NULL; // init to empty items list
}

// int isFull() {} // Stack linked lists will not be full?

int isEmpty(stack *s) {
  return s->size == 0; //
}

// takes in a list address point to a node
void freeStackItemsList(node *list) {
  // stop if no node remain
  if (list == NULL) {
    return;
  }

  // recursive with the sub-list
  freeStackItemsList(list->next);
  // free current list
  free(list);
}

int push(stack *s, int x) {
  // allocate memory for a new node
  node *newItem = malloc(sizeof(node));

  // handle fail allocate memory
  if (newItem == NULL) {
    printf("Push to stack failed.\n");

    // free the whole items list in stack
    freeStackItemsList(s->items);

    return INT_MIN; // fail
  }

  // assing the value to node
  newItem->value = x;
  // make newItem's next to hold the existed items list of the stack
  newItem->next = s->items;
  // make the stack's items list point to newItem
  s->items = newItem;
  // keep track of size
  s->size++;
  return 0;
}

int pop(stack *s) {
  // no item in stack
  if (isEmpty(s)) {
    printf("Pop from stack failed.\n");

    return INT_MIN; // fail
  }

  node *currentNode = s->items;              // hold the top
  s->items = s->items->next;                 // move items list pointer 1 step
  int currentNodeValue = currentNode->value; // hold the top's value
  free(currentNode);                         // free top node
  s->size--;                                 // decrease size
  return currentNodeValue;                   // return top's value
}

int peak(stack *s) {
  if (isEmpty(s)) {
    printf("Pop from stack failed.\n");
    return INT_MIN;
  }
  return s->items->value;
}

void printStack(stack *s) {
  // print size
  printf("stack size: %d\n", s->size);

  printf("top\n|\nv\n");

  node *tmp = s->items;

  while (tmp != NULL) {
    printf("%d --> ", tmp->value);
    tmp = tmp->next;
  }
  printf("NULL\n");
}

int main(void) {

  // implement some test cases

  stack *s;
  initStack(s);

  for (int i = 0; i < 10; i++) {
    int result = push(s, i);

    if (result == INT_MIN) // push fail
    {
      return 1;
    }
  }

  printStack(s);

  /*
  stack size: 10
  top
  |
  v
  9 --> 8 --> 7 --> 6 --> 5 --> 4 --> 3 --> 2 --> 1 --> 0 --> NULL
  */

  while (INT_MIN != pop(s)) {
    printf("%d\n", peak(s));
  }

  printStack(s);

  /*
  Pop from stack failed.
  stack size: 0
  top
  |
  v
  NULL
  */
  return 0;
}
