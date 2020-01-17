
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
var groupAnagrams = function (strs) {

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

//14
var longestCommonPrefix = function (strs) {



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
//462
var minMoves2 = function (nums) {//中位数

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
  for (var i = 0; i < s.length; i++) {//第二个循环遍历字符串中的相对应obj的key，如果对应的value为1，则返回
    var c = s[i]
    if (map[c] == 1) {
      return i
    }
  }
  return -1
}


// 随堂练习
/*
function findIndex(ary, target) {
  for (var i = 0; i < ary.length; i++) {
    if (ary[i ] == target) {
      return i
    } else {
      return -1
    }
  }
}
 */


/* function fib(n){
  if (n==1||n==2){
    return 1
  }
  else {
    return fib (n-1) + fib (n-2)
  }
} */



function argsToArray(args) {

}




//Object 
let journal = []
function addEntry(events, squirrel) {
  journal.push({ events, squirrel })
}
addEntry(["work", "touched tree", "pizza", "running", 'televsion'], false)

// calculate phi
function phi(table) {
  return ((table[3] * table[0] - table[2] * table[1]) / (Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]))))
}


function tableFor(event, journal) {
  let table = [0, 0, 0, 0]
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0
    if (entry.events.includes(event)) index += 1
    if (entry["squirrel"]) index += 2
    table[index]++
  }
  return table;
}

function journalEvents(journal) {

  let events = []
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event)
      }
    }
  }
  return events
}


