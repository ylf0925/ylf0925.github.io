//链表专题
//使用对象实现
function arrayToList(ary) {
  if (ary.length == 0) {
    return null
  }
  var tmp = []
  for (var i = 0; i < ary.length; i++) {
    var node = {
      val: ary[i],
      next: null,
    }
    tmp.push(node)
  }
  for (var i = 0; i < ary.length - 1; i++) {
    tmp[i]['next'] = tmp[i + 1]
  }

  return tmp[0]
}


function arrayToList2(ary) {
  if (ary.length == 0) {
    return null
  }
  var dummy = {} // dummy与空对象绑定
  var prev = dummy //prev 与dummy绑定
  for (var i = 0; i < ary.length; i++) {
    var node = {//生成节点
      val: ary[i],
      next: null,
    }
    prev.next = node//将prev里面的next属性值与node绑定
    /* 如果prev直接等于node的话，dummy仍然是空的 */
    prev = node//将prev与node绑定
  }
  return dummy.next
}


function arrayToList3(ary) {//call stack  有限
  if (ary.length == 0) {
    return null
  }

  var head = {
    val: ary[0],
    next: arrayToList3(ary.slice(1)), //O（n**2）
  }

  return head
}

//将ary数组从start开始到结束的元素们转换为链表
//返回转换好的头结点
function arrayToList4(ary, start = 0) {
  /*  if (arguments.length == 1) {//如果只传了一个参数，那么start为0
     start = 0
   } */

  if (start == ary.length) {
    return null
  }

  var head = {
    val: ary[start],
    next: arrayToList4(ary, start + 1),
  }

  return head
}


{
  val: 1,
    next
:
  {
    val: 2,
      next
  :
    {
      val: 3,
        next
    :
      {
        val: 4,
          next
      :
        {
          val: 5,
            next
        :
          null,
        }
        ;
      }
      ;
    }
    ;
  }
  ;
}
;

{
  val: 1,
    next
:
  {
    val: 2,
      next
  :
    {
      val: 3,
        next
    :
      {
        val: 4,
          next
      :
        null
      }
    }
  }
}

{
  val: 1,
    next
:
  {
    val: 2,
      next
  :
    {
      val: 3,
        next
    :
      null
    }
  }
}


function ListNode(val) {
  this.val = val;
  this.next = null;
}


function listToArray(head) {
  let ary = []
  if (head == null) {
    return ary
  }
  while (head) {
    ary.push(head.val)
    head = head.next
  }
  return ary
}


function listToArray2(head) {
  let ary = []
  if (head == null) {
    return ary
  }
  var tail = head.next
  var tailAry = listToArray2(tail)
  return [head.val].concat(tailAry)
}

function prepend(val, head) {
  var node = {
    val: val,
    next: head,
  }
  return node
}


function append(val, head) {
  if (head == null) {
    return {
      val: val,
      next: null,
    }
  }
  var p = head
  while (p.next) {
    p = p.next
  }
  p.next = {
    val: val,
    next: null,
  }
  return head
}

function append2(val, head) {
  if (head == null) {
    return {
      val: val,
      next: null,
    }
  }
  return append2(val, head.next)
}


function nth(head, idx) {
  if (head == null || idx < 0) {
    return undefined
  }

  var i = 0
  var p = head
  while (p.next && i < idx) {
    p = p.next
    i++
  }
  if (i == idx) {
    return p.val
  } else {
    return undefined
  }
}

function nth2(head, idx) {
  if (head == null || idx < 0) {
    return undefined
  }
  if (idx == 0) {
    return head.val
  }
  return nth2(head.next, idx - 1)
}

/* 链表与数组的不同
链表不能随机访问
数组可以随机访问（可以以任意顺序访问数组中的任意元素）
链表易增删，难查找
数组易查找，难增删
*/

//206. Reverse Linked List
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head || !head.next) {
    return head
  }
  var a = head.next
  var b = head.next.next
  head.next = null
  while (true) {
    a.next = head
    if (b == null) {
      return a
    }
    head = a
    a = b
    b = b.next
  }
}


//(1)recusion
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head
  }

  var tail = head.next
  head.next = null
  var newHead = reverseList(tail)
  tail.next = head
  return newHead
};

