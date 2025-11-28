// LARGEST PALINDROME PRODUCT

// Problem 4

// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 X 99

// Find the largest palindrome made form the product of two 3-digit numbers.

// from 100000 to 998001

const isPalindrome = (n) => n.toString() === n.toString().split('').reverse().join('');

const largest = () => {
  let nums = 0;
  for (let i = 999; i > 100; i--) {
    for (let j = 999; j > 100; j--) {
      const result = i * j;
      if (isPalindrome(result)) {
        if (result > nums) {
          nums = result;
        }
        break;
      }
    }
  }

  return nums;
};

console.log(largest());
