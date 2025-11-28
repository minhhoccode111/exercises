var numSubarraysWithSum = function (nums, goal) {
  // Initialize variables
  let totalCount = 0;
  let currentSum = 0;
  const freq = {}; // Object to store frequencies of prefix sums

  // Iterate through the numbers [1,0,1,0,1]
  for (const num of nums) {
    // num = 1
    // num = 0
    // num = 1
    // num = 0
    // num = 1

    // currentSum = 1
    // currentSum = 1
    // currentSum = 2
    // currentSum = 2
    // currentSum = 3
    currentSum += num;

    // Check if current sum equals goal and increment count
    if (currentSum === goal) {
      // totalCount = 1
      // totalCount = 2
      totalCount++;
    }

    // Check if there's a prefix sum that can be subtracted to get the goal
    if (freq.hasOwnProperty(currentSum - goal)) {
      // totalCount(2) += freq[1](2) (=4)
      totalCount += freq[currentSum - goal];
    }

    // Update frequency of current sum (initialize to 1 if not present)
    // freq[1] = 0 + 1 >>> freq = {1: 1}
    // freq[1] = 1 + 1 >>> freq = {1: 2}
    // freq[2] = 0 + 1 >>> freq = {1: 2, 2: 1}
    // freq[2] = 1 + 1 >>> freq = {1: 2, 2: 2}
    // freq[3] = 0 + 1 >>> freq = {1: 2, 2: 2, 3:1}
    freq[currentSum] = (freq[currentSum] || 0) + 1;
  }

  // return 4
  return totalCount;
};
