import { Pause, Play, RotateCcw, SkipForward, StepBack } from 'lucide-react';

type Props = {
  running: boolean;
  canStep: boolean;
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
};

export function PlaybackControls({ running, canStep, onStart, onPause, onStep, onReset }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {running ? (
        <button onClick={onPause} className="btn-primary">
          <Pause size={16} /> Pause
        </button>
      ) : (
        <button onClick={onStart} disabled={!canStep} className="btn-primary">
          <Play size={16} /> Start
        </button>
      )}
      <button onClick={onStep} disabled={running || !canStep} className="btn-ghost">
        <SkipForward size={16} /> Step
      </button>
      <button onClick={onReset} className="btn-ghost">
        <RotateCcw size={16} /> Reset
      </button>
    </div>
  );
}

export function SpeedControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  // value is 1..10, higher = faster. Convert to delay.
  return (
    <div className="flex items-center gap-3">
      <StepBack size={14} className="text-slate-500" />
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 accent-emerald-500"
        aria-label="Animation speed"
      />
      <span className="text-xs text-slate-400 font-mono w-8">{value}x</span>
    </div>
  );
}
