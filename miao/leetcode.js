
// 461
var hammingDistance = function (x, y) {
  let digit_x
  let digit_y
  let count = 0
  while (x || y) { // x||y 会返回true，如果x和y都不为0
    digit_x = x % 2 //二进制数最后一位
    digit_y = y % 2
    if (digit_x !== digit_y) {
      count++
    }
    x = (x - digit_x) / 2
    y = (y - digit_y) / 2
  }
  return count
};

const hammingDistance = function (x, y) {
  var count = 0
  var z = x ^ y
  while (z) {
    var k = (z % 2)
    if (k) {
      count++
    }
    z >>= 1
  }
  return count
}

const hammingDistance = function (x, y) {
  var count = 0
  var z = x ^ y
  while (z) {
    count += z & 1 //按位&运算，每次走一位
    z >>= 1 //丢掉最后一位
  }
  return count
}

const hammingDistance = function (x, y) {
  var count = 0
  var z = x ^ y
  while (z) {
    z = z & (z - 1)
    count++
  }
  return count
}

//342
var isPowerOfFour = function (num) {
  if (num == 0) {
    return false
  }
  while (num % 4 == 0) {
    num = num / 4
  }
  return num == 1
}

//204
var countPrimes = function (n) {
  let isPrime
  let count = 0
  for (let i = 2; i <= n; i++) {
    isPrime = true
    let sqrt_i = Math.sqrt(i)
    for (let j = 2; j <= sqrt_i; j++) {
      if (i % j == 0) {
        isPrime = false
        break
      }
    }

    if (isPrime) {
      count++
    }
  }
  return count
};

//205
var isIsomorphic = function (s, t) {//利用obj的唯一性
  let map = {}
  let top
  let m
  for (let i = 0; i < s.length; i++) {
    top = s[i]
    if (top in map) {
      if (map[top] !== t[i]) {
        return false
      }
    } else {
      map[top] = t[i]
    }
  }
  map = {}
  for (let i = 0; i < s.length; i++) {
    top = t[i]
    if (top in map) {
      if (map[top] !== s[i]) {
        return false
      }
    } else {
      map[top] = s[i]
    }
  }
  return true
};
//575
var distributeCandies = function (candies) {
  let ary = []
  let species = 1
  let i
  let candyNums = candies.length
  while (candies.length != 0) {
    i = 0
    let cur = candies.shift()
    for (; i < candies.length; i++) {
      if (candies[i] == cur) {
        species++
        candies.splice(i, 1)
        i--
      }
    }
    ary.push(species)
    species = 1
  }
  return Math.min(count, (candyNums / 2))
};

var distributeCandies = function (candies) {//重点是在一看有多少种糖果，如果种类数大于糖果数的一半，那么姐姐总有一半的糖果。如果小于一半，那么输出结果就是糖果种类
  let map = {}
  let count = 0
  for (let i = 0; i < candies.length; i++) {
    let cur = candies[i]
    if (!(cur in map)) {
      map[cur] = 1//表示让其出现一次
      count++ //记录下这种
    }
  }
  return Math.min(count, (candies.length / 2))
};


//67 
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let sum = ""
  let digitSum
  let carry = 0
  let l = Math.max(a.length, b.length)
  let d = Math.abs(a.length - b.length)
  if (a.length > b.length) { //补0
    b = Zeropad(b, d)
  } else if (a.length < b.length) {
    a = Zeropad(a, d)
  }

  for (let i = l - 1; i >= 0; i--) {
    digitSum = Number(a[i]) + Number(b[i]) + carry
    carry = 0
    switch (digitSum) {
      case 0:
        digitSum = 0
        break
      case 1:
        digitSum = 1
        break
      case 2:
        digitSum = 0
        carry = 1
        break
      case 3:
        digitSum = 1
        carry = 1
        break
    }
    sum = String(digitSum) + sum
    if (i == 0 && carry == 1) {
      sum = "1" + sum
    }
  }
  return sum

  function Zeropad(x, y) {
    var sum = x
    for (let w = 0; w < y; w++) {
      x = sum
      sum = "0" + x
    }
    return sum
  }
};



//867
//组装法
var transpose = function (A) {
  let m = A.length
  let n = A[0].length
  let trans = []
  let comp = []
  let j = 0
  while (j < n) {
    for (let i = 0; i < m; i++) {
      comp.push(A[i][j])
    }
    trans.push(comp)
    comp = []
    j++
  }
  return trans
};

