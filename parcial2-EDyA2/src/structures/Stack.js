export default class Stack {
  constructor(items = []) {
    this.items = items.slice()
  }
  push(x) { this.items.push(x) }
  pop() { return this.items.pop() }
  peek() { return this.items[this.items.length - 1] }
  size() { return this.items.length }
  toArray() { return this.items.slice() }
  static fromArray(arr){ return new Stack(arr) }
}
