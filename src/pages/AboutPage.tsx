import { Code2, GraduationCap, Briefcase, Users, Sparkles, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <Code2 size={32} className="text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">About DSA Visualizer</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          DSA Visualizer is an educational platform designed to help students understand Data Structures and Algorithms through interactive visualizations.
        </p>
      </div>

      <div className="glass-card p-8">
        <h2 className="section-title mb-4">Who is this for?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card icon={<GraduationCap size={24} />} title="CS Students" desc="Strengthen your understanding of core data structures and algorithms taught in coursework." />
          <Card icon={<Users size={24} />} title="DSA Beginners" desc="Visual, step-by-step explanations make abstract concepts concrete and approachable." />
          <Card icon={<Briefcase size={24} />} title="Interview Prep" desc="Practice and internalize the algorithms most commonly asked in coding interviews." />
        </div>
      </div>

      <div className="glass-card p-8">
        <h2 className="section-title mb-4">What you can do</h2>
        <div className="space-y-3">
          {[
            'Visualize 5 sorting algorithms with comparison, swap, and sorted-state animations',
            'Run linear and binary search with live step-by-step comparisons',
            'Build and manipulate linked lists, stacks, and queues interactively',
            'Construct a binary search tree and run all four traversals',
            'Draw graphs and animate BFS, DFS, and shortest path',
            'View the actual code for every algorithm and copy it with one click',
            'Track your learning progress across all 8 topics',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-slate-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <span className="text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <Target size={20} className="text-emerald-400 mb-3" />
          <h3 className="font-bold text-white mb-1">Our Mission</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Make DSA intuitive. Every algorithm runs step-by-step so you can see exactly how it works, not just read about it.</p>
        </div>
        <div className="glass-card p-6">
          <Sparkles size={20} className="text-cyan-400 mb-3" />
          <h3 className="font-bold text-white mb-1">Built With</h3>
          <p className="text-sm text-slate-400 leading-relaxed">React, Vite, Tailwind CSS, and Framer Motion. No backend required — everything runs in your browser.</p>
        </div>
      </div>

      <div className="glass-card p-8 text-center">
        <h3 className="font-bold text-white mb-4">Connect</h3>
        <p className="text-sm text-slate-400">Replace these links with your own when ready to share.</p>
      </div>
    </div>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-800">
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
