import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Package, Bell, CheckCircle, XCircle, Hexagon } from 'lucide-react';
import { products } from '../../data/mockData';

export default function RecallManagement() {
  const [recallQueue, setRecallQueue] = useState<string[]>([]);
  const recalledProducts = products.filter(p => p.status === 'recalled');
  const flaggedProducts = products.filter(p => p.status === 'flagged');

  const handleRecall = (id: string) => {
    setRecallQueue(prev => [...prev, id]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recall Management</h1>
        <p className="text-gray-500 text-sm mt-0.5">Enterprise recall system — instant product withdrawal from supply chain</p>
      </div>

      {/* Recall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel p-5 border-accent-red/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-accent-red/10"><ShieldAlert size={18} className="text-accent-red" /></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Active Recalls</span>
          </div>
          <p className="text-3xl font-bold">{recalledProducts.length}</p>
        </div>
        <div className="glass-panel p-5 border-accent-amber/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-accent-amber/10"><AlertTriangle size={18} className="text-accent-amber" /></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Flagged Products</span>
          </div>
          <p className="text-3xl font-bold">{flaggedProducts.length}</p>
        </div>
        <div className="glass-panel p-5 border-accent-green/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-accent-green/10"><CheckCircle size={18} className="text-accent-green" /></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Safe Products</span>
          </div>
          <p className="text-3xl font-bold">{products.length - recalledProducts.length - flaggedProducts.length}</p>
        </div>
      </div>

      {/* Active Recalls */}
      {recalledProducts.length > 0 && (
        <div className="glass-panel p-5 border-accent-red/20 glow-red">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            Active Recalls
          </h3>
          <div className="space-y-3">
            {recalledProducts.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-accent-red/[0.04] border border-accent-red/10">
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-accent-red" />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-[11px] text-gray-500">{p.batch_id} • Recalled on {p.created_date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-accent-red bg-accent-red/10 px-2 py-0.5 rounded animate-pulse">RECALLED</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <Hexagon size={10} /> <span className="font-mono">{p.tx_hash.slice(0, 10)}...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flagged — Ready for Recall */}
      <div className="glass-panel p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <AlertTriangle size={14} className="text-accent-amber" />
          Flagged Products — Ready for Recall
        </h3>
        <div className="space-y-3">
          {flaggedProducts.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-navy-950/40 border border-white/[0.06] hover:border-accent-amber/20 transition-colors">
              <div className="flex items-center gap-3">
                <Package size={16} className="text-accent-amber" />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-[11px] text-gray-500">{p.batch_id} • Trust: {p.trust_score} • {p.ai_verification.anomaly_message?.slice(0, 60)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {recallQueue.includes(p.id) ? (
                  <div className="flex items-center gap-2 text-accent-red">
                    <div className="w-3 h-3 border-2 border-accent-red border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold">Processing recall...</span>
                  </div>
                ) : (
                  <button onClick={() => handleRecall(p.id)} className="px-4 py-2 rounded-lg bg-accent-red text-white text-xs font-bold hover:bg-red-600 transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    <ShieldAlert size={12} /> Initiate Recall
                  </button>
                )}
              </div>
            </div>
          ))}
          {flaggedProducts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">No flagged products — all clear ✓</p>
          )}
        </div>
      </div>

      {/* Process */}
      <div className="glass-panel p-5">
        <h3 className="text-sm font-semibold mb-4">Recall Process</h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {['Product Flagged', 'Admin Review', 'Recall Initiated', 'Blockchain Updated', 'Mobile Notified', 'Product Withdrawn'].map((step, i) => (
            <div key={step} className="flex items-center gap-3 min-w-fit">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-navy-600/40 text-gray-500 border border-white/[0.06]'}`}>
                  {i + 1}
                </div>
                <span className="text-[10px] text-gray-500 text-center max-w-[80px]">{step}</span>
              </div>
              {i < 5 && <div className={`w-6 h-[1px] mt-[-14px] ${i < 2 ? 'bg-accent-green/40' : 'bg-navy-600/60'}`} />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
