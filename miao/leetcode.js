
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
/* const isValid = function (s) {
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
 */
/*   function inPair(x, y) {
    if ((x === "(") && (y === ")")) {
      return "()"
    } else if ((x === "[") && (y === "]")) {
      return "[]"
    } else if ((x === "{") && (y === "}")) {
      return "{}"
    }
  }
} */
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


0b11111111111111111111111111111111111111111111111111111

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

var searchInsert = function (ary, target) {
  let up = ary.length - 1
  let down = 0
  if (ary.length == 0) {
    return 0
  }
  if (target == ary[up]) {
    return up
  }
  if (target > ary[up]) {
    return up + 1
  }
  if (target <= ary[0]) {
    return 0
  }
  while (up - down > 1) {
    mid = (up + down) >> 1
    if (ary[mid] == target) {
      return mid
    } else if (ary[mid] > target) {
      up = mid
    } else {
      down = mid
    }
  }
  if (ary[mid] < target) {
    return mid + 1
  }
  if (ary[mid] > target) {
    return mid
  }
}

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

//172. Factorial Trailing Zeroes
//因子中2的个数一定大于5
//要看n中的分解一共有多少个5
//每隔5个数字就有一个5 n/5 拿到间距为5的每个5
//每隔25个数字有二个5 n/25 拿到间距为5的剩余的一个5
//每隔125个数字有三个5 n/125 ...
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let numZeroes = 0;
  for (let i = 5; i <= n; i *= 5) {
    numZeroes += Math.floor(n / i);
  }
  return numZeroes;
};

//704. Binary Search
var search = function (nums, target) {
  let upIdx = nums.length - 1
  let downIdx = 0
  let midIdx
  if (upIdx == -1) {
    return -1
  }
  if (upIdx == 0) {
    if (nums[0] == target) {
      return 0
    } else {
      return -1
    }
  }

  if (target > nums[upIdx] || target < nums[downIdx]) {
    return -1
  }

  while (upIdx - downIdx >= 0) {
    midIdx = (upIdx + downIdx) >> 1
    if (nums[upIdx] == target) {
      return upIdx
    }
    if (nums[downIdx] == target) {
      return downIdx
    }
    if (nums[midIdx] == target) {
      return midIdx
    }
    if (nums[midIdx] > target) {
      upIdx = midIdx
      downIdx++
      upIdx--
    }
    if (nums[midIdx] < target) {
      downIdx = midIdx
      downIdx++
      upIdx--
    }
  }
  return -1
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



//88. Merge Sorted Array
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
//三指针
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  if (m == 0 && n == 1) {
    nums1[0] = nums2[0]
  } else {
    let a = nums1.length - 1
    m--
    n--
    while (n >= 0) {
      if (m >= 0) {
        if (nums2[n] >= nums1[m]) {
          nums1[a] = nums2[n]
          n--
        } else {
          nums1[a] = nums1[m]
          m--
        }
      } else {
        nums1[a] = nums2[n]
        n--
      }
      a--
    }
  }
}

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


//240. Search a 2D Matrix II
//复杂度如何分析？？
//D&C 
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  if (matrix.length == 0 || matrix[0].length == 0) { return false }
  let left = 0, up = 0, right = matrix[0].length - 1, down = matrix.length - 1;
  let lengthIdx = matrix[0].length - 1, heightIdx = matrix.length - 1
  return search2D(left, up, right, down, target)

  function search2D(left, up, right, down, target) {
    if (up > heightIdx || left > lengthIdx) { return false }
    if (matrix[up][left] > target) { return false }
    if (matrix[down][right] < target) { return false }

    let horiMid = parseInt(left + (right - left) / 2)
    let vertMid = parseInt(up + (down - up) / 2)
    let pivot = matrix[vertMid][horiMid]

    if (pivot == target) { return true }
    if (pivot > target) {
      return search2D(left, up, horiMid, vertMid, target)
        || search2D(left, vertMid + 1, horiMid, down, target)
        || search2D(horiMid + 1, up, right, vertMid, target)
    } else {
      return search2D(left, vertMid + 1, horiMid, down, target)
        || search2D(horiMid + 1, vertMid + 1, right, down, target)
        || search2D(horiMid + 1, up, right, vertMid, target)
    }
  }
}


