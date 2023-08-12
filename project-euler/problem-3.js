// LARGEST PRIME FACTOR

// Problem 3

// The prime factor of 13195 are 5,7,13 and 29

// What is the largest prime factor of the number 600851475143

const createPrimeArr = (n) => {
  let arr = [];

  for (let i = 2; i <= n; i++) {
    // if current arr isn't containing any number % i === 0, then we push i to array
    if (arr.every((item) => i % item)) arr.push(i);
  }

  return arr;
};

const primeFactor = (n, index = 0, primeArr = createPrimeArr(n), arr = []) => {
  if (index === primeArr.length) return arr;

  if (n === 1) return arr;

  if (!(n % primeArr[index])) {
    if (!arr.includes(primeArr[index])) arr.push(primeArr[index]);
    return primeFactor(n / primeArr[index], index, primeArr, arr);
  }

  return primeFactor(n, index + 1, primeArr, arr);
};

console.log(primeFactor(40)); // [2,5]
console.log(primeFactor(13195)); // [5,7,13,29]
console.log(primeFactor(600_851_475_143)); //

// I've solved the problem but I must find another way to solved instead of looping through 6 billion elements
