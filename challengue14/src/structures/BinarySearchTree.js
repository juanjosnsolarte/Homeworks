class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  isLeaf() { return this.left === null && this.right === null; }
}

export default class BinarySearchTree {
  constructor() { this.root = null; }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) { this.root = newNode; return this; }
    let cur = this.root;
    while (true) {
      if (value === cur.value) return this;           
      if (value < cur.value) {
        if (!cur.left) { cur.left = newNode; return this; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = newNode; return this; }
        cur = cur.right;
      }
    }
  }

  contains(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  inorder()  { const r=[]; (function dfs(n){ if(!n) return; dfs(n.left); r.push(n.value); dfs(n.right); })(this.root); return r; }
  preorder() { const r=[]; (function dfs(n){ if(!n) return; r.push(n.value); dfs(n.left); dfs(n.right); })(this.root); return r; }
  postorder(){ const r=[]; (function dfs(n){ if(!n) return; dfs(n.left); dfs(n.right); r.push(n.value); })(this.root); return r; }

  toD3() {
    const map = (n) => n ? ({ name: String(n.value), children: [map(n.left), map(n.right)].filter(Boolean) }) : null;
    return this.root ? map(this.root) : { name: "∅" };
  }
}
