function qSort(ary, start = 0, end = ary.length - 1){
  if (end - start < 1) return 
  let pivotIdx = Math.floor(Math.random() * (end - start + 1) + start)
  let pivot = ary[pivotIdx]

  swap(ary, pivotIdx, end)

  let i = start, j = start
  for (;j < end ;j++) {
    if (ary[j] < pivot) swap(ary,i++, j)
  }

  swap (ary, i, end)

  qSort(ary, start ,i-1)
  qSort(ary, i+1 ,end)

  function swap(nums, i, j){
    if (i != j) {
      let tmp = nums[i] 
      nums[i] = nums[j]
      nums[j] = tmp
    } 
  }
}
