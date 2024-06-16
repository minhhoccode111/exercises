#include <limits.h>
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
  // NOTE: can maintain a next_to_tail pointer to have a pop() with BigO(1)
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

// init the list with default values
void createList(list *l) {
  l->size = 0;
  l->head = NULL;
  l->tail = NULL;
  return;
}

// return boolean identify list is empty
int isEmpty(list *l) {
  if (l->size == 0) {
    return 1;
  }
  return 0;
}

// add node at the end of the list
// return 0 for success, INT_MIN for fail allocate memory
int append(list *l, int val) {
  node *newNode = malloc(sizeof(node));
  if (newNode == NULL) {
    return INT_MIN;
  }

  newNode->value = val;
  newNode->next = NULL;

  if (isEmpty(l)) {
    l->head = newNode;
    l->tail = newNode;
    l->size++;
    return 0;
  }

  l->tail->next = newNode;
  l->tail = newNode;
  l->size++;
  return 0;
}

// add node at the beginning of the list
// return 0 for success, INT_MIN for fail allocate memory
int prepend(list *l, int val) {
  node *newNode = malloc(sizeof(node));
  if (newNode == NULL) {
    return INT_MIN;
  }

  newNode->value = val;
  newNode->next = l->head;
  l->head = newNode;

  if (isEmpty(l)) {
    l->tail = newNode;
  }

  l->size++;
  return 0;
}

// return value at index in list, INT_MIN if not found
int at(list *l, int index) {
  node *currNode = l->head;
  int currIndex = 0;
  while (currNode != NULL && currIndex <= index) {
    if (currIndex == index) {
      return currNode->value;
    }
    currIndex++;
    currNode = currNode->next;
  }

  return INT_MIN;
}

// return value of the node at the beginning of the list, INT_MIN if list empty
int shift(list *l) {
  // list size = 0
  if (isEmpty(l)) {
    return INT_MIN;
  }

  node *currNode = l->head;
  // special case, size = 1
  if (l->size == 1) {
    l->head = NULL;
    l->tail = NULL;
    int currValue = currNode->value;
    free(currNode);
    l->size--;
    return currValue;
  }

  // list size > 1
  l->head = currNode->next;
  int currValue = currNode->value;
  free(currNode);
  l->size--;
  return currValue;
}

// return value of the node at the end of the list, INT_MIN if list empty
int pop(list *l) {
  // list size = 0
  if (isEmpty(l)) {
    return INT_MIN;
  }

  node *currNode = l->head; // list[0]

  // special case, size = 1
  if (l->size == 1) {
    int currValue = currNode->value;
    l->head = NULL;
    l->tail = NULL;
    free(currNode);
    l->size--;
    return currValue;
  }

  // list size > 1
  // move till currNode next to tail
  while (currNode->next != l->tail) {
    currNode = currNode->next;
  }

  // hold the tail node
  node *tmpNode = currNode->next;
  l->tail = currNode;
  l->tail->next = NULL;
  int tmpValue = tmpNode->value;
  free(tmpNode);
  l->size--;
  return tmpValue;
}

// return boolean identify if value is in the list
int contains(list *l, int val) {
  node *currNode = l->head;
  while (currNode != NULL) {
    if (currNode->value == val) {
      return 1;
    }
    currNode = currNode->next;
  }
  return 0;
}

// return index of a value in list, -1 if not found
int find(list *l, int val) {
  int index = 0;
  node *currNode = l->head;
  while (currNode != NULL) {
    if (currNode->value == val) {
      return index;
    }
    index++;
    currNode = currNode->next;
  }

  return -1;
}

// insert a value at a specific index in the list
// return 0 for success, INT_MIN for error
int insertAt(list *l, int val, int index) {
  // index must >= 0 and index must <= size to be a valid insertion
  if (l->size < index || index < 0) {
    return INT_MIN;
  }

  node *newNode = malloc(sizeof(node));
  if (newNode == NULL) {
    return INT_MIN;
  }

  newNode->value = val;

  // special case index = 0, like prepend
  if (index == 0) {
    newNode->next = l->head;
    l->head = newNode;

    // size = 0 at the same time
    if (isEmpty(l)) {
      l->tail = newNode;
    }
    l->size++;
    return 0;
  }

  // index > 0  and also size > 0
  int currIndex = 1;
  node *prevNode = l->head; // list[0]
  // move to the insert position
  while (currIndex != index) {
    currIndex++;
    prevNode = prevNode->next;
  }

  // then shift node at currIndex to put newNode
  newNode->next = prevNode->next;
  prevNode->next = newNode;
  l->size++;
  return 0;
}

