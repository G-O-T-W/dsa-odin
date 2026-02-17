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
prettyPrint(bst.root);

console.log(bst.includes(23));
console.log(bst.includes(989));

bst.insert(33);
prettyPrint(bst.root);
