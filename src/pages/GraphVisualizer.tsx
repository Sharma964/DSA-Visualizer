import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Play, Pause, SkipForward, RefreshCw, Share2, Route } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { InfoPanel } from '@/components/InfoPanel';
import { usePlayback } from '@/hooks/usePlayback';
import { graphAlgorithms, dataStructureInfo } from '@/data/algorithms';

type GraphNode = { id: number; x: number; y: number };
type GraphEdge = { from: number; to: number };

type GraphStep = {
  visited: number[];
  current: number | null;
  queue: number[];
  path: number[];
  message: string;
};

let nodeId = 0;

function bfsSteps(nodes: GraphNode[], edges: GraphEdge[], start: number, target?: number): GraphStep[] {
  const adj = new Map<number, number[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from)?.push(e.to);
    adj.get(e.to)?.push(e.from);
  });
  const visited = new Set<number>([start]);
  const queue = [start];
  const order: number[] = [];
  const steps: GraphStep[] = [{ visited: [start], current: start, queue: [start], path: [], message: `Start at node ${start}` }];

  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    const neighbors = (adj.get(node) || []).filter((n) => !visited.has(n)).sort((a, b) => a - b);
    for (const n of neighbors) {
      visited.add(n);
      queue.push(n);
      steps.push({ visited: [...visited], current: n, queue: [...queue], path: [], message: `Visit ${n} from ${node}` });
    }
    if (target && node === target) {
      steps.push({ visited: [...visited], current: node, queue: [...queue], path: [], message: `Reached target ${target}` });
      break;
    }
  }
  steps.push({ visited: [...visited], current: null, queue: [], path: [], message: 'BFS complete' });
  return steps;
}

function dfsSteps(nodes: GraphNode[], edges: GraphEdge[], start: number): GraphStep[] {
  const adj = new Map<number, number[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from)?.push(e.to);
    adj.get(e.to)?.push(e.from);
  });
  const visited = new Set<number>();
  const steps: GraphStep[] = [];
  const stack: number[] = [];
  const visit = (node: number) => {
    visited.add(node);
    stack.push(node);
    steps.push({ visited: [...visited], current: node, queue: [...stack], path: [], message: `Visit ${node}` });
    const neighbors = (adj.get(node) || []).filter((n) => !visited.has(n)).sort((a, b) => a - b);
    for (const n of neighbors) visit(n);
    stack.pop();
    steps.push({ visited: [...visited], current: node, queue: [...stack], path: [], message: `Backtrack from ${node}` });
  };
  visit(start);
  steps.push({ visited: [...visited], current: null, queue: [], path: [], message: 'DFS complete' });
  return steps;
}

function shortestPathSteps(nodes: GraphNode[], edges: GraphEdge[], start: number, target: number): GraphStep[] {
  const adj = new Map<number, number[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from)?.push(e.to);
    adj.get(e.to)?.push(e.from);
  });
  const visited = new Set<number>([start]);
  const parent = new Map<number, number>();
  const queue = [start];
  const steps: GraphStep[] = [{ visited: [start], current: start, queue: [start], path: [], message: `Start at ${start}, target ${target}` }];

  let found = false;
  while (queue.length) {
    const node = queue.shift()!;
    if (node === target) { found = true; break; }
    const neighbors = (adj.get(node) || []).filter((n) => !visited.has(n)).sort((a, b) => a - b);
    for (const n of neighbors) {
      visited.add(n);
      parent.set(n, node);
      queue.push(n);
      steps.push({ visited: [...visited], current: n, queue: [...queue], path: [], message: `Visit ${n} from ${node}` });
    }
  }

  const path: number[] = [];
  if (found) {
    let cur: number | undefined = target;
    while (cur !== undefined) { path.unshift(cur); cur = parent.get(cur); }
    steps.push({ visited: [...visited], current: target, queue: [], path, message: `Shortest path: ${path.join(' → ')}` });
  } else {
    steps.push({ visited: [...visited], current: null, queue: [], path: [], message: `No path from ${start} to ${target}` });
  }
  return steps;
}

