//二叉树专题

/* 完全二叉树
满二叉树

若为完全二叉树
节点N->层数
Math.floor(lg(N))+1

层数N->节点
2**(N-1)~2**(N)-1

若为满二叉树
层数N->节点
2**(N)-1

使用对象实现
使用数组实现
*/


//若为完全二叉树，下标为i的子节点的下标分别任2i+1和2i+2

//将根节点在数组rootPos位置的一个由数组表达的二叉树
//转换为二叉链表表达的树
function ary2tree(ary, rootPos = 0) {
  if (ary[rootPos] == null) {
    return null
  }
  let left = ary2tree(ary, rootPos * 2 + 1)
  let right = ary2tree(ary, rootPos * 2 + 2)
  let root = {
    val: ary[rootPos],
    left: left,
    right: right,
  }
  return root
}

//二叉链表表达的树放回数组
//根节点放在pos位置
function tree2ary(root, pos = 0, result = []) {
  if (root) {
    result[pos] = root.val
    tree2ary(root.left, pos * 2 + 1, result)
    tree2ary(root.right, pos * 2 + 2, result)
  }
  return result
}

tree2ary(root)


//leetcode表示法 condensedTree
//null
{
  val: 1,
    left
:
  {
    val: 2,
      left
  :
    null,
      right
  :
    null
  }
,
  right: {
    val: 3,
      left
  :
    {
      val: 4,
        left
    :
      null,
        right
    :
      null
    }
  ,
    right: {
      val: 5,
        left
    :
      null,
        right
    :
      null
    }
  }
}


function lcary2tree(ary) {
  if (ary.length == 0) {
    return null
  }
  let root = {
    val: ary[0], left: null, right: null
  }
  //nodes 是一个queue
  let queue = [root]
  for (let i = 1; i < ary.length; i++) {
    let curr = queue.shift()
    if (ary[i] != null) {
      let node = {
        val: ary[i], left: null, right: null
      }
      curr.left = node
      queue.push(node)
    } else {
      curr.left = null
    }

    i++
    if (i >= ary.length) {
      break
    }

    if (ary[i] != null) {
      let node = {
        val: ary[i], left: null, right: null
      }
      curr.right = node
      queue.push(node)
    } else {
      curr.right = null
    }
  }
  return root
}

debugger;
lcary2tree([1, 2, 3, null, 4, null, 5, 6, 7, null, 8, null, 9, 10])


function lctree2ary(root) {
  if (root) {
    let result = []
    let nodes = [root]
    while (nodes.length) {
      let curr = nodes.shift()
      if (curr) {
        result.push(curr.val)
        nodes.push(curr.left, curr.right)
      } else {
        result.push(null)
      }
    }
    return result
  }
  return []
}

function lctree2ary(root) {
  if (root) {
    let result = [root.val]
    let nodes = [root]
    while (nodes.length) {
      let curr = nodes.shift()
      if (curr.left) {
        result.push(curr.left.val)
        nodes.push(curr.left)
      } else {
        result.push(null)
      }
      if (curr.right) {
        result.push(curr.right.val)
        nodes.push(curr.right)
      } else {
        result.push(null)
      }
    }
    while (result[result.length - 1] === null) {
      result.pop()
    }
    return result
  }
  return []
}

//my transform
function condensedA2T(ary) {
  let queue = [], l = ary.length, curr;
  if (l == 0) {
    return null
  }
  let root = {
    val: ary[0],
    left: null,
    right: null,
  }
  queue.push(root)
  for (let i = 1; i < l; i++) {
    curr = queue.shift()
    if (ary[i] != null) {
      curr.left = {
        val: ary[i],
        left: null,
        right: null,
      }
      queue.push(curr.left)
    }

    i++

    if (ary[i] != null) {
      curr.right = {
        val: ary[i],
        left: null,
        right: null,
      }
      queue.push(curr.right)
    }
  }
  return root
}

function mytree2ary(root, res = []) {
  if (root == null) {
    return res
  }
  let queue = []
  queue.push(root)
  res.push(root.val)

  while (queue.length != 0) {
    let curr = queue.shift()
    if (curr.left !== null) {
      queue.push(curr.left)
      res.push(curr.left.val)
    } else {
      res.push(null)
    }
    if (curr.right !== null) {
      queue.push(curr.right)
      res.push(curr.right.val)
    } else {
      res.push(null)
    }
  }

  while (res[res.length - 1] === null) {
    res.pop()
  }
  return res
}