// remove a node at a specific index in the list
// return 0 for success, INT_MIN for error or not found
int removeAt(list *l, int index) {
  // index must >= 0 and index must < size to be a valid remove
  if (l->size <= index || index < 0) {
    return INT_MIN;
  }

  // special case, size == 1, index == 0 (because index < size implicitly)
  if (l->size == 1) {
    free(l->head);
    l->head = NULL;
    l->tail = NULL;
    l->size--;
    return 0;
  }

  // size > 1 and index > 0
  int currIndex = 1;
  node *prevNode = l->head; // list[0]
  // move to the remove position
  while (currIndex != index) {
    currIndex++;
    prevNode = prevNode->next;
  }

  node *tmp = prevNode->next;
  prevNode->next = tmp->next;
  free(tmp);
  l->size--;
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

  // available props: size, head, tail
  // available methods: create(), append(val), prepend(val) isEmpty(),
  // at(index), pop(), contains(val), find(val), printList(),
  // insertAt(val, index), removeAt(index)

  list *l = malloc(sizeof(list));
  if (l == NULL) {
    printf("Failed to allocate memory for the list.\n");
    return 1;
  }

  createList(l);

  printList(l);

  // Append values to the list, check for memory allocation success
  if (append(l, 10) == INT_MIN) {
    printf("Failed to append 10 to the list.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("append 10\n");

  printList(l);

  if (append(l, 20) == INT_MIN) {
    printf("Failed to append 20 to the list.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("append 20\n");

  printList(l);

  if (append(l, 30) == INT_MIN) {
    printf("Failed to append 30 to the list.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("append 30\n");

  printList(l);

  // Prepend value to the list, check for memory allocation success
  if (prepend(l, 5) == INT_MIN) {
    printf("Failed to prepend 5 to the list.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("prepend 5\n");

  printList(l);

  // Get value at a specific index
  int val = at(l, 2);
  printf("at index 2 of the list: %d\n", val);

  printList(l);

  // Check if a value exists in the list
  int exists = contains(l, 30);
  printf("the list now exists 30: %d\n", exists);

  printList(l);

  // Find the index of a value
  int index = find(l, 20);
  if (index == -1) {
    printf("Value 20 not found in the list.\n");
  }
  printf("index of 20 in the list: %d\n", index);

  printList(l);

  // Insert a value at a specific index, check for memory allocation success
  if (insertAt(l, 15, 2) == INT_MIN) {
    printf("Failed to insert 15 at index 2.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("insert 15 at index 2\n");

  printList(l);

  // Remove a value at a specific index, check for valid index
  if (removeAt(l, 3) == INT_MIN) {
    printf("Failed to remove value at index 3.\n");
    freeList(l->head);
    free(l);
    return 1;
  }
  printf("remove at index 3\n");

  // Pop (remove from the end)
  printList(l);
  int poppedVal = pop(l);
  printf("pop a value\n");

  // Shift (remove from the beginning)
  printList(l);
  int shiftedVal = shift(l);
  printf("shift a value\n");

  printList(l);

  freeList(l->head);
  free(l);

  /*
  [mhc@archlinux linked_lists]$ cc linked_lists.c
  [mhc@archlinux linked_lists]$ ./a.out
  head --> NULL <-- tail
  append 10
  head --> 10 --> NULL <-- tail
  append 20
  head --> 10 --> 20 --> NULL <-- tail
  append 30
  head --> 10 --> 20 --> 30 --> NULL <-- tail
  prepend 5
  head --> 5 --> 10 --> 20 --> 30 --> NULL <-- tail
  at index 2 of the list: 20
  head --> 5 --> 10 --> 20 --> 30 --> NULL <-- tail
  the list now exists 30: 1
  head --> 5 --> 10 --> 20 --> 30 --> NULL <-- tail
  index of 20 in the list: 2
  head --> 5 --> 10 --> 20 --> 30 --> NULL <-- tail
  insert 15 at index 2
  head --> 5 --> 10 --> 15 --> 20 --> 30 --> NULL <-- tail
  remove at index 3
  head --> 5 --> 10 --> 15 --> 30 --> NULL <-- tail
  pop a value
  head --> 5 --> 10 --> 15 --> NULL <-- tail
  shift a value
  head --> 10 --> 15 --> NULL <-- tail
  */
}
