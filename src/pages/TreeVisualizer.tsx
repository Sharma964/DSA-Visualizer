import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, RefreshCw, Play, Pause, SkipForward } from 'lucide-react';
import { VisualizerPage } from '@/components/VisualizerPage';
import { InfoPanel } from '@/components/InfoPanel';
import { usePlayback } from '@/hooks/usePlayback';
import { dataStructureInfo, traversalInfo } from '@/data/algorithms';
import {
  insertBST, deleteBST, layoutTree, type TreeNode, type PositionedNode,
  inorderSteps, preorderSteps, postorderSteps, levelOrderSteps, type TraversalStep,
} from '@/lib/tree';

type Traversal = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

const traversalOptions: { id: Traversal; label: string }[] = [
  { id: 'inorder', label: 'Inorder' },
  { id: 'preorder', label: 'Preorder' },
  { id: 'postorder', label: 'Postorder' },
  { id: 'levelorder', label: 'Level Order' },
];

export function TreeVisualizer({ topic }: { topic: 'trees' }) {
  const [root, setRoot] = useState<TreeNode | null>(() => {
    let r: TreeNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => (r = insertBST(r, v)));
    return r;
  });
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('Ready. Insert, delete, or search a value.');
  const [traversal, setTraversal] = useState<Traversal>('inorder');
  const [speed, setSpeed] = useState(5);
  const [traversalActive, setTraversalActive] = useState(false);

  const steps = useMemo<TraversalStep[]>(() => {
    if (traversal === 'inorder') return inorderSteps(root);
    if (traversal === 'preorder') return preorderSteps(root);
    if (traversal === 'postorder') return postorderSteps(root);
    return levelOrderSteps(root);
  }, [root, traversal]);
  const pb = usePlayback(steps, speed);

  const { positioned, width, height } = layoutTree(root, 64, 72);
  const PAD = 40;

  const insert = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number.');
    setRoot((r) => insertBST(r, v));
    setStatus(`Inserted ${v}`);
    setValue('');
  };
  const del = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number.');
    setRoot((r) => deleteBST(r, v));
    setStatus(`Deleted ${v}`);
    setValue('');
  };
  const search = () => {
    const v = Number(value);
    if (!value || isNaN(v)) return setStatus('Enter a valid number.');
    let cur = root;
    const path: number[] = [];
    while (cur) {
      path.push(cur.value);
      if (v === cur.value) break;
      cur = v < cur.value ? cur.left : cur.right;
    }
    if (path.length && path[path.length - 1] === v) setStatus(`Found ${v}. Path: ${path.join(' → ')}`);
    else setStatus(`${v} not found in the tree`);
    setValue('');
  };
  const reset = () => {
    let r: TreeNode | null = null;
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => (r = insertBST(r, v)));
    setRoot(r);
    setTraversalActive(false);
    pb.reset();
    setStatus('Tree reset to default');
  };

  const startTraversal = () => {
    if (!root) { setStatus('Tree is empty.'); return; }
    setTraversalActive(true);
    pb.start();
  };

  const currentStep = pb.current;
  const visitedSet = new Set(currentStep?.visited ?? []);
  const currentValue = currentStep?.current ?? null;

  const renderNodes = (pn: PositionedNode | null, acc: { nodes: JSX.Element[]; edges: JSX.Element[] }) => {
    if (!pn) return;
    const cx = pn.x + PAD + 24;
    const cy = pn.y + PAD + 24;
    // edges first
    [pn.left, pn.right].forEach((child) => {
      if (child) {
        const x2 = child.x + PAD + 24;
        const y2 = child.y + PAD + 24;
        acc.edges.push(
          <line key={`e-${pn.node.value}-${child.node.value}`} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#334155" strokeWidth={2} />
        );
      }
    });
    const isCurrent = currentValue === pn.node.value;
    const isVisited = visitedSet.has(pn.node.value);
    acc.nodes.push(
      <motion.g
        key={pn.node.value}
        initial={false}
        animate={{ scale: isCurrent ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={22}
          className={isCurrent ? 'fill-cyan-400 stroke-cyan-300' : isVisited ? 'fill-emerald-500 stroke-emerald-400' : 'fill-slate-800 stroke-slate-600'}
          strokeWidth={2}
        />
        <text x={cx} y={cy + 5} textAnchor="middle" className="fill-white font-mono text-sm font-bold">
          {pn.node.value}
        </text>
      </motion.g>
    );
    renderNodes(pn.left, acc);
    renderNodes(pn.right, acc);
  };

  const acc: { nodes: JSX.Element[]; edges: JSX.Element[] } = { nodes: [], edges: [] };
  renderNodes(positioned, acc);

  const activeTraversalInfo = traversalInfo[traversal];

  return (
    <VisualizerPage topic={topic}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-xs text-slate-400">
                Value
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="input w-28" placeholder="e.g. 45" />
              </label>
              <button onClick={insert} className="btn-primary text-xs"><Plus size={14} /> Insert</button>
              <button onClick={del} className="btn-danger text-xs"><Trash2 size={14} /> Delete</button>
              <button onClick={search} className="btn-ghost text-xs"><Search size={14} /> Search</button>
              <button onClick={reset} className="btn-ghost text-xs"><RefreshCw size={14} /> Reset</button>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Traversal</div>
              <div className="flex flex-wrap gap-2">
                {traversalOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTraversal(t.id); setTraversalActive(false); pb.reset(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      traversal === t.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {pb.running ? (
                  <button onClick={pb.pause} className="btn-primary text-xs"><Pause size={14} /> Pause</button>
                ) : (
                  <button onClick={startTraversal} className="btn-primary text-xs"><Play size={14} /> Start Traversal</button>
                )}
                <button onClick={pb.step} disabled={pb.running || !traversalActive} className="btn-ghost text-xs"><SkipForward size={14} /> Step</button>
                <button onClick={() => { setTraversalActive(false); pb.reset(); }} className="btn-ghost text-xs"><RefreshCw size={14} /> Reset Traversal</button>
                <input type="range" min={1} max={10} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-24 accent-emerald-500" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 min-h-[420px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">{activeTraversalInfo.name}</h3>
              {traversalActive && <span className="text-xs font-mono text-slate-500">Step {pb.index + 1} / {pb.total}</span>}
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto">
              {!root ? (
                <div className="text-slate-600 text-sm">Tree is empty. Insert values to build it.</div>
              ) : (
                <svg width={Math.max(width + PAD * 2, 200)} height={Math.max(height + PAD * 2, 120)} className="max-w-full">
                  {acc.edges}
                  {acc.nodes}
                </svg>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-sm text-slate-300 font-mono mb-2">{currentStep?.message ?? status}</div>
              {traversalActive && currentStep && currentStep.visited.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-500">Visited:</span>
                  {currentStep.visited.map((v) => (
                    <span key={v} className="chip bg-emerald-500/10 text-emerald-300 font-mono">{v}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <InfoPanel info={dataStructureInfo.tree} />
          {traversalActive && <InfoPanel info={activeTraversalInfo} />}
        </div>
      </div>
    </VisualizerPage>
  );
}
