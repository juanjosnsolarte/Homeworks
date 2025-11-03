export class Node {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

export class NaryTree {
  constructor(root) {
    this.root = root;
  }

  traverseDFS(callback) {
    const traverse = (node) => {
      callback(node);
      node.children.forEach(traverse);
    };
    traverse(this.root);
  }
}
