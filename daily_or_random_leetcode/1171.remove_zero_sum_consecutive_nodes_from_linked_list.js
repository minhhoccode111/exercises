var removeZeroSumSublists = function (head) {
  const front = new ListNode(0, head);
  let start = front;
  while (start !== null) {
    let prefix = 0;
    let end = start.next;
    while (end !== null) {
      prefix += end.val;
      if (prefix === 0) start.next = end.next;
      end = end.next;
    }
    start = start.next;
  }
  return front.next;
};
