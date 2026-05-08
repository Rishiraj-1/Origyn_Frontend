import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Search, Filter, ChevronRight, Shield, MapPin, ExternalLink } from 'lucide-react';
import { products } from '../../data/mockData';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  verified: { label: 'Verified', color: 'text-accent-green', bg: 'bg-accent-green/10', border: 'border-accent-green/20' },
  in_transit: { label: 'In Transit', color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20' },
  recalled: { label: 'Recalled', color: 'text-accent-red', bg: 'bg-accent-red/10', border: 'border-accent-red/20' },
  flagged: { label: 'Flagged', color: 'text-accent-amber', bg: 'bg-accent-amber/10', border: 'border-accent-amber/20' },
};

const categories = ['All', 'Fruits', 'Vegetables', 'Spices', 'Grains', 'Beverages'];

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.batch_id.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} products tracked across the network</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, batch ID, or product ID..."
              className="w-full bg-navy-950/60 border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent-green/40 transition-colors placeholder:text-gray-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === c ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-navy-800/60 text-gray-500 border border-white/[0.06] hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-navy-800/60 border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-accent-green/40"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="in_transit">In Transit</option>
            <option value="flagged">Flagged</option>
            <option value="recalled">Recalled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Product</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Stage</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Trust</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Status</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">Blockchain</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const st = statusConfig[p.status];
                return (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.status === 'recalled' ? 'bg-accent-red/10 border border-accent-red/20' : 'bg-accent-green/[0.06] border border-accent-green/10'}`}>
                          <Package size={16} className={p.status === 'recalled' ? 'text-accent-red' : 'text-accent-green'} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{p.name}</p>
                          <p className="text-[11px] text-gray-500">{p.batch_id} • {p.origin_farmer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-400">{p.current_stage}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-1.5 rounded-full bg-navy-600 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${p.trust_score}%`,
                              backgroundColor: p.trust_score >= 80 ? '#00FF88' : p.trust_score >= 60 ? '#F59E0B' : '#EF4444'
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono font-medium" style={{ color: p.trust_score >= 80 ? '#00FF88' : p.trust_score >= 60 ? '#F59E0B' : '#EF4444' }}>
                          {p.trust_score}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${st.bg} ${st.color} ${st.border} border`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Shield size={12} className="text-accent-green" />
                        <span className="text-[11px] font-mono text-gray-400">{p.tx_hash.slice(0, 8)}...{p.tx_hash.slice(-4)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link to={`/dashboard/products/${p.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-accent-green text-xs font-medium">
                        Details <ChevronRight size={14} />
                      </Link>
                    </td>
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
