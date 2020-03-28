
//Sorting
/*
冒泡
选择
插入
希尔
归并
快排
堆排序
计数排序
桶排序
基数排序
 */


Array(100).fill(0).map(it => Math.random() * 100 | 0)


//插入排序(Insertion sort)
//in-place
//T: O (n**2)
//S: O(1)
let insertSort = function (nums) {
  let l = nums.length, i;
  for (let j = 0; j < l; j++) {
    let curr = nums[j]
    i = j - 1
    while (i >= 0 && nums[i] > curr) {
      nums[i + 1] = nums[i]
      i--
    }
    nums[i + 1] = curr
  }
  return nums
}

//选择排序
//in-place
//T : O(N**2)
//S : O(1)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function selectSort(nums) {
  let l = nums.length, minIdx, min;
  if (l == 0) { return nums }
  for (let j = 0; j < l; j++) {
    min = Infinity
    for (let i = j; i < l; i++) {
      if (nums[i] < min) {
        min = nums[i]
        minIdx = i
      }
    }
    swapTwo(nums, j, minIdx)
  }
  return nums

  function swapTwo(ary, i, j) {
    if (i !== j) {
      let tmp = ary[i]
      ary[i] = ary[j]
      ary[j] = tmp
    }
    return ary
  }
}

//归并排序(merge sort)
//out-place
//T : O(N*lgN)
//S : O(N)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {

  if (nums.length == 0 || nums.length == 1) {
    return nums
  }

  let mid = nums.length >> 1
  let left = nums.slice(0, mid)
  let right = nums.slice(mid, nums.length)

  left = sortArray(left)
  right = sortArray(right)

  let i = 0
  let j = 0
  let k = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      nums[k++] = left[i++]
    } else {
      nums[k++] = right[j++]
    }
  }
  while (i < left.length) {
    nums[k++] = left[i++]
  }
  while (j < right.length) {
    nums[k++] = right[j++]
  }
  return nums
};

//所有元素都相同得数组来说，退化为N**2,调用栈会达到N
//快排(quickSort)
//in-place
//T: (N*lgN)
//S: (lgN)
function qSort(ary, start = 0, end = ary.length - 1) {//start 跟 end 都是包含的
  if (end - start < 1) { return ary }
  var pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
  var pivot = ary[pivotIdx]
  swap(ary, pivotIdx, end)
  var i = start

  for (var j = start; j < end; j++) {
    if (ary[j] < pivot) {
      swap(ary, i++, j)
    }
  }

  swap(ary, i, end)
  qSort(ary, start, i - 1)
  qSort(ary, i + 1, end)
  return ary

  function swap(ary, i, j) {
    if (ary[i] == ary[j]) return
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
    return ary
  }
}


//利用快排分割思想
//414. Third Maximum Number
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  nums = qSort(nums)
  let l = nums.length, count = 0;
  let min = Infinity
  for (let i = l - 1; i >= 0; i--) {
    if (nums[i] < min) {
      min = nums[i]
      count++
    }
    if (count == 3) {
      return nums[i]
    }
  }
  return nums[l - 1]

  function qSort(ary, start = 0, end = ary.length - 1) {
    if (end - start < 1) {
      return ary
    }
    let l = ary.length
    let pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
    let pivot = ary[pivotIdx]

    swap(ary, pivotIdx, end)

    let i = start
    for (let j = start; j < end; j++) {
      if (pivot > ary[j]) {
        swap(ary, i++, j)
      }
    }

    swap(ary, i, end)
    qSort(ary, start, i - 1)
    qSort(ary, i + 1, end)
    return ary

    function swap(ary, i, j) {
      let tmp = ary[i]
      ary[i] = ary[j]
      ary[j] = tmp
    }
  }
};

//利用快排分割思想
//215. Kth Largest Element in an Array
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let l = nums.length
  if (l == 1) {
    return nums[0]
  }
  return qSortIdx(nums, l - k)

  function qSortIdx(nums, targetIdx, start = 0, end = nums.length - 1) {
    if (start == end) {
      return nums[start]
    }
    let pivotIdx = Math.floor(Math.random() * (end - start) + 1) + start
    let pivot = nums[pivotIdx]

    swap(nums, pivotIdx, end)

    let i = start
    for (let j = start; j < end; j++) {
      if (pivot > nums[j]) {
        swap(nums, i++, j)
      }
    }

    swap(nums, i, end)
    //i 的位置就是实际的位置
    if (i == targetIdx) {
      return nums[i]
    } else if (i > targetIdx) {
      0
      return qSortIdx(nums, targetIdx, start, i - 1)
    } else if (i < targetIdx) {
      return qSortIdx(nums, targetIdx, i + 1, end)
    }

    function swap(ary, i, j) {
      let tmp = ary[i]
      ary[i] = ary[j]
      ary[j] = tmp
    }
  }
};

//169. Majority Element
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let l = nums.length
  if (l == 0) return null;
  if (l == 1) return nums[0]
  return qSortIdx(nums, parseInt((l - 1) / 2))

  function qSortIdx(nums, targetIdx, start = 0, end = nums.length - 1) {
    if (start == end) {
      return nums[start]
    }
    let pivotIdx = Math.floor(Math.random() * (end - start) + 1) + start
    let pivot = nums[pivotIdx]

    swap(nums, pivotIdx, end)

    let i = start, j = start
    for (; j < end; j++) {
      if (pivot > nums[j]) {
        swap(nums, i++, j)
      }
    }

    swap(nums, i, end)
    //i 的位置就是实际的位置
    if (i == targetIdx) {
      return nums[i]
    } else if (i > targetIdx) {
      return qSortIdx(nums, targetIdx, start, i - 1)
    } else if (i < targetIdx) {
      return qSortIdx(nums, targetIdx, i + 1, end)
    }

    function swap(ary, i, j) {
      if (i != j) {
        let tmp = ary[i]
        ary[i] = ary[j]
        ary[j] = tmp
      }
    }
  }
};
