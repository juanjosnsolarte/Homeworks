export class Queue {
  constructor(initial = []) {
    this._items = Array.isArray(initial) ? [...initial] : [];
    this._head = 0; 
  }

  enqueue(item) {
    const createdAt = Number(item?.createdAt ?? Date.now());
    const record = { ...item, createdAt };

    let lo = this._head, hi = this._items.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      const tmid = Number(this._items[mid]?.createdAt ?? 0);
      if (tmid <= createdAt) lo = mid + 1; else hi = mid;
    }
    this._items.splice(lo, 0, record);
  }


  dequeue() {
    if (this.isEmpty()) return null;
    const value = this._items[this._head++];
    if (this._head > 50 && this._head * 2 > this._items.length) {
      this._items = this._items.slice(this._head);
      this._head = 0;
    }
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this._items[this._head];
  }

  isEmpty() {
    return this._head >= this._items.length;
  }

  size() {
    return this._items.length - this._head;
  }

  clear() {
    this._items = [];
    this._head = 0;
  }

  toArrayFrontFirst() {
    return this._items.slice(this._head);
  }
}
