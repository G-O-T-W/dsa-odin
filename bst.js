#!/usr/bin/env node

// Node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Tree
class Tree {
  constructor(arr) {
    arr = [...new Set(arr)]; // remove duplicates
    arr.sort((a, b) => a - b); // sort in ascending order
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);
    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);
    return root;
  }

  #getSuccessor(cur) {
    cur = cur.right;
    while (cur !== null && cur.left !== null) {
      cur = cur.left;
    }
    return cur;
  }

  #deleteNode(root, value) {
    if (root === null) return null;
    if (root.data > value) {
      root.left = this.#deleteNode(root.left, value);
    } else if (root.data < value) {
      root.right = this.#deleteNode(root.right, value);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      const succ = this.#getSuccessor(root);
      root.data = succ.data;
      root.right = this.#deleteNode(root.right, succ.data);
    }
    return root;
  }

  #inorder(root, callback) {
    if (root == null) return;
    this.#inorder(root.left, callback);
    root.data = callback(root.data);
    this.#inorder(root.right, callback);
  }

  #preorder(root, callback) {
    if (root == null) return;
    root.data = callback(root.data);
    this.#preorder(root.left, callback);
    this.#preorder(root.right, callback);
  }

  #postorder(root, callback) {
    if (root == null) return;
    this.#postorder(root.left, callback);
    this.#postorder(root.right, callback);
    root.data = callback(root.data);
  }

  #findLongestPath(root) {
    if (root == null) return 0;
    let l = this.#findLongestPath(root.left);
    let r = this.#findLongestPath(root.right);

    return 1 + Math.max(l, r);
  }

  #isBalancedHelper(root) {
    if (root == null) return 0;
    let l = this.#isBalancedHelper(root.left);
    let r = this.#isBalancedHelper(root.right);
    if (l == -1 || r == -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }

  includes(value) {
    let cur = this.root;
    while (cur !== null) {
      if (cur.data == value) return true;
      else if (cur.data > value) cur = cur.left;
      else cur = cur.right;
    }
    return false;
  }

  insert(value) {
    if (!this.includes(value)) {
      let cur = this.root;
      while (cur !== null) {
        if (cur.data > value) {
          if (cur.left !== null) {
            cur = cur.left;
          } else {
            cur.left = new Node(value);
            return;
          }
        } else {
          if (cur.right !== null) {
            cur = cur.right;
          } else {
            cur.right = new Node(value);
            return;
          }
        }
      }
    }
  }

  deleteItem(value) {
    let cur = this.root;
    return this.#deleteNode(cur, value);
  }

  levelOrderForEach(callback) {
    if (!(typeof callback === "function")) {
      throw new Error("No callback function passed.");
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let node = queue.shift();
      node.data = callback(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (!(typeof callback === "function")) {
      throw new Error("No callback function passed.");
    }
    this.#inorder(this.root, callback);
  }

  preOrderForEach(callback) {
    if (!(typeof callback === "function")) {
      throw new Error("No callback function passed.");
    }
    this.#preorder(this.root, callback);
  }

  postOrderForEach(callback) {
    if (!(typeof callback === "function")) {
      throw new Error("No callback function passed.");
    }
    this.#postorder(this.root, callback);
  }

  height(value) {
    let cur = this.root;
    while (cur !== null) {
      if (cur.data > value) {
        cur = cur.left;
      } else if (cur.data < value) {
        cur = cur.right;
      } else {
        console.log("FOUND");
        return this.#findLongestPath(cur) - 1;
      }
    }
  }

  depth(value) {
    let cur = this.root;
    let d = 0;
    while (cur !== null) {
      d++;
      if (cur.data > value) {
        cur = cur.left;
      } else if (cur.data < value) {
        cur = cur.right;
      } else {
        return d - 1;
      }
    }
  }

  isBalanced() {
    const res = this.#isBalancedHelper(this.root);
    if (res == -1) return false;
    else return true;
  }

  rebalance() {
    let arr = [];
    this.inOrderForEach((x) => arr.push(x));
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }
}
// Driver Code

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const randArr = (u_limit, size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    let el = Math.floor(Math.random() * u_limit);
    arr.push(el);
  }
  return arr;
};

const arr = randArr(100, 10);
const bst = new Tree(arr);

console.log("Tree is balanced:" + bst.isBalanced());

let traversal = [];
bst.levelOrderForEach(function (x) {
  traversal.push(x);
  return x;
});
console.log(traversal);

traversal = [];
bst.inOrderForEach(function (x) {
  traversal.push(x);
  return x;
});
console.log(traversal);

traversal = [];
bst.preOrderForEach(function (x) {
  traversal.push(x);
  return x;
});
console.log(traversal);

traversal = [];
bst.postOrderForEach(function (x) {
  traversal.push(x);
  return x;
});
console.log(traversal);

bst.insert(133);
bst.insert(246);
bst.insert(101);

prettyPrint(bst.root);
console.log("Tree is balanced:" + bst.isBalanced());
bst.rebalance();
prettyPrint(bst.root);
console.log("Tree is balanced:" + bst.isBalanced());
