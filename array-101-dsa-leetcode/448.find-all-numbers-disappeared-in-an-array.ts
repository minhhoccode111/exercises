/*
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:

Input: nums = [1,1]
Output: [2]

Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
*/

// Time - Big O(n)
// Space - Big O(1) (worst case O(n-1))

function findDisappearedNumbers(nums: number[]): number[] {
  // pass 1:
  for (let i = 0; i < nums.length; i++) {
    // use the value of nums[i] (will be 1 -> n) to go the the index of that value to mark as seen
    const curr = Math.abs(nums[i]);
    // then assume that the nums array is sorted (which is not)
    // then we switch the sign of value at that index to be negative
    // to identify that this index's value is already seen
    nums[curr - 1] = -Math.abs(nums[curr - 1]);
    // so now which index in this array with positive value is not seen yet
  }
  const result: number[] = [];
  // pass 2:
  for (let j = 0; j < nums.length; j++) {
    // if value is positive
    if (nums[j] > 0) {
      // which mean nums does not contain value equal to this index + 1
      result.push(j + 1);
    }
  }
  return result;
}
