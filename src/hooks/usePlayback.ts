import { useCallback, useEffect, useRef, useState } from 'react';

// Plays through an array of steps with pause/resume/step/reset.
// Steps are precomputed snapshots so animation is always faithful to the algorithm.
export function usePlayback<T>(steps: T[], speed: number) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // delay: higher speed → shorter delay. speed 1..10 → 700..60ms
  const delay = Math.max(40, 760 - speed * 70);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    clear();
  }, [clear]);

  // auto-advance while running
  useEffect(() => {
    if (!running) return;
    if (index >= steps.length - 1) {
      setRunning(false);
      return;
    }
    timer.current = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, steps.length - 1));
    }, delay);
    return clear;
  }, [running, index, steps.length, delay, clear]);

  const start = useCallback(() => {
    if (steps.length === 0) return;
    if (index >= steps.length - 1) setIndex(0);
    setRunning(true);
  }, [steps.length, index]);

  const pause = useCallback(() => setRunning(false), []);
  const step = useCallback(() => {
    setRunning(false);
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);
  const reset = useCallback(() => {
    setRunning(false);
    clear();
    setIndex(0);
  }, [clear]);

  // when steps array changes (new data), reset
  useEffect(() => {
    setRunning(false);
    clear();
    setIndex(0);
  }, [steps, clear]);

  useEffect(() => () => clear(), [clear]);

  return { index, running, start, pause, step, reset, current: steps[index] ?? null, total: steps.length };
}
