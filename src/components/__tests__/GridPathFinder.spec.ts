import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import PrimeVue from 'primevue/config';
import GridPathFinder from '@/components/GridPathFinder.vue';
const wrapper = mount(GridPathFinder, {
  global: {
    plugins: [PrimeVue],
  },
});
const sampleValue = '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]';
const sampleWrongValue1= '';
const sampleWrongValue2= '{ "a": 1 }';
const sampleWrongValue3= 'wrong data';
const setSampleValues = async (value: string) => {
  const input = wrapper.find('textarea');
  await input.setValue(value);
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(input.element.value).toBe(value);
}

const checkAndClick = async (selector: string) => {
  const showButton = wrapper.find(selector);
  expect(showButton.exists()).toBe(true);
  await showButton.trigger('click');
}

const checkGrid = (value: string, isVisible: boolean = true) => {
  const grid = wrapper.find('table')
  const sampleValueFlat = isVisible ? JSON.parse(value).flat(Infinity).join('') : ''
  expect(grid.element.textContent).toBe(sampleValueFlat)
}

const checkResult = (value: number) => {
  const result = wrapper.find('.o-result')
  expect(Number(result.element.textContent)).toBe(value)
}

vi.useFakeTimers();

describe('GridPathFinder', () => {
  it('Should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  });

  it('Should not update the grid when wrong data are provided', async () => {
    vi.runAllTimersAsync();
    await setSampleValues(sampleWrongValue1)
    // Check if show grid button exists and click it
    await checkAndClick('button.o-show')
    // Check if grid is rendered properly
    checkGrid(sampleWrongValue1, false)

    await setSampleValues(sampleWrongValue2);
    // Check if show grid button exists and click it
    await checkAndClick('button.o-show')
    // Check if grid is rendered properly
    checkGrid(sampleWrongValue2, false)

    await setSampleValues(sampleWrongValue3);
    // Check if show grid button exists and click it
    await checkAndClick('button.o-show')
    // Check if grid is rendered properly
    checkGrid(sampleWrongValue3, false)
  })

  it('Should update when the "Update Grid" button is clicked after modifying the input in the textarea.', async () => {
    vi.runAllTimersAsync();
    await setSampleValues(sampleValue);
    // Check if show grid button exists and click it
    await checkAndClick('button.o-show')
    await nextTick()
    // Check if grid is rendered properly
    checkGrid(sampleValue)
  });

  it('The minimum cost should be calculated and displayed when the "Calculate Minimum Cost" button is clicked', async () => {
    await checkAndClick('button.o-calc')
    checkResult(21)
  });
});