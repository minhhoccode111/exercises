type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P): P {
  const [num1, num2] = await Promise.all([promise1, promise2]);
  return num1 + num2;
}
