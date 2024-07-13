import { ListNode } from "../typedef";
/*
Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node.
If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

Implement the MyLinkedList class:

MyLinkedList() Initializes the MyLinkedList object.
int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
void addAtTail(int val) Append a node of value val as the last element of the linked list.
void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.
 

Example 1:

Input
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
Output
[null, null, null, null, 2, null, 3]

Explanation
MyLinkedList myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
myLinkedList.get(1);              // return 2
myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
myLinkedList.get(1);              // return 3
*/

class MyLinkedList {
  _head: ListNode | null;
  _size: number;

  constructor() {
    this._head = null;
    this._size = 0;
  }

  get(index: number): number {
    // define starting pointer position
    let pointer = this._head;
    let i = 0;

    // start looping if pointer not null
    while (pointer !== null) {
      // return value if found
      if (i === index) return pointer.val;

      // move pointer
      i++;
      pointer = pointer.next;
    }

    // not found
    return -1;
  }

  addAtHead(val: number): void {
    // create new node, and make it point to head
    const curr = new ListNode(val, this._head);
    // update head to point to it and increase size
    this._head = curr;
    this._size++;
  }

  addAtTail(val: number): void {
    // edge case no node exist yet
    if (this._size === 0) {
      this.addAtHead(val);
      return;
    }

    // define starting pointer position
    let pointer = this._head;

    // create new now
    const curr = new ListNode(val);

    // move to the tail position, where pointer.next === null
    while ((pointer as ListNode).next !== null) {
      pointer = (pointer as ListNode).next;
    }

    // add new node after the tail position
    (pointer as ListNode).next = curr;
    this._size++;
  }

  addAtIndex(index: number, val: number): void {
    // edge case add at head position
    if (index === 0) {
      return this.addAtHead(val);
    }

    // edge case add at tail position
    if (index === this._size) {
      return this.addAtTail(val);
    }

    // else insert normally

    // create new node
    const curr = new ListNode(val);

    // define starting pointer position
    let pointer = this._head;
    let i = 0;
    let prev = new ListNode(0, pointer); // this node is behind current pointer

    // start moving pointer
    while (pointer !== null) {
      // found the index, start inserting
      if (i === index) {
        // make new node hold current pointer
        curr.next = pointer;
        // make previous node hold new node
        prev.next = curr;
        this._size++;
      }

      // move to the next node
      prev = pointer;
      pointer = pointer.next;
      i++;
    }

    // insert out of the linked list size
  }

  deleteAtIndex(index: number): void {
    // define starting pointer position
    let pointer = this._head;
    let i = 0;
    let prev = new ListNode(0, pointer); // this node is behind current pointer

    // move to the delete position
    while (pointer !== null) {
      // found index need to be delete
      if (i === index) {
        // edge case delete at head
        if (index === 0) {
          this._head = (this._head as ListNode)?.next;
        }
        prev.next = pointer.next;
        this._size--;
        return;
      }

      // move to the next node
      prev = pointer;
      pointer = pointer.next;
      i++;
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 *
 *["MyLinkedList","addAtHead","get"]
 *[[],[1],[4]]
 */
