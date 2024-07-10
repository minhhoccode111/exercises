console.log('Hello, World!');

// simple solution with for loop
{
  const fizzBuzz = (n) => {
    const arr = [];

    for (let i = 1; i <= n; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        arr.push('FizzBuzz');
        continue;
      }

      if (i % 3 === 0) {
        arr.push('Fizz');
        continue;
      }

      if (i % 5 === 0) {
        arr.push('Buzz');
        continue;
      }

      arr.push(`${i}`);
    }

    return arr;
  };
}

// simple solution with recursion
{
  var fizzBuzz = (n, current = 1, arr = []) => {
    if (current > n) return arr;

    if (!(current % 5) && !(current % 3)) {
      arr.push('FizzBuzz');
      return fizzBuzz(n, current + 1, arr);
    }

    if (!(current % 3)) {
      arr.push('Fizz');
      return fizzBuzz(n, current + 1, arr);
    }

    if (!(current % 5)) {
      arr.push('Buzz');
      return fizzBuzz(n, current + 1, arr);
    }

    arr.push(`${current}`);
    return fizzBuzz(n, current + 1, arr);
  };
}

// other version of recursion which doesn't create any extra variable
{
  var fizzBuzz = (n) => {
    if (n === 0) return [];
    const arr = fizzBuzz(n - 1);

    if (!(n % 5) && !(n % 3)) {
      arr.push('FizzBuzz');
    } else if (!(n % 3)) {
      arr.push('Fizz');
    } else if (!(n % 5)) {
      arr.push('Buzz');
    } else {
      arr.push(`${n}`);
    }
    return arr;
  };
}
