console.log('Hello, World!');

// sum is recursion used to calculate each person wealth
const sum = (money, index = 0) => (index === money.length ? 0 : money[index] + sum(money, index + 1));
{
  // another recursion to loop through each customer
  const maximumWealth = (accounts, index = 0, largest = 0) => {
    if (index === accounts.length) return largest;

    const current = sum(accounts[index]);

    return maximumWealth(accounts, index + 1, Math.max(current, largest));
  };
}

{
  const maximumWealth = (accounts, index = 0) => {
    if (index === accounts.length) return Math.max(...accounts);

    accounts[index] = sum(accounts[index]);

    return maximumWealth(accounts, index + 1);
  };
}

{
  // for loop
  const maximumWealth = (accounts, largest = 0) => {
    for (let i = 0; i < accounts.length; i++) {
      largest = Math.max(largest, sum(accounts[i]));
    }
    return largest;
  };
}
