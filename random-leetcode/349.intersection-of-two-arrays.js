var intersection = function (num1, num2) {
  const a = new Set(num1);
  const b = new Set(num2);
  return [...a].filter((value) => b.has(value));
};
