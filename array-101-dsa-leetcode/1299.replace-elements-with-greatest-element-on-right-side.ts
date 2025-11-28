/*
Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

After doing so, return the array.

Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation: 
- index 0 --> the greatest element to the right of index 0 is index 1 (18).
- index 1 --> the greatest element to the right of index 1 is index 4 (6).
- index 2 --> the greatest element to the right of index 2 is index 4 (6).
- index 3 --> the greatest element to the right of index 3 is index 4 (6).
- index 4 --> the greatest element to the right of index 4 is index 5 (1).
- index 5 --> there are no elements to the right of index 5, so we put -1.

Example 2:

Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.
*/

// Time - Big O(n^2)
// Space - Big O(1)

// first answer
function largestToTheRightIndex(arr: number[], currentIndex: number): number {
  let largest = arr[currentIndex + 1] || -1;
  for (let i = currentIndex + 1; i < arr.length; i++) {
    const currentNumber = arr[i + 1] || -2;
    if (currentNumber > largest) largest = currentNumber;
  }
  return largest;
}
function replaceElements(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    const largest = largestToTheRightIndex(arr, i);
    arr[i] = largest;
  }
  return arr;
}

// Time - Big O(n)
// Space - Big O(1)

// leetcode solution
function _replaceElements(arr: number[]): number[] {
  // make the last ele to be max
  let max = arr[arr.length - 1];
  // assign the last ele to be -1
  arr[arr.length - 1] = -1;
  // loop backward from the second to last ele
  for (let i = arr.length - 2; i >= 0; i--) {
    // keep current ele value
    const curr = arr[i];
    // assgin current ele with max value
    arr[i] = max;
    // if the current ele value that we kept is greater then reassign new max
    if (curr > max) max = curr;
  }
  return arr;
}
