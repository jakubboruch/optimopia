import { ref } from 'vue'

export function usePathCost() {
  const minCost = ref<undefined | number>(undefined);
  const minCostPath = (grid: number[][]): number => {
    const rowsLength: number = grid.length;
    const colsLength: number = grid[0].length;

    // Create a 2D array to store the minimum cost
    const dp: number[][] = Array.from({ length: rowsLength }, () => Array(colsLength).fill(0));

    // Initialize the first cell with its cost
    dp[0][0] = grid[0][0];

    // Fill in the first row and first column
    for (let i = 1; i < rowsLength; i++) {
      dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    for (let j = 1; j < colsLength; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    // Calculate the minimum cost for each cell
    for (let i = 1; i < rowsLength; i++) {
      for (let j = 1; j < colsLength; j++) {
        dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }

    // Return the minimum cost for the bottom-right cell
    return dp[rowsLength - 1][colsLength - 1];
  }
  const calcMinCost = (grid: number[][] | undefined) => {
    if (!grid) {
      return;
    }
    minCost.value = minCostPath(grid);
  }

  return { minCost, minCostPath, calcMinCost }
}