//生成赋值法
var transpose = function (A) {
  let m = A.length//row
  let n = A[0].length//col
  let tran = Array(n)//此时tran是一个array了 
  for (let i = 0; i < n; i++) {
    tran[i] = Array(m)//里面的每一项再变成数组
  }


  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      tran[j][i] = A[i][j]
    }
  }
  return tran
}
//258
var addDigits = function (num) {
  if (num < 10) {
    return num
  }
  if (num % 9 == 0) {
    return 9
  } else {
    return num % 9
  }
}
//58 
var lengthOfLastWord = function (s) {
  let l = s.length - 1
  let count = 0
  for (let i = l; i >= 0; i--) {
    if (s[i] !== '') {
      count++
    } else if (s[i] === '') {
      break
    }
  }
  return count
};
// 412
var fizzBuzz = function (n) {
  var ary = []
  for (let i = 1; i <= n; i++) {
    if (i % 5 == 0 && i % 3 == 0) {
      ary.push("FizzBuzz")
    } else if (i % 5 == 0) {
      ary.push("Buzz")
    } else if (i % 3 == 0) {
      ary.push("Fizz")
    } else {
      ary.push(String(i))
    }
  }
  return ary
};
//32
const isValid = function (s) {
  let stackRight = []
  let aryConverted = s.split("")
  let l = aryConverted.length
  let top
  let result = ""
  for (let i = 1; i <= l; i++) {
    top = aryConverted.pop()
    if (top === ")" || top === "]" || top === "}") {
      stackRight.push(top)
    }
    if (top === "(" || top === "{" || top === "[") {
      while () {
        result += inPair(top, stackRight.pop())
        continue
      } else {

      }
    }
  }

  function inPair(x, y) {
    if ((x === "(") && (y === ")")) {
      return "()"
    } else if ((x === "[") && (y === "]")) {
      return "[]"
    } else if ((x === "{") && (y === "}")) {
      return "{}"
    }
  }
}
// 20
const isValid = function (s) {
  let stackRight = []
  let aryConverted = s.split("")
  let l = aryConverted.length
  let top
  if (l % 2 !== 0) {
    return false
  }
  for (let i = 1; i <= l; i++) {
    top = aryConverted.pop()
    if (top === ")" || top === "]" || top === "}") {
      stackRight.push(top)
    }
    if (top === "(" || top === "{" || top === "[") {
      if (inPair(top, stackRight.pop())) {
        continue
      } else {
        return false
      }
    }
  }
  return true
  function inPair(x, y) {
    if ((x === "(") && (y === ")")) {
      return true
    } else if ((x === "[") && (y === "]")) {
      return true
    } else if ((x === "{") && (y === "}")) {
      return true
    } else {
      return false
    }
  }
}
const isValid = function (s) {
  var stack = []
  for (var i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      stack.push("(")
    }
    if (s[i] == "[") {
      stack.push("[")
    }
    if (s[i] == "{") {
      stack.push("{")
    }
    if (s[i] == ")") {
      if (stack[stack.length - 1] == "(") {
        stack.pop()
      } else {
        return false
      }
    }
    if (s[i] == "]") {
      if (stack[stack.length - 1] == "[") {
        stack.pop()
      } else {
        return false
      }
    }
    if (s[i] == "}") {
      if (stack[stack.length - 1] == "{") {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length == 0

}
const isValid = function (s) {
  var stack = []
  for (var i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
        stack.push(')')
        break
      case "{":
        stack.push("}")
        break
      case "[":
        stack.push("]")
        break
      default:
        if (s[i] != stack.pop()) { return false }
    }
  }
  return stack.length == 0
}

// 26
var removeDuplicates = function (nums) {
  if (nums.length < 2) {
    return nums.length
  }
  var nextPos = 1;
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[nextPos] = nums[i]
      nextPos++
    }
  }
  return nextPos
};


// 190
var reverseBits = function (nums) {
  let digit
  let sum = 0
  for (let i = 1; i <= 32; i++) {
    sum <<= 1
    digit = nums & 1
    sum += digit
    nums >>>= 1
  }
  return sum >>> 0
};

/* 
11111111111111111111111111111110        1
00000000000000000000000000000001
 */




// 283 
var moveZeroes = function (nums) {
  let l = nums.length
  let iterator = l
  let count = 0
  let top
  while (iterator > 1) {
    for (let i = 0; i <= iterator - 2; i++) {
      if (nums[i] === 0) {
        top = nums[i]
        nums[i] = nums[i + 1]
        nums[i + 1] = top
      }
    };
    iterator--
  }
  return nums
}


var moveZeroes = function (nums) {
  var i = 0
  for (var j = 0; j < nums.length; j++) {
    if (nums[j] != 0) {
      nums[i] = nums[j]
      i++
    }
  }
  while (i < nums.length) {
    nums[i] = 0
    i++
  }

}

