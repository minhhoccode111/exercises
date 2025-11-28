/*
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(n) (of the call stack)
// first try, recursion
function _reverseList(
  head: ListNode | null,
  prev: ListNode | null = null,
): ListNode | null {
  if (head === null) {
    return prev;
  }
  const next = head.next;
  head.next = prev;
  return _reverseList(next, head);
}

// Time - Big O(n)
// Space - Big O(1)
// second try, loop
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  while (head !== null) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

/*
=> theoratical, loop is better
*/
