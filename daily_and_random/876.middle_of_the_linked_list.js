console.log('Hello, World!');

// simple solution with while loop
{
  const middleNode = (head) => {
    let length = 0;
    const arr = [];
    while (head !== null) {
      arr.push(head);
      head = head.next;
      length++;
    }
    return arr[Math.floor(length / 2)];
  };
}

// simple solution with recursion
{
  const middleNode = (h, length = 0, arr = []) => {
    if (h === null) return arr[Math.floor(length / 2)];

    return middleNode(h.next, length + 1, [...arr, h]);
  };
}

// enhance solution with 2 pointers
{
  const middleNode = (head) => {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  };
}

// its recursion
{
  const middleNode = (head, slow = head, fast = head) => {
    if (fast === null || fast.next === null) return slow;
    return middleNode(head, slow.next, fast.next.next);
  };
}

var middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
