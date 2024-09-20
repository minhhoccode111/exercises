// comment

/*
 * multi line comment
 */

enum days { sun, mon, tue, wed, thu, fri, sat };

enum days_values {
  SUN = 1,
  MON, // 2
  TUE, // 3
  WED = 99,
  THU, // 100
  FRI, // etc
  SAT
};

// import headers, system
#include <stdio.h>
#include <string.h>

// import own header
#include "cs50.h"

void function_1();
int function_2();

int function_3(int a, int b);

int main_0(void) { return 0; }

int main_1(int argc, char **argv) {
  printf("%d\n", 0);

  int input;
  scanf("%d", &input);

  return 0;
}

int int_x = 0;

short short_x = 0;

char char_x = 'x';

char char_y = 'y';

long long_x = 0;
long long long_long_x = 0;

float float_x = 0.0f;

double double_x = 0.0;

unsigned short short_u_x;

unsigned int int_u_x;

unsigned long long long_long_u_x;

int char_o = 'O';
int char_a = 'A';

// printf("%zu\n", sizeof(int));

int my_array_0[20] = {0}; // [0, 0, ..., 0]

int my_array_1[5] = {1, 2}; // {1, 2, 0, 0, 0}

// assign the array at the same line without to tell the length
int my_array_2[] = {0};

size_t my_array_size = sizeof(my_array_0) / sizeof(my_array_0[1]);

// my_array_0[0];

// printf("Enter the array size: ");

// Multi-dimensional arrays:
int multi_array[2][5] = {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 0}};