function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}


function preOrderTraverse(root, action) {
  //前序
  if (root) {
    action(root.val)
    preOrderTraverse(root.left, action)
    preOrderTraverse(root.right, action)
  }
}

function inOrderTraverse(root, action) {
  //中序
  if (root) {
    inOrderTraverse(root.left, action)
    action(root.val)
    inOrderTraverse(root.right, action)
  }
}

function postOrderTraverse(root, action) {
  //后序
  if (root) {
    postOrderTraverse(root.left, action)
    postOrderTraverse(root.right, action)
    action(root.val)
  }
}

//利用BST的一些特性
//Time complexity O(N*lgN+N) == O(N*lgN)
//Space complexity O(N)
//遍历数组每一项并将其插入树中

function bstSort(ary) {
  let root = null;
  for (let i = 0; i < ary.length; i++) {
    root = insertIntoBST(root, ary[i])
  }
  let k = 0;

  inOrderTraverse(root, val => {
    ary[k++] = val
  })
  return ary
}

function insertIntoBST(root, val) {
  if (!root) {
    return new TreeNode(val)
  }
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val)
  } else {
    root.right = insertIntoBST(root.right, val)
  }
  return root
}

//start code runner
ary = [2, 4, 2077, 6, 21, 9, 5, 1]
let k = bstSort(ary)
console.log(k)


//700. Search in a Binary Search Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// (1) recursively
var searchBST = function (root, val) {
  if (root == null) return null
  if (root.val == val) return root
  if (root.val > val) return searchBST(root.left, val)
  else return searchBST(root.right, val)
};


//(2) iterativly
//Time complexity : O(lgN)
//Space complexity :  O(1)
var searchBST = function (root, val) {
  while (root) {
    if (root.val == val) return root
    if (root.val > val) root = root.left
    else root = root.right
  }
  return root
};



//701. Insert into a Binary Search Tree
//(1) iteratively
//Time complexity : O(lgN)
//Space complexity :  O(1)
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */

var insertIntoBST = function (root, val) {
  let curr = root
  while (curr != null) {
    if (val > curr.val) {
      if (curr.right == null) {
        curr.right = new TreeNode(val)
        return root
      } else curr = curr.right
    } else {
      if (curr.left == null) {
        curr.left = new TreeNode(val)
        return root
      } else curr = curr.left
    }
  }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
//(2) recursively
//Time complexity : O(lgN)
//Space complexity : call stack depth O(lgN)
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (!root) return new TreeNode(val)
  if (root.val < val) { root.right = insertIntoBST(root.right, val) }
  else { root.left = insertIntoBST(root.left, val) }
  return root
};

//144. Binary Tree Preorder Traversal
//(1)recursively
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let res = []
  preT(root)
  return res

  function preT(root) {
    if (root) {
      res.push(root.val)
      preT(root.left)
      preT(root.right)
    }
  }
};

//(2)iteratively
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (!root) { return [] }
  let stack = [], res = [], curr;
  stack.push(root)
  while (stack.length != 0) {
    curr = stack.pop()
    if (curr) {
      res.push(curr.val)
      if (curr.right) stack.push(curr.right)
      if (curr.left) stack.push(curr.left)
    }
  }
  return res
};

//94. Binary Tree Inorder Traversal
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
//(1) recursively
//Space complexity : depth of call stack O(lgN)
//Time complexity : O(N)
var inorderTraversal = function (root) {
  let res = []
  inTrav(root)
  return res

  function inTrav(root) {
    if (root) {
      inTrav(root.left)
      res.push(root.val)
      inTrav(root.right)
    }
  }
};

//(2) iteratively
//Time complextity : O(N)
//Space complextity : O(lgN)
//利用stack回到原来的节点，这个思路很重要
var inorderTraversal = function (root) {
  let res = [], stack = [], curr = root
  if (!root) { return res }
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr)
      curr = curr.left
    }
    curr = stack.pop()
    res.push(curr.val)
    curr = curr.right
  }
  return res
}