//优化D&C
//!!!!!!!!!!CAN NOT AC!!!!!!!!!!!!
var searchMatrix = function (matrix, target) {
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) { return false }
  let left = 0, up = 0, right = matrix[0].length - 1, down = matrix.length - 1;
  //let lengthIdx = matrix[0].length - 1, heightIdx = matrix.length - 1
  if (matrix[up][left] > target || matrix[down][right] < target) { return false }

  return search2D(left, up, right, down, target)

  function search2D(left, up, right, down, target) {
    if (up > down || left > right) { return false }

    let vertMid = parseInt((up + down) / 2)
    //horizontally binary search for the last element which smaller than target
    let horiRes = searchSingleLine(matrix[vertMid], target, left, right)
    let pivot = matrix[vertMid][horiRes]
    if (pivot == target) { return true }
    return search2D(horiRes + 1, up, right, vertMid - 1, target)
      || search2D(left, vertMid + 1, horiRes, down, target)


    function searchSingleLine(ary, target, start, end) {
      let mid = parseInt((start + end) / 2)
      if (ary[mid] == target || start > end) { return mid }
      else if (ary[mid] > target) {
        return searchSingleLine(ary, target, start, mid - 1)
      } else { return searchSingleLine(ary, target, mid + 1, end) }
    }
  }
}


//答案DC逐行扫描
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  if (matrix.length == 0 || matrix[0].length == 0) {
    return false
  }

  return searchRec(0, 0, matrix[0].length - 1, matrix.length - 1, target)

  function searchRec(left, up, right, down, target) {
    if (left > right || up > down) { return false }
    else if (target < matrix[up][left] || target > matrix[down][right]) { return false }

    let mid = parseInt(left + (right - left) / 2)
    let row = up
    while (row <= down && matrix[row][mid] <= target) {
      if (matrix[row][mid] == target) {
        return true
      }
      row++
    }
    return searchRec(left, row, mid - 1, down, target) || searchRec(mid + 1, up, right, row - 1, target);
  }
}

//答案蛇皮走位法
//这谁能想到？？？
//左下开始，比target小，row-- 比taget大，col++


