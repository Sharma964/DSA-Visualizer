import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye, Trash2, Layers, AlertTriangle } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { InfoPanel } from '@/components/InfoPanel';
import { dataStructureInfo } from '@/data/algorithms';

const MAX = 8;

export function StackVisualizer({ topic }: { topic: 'stack' }) {
  const [stack, setStack] = useState<number[]>([10, 20, 30, 40]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('Ready.');
  const [peekIdx, setPeekIdx] = useState<number | null>(null);

  const push = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number.');
    if (stack.length >= MAX) { setStatus('Stack overflow — cannot push, stack is full.'); return; }
    setStack((s) => [...s, v]);
    setStatus(`Pushed ${v}`);
    setValue('');
  };
  const pop = () => {
    if (stack.length === 0) { setStatus('Stack underflow — stack is empty.'); return; }
    const top = stack[stack.length - 1];
    setStack((s) => s.slice(0, -1));
    setStatus(`Popped ${top}`);
  };
  const peek = () => {
    if (stack.length === 0) { setStatus('Stack is empty — nothing to peek.'); return; }
    setPeekIdx(stack.length - 1);
    setStatus(`Top element is ${stack[stack.length - 1]}`);
    setTimeout(() => setPeekIdx(null), 1200);
  };
  const clear = () => { setStack([]); setStatus('Stack cleared.'); };

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-xs text-slate-400">
                Value
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="input w-28" placeholder="e.g. 55" />
              </label>
              <button onClick={push} className="btn-primary text-xs"><Plus size={14} /> Push</button>
              <button onClick={pop} className="btn-ghost text-xs"><Minus size={14} /> Pop</button>
              <button onClick={peek} className="btn-ghost text-xs"><Eye size={14} /> Peek</button>
              <button onClick={clear} className="btn-danger text-xs"><Trash2 size={14} /> Clear</button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Layers size={14} /> Capacity: {stack.length} / {MAX}
              {stack.length === MAX && <span className="text-rose-400 flex items-center gap-1"><AlertTriangle size={12} /> Full</span>}
              {stack.length === 0 && <span className="text-amber-400">Empty</span>}
            </div>
          </div>

          <div className="glass-card p-6 min-h-[420px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">← TOP</span>
              <span className="text-xs text-slate-500">LIFO: Last In, First Out</span>
            </div>
            <div className="flex flex-col-reverse items-center gap-2 min-h-[280px] justify-start py-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/40">
              <AnimatePresence>
                {stack.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-600 text-sm py-12">
                    Stack is empty
                  </motion.div>
                )}
                {stack.map((v, i) => (
                  <motion.div
                    key={`${i}-${v}`}
                    layout
                    initial={{ opacity: 0, y: -30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className={`w-40 rounded-lg px-4 py-3 text-center font-mono text-lg font-bold border ${
                      i === stack.length - 1
                        ? peekIdx === i
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30'
                          : 'bg-emerald-500/15 border-emerald-400 text-emerald-300'
                        : 'bg-slate-800/70 border-slate-700 text-slate-200'
                    }`}
                  >
                    {v}
                    {i === stack.length - 1 && <span className="ml-2 text-[10px] text-emerald-400">← top</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-sm text-slate-300 font-mono">{status}</div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={dataStructureInfo.stack} />
        </div>
      </div>
    </VisualizerPage>
  );
}