var JOURNAL = [
  { "events": ["carrot", "exercise", "weekend"], "squirrel": false },
  { "events": ["bread", "pudding", "brushed teeth", "weekend", "touched tree"], "squirrel": false },
  { "events": ["carrot", "nachos", "brushed teeth", "cycling", "weekend"], "squirrel": false },
  { "events": ["brussel sprouts", "ice cream", "brushed teeth", "computer", "weekend"], "squirrel": false },
  { "events": ["potatoes", "candy", "brushed teeth", "exercise", "weekend", "dentist"], "squirrel": false },
  { "events": ["brussel sprouts", "pudding", "brushed teeth", "running", "weekend"], "squirrel": false },
  { "events": ["pizza", "brushed teeth", "computer", "work", "touched tree"], "squirrel": false },
  { "events": ["bread", "beer", "brushed teeth", "cycling", "work"], "squirrel": false },
  { "events": ["cauliflower", "brushed teeth", "work"], "squirrel": false },
  { "events": ["pizza", "brushed teeth", "cycling", "work"], "squirrel": false },
  { "events": ["lasagna", "nachos", "brushed teeth", "work"], "squirrel": false },
  { "events": ["brushed teeth", "weekend", "touched tree"], "squirrel": false },
  { "events": ["lettuce", "brushed teeth", "television", "weekend"], "squirrel": false },
  { "events": ["spaghetti", "brushed teeth", "work"], "squirrel": false },
  { "events": ["brushed teeth", "computer", "work"], "squirrel": false },
  { "events": ["lettuce", "nachos", "brushed teeth", "work"], "squirrel": false },
  { "events": ["carrot", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["brushed teeth", "work"], "squirrel": false },
  { "events": ["cauliflower", "reading", "weekend"], "squirrel": false },
  { "events": ["bread", "brushed teeth", "weekend"], "squirrel": false },
  { "events": ["lasagna", "brushed teeth", "exercise", "work"], "squirrel": false },
  { "events": ["spaghetti", "brushed teeth", "reading", "work"], "squirrel": false },
  { "events": ["carrot", "ice cream", "brushed teeth", "television", "work"], "squirrel": false },
  { "events": ["spaghetti", "nachos", "work"], "squirrel": false },
  { "events": ["cauliflower", "ice cream", "brushed teeth", "cycling", "work"], "squirrel": false },
  { "events": ["spaghetti", "peanuts", "computer", "weekend"], "squirrel": true },
  { "events": ["potatoes", "ice cream", "brushed teeth", "computer", "weekend"], "squirrel": false },
  { "events": ["potatoes", "ice cream", "brushed teeth", "work"], "squirrel": false },
  { "events": ["peanuts", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["potatoes", "exercise", "work"], "squirrel": false },
  { "events": ["pizza", "ice cream", "computer", "work"], "squirrel": false },
  { "events": ["lasagna", "ice cream", "work"], "squirrel": false },
  { "events": ["cauliflower", "candy", "reading", "weekend"], "squirrel": false },
  { "events": ["lasagna", "nachos", "brushed teeth", "running", "weekend"], "squirrel": false },
  { "events": ["potatoes", "brushed teeth", "work"], "squirrel": false },
  { "events": ["carrot", "work"], "squirrel": false },
  { "events": ["pizza", "beer", "work", "dentist"], "squirrel": false },
  { "events": ["lasagna", "pudding", "cycling", "work"], "squirrel": false },
  { "events": ["spaghetti", "brushed teeth", "reading", "work"], "squirrel": false },
  { "events": ["spaghetti", "pudding", "television", "weekend"], "squirrel": false },
  { "events": ["bread", "brushed teeth", "exercise", "weekend"], "squirrel": false },
  { "events": ["lasagna", "peanuts", "work"], "squirrel": true },
  { "events": ["pizza", "work"], "squirrel": false },
  { "events": ["potatoes", "exercise", "work"], "squirrel": false },
  { "events": ["brushed teeth", "exercise", "work"], "squirrel": false },
  { "events": ["spaghetti", "brushed teeth", "television", "work"], "squirrel": false },
  { "events": ["pizza", "cycling", "weekend"], "squirrel": false },
  { "events": ["carrot", "brushed teeth", "weekend"], "squirrel": false },
  { "events": ["carrot", "beer", "brushed teeth", "work"], "squirrel": false },
  { "events": ["pizza", "peanuts", "candy", "work"], "squirrel": true },
  { "events": ["carrot", "peanuts", "brushed teeth", "reading", "work"], "squirrel": false },
  { "events": ["potatoes", "peanuts", "brushed teeth", "work"], "squirrel": false },
  { "events": ["carrot", "nachos", "brushed teeth", "exercise", "work"], "squirrel": false },
  { "events": ["pizza", "peanuts", "brushed teeth", "television", "weekend"], "squirrel": false },
  { "events": ["lasagna", "brushed teeth", "cycling", "weekend"], "squirrel": false },
  { "events": ["cauliflower", "peanuts", "brushed teeth", "computer", "work", "touched tree"], "squirrel": false },
  { "events": ["lettuce", "brushed teeth", "television", "work"], "squirrel": false },
  { "events": ["potatoes", "brushed teeth", "computer", "work"], "squirrel": false },
  { "events": ["bread", "candy", "work"], "squirrel": false },
  { "events": ["potatoes", "nachos", "work"], "squirrel": false },
  { "events": ["carrot", "pudding", "brushed teeth", "weekend"], "squirrel": false },
  { "events": ["carrot", "brushed teeth", "exercise", "weekend", "touched tree"], "squirrel": false },
  { "events": ["brussel sprouts", "running", "work"], "squirrel": false },
  { "events": ["brushed teeth", "work"], "squirrel": false },
  { "events": ["lettuce", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["candy", "brushed teeth", "work"], "squirrel": false },
  { "events": ["brussel sprouts", "brushed teeth", "computer", "work"], "squirrel": false },
  { "events": ["bread", "brushed teeth", "weekend"], "squirrel": false },
  { "events": ["cauliflower", "brushed teeth", "weekend"], "squirrel": false },
  { "events": ["spaghetti", "candy", "television", "work", "touched tree"], "squirrel": false },
  { "events": ["carrot", "pudding", "brushed teeth", "work"], "squirrel": false },
  { "events": ["lettuce", "brushed teeth", "work"], "squirrel": false },
  { "events": ["carrot", "ice cream", "brushed teeth", "cycling", "work"], "squirrel": false },
  { "events": ["pizza", "brushed teeth", "work"], "squirrel": false },
  { "events": ["spaghetti", "peanuts", "exercise", "weekend"], "squirrel": true },
  { "events": ["bread", "beer", "computer", "weekend", "touched tree"], "squirrel": false },
  { "events": ["brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["lettuce", "peanuts", "brushed teeth", "work", "touched tree"], "squirrel": false },
  { "events": ["lasagna", "brushed teeth", "television", "work"], "squirrel": false },
  { "events": ["cauliflower", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["carrot", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["carrot", "reading", "weekend"], "squirrel": false },
  { "events": ["carrot", "peanuts", "reading", "weekend"], "squirrel": true },
  { "events": ["potatoes", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["lasagna", "ice cream", "work", "touched tree"], "squirrel": false },
  { "events": ["cauliflower", "peanuts", "brushed teeth", "cycling", "work"], "squirrel": false },
  { "events": ["pizza", "brushed teeth", "running", "work"], "squirrel": false },
  { "events": ["lettuce", "brushed teeth", "work"], "squirrel": false },
  { "events": ["bread", "brushed teeth", "television", "weekend"], "squirrel": false },
  { "events": ["cauliflower", "peanuts", "brushed teeth", "weekend"], "squirrel": false }
];


for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)))
}



//ARRAY LOOP
for (let entry of JOURNAL) {
  console.log(entry.events.length, entry.events)
}
