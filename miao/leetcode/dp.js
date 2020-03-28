
//动态规划专题
//dynamic programming
//509. Fibonacci Number
/**
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
  let dp = new Array(N + 1);
  dp[0] = 0;
  dp[1] = dp[2] = 1;
  //dp base case
  for (let j = 3; j <= N; j++) {
    dp[j] = dp[j - 1] + dp[j - 2]
  }
  return dp[N]
};

//只需要记录3个状态
var fib = function (N) {
  if (N == 0) { return 0; }
  if (N == 2 || N == 1) { return 1; }

  let state1 = 1;
  let state2 = 1;
  let state3;

  for (let j = 3; j <= N; j++) {
    state3 = state1 + state2;
    state1 = state2
    state2 = state3
  }
  return state3
};
//516. Longest Palindromic Subsequence 这题很难
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  let length = s.length;

  // dp[i][j]表示的是从s[i]至s[j]之间的最长回文子序列的长度
  let dp = new Array(length);
  for (let i = 0; i < length; i++) {
    dp[i] = new Array(length).fill(0);
  }

  for (let i = length - 1; i >= 0; i--) {
    // 每一个字符都是一个回文字符串，因此对于dp[i][i]设置为1
    dp[i][i] = 1;
    for (let j = i + 1; j < length; j++) {
      // 状态转移方程为:
      // 当s[i]等于s[j]时，dp[i][j] = dp[i-1][j+1] + 2;
      // 当s[i]不等于s[j]时，dp[i][j] = max(dp[i-1][j], dp[i][j+1])
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[0][length - 1];
};

//300. Longest Increasing Subsequence
//(1) dp
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let l = nums.length;
  if (l == 0) { return 0; }
  let dp = new Array(l);
  dp[0] = 1;
  //dp[i] 为以 nums[i] 为结尾的LIS长度
  let maxans = 1;
  for (let i = 1; i < dp.length; i++) {
    let maxval = 0;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        maxval = Math.max(maxval, dp[j]);
      }
    }
    dp[i] = maxval + 1;
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
};

//(2) Greedy + DC 
//放弃治疗了



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

//brute force 
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //dp（n） 为凑出n面值所需要的最少硬币数
  const dp = (n) => {
    //base case 
    if (n == 0) { return 0; }
    if (n < 0) { return -1; }
    let res = Infinity
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      subProb = dp(n - coin);
      if (subProb == -1) { continue }
      res = Math.min(res, 1 + subProb)
    }
    return res === Infinity ? -1 : res;
  }

  return dp(amount)
}


// memo
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //dp（n） 为凑出n面值所需要的最少硬币数
  let memo = {};
  const dp = (n) => {
    //base case 
    if (n in memo) { return memo[n]; }
    if (n == 0) { return 0; }
    if (n < 0) { return -1; }
    let res = Infinity;
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      subProb = dp(n - coin);
      if (subProb == -1) { continue; }
      res = Math.min(res, 1 + subProb);
    }
    memo[n] = (res === Infinity ? -1 : res);
    return memo[n];
  }
  return dp(amount);
}

//DP
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //dp（n） 为凑出n面值所需要的最少硬币数
  let dp = new Array(amount + 1).fill(amount + 1);
  //base case 
  dp[0] = 0;
  for (let i = 0; i < dp.length; i++) {
    //i为面值
    for (currCoin of coins) {
      if (i - currCoin < 0) { continue; }
      dp[i] = Math.min(dp[i], 1 + dp[i - currCoin]);
    }
  }
  return (dp[amount] == amount + 1) ? -1 : dp[amount];
}


//70. Climbing Stairs
//(1)DP
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let dp = new Array(n + 1);
  dp[0] = 0; dp[1] = 1; dp[2] = 2;

  //至第i阶有dp[i]种方法
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n]
}

//(2)DP 只需要记录三种状态
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n == 1) { return 1; }
  if (n == 2) { return 2; }
  let st1 = 1, st2 = 2; let st3 = 0;
  for (let j = 3; j <= n; j++) {
    st3 = st1 + st2;
    st1 = st2;
    st2 = st3;
  }
  return st3;
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
  if (l == 1) {
    return nums[0]
  }
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
  if (l == 0) {
    return 0
  }
  if (l == 1) {
    return nums[0]
  }
  if (l == 2) {
    return Math.max(nums[0], nums[1])
  }
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
  if (l == 0 || l == 1) {
    return l
  }
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