// 136
var singleNumber = function (nums) {
  var r = 0
  for (let i = 0; i < nums.length; i++) {
    r = r ^ nums[i]
  }
  return r
}


// 977
var sortedSquares = function (A) {

  var minIndex = 0
  for (var i = 0; i < A.length; i++) {
    if (Math.abs(A[minIndex]) > Math.abs(A[i])) {
      minIndex = i
    }
  }

  var left = minIndex
  var right = left + 1
  var result = []
  while (left >= 0 && right < A.length) {
    if (Math.abs(A[left] < Math.abs(A[right]))) {
      result.push(A[left] * A[left])
      left--
    } else {
      result.push(A[right] * A[right])
      right++
    }
  }
  while (left >= 0) {
    result.push(A[left] * A[left])
    left--
  }
  while (right < A.length) {
    result.push(A[right] * A[right])
    right++
  }
  return result
}

var sortedSquares = function (A) {
  let iterator = A.length
  let tmp
  for (let i = 0; i < iterator; i++) {
    A[i] = A[i] * A[i]
  }

  while (iterator > 1) {
    for (let j = 0; j < iterator - 1; j++) {
      if (A[j + 1] < A[j]) {
        tmp = A[j + 1]
        A[j + 1] = A[j]
        A[j] = tmp
      }
    }
    iterator--
  }
  return A
}


// 27
var removeElement = function (nums, val) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j] = nums[i]
      j++
    }
  }
  return j
}
//49
//输入数组每一项排序后的结果是一样的，用该结果作为ojb的key
var groupAnagrams = function (strs) {
  let map = {}
  let l = strs.length
  for (let i = 0; i < l; i++) {
    let top = strs[i]
    let key = getKey(top)
    if (key in map) {
      map[key].push(top)
    } else {
      map[key] = [top]
    }
  }
  let result = []
  for (key in map) {
    result.push(map[key])
  }
  return result

  function getKey(strs) {//传入字符串，返回排序后的字符串
    var chars = strs.split('')//将传入的字符串分割，返回一个数组
    return chars.sort().join('')//将数组排序（alphabaticallly）之后的结果，在拼接为字符串
  }
};
// 50
// 二进制法 
// (1)数组存储二进制指数，并反向遍历。

function myPow(x, n) {
  let sign = 1
  if (n < 0) {
    sign = -1
    n = -n
  }
  let nBinary = []
  let digit
  let result = 1
  do {
    digit = n & 1
    nBinary.push(digit)
    n >>>= 1
  } while (n > 0)
  for (let i = nBinary.length; i >= 0; i--) {
    if (nBinary[i] == 1) {
      result = result * result * x
    } else {
      result = result * result
    }
  }
  if (sign == -1) {
    return 1 / result
  } else {
    return result
  }
}
// (2) 指定一个超大的数，进行位运算，得到指数二进制形式开头的第一个 1
function myPow(x, n) {
  let number = 0b01000000000000000000000000000000 //32bits
  let result = 1
  for (let i = 0; i < 31; i++) {
    if ((number & n) == 0) {
      result = result * result
    } else {
      result = result * result * x
    }
    number = number >>> 1
  }
  return result
}
// (3) 将指数转换为二进制法
function myPow(x, n) {
  let sign = 1
  if (n < 0) {
    sign = -1
    n = -n
  }
  let result = 1
  let sequenceAt = x
  do {
    digit = n & 1
    n >>>= 1
    if (digit) {
      result = result * sequenceAt
    }
    sequenceAt = sequenceAt * sequenceAt
  } while (n > 0)
  if (sign == -1) {
    return 1 / result
  } else {
    return result
  }
}
// 对半重乘法
function myPow(x, n) {
  let sign = 1
  if (n < 0) {
    sign = -1
    n = -n
  }

  let accumulated = x
  let curPow = 1
  let result = 1

  while (n !== 0) {
    if (curPow * 2 <= n) {
      accumulated = accumulated * accumulated
      curPow *= 2
    } else { //指数再乘二时大于n了，此时重置
      result *= accumulated
      accumulated = x
      n = n - curPow //计算剩余的次幂数
      curPow = 1 //指数从1开始重新计算
    }
  }
  if (sign == -1) {
    return 1 / result
  } else {
    return result
  }
}
// Recusion 递归法
function myPow(x, n) {
  let t
  let sign
  if (n >= 0) {
    return Pow(x, n)
  } else {
    return 1 / Pow(x, -n)
  }
  function Pow(x, n) {
    if (n == 0) {
      return 1
    } else if (n == 1) {
      return x
    } else if (n % 2 == 0) {
      t = Pow(x, n / 2)
      return t * t
    } else if (n % 2 !== 0) {
      t = Pow(x, Math.floor(n / 2))
      return t * t * x
    }
  }
}


