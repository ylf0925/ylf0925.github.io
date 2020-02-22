/**
 * @param {number[]} nums
 * @return {number[]}
 */
//quickSort
//In-place 
//Time complexity O(N*logN)
//Space complexity O(logN)
var sortArray = function (nums, start = 0, end = nums.length - 1) {
  //termination
  if (end - start < 1) { return nums }

  let pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
  let pivot = nums[pivotIdx]
  swap(nums, pivotIdx, end)

  let i = start
  for (let j = start; j < end; j++) {
    if (pivot > nums[j]) {
      swap(nums, i++, j)
    }
  }

  swap(nums, i, end)
  sortArray(nums, start, i - 1)
  sortArray(nums, i + 1, end)
  return nums

  function swap(ary, i, j) {
    let tmp = ary[i]
    ary[i] = ary[j]
    ary[j] = tmp
  }
}