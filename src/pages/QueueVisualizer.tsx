import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye, Trash2, ListOrdered, AlertTriangle, ArrowRight } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { InfoPanel } from '@/components/InfoPanel';
import { dataStructureInfo } from '@/data/algorithms';

const MAX = 8;

export function QueueVisualizer({ topic }: { topic: 'queue' }) {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('Ready.');
  const [peekIdx, setPeekIdx] = useState<number | null>(null);

  const enqueue = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number.');
    if (queue.length >= MAX) { setStatus('Queue overflow — queue is full.'); return; }
    setQueue((q) => [...q, v]);
    setStatus(`Enqueued ${v}`);
    setValue('');
  };
  const dequeue = () => {
    if (queue.length === 0) { setStatus('Queue underflow — queue is empty.'); return; }
    const front = queue[0];
    setQueue((q) => q.slice(1));
    setStatus(`Dequeued ${front}`);
  };
  const peek = () => {
    if (queue.length === 0) { setStatus('Queue is empty — nothing to peek.'); return; }
    setPeekIdx(0);
    setStatus(`Front element is ${queue[0]}`);
    setTimeout(() => setPeekIdx(null), 1200);
  };
  const clear = () => { setQueue([]); setStatus('Queue cleared.'); };

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
              <button onClick={enqueue} className="btn-primary text-xs"><Plus size={14} /> Enqueue</button>
              <button onClick={dequeue} className="btn-ghost text-xs"><Minus size={14} /> Dequeue</button>
              <button onClick={peek} className="btn-ghost text-xs"><Eye size={14} /> Peek</button>
              <button onClick={clear} className="btn-danger text-xs"><Trash2 size={14} /> Clear</button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ListOrdered size={14} /> Size: {queue.length} / {MAX}
              {queue.length === MAX && <span className="text-rose-400 flex items-center gap-1"><AlertTriangle size={12} /> Full</span>}
              {queue.length === 0 && <span className="text-amber-400">Empty</span>}
            </div>
          </div>

          <div className="glass-card p-6 min-h-[280px]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-emerald-400">FRONT →</span>
              <span className="text-xs text-slate-500">FIFO: First In, First Out</span>
              <span className="text-xs font-mono text-cyan-400">← REAR</span>
            </div>
            <div className="flex items-center gap-2 min-h-[100px] flex-wrap border-2 border-dashed border-slate-800 rounded-xl p-6 bg-slate-950/40">
              <AnimatePresence>
                {queue.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-600 text-sm w-full text-center">
                    Queue is empty
                  </motion.div>
                )}
                {queue.map((v, i) => (
                  <motion.div
                    key={`${i}-${v}`}
                    layout
                    initial={{ opacity: 0, x: 40, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-bold border ${
                      i === 0
                        ? peekIdx === 0
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-emerald-500/15 border-emerald-400 text-emerald-300'
                        : i === queue.length - 1
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200'
                        : 'bg-slate-800/70 border-slate-700 text-slate-200'
                    }`}
                  >
                    {v}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-sm text-slate-300 font-mono">{status}</div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={dataStructureInfo.queue} />
        </div>
      </div>
    </VisualizerPage>
  );
}
