#!/usr/bin/env node
import LinkedList from "./linkedlist.js";

export default class Hashmap {
    constructor() {
        this.buckets = [];
        this.load_factor = 0.75;
        this.capacity = 16;
        this.size = 0;
    }

    isOutOfBounds(index) {
        return index < 0 || index >= this.capacity;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
            hashCode %= this.capacity;
        }
        if (this.isOutOfBounds(hashCode))
            throw new Error("Trying to access index out of bound");
        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode]; 
        /* TODO
         *  use tuple instead of object
        */
        let obj = {[key]: `${value}`}; // creating an object key value pair
        if (!list) {
            list = new LinkedList(); // creating linked list
            list.append(obj);
            this.buckets[hashCode] = list;
            this.size++;
        } else {
            // collision
            let node = list.findNode(key);
            if (node) {
                // overwrite the key
                node.value[key] = value;
            } else {
                // add new key 
                list.append(obj);
                this.size++;
            }
        }

        // check hashmap size 
        if (this.size >= this.load_factor * this.capacity) {
            this.capacity *= 2; // doubling the capacity if load level reached        
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (list) {
            let node = list.findNode(key);
            if (node) {
                return node.value[key];
            }
        }
        return null;
    }

    has(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (list) { 
            let node = list.findNode(key);
            if (node) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        let list = this.buckets[hashCode];
        if (list) {
            let node = list.findNode(key);
            if (node) {
                list.deleteNode(node);
                this.size--; 
                return true;
            }
        } 
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets.length = 0;
        this.load_factor = 0.75;
        this.capacity = 16;
        this.size = 0;
    }

    keys() {
        let keys = [];
        let nodeKey = "";
        this.buckets.forEach((list) => {
            let node = list.head;
            while (node) {
                nodeKey = Object.keys(node.value)[0];
                keys.push(nodeKey);
                node = node.next;
            }
        });
        return keys;
    }

    values() {
        let values = [];
        let nodeKey = "";
        let nodeValue = '';
        this.buckets.forEach((list) => {
            let node = list.head;
            while (node) {
                nodeKey = Object.keys(node.value)[0];
                nodeValue = node.value[nodeKey];
                values.push(nodeValue);
                node = node.next;
            }
        });
        return values;
    }

    entries() {
        let entries = [];
        let entry = {};
        this.buckets.forEach((list) => {
            let node = list.head;
            while (node) {
                entry = node.value;
                entries.push(entry);
                node = node.next;
            }
        });
        return entries;
    }
};