class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  iterate(cb) {
    let currentNode = this.head;
    while (currentNode) {
      cb(currentNode);
      currentNode = currentNode.next;
    }
    return this.head;

  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    function printNode(node) {
      console.log(node.value);
    }
    this.iterate(printNode);
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let foundValue = null;
    function findNode(node) {
      if (node.value === target) {
        foundValue = node;
      }
    }

    this.iterate(findNode);
    return foundValue;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    let formerHead = this.head;
    this.head = node;
    this.head.next = formerHead;
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    if (this.head) {
      let currentLastNode = this.head;
      function findLast(iteratedNode) {
        if (!iteratedNode.next) {
          currentLastNode = iteratedNode;
        }
      }
      this.iterate(findLast);
      currentLastNode.next = node;
    } else {
      this.head = node;
    }
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    if (this.head) {
      let removedHead = this.head;
      this.head = this.head.next;
      return removedHead;
    }
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    let penultimate = null;
    let removedNode = null;
    function findPenultimate(node) {
      if (node.next) {
        if (!node.next.next) {
          penultimate = node;
          removedNode = penultimate.next;
          penultimate.next = null;
        }
      }
    }

    this.iterate(findPenultimate);
    return removedNode;

  }

  // replace the node at the given index with the given node
  // replace(idx, node) {

  //   let count = 0;
  //   function changeNodeVal(iteratedNode) {
  //     if (count === idx) {
  //       iteratedNode.value = node.value;
  //       iteratedNode.next = node.next;
  //       // iteratedNode.value = node.value;
  //     }
  //     count++;
  //   }
  //   this.iterate(changeNodeVal)
  //   return node;
  // }

  replace(idx, node) {

    if (idx === 0) {
      this.removeFirst()
      this.addFirst(node);
      return node;
    }

    let count = 0;
    let currentNode = this.head;
    let prevNode = null;
    function changeNodeVal(iteratedNode) {
      if (count === idx) {
        let tempNext = currentNode.next;
        node.next = tempNext;
        prevNode.next = node;
      }
      count++;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    this.iterate(changeNodeVal);
    return node;
  }




  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {

    if (idx === 0) {
      this.addFirst(node);
    } else {
      let count = 0;
      function insertNode(iteratedNode) {
        count++;
        if (count === idx) {
          let currentNext = iteratedNode.next;
          iteratedNode.next = node;
          node.next = currentNext;
        }
      }
      this.iterate(insertNode);
    }


  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      this.removeFirst();
    }

    let count = 0;
    let nodeToRemove = null;
    function removeNode(iteratedNode) {
      if (count + 1 === idx) {
        nodeToRemove = iteratedNode.next;
        iteratedNode.next = nodeToRemove.next;
      }
      count++;

    }
    this.iterate(removeNode);
    return nodeToRemove;

  }

  clear() {
    // while (this.head) {
    //   this.removeFirst();
    // }

    this.head = null;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;

  }
}

if (require.main === module) {



  let head = new Node('one', new Node('two', new Node('three')));
  let list = new LinkedList(head);
  list.remove(2);

  list.print();



}

module.exports = {
  Node, LinkedList
};
