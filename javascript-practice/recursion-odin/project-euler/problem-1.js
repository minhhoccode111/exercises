// MULTIPLES OF 3 OR 5

// Problem 1

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3,5,6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000

const multiples = (n) => {
  if (n < 3) return 0;
  if (!(n % 3) || !(n % 5)) {
    return n + multiples(n - 1);
  }
  return multiples(n - 1);
};

console.log(multiples(999)); // below 1000 = 233168
console.log(multiples(10)); // 3,5,6,9,10 = 33
