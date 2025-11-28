/*
Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

Return any array that satisfies this condition.

 

Example 1:

Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Example 2:

Input: nums = [0]
Output: [0]
*/

// Time - Big O(n) - both pointers move to the center
// Space - Big O(n) - in-place operations but using recursive with the recursion depth of n in worst case

// my first answer
function sortArrayByParity(
  nums: number[],
  left: number = 0,
  right: number = nums.length - 1,
): number[] {
  // if 2 pointers meet at the center then stop
  if (left > right) return nums;

  const isLeftEven = nums[left] % 2 === 0;
  const isRightOdd = nums[right] % 2 !== 0;

  // they are both in right position
  if (isLeftEven && isRightOdd) {
    // nothing change, move both indexes
    return sortArrayByParity(nums, left + 1, right - 1);
  }

  // they are both in wrong position
  if (!isLeftEven && !isRightOdd) {
    // swap their position
    const tmp = nums[right];
    nums[right] = nums[left];
    nums[left] = tmp;
    // move both indexes
    return sortArrayByParity(nums, left + 1, right - 1);
  }

  // they are both even mean left pointer is in right position
  if (isLeftEven && !isRightOdd) {
    // move left pointer
    return sortArrayByParity(nums, left + 1, right);
  }

  // they are both odd mean right pointer is in the right position
  return sortArrayByParity(nums, left, right - 1);
}

// Time - Big O(n) - both pointers move to the center
// Space - Big O(1) - in-place operations

// convert above to use iterator to improve space complexity
function _sortArrayByParity(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const isLeftEven = nums[left] % 2 === 0;
    const isRightOdd = nums[right] % 2 !== 0;

    if (isLeftEven && isRightOdd) {
      // Both are in the right position, move both pointers
      left++;
      right--;
    } else if (!isLeftEven && !isRightOdd) {
      // Both are in the wrong position, swap them
      const tmp = nums[right];
      nums[right] = nums[left];
      nums[left] = tmp;
      left++;
      right--;
    } else if (isLeftEven && !isRightOdd) {
      // Left is in the right position, move left pointer
      left++;
    } else {
      // Right is in the right position, move right pointer
      right--;
    }
  }

  return nums;
}

// leetcode solution
function __sortArrayByParity(nums: number[]): number[] {
  if (!nums.length || nums.length === 1) return nums;
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      const tmp = nums[left];
      nums[left] = nums[i];
      nums[i] = tmp;
      left++;
    }
  }
  return nums;
}
