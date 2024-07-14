/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

 

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:

Input: nums = [0]
Output: [0]
*/

// Time - Big O(n)
// Space - Big O(1)

function moveZeroes(nums: number[]): void {
  // two pointers to read and write
  let writePointer = 0;
  let readPointer = 0;
  while (readPointer < nums.length) {
    // if read pointer is at a non-zero number
    if (nums[readPointer] !== 0) {
      // move the non-zero number from read pointer to write pointer
      nums[writePointer] = nums[readPointer];
      // erase the read pointer to 0 if it's not the same position as write pointer
      if (readPointer !== writePointer) nums[readPointer] = 0;
      // increase write pointer after writing
      writePointer++;
    }
    // increase read pointer after checking
    readPointer++;
  }
}
