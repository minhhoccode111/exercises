/*
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Example 3:
Input: head = [7,7,7,7], val = 7
Output: []
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(1)
// first approach
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (head === null) {
    return null;
  }
  while (head?.val === val) {
    head = head.next;
  }
  let pointer = head;
  let prev: ListNode = new ListNode(0, head);
  while (pointer !== null) {
    if (pointer.val === val) {
      pointer = pointer.next;
      continue;
    }
    prev.next = pointer;
    prev = pointer;
    pointer = pointer.next;
  }
  if (prev.next !== pointer) prev.next = pointer;
  return head;
}
