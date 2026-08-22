import {
  Brackets as ArrayIcon, Search, ArrowUpDown, Link2, Layers,
  ListOrdered, TreePine, Share2, ChevronRight, Sparkles, TrendingUp,
  CheckCircle2, Circle, ArrowRight,
} from 'lucide-react';
import { useNav } from '@/state/nav';
import { useProgress } from '@/state/progress';
import { allTopics, topicMeta, type TopicId } from '@/data/algorithms';

const cards: { id: TopicId; icon: typeof ArrayIcon; color: string }[] = [
  { id: 'arrays', icon: ArrayIcon, color: 'emerald' },
  { id: 'searching', icon: Search, color: 'cyan' },
  { id: 'sorting', icon: ArrowUpDown, color: 'amber' },
  { id: 'linked-list', icon: Link2, color: 'violet' },
  { id: 'stack', icon: Layers, color: 'sky' },
  { id: 'queue', icon: ListOrdered, color: 'rose' },
  { id: 'trees', icon: TreePine, color: 'lime' },
  { id: 'graphs', icon: Share2, color: 'orange' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'group-hover:shadow-emerald-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'group-hover:shadow-cyan-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'group-hover:shadow-amber-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', glow: 'group-hover:shadow-violet-500/20' },
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30', glow: 'group-hover:shadow-sky-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'group-hover:shadow-rose-500/20' },
  lime: { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30', glow: 'group-hover:shadow-lime-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'group-hover:shadow-orange-500/20' },
};

export function Dashboard() {
  const { go } = useNav();
  const { completed, count, total } = useProgress();
  const pct = Math.round((count / total) * 100);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden glass-card p-8 lg:p-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <span className="chip bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-4">
            <Sparkles size={13} /> Interactive DSA Learning Platform
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            DSA <span className="text-gradient">Visualizer</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Learn Data Structures & Algorithms Through Interactive Visualization
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => go({ name: 'visualizer', topic: 'sorting' })} className="btn-primary">
              Start Learning <ArrowRight size={16} />
            </button>
            <button onClick={() => go({ name: 'algorithms' })} className="btn-ghost">
              <TrendingUp size={16} /> Compare Algorithms
            </button>
          </div>
        </div>
      </section>

      {/* Progress journey */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Your DSA Journey</h2>
          <span className="text-sm text-slate-400 font-mono">{count} / {total} Topics Completed</span>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level, i) => (
              <div key={level} className="flex-1 flex flex-col items-center text-center relative">
                {i < 2 && <div className="absolute top-5 left-1/2 w-full h-0.5 bg-slate-800" />}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative z-10 ${
                  pct > i * 33 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}>
                  {pct > i * 33 ? <CheckCircle2 size={18} /> : i + 1}
                </div>
                <span className="mt-2 text-xs text-slate-400 font-medium">{level}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Overall progress</span>
              <span className="font-mono text-emerald-400">{pct}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Topic cards */}
      <section>
        <h2 className="section-title mb-4">Explore Data Structures & Algorithms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map(({ id, icon: Icon, color }) => {
            const meta = topicMeta[id];
            const c = colorMap[color];
            const isDone = completed[id];
            return (
              <button
                key={id}
                onClick={() => go({ name: 'visualizer', topic: id })}
                className={`group glass-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${c.glow} relative overflow-hidden`}
              >
                {isDone && (
                  <span className="absolute top-3 right-3 text-emerald-400" title="Completed">
                    <CheckCircle2 size={16} />
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-4`}>
                  <Icon size={24} className={c.text} />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{meta.title}</h3>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed line-clamp-2">{meta.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`chip ${
                    meta.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-300' :
                    meta.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-300' :
                    'bg-rose-500/10 text-rose-300'
                  }`}>
                    {meta.difficulty}
                  </span>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${c.text} group-hover:gap-2 transition-all`}>
                    Explore <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Progress checklist */}
      <section>
        <h2 className="section-title mb-4">Track Your Progress</h2>
        <div className="glass-card p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allTopics.map((id) => (
              <ProgressToggle key={id} id={id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgressToggle({ id }: { id: TopicId }) {
  const { completed, toggle } = useProgress();
  const done = completed[id];
  return (
    <button
      onClick={() => toggle(id)}
      className={`flex items-center gap-2.5 p-3 rounded-lg border transition text-left ${
        done ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
      }`}
    >
      {done ? <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" /> : <Circle size={18} className="text-slate-600 flex-shrink-0" />}
      <span className={`text-sm font-medium ${done ? 'text-emerald-300' : 'text-slate-400'}`}>{topicMeta[id].title}</span>
    </button>
  );
}
