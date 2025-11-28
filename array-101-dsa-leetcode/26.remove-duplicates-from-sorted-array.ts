/*
Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
Return k.
Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

 

Example 1:

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
*/

// Time - Big O(n^2)
// Space - Big O(n)

// simple solution
function _removeDuplicates(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    const currentNumber = nums[i];
    const previousNumber = nums[i - 1];
    if (currentNumber === previousNumber) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}

// Time - Big O(n)
// Space - Big O(1)

// shift solution - efficient
function __removeDuplicates(nums: number[]): number {
  // number that we skip when we shift to the left
  let numberToBeShifted = 0;
  // count number that valid and we keep remain in the array
  let validNumberCount = 0;
  // loop through the array
  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];
    const previousNumber = nums[i - 1] ?? -Infinity;
    // if current number is duplicated
    if (currentNumber === previousNumber) {
      // increase the number to be skip
      numberToBeShifted++;
      continue;
    }
    // else shift to the left and increase valid number count to return
    nums[i - numberToBeShifted] = currentNumber;
    validNumberCount++;
  }
  return validNumberCount;
}

// leetcode solution
function removeDuplicates(nums: number[]): number {
  let validCount = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[validCount] = nums[i];
      validCount++;
    }
  }
  return validCount;
}
