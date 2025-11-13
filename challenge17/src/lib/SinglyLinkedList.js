class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
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