console.log('Hello, World!');

// simple solution with built-in methods
{
  const isPalindrome = (x) => x.toString() === x.toString().split('').reverse().join('');
}

// simple solution with recursion
// 84% runtime - 90% memory
{
  const isPalindrome = (x, xStr = x.toString(), left = 0, right = xStr.length - 1) => {
    if (!(left < right)) return true;

    if (xStr[left] === xStr[right]) return isPalindrome(x, xStr, left + 1, right - 1);

    return false;
  };
}
// shorter version
{
  const isPalindrome = (x, xStr = x.toString(), left = 0, right = xStr.length - 1) => (!(left < right) ? true : xStr[left] === xStr[right] ? isPalindrome(x, xStr, left + 1, right - 1) : false);
}

// this is the legacy code I wrote the first time I solved this problem :)
{
  var isPalindrome = function (x) {
    if (x < 0) {
      return false;
    } else {
      var y = x.toString();
      for (let i = 0; i < y.length; i++) {
        if (y[i] != y[y.length - i - 1]) {
          return false;
        }
      }
      return true;
    }
  };
}
