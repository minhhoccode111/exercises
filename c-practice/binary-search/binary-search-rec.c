#include <stdio.h>

/*
binary search descriptions
args:
- arr: array must be sorted
- len: array's length must be provided
- target: number to find
- start: first index of current checking array
- end: last index of current checking array
return:
- index of target or -1
*/

int binary_search_rec(int *arr, int len, int target, int start, int end) {
  if (start > end) {
    return -1;
  }

  int mid = (start + end) / 2; // automatically truncate
  int curr = arr[mid];

  if (target == curr) {
    return mid;
  }

  if (target > curr) {
    return binary_search_rec(arr, len, target, mid + 1, end);
  }

  return binary_search_rec(arr, len, target, start, mid - 1);
}

int main(void) {
  int length = 10;
  int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  int start = 0;
  int end = length - 1;

  int result0 = binary_search_rec(arr, length, 0, start, end);
  printf("%d\n", result0); // 0

  int result2 = binary_search_rec(arr, length, 2, start, end);
  printf("%d\n", result2); // 2

  int result4 = binary_search_rec(arr, length, 4, start, end);
  printf("%d\n", result4); // 4

  int result6 = binary_search_rec(arr, length, 6, start, end);
  printf("%d\n", result6); // 6

  int result8 = binary_search_rec(arr, length, 8, start, end);
  printf("%d\n", result8); // 8

  int result10 = binary_search_rec(arr, length, 10, start, end);
  printf("%d\n", result10); // -1

  // 0
  // 2
  // 4
  // 6
  // 8
  // -1
}
