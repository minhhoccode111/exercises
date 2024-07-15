/*
description
*/

import { ListNode } from "./typedef";

// first approach
// Time - Big O(n)
// Space - Big O(n)
function _detectCycle(head: ListNode | null): ListNode | null {
  let poiner = head;
  let index = 0;
  const map = new Map();
  while (poiner !== null) {
    if (map.has(poiner)) return poiner;
    map.set(poiner, index);
    index++;
    poiner = poiner.next;
  }
  return null;
}

// second approach
// Time - Big O(n)
// Space - Big O(1)

function detectCycle(head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  let cycleDetected = false;
  while (fast !== null && fast.next !== null) {
    slow = (slow as ListNode)?.next;
    fast = fast?.next?.next;
    if (slow === fast) {
      cycleDetected = true;
      break;
    }
  }
  if (!cycleDetected) return null;
  slow = head;
  while (fast !== null && fast.next !== null) {
    if (slow === fast) return slow;
    slow = (slow as ListNode)?.next;
    fast = (fast as ListNode)?.next;
  }
}