debugger; searchMatrix([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 13)


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


//896. Monotonic Array
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function (A) {
  let flag = 0; //increasing - 1; decreasing -2
  if (A.length <= 1) return true;

  for (let i = 1; i < A.length; i++) {
    if (A[i] > A[i - 1]) {
      if (flag === 2) return false;
      flag = 1;
    } else if (A[i] < A[i - 1]) {
      if (flag === 1) return false;
      flag = 2;
    }
  }

  return true;
};


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
  let row = matrix.length
  if (row == 0) {
    return false
  }
  if (row == 1) {//直接执行单行搜索
    return (binarySearchSL(matrix[0], target))
  }
  let col = matrix[0].length
  let mid, up, down
  mid = row >> 1
  up = matrix.slice(0, mid)
  down = matrix.slice(mid)

  if (matrix[mid - 1][col - 1] < target) {
    return searchMatrix(down, target)
  } else {
    return searchMatrix(up, target)
  }

  function binarySearchSL(ary, target) {//单行搜索
    var up = ary.length - 1
    var down = 0
    if (ary.length == 0) {
      return false
    } else if (ary.length == 1) {
      return (ary[0] == target)
    }
    while (up - down >= 0) {
      var mid = (up + down) >> 1
      if (ary[mid] == target) {
        return true
      }
      if (ary[up] == target) {
        return true
      }
      if (ary[down] == target) {
        return true
      }
      if (ary[mid] > target) {
        up = mid
        down++
        up--
      }
      if (ary[mid] < target) {
        down = mid
        down++
        up--
      }
    }
    return false
  }
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

//Using Cyclic Replacements
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k = k % nums.length
  let count = 0
  for (var startIdx = 0; count < nums.length; startIdx++) {
    var currentIdx = startIdx;
    var prev = nums[startIdx];
    do {
      var nextIdx = (currentIdx + k) % nums.length
      var temp = nums[nextIdx]
      nums[nextIdx] = prev;
      prev = temp;
      currentIdx = nextIdx;
      count++
    } while (startIdx != currentIdx)
  }
};



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k = k % nums.length // rotate k 次
  if (k !== 0) { //k等于0时候啥都不做
    let startIdx = nums.length - 1 //从最后的开始
    let count = 0
    let temp, nextIdx
    for (; count < nums.length; startIdx = (++startIdx) % nums.length) {
      let currentIdx = startIdx
      let top = nums[currentIdx]
      do {
        nextIdx = (currentIdx + k) % nums.length
        temp = nums[nextIdx]
        nums[nextIdx] = top
        currentIdx = nextIdx
        top = temp
        count++
      } while (startIdx != currentIdx)
    }
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



//48. Rotate Image
//Medium
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  let l = matrix.length;
  let halfLength = parseInt(l >> 1)
  let rowStop, colStop;
  if (l % 2 == 0) { rowStop = colStop = halfLength - 1 }
  else { rowStop = halfLength - 1; colStop = halfLength }

  for (let i = 0; i <= rowStop; i++) {
    for (let j = 0; j <= colStop; j++) {
      rotateSingle(matrix, i, j)
    }
  }

  function rotateSingle(matrix, row, col) {
    let temp = matrix[row][col]
    matrix[row][col] = matrix[l - 1 - col][row]
    matrix[l - 1 - col][row] = matrix[l - 1 - row][l - 1 - col]
    matrix[l - 1 - row][l - 1 - col] = matrix[col][l - 1 - row]
    matrix[col][l - 1 - row] = temp
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


var minMoves2 = function (nums) {
  let l = nums.length
  if (l == 1) { return 0 }
  if (l == 2) { return Math.abs(nums[0] - nums[1]) }
  let medianIdx = parseInt(l / 2)
  let m = qSortMedian(nums)
  let res = 0
  for (let i = 0; i < l; i++) {
    res += Math.abs(nums[i] - m)
  }
  return res

  //qSort
  function qSortMedian(nums, start = 0, end = nums.length - 1) {
    if (start == end) { return nums[start] }
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
    if (i == medianIdx) {
      return nums[i]
    } else if (i > medianIdx) {
      return qSortMedian(nums, start, i - 1)
    } else if (i < medianIdx) {
      return qSortMedian(nums, i + 1, end)
    }

    function swap(ary, i, j) {
      let tmp = ary[i]
      ary[i] = ary[j]
      ary[j] = tmp
    }
  }
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
  for (var i = num2.length - 1, z = 0; i >= 0; i-- , z++) {
    var digit = num2[i]
    var a = num1map[digit] + (num1map[digit] == '0' ? '' : '0'.repeat(z))
    result = addStrings(result, a)
  }

  function addStrings(num1, num2) {
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
  return result
};


//6. ZigZag Conversion
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {

};
//54. Spiral Matrix
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let row = matrix.length
  if (row == 0) { return matrix }
  let col = matrix[0].length
  if (col == 0) { return matrix }

  let res = []
  //these are index
  let top = 0, right = col - 1, down = row - 1, left = 0;
  pushCycle(matrix, top, right, down, left)
  function pushCycle(mtx, t, r, d, l) {
    if (t > d || l > r) {
      return
    }
    for (let i = l; i <= r; i++) {
      if (mtx[t][i]) {
        res.push(mtx[t][i])
        mtx[t][i] = false
      }
    }
    if (t + 1 > d) { return }
    for (let j = t + 1; j <= d; j++) {
      if (mtx[j][r] !== false) {
        res.push(mtx[j][r])
        mtx[j][r] = false
      }
    }
    if (r - 1 < l) { return }
    for (let k = r - 1; k >= l; k--) {
      if (mtx[d][k] !== false) {
        res.push(mtx[d][k])
        mtx[d][k] = false
      }
    }
    if (d - 1 < t) { return }
    for (let w = d - 1; w >= t + 1; w--) {
      if (mtx[w][l] !== false) {
        res.push(mtx[w][l])
        mtx[w][l] = false
      }
    }
    pushCycle(mtx, t + 1, r - 1, d - 1, l + 1)
  }
  return res
};
debugger; spiralOrder([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]])





//59. Spiral Matrix II
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  if (n == 0) { return [] }
  if (n == 1) { return [[1]] }
  //n>=2
  let count = 0, mtx = new Array(n);
  for (let r = 0; r < n; r++) {
    mtx[r] = new Array(n)
  }
  fillCycle(mtx)
  function fillCycle(matrix, top = 0, right = n - 1, down = n - 1, left = 0) {
    if (left > right || top > down) { return }
    for (let i = left; i <= right; i++) {
      matrix[top][i] = ++count
    }
    if (top + 1 > down) { return }
    for (let j = top + 1; j <= down; j++) {
      matrix[j][right] = ++count
    }
    if (right - 1 < left) { return }
    for (let k = right - 1; k >= left; k--) {
      matrix[down][k] = ++count
    }
    if (down - 1 < top) { return }
    for (let w = down - 1; w >= top + 1; w--) {
      matrix[w][left] = ++count
    }
    fillCycle(matrix, top + 1, right - 1, down - 1, left + 1)
  }
  return mtx
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
//599. Minimum Index Sum of Two Lists
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  let map = {}
  let mapSum = {}
  let result = []
  let list1.length = l1
  let list2.length = l2
  let min = Infinity
  for (let i = 0; i < l1; ++i) {
    map[list1[i]] = i
  }
  for (let i = 0; i < l2; ++i) {
    if (list2[i] in map) {
      mapSum[list2[i]] = i + map[list1[i]]
      if (min >= (i + map[list1[i]])) {
        min = i + map[list1[i]]
      }
    }
  }
  for (key in mapSum) {
    if (mapSum[key] == min) {
      result.push(mapSum[key])
    }
  }
  return result
};