//(2) while loop (using three pivot)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head
  }
  var a = null
  var b = head
  var c = head.next
  do {
    b.next = a
    a = b
    b = c
    c = c.next
  } while (c !== null)
  b.next = a
  return b
};


var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head
  }
  var a = null
  var b = null
  var c = head
  while (c) {
    a = b
    b = c
    c = c.next
  }
  return b
};

//237. Delete Node in a Linked List
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
//21. Merge Two Sorted Lists
//(1) In-place reordering
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  var a = l1
  var b = l2
  var dummy = new ListNode(0)
  var t = dummy
  while (a && b) {
    if (a.val < b.val) {
      t.next = a
      a = a.next
    } else {
      t.next = b
      b = b.next
    }
    t = t.next
  }
  t.next = a || b
  return dummy.next
};

//(2) new linkedList
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  var dummy = {}
  var l = dummy

  while (l1 && l2) {
    if (l1.val > l2.val) {
      l.next = l2
      l2 = l2.next
    } else {
      l.next = l1
      l1 = l1.next
    }
    l = l.next
  }

  l.next = l1 || l2
  return dummy.next
};


debugger;
mergeTwoLists({ val: 1, next: { val: 2, next: { val: 3, next: null } } }, {
  val: 1,
  next: { val: 3, next: { val: 4, next: null } }
})
//(3) Recursively
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;ER
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function (l1, l2) {
  if (!l1 || !l2) {//l1及l2中有一个为空，返回不是空的那个
    return l1 || l2
  }

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
};

//2. Add Two Numbers
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  if (!l1) { return l2; }
  if (!l2) { return l1; }
  let dummyHead = new ListNode(-1);
  let p = dummyHead;
  let sum = 0, carry = 0;
  while (l1 || l2) {
    l1 === null ? (l1 = new ListNode(0)) : l1;
    l2 === null ? (l2 = new ListNode(0)) : l2;
    sum = l1.val + l2.val + carry;
    carry = 0;
    if (sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }
    p.next = new ListNode(sum);
    l1 = l1.next;
    l2 = l2.next;
    p = p.next;
  }
  if (carry == 1) {
    p.next = new ListNode(1);
  }
  return dummyHead.next
};


function ListNode(val) {
  this.val = val;
  this.next = null;
}
debugger;
addTwoNumbers({ val: 9, next: { val: 9, next: { val: 9, next: null } } }, {
  val: 1,
  next: null,
})
//24. Swap Nodes in Pairs
//(1)loop
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head || !head.next) {
    return head
  }

  var dummy = new ListNode(0)
  dummy.next = head

  var a = null
  var b = dummy
  var c = null
  var d = head

  while (d && d.next) {
    a = b
    c = d.next
    b = d
    d = c.next

    a.next = c
    c.next = b
    b.next = d
  }
  return dummy.next
};

//(2)recusively
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head || !head.next) {
    return head
  }

  var a = head
  var b = head.next
  var tail = b.next

  b.next = a
  a.next = swapPairs(tail)

  return b

};

//83. Remove Duplicates from Sorted List
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || !head.next) {
    return head
  }
  //two node at least
  let a = head
  let b = head.next
  while (b) {
    if (a.val == b.val) {
      b = b.next
      a.next = b
      continue
    }
    a = b
    b = b.next
  }
  return head
};

//82. Remove Duplicates from Sorted List II
//快慢指针经典问题
//利用dummy.next = head 解决开头就重复得问题
//inner-loop寻找重复,outer-loop遍历链表
//重复时快指针走，不重复时快慢一起走
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function (head) {

  if (head == null || head.next == null) {
    return head
  }

  // length >= 2
  let dummy = new ListNode(0)
  dummy.next = head
  let slow = dummy
  let fast = head

  while (fast !== null) {
    if (fast.next != null && fast.val == fast.next.val) {
      //internal loop, stop when fast!=fast.next.val

      do {
        fast = fast.next
      } while (fast.next !== null && fast.val == fast.next.val)

      // change pointer
      slow.next = fast.next
      fast = fast.next
    } else {
      fast = fast.next
      slow = slow.next
    }
  }
  return dummy.next
}

