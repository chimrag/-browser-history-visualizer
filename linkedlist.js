// ─── Node ───────────────────────────────────────────────
class Node {
  constructor(url) {
    this.url  = url;
    this.prev = null;
    this.next = null;
  }
}

// ─── BrowserHistory (Doubly Linked List) ────────────────
class BrowserHistory {
  constructor(homepage) {
    this.head = new Node(homepage);
    this.curr = this.head;
  }

  visit(url) {
    const newNode  = new Node(url);
    // Cut off any forward history
    this.curr.next = newNode;
    newNode.prev   = this.curr;
    this.curr      = newNode;
  }

  back(steps) {
    while (steps-- && this.curr.prev) {
      this.curr = this.curr.prev;
    }
    return this.curr.url;
  }

  forward(steps) {
    while (steps-- && this.curr.next) {
      this.curr = this.curr.next;
    }
    return this.curr.url;
  }

  canBack()    { return !!this.curr.prev; }
  canForward() { return !!this.curr.next; }

  // Returns all nodes from head → tail
  getAllNodes() {
    const nodes = [];
    let n = this.head;
    while (n) { nodes.push(n); n = n.next; }
    return nodes;
  }
}
