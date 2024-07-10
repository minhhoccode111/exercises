// but this O(n) space
var hasCycle = function (head) {
  const set = new Set();
  while (head) {
    if (set.has(head)) return true;
    else set.add(head);
    head = head.next;
  }
  return false;
};

// this is O(1) space
var hasCycle = function (h) {
  if (h === null || h.next === null) return false;
  let fast = h;
  let slow = h;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }
  return false;
};
