import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Search, RefreshCw, ArrowRight, Link2, ChevronRight,
} from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { InfoPanel } from '@/components/InfoPanel';
import { dataStructureInfo } from '@/data/algorithms';

type Node = { id: number; value: number };

let idCounter = 100;
const nextId = () => ++idCounter;

export function LinkedListVisualizer({ topic }: { topic: 'linked-list' }) {
  const [list, setList] = useState<Node[]>([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
  ]);
  const [value, setValue] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Ready. Try an operation above.');
  const [highlight, setHighlight] = useState<number | null>(null);

  const flash = (id: number | null, msg: string) => {
    setHighlight(id);
    setStatus(msg);
    setTimeout(() => setHighlight(null), 900);
  };

  const insertBeginning = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number to insert.');
    const node = { id: nextId(), value: v };
    setList((l) => [node, ...l]);
    flash(node.id, `Inserted ${v} at the head`);
    setValue('');
  };
  const insertEnd = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number to insert.');
    const node = { id: nextId(), value: v };
    setList((l) => [...l, node]);
    flash(node.id, `Inserted ${v} at the tail`);
    setValue('');
  };
  const insertAt = () => {
    const v = Number(value);
    const pos = Number(position);
    if (!value || isNaN(v)) return setStatus('Enter a valid value.');
    if (isNaN(pos) || pos < 0 || pos > list.length) return setStatus(`Position must be 0..${list.length}`);
    const node = { id: nextId(), value: v };
    setList((l) => [...l.slice(0, pos), node, ...l.slice(pos)]);
    flash(node.id, `Inserted ${v} at position ${pos}`);
    setValue('');
    setPosition('');
  };
  const deleteAt = () => {
    const pos = Number(position);
    if (isNaN(pos) || pos < 0 || pos >= list.length) return setStatus(`Position must be 0..${list.length - 1}`);
    const removed = list[pos];
    setList((l) => l.filter((_, i) => i !== pos));
    flash(null, `Deleted ${removed.value} from position ${pos}`);
    setPosition('');
  };
  const search = () => {
    const v = Number(value);
    if (isNaN(v)) return setStatus('Enter a value to search.');
    const idx = list.findIndex((n) => n.value === v);
    if (idx === -1) { setStatus(`${v} not found in the list`); return; }
    flash(list[idx].id, `Found ${v} at index ${idx}`);
  };
  const reverse = () => {
    setList((l) => [...l].reverse());
    setStatus('List reversed');
  };
  const reset = () => {
    setList([
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
    ]);
    setStatus('Reset to default list');
  };

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-xs text-slate-400">
                Value
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="input w-24" placeholder="e.g. 25" />
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-400">
                Position
                <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} className="input w-24" placeholder="0.." />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={insertBeginning} className="btn-primary text-xs"><Plus size={14} /> Insert Beginning</button>
              <button onClick={insertEnd} className="btn-primary text-xs"><Plus size={14} /> Insert End</button>
              <button onClick={insertAt} className="btn-ghost text-xs"><Plus size={14} /> Insert At Pos</button>
              <button onClick={deleteAt} className="btn-danger text-xs"><Trash2 size={14} /> Delete At Pos</button>
              <button onClick={search} className="btn-ghost text-xs"><Search size={14} /> Search</button>
              <button onClick={reverse} className="btn-ghost text-xs"><RefreshCw size={14} /> Reverse</button>
              <button onClick={reset} className="btn-ghost text-xs"><RefreshCw size={14} /> Reset</button>
            </div>
          </div>

          <div className="glass-card p-6 min-h-[240px]">
            <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
              <Link2 size={16} className="text-emerald-400" /> HEAD
            </div>
            {list.length === 0 ? (
              <div className="text-center text-slate-500 py-12">List is empty. Insert a node to begin.</div>
            ) : (
              <div className="flex items-center flex-wrap gap-2">
                <AnimatePresence>
                  {list.map((node, i) => (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`relative rounded-xl border px-4 py-3 min-w-[64px] text-center transition-all ${
                          highlight === node.id
                            ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-110'
                            : 'bg-slate-800/70 border-slate-700'
                        }`}
                      >
                        <div className="font-mono text-lg font-bold text-white">{node.value}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">idx {i}</div>
                      </div>
                      {i < list.length - 1 ? (
                        <ArrowRight size={18} className="text-slate-600" />
                      ) : (
                        <span className="text-xs font-mono text-slate-600 ml-1">→ NULL</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-slate-800 text-sm text-slate-300 font-mono">
              {status}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={dataStructureInfo.linkedList} />
        </div>
      </div>
    </VisualizerPage>
  );
}
