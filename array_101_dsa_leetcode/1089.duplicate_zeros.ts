/*
Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

Example 1:

Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

Example 2:

Input: arr = [1,2,3]
Output: [1,2,3]
Explanation: After calling your function, the input array is modified to: [1,2,3]

*/

/*
Do not return anything, modify arr in-place instead.
*/

// Time - Big O(n^2)
// Space - Big O(1)

function duplicateZeros(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (curr === 0) {
      // insert another 0
      arr.splice(i, 0, 0);
      // increase i 1 more time
      i++;
      // pop last element to keep the length
      arr.pop();
    }
  }
}

// Time - Big O(n)
// Space - Big O(1)
// two-pass approach to have time complexity of Big O(n)
// loop through the array 1st from the beginning to count number of zeros
// loop through the array 2nd from the end to shift number to the right
// and insert addition zeros at the same time
function duplicateZerosSolution(arr: number[]): void {
  let zerosToDuplicate = 0;
  let length = arr.length - 1;

  // First pass: Count zeros to be duplicated
  for (let i = 0; i <= length - zerosToDuplicate; i++) {
    if (arr[i] === 0) {
      // Edge case: if the zero to be duplicated is on the boundary of the length
      if (i === length - zerosToDuplicate) {
        // Move this zero to the end
        arr[length] = 0;
        length -= 1;
        break;
      }
      zerosToDuplicate++;
    }
  }

  // Second pass: Start from the end and duplicate zeros as needed
  let last = length - zerosToDuplicate;

  for (let i = last; i >= 0; i--) {
    if (arr[i] === 0) {
      arr[i + zerosToDuplicate] = 0;
      zerosToDuplicate--;
      arr[i + zerosToDuplicate] = 0;
    } else {
      arr[i + zerosToDuplicate] = arr[i];
    }
  }
}

// time - Big O(n)
// space - Big O(n)
function duplicateZerosDup(arr: number[]) {
  const clone = [...arr];
  let arrIndex = 0;
  for (let i = 0; i < clone.length; i++) {
    if (arrIndex === arr.length) return;
    const cloneCurrentNum = clone[i];
    arr[arrIndex] = cloneCurrentNum;
    arrIndex++;

    if (cloneCurrentNum === 0) {
      if (arrIndex === arr.length) return;
      arr[arrIndex] = 0;
      arrIndex++;
    }
  }
}
