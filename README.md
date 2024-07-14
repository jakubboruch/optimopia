# Optimopia
Task implementation for Senior Vue.js developer

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Senior Vue.js Developer Task Description

### Problem Statement
You are given a 2D grid of integers, where each cell represents a cost to move through that cell.
Your task is to write a function in JavaScript/TypeScript to find the minimum cost to travel from
the top-left corner to the bottom-right corner of the grid. You can only move right or down.
###Requirements
1. Algorithm Implementation:
   * Implement a function named minCostPath that takes a 2D array grid as its parameter.
   * The function should return an integer representing the minimum cost to travel from the top-left corner to the bottom-right corner of the grid.
   #### Algorithm example inputs and minimal cost values:
   * Example 1 \
   Input: [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ] \
   The path: 1 → 2 → 3 → 6 → 9 \
   Minimum cost: 21
   * Example 2 \
   Input: [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ] \
   The path: 1 → 1 → 1 → 1 → 1 \
   Minimum cost: 5
   * Example 3 \
   Input: [ [5, 4, 2], [1, 9, 3], [8, 7, 6] ] \
   The path: 5 → 4 → 2 → 3 → 6 \
   Minimum cost 5 + 4 + 2 + 3 + 6 = 20


2. Vue.js Component:
   - Create a Vue.js component named GridPathFinder.
   - The component should include:
        * A textarea for the user to input the grid as an array of arrays of
   integers.
        * A button labeled "Update Grid" that updates the table grid based on the
   input.
        * A table that displays the grid.
        * A button labeled "Calculate Minimum Cost" that calculates the minimum
   cost path using the minCostPath function.
        * A paragraph that displays the result (minimum cost).
   Screenshot of the sample component with required functionalities has been
   attached below
3. Component Design:
   ○ You are free to design the component as you wish. You do not need to copy the
   design from the screenshot provided. Focus on implementing the required
   functionalities.

### Expected Component Behavior
* The table grid should update when the "Update Grid" button is clicked after modifying the
input in the textarea.
* The minimum cost should be calculated and displayed when the "Calculate Minimum
Cost" button is clicked.