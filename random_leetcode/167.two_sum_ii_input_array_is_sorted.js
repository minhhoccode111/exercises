console.log('hello world');

// MEDIUM

// simple solution with recursion
// Big O(n) - time complexity
var twoSum = (numbers, target, left = 0, right = numbers.length - 1) => {
  const sum = numbers[left] + numbers[right];
  if (sum === target) return [left + 1, right + 1];

  if (left !== right) {
    if (sum < target) {
      return twoSum(numbers, target, left + 1, right);
    } else {
      return twoSum(numbers, target, left, right - 1);
    }
  }
};

// solution with while loop
// Big O(n) - time complexity
var twoSum = (numbers, target) => {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    if (sum > target) right--;
  }
};
// but this will slightly faster than recursive and more memory friendly