//不均匀硬币，生成概率为0.5的

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
    next: {
    val: 2,
      next: {
      val: 3,
        next: {
        val: 4,
          next: {
          val: 5,
            next: null,
          };
      };
    };
  };
};

{
  val: 1,
    next: {
    val: 2,
      next: {
      val: 3,
        next: {
        val: 4,
          next: null
      }
    }
  }
}

{
  val: 1,
    next: {
    val: 2,
      next: {
      val: 3,
        next: null
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


debugger; mergeTwoLists({ val: 1, next: { val: 2, next: { val: 3, next: null } } }, { val: 1, next: { val: 3, next: { val: 4, next: null } } })
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
    if (fast == null) { return null }
    fast = fast.next
    if (fast == null) { return null }
    fast = fast.next
    slow = slow.next
    if (fast == slow) { break }
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
    if (fast == null) { return false }
    fast = fast.next
    slow = slow.next
    if (fast == slow) { return true }
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
  if (head.next == null) { return head }
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
  if (head == null || head.next == null) { return head }//exception excluded
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
    if (head == null || head.next == null) { return head }
    //length >=2
    let slow = head
    let fast = head
    while (true) {
      if (fast.next !== null) { fast = fast.next }
      if (fast.next !== null) { fast = fast.next }
      if (fast.next !== null) { slow = slow.next }
      if (fast.next == null) { break }
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
    if (map.has(pointerB)) { return pointerB }
    if (pointerB !== null) {
      pointerB = pointerB.next
    } else { return null }
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
  if (headA == null || headB == null) { return null }
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
  if (head == null || head.next == null) { return head }
  //l >= 2
  let prev = new ListNode(-1)
  prev.next = head
  let end = head, breakPoint = head;
  let count = 1
  while (end.next !== null) { end = end.next; count++ }
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


//插入排序(Insertion sort)
//in-place 
//T:
//S:


//选择排序
//in-place 
//T:O(N**2)
//S:O(1)
/**
 * @param {number[]} nums
 * @return {number[]} 
 */
function selectSort(nums) {
  let l = nums.length
  let minIdx, min;
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
    let tmp = ary[i]
    ary[i] = ary[j]
    ary[j] = tmp
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


//快排(quickSort)
//in-place 
//T: (N*lgN)
//S: (lgN)
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
    if (end - start < 1) { return ary }
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
  if (l == 1) { return nums[0] }
  return qSortIdx(nums, l - k)

  function qSortIdx(nums, targetIdx, start = 0, end = nums.length - 1) {
    if (start == end) { return nums[start] }
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


//动态规划专题
//dynamic programming
//62 Unique Path  
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

//(1)DP  计数型
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dpMatrix = new Array(n)
  for (var j = 0; j < n; ++j) {
    dpMatrix[j] = new Array(m)
  }

  for (var i = 0; i < n; ++i) {
    for (var j = 0; j < m; ++j) {
      if (i == 0 || j == 0) {
        dpMatrix[i][j] = 1
      } else {
        dpMatrix[i][j] = dpMatrix[i - 1][j] + dpMatrix[i][j - 1]
      }
    }
  }
  return dpMatrix[m - 1][n - 1]
};




//63. Unique Paths II
// (1）DP 计数型
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  let row = obstacleGrid.length
  let col = obstacleGrid[0].length

  if (obstacleGrid[0][0] == 1) {
    return 0
  }

  obstacleGrid[0][0] = 1

  for (let i = 1; i < row; i++) {
    if (obstacleGrid[i][0] == 0 && obstacleGrid[i - 1][0] == 1) {
      obstacleGrid[i][0] = 1
    } else {
      obstacleGrid[i][0] = 0
    }
  }

  for (let i = 1; i < col; i++) {
    if (obstacleGrid[0][i] == 0 && obstacleGrid[0][i - 1] == 1) {
      obstacleGrid[0][i] = 1
    } else {
      obstacleGrid[0][i] = 0
    }
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (obstacleGrid[i][j] == 0) {
        obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
      } else {
        obstacleGrid[i][j] = 0
      }
    }
  }
  return obstacleGrid[row - 1][col - 1]
};



//322. Coin Change
//dp 最值型
/** 
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //example：coins=[2,5,7],amount=27
  //DP status dp[x] = 拼出x最少需要多少枚硬币
  //DP Array

  let dp = []
  let n = coins.length

  //initialization
  dp[0] = 0

  let i, j
  for (i = 1; i <= amount; ++i) {
    dp[i] = Infinity
    for (j = 0; j < n; ++j) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
      }
    }
  }

  if (dp[amount] === Infinity) {
    dp[amount] = -1
  }
  return dp[amount]
};

/** 
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let l = coins.length
}

//55. Jump Game
//(1)dp可行性型
/**
 * @param {number[]} nums
 * @return {boolean}
 */
//dp[j]表示青蛙能不能跳到石头j
var canJump = function (nums) {
  let n = nums.length
  let dp = []

  //initialization
  dp[0] = true

  //对于dp数组中的每一项
  for (var j = 1; j < n; ++j) {
    dp[j] = false;
    //previous stone i
    //last jump is from i to j
    for (var i = 0; i < j; ++i) {
      if (dp[i] && i + nums[i] >= j) {
        dp[j] = true;
        break;
      }
    }
  }
  return dp[n - 1]
};

//152. Maximum Product Subarray
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let l = nums.length
  let dpMax = new Array(l + 1)//正数组
  let dpMin = new Array(l + 1)//负数组

  // dp_max[i] 指的是以第 i 个数结尾的 乘积最大 的连续子序列
  // dp_min[i] 指的是以第 i 个数结尾的 乘积最小 的连续子序列

  let max = -Infinity

  dpMin[0] = 1
  dpMax[0] = 1

  for (let i = 1; i <= nums.length; ++i) {
    // 如果数组的数是负数，那么会导致 max 变成 min，min 变成 max
    // 故需要交换dp 
    if (nums[i - 1] < 0) {
      let temp = dpMax[i - 1]
      dpMax[i - 1] = dpMin[i - 1]
      dpMin[i - 1] = temp
    }
    dpMin[i] = Math.min(nums[i - 1], dpMin[i - 1] * nums[i - 1])
    dpMax[i] = Math.max(nums[i - 1], dpMax[i - 1] * nums[i - 1])
    max = Math.max(max, dpMax[i])
  }
  return max
};


//dp myself
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let l = nums.length
  if (l == 1) { return nums[0] }
  let dpMax = new Array(l)//正数组
  let dpMin = new Array(l)//负数组

  dpMin[0] = nums[0]
  dpMax[0] = nums[0]
  let max = nums[0]

  for (let i = 1; i < l; ++i) {
    let a = nums[i]
    let b = dpMin[i - 1] * nums[i]
    let c = dpMax[i - 1] * nums[i]
    dpMax[i] = Math.max(a, b, c)
    dpMin[i] = Math.min(a, b, c)
    max = Math.max(max, dpMax[i])
  }

  return max
};


//198. House Robber
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let l = nums.length
  if (l == 0) { return 0 }
  if (l == 1) { return nums[0] }
  if (l == 2) { return Math.max(nums[0], nums[1]) }
  //l>=3
  let dp = new Array(l)
  //dp[i]表示至i得到的钱数
  //initialization
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < l; ++i) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[l - 1]
};


