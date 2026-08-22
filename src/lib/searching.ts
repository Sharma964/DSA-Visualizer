// Step generators for searching algorithms.

export type SearchStep = {
  array: number[];
  target: number;
  checking: number | null;
  found: number | null;
  eliminated: number[]; // indices ruled out
  range: [number, number] | null; // active range for binary search
  message: string;
};

export function linearSearchSteps(initial: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const eliminated: number[] = [];
  steps.push({ array: initial.slice(), target, checking: null, found: null, eliminated: [], range: null, message: `Searching for ${target}` });

  for (let i = 0; i < initial.length; i++) {
    steps.push({
      array: initial.slice(),
      target,
      checking: i,
      found: null,
      eliminated: eliminated.slice(),
      range: null,
      message: `Check index ${i}: ${initial[i]} === ${target}?`,
    });
    if (initial[i] === target) {
      steps.push({
        array: initial.slice(),
        target,
        checking: i,
        found: i,
        eliminated: eliminated.slice(),
        range: null,
        message: `Target found at index ${i}!`,
      });
      return steps;
    }
    eliminated.push(i);
  }
  steps.push({
    array: initial.slice(),
    target,
    checking: null,
    found: -1,
    eliminated: eliminated.slice(),
    range: null,
    message: `${target} not found in the array`,
  });
  return steps;
}

export function binarySearchSteps(initial: number[], target: number): SearchStep[] {
  // assumes sorted array
  const arr = initial.slice();
  const steps: SearchStep[] = [];
  let lo = 0, hi = arr.length - 1;
  steps.push({ array: arr.slice(), target, checking: null, found: null, eliminated: [], range: [lo, hi], message: `Searching for ${target} in sorted array` });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: arr.slice(),
      target,
      checking: mid,
      found: null,
      eliminated: [],
      range: [lo, hi],
      message: `Check middle index ${mid}: ${arr[mid]} === ${target}?`,
    });
    if (arr[mid] === target) {
      steps.push({
        array: arr.slice(),
        target,
        checking: mid,
        found: mid,
        eliminated: [],
        range: [lo, hi],
        message: `Target found at index ${mid}!`,
      });
      return steps;
    }
    if (arr[mid] < target) {
      lo = mid + 1;
      steps.push({ array: arr.slice(), target, checking: mid, found: null, eliminated: [], range: [lo, hi], message: `${arr[mid]} < ${target}, search right half` });
    } else {
      hi = mid - 1;
      steps.push({ array: arr.slice(), target, checking: mid, found: null, eliminated: [], range: [lo, hi], message: `${arr[mid]} > ${target}, search left half` });
    }
  }
  steps.push({
    array: arr.slice(),
    target,
    checking: null,
    found: -1,
    eliminated: [],
    range: null,
    message: `${target} not found in the array`,
  });
  return steps;
}
