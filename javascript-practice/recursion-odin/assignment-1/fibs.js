// Using iteration, write a function "fibs" which takes a number and returns and array containing that many numbers from the fibonacci sequence. Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13]

const fibs = (times) => {
  let last = 0;
  let current = 0;
  let space = 1;
  let arr = [];
  while (times > 0) {
    arr.push(current);

    last = current;

    current += space;

    space = last;

    times -= 1;
  }

  return arr;
};

// console.log(fibs(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
// console.log(fibs(18)); // [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597];

// console.log(fibs(28)); // [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418]

module.exports = fibs;
