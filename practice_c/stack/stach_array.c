#include <stdio.h>
#include <stdlib.h>

#define MAX 100 // size 100

typedef struct {
  int items[MAX]; // an array max size 100
  int top;        // number of items in stack
} Stack;          // named Stack_array

// function to init the stack takes a pointer point to a stack
void initStack(Stack *s) {
  // stack's top is current index
  // equal to -1 so the first one be added to it will be 0
  s->top = -1;
}

int size(Stack *s) {
  // top index + 1
  return s->top + 1;
}

int isFull(Stack *s) {
  // if size of the stack == MAX
  return size(s) == MAX;
}

int isEmpty(Stack *s) {
  // if sizes of the stack == 0
  return size(s) == 0;
}

void push(Stack *s, int x) {
  // check if the stack is full
  if (isFull(s)) {
    printf("Error: Stack is full\n");
    return;
  }

  // increase top then assign
  s->items[++s->top] = x;
}

int pop(Stack *s) {
  // check if the stack is empty
  if (isEmpty(s)) {
    printf("Error: Stack is empty\n");
    return -1; // ?what if items array contain a -1
  }

  // return current then decrease
  return s->items[s->top--];
}

int peek(Stack *s) {
  // check if the stack is empty
  if (isEmpty(s)) {
    printf("Error: Stack is empty\n");
    return -1; // ?what if items array contain a -1
  }

  // return item at the top (current index) of the stack
  return s->items[s->top];
}

int main(void) {
  // TODO: add some test cases
  Stack s;
  initStack(&s);

  push(&s, 10);
  push(&s, 20);
  push(&s, 30);

  printf("Top element: %d\n", peek(&s));

  printf("Popped element: %d\n", pop(&s));
  printf("Popped element: %d\n", pop(&s));
  printf("Popped element: %d\n", pop(&s));

  if (isEmpty(&s))
    printf("Stack is empty\n");
  else
    printf("Stack is not empty\n");

  return 0;
}
