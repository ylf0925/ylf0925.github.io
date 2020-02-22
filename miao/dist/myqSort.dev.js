"use strict";

/**
 * @param {number[]} nums
 * @return {number[]}
 */
//quickSort
//In-place 
//Time complexity O(N*logN)
//Space complexity O(logN)
var sortArray = function sortArray(nums) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : nums.length - 1;

  //termination
  if (end - start < 1) {
    return nums;
  }

  var pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start;
  var pivot = nums[pivotIdx];
  swap(nums, pivotIdx, end);
  var i = start;

  for (var j = start; j < end; j++) {
    if (pivot > nums[j]) {
      swap(nums, i++, j);
    }
  }

  swap(nums, i, end);
  sortArray(nums, start, i - 1);
  sortArray(nums, i + 1, end);
  return nums;

  function swap(ary, i, j) {
    var tmp = ary[i];
    ary[i] = ary[j];
    ary[j] = tmp;
  }
};