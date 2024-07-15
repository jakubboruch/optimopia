import { ref } from 'vue'

export function usePathCost() {
  const minCost = ref<undefined | number>(undefined);
  const optimalPath = ref<number[][]>([])


  const getMinValue = (dp: number[][], i: number, j: number): number => {
      return Math.min(dp[i - 1]?.[j] ?? Infinity, dp[i][j - 1] ?? Infinity) // dp[i - 1]?.[j - 1] ?? Infinity
  }
  const setOptimalPath = (dp: number[][]): void => {
    const rowsLength: number = dp.length;
    const colsLength: number = dp[0].length;
    let i = rowsLength - 1;
    let j = colsLength - 1;

    while (i > 0 || j > 0) {
      optimalPath.value.push([i, j]);
      const minValue = getMinValue(dp, i, j);
      if (i > 0 && minValue === dp[i - 1][j]) {
        i--
      } else {
        if (j > 0 && minValue === dp[i][j - 1]) {
          j--
        } else {
          i--; j--;
        }
      }
    }
    optimalPath.value.push([0, 0]);
    optimalPath.value.reverse();

  }

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
        dp[i][j] = grid[i][j] + getMinValue(dp, i, j);
      }
    }
    setOptimalPath(dp);

    // Return the minimum cost for the bottom-right cell
    return dp[rowsLength - 1][colsLength - 1];
  }
  const calcMinCost = (grid: number[][] | undefined) => {
    if (!grid) {
      return;
    }
    minCost.value = minCostPath(grid);
  }

  return { minCost, minCostPath, calcMinCost, optimalPath }
}