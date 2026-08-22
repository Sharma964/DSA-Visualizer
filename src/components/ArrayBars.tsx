import { motion } from 'framer-motion';

export type BarState = 'default' | 'compare' | 'swap' | 'sorted' | 'pivot' | 'found' | 'eliminated' | 'active';

const stateColors: Record<BarState, string> = {
  default: 'bg-slate-700',
  compare: 'bg-amber-400',
  swap: 'bg-rose-400',
  sorted: 'bg-emerald-500',
  pivot: 'bg-violet-400',
  found: 'bg-emerald-400 ring-2 ring-emerald-300',
  eliminated: 'bg-slate-800 opacity-40',
  active: 'bg-cyan-400',
};

export function ArrayBars({
  array,
  states = {},
  showValues = true,
  maxHeight = 280,
}: {
  array: number[];
  states?: Record<number, BarState>;
  showValues?: boolean;
  maxHeight?: number;
}) {
  const max = Math.max(...array, 1);
  return (
    <div className="flex items-end justify-center gap-1.5 flex-wrap" style={{ minHeight: maxHeight + 30 }}>
      {array.map((val, i) => {
        const h = Math.max(24, (val / max) * maxHeight);
        const state = states[i] ?? 'default';
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            {showValues && <span className="text-xs font-mono text-slate-400">{val}</span>}
            <motion.div
              layout
              className={`rounded-t-md w-10 ${stateColors[state]} transition-colors duration-200`}
              animate={{ height: h }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <span className="text-[10px] font-mono text-slate-600">{i}</span>
          </div>
        );
      })}
    </div>
  );
}
