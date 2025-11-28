console.log('Hello, World!');

const array = [1, 2, 3, 4]; // [1,3,6,10]

// simple recursion solution
{
  const runningSum = (nums, index = 1) => {
    if (index === nums.length) return nums;

    nums[index] += nums[index - 1];

    return runningSum(nums, index + 1);
  };
}

// simple for loop solution
{
  const runningSum = (nums) => {
    for (let i = 1; i !== nums.length; i++) {
      nums[i] += nums[i - 1];
    }
    return nums;
  };
}