// 1
var twoSum = function (nums, target) {
  let l = nums.length
  let j = 0
  let i = j + 1
  let ary = []
  while (true) {
    for (i = j + 1; i <= l - 1; i++) {
      if ((nums[i] + nums[j]) === target) {
        ary.push(j)
        ary.push(i)
        return ary
      }
    }
    j++
  }
};


//3
//滑动窗口型
var lengthOfLongestSubstring = function (s) {
  let map = {}
  let i = 0
  let j = 0
  let stlength
  let stMax = -Infinity
  if (s.length == 0) {
    return 0
  }
  for (; i < s.length; i++) {
    let cur = s[i]
    if (cur in map && map[cur] != 0) {
      while (cur != s[j]) {
        map[s[j]]--
        j++
      }
      j++
    } else {//不在map里面
      map[cur] = 1
      stlength = i - j + 1
      if (stlength > stMax) {
        stMax = stlength
      }
    }
  }
  return stMax
};


// 35
var searchInsert = function (nums, target) {
  let l = nums.length
  for (let i = 0; i < l; i++) {
    if (nums[i] === target) {
      return i
    } else if (nums[i] > target) {
      return 0
    } else {//第n个数不与target相等
      if (i < l - 1) {
        if (nums[i] <= target && target >= nums[i + 1]) {
          continue
        }
        if (nums[i] <= target && target <= nums[i + 1]) {
          return i + 1
        }
      }

      if (i == l - 1) {
        if (nums[i] <= target) {
          return l
        }
      }
    }
  }
}

var searchInsert = function (nums, target) {
  let hiIdx = nums.length - 1
  let loIdx = 0
  let midIdx
  while () {
    midIdx = parseInt((hiIdx + loIdx) / 2)

  }
};

//14
var longestCommonPrefix = function (strs) {
  let map = {}
  let result = ""
  let flag = false
  if (strs.length == 0) {
    return ''
  }
  for (let i = 0; i < strs[0].length; i++) {
    map[strs[0][i]] = 1
  }

  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j < strs[i].length; j++) {
      if (strs[i][j] in map) {
        map[strs[i][j]]++
      } else {
        break
      }
    }
  }
  for (var key in map) {
    if (map[key] == strs.length) {
      result += key
      flag = true
    }
  }
  if (flag) {
    return result
  } else {
    return ''
  }
};


//120
var minimumTotal = function (triangle) {
  function findMin(row, col) {
    if (row == triangle.length - 1) {
      return triangle[row][col]
    }
    return triangle[row][col] + Math.min(findMin(row + 1, col), findMin(row + 1, col + 1))
  }
  return findMin(0, 0)
};

[
  [1]
  [4, 5]
  [5, 1, 6]
  [8, 6, 342, 1]
]

var minimumTotal = function (triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j]
    }
  }
  return triangle[0][0]
}


// 709 
ASCII
/* 
65   A
90   Z
97   a
122  z 
*/

var toLowerCase = function (str) {
  let l = str.length
  let char
  let result = ""
  for (let i = 0; i < l; i++) {
    char = str[i].charCodeAt()
    if (char >= 65 && char <= 90) {
      char += 32
      result += String.fromCharCode(char)
      continue
    } else {
      result += String.fromCharCode(char)
    }
  }
  return result

};

//338
var countBits = function (num) {
  let count = 0
  let ary = []
  for (let i = 0; i <= num; i++) {
    ary.push(bits(i))
  }
  function bits(n) {
    count = 0
    while (n > 0) {
      n = n & (n - 1)
      count++
    }
    return count
  }
  return ary
};

// 66
var plusOne = function (digits) {
  for (let i = 0; i < digits.length; i++) {
    if (digits[digits.length - 1] !== 9) { //最后一位不是9
      digits[digits.length - 1] += 1
      return digits
    } else {    //如果最后一位是9
      for (var w = (digits.length - 2); w >= 0; w--) {
        if (digits[w] !== 9) {
          break
        }
      }
      if (w === -1) {//全是9
        digits.length = digits.length + 1
        digits[0] = 1
        w++
      } else {
        digits[w] = digits[w] + 1
      }
      for (let z = w + 1; z < digits.length; z++) {
        digits[z] = 0
      }
      return digits
    }
  }
};

