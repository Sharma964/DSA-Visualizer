import { useMemo, useState } from 'react';
import { Dice5, Target } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { ArrayBars, type BarState } from '@/components/ArrayBars';
import { PlaybackControls, SpeedControl } from '@/components/PlaybackControls';
import { InfoPanel } from '@/components/InfoPanel';
import { usePlayback } from '@/hooks/usePlayback';
import { linearSearchSteps, binarySearchSteps, type SearchStep } from '@/lib/searching';
import { searchingAlgorithms } from '@/data/algorithms';

function randomSorted(n: number): number[] {
  const set = new Set<number>();
  while (set.size < n) set.add(Math.floor(Math.random() * 90) + 10);
  return [...set].sort((a, b) => a - b);
}

export function SearchingVisualizer({ topic }: { topic: 'searching' }) {
  const [algo, setAlgo] = useState<'linear' | 'binary'>('linear');
  const [size, setSize] = useState(8);
  const [speed, setSpeed] = useState(5);
  const [base, setBase] = useState(() => randomSorted(8));
  const [target, setTarget] = useState(50);

  const steps = useMemo<SearchStep[]>(() => {
    if (algo === 'linear') return linearSearchSteps(base, target);
    return binarySearchSteps(base, target);
  }, [algo, base, target]);
  const pb = usePlayback(steps, speed);
  const info = searchingAlgorithms[algo];

  const generate = () => {
    const arr = randomSorted(size);
    setBase(arr);
    setTarget(arr[Math.floor(Math.random() * arr.length)]);
  };
  const resize = (n: number) => {
    setSize(n);
    const arr = randomSorted(n);
    setBase(arr);
    setTarget(arr[Math.floor(Math.random() * arr.length)]);
  };

  const step = pb.current;
  const barStates: Record<number, BarState> = {};
  if (step) {
    if (step.range) {
      for (let i = 0; i < step.array.length; i++) {
        if (i < step.range[0] || i > step.range[1]) barStates[i] = 'eliminated';
      }
    }
    if (step.checking != null) barStates[step.checking] = 'active';
    if (step.found != null && step.found >= 0) barStates[step.found] = 'found';
  }

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {(['linear', 'binary'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlgo(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    algo === a ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {a === 'linear' ? 'Linear Search' : 'Binary Search'}
                </button>
              ))}
              {algo === 'binary' && (
                <span className="text-xs text-amber-300/80 ml-2">Array must be sorted — it is auto-sorted here.</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                Size
                <input type="range" min={5} max={15} value={size} onChange={(e) => resize(Number(e.target.value))} className="w-24 accent-emerald-500" />
                <span className="font-mono text-xs text-slate-400 w-6">{size}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <Target size={14} className="text-emerald-400" /> Target
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="input w-20"
                  min={1}
                  max={99}
                />
              </label>
              <SpeedControl value={speed} onChange={setSpeed} />
              <button onClick={generate} className="btn-ghost text-xs">
                <Dice5 size={14} /> Random
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

          <div className="glass-card p-6 min-h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">{info.name}</h3>
              <span className="text-xs font-mono text-slate-500">Step {pb.index + 1} / {pb.total}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ArrayBars array={step?.array ?? base} states={barStates} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-900/60 rounded-lg p-2">
                <div className="text-[10px] uppercase text-slate-500">Target</div>
                <div className="font-mono text-lg text-emerald-400">{target}</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2">
                <div className="text-[10px] uppercase text-slate-500">Current Index</div>
                <div className="font-mono text-lg text-cyan-400">{step?.checking ?? '—'}</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2">
                <div className="text-[10px] uppercase text-slate-500">Status</div>
                <div className="font-mono text-sm text-amber-300 truncate">
                  {step?.found === -1 ? 'Not found' : step?.found != null ? `Found at ${step.found}` : 'Searching...'}
                </div>
              </div>
            </div>
            <div className="mt-3 h-6 text-center">
              {step?.message && <span className="text-sm text-slate-300 font-mono">{step.message}</span>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={info} />
        </div>
      </div>
    </VisualizerPage>
  );
}
