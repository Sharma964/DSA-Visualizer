import { ArrowUpDown, Check, Minus, AlertTriangle } from 'lucide-react';
import { sortingAlgorithms, searchingAlgorithms, dataStructureInfo } from '@/data/algorithms';
import type { Complexity } from '@/data/algorithms';

function complexityTone(value: string): 'good' | 'warn' | 'bad' | 'neutral' {
  if (value.includes('1)')) return 'good';
  if (value.includes('log')) return 'good';
  if (value.includes('n²')) return 'bad';
  if (value.includes('n ')) return 'warn';
  return 'neutral';
}

const toneStyles = {
  good: 'text-emerald-400 bg-emerald-500/10',
  warn: 'text-amber-400 bg-amber-500/10',
  bad: 'text-rose-400 bg-rose-500/10',
  neutral: 'text-slate-300 bg-slate-700/30',
};

function Row({ name, c }: { name: string; c: Complexity }) {
  return (
    <tr className="border-t border-slate-800/60 hover:bg-slate-900/40 transition">
      <td className="py-3 px-4 font-semibold text-white">{name}</td>
      <Cell value={c.best} />
      <Cell value={c.average} />
      <Cell value={c.worst} />
      <Cell value={c.space} />
    </tr>
  );
}

function Cell({ value }: { value: string }) {
  const tone = complexityTone(value);
  return (
    <td className="py-3 px-4 text-center">
      <span className={`inline-block rounded-md px-2.5 py-1 font-mono text-xs font-semibold ${toneStyles[tone]}`}>{value}</span>
    </td>
  );
}

export function AlgorithmsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Algorithm Comparison</h1>
        <p className="text-slate-400">Compare time and space complexity across all algorithms in one place.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center gap-2">
          <ArrowUpDown size={18} className="text-emerald-400" />
          <h2 className="section-title">Sorting Algorithms</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 text-left font-semibold">Algorithm</th>
                <th className="py-3 px-4 font-semibold">Best Case</th>
                <th className="py-3 px-4 font-semibold">Average</th>
                <th className="py-3 px-4 font-semibold">Worst Case</th>
                <th className="py-3 px-4 font-semibold">Space</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(sortingAlgorithms).map((a) => (
                <Row key={a.name} name={a.name} c={a.complexity} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center gap-2">
          <ArrowUpDown size={18} className="text-cyan-400" />
          <h2 className="section-title">Searching Algorithms</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 text-left font-semibold">Algorithm</th>
                <th className="py-3 px-4 font-semibold">Best Case</th>
                <th className="py-3 px-4 font-semibold">Average</th>
                <th className="py-3 px-4 font-semibold">Worst Case</th>
                <th className="py-3 px-4 font-semibold">Space</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(searchingAlgorithms).map((a) => (
                <Row key={a.name} name={a.name} c={a.complexity} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center gap-2">
          <ArrowUpDown size={18} className="text-amber-400" />
          <h2 className="section-title">Data Structures</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 text-left font-semibold">Structure</th>
                <th className="py-3 px-4 font-semibold">Best</th>
                <th className="py-3 px-4 font-semibold">Average</th>
                <th className="py-3 px-4 font-semibold">Worst</th>
                <th className="py-3 px-4 font-semibold">Space</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(dataStructureInfo).map((a) => (
                <Row key={a.name} name={a.name} c={a.complexity} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Efficient (O(1), O(log n))</span>
          <span className="flex items-center gap-2"><Minus size={14} className="text-amber-400" /> Moderate (O(n))</span>
          <span className="flex items-center gap-2"><AlertTriangle size={14} className="text-rose-400" /> Expensive (O(n²))</span>
        </div>
      </div>
    </div>
  );
}