var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] == 9) {//如果为9
      digits[i] = 0//就变为0
    } else {
      digits[i]++ //不为9直接+1
      return digits
    }
  }
  digits.unshift(1)//9999 -> 0000 -> 10000
  return digits
}

var plusOne = function (digits) {
  digits[digits.length - 1]++ //最后一位上+1
  for (let i = digits.length - 1; i >= 0; i--) {//从最后一位开始读取数 字
    if (digits[i] == 10) {
      digits[i] = 0
      digits[i - 1]++//进位
    } else {
      return digits//如果不进位就return digits
    }
  }
  if (digits[0] == 10) {//第一位为10
    digits[0] = 0
    digits.unshift(1)//加一
  }
  return digits
}
// 118
var generate = function (numRows) {
  let ary = []
  let stored = [[1], [1, 1]]
  if (numRows == 0) {
    return []
  }
  else if (numRows == 1) {
    return [[1]]
  } else if (numRows == 2) {
    return [[1], [1, 1]]
  } else {//n>=3 
    for (let j = 3; j <= numRows; j++) {
      ary = Array(j)
      ary[0] = 1
      ary[ary.length - 1] = 1
      for (let i = 1; i <= j - 2; i++) {
        ary[i] = 0
        ary[i] = (stored[j - 2][i - 1]) + (stored[j - 2][i])
      }
      stored.push(ary)
    }
    return stored
  }
}
//485
var findMaxConsecutiveOnes = function (nums) {
  let count = 0
  let countMax = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 1) {
      count++
    }
    if (nums[i] == 0) {
      if (count > countMax) {
        countMax = count
      }
      count = 0
      continue
    }
  }
  if (count > countMax) {
    countMax = count
  }
  return countMax
}
//912
// 冒泡
var sortArray = function (nums) {
  let l = nums.length
  let tmp
  while (l - 1 >= 1) {
    for (let i = 0; i < l - 1; i++) {
      if (nums[i] > nums[i + 1]) {
        tmp = nums[i]
        nums[i] = nums[i + 1]
        nums[i + 1] = tmp
      }
    }
    l--
  }
  return nums
};

//121
var maxProfit = function (prices) {
  let todayProfit
  let maxProfit = 0
  let i = 1
  let j = 0
  for (; j < prices.length - 1; j++) {
    i = j + 1
    for (; i < prices.length; i++) {
      if (prices[i] >= prices[j]) {
        todayProfit = prices[i] - prices[j]
        if (todayProfit > maxProfit) {
          maxProfit = todayProfit
        }
      }
    }
  }
  return maxProfit
};
//53 
var maxSubArray = function (nums) {
  let j = 0
  let i
  let sum = 0
  let max = nums[0]
  if (nums.length == 1) {
    return nums[0]
  }
  while (j < nums.length) {
    i = j + 1 //i=1
    sum = nums[j]
    if (sum > max) {
      max = sum
    }
    for (; i < nums.length; i++) {
      sum += nums[i]
      if (sum > max) {
        max = sum
      }
    }
    j++
  }
  return max
};



//88
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let i = 0
  let top
  while (nums2.length != 0) {
    top = nums2.shift()
    for (; ; i++) {
      if (top < nums1[i]) {
        nums1.splice(i, 0, top)
        nums1.pop()
        m++
        break
      }
      if (nums1[i] == 0 && i == m) {
        nums1.splice(i, 0, top)
        nums1.pop()
        m++
        break
      }
    }
    i++
  }
}

//415
var addStrings = function (num1, num2) {
  let sum = ""
  let digitSum
  let carry = 0
  let l = Math.max(num1.length, num2.length)
  let d = Math.abs(num1.length - num2.length)
  if (num1.length > num2.length) { //补0
    num2 = Zeropad(num2, d)
  } else if (num1.length < num2.length) {
    num1 = Zeropad(num1, d)
  }

  for (let i = l - 1; i >= 0; i--) {
    digitSum = Number(num1[i]) + Number(num2[i]) + carry
    carry = 0
    if (digitSum >= 10) {
      carry = 1
      digitSum = digitSum - 10
    }
    sum = String(digitSum) + sum
    if (i == 0 && carry == 1) {
      sum = "1" + sum
    }
  }
  return sum
  function Zeropad(x, y) {
    var sum = x
    for (let w = 0; w < y; w++) {
      x = sum
      sum = "0" + x
    }
    return sum
  }
};
//242

