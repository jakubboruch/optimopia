import { describe, it, expect, vi } from 'vitest'
import { useDebouncedRef } from '@/composables/useDebounceRef'

vi.useFakeTimers();

describe('useDebounceRef', () => {
  it('Should debounce changes', async () => {
    const initialValue = 'initial value';
    const modifiedValue = 'new value';
    const delay = 500;
    const immediate = false;
    const debouncedRef = useDebouncedRef(initialValue, delay, immediate);
    vi.runAllTimersAsync();

    // Modify the debouncedRef value
    debouncedRef.value = modifiedValue;

    // Wait for the debounce delay - 1ms
    await new Promise((resolve) => setTimeout(resolve, delay - 1));

    // Check if the state value is not modified yet
    expect(debouncedRef.value).toBe(initialValue);

    // Wait 1ms more
    await new Promise((resolve) => setTimeout(resolve,  1));

    // Check if the state value has been updated
    expect(debouncedRef.value).toBe(modifiedValue);
  });

  it('Should debounce immediate', async () => {
    const initialValue = 'initial value';
    const delay = 500;
    const immediate = true
    const modifiedValue = 'new value';
    const debouncedRef = useDebouncedRef(initialValue, delay, immediate);
    vi.runAllTimersAsync();

    // Modify the debouncedRef value
    debouncedRef.value = modifiedValue;

    // Wait for 1ms
    await new Promise((resolve) => setTimeout(resolve, 1));

    // Check if the state value has been updated
    expect(debouncedRef.value).toBe(modifiedValue);

    // Modify the debouncedRef value to initial value
    debouncedRef.value = initialValue;

    // Wait for the debounce delay - 1ms
    await new Promise((resolve) => setTimeout(resolve, delay - 1));

    expect(debouncedRef.value).toBe(modifiedValue);

    // Wait 1ms more
    await new Promise((resolve) => setTimeout(resolve,  1));

    // Check if the state value has been updated
    expect(debouncedRef.value).toBe(initialValue);
  });
});