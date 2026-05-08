import { motion } from 'framer-motion';
import { Hexagon, Database, Clock, Link as LinkIcon, ExternalLink, Copy, CheckCircle, XCircle, Loader, Fuel } from 'lucide-react';
import { blockchainTxs } from '../../data/mockData';

const typeColors: Record<string, { color: string; bg: string }> = {
  RegisterProduct: { color: 'text-accent-green', bg: 'bg-accent-green/10' },
  UpdateState: { color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  VerifyQR: { color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  RecallProduct: { color: 'text-accent-red', bg: 'bg-accent-red/10' },
  IssueToken: { color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
  TransferOwnership: { color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
};

const statusIcons: Record<string, { icon: typeof CheckCircle; color: string }> = {
  confirmed: { icon: CheckCircle, color: '#00FF88' },
  pending: { icon: Loader, color: '#F59E0B' },
  failed: { icon: XCircle, color: '#EF4444' },
};

export default function Blockchain() {
  const totalGas = blockchainTxs.reduce((s, t) => s + t.gas_used, 0);
  const confirmed = blockchainTxs.filter(t => t.status === 'confirmed').length;
  const latest = Math.max(...blockchainTxs.map(t => t.block_number));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Blockchain Monitor</h1>
        <p className="text-gray-500 text-sm mt-0.5">On-chain transaction explorer & verification</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-blue/10"><Database size={16} className="text-accent-blue" /></div>
          <div>
            <p className="text-xs text-gray-500">Latest Block</p>
            <p className="text-lg font-bold font-mono">{latest.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-green/10"><Hexagon size={16} className="text-accent-green" /></div>
          <div>
            <p className="text-xs text-gray-500">Network</p>
            <p className="text-lg font-bold">Polygon</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-amber/10"><Fuel size={16} className="text-accent-amber" /></div>
          <div>
            <p className="text-xs text-gray-500">Total Gas Used</p>
            <p className="text-lg font-bold font-mono">{totalGas.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-purple/10"><CheckCircle size={16} className="text-accent-purple" /></div>
          <div>
            <p className="text-xs text-gray-500">Confirmed</p>
            <p className="text-lg font-bold">{confirmed}/{blockchainTxs.length}</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Tx Hash</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Type</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">From</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Gas</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Block</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Status</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {blockchainTxs.map((tx, i) => {
                const tc = typeColors[tx.type];
                const si = statusIcons[tx.status];
                const StatusIcon = si.icon;
                return (
                  <motion.tr key={tx.tx_hash} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-accent-blue">{tx.tx_hash.slice(0, 10)}...{tx.tx_hash.slice(-4)}</span>
                        <button className="text-gray-600 hover:text-white"><Copy size={10} /></button>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tc.bg} ${tc.color}`}>{tx.type}</span>
                    </td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">{tx.from}</td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">{tx.gas_used.toLocaleString()}</td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">{tx.block_number > 0 ? tx.block_number.toLocaleString() : '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon size={12} style={{ color: si.color }} className={tx.status === 'pending' ? 'animate-spin' : ''} />
                        <span className="text-[11px] capitalize" style={{ color: si.color }}>{tx.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">{tx.timestamp}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
