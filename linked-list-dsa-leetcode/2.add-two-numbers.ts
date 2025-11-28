/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(1)
// first approach, brute force
// WARN: this implementation is wrong, only pass 1566/1569 testcases
function __addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  // edge case
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  // sum l1
  let s1 = 0;
  let c1 = 0;
  let p1: ListNode | null = l1;
  while (p1 !== null) {
    s1 += p1.val * 10 ** c1;
    c1++;
    p1 = p1.next;
  }

  // sum l2
  let s2 = 0;
  let c2 = 0;
  let p2: ListNode | null = l2;
  while (p2 !== null) {
    s2 += p2.val * 10 ** c2;
    c2++;
    p2 = p2.next;
  }

  // create new linked list
  let sum = s1 + s2;
  let head: ListNode | null = null;
  while (sum >= 1) {
    const currVal = sum % 10;
    const currNode = new ListNode(currVal, head);
    head = currNode;
    sum = Math.floor(sum / 10);
  }

  // reverse the linked list
  let prev: ListNode | null = null;
  while (head !== null && head.next !== null) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return head;
}

// Time - Big O(n)
// Space - Big O(1)
// second approach, sum
function _addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  // edge case
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  let reminder = 0;
  let p1: ListNode | null = l1;
  let p2: ListNode | null = l2;
  while (p1 !== null && p2 !== null) {
    const value1 = p1.val;
    const value2 = p2.val;
    let currValue = value1 + value2 + reminder;
    if (currValue > 9) {
      currValue -= 10;
      reminder = 1;
    } else {
      reminder = 0;
    }
    p1!.val = currValue;
    if (p2.next !== null || reminder === 1) {
      p1.next = p1.next || new ListNode(0);
    }
    if (p1.next !== null || reminder === 1) {
      p2.next = p2.next || new ListNode(0);
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return l1;
}

// solution
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;
  while (l1 !== null || l2 !== null || carry !== 0) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;
    const sum = carry + x + y;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummyHead.next;
}
