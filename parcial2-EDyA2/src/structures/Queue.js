export default class Queue {
  constructor(items = []) {
    this.items = items.slice()
  }
  enqueue(x) { this.items.push(x) }
  dequeue() { return this.items.shift() }
  front() { return this.items[0] }
  size() { return this.items.length }
  toArray() { return this.items.slice() }
  static fromArray(arr){ return new Queue(arr) }
}
