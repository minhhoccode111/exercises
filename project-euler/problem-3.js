// LARGEST PRIME FACTOR

// Problem 3

// The prime factor of 13195 are 5,7,13 and 29

// What is the largest prime factor of the number 600851475143

function trialDivision(n) {
  const factors = [];

  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }

  if (n > 2) {
    factors.push(n);
  }

  // return factors[factors.length - 1];
  return factors;
}

console.log(trialDivision(40)); // [2,5]
console.log(trialDivision(13195)); // [5,7,13,29]
console.log(trialDivision(600_851_475_143)); //

// I've solved the problem but I must find another way to solved instead of looping through 600 billion elements
