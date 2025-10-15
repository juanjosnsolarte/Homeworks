export class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export default class List {
  constructor() {
    this.head = null
    this.length = 0
  }
  addFirst(value) {
    const node = new ListNode(value)
    node.next = this.head
    this.head = node
    this.length++
  }
  toArray() {
    const arr = []
    let cur = this.head
    while (cur) {
      arr.push(cur.value)
      cur = cur.next
    }
    return arr
  }
  static fromArray(arr) {
    const list = new List()
    for (let i = arr.length - 1; i >= 0; i--) list.addFirst(arr[i])
    return list
  }
}
