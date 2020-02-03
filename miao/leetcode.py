# 63. Unique Paths II
class Solution(object):
    def uniquePathsWithObstacles(self, obstacleGrid):
        """
        brute force, bottom-up recursively with memorization
        - intuitively go through all the path with i+1 OR j+1
        - count the path which reaches to the destination coordinate (m, n)
        - cache the count of the coordinates which we have calculated before
        - if the current grid, grid[i][j], is blocked, tell its parent that this way is blocked by return 0
        - sum up all the coordinates' count

        Time    O(row*col) since we cache the intermediate coordinates, we wont go through the visited coordinates again
        Space   O(row*col) depth of recursions
        """
        if len(obstacleGrid) == 0 or len(obstacleGrid[0]) == 0:
            return 0
        seen = {}
        return self.dfs(obstacleGrid, 0, 0, len(obstacleGrid)-1, len(obstacleGrid[0])-1, seen)

    def dfs(self, grid, i, j, m, n, seen):
        key = str(i)+","+str(j)
        if key in seen:
            return seen[key]
        if i == m and j == n:
            if grid[i][j] == 1:
                return 0
            return 1
        elif i > m or j > n:
            return 0
        if grid[i][j] == 1:
            seen[key] = 0
            return 0
        left = self.dfs(grid, i+1, j, m, n, seen)
        right = self.dfs(grid, i, j+1, m, n, seen)
        seen[key] = left + right
        return left + right
