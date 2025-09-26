export class Stack {
  constructor(initial = []) {
    this._items = Array.isArray(initial) ? [...initial] : [];
  }

  push(item) {
    this._items.push(item);
  }

  pop() {
    return this._items.pop() ?? null;
  }

  peek() {
    if (this._items.length === 0) return null;
    return this._items[this._items.length - 1];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }

  clear() {
    this._items = [];
  }

  toArrayTopFirst() {
    return [...this._items].reverse();
  }

  existsByISBN(isbn) {
    return this._items.some(b => String(b.isbn).trim() === String(isbn).trim());
  }
}
