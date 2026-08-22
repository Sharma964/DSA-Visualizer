import { useState } from 'react';
import { ChevronDown, Info, Code2 } from 'lucide-react';
import type { AlgoInfo } from '@/data/algorithms';
import { CodePanel } from './CodePanel';

export function InfoPanel({ info }: { info: AlgoInfo }) {
  const [open, setOpen] = useState<'info' | 'code' | null>('info');
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(open === 'info' ? null : 'info')}
          className={`btn-ghost flex-1 justify-start ${open === 'info' ? 'ring-2 ring-emerald-500/40' : ''}`}
        >
          <Info size={16} className="text-emerald-400" />
          Algorithm Info
          <ChevronDown size={14} className={`ml-auto transition-transform ${open === 'info' ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={() => setOpen(open === 'code' ? null : 'code')}
          className={`btn-ghost flex-1 justify-start ${open === 'code' ? 'ring-2 ring-emerald-500/40' : ''}`}
        >
          <Code2 size={16} className="text-cyan-400" />
          View Code
          <ChevronDown size={14} className={`ml-auto transition-transform ${open === 'code' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open === 'info' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-sm text-slate-300 leading-relaxed">{info.description}</p>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">How it works</h4>
            <ol className="space-y-1.5 text-sm text-slate-300">
              {info.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <ComplexityCell label="Best" value={info.complexity.best} tone="good" />
            <ComplexityCell label="Average" value={info.complexity.average} tone="warn" />
            <ComplexityCell label="Worst" value={info.complexity.worst} tone="bad" />
            <ComplexityCell label="Space" value={info.complexity.space} tone="neutral" />
          </div>
        </div>
      )}

      {open === 'code' && (
        <div className="animate-fade-in">
          <CodePanel code={info.code} />
        </div>
      )}
    </div>
  );
}

function ComplexityCell({ label, value, tone }: { label: string; value: string; tone: 'good' | 'warn' | 'bad' | 'neutral' }) {
  const tones = {
    good: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    warn: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    bad: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    neutral: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
  };
  return (
    <div className={`rounded-lg border p-2.5 ${tones[tone]}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="font-mono text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}