//(3) Morris Traversal
//Time complextity O(N)
//Space complextity O(1)
//想不出来，看懂都费劲
var inorderTraversal = function (root) {
  let res = [], curr = root, pre;
  while (curr) { //curr 永远指向最{高}节点
    if (curr.left == null) {
      res.push(curr.val)
      curr = curr.right
    } else {
      pre = curr.left
      while (pre.right) { pre = pre.right }//左子树的最右节点
      pre.right = curr //该节点右节点指向curr,左子树最右节点接到curr上
      temp = curr
      curr = curr.left
      temp.left = null //temp的左节点断掉
    }
  }
  return res
}

//145. Binary Tree Postorder Traversal
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  let res = []
  postTrav(root)
  return res
  function postTrav(root) {
    if (root) {
      postTrav(root.left)
      postTrav(root.right)
      res.push(root.val)
    }
  }
};

//100. Same Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // q x  p x
  if (p == null && q == null) {
    return true
  }
  // q o  p x
  // q x  p o
  if (p == null || q == null) {
    return false
  }
  // q o p o
  if (p.val == q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  } else {
    return false
  }
};

//101. Symmetric Tree
//(1)recusively
//Time complexity : O(N)
//Space complexity : O(lgN)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true
  else return isMirror(root.left, root.right)

  function isMirror(t1, t2) {
    if (t1 == null && t2 == null) return true
    if (t1 == null || t2 == null) return false
    return ((t1.val == t2.val)
      && isMirror(t1.right, t2.left)
      && isMirror(t1.left, t2.right))
  }
}

//(2)iteratively
//遍历两遍，效率低
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;
  const stack1 = [], stack2 = [];
  let curr1 = root, curr2 = root;
  while ((curr1 && curr2) || (stack1.length && stack2.length)) {
    while (curr1) {
      stack1.push(curr1);
      curr1 = curr1.left;
    }
    while (curr2) {
      stack2.push(curr2);
      curr2 = curr2.right;
    }
    curr1 = stack1.pop(), curr2 = stack2.pop();
    if ((curr1.val !== curr2.val) || (stack1.length !== stack2.length)) {
      return false;
    }
    curr1 = curr1.right, curr2 = curr2.left;
  }
  return true;
}

//106. Construct Binary Tree from Inorder and Postorder Traversal
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (inorder.length == 0) return null
  let l = inorder.length, rootVal = postorder[l - 1];
  let rootPos = inorder.indexOf(rootVal)

  let leftInorder = inorder.slice(0, rootPos)
  let rightInorder = inorder.slice(rootPos + 1)

  let leftPostorder = postorder.slice(0, leftInorder.length)
  let rightPostorder = postorder.slice(leftInorder.length, l - 1)

  let root = new TreeNode(rootVal)
  root.left = buildTree(leftInorder, leftPostorder)
  root.right = buildTree(rightInorder, rightPostorder)

  return root
};



//104. Maximum Depth of Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root) {
    return 1 + Math.max(maxDepth(root.left)
      , maxDepth(root.right))
  }
  return 0
};

var maxDepth = function (root) {
  if (!root) return 0
  let max = 0
  traverse(root, 0)
  function traverse(root, depth) {
    if (root) {
      if (depth > max) max = depth
      traverse(root.left, depth + 1)
      traverse(root.right, depth + 1)
    }
  }
  return max + 1
};



//111. Minimum Depth of Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/** 
 * @param {TreeNode} root
 * @return {number}
 */
//(1)traverse all nodes
var minDepth = function (root) {
  if (!root) { return 0 }
  if (!root.left && !root.right) { return 1 }
  if (!root.left) { return 1 + minDepth(root.right) }
  if (!root.right) { return 1 + minDepth(root.left) }
  //Both left and right subtree exist!!
  return 1 + Math.min(minDepth(root.right), minDepth(root.left))
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
//(2)BFS
var minDepth = function (root) {
  if (!root) return 0
  let queue = [root], curr = null, depth = 0;
  while (queue.length) {
    depth++
    let queLength = queue.length
    //dump current queue
    for (let j = 0; j < queLength; j++) {
      curr = queue.shift()
      if (!curr.left && !curr.right) return depth
      if (curr.left) queue.push(curr.left)
      if (curr.right) queue.push(curr.right)
    }
  }
};


//226. Invert Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root) {
    let l = invertTree(root.left)
    let r = invertTree(root.right)
    root.left = r
    root.right = l
    return root
  }
  return root
};

