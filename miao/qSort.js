/**
 * @param {number[]} nums
 * @return {number[]}
 */
const qSort = function (nums, start = 0, end = nums.length - 1) {
  if (end - start < 1) { return nums }

  let l = nums.length
  let pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
  let pivot = nums[pivotIdx]

  swap(nums, pivotIdx, end)

  let i = start
  for (let j = start; j < l; j++) {
    if (pivot > nums[j]) {
      swap(nums, i++, j)
    }
  }

  swap(nums, i, end)
  qSort(nums, start, i - 1)
  qSort(nums, i + 1, end)

  return nums

  function swap(ary, i, j) {
    let tmp = ary[i]
    ary[i] = ary[j]
    ary[j] = tmp
  }
}

/**
 * @param {number[]} ary
 * @return {number[]}
 */
function mergeSort(ary) {
  let l = ary.length
  if (l > 1) {
    let m = l >> 1
    let left = ary.slice(0, m)
    let right = ary.slice(m, l)
    mergeSort(left)
    mergeSort(ary)
    merge(ary, m)
  }

  function merge(ary, m) {
    let i = 0, j = m + 1
    let tmp = []
    for (let k = 0; k < ary.length; k++) {
      if (j > n) { tmp[k] = ary[i++] }
      else if (i > m) { tmp[k] = ary[j++] }
      else if (ary[i] < ary[j]) { tmp[k] = ary[i++] }
      else { tmp[k] = ary[j++] }
    }
    for (let k = 0; k < ary.length; k++) {
      ary[k] = tmp[k]
    }
  }
}