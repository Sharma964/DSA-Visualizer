// Central algorithm metadata + code snippets for the DSA Visualizer.

export type Complexity = {
  best: string;
  average: string;
  worst: string;
  space: string;
};

export type AlgoInfo = {
  name: string;
  description: string;
  howItWorks: string[];
  complexity: Complexity;
  code: string;
};

export const sortingAlgorithms: Record<string, AlgoInfo> = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The largest unsorted element "bubbles" to its correct position each pass.',
    howItWorks: [
      'Start at the beginning of the array.',
      'Compare the current element with the next one.',
      'If the current is greater, swap them.',
      'Move to the next pair and repeat until the end of the pass.',
      'Repeat passes, shrinking the unsorted portion by one each time.',
    ],
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted
  }
  return arr;
}`,
  },
  selection: {
    name: 'Selection Sort',
    description:
      'Divides the array into a sorted and unsorted region. Repeatedly finds the minimum element in the unsorted region and moves it to the end of the sorted region.',
    howItWorks: [
      'Assume the first element is the minimum.',
      'Scan the unsorted region for a smaller element.',
      'When found, swap it with the first unsorted position.',
      'Expand the sorted region by one.',
      'Repeat until the whole array is sorted.',
    ],
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
  },
  insertion: {
    name: 'Insertion Sort',
    description:
      'Builds the final sorted array one item at a time by picking the next element and inserting it into its correct position among the previously sorted elements.',
    howItWorks: [
      'Start from the second element (index 1).',
      'Compare it with elements to its left.',
      'Shift larger elements one position to the right.',
      'Insert the current element into the opened gap.',
      'Move to the next element and repeat.',
    ],
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  },
  merge: {
    name: 'Merge Sort',
    description:
      'A divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, then merges the sorted halves back together.',
    howItWorks: [
      'Divide the array into two halves.',
      'Recursively sort the left half.',
      'Recursively sort the right half.',
      'Merge the two sorted halves into one.',
      'Base case: an array of length 0 or 1 is already sorted.',
    ],
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
  },
  quick: {
    name: 'Quick Sort',
    description:
      'A divide-and-conquer algorithm that picks a pivot, partitions the array so smaller elements come before the pivot and larger ones after, then recursively sorts each partition.',
    howItWorks: [
      'Choose a pivot (here: last element).',
      'Partition so values ≤ pivot are on the left.',
      'Place the pivot between the two groups.',
      'Recursively sort the left partition.',
      'Recursively sort the right partition.',
    ],
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    code: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
  return arr;
}

function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}`,
  },
};

export const searchingAlgorithms: Record<string, AlgoInfo> = {
  linear: {
    name: 'Linear Search',
    description:
      'Sequentially checks each element of the array until the target is found or the end is reached. Works on any array, sorted or not.',
    howItWorks: [
      'Start at index 0.',
      'Compare the element at the current index with the target.',
      'If it matches, return the index.',
      'Otherwise, move to the next index.',
      'If you reach the end, the target is not present.',
    ],
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
  },
  binary: {
    name: 'Binary Search',
    description:
      'Repeatedly divides a sorted array in half, comparing the target to the middle element and discarding the half that cannot contain the target.',
    howItWorks: [
      'Set two pointers: low and high.',
      'Find the middle index.',
      'If the middle value equals the target, return it.',
      'If the target is smaller, search the left half.',
      'If larger, search the right half. Repeat until found or empty.',
    ],
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
  },
};

