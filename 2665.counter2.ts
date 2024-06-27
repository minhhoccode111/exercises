type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): Counter {
  const base = init;
  let counter = init;
  return {
    increment: () => ++counter,
    decrement: () => --counter,
    reset: () => {
      counter = base;
      return counter;
    },
  };
}
