/*
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(1)
// first approach, 2 pointers
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let fast = head;
  let slow = head;
  let prev: ListNode | null = new ListNode(0, head);
  let pace = 0;
  while (fast !== null) {
    // move fast pointer
    fast = fast.next;
    // if pace equal n
    if (pace === n) {
      // mean move slow pointer too
      prev = prev!.next;
      slow = slow!.next;
    } else {
      // else increase pace
      pace++;
    }
  }
  if (head === slow) {
    // delete only node in the list
    if (slow?.next === null) return null;
    // delete first node in the list
    return slow!.next;
  }
  prev!.next = slow!.next;
  return head;
}
