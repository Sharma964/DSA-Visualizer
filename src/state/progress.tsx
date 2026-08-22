import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ProgressState = Record<string, boolean>;

type Ctx = {
  completed: ProgressState;
  toggle: (id: string) => void;
  count: number;
  total: number;
};

const ProgressContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'dsa-visualizer-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<ProgressState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      /* ignore */
    }
  }, [completed]);

  const toggle = (id: string) => setCompleted((p) => ({ ...p, [id]: !p[id] }));
  const count = Object.values(completed).filter(Boolean).length;

  return (
    <ProgressContext.Provider value={{ completed, toggle, count, total: 8 }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
