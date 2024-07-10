var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let result = new ListNode();
  const resultHead = result;
  while (l1 || l2 || carry) {
    const l1Val = l1 === null ? 0 : l1.val;
    const l2Val = l2 === null ? 0 : l2.val;
    let currentSum = l1Val + l2Val + (carry === 1 ? carry-- : 0);
    carry = Math.trunc(currentSum / 10);
    result.val = currentSum % 10;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
    if (l1 || l2 || carry) {
      result.next = new ListNode();
      result = result.next;
    }
  }
  return resultHead;
};
