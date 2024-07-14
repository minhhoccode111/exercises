/*
given a binary array `nums` return the maximum number of consecutive `1`'s in the array
Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2
 */

// Time - Big O(n)
// Space - Big O(1)

function findMaxConsecutiveOnes(nums: number[]): number {
  let max = 0;
  let curr = 0;
  for (let i = 0; i < nums.length; i++) {
    const number = nums[i];
    if (number === 1) {
      curr++;
      if (curr > max) max = curr;
    } else curr = 0;
  }
  return max;
}

function findMaxConsecutiveOnesRec(
  nums: number[],
  i: number = 0,
  max: number = 0,
  curr: number = 0,
): number {
  if (i === nums.length) return max;
  const number = nums[i];
  if (number === 1) {
    curr++;
    if (curr > max) max = curr;
  } else curr = 0;
  return findMaxConsecutiveOnesRec(nums, i + 1, max, curr);
}
