class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  get(index) {
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) return current.value;
      current = current.next;
      count++;
    }
    return null;
  }

  size() {
    return this.length;
  }
}