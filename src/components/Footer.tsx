import { Code2 } from 'lucide-react';
import { useNav } from '@/state/nav';

export function Footer() {
  const { go } = useNav();
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Code2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white">DSA Visualizer</div>
              <div className="text-xs text-slate-500">Learn. Visualize. Master.</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <button onClick={() => go({ name: 'dashboard' })} className="hover:text-emerald-300 transition">Home</button>
            <button onClick={() => go({ name: 'algorithms' })} className="hover:text-emerald-300 transition">Algorithms</button>
            <button onClick={() => go({ name: 'about' })} className="hover:text-emerald-300 transition">About</button>
          </div>

        </div>
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-600">
          Built for students learning Data Structures & Algorithms. © {new Date().getFullYear()} DSA Visualizer.
        </div>
      </div>
    </footer>
  );
}
