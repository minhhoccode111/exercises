#include <stdio.h>

/*
binary search descriptions
args:
- arr: array must be sorted
- len: array's length must be provided
- target: number to find
return:
- index of target or -1
*/

int binary_search_loop(int *arr, int len, int target) {
  int start = 0;
  int end = len - 1;
  int mid = (start + end) / 2; // automatically truncate

  while (start <= end) {
    int curr = arr[mid];
    if (target == curr) {
      return mid;
    } else if (target > curr) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
    mid = (start + end) / 2; // automatically truncate
  }

  return -1;
}

int main(void) {
  int length = 10;
  int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

  int result0 = binary_search_loop(arr, length, 0);
  printf("%d\n", result0); // 0

  int result2 = binary_search_loop(arr, length, 2);
  printf("%d\n", result2); // 2

  int result4 = binary_search_loop(arr, length, 4);
  printf("%d\n", result4); // 4

  int result6 = binary_search_loop(arr, length, 6);
  printf("%d\n", result6); // 6

  int result8 = binary_search_loop(arr, length, 8);
  printf("%d\n", result8); // 8

  int result10 = binary_search_loop(arr, length, 10);
  printf("%d\n", result10); // -1

  // 0
  // 2
  // 4
  // 6
  // 8
  // -1
}