export const dataStructureInfo: Record<string, AlgoInfo> = {
  linkedList: {
    name: 'Linked List',
    description:
      'A linear collection of nodes where each node holds a value and a reference (pointer) to the next node. Dynamic size and efficient insertions/deletions.',
    howItWorks: [
      'Each node stores a value and a next pointer.',
      'The head points to the first node.',
      'The last node points to null.',
      'Traversal follows next pointers one by one.',
      'Insert/delete only requires re-pointing neighbours.',
    ],
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; }

  insertAtEnd(value) {
    const node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  reverse() {
    let prev = null, cur = this.head;
    while (cur) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    this.head = prev;
  }
}`,
  },
  stack: {
    name: 'Stack',
    description:
      'A LIFO (Last-In, First-Out) structure. Elements are added and removed only from the top. Used for function calls, undo systems, and expression evaluation.',
    howItWorks: [
      'push(value) adds an element to the top.',
      'pop() removes and returns the top element.',
      'peek() returns the top without removing it.',
      'Only the top is accessible.',
      'A stack overflows when it hits capacity, underflows when empty.',
    ],
    complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)' },
    code: `class Stack {
  constructor(maxSize = 10) {
    this.items = [];
    this.maxSize = maxSize;
  }
  push(value) {
    if (this.items.length >= this.maxSize) throw new Error('Overflow');
    this.items.push(value);
  }
  pop() {
    if (!this.items.length) throw new Error('Underflow');
    return this.items.pop();
  }
  peek() { return this.items[this.items.length - 1]; }
}`,
  },
  queue: {
    name: 'Queue',
    description:
      'A FIFO (First-In, First-Out) structure. Elements enter at the rear and leave from the front. Used for scheduling, buffering, and BFS traversal.',
    howItWorks: [
      'enqueue(value) adds to the rear.',
      'dequeue() removes from the front.',
      'peek() returns the front element.',
      'Order is preserved: first in, first out.',
      'Empty queue → underflow; full queue → overflow.',
    ],
    complexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)' },
    code: `class Queue {
  constructor(maxSize = 10) {
    this.items = [];
    this.maxSize = maxSize;
  }
  enqueue(value) {
    if (this.items.length >= this.maxSize) throw new Error('Overflow');
    this.items.push(value);
  }
  dequeue() {
    if (!this.items.length) throw new Error('Underflow');
    return this.items.shift();
  }
  peek() { return this.items[0]; }
}`,
  },
  tree: {
    name: 'Binary Search Tree',
    description:
      'A hierarchical structure where each node has at most two children. For every node, left descendants are smaller and right descendants are larger, enabling fast search.',
    howItWorks: [
      'Start at the root.',
      'To insert, go left if smaller, right if larger.',
      'Search follows the same path.',
      'Inorder traversal yields sorted order.',
      'Delete by handling 0, 1, or 2 child cases.',
    ],
    complexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(n)' },
    code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(value) {
    this.root = this._insert(this.root, value);
  }
  _insert(node, value) {
    if (!node) return new TreeNode(value);
    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);
    return node;
  }

  inorder(node = this.root, out = []) {
    if (node) {
      this.inorder(node.left, out);
      out.push(node.value);
      this.inorder(node.right, out);
    }
    return out;
  }
}`,
  },
  graph: {
    name: 'Graph',
    description:
      'A collection of nodes (vertices) connected by edges. Models networks, maps, and relationships. Traversal algorithms explore reachable vertices.',
    howItWorks: [
      'Store vertices and edges in an adjacency list.',
      'BFS explores neighbours level by level using a queue.',
      'DFS dives deep along one path using a stack/recursion.',
      'Shortest path (BFS) finds the fewest edges between two nodes.',
      'Track visited nodes to avoid cycles.',
    ],
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    code: `class Graph {
  constructor() { this.adj = new Map(); }

  addNode(id) { this.adj.set(id, []); }

  addEdge(a, b) {
    this.adj.get(a).push(b);
    this.adj.get(b).push(a); // undirected
  }

  bfs(start) {
    const visited = new Set([start]);
    const queue = [start], order = [];
    while (queue.length) {
      const node = queue.shift();
      order.push(node);
      for (const n of this.adj.get(node) || []) {
        if (!visited.has(n)) { visited.add(n); queue.push(n); }
      }
    }
    return order;
  }
}`,
  },
};