var isAnagram = function (s, t) {
  let map = {}
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      map[s[i]]++
    } else {
      map[s[i]] = 1
    }
  }
  for (let i = 0; i < t.length; i++) {
    if (t[i] in map) {
      map[t[i]]--
    } else {
      return false
    }
  }
  for (key in map) {
    if (map[key] !== 0) {
      return false
    }
  }
  return true
};
var addStrings = function (num1, num2) {
  var i = num1.length - 1
  var j = num2.length - 1
  var carry = 0
  var result = ""
  while (i >= 0 || j >= 0) {
    var a = i < 0 ? 0 : Number(num1[i])//如果i<0为true，执行middle，如果为false，执行Number(nums1[i])
    var b = j < 0 ? 0 : Number(num2[j])
    var sum = a + b + carry
    var left = sum % 10
    result = left + result
    if (sum >= 10) {
      carry = 1
    } else {
      carry = 0
    }
    i--
    j--
  }
  if (carry) {
    return carry + result
  }
  return result
};
// 217
var containsDuplicate = function (nums) {
  let i = 0
  let j = 1
  while (i < nums.length - 1) {
    for (; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true
      }
    };
    i++
    j = i + 1
  }
  return false
}
//219
var containsNearbyDuplicate = function (nums, k) {
  let i = 0
  let j = 1
  let delta
  let min = Infinity
  while (i < nums.length - 1) {
    for (; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        delta = j - i
      }
      if (min > delta) {
        min = delta
      }
    };
    i++
    j = i + 1
  }
  return min <= k
}
//62 
/* 假如一个5x3的格子，那么一共存在>>>>vv步， */
var uniquePaths = function (m, n) {
  let w = m + n - 2
  let a = w
  let b = n
  while (n > 1) {
    a *= w - 1
    b *= n - 1
    w--
    n--
  }
  return a / b
};
//1089
var duplicateZeros = function (arr) {
  let i = 0
  while (i < arr.length) {
    for (; i < arr.length; i++) {
      if (arr[i] == 0) {
        arr.splice(i, 0, 0)
        arr.pop()
        break
      }
    }
    i = i + 2
  }
};
//74
var searchMatrix = function (matrix, target) {

};
//171
var titleToNumber = function (s) {
  let l = s.length
  let result = 0
  let k = 0
  for (let i = l - 1; i >= 0; i--) {
    result += Number((s[i].charCodeAt() - 64)) * Math.pow(26, k)
    k++
  }
  return result
};


//290
var wordPattern = function (pattern, str) {
  str = str.split(' ')//已经是数组了
  if (pattern.length !== str.length) {
    return false
  }

  let map = {}
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] in map) {
      if (map[pattern[i]] !== str[i]) {
        return false
      }
    } else {
      map[pattern[i]] = str[i]
    }
  }

  map = {}
  for (let i = 0; i < str.length; i++) {
    if (str[i] in map) {
      if (map[str[i]] !== pattern[i]) {
        return false
      }
    } else {
      map[str[i]] = pattern[i]
    }
  }
  return true
}
//189
var rotate = function (nums, k) {
  k = k % nums.length
  while (k > 0) {
    var w = nums.pop()
    nums.unshift(w)
    k--
  }
};
//122
var maxProfit = function (prices) {
  let i = 0
  let j = 1
  let profit = 0
  for (; j < prices.length; j++) {
    while (prices[i] >= prices[j] && i < j) {
      i++
    }
    if (prices[i] < prices[j]) {
      profit += prices[j] - prices[i]
      i = j
    }
  }
  return profit
};
//389
var findTheDifference = function (s, t) {
  result = ''
  let l = Math.max(s.length, t.length)
  for (let i = 0; i < l; i++) {
    if (s[i] !== t[i]) {
      if (s.length > t.length) {
        result += s[i]
      }
      if (t.length > s.length) {
        result += t[i]
      }
    }
  }
  return result
};

//7
var reverse = function (x) {
  let sign = 1
  if (x < 0) {
    x = -x
    sign = -1
  }
  let digit
  let sum = 0
  while (x > 0) {
    digit = x % 10
    sum = sum * 10 + digit
    x = (x - digit) / 10
  }
  if (sign == 1) {
    if (sum <= 2147483647) {
      return sum
    } else {
      return 0
    }
  } else {
    if (sum <= 2147483648) {
      return -sum
    } else {
      return 0
    }
  }
};
//905
var sortArrayByParity = function (A) {
  let i = 0
  for (let j = 0; j < A.length; j++) {
    if (A[j] % 2 == 0) {
      tmp = A[i]
      A[i] = A[j]
      A[j] = tmp
      i++
    }
  }
  return A
};

