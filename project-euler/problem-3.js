// LARGEST PRIME FACTOR

// Problem 3

// The prime factor of 13195 are 5,7,13 and 29

// What is the largest prime factor of the number 600851475143

function trialDivision(n) {
  // empty arr to store prime numbers
  const factors = [];

  // check if the number can be divided by 2 first then continuously divide by 2 until can't be divided anymore
  while (n % 2 === 0) {
    // push to factors
    factors.push(2);
    // keep dividing the number
    n /= 2;
  }

  // than start by 3 and i += 2 each loop (so that we can cut the numbers we have to iterate through by half, we not looping through even number)
  // when searching for divisors of a number `n`, you only need to check divisibility up to the square root of `n`. This is because if `n` has a divisor larger than its square root, then it must also hae a corresponding smaller  divisor that you've already checked earlier
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }

  // if last n is greater than 2 and it's still a prime number so we push in factors
  if (n > 2) {
    factors.push(n);
  }

  // return factors[factors.length - 1];
  return factors;
}

const primeFactor = (n, divisor = 3, factors = []) => {
  if (n === 1) return factors;

  if (!(n % divisor)) {
    factors.push(divisor);
    return primeFactor(n / divisor, divisor, factors);
  }

  return primeFactor(n, divisor + 2, factors);
};

const find = (n) => {
  let factor = [];

  while (!(n % 2)) {
    factor.push(2);
    n /= 2;
  }

  factor = [...factor, ...primeFactor(n)];

  return factor;
};

console.log(trialDivision(40)); // [2,5]
console.log(trialDivision(13195)); // [5,7,13,29]
console.log(trialDivision(600_851_475_143)); // [71,839,1471,6857]

console.log(find(40)); // [2,5]
console.log(find(13195)); // [5,7,13,29]
console.log(find(600_851_475_143)); // [71,839,1471,6857]

// I've solved the problem but I must find another way to solved instead of looping through 600 billion elements
