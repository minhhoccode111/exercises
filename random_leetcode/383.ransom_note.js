console.log('Hello, World!');

// simple solution with for loop, time complexity Big O (n), space complexity Big O (1)

{
  var canConstruct = function (ransomNote, magazine) {
    for (let i = 0; i < ransomNote.length; i++) {
      if (magazine.includes(ransomNote[i])) {
        magazine = magazine.replace(ransomNote[i], '');
        continue;
      }
      return false;
    }
    return true;
  };
}

// simple solution with recursion
{
  const canConstruct = (ransomNote, magazine, index = 0) => {
    if (index === ransomNote.length) return true;
    if (magazine.includes(ransomNote[index])) return canConstruct(ransomNote, magazine.replace(ransomNote[index], ''), index + 1);
    return false;
  };
}
