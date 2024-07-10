var getCommon = function (n1, n2, i1 = 0, i2 = 0) {
  while (n1[i1] && n2[i2]) {
    if (n1[i1] === n2[i2]) return n1[i1];
    if (n1[i1] > n2[i2]) i2++;
    else i1++;
  }
  return -1;
};
