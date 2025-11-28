/*
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:

Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:

Input: list1 = [], list2 = []
Output: []

Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
*/

import { ListNode } from "../typedef";

// Time - Big O(n)
// Space - Big O(1) - or Big O(n) if call stack is counted

// first solution
function recursion(
  list1: ListNode | null,
  list2: ListNode | null,
  head: ListNode, // work on this, currently shift 1 node
): ListNode | null {
  if (list1 === null && list2 === null) {
    return head;
  }
  const val1 = list1?.val ?? Infinity;
  const val2 = list2?.val ?? Infinity;
  if (val1 < val2) {
    head.next = recursion(list1?.next, list2, list1);
  } else {
    head.next = recursion(list1, list2?.next, list2);
  }
  return head;
}
function _mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  const head = new ListNode();
  const result = recursion(list1, list2, head);
  return result?.next;
}

// second solution, loop
function __mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  if (!list1) return list2;
  if (!list2) return list1;
  const head = new ListNode();
  let pointer: ListNode | null = head;
  while (list2 || list1) {
    const val1 = list1?.val ?? Infinity;
    const val2 = list2?.val ?? Infinity;
    if (val1 < val2) {
      pointer.next = list1 as ListNode;
      list1 = (list1 as ListNode).next;
    } else {
      pointer.next = list2 as ListNode;
      list2 = (list2 as ListNode).next;
    }
    pointer = pointer.next;
  }
  return head.next;
}

// leetcode solutions - pending
