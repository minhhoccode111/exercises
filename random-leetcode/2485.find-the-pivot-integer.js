// first approach
var pivotInteger = function (n) {
  for (let i = 1; i <= n; i++) {
    let sumBefore = 0;
    let sumAfter = 0;
    // before
    for (let j = 1; j <= i; j++) {
      sumBefore += j;
    }

    // after
    for (let k = n; k >= i; k--) {
      sumAfter += k;
    }
    if (sumAfter === sumBefore) return i;
  }
  return -1;
};

// effective approach
var pivotInteger = function (n) {
  let back = 0,
    front = (n * (n + 1)) / 2;
  for (let i = 1; i <= n; i++) {
    back += i;
    if (back === front) return i;
    front -= i;
  }
  return -1;
};