export const traversalInfo: Record<string, AlgoInfo> = {
  inorder: {
    name: 'Inorder Traversal',
    description: 'Visits left subtree, then the node, then the right subtree. Produces sorted order in a BST.',
    howItWorks: ['Recurse into the left child.', 'Visit the current node.', 'Recurse into the right child.'],
    complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
    code: `function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
  return out;
}`,
  },
  preorder: {
    name: 'Preorder Traversal',
    description: 'Visits the node first, then left subtree, then right subtree. Useful for copying trees.',
    howItWorks: ['Visit the current node.', 'Recurse into the left child.', 'Recurse into the right child.'],
    complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
    code: `function preorder(node, out = []) {
  if (!node) return out;
  out.push(node.value);
  preorder(node.left, out);
  preorder(node.right, out);
  return out;
}`,
  },
  postorder: {
    name: 'Postorder Traversal',
    description: 'Visits left subtree, then right subtree, then the node. Useful for deleting trees.',
    howItWorks: ['Recurse into the left child.', 'Recurse into the right child.', 'Visit the current node.'],
    complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(h)' },
    code: `function postorder(node, out = []) {
  if (!node) return out;
  postorder(node.left, out);
  postorder(node.right, out);
  out.push(node.value);
  return out;
}`,
  },
  levelorder: {
    name: 'Level Order Traversal',
    description: 'Visits nodes level by level using a queue. Also known as Breadth-First traversal.',
    howItWorks: ['Enqueue the root.', 'Dequeue a node and visit it.', 'Enqueue its left then right child.', 'Repeat until the queue is empty.'],
    complexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(w)' },
    code: `function levelOrder(root) {
  if (!root) return [];
  const queue = [root], out = [];
  while (queue.length) {
    const node = queue.shift();
    out.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return out;
}`,
  },
};

export const graphAlgorithms: Record<string, AlgoInfo> = {
  bfs: {
    name: 'Breadth-First Search',
    description: 'Explores the graph level by level from a start node, visiting all neighbours before going deeper.',
    howItWorks: ['Start at the source node.', 'Mark it visited and enqueue it.', 'Dequeue a node, visit its unvisited neighbours.', 'Enqueue each newly visited neighbour.', 'Repeat until the queue is empty.'],
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start], order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const n of graph[node] || []) {
      if (!visited.has(n)) { visited.add(n); queue.push(n); }
    }
  }
  return order;
}`,
  },
  dfs: {
    name: 'Depth-First Search',
    description: 'Explores as far as possible along each branch before backtracking. Uses recursion or an explicit stack.',
    howItWorks: ['Start at the source node.', 'Mark it visited.', 'Recurse into each unvisited neighbour.', 'Backtrack when no unvisited neighbours remain.', 'Repeat until all reachable nodes are visited.'],
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    code: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const n of graph[start] || []) {
    if (!visited.has(n)) dfs(graph, n, visited, order);
  }
  return order;
}`,
  },
  shortest: {
    name: 'Shortest Path (BFS)',
    description: 'Finds the path with the fewest edges between two nodes in an unweighted graph using BFS.',
    howItWorks: ['Start BFS from the source.', 'Track the parent of each visited node.', 'When the target is reached, stop.', 'Reconstruct the path by following parents backward.', 'If the target is never reached, no path exists.'],
    complexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
    code: `function shortestPath(graph, start, target) {
  const visited = new Set([start]);
  const parent = new Map();
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    if (node === target) break;
    for (const n of graph[node] || []) {
      if (!visited.has(n)) {
        visited.add(n); parent.set(n, node); queue.push(n);
      }
    }
  }
  const path = [];
  let cur = target;
  while (cur !== undefined) { path.unshift(cur); cur = parent.get(cur); }
  return path[0] === start ? path : null;
}`,
  },
};

export const allTopics = [
  'arrays',
  'searching',
  'sorting',
  'linked-list',
  'stack',
  'queue',
  'trees',
  'graphs',
] as const;

export type TopicId = (typeof allTopics)[number];

export const topicMeta: Record<TopicId, { title: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; description: string }> = {
  arrays: { title: 'Arrays', difficulty: 'Beginner', description: 'Visualize array operations and element access.' },
  searching: { title: 'Searching', difficulty: 'Beginner', description: 'Linear and binary search with live comparisons.' },
  sorting: { title: 'Sorting', difficulty: 'Intermediate', description: 'Watch 5 classic sorting algorithms in action.' },
  'linked-list': { title: 'Linked List', difficulty: 'Intermediate', description: 'Nodes, pointers, and dynamic operations.' },
  stack: { title: 'Stack', difficulty: 'Beginner', description: 'LIFO structure with push, pop, and peek.' },
  queue: { title: 'Queue', difficulty: 'Beginner', description: 'FIFO structure with enqueue and dequeue.' },
  trees: { title: 'Trees', difficulty: 'Advanced', description: 'Binary search tree with 4 traversals.' },
  graphs: { title: 'Graphs', difficulty: 'Advanced', description: 'Build graphs and run BFS, DFS, shortest path.' },
};
