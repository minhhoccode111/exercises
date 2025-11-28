/*
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.

Example 1:
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

Example 2:
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
*/

import { ListNode } from "./typedef";

// Time - Big O(n)
// Space - Big O(1)
// first approach, normal looping
function oddEvenList(head: ListNode | null): ListNode | null {
  // edge case
  if (head === null) {
    return null;
  }
  // 2 moving var
  let index = 0;
  let pointer: ListNode | null = head;
  // this will hold the head of even indices list
  const holdEvenList = new ListNode(0, head);
  // this will move to add new node to even list at tail
  let evenPointer = new ListNode(0, head);
  // this will hold the head of odd indices list
  const holdOddList = new ListNode(0, head.next);
  // this will move to add new node to odd list at tail
  let oddPointer = new ListNode(0, head.next);
  // while pointer not reach the end
  while (pointer !== null) {
    // if the index is even
    if (index % 2 === 0) {
      // add to the end of even list
      evenPointer.next = pointer;
      // and move even list pointer
      evenPointer = evenPointer.next;
    }
    // if the index is odd
    else {
      // add to the end of odd list
      oddPointer.next = pointer;
      // and move odd list pointer
      oddPointer = oddPointer.next;
    }
    // move pointer ahead and increase index
    pointer = pointer.next;
    index++;
  }
  // make the end of even list to hold the start of odd list
  evenPointer.next = holdOddList.next;
  // remove cyle in linked list
  oddPointer.next = null;
  // head always index 0
  return holdEvenList.next;
}

// second approach
function oddEvenList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }

  let even: ListNode | null = head;
  let odd: ListNode | null = head.next;
  let oddHead: ListNode | null = odd;

  while (odd !== null && odd.next !== null) {
    even.next = odd.next;
    even = even.next;
    odd.next = even.next;
    odd = odd.next;
  }

  even.next = oddHead;
  return head;
}
