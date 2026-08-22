import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNav } from '@/state/nav';
import { topicMeta, type TopicId } from '@/data/algorithms';

export function VisualizerPage({ topic, children }: { topic: TopicId; children: React.ReactNode }) {
  const { go } = useNav();
  const meta = topicMeta[topic];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => go({ name: 'dashboard' })} className="btn-ghost !p-2" aria-label="Back to dashboard">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{meta.title} Visualizer</h1>
            <p className="text-sm text-slate-400">{meta.description}</p>
          </div>
        </div>
        <span className={`chip ${
          meta.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' :
          meta.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
          'bg-rose-500/10 text-rose-300 border border-rose-500/30'
        }`}>
          {meta.difficulty}
        </span>
      </div>
      {children}
    </div>
  );
}
