/*
description
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(n)
// first approach
function _getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  const set = new Set();
  while (headA !== null) {
    set.add(headA);
    headA = headA.next;
  }
  while (headB !== null) {
    if (set.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
}

// Time - Big O(n)
// Space - Big O(1)
// second approach - 2 pointers
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  let pointerA = headA;
  let pointerB = headB;
  while (pointerA !== pointerB) {
    pointerA = pointerA ? pointerA.next : headB;
    pointerB = pointerB ? pointerB.next : headA;
  }
  return pointerA;
}
