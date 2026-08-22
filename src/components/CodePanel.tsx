import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ text, label = 'Copy Code' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for environments without clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handle} className="btn-ghost text-xs">
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

export function CodePanel({ code }: { code: string }) {
  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton text={code} />
      </div>
      <pre className="font-mono text-xs leading-relaxed bg-slate-950/80 border border-slate-800 rounded-xl p-4 pt-12 overflow-x-auto text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