//142. Linked List Cycle II
//(1)Hash map approach
//Time complexity O(n)
//Space complexity O(n)
//时间复杂度为什么不是O(n**2)?
//set数组有n个元素，每个元素为一个节点，里面有n个
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {

  let curr = head
  let map = new Set()

  while (curr !== null) {
    if (map.has(curr)) {
      return curr
    }
    map.add(curr)
    curr = curr.next
  }
  return null
};


//floyd algorithm
//快指针走两步，慢指针走一步，直到相遇
//相遇后新指针从start出发，若成环两指针再次相遇，此时为环的入口
//Time complexity O(n)
//Space complexity O(1)

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let start = head
  let slow = head
  let fast = head
  while (true) {
    if (fast == null) {
      return null
    }
    fast = fast.next
    if (fast == null) {
      return null
    }
    fast = fast.next
    slow = slow.next
    if (fast == slow) {
      break
    }
  }
  while (start !== slow) {
    start = start.next
    slow = slow.next
  }
  return slow
};

//141. Linked List Cycle
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
//try floyd
var hasCycle = function (head) {
  let fast = head
  let slow = head
  while (fast !== null) {
    fast = fast.next
    if (fast == null) {
      return false
    }
    fast = fast.next
    slow = slow.next
    if (fast == slow) {
      return true
    }
  }
  return false
};


//876. Middle of the Linked List
//try floyd algorithm

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let fast = head, slow = head;
  if (head.next == null) {
    return head
  }
  //length >=2
  while (fast.next != null) {
    fast = fast.next
    slow = slow.next
    if (fast.next !== null) {
      fast = fast.next
    }
  }
  return slow
};

//148. Sort List
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var sortList = function (head) {
  if (head == null || head.next == null) {
    return head
  }//exception excluded
  // node length >= 2
  let mid = findBeforeMiddle(head)
  let right = mid.next
  mid.next = null
  let left = head

  left = sortList(left)
  right = sortList(right)

  return mergeTwoLists(left, right)


  function mergeTwoLists(l1, l2) {
    var dummy = new ListNode(-1)
    var l = dummy

    while (l1 && l2) {
      if (l1.val > l2.val) {
        l.next = l2
        l2 = l2.next
      } else {
        l.next = l1
        l1 = l1.next
      }
      l = l.next
    }

    l.next = l1 || l2
    return dummy.next
  };

  function findBeforeMiddle(head) {
    if (head == null || head.next == null) {
      return head
    }
    //length >=2
    let slow = head
    let fast = head
    while (true) {
      if (fast.next !== null) {
        fast = fast.next
      }
      if (fast.next !== null) {
        fast = fast.next
      }
      if (fast.next !== null) {
        slow = slow.next
      }
      if (fast.next == null) {
        break
      }
    }
    return slow
  }
};


//160. Intersection of Two Linked Lists
//(1) hash table
//Time complexcity O(m+n)
//Space complexcity O(m) or O(n)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

var getIntersectionNode = function (headA, headB) {
  let pointerA = headA
  let pointerB = headB
  let map = new Set()
  while (pointerA != null) {
    map.add(pointerA)
    pointerA = pointerA.next
  }
  while (true) {
    if (map.has(pointerB)) {
      return pointerB
    }
    if (pointerB !== null) {
      pointerB = pointerB.next
    } else {
      return null
    }
  }
};

//(2) double pointer
//Time complexcity O(n)
//Space complexcity O(1)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

var getIntersectionNode = function (headA, headB) {
  let pointerA = headA
  let pointerB = headB
  if (headA == null || headB == null) {
    return null
  }
  while (pointerA !== pointerB) {
    pointerA = (pointerA == null) ? headB : pointerA.next
    pointerB = (pointerB == null) ? headA : pointerB.next
  }
  return pointerA
};


//61. Rotate List
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
//Time complexity(O(N))
//Space complexity(O(1)) ,no extra space needed
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head == null || head.next == null) {
    return head
  }
  //l >= 2
  let prev = new ListNode(-1)
  prev.next = head
  let end = head, breakPoint = head;
  let count = 1
  while (end.next !== null) {
    end = end.next;
    count++
  }
  end.next = head
  //成环了
  let breakIdx = count - (k % count) + 1
  for (let recount = 1; recount < breakIdx; recount++) {
    breakPoint = breakPoint.next
    prev = prev.next
  }
  prev.next = null
  return breakPoint
};
