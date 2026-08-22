import { useState } from 'react';
import { Sidebar, Header } from '@/components/Layout';
import { Footer } from '@/components/Footer';
import { NavProvider, useNav } from '@/state/nav';
import { ProgressProvider } from '@/state/progress';
import { Dashboard } from '@/pages/Dashboard';
import { SortingVisualizer } from '@/pages/SortingVisualizer';
import { SearchingVisualizer } from '@/pages/SearchingVisualizer';
import { LinkedListVisualizer } from '@/pages/LinkedListVisualizer';
import { StackVisualizer } from '@/pages/StackVisualizer';
import { QueueVisualizer } from '@/pages/QueueVisualizer';
import { TreeVisualizer } from '@/pages/TreeVisualizer';
import { GraphVisualizer } from '@/pages/GraphVisualizer';
import { AlgorithmsPage } from '@/pages/AlgorithmsPage';
import { AboutPage } from '@/pages/AboutPage';

function Router() {
  const { route } = useNav();
  if (route.name === 'dashboard') return <Dashboard />;
  if (route.name === 'algorithms') return <AlgorithmsPage />;
  if (route.name === 'about') return <AboutPage />;
  // visualizer
  switch (route.topic) {
    case 'arrays':
    case 'sorting':
      return <SortingVisualizer topic={route.topic} />;
    case 'searching':
      return <SearchingVisualizer topic="searching" />;
    case 'linked-list':
      return <LinkedListVisualizer topic="linked-list" />;
    case 'stack':
      return <StackVisualizer topic="stack" />;
    case 'queue':
      return <QueueVisualizer topic="queue" />;
    case 'trees':
      return <TreeVisualizer topic="trees" />;
    case 'graphs':
      return <GraphVisualizer topic="graphs" />;
    default:
      return <Dashboard />;
  }
}

function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto w-full">
          <Router />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavProvider>
      <ProgressProvider>
        <Shell />
      </ProgressProvider>
    </NavProvider>
  );
}