//453 
var minMoves = function (nums) {
  let min = nums[0]
  let max = nums[0]
  let count = 0
  let w = 0
  let tmp
  do {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] >= max) {
        max = nums[i]
        w = i
      } else if (nums[i] <= min) {
        min = nums[i]
      }
    }
    tmp = max
    nums[w]--
    count++
    max = nums[0]
  } while (tmp !== min)
  return count - 1
};
var minMoves = function (nums) {
  let min = Infinity
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < min) {
      min = nums[i]
    }
    sum += nums[i]
  }
  return sum - nums.length * min
};

//14
var longestCommonPrefix = function (strs) {
  let map = {}
  let result = ""
  let flag = false
  for (let i = 0; i < strs[0].length; i++) {
    map[strs[0][i]] = 1
  }

  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j < strs[i].length; j++) {
      if (strs[i][j] in map) {
        map[strs[i][j]]++
      } else {
        break
      }
    }
  }
  for (var key in map) {
    if (map[key] == strs.length) {
      result += key
      flag = true
    }
  }
  if (flag) {
    return result
  } else {
    return ''
  }
};

var longestCommonPrefix = function (strs) {
  if (strs.length == 0) {
    return ""
  } else if (strs.length == 1) {
    return strs[0]
  }
  else {
    let j = 0
    let i = 0
    let prefix = ""
    while (i <= strs[0].length) {
      j = 0 //数组中第一项 
      prefix += strs[j][i]
      for (; j < strs.length; j++) {
        if (prefix == "") {
          return ""
        }
        if (prefix[i] !== strs[j][i]) {
          prefix = prefix.substring(0, i)
          return prefix
        }
      }
      i++
    }
    return strs[0]
  }
};


//441
var arrangeCoins = function (n) {
  let i
  for (i = 1; ; i++) {
    let s = (1 + i) * i / 2
    if (s >= n) {
      return i
      break
    }
  }

};
//462
var minMoves2 = function (nums) {//中位数
  let map = {}
  let mid
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i]
    if (cur in map) {
      nums.splice(i, 1)
    } else {
      map[cur] = 1
    }
  }
  if (nums.length % 2 !== 0) {
    mid = nums[parseInt(nums.length / 2) + 1]
  } else {
    mid = nums[parseInt(nums.length / 2)]
  }
  return mid
};

var minMoves2 = function (nums) {
  let j = 0
  let tmp
  let i
  let isSorted
  while (j <= nums.length - 2) {
    isSorted = true
    for (i = 0; i <= nums.length - 2 - j; i++) {
      if (nums[i] > nums[i + 1]) {
        tmp = nums[i]
        nums[i] = nums[i + 1]
        nums[i + 1] = tmp
        isSorted = false
      }
    }
    if (isSorted) {
      break
    }
    j++
  }

  mid = nums[parseInt(nums.length / 2)]
  let moves = 0
  for (let i = 0; i < nums.length; i++) {
    moves += Math.abs(nums[i] - mid)
  }
  return moves
};
//43
var multiply = function (num1, num2) {
  var num1map = []
  var t = '0'
  for (var i = 0; i < 10; i++) {
    num1map.push(t)
    t = addStrings(t, num1)//1～9乘以nums1的结果
  }
  var result = '0'
  for (var i = nums2.length - 1, z = 0; i >= 0; i-- , z++) {
    var digit = num2[i]
    var a = num1map[digit] + (num1map[digit] == '0' ? '' : '0'.repeat(z))
    result = addStrings(result, a)
  }
};

var addStrings = function (num1, num2) {
  var i = num1.length - 1
  var j = num2.length - 1
  var carry = 0
  var result = ""
  while (i >= 0 || j >= 0) {
    var a = i < 0 ? 0 : Number(num1[i])//如果i<0为true，执行middle，如果为false，执行Number(nums1[i])
    var b = j < 0 ? 0 : Number(num2[j])
    var sum = a + b + carry
    var left = sum % 10
    result = left + result
    if (sum >= 10) {
      carry = 1
    } else {
      carry = 0
    }
    i--
    j--
  }
  if (carry) {
    return carry + result
  }
  return result
};
//167 
var twoSum = function (numbers, target) {
  let i = 0
  let j = 1
  while (i <= numbers.length - 2) {
    for (; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] == target) {
        return [i + 1, j + 1]
      }
    }
    i++
    j = i + 1
  }
};

//Map法，空间(map)换时间(减少一个for循环)
var twoSum = function (numbers, target) {
  let map = {}
  let l = numbers.length
  for (let i = 0; i < l; i++) {
    let cur = numbers[i]
    let need = target - cur
    if (need in map) {
      return [map[need] + 1, i + 1]
    } else {//如果需要的数不在map里，就把现在指向的数的idx存入对应的map中的value
      map[cur] = i
    }
  }
};

