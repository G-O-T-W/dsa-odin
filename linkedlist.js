class Node{
    constructor(value)
    {
        this.value = value;
        this.next = null;
    }
}

export default class LinkedList {

    constructor() {
        this.head = null;
    }

    append(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let tmpNode = this.head;
        while (tmpNode.next) tmpNode = tmpNode.next; // get the last node
        tmpNode.next = newNode; // append new node to last node
    }

    findNode(key) {
        let tmpNode = this.head;
        let nodeKey;
        while (tmpNode) {
            nodeKey = Object.keys(tmpNode.value)[0]; // accessing key of an object
            if (nodeKey == key) {
                return tmpNode;
            } 
            tmpNode = tmpNode.next;
        } 
        return null;
    }

    deleteNode(node) {
        if (node == this.head) {
            this.head = null;
            return;
        } 
        let tmpNode = this.head;
        while (tmpNode.next != node) tmpNode = tmpNode.next;
        tmpNode.next = tmpNode.next.next;
    }
}