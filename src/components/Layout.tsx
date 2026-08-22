import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Brackets as ArrayIcon, Search, ArrowUpDown,
  Link2, Layers, ListOrdered, TreePine, Share2,
  Menu, X, Code2, Info, Home, ChevronRight,
} from 'lucide-react';
import { useNav, type Route } from '@/state/nav';
import { allTopics, topicMeta, type TopicId } from '@/data/algorithms';

const navItems: { id: TopicId; label: string; icon: typeof ArrayIcon }[] = [
  { id: 'arrays', label: 'Arrays', icon: ArrayIcon },
  { id: 'searching', label: 'Searching', icon: Search },
  { id: 'sorting', label: 'Sorting', icon: ArrowUpDown },
  { id: 'linked-list', label: 'Linked List', icon: Link2 },
  { id: 'stack', label: 'Stack', icon: Layers },
  { id: 'queue', label: 'Queue', icon: ListOrdered },
  { id: 'trees', label: 'Trees', icon: TreePine },
  { id: 'graphs', label: 'Graphs', icon: Share2 },
];

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { route, go } = useNav();

  const goTopic = (id: TopicId) => {
    go({ name: 'visualizer', topic: id });
    onClose();
  };

  const isActive = (id: TopicId) => route.name === 'visualizer' && route.topic === id;

  return (
    <>
      {/* mobile backdrop */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 glass border-r border-slate-800 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-slate-800">
          <button onClick={() => { go({ name: 'dashboard' }); onClose(); }} className="flex items-center gap-2.5 w-full">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Code2 size={20} className="text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-sm leading-tight">DSA Visualizer</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Interactive Learning</div>
            </div>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <button
            onClick={() => { go({ name: 'dashboard' }); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              route.name === 'dashboard' ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Visualizers</div>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => goTopic(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition group ${
                isActive(id) ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive(id) ? 'text-emerald-400' : ''} />
              {label}
              {isActive(id) && <ChevronRight size={14} className="ml-auto text-emerald-400" />}
            </button>
          ))}

          <div className="pt-3 pb-1 px-3 text-[10px] uppercase tracking-wider text-slate-600 font-semibold">More</div>
          <button
            onClick={() => { go({ name: 'algorithms' }); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              route.name === 'algorithms' ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <ArrowUpDown size={18} /> Algorithm Comparison
          </button>
          <button
            onClick={() => { go({ name: 'about' }); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              route.name === 'about' ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <Info size={18} /> About
          </button>
        </nav>

      </aside>
    </>
  );
}

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { route, go } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 glass border-b border-slate-800">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden btn-ghost !p-2">
            <Menu size={18} />
          </button>
          <button onClick={() => go({ name: 'dashboard' })} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Code2 size={18} className="text-emerald-400" />
            </div>
            <span className="font-bold text-white hidden sm:block">DSA Visualizer</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <HeaderLink active={route.name === 'dashboard'} onClick={() => go({ name: 'dashboard' })} icon={<Home size={14} />}>Home</HeaderLink>
          <HeaderLink active={route.name === 'visualizer'} onClick={() => go({ name: 'visualizer', topic: 'sorting' })} icon={<Code2 size={14} />}>Visualizer</HeaderLink>
          <HeaderLink active={route.name === 'algorithms'} onClick={() => go({ name: 'algorithms' })} icon={<ArrowUpDown size={14} />}>Algorithms</HeaderLink>
          <HeaderLink active={route.name === 'about'} onClick={() => go({ name: 'about' })} icon={<Info size={14} />}>About</HeaderLink>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden btn-ghost !p-2">
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 p-3 space-y-1">
          <button onClick={() => { go({ name: 'dashboard' }); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Home</button>
          <button onClick={() => { go({ name: 'visualizer', topic: 'sorting' }); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Visualizer</button>
          <button onClick={() => { go({ name: 'algorithms' }); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Algorithms</button>
          <button onClick={() => { go({ name: 'about' }); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">About</button>
        </div>
      )}
    </header>
  );
}

function HeaderLink({ children, active, onClick, icon }: { children: ReactNode; active: boolean; onClick: () => void; icon: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
        active ? 'text-emerald-300 bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}
    >
      {icon} {children}
    </button>
  );
}