//双指针反向扫描法
//利用了数组sorted了的条件！
var twoSum = function (numbers, target) {
  let i = 0
  let j = numbers.length - 1
  while ((numbers[i] + numbers[j]) !== target) {
    if (numbers[i] + numbers[j] > target) {
      j--
    } else if (numbers[i] + numbers[j] < target) {
      i++
    } else {
      return [i + 1, j + 1]
    }
  }
  return [i + 1, j + 1]
}
//11
var maxArea = function (height) {
  let i = 0
  let j = height.length - 1
  let max = -Infinity
  let area
  while (j - i >= 1) {
    area = (Math.min(height[j], height[i])) * (j - i)
    if (area > max) {
      max = area
    }
    if (height[i] > height[j]) {
      j--
    } else {
      i++
    }
  }
  return max
};
//168
var convertToTitle = function (n) {
  let result = ""
  let digit
  let remain = n
  while (remain > 0) {
    digit = remain % 26
    remain = (remain - digit) / 26
    if (digit == 0) {
      digit = 26
      remain--
    }
    code = digit + 64
    result = String.fromCharCode(code) + result
  }
  return result
};
//119
var getRow = function (rowIndex) {
  let map = {}
  map[0] = [1]
  map[1] = [1, 1]
  let j = 2
  if (rowIndex >= 2) {
    while (j <= rowIndex) {
      map[j] = Array(j + 1).fill(1)
      for (let i = 1; i <= j - 1; i++) {
        map[j][i] = map[j - 1][i - 1] + map[j - 1][i]
      }
      j++
    }
  }
  return map[rowIndex]
};
//387
var firstUniqChar = function (s) {
  let l = s.length
  let map = {}
  for (var i = 0; i < l; i++) {//第一个循环，在映射中构建一个key-values对
    var c = s[i]
    if (c in map) {
      map[c]++
    } else {
      map[c] = 1
    }
  }
  for (var i = 0; i < s.length; i++) {//第二个循环遍历输入字符串的每一个字母，如果出出现次数为1，返回idx
    var c = s[i]
    if (map[c] == 1) {
      return i
    }
  }
  return -1
}


function listToArray(head) {
  let ary = []
  if (head == null) {
    return ary
  }
  while (head) {
    ary.push(head[val])
    head = head[next]
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


{
  a: 1, next: {
    b: 2, next: {
      c: 3, next: {
        d: 4, next: null
      }
    }
  }
}

function append(val, head) {
  while (head.next) {
    head = head.next
  }
  head.next = {
  }
}
function rand() {
  var a = r()
  var b = r()
  if (a == 0 && b == 1) {
    return 1
  }
  if (a == 1 && b == 0) {
    return 0
  }
  return rand()
}


/* function fib(n){
  if (n==1||n==2){
    return 1
  }
  else {
    return fib (n-1) + fib (n-2)
  }
} */



//排序专题

//归并排序
function mergeSort(ary) {
  if (ary.length == 0 || ary.length == 1) {
    return ary
  }

  var mid = ary.length >> 1
  var left = ary.slice(0, mid)
  var right = ary.slice(mid, ary.length)

  left = mergeSort(left)
  right = mergeSort(right)

  var i = 0
  var j = 0
  var k = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      ary[k] = left[i]
      i++
    } else {
      ary[k] = right[j]
      j++
    }
    k++
  }

  while (i < left.length) {
    ary[k] = left[i]
    i++
    k++
  }

  while (j < right.length) {
    ary[k] = right[j]
    j++
    k++
  }
  return ary
}
//快排
function quickSort() {
  var randIdx = Math.random() * ary.length | 0
  var
}

function quickSort(A) {
  var pivotIdx = Math.floor(ary.length * Math.random())
  let i = -1
  let j = 0
  let tmp
  for (; j < A.length - 1; j++) {
    if (A[j] < A[pivotIdx]) {
      i++
      tmp = A[i]
      A[i] = A[j]
      A[j] = tmp
    }
  }
}

//冒泡
//插入
//计数
//



//交换ary数组的第i和j项
function qSort(ary, start = 0, end = ary.length - 1) {//start 跟 end 都是包含的
  if (end - start < 1) {
    return ary
  }

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
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
    return ary
  }
}





//merge sort 自己写
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
      nums[k] = left[i]
      i++
    } else {
      nums[k] = right[j]
      j++
    }
    k++
  }

  while (i < left.length) {
    nums[k] = left[i]
    i++
    k++
  }

  while (j < right.length) {
    nums[k] = right[j]
    j++
    k++
  }
  return nums
};
