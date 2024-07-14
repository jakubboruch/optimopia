<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePathCost } from '@/composables/usePathCost';
import { useDebouncedRef } from '@/composables/useDebounceRef'

import Textarea from 'primevue/textarea';
import Button from 'primevue/button'

const inputText = useDebouncedRef('', 500, true);
const grid = ref<number[][] | undefined>(undefined);
const invalidInputText = ref<boolean>(false);
const { minCost, calcMinCost } = usePathCost();

const isGridValid = (arr: number[][] | unknown): boolean => {
  if (!Array.isArray(arr)) {
    return false;
  }
  const subArrayLength = arr[0]?.length || 0
  return arr.every((subArr: unknown[]) => Array.isArray(subArr) && subArr.length === subArrayLength && subArr.every((item: unknown) => typeof item === 'number'))
}

const getGrid = (stringGrid: string): number[][] | undefined => {
  try {
    const g: number[][] = JSON.parse(stringGrid || '[]')
    const validGrid: boolean = isGridValid(g);
    if (!validGrid) {
      return undefined;
    }
    return g;
  } catch (e) {
    return undefined;
  }
}

const updateGrid = () => {
  minCost.value = undefined;
  grid.value = getGrid(inputText.value)
}

watch(inputText, () => {
  invalidInputText.value = !Boolean(getGrid(inputText.value));
})

</script>

<template>
  <div class="flex flex-column gap-8 w-6 mx-auto max-w-30rem">
    <section class="flex flex-column gap-3 w-100">
      <h1 class="text-center">Calculate <br />The Minimum Cost Of Path</h1>
      <Textarea :invalid="invalidInputText" class="o-textarea max-w-30rem h-6rem" v-model="inputText"></Textarea>
      <p v-show="invalidInputText" class="error text-xs font-bold">This is not a valid 2D array of numbers</p>
      <Button class="o-show" @click="updateGrid">Update grid</Button>
      <table class="o-table">
        <tr v-for="(row, i) in grid" :key="i">
          <td v-for="(col, j) in row" :key="j" class="border-round-sm bg-primary text-center border-1 h-3rem">{{ col }}</td>
        </tr>
      </table>
    </section>
    <section class="flex flex-column gap-3 w-100">
      <Button class="o-calc" v-show="grid?.length" @click="calcMinCost(grid)">Calculate Minimum Cost</Button>
      <div v-show="minCost">Minimum Cost: <span class="font-bold o-result">{{ minCost }}</span></div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.error {
  color: var(--p-textarea-invalid-border-color);
}
</style>