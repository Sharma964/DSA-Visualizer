// Step generators for sorting algorithms.
// Each returns an array of steps. A step describes a snapshot of the array
// plus which indices are being compared, swapped, or already sorted.

export type SortStep = {
  array: number[];
  compare: [number, number] | null;
  swap: [number, number] | null;
  sorted: number[]; // indices that are in their final position
  pivot: number | null;
  message: string;
};

const snap = (
  array: number[],
  partial: Partial<SortStep> = {},
): SortStep => ({
  array: array.slice(),
  compare: partial.compare ?? null,
  swap: partial.swap ?? null,
  sorted: partial.sorted ?? [],
  pivot: partial.pivot ?? null,
  message: partial.message ?? '',
});

export function bubbleSortSteps(initial: number[]): SortStep[] {
  const arr = initial.slice();
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];
  steps.push(snap(arr, { sorted, message: 'Starting Bubble Sort' }));

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push(snap(arr, { sorted, compare: [j, j + 1], message: `Compare ${arr[j]} and ${arr[j + 1]}` }));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        steps.push(snap(arr, { sorted, swap: [j, j + 1], message: `Swap → ${arr[j]} and ${arr[j + 1]}` }));
      }
    }
    sorted.unshift(n - 1 - i);
    steps.push(snap(arr, { sorted, message: `Pass ${i + 1} done — element ${arr[n - 1 - i]} locked` }));
    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) if (!sorted.includes(k)) sorted.push(k);
      steps.push(snap(arr, { sorted, message: 'No swaps — array already sorted' }));
      break;
    }
  }
  if (!sorted.includes(0)) sorted.push(0);
  steps.push(snap(arr, { sorted, message: 'Sorted!' }));
  return steps;
}

export function selectionSortSteps(initial: number[]): SortStep[] {
  const arr = initial.slice();
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];
  steps.push(snap(arr, { sorted, message: 'Starting Selection Sort' }));

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push(snap(arr, { sorted, compare: [i, i], message: `Assume min at index ${i} (${arr[i]})` }));
    for (let j = i + 1; j < n; j++) {
      steps.push(snap(arr, { sorted, compare: [minIdx, j], message: `Compare current min ${arr[minIdx]} with ${arr[j]}` }));
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push(snap(arr, { sorted, compare: [minIdx, j], message: `New min found at index ${minIdx}` }));
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push(snap(arr, { sorted, swap: [i, minIdx], message: `Swap ${arr[i]} into place` }));
    }
    sorted.push(i);
  }
  sorted.push(n - 1);
  steps.push(snap(arr, { sorted, message: 'Sorted!' }));
  return steps;
}

export function insertionSortSteps(initial: number[]): SortStep[] {
  const arr = initial.slice();
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted = [0];
  steps.push(snap(arr, { sorted, message: 'Starting Insertion Sort' }));

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push(snap(arr, { sorted, compare: [i, j], message: `Pick ${key}, insert into sorted part` }));
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push(snap(arr, { sorted, swap: [j, j + 1], message: `Shift ${arr[j]} right` }));
      j--;
    }
    arr[j + 1] = key;
    steps.push(snap(arr, { sorted, message: `Place ${key} at index ${j + 1}` }));
    sorted.push(i);
  }
  steps.push(snap(arr, { sorted, message: 'Sorted!' }));
  return steps;
}

export function mergeSortSteps(initial: number[]): SortStep[] {
  const arr = initial.slice();
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  steps.push(snap(arr, { sorted, message: 'Starting Merge Sort' }));

  function merge(lo: number, mid: number, hi: number) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      steps.push(snap(arr, { sorted, compare: [lo + i, mid + 1 + j], message: `Compare ${left[i]} and ${right[j]}` }));
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      steps.push(snap(arr, { sorted, swap: [k, k], message: `Write ${arr[k]} at index ${k}` }));
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i++];
      steps.push(snap(arr, { sorted, swap: [k, k], message: `Write ${arr[k]} at index ${k}` }));
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j++];
      steps.push(snap(arr, { sorted, swap: [k, k], message: `Write ${arr[k]} at index ${k}` }));
      k++;
    }
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    steps.push(snap(arr, { sorted, message: `Split [${lo}..${hi}] at ${mid}` }));
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  sort(0, arr.length - 1);
  for (let i = 0; i < arr.length; i++) sorted.push(i);
  steps.push(snap(arr, { sorted, message: 'Sorted!' }));
  return steps;
}

export function quickSortSteps(initial: number[]): SortStep[] {
  const arr = initial.slice();
  const steps: SortStep[] = [];
  const sorted: number[] = [];
  steps.push(snap(arr, { sorted, message: 'Starting Quick Sort' }));

  function partition(lo: number, hi: number) {
    const pivot = arr[hi];
    steps.push(snap(arr, { sorted, pivot: hi, message: `Pivot = ${pivot} (index ${hi})` }));
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push(snap(arr, { sorted, pivot: hi, compare: [j, hi], message: `Compare ${arr[j]} with pivot ${pivot}` }));
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push(snap(arr, { sorted, pivot: hi, swap: [i, j], message: `Swap ${arr[i]} and ${arr[j]}` }));
        }
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    steps.push(snap(arr, { sorted, swap: [i + 1, hi], message: `Place pivot at index ${i + 1}` }));
    sorted.push(i + 1);
    return i + 1;
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) sorted.push(lo);
      return;
    }
    const p = partition(lo, hi);
    sort(lo, p - 1);
    sort(p + 1, hi);
  }

  sort(0, arr.length - 1);
  for (let i = 0; i < arr.length; i++) if (!sorted.includes(i)) sorted.push(i);
  steps.push(snap(arr, { sorted, message: 'Sorted!' }));
  return steps;
}

export const sortGenerators: Record<string, (a: number[]) => SortStep[]> = {
  bubble: bubbleSortSteps,
  selection: selectionSortSteps,
  insertion: insertionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
};
