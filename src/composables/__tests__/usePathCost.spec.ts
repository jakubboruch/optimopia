import { describe, it, expect, vi } from 'vitest'
import { usePathCost } from '@/composables/usePathCost'

describe('usePathCost', () => {
  it('Should return proper value of minimum cost of path', () => {
    const { minCostPath } = usePathCost()
    let grid: number[][];

    // Input: [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
    // The path: 1 → 2 → 3 → 6 → 9
    // Minimum cost: 21
    grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expect(minCostPath(grid)).toBe(21);

    // Input: [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ]
    // The path: 1 → 1 → 1 → 1 → 1
    // Minimum cost: 5
    grid = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    expect(minCostPath(grid)).toBe(5);

    // Input: [ [5, 4, 2], [1, 9, 3], [8, 7, 6] ]
    // The path: 5 → 4 → 2 → 3 → 6
    // Minimum cost 5 + 4 + 2 + 3 + 6 = 20
    grid = [[5, 4, 2], [1, 9, 3], [8, 7, 6]]
    expect(minCostPath(grid)).toBe(20);
  })

  it('calcMinCost should not trigger minCostPath for no data', () => {
    const pathCost = usePathCost()
    const spy = vi.spyOn(pathCost, 'minCostPath')
    const grid = undefined

    // Executing a function that modifies minCost
    pathCost.calcMinCost(grid);
    expect(spy).toHaveBeenCalledTimes(0)
    expect(pathCost.minCost.value).toBe(undefined)
  })

  it('calcMinCost function should set proper minCost value', () => {
    const { minCost, calcMinCost } = usePathCost()
    const grid: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    // Executing a function that modifies minCost
    calcMinCost(grid);
    expect(minCost.value).toBe(21);
  })
})
