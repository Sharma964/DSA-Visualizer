// Binary Search Tree logic + traversal step generation.

export type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

export function insertBST(root: TreeNode | null, value: number): TreeNode {
  if (root === null) return { value, left: null, right: null };
  if (value < root.value) root.left = insertBST(root.left, value);
  else if (value > root.value) root.right = insertBST(root.right, value);
  return root;
}

export function deleteBST(root: TreeNode | null, value: number): TreeNode | null {
  if (root === null) return null;
  if (value < root.value) root.left = deleteBST(root.left, value);
  else if (value > root.value) root.right = deleteBST(root.right, value);
  else {
    // found node to delete
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    // two children: find inorder successor (smallest in right subtree)
    let succ = root.right;
    while (succ.left) succ = succ.left;
    root.value = succ.value;
    root.right = deleteBST(root.right, succ.value);
  }
  return root;
}

export function searchBST(root: TreeNode | null, value: number): boolean {
  if (root === null) return false;
  if (value === root.value) return true;
  return value < root.value ? searchBST(root.left, value) : searchBST(root.right, value);
}

// Layout: assign x positions via inorder traversal, y by depth.
export type PositionedNode = {
  node: TreeNode;
  x: number;
  y: number;
  left: PositionedNode | null;
  right: PositionedNode | null;
};

export function layoutTree(root: TreeNode | null, xGap = 60, yGap = 70): { positioned: PositionedNode | null; width: number; height: number } {
  if (!root) return { positioned: null, width: 0, height: 0 };
  let counter = 0;
  let maxDepth = 0;
  const assign = (node: TreeNode | null, depth: number): PositionedNode | null => {
    if (!node) return null;
    const left = assign(node.left, depth + 1);
    const x = counter * xGap;
    counter++;
    if (depth > maxDepth) maxDepth = depth;
    const right = assign(node.right, depth + 1);
    return { node, x, y: depth * yGap, left, right };
  };
  const positioned = assign(root, 0);
  return { positioned, width: counter * xGap, height: (maxDepth + 1) * yGap };
}

export type TraversalStep = {
  visited: number[]; // values visited so far
  current: number | null; // value currently being visited
  message: string;
};

function collectSteps(order: number[], messages: string[]): TraversalStep[] {
  const steps: TraversalStep[] = [];
  const visited: number[] = [];
  for (let i = 0; i < order.length; i++) {
    steps.push({ visited: [...visited], current: order[i], message: messages[i] });
    visited.push(order[i]);
  }
  steps.push({ visited: [...visited], current: null, message: 'Traversal complete' });
  return steps;
}

export function inorderSteps(root: TreeNode | null): TraversalStep[] {
  const order: number[] = [];
  const msgs: string[] = [];
  const visit = (n: TreeNode | null, depth: number) => {
    if (!n) return;
    visit(n.left, depth + 1);
    order.push(n.value);
    msgs.push(`Visit ${n.value} (left → node → right)`);
    visit(n.right, depth + 1);
  };
  visit(root, 0);
  return collectSteps(order, msgs);
}

export function preorderSteps(root: TreeNode | null): TraversalStep[] {
  const order: number[] = [];
  const msgs: string[] = [];
  const visit = (n: TreeNode | null) => {
    if (!n) return;
    order.push(n.value);
    msgs.push(`Visit ${n.value} (node → left → right)`);
    visit(n.left);
    visit(n.right);
  };
  visit(root);
  return collectSteps(order, msgs);
}

export function postorderSteps(root: TreeNode | null): TraversalStep[] {
  const order: number[] = [];
  const msgs: string[] = [];
  const visit = (n: TreeNode | null) => {
    if (!n) return;
    visit(n.left);
    visit(n.right);
    order.push(n.value);
    msgs.push(`Visit ${n.value} (left → right → node)`);
  };
  visit(root);
  return collectSteps(order, msgs);
}

export function levelOrderSteps(root: TreeNode | null): TraversalStep[] {
  if (!root) return [{ visited: [], current: null, message: 'Tree is empty' }];
  const order: number[] = [];
  const msgs: string[] = [];
  const queue: TreeNode[] = [root];
  let level = 0;
  while (queue.length) {
    const n = queue.shift()!;
    order.push(n.value);
    msgs.push(`Visit ${n.value} (level ${level})`);
    if (n.left) queue.push(n.left);
    if (n.right) queue.push(n.right);
    if (queue.length && (!n.left || !n.right)) level++;
  }
  return collectSteps(order, msgs);
}
