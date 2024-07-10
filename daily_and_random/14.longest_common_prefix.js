console.log('Hello, World!');

// The prefix is string from the beginning
// means that "flower" and "flowflower" prefix is "flow"
// simple solution and explanations

// function takes an array
function longestCommonPrefix(strs) {
  // then check if strs is false OR strs is an empty array
  if (!strs || strs.length === 0) {
    // then return ""
    return '';
  }

  // define prefix equal first element in the array
  let prefix = strs[0];

  // loop through each item in the array, from the second item (because first item is prefix)
  for (let i = 1; i < strs.length; i++) {
    // in item in the array from the second index,
    // and while the index of prefix is not EXACTLY equal to 0, then we keep slicing the string 1 character (the last index of that string) until either the prefix is empty (the return empty) or the prefix match the exact 0 index of the current item of strs array so that we can increase the i in for loop to check the next item
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === '') {
        return '';
      }
    }
  }

  // after for loop we return prefix, which is the remaining prefix of all items in the array
  return prefix;
}

// recursive approach
// 99% time - 88% space
const longestCommonPrefix = (strs, index = 1, prefix = strs[0]) => {
  if (index === strs.length || prefix === '') return prefix;
  if (strs[index].indexOf(prefix) === 0) return longestCommonPrefix(strs, index + 1, prefix);
  return longestCommonPrefix(strs, index, prefix.slice(0, prefix.length - 1));
};

// shorter recursive approach :)
const longestCommonPrefix = (strs, index = 1, prefix = strs[0]) =>
  index === strs.length || prefix === ''
    ? prefix
    : strs[index].indexOf(prefix) === 0
    ? longestCommonPrefix(strs, index + 1, prefix)
    : longestCommonPrefix(strs, index, prefix.slice(0, prefix.length - 1));

// another recursive approach with 2 pointers each call (current array's item's index and current item's character's index)
//
const longestCommonPrefix = (strs, flag = true, index = 1, charIndex = 0, prefix = '') => {
  // if flag is false or charIndex is greater than the first item in the array's last index
  // then return prefix
  if (!flag || charIndex === strs[0].length) return prefix;

  // else if index reach the end of the array, then we know every item in array has the same character at the charIndex position, then we reset index (current item in array) back to 1, and add that character to prefix variable
  if (index === strs.length) return longestCommonPrefix(strs, flag, 1, charIndex + 1, prefix + strs[index - 1][charIndex]);

  // if current character of item 0 in array equal to current character of current index item in array then we increase index to check the next item in the array
  if (strs[0][charIndex] === strs[index][charIndex]) return longestCommonPrefix(strs, flag, index + 1, charIndex, prefix);

  // else current character of item 0 in array DOESN'T equal to current character of current index item in array then we toggle flag to false
  return longestCommonPrefix(strs, false, index, charIndex, prefix);
};

// or its normal implementation with for loop
{
  const longestCommonPrefix = (strs) => {
    if (!strs || !strs.length) return '';

    let prefix = '';

    for (let i = 0; i < strs[0].length; i++) {
      const current = strs[0][i];
      if (strs.every((item) => item[i] === current)) {
        prefix += current;
      } else break;
    }
    return prefix;
  };
}
