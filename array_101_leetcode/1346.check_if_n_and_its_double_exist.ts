/*
Given an array arr of integers, check if there exist two indices i and j such that :

i != j
0 <= i, j < arr.length
arr[i] == 2 * arr[j]
 

Example 1:

Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

Example 2:

Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
*/

// Time - Big O(n)
// Space - Big O(n)

// use dict to store number
function _checkIfExist(arr: number[]): boolean {
  const table = {};
  for (let i = 0; i < arr.length; i++) {
    const number = arr[i];
    table[number] = i; // store index
  }
  for (let j = 0; j < arr.length; j++) {
    const number = arr[j];
    const double = number * 2;
    const isExistInTable = table[double] !== undefined;
    const isNotSelf = table[double] !== j;
    if (isExistInTable && isNotSelf) {
      return true;
    }
  }
  return false;
}

// leetcode solution
function checkIfExist(arr: number[]): boolean {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (set.has(current / 2) || set.has(current * 2)) return true;
    set.add(current);
  }
  return false;
}