//300. Longest Increasing Subsequence
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let l = nums.length
  if (l == 0 || l == 1) { return l }
  //l>=2
  let dp = new Array(l)
  //initialization
  dp[0] = 1
  for (let i = 1; i < l; ++i) {

  }
};


//70. Climbing Stairs
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let dp = []
  while (dp[i] < 10) {


  }
  dp[i] = dp[i - 1] + 1
  dp[i] = dp[i - 2] + 2
};



//回溯算法
//1222. Queens That Can Attack the King
/**
 * @param {number[][]} queens
 * @param {number[]} king
 * @return {number[][]}
 */
var queensAttacktheKing = function (queens, king) {

};


// 51. N-Queens
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {

};


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
  if (ary[rootPos] == null) { return null }
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
    left: {
    val: 2,
      left: null,
        right: null
  },
  right: {
    val: 3,
      left: {
      val: 4,
        left: null,
          right: null
    },
    right: {
      val: 5,
        left: null,
          right: null
    }
  }
}



function lcary2tree(ary) {
  if (ary.length == 0) { return null }
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
    if (i >= ary.length) { break }

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

debugger; lcary2tree([1, 2, 3, null, 4, null, 5, 6, 7, null, 8, null, 9, 10])


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
      } else { result.push(null) }
      if (curr.right) {
        result.push(curr.right.val)
        nodes.push(curr.right)
      } else { result.push(null) }
    }
    while (result[result.length - 1] === null) { result.pop() }
    return result
  }
  return []
}