export function GraphVisualizer({ topic }: { topic: 'graphs' }) {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 0, x: 150, y: 80 },
    { id: 1, x: 300, y: 160 },
    { id: 2, x: 80, y: 220 },
    { id: 3, x: 260, y: 300 },
    { id: 4, x: 420, y: 280 },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 2, to: 3 }, { from: 3, to: 4 },
  ]);
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [startNode, setStartNode] = useState('0');
  const [targetNode, setTargetNode] = useState('4');
  const [algo, setAlgo] = useState<'bfs' | 'dfs' | 'shortest'>('bfs');
  const [speed, setSpeed] = useState(5);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Build a graph, then run BFS, DFS, or shortest path.');

  const steps = useMemo<GraphStep[]>(() => {
    const s = Number(startNode);
    const t = Number(targetNode);
    if (!nodes.length || isNaN(s)) return [];
    if (algo === 'bfs') return bfsSteps(nodes, edges, s, algo === 'bfs' ? t : undefined);
    if (algo === 'dfs') return dfsSteps(nodes, edges, s);
    return shortestPathSteps(nodes, edges, s, t);
  }, [nodes, edges, algo, startNode, targetNode]);
  const pb = usePlayback(steps, speed);

  const addNode = () => {
    const id = nodeId++;
    setNodes((n) => [...n, { id, x: 60 + Math.random() * 380, y: 60 + Math.random() * 260 }]);
    setStatus(`Added node ${id}`);
  };
  const removeNode = () => {
    if (!nodes.length) return;
    const last = nodes[nodes.length - 1];
    setNodes((n) => n.filter((x) => x.id !== last.id));
    setEdges((e) => e.filter((ed) => ed.from !== last.id && ed.to !== last.id));
    setStatus(`Removed node ${last.id}`);
  };
  const addEdge = () => {
    const f = Number(edgeFrom), t = Number(edgeTo);
    if (isNaN(f) || isNaN(t)) return setStatus('Enter valid node IDs for the edge.');
    if (!nodes.find((n) => n.id === f) || !nodes.find((n) => n.id === t)) return setStatus('Both node IDs must exist.');
    if (f === t) return setStatus('Cannot connect a node to itself.');
    setEdges((e) => [...e, { from: f, to: t }]);
    setStatus(`Added edge ${f} — ${t}`);
    setEdgeFrom(''); setEdgeTo('');
  };
  const removeEdge = () => {
    const f = Number(edgeFrom), t = Number(edgeTo);
    if (isNaN(f) || isNaN(t)) return setStatus('Enter valid node IDs.');
    setEdges((e) => e.filter((ed) => !((ed.from === f && ed.to === t) || (ed.from === t && ed.to === f))));
    setStatus(`Removed edge ${f} — ${t}`);
    setEdgeFrom(''); setEdgeTo('');
  };
  const clearGraph = () => {
    setNodes([]); setEdges([]); setStatus('Graph cleared.');
  };

  const step = pb.current;
  const visitedSet = new Set(step?.visited ?? []);
  const pathSet = new Set(step?.path ?? []);

  const edgeColor = (e: GraphEdge) => {
    if (pathSet.has(e.from) && pathSet.has(e.to)) return '#10b981';
    if (visitedSet.has(e.from) && visitedSet.has(e.to)) return '#06b6d4';
    return '#334155';
  };

  const info = graphAlgorithms[algo];

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <button onClick={addNode} className="btn-primary text-xs"><Plus size={14} /> Add Node</button>
              <button onClick={removeNode} className="btn-ghost text-xs"><Trash2 size={14} /> Remove Last Node</button>
              <button onClick={clearGraph} className="btn-danger text-xs"><RefreshCw size={14} /> Clear Graph</button>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <label className="flex flex-col gap-1 text-xs text-slate-400">From<input type="number" value={edgeFrom} onChange={(e) => setEdgeFrom(e.target.value)} className="input w-20" /></label>
              <label className="flex flex-col gap-1 text-xs text-slate-400">To<input type="number" value={edgeTo} onChange={(e) => setEdgeTo(e.target.value)} className="input w-20" /></label>
              <button onClick={addEdge} className="btn-ghost text-xs"><Plus size={14} /> Add Edge</button>
              <button onClick={removeEdge} className="btn-ghost text-xs"><Trash2 size={14} /> Remove Edge</button>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {(['bfs', 'dfs', 'shortest'] as const).map((a) => (
                  <button key={a} onClick={() => setAlgo(a)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${algo === a ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                    {a === 'bfs' ? 'BFS' : a === 'dfs' ? 'DFS' : 'Shortest Path'}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <label className="flex flex-col gap-1 text-xs text-slate-400">Start<input type="number" value={startNode} onChange={(e) => setStartNode(e.target.value)} className="input w-20" /></label>
                {(algo === 'bfs' || algo === 'shortest') && (
                  <label className="flex flex-col gap-1 text-xs text-slate-400">Target<input type="number" value={targetNode} onChange={(e) => setTargetNode(e.target.value)} className="input w-20" /></label>
                )}
                {pb.running ? (
                  <button onClick={pb.pause} className="btn-primary text-xs"><Pause size={14} /> Pause</button>
                ) : (
                  <button onClick={pb.start} disabled={!nodes.length} className="btn-primary text-xs"><Play size={14} /> Start</button>
                )}
                <button onClick={pb.step} disabled={pb.running} className="btn-ghost text-xs"><SkipForward size={14} /> Step</button>
                <button onClick={pb.reset} className="btn-ghost text-xs"><RefreshCw size={14} /> Reset</button>
                <input type="range" min={1} max={10} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-24 accent-emerald-500" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">{info.name}</h3>
              {steps.length > 0 && <span className="text-xs font-mono text-slate-500">Step {pb.index + 1} / {pb.total}</span>}
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto">
              {!nodes.length ? (
                <div className="text-slate-600 text-sm">No nodes yet. Add nodes to build a graph.</div>
              ) : (
                <svg width={480} height={360} className="max-w-full">
                  {edges.map((e, i) => {
                    const a = nodes.find((n) => n.id === e.from);
                    const b = nodes.find((n) => n.id === e.to);
                    if (!a || !b) return null;
                    return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={edgeColor(e)} strokeWidth={3} className="transition-colors duration-300" />;
                  })}
                  {nodes.map((n) => {
                    const isCurrent = step?.current === n.id;
                    const isVisited = visitedSet.has(n.id);
                    const isPath = pathSet.has(n.id);
                    return (
                      <motion.g key={n.id} animate={{ scale: isCurrent ? 1.2 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                        <circle
                          cx={n.x} cy={n.y} r={22}
                          className={isCurrent ? 'fill-cyan-400 stroke-cyan-300' : isPath ? 'fill-emerald-500 stroke-emerald-400' : isVisited ? 'fill-emerald-500/60 stroke-emerald-400/60' : 'fill-slate-800 stroke-slate-600'}
                          strokeWidth={2}
                        />
                        <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-white font-mono text-sm font-bold">{n.id}</text>
                      </motion.g>
                    );
                  })}
                </svg>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-sm text-slate-300 font-mono mb-2">{step?.message ?? status}</div>
              {step && step.queue.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-500">{algo === 'dfs' ? 'Stack' : 'Queue'}:</span>
                  {step.queue.map((q, i) => (
                    <span key={i} className="chip bg-cyan-500/10 text-cyan-300 font-mono">{q}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={info} />
          <InfoPanel info={dataStructureInfo.graph} />
        </div>
      </div>
    </VisualizerPage>
  );
}
