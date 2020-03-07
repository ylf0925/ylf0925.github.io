
//189
public class Solution {
  public void rotate(int[] nums, int k) {
    k = k % nums.length;
    int count = 0;
    for (int start = 0; count < nums.length; start++) {
      int current = start;
      int prev = nums[start];
      do {
        int next = (current + k) % nums.length;
        int temp = nums[next];
        nums[next] = prev;
        prev = temp;
        current = next;
        count++;
      } while (start != current);
    }
  }

}

  // 141. Linked List Cycle

  // Approach 1: Hash Table
  /*
   * Intuition To detect if a list is cyclic, we can check whether a node had been
   * visited before. A natural way is to use a hash table.
   * 
   * Algorithm
   * 
   * We go through each node one by one and record each node's reference (or
   * memory address) in a hash table. If the current node is null, we have reached
   * the end of the list and it must not be cyclic. If current node’s reference is
   * in the hash table, then return true.
   */

  public boolean hasCycle(ListNode head) {
    Set<ListNode> nodesSeen = new HashSet<>();
    while (head != null) {
      if (nodesSeen.contains(head)) {
        return true;
      } else {
        nodesSeen.add(head);
      }
      head = head.next;
    }
    return false;
  }

  /*
   * Complexity analysis
   * 
   * Time complexity : O(n)O(n). We visit each of the nn elements in the list at
   * most once. Adding a node to te hhash table costs only O(1)O(1) time.
   * 
   * Space complexity: O(n)O(n). The space depends on the number of elements added
   * to the hash table, which contains at most nn elements.
   */

  // Approach 2: Two Pointers

  /*
   * Intuition
   * 
   * Imagine two runners running on a track at different speed. What happens when
   * the track is actually a circle?
   * 
   * Algorithm
   * 
   * The space complexity can be reduced to O(1)O(1) by considering two pointers
   * at different speed - a slow pointer and a fast pointer. The slow pointer
   * moves one step at a time while the fast pointer moves two steps at a time.
   * 
   * If there is no cycle in the list, the fast pointer will eventually reach the
   * end and we can return false in this case.
   * 
   * Now consider a cyclic list and imagine the slow and fast pointers are two
   * runners racing around a circle track. The fast runner will eventually meet
   * the slow runner. Why? Consider this case (we name it case A) - The fast
   * runner is just one step behind the slow runner. In the next iteration, they
   * both increment one and two steps respectively and meet each other.
   * 
   * How about other cases? For example, we have not considered cases where the
   * fast runner is two or three steps behind the slow runner yet. This is simple,
   * because in the next or next's next iteration, this case will be reduced to
   * case A mentioned above.
   */

  public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
      return false;
    }
    ListNode slow = head;
    ListNode fast = head.next;
    while (slow != fast) {
      if (fast == null || fast.next == null) {
        return false;
      }
      slow = slow.next;
      fast = fast.next.next;
    }
    return true;
  }

  /*
   * Complexity analysis
   * 
   * Time complexity : O(n)O(n). Let us denote nn as the total number of nodes in
   * the linked list. To analyze its time complexity, we consider the following
   * two cases separately.
   * 
   * List has no cycle: The fast pointer reaches the end first and the run time
   * depends on the list's length, which is O(n)O(n).
   * 
   * List has a cycle: We break down the movement of the slow pointer into two
   * steps, the non-cyclic part and the cyclic part:
   * 
   * The slow pointer takes "non-cyclic length" steps to enter the cycle. At this
   * point, the fast pointer has already reached the cycle. \text{Number of
   * iterations} = \text{non-cyclic length} = NNumber of iterations=non-cyclic
   * length=N
   * 
   * Both pointers are now in the cycle. Consider two runners running in a cycle -
   * the fast runner moves 2 steps while the slow runner moves 1 steps at a time.
   * Since the speed difference is 1, it takes \dfrac{\text{distance between the 2
   * runners}}{\text{difference of speed}} difference of speed distance between
   * the 2 runners ​ loops for the fast runner to catch up with the slow runner.
   * As the distance is at most "\text{cyclic length K}cyclic length K" and the
   * speed difference is 1, we conclude that \text{Number of iterations} =
   * \text{almost}Number of iterations=almost
   * "\text{cyclic length K}cyclic length K".
   * 
   * Therefore, the worst case time complexity is O(N+K)O(N+K), which is O(n)O(n).
   * 
   * Space complexity : O(1)O(1). We only use two nodes (slow and fast) so the
   * space complexity is O(1)O(1).
   */

  // 51 N-queens
  class Solution {
    int rows[];
    // "hill" diagonals
    int hills[];
    // "dale" diagonals
    int dales[];
    int n;
    // output
    List<List<String>> output = new ArrayList();
    // queens positions
    int queens[];

    public boolean isNotUnderAttack(int row, int col) {
      int res = rows[col] + hills[row - col + 2 * n] + dales[row + col];
      return (res == 0) ? true : false;
    }

    public void placeQueen(int row, int col) {
      queens[row] = col;
      rows[col] = 1;
      hills[row - col + 2 * n] = 1; // "hill" diagonals
      dales[row + col] = 1; // "dale" diagonals
    }

    public void removeQueen(int row, int col) {
      queens[row] = 0;
      rows[col] = 0;
      hills[row - col + 2 * n] = 0;
      dales[row + col] = 0;
    }

    public void addSolution() {
      List<String> solution = new ArrayList<String>();
      for (int i = 0; i < n; ++i) {
        int col = queens[i];
        StringBuilder sb = new StringBuilder();
        for (int j = 0; j < col; ++j)
          sb.append(".");
        sb.append("Q");
        for (int j = 0; j < n - col - 1; ++j)
          sb.append(".");
        solution.add(sb.toString());
      }
      output.add(solution);
    }

    public void backtrack(int row) {
      for (int col = 0; col < n; col++) {
        if (isNotUnderAttack(row, col)) {
          placeQueen(row, col);
          // if n queens are already placed
          if (row + 1 == n)
            addSolution();
          // if not proceed to place the rest
          else
            backtrack(row + 1);
          // backtrack
          removeQueen(row, col);
        }
      }
    }

    public List<List<String>> solveNQueens(int n) {
      this.n = n;
      rows = new int[n];
      hills = new int[4 * n - 1];
      dales = new int[2 * n - 1];
      queens = new int[n];

      backtrack(0);
      return output;
    }
  }

  // 152. Maximum Product Subarray
  class Solution {
    public int maxProduct(int[] nums) {
      int[] dp_max = new int[nums.length + 1];
      int[] dp_min = new int[nums.length + 1];
      if (nums.length == 0)
        return 0;
      int max = Integer.MIN_VALUE;
      // 由于存在负数，所以需要维护两个数组
      // dp_max[i] 指的是以第 i 个数结尾的 乘积最大 的连续子序列
      // dp_min[i] 指的是以第 i 个数结尾的 乘积最小 的连续子序列
      dp_max[0] = 1;
      dp_min[0] = 1;
      for (int i = 1; i <= nums.length; i++) {
        // 如果数组的数是负数，那么会导致 max 变成 min，min 变成 max
        // 故需要交换dp
        if (nums[i - 1] < 0) {

          int temp = dp_min[i - 1];
          dp_min[i - 1] = dp_max[i - 1];
          dp_max[i - 1] = temp;
        }
        dp_min[i] = Math.min(nums[i - 1], dp_min[i - 1] * nums[i - 1]);
        dp_max[i] = Math.max(nums[i - 1], dp_max[i - 1] * nums[i - 1]);
        max = Math.max(max, dp_max[i]);
      }
      return max;
    }
  }

  /*
   * 这其实说白了就是子串的题目，所以必须使用动态规划去做。做 dp 的题目，我觉得首先最重要的不是状态转移方程，而是 dp
   * 数组的含义是什么，只有这个确定对了，状态方程才能很好的列出来！！！
   * 
   * 这里的 dp 数组指的是以第 i 个数 结尾的 连续子序列，由于存在负数，所以必须维护两个 dp 数组，其实这里根本用不到数组，但是为了更加清晰的看到
   * dp 的思想，我还是用数组来表达吧。
   * 
   * 我们先考虑都是正数的情况。dp_max[i] 的含义我们已经讲过了，dp_max[i] =
   * Math.max(nums[i-1],dp_max[i-1]*nums[i-1])，即 dp_max[i] 这个值只会在这两者产生，要么
   * 乘上之前的会更大，要么 舍弃前面的。 接下来考虑负数的情况，所以我们有必要维护一个 dp_min，思路是一模一样的，当遍历的元素为负数时，我们只需要把
   * dp_max[i-1]，dp_min[i-1]交换即可。 最后，只要找到所有dp_max中的数值最大的那个，就是我们需要的值了。
   */

  public int rob(int[] num) {
    int prevMax = 0;
    int currMax = 0;
    for (int x : num) {
      int temp = currMax;
      currMax = Math.max(prevMax + x, currMax);
      prevMax = temp;
    }
    return currMax;
  }

  class Solution {
    private int[][] matrix;
    private int target;

    private boolean searchRec(int left, int up, int right, int down) {
      // this submatrix has no height or no width.
      if (left > right || up > down) {
        return false;
        // `target` is already larger than the largest element or smaller
        // than the smallest element in this submatrix.
      } else if (target < matrix[up][left] || target > matrix[down][right]) {
        return false;
      }

      int mid = left + (right - left) / 2;

      // Locate `row` such that matrix[row-1][mid] < target < matrix[row][mid]
      int row = up;
      while (row <= down && matrix[row][mid] <= target) {
        if (matrix[row][mid] == target) {
          return true;
        }
        row++;
      }

      return searchRec(left, row, mid - 1, down) || searchRec(mid + 1, up, right, row - 1);
    }

    public boolean searchMatrix(int[][] mat, int targ) {
      // cache input values in object to avoid passing them unnecessarily
      // to `searchRec`
      matrix = mat;
      target = targ;

      // an empty matrix obviously does not contain `target`
      if (matrix == null || matrix.length == 0) {
        return false;
      }

      return searchRec(0, 0, matrix[0].length - 1, matrix.length - 1);
    }
  }

  public class Solution {
    public boolean Find(int target, int [][] array) {
    // 特殊情况处理
    if (array == null || array.length == 0 || array[0].length == 0) {
         return false;
     }

     int h = array.length - 1;
     int w = array[0].length - 1;

     // 如果目标值小于最小值 或者 目标值大于最大值，那肯定不存在
     if (array[0][0] > target || array[h][w] < target) {
         return false;
     }
     return binarySearchIn2DArray(array, target, 0, h, 0, w);
 }


  public static boolean binarySearchIn2DArray(int[][] array, int target, int startX, int endX, int startY, int endY) {
     if (startX > endX || startY > endY) {
         return false;
     }
     //首先，根据二分法找出中间行
     int x = (startX + endX) / 2;
     //对该行进行二分查找
     int result = binarySearch(array[x], target, startY, endY);
     //找到的值位于 x 行，result 列
     if (array[x][result] == target) {
         return true; // 如果找到则成功
     }
     //对剩余的两部分分别进行递归查找
     return binarySearchIn2DArray(array, target, startX, x - 1, result + 1, endY)
             || binarySearchIn2DArray(array, target, x + 1, endX, startY, result);
 }

  public static int binarySearch(int[] array, int target, int start, int end) {
     int i = (start + end) / 2;
     if (array[i] == target || start > end) { 
         return i;
     } else if (array[i] > target) {
         return binarySearch(array, target, start, i - 1);
     } else {
         return binarySearch(array, target, i + 1, end);
     }
 }
}