//my transform
function condensedA2T(ary) {
  let queue = [], l = ary.length, curr;
  if (l == 0) { return null }
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
  if (root == null) { return res }
  let queue = []
  queue.push(root)
  res.push(root.val)

  while (queue.length != 0) {
    let curr = queue.shift()
    if (curr.left !== null) {
      queue.push(curr.left)
      res.push(curr.left.val)
    } else { res.push(null) }
    if (curr.right !== null) {
      queue.push(curr.right)
      res.push(curr.right.val)
    } else { res.push(null) }
  }

  while (res[res.length - 1] === null) { res.pop() }
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
//144. Binary Tree Preorder Traversal
//(1)recusively
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
    } else { return }
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
  if (!root) return []
  
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
  } else { return false }
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
var minDepth = function (root) {
  if (!root) { return 0 }
  if (!root.left && !root.right) { return 1 }
  if (!root.left) { return 1 + minDepth(root.right) }
  if (!root.right) { return 1 + minDepth(root.left) }
  return 1 + Math.min(minDepth(root.right), minDepth(root.left))
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
  if (t1 == null && t2 == null) { return null }
  //t1 x t2 o
  //t1 o t2 x
  if (t1 == null) { return t2 }
  if (t2 == null) { return t1 }
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
  if (!root) { return false }
  if (!root.left && !root.right) { return root.val == sum }
  return hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
};