//617. Merge Two Binary Trees
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
  //t1 x t2 x
  if (t1 == null && t2 == null) {
    return null
  }
  //t1 x t2 o
  //t1 o t2 x
  if (t1 == null) {
    return t2
  }
  if (t2 == null) {
    return t1
  }
  //t1 o t2 o
  if (t1 !== null && t2 !== null) {
    let root = new TreeNode(t1.val + t2.val)
    root.left = mergeTrees(t1.left, t2.left)
    root.right = mergeTrees(t1.right, t2.right)
    return root
  }
};

//112. Path Sum
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  if (!root.left && !root.right) {
    return root.val == sum
  }
  return hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
};

//606. Construct String from Binary Tree
//(1) recursive
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */

let tree2str = function (t) {
  //4种情况
  if (t == null) {
    return ''
  }
  if (t.left == null && t.right == null) {
    return t.val + ""
  }
  if (t.right == null) {
    return t.val + "(" + tree2str(t.left) + ")"
  }
  return t.val + "(" + tree2str(t.left) + ")(" + tree2str(t.right) + ")";
};


//107. Binary Tree Level Order Traversal II
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let ans = [], depth = -1;
  if (!root) { return ans; }
  let queue = [root], curr = null, queLength = 0;
  while (queue.length) {
    queLength = queue.length;
    ans.push([]);
    depth++
    for (let j = 0; j < queLength; j++) {
      //queLenghth就是这一层节点的个数
      curr = queue.shift();
      ans[depth].push(curr.val);
      if (curr.left) { queue.push(curr.left); }
      if (curr.right) { queue.push(curr.right); }
    }
  }
  return ans.reverse();
};

//recursively
//T:O(N)
//S:O(H)
var levelOrderBottom = function (root) {
  let ans = [];
  if (!root) { return ans; }
  helperBFS(root, 0)
  return ans.reverse();

  function helperBFS(node, depth) {

    if (depth == ans.length) { ans.push([]); }
    ans[depth].push(node.val);
    if (node.left) { helperBFS(node.left, depth + 1); }
    if (node.right) { helperBFS(node.right, depth + 1); }
  }
};

//102. Binary Tree Level Order Traversal
//(1)BFS recusively 妙啊！
//Time complexity : O(N)
//Space complexity : O(H)
//H is the height of binary tree -> roughly lgN if it is balanced binary tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrder = function (root) {
  let res = []
  //res 里面放的是*数组*
  if (!root) return res
  helperBFS(root, 0)
  return res

  function helperBFS(node, depth) {
    if (!node) return;
    if (res.length === depth) { res.push([]); }
    res[depth].push(node.val)
    //一个重要的思想是当res里面的depth == res数组长度时，push数值
    helperBFS(node.left, depth + 1)
    helperBFS(node.right, depth + 1)
  }

};

let root = condensedA2T([1, 2, 3, null, null, 4, 5])
debugger; levelOrder(root)

//(2)BFS Iterative 
//妙啊！
//Time complexity : O(N)
//Space complexity : O(H)
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrder = function (root) {
  if (!root) return [];
  let res = [], queue = [root];
  let depth = -1, queLength = 0, curr = null;
  while (queue.length) {
    queLength = queue.length
    res.push([])
    depth++;
    for (let i = 0; i < queLength; i++) {
      //上一次队列的里所有元素都要push到res里
      curr = queue.shift();
      res[depth].push(curr.val);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
  return res;
};

//404. Sum of Left Leaves
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
  if (root) {
    if (isLeafNode(root.left)) {
      return root.left.val + sumOfLeftLeaves(root.right)
    } else {
      return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
    }
  } else return 0

  function isLeafNode(node) {
    return node && (!node.left && !node.right)
  }
};

var sumOfLeftLeaves = function (root, side) {
  if (root) {
    if (isLeafNode(root) && side == "l") {
      return root.val + sumOfLeftLeaves(root.right, "r")
    } else {
      return sumOfLeftLeaves(root.left, "l") + sumOfLeftLeaves(root.right, "r")
    }
  } else return 0

  function isLeafNode(node) {
    return node && (!node.left && !node.right)
  }
};

//450. Delete Node in a BST
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = function (root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, val);
    return root;
  }

  if (key > root.val) {
    root.right = deleteNode(root.right, val);
    return root;
  }

  if (key == root.val) {
    if (!root.left && !root.right) return null
    if (!root.left) return root.right
    if (!root.right) return root.left
    let leftMaxNode = getMaxNode(root.left)
    root.val = leftMaxNode.val
    root.left = deleteNode(root.left, leftMaxNode.val)
    return root
  }

  function getMaxNode(root) {
    while (root.right) root = root.right
    return root
  }
};


