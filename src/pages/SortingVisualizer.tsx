import { useMemo, useState } from 'react';
import { Dice5, Shuffle } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { ArrayBars, type BarState } from '@/components/ArrayBars';
import { PlaybackControls, SpeedControl } from '@/components/PlaybackControls';
import { InfoPanel } from '@/components/InfoPanel';
import { usePlayback } from '@/hooks/usePlayback';
import { sortGenerators, type SortStep } from '@/lib/sorting';
import { sortingAlgorithms } from '@/data/algorithms';

const algoOptions = [
  { id: 'bubble', label: 'Bubble Sort' },
  { id: 'selection', label: 'Selection Sort' },
  { id: 'insertion', label: 'Insertion Sort' },
  { id: 'merge', label: 'Merge Sort' },
  { id: 'quick', label: 'Quick Sort' },
];

function randomArray(n: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

export function SortingVisualizer({ topic }: { topic: 'sorting' | 'arrays' }) {
  const [algo, setAlgo] = useState('bubble');
  const [size, setSize] = useState(8);
  const [speed, setSpeed] = useState(5);
  const [base, setBase] = useState(() => randomArray(8));

  const steps = useMemo<SortStep[]>(() => sortGenerators[algo](base), [algo, base]);
  const pb = usePlayback(steps, speed);
  const info = sortingAlgorithms[algo];

  const generate = () => {
    setBase(randomArray(size));
  };
  const resize = (n: number) => {
    setSize(n);
    setBase(randomArray(n));
  };

  const step = pb.current;
  const barStates: Record<number, BarState> = {};
  if (step) {
    step.sorted.forEach((i) => (barStates[i] = 'sorted'));
    if (step.pivot != null) barStates[step.pivot] = 'pivot';
    if (step.compare) {
      barStates[step.compare[0]] = 'compare';
      barStates[step.compare[1]] = 'compare';
    }
    if (step.swap) {
      barStates[step.swap[0]] = 'swap';
      barStates[step.swap[1]] = 'swap';
    }
  }

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Controls */}
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {algoOptions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAlgo(a.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    algo === a.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                Size
                <input type="range" min={5} max={15} value={size} onChange={(e) => resize(Number(e.target.value))} className="w-24 accent-emerald-500" />
                <span className="font-mono text-xs text-slate-400 w-6">{size}</span>
              </label>
              <SpeedControl value={speed} onChange={setSpeed} />
              <button onClick={generate} className="btn-ghost text-xs">
                <Dice5 size={14} /> Random
              </button>
              <button onClick={() => setBase([...base].sort((a, b) => a - b))} className="btn-ghost text-xs">
                <Shuffle size={14} /> Sort (sorted input)
              </button>
            </div>

            <PlaybackControls
              running={pb.running}
              canStep={pb.index < pb.total - 1}
              onStart={pb.start}
              onPause={pb.pause}
              onStep={pb.step}
              onReset={pb.reset}
            />
          </div>

          {/* Visualization */}
          <div className="glass-card p-6 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">{info.name}</h3>
              <span className="text-xs font-mono text-slate-500">Step {pb.index + 1} / {pb.total}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ArrayBars array={step?.array ?? base} states={barStates} />
            </div>
            <div className="mt-4 h-8 flex items-center justify-center">
              {step?.message && <span className="text-sm text-slate-300 font-mono">{step.message}</span>}
            </div>
            <Legend />
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={info} />
        </div>
      </div>
    </VisualizerPage>
  );
}

function Legend() {
  const items: { label: string; cls: string }[] = [
    { label: 'Unsorted', cls: 'bg-slate-700' },
    { label: 'Comparing', cls: 'bg-amber-400' },
    { label: 'Swapping', cls: 'bg-rose-400' },
    { label: 'Sorted', cls: 'bg-emerald-500' },
    { label: 'Pivot', cls: 'bg-violet-400' },
  ];
  return (
    <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-800">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className={`w-3 h-3 rounded-sm ${it.cls}`} /> {it.label}
        </span>
      ))}
    </div>
  );
}
