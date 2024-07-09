/*
Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Example 1:

Input: arr = [2,1]
Output: false

Example 2:

Input: arr = [3,5,5]
Output: false

Example 3:

Input: arr = [0,3,2,1]
Output: true
*/

// Time - Big O(n)
// Space - Big O(1)

function validMountainArray(arr: number[]): boolean {
  if (arr.length < 3) return false; // not enough to be a mountain
  if (arr[0] > arr[1]) return false; // not going up first
  let isDown = false;
  let index = 0;
  while (index < arr.length) {
    const curr = arr[index];
    const prev = arr[index - 1];
    if (curr === prev) return false; // not going up or down
    if (isDown && curr > prev) return false; // already down but up again
    if (!isDown && curr < prev) isDown = true;
    // if (isDown && curr < prev)  // fine
    // if (!isDown && curr > prev)  // fine
    index++;
  }
  if (!isDown) return false; // not going down once
  return true;
}

// leetcode solution
function _validMountainArray(arr: number[]): boolean {
  // A valid mountain array must have at least 3 elements
  if (arr.length < 3) return false;

  // i is going to store the current index we're on and
  // we will add one to it to check the next number and
  // whether it's greater or less than the current number
  // depending on which "side of the mountain" we're on.
  let i = 0;

  // move forward through the array checking that the next
  // number is bigger than the previous one until that is
  // no longer the case, incrementing i each time.
  while (arr[i] < arr[i + 1] && i < arr.length) {
    i++;
  }

  // now that we're out of the loop above, check to see where we
  // ended up. If we're at the end, or if we never moved anywhere
  // at all, it's not a mountain array.
  if (i === 0 || i + 1 === arr.length) return false;

  // If we have reached this far, then we at least came to one
  // "mountain peak" - now we check to see if the rest of the
  // values conform to the notion of a mountain and decrease in value
  while (arr[i] > arr[i + 1] && i < arr.length) {
    i++;
  }

  // if it was a true mountain array, then at this point i
  // should equal the length of the array.
  return i + 1 === arr.length;
}