//Time complexity : O(H)
//Space complexity : O(H)
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = (root, key) => {
  if (!root) return null
  return helper(root, key)
  function helper(node, key) {
    if (node) {
      if (node.val < key) { node.right = helper(node.right, key) }
      if (node.val > key) { node.left = helper(node.left, key) }
      if (node.val == key) {
        if (!node.left && !node.right) { return null }
        if (!node.left) { return node.right }
        if (!node.right) { return node.left }
        //both subtree exsit
        //rotate tree 
        let leftSub = node.left
        node = node.right
        let leftMost = node
        while (leftMost.left) { leftMost = leftMost.left }
        leftMost.left = leftSub
      }
      return node
    }
  }
}


//297. Serialize and Deserialize Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return ""
  //root不为空
  return tree2ary(root)
  function tree2ary(root) {
    let res = [root.val], queue = [root], curr = null, str = "";
    while (queue.length) {
      curr = queue.shift()
      if (curr.left) {
        res.push(curr.left.val)
        queue.push(curr.left)
      } else res.push(null)
      if (curr.right) {
        res.push(curr.right.val)
        queue.push(curr.right)
      } else res.push(null)
    }
    while (res[res.length - 1] === null) {
      res.pop()
    }
    for (let j = 0; j < res.length; j++) {
      if (j !== res.length - 1) {
        if (res[j] === null) str += "null" + ","
        else str += String(res[j]) + ","
      } else {
        if (res[j] === null) str += "null"
        else str += String(res[j])
      }
    }
    return str
  }
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data == "") return null
  str = data.split(",")
  let root = new TreeNode(parseInt(str[0])), queue = [root], curr = null;
  let l = data.length

  for (let j = 1; j < l; j++) {
    curr = queue.shift()
    if (!isNaN(str[j])) {
      curr.left = new TreeNode(parseInt(str[j]))
      queue.push(curr.left)
    }

    j++

    if (str[j] == undefined) break
    if (!isNaN(str[j])) {
      curr.right = new TreeNode(parseInt(str[j]))
      queue.push(curr.right)
    }
  }
  return root
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

//B站面试题
/**
 * @param {String} num
 * @return {String}
 */
//"1234" -> "4321"
function transform(n, isOuterMost = true) {
  if (n == 0) {
    if (isOuterMost) return "0"
    else return ""
  }
  let digit = n % 10
  let rest = (n - digit) / 10
  return "" + digit + transform(rest, false)
}

//124. Binary Tree Maximum Path Sum
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let res = -Infinity;
  if (root == null) { return 0; }
  let left = Math.max(0, maxPathSum(root.leftleft));
  let right = Math.max(0, maxPathSum(root.right));
  res = Math.max(res, left + right + root.val)
  return Math.max(left, right) + root.val
};

//多叉树 
//559. Maximum Depth of N-ary Tree
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 */

var maxDepth = function (root) {
  if (!root) return 0
  else return countDepth(root)

  function countDepth(node) {
    if (!node.children) { return 0 }
    if (!node.children.length) { return 1 }
    return Math.max(...node.children.map(countDepth)) + 1
  }
};


//589. N-ary Tree Preorder Traversal
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  let res = []
  helperPreTrav(root)
  return res

  function helperPreTrav(node) {
    if (node) {
      res.push(node.val)
      if (node.children.length) node.children.map(helperPreTrav)
    }
  }
};


//590. N-ary Tree Postorder Traversal
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  let res = []
  helperPostTrav(root)
  return res

  function helperPostTrav(node) {
    if (node) {
      if (node.children.length) node.children.map(helperPostTrav)
      res.push(node.val)
    }
  }
};


//429. N-ary Tree Level Order Traversal
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {

};


let root = {
  val: 1,
  children: [
    {
      val: 3,
      children: [{ val: 5, children: [], }, { val: 6, children: [], }],
    },
    { val: 2, children: [], },
    { val: 4, children: [], },
  ],
}
debugger;
