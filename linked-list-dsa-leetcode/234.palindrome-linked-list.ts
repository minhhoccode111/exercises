/*
Given the head of a singly linked list, return true if it is a 
palindrome or false otherwise.

Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Follow up: Could you do it in O(n) time and O(1) space?
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(n)
// first approach, brute force
function _isPalindrome(head: ListNode | null): boolean {
  // edge cases
  if (head === null) return false;
  if (head.next === null) return true; // have 1 node
  let pointer: ListNode | null = head;
  const arr: number[] = [];
  while (pointer !== null) {
    arr.push(pointer.val);
    pointer = pointer.next;
  }
  return arr.join("") === arr.reverse().join("");
}

// Time - Big O(n)
// Space - Big O(1)
// second approach,

function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return true;
  }

  // Find the middle of the list
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // Reverse the second half
  let secondHalf = reverseList(slow!.next);

  // Compare the two halves
  let firstHalf: ListNode | null = head;
  let result = true;
  while (result && secondHalf !== null) {
    if (firstHalf!.val !== secondHalf.val) {
      result = false;
    }
    firstHalf = firstHalf!.next;
    secondHalf = secondHalf.next;
  }

  // Restore the list (optional)
  // slow!.next = reverseList(slow!.next);

  return result;
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  return prev;
}
