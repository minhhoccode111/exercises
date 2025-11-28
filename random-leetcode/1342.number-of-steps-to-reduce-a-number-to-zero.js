console.log('Hello, World!');

// simple solution with a loop
{
  const numberOfSteps = (n) => {
    let step = 0;
    while (n) {
      if (!(n % 2)) {
        n /= 2;
      } else {
        n--;
      }
      step++;
    }
    return step;
  };
}

// simple solution with recursion
{
  const numberOfSteps = (n) => {
    if (!n) return 0;
    if (!(n % 2)) return 1 + numberOfSteps(n / 2);
    return 1 + numberOfSteps(n - 1);
  };
}

// shorter recursion
{
  var numberOfSteps = (num) => (num === 0 ? 0 : !(num % 2) ? 1 + numberOfSteps(num / 2) : 1 + numberOfSteps(num - 1));
}
