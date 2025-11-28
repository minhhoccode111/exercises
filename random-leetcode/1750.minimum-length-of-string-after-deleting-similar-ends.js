var minimumLength = function (s, prev = '') {
  // stop here when left is also right
  if (s.length === 1 && prev !== s) return 1;

  // if left or right match the previous removed char then continue removing
  if (s[0] === prev) return minimumLength(s.slice(1), prev);
  if (s[s.length - 1] === prev) return minimumLength(s.slice(0, s.length - 1), prev);

  // if left === right remove them and set previous
  if (s[0] && s[0] === s[s.length - 1]) return minimumLength(s.slice(1, s.length - 1), s[0]);

  return s.length;
};

// pointers instead of slice
var minimumLength = function (s, prev = '', left = 0, right = s.length - 1) {
  // stop when left is also right and prev different
  if (left === right && prev !== s[left]) return 1;

  // if left or right the same as previous then move pointer to remove char
  if (s[left] === prev) return minimumLength(s, prev, left + 1, right);
  if (s[right] === prev) return minimumLength(s, prev, left, right - 1);

  // if left === right remove them and set previous
  if (s[left] === s[right]) return minimumLength(s, s[left], left + 1, right - 1);

  return right - left + 1; // + 1 because they are indexes
};

// 2 nested while
var minimumLength = function (s) {
  let l = 0;
  let r = s.length - 1;
  while (r > l && s[r] === s[l]) {
    var c = s[r];
    while (l <= r && s[l] === c) l++;
    while (r >= l && s[r] === c) r--;
  }
  return r - l + 1;
};
