interface TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function newTreeNode(val: number): TreeNode<number> {
  return {
    val,
    left: undefined,
    right: undefined
  };
}

function TreeNode(val: number) {
  this.val = val;
  this.left = this.right = null;
}

function generateTrees(n: number) {
  const result = _generatiTrees(1, n);
  return result;
}

function _generatiTrees(l: number, r: number) {
  if (l > r) {
    return [undefined];
  }
  const result = [];
  for (let i = l; i < r + 1; i++) {
    const lefts = _generatiTrees(l, i - 1);
    const rights = _generatiTrees(i + 1, r);
    lefts.forEach(ln =>
      rights.forEach(rn => {
        const node = newTreeNode(i);
        node.left = ln;
        node.right = rn;
        result.push(node);
      })
    );
  }
  return result;
}
// 原来这种方法叫递归+memorize
function generateTrees2(n: number) {
  if (n === 0) {
    return []
  }
  const trees: Map<string, Array<TreeNode<number>>> = new Map();
  const result = _generatiTrees2(1, n, trees);
  return result;
}

function _generatiTrees2(
  left: number,
  right: number,
  trees: Map<string, Array<TreeNode<number>>>
) {
  if (left > right) {
    return [null];
  }
  const result = [];
  for (let i = left; i <= right; i++) {
    const lk = `${left}-${i - 1}`;
    let lts = trees.get(lk);
    if (lts === undefined) {
      lts = _generatiTrees2(left, i - 1, trees);
      trees.set(lk, lts);
    }
    const rk = `${i + 1}-${right}`;
    let rts = trees.get(rk);
    if (rts === undefined) {
      rts = _generatiTrees2(i + 1, right, trees);
      trees.set(rk, rts);
    }
    lts.forEach(ln =>
      rts.forEach(rn => {
        const node = newTreeNode(i);
        node.left = ln;
        node.right = rn;
        result.push(node);
      })
    );
  }
  return result;
}

function main() {
  console.log("run...");
  const result = generateTrees2(3);
  console.log(result);
}

main();
