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