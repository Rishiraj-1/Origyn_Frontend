import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Search, Shield, AlertTriangle, MapPin, Star } from 'lucide-react';
import { users } from '../../data/mockData';

const roleColors: Record<string, { color: string; bg: string }> = {
  farmer: { color: 'text-green-400', bg: 'bg-green-400/10' },
  distributor: { color: 'text-blue-400', bg: 'bg-blue-400/10' },
  retailer: { color: 'text-purple-400', bg: 'bg-purple-400/10' },
  consumer: { color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  admin: { color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
};

export default function Users() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-gray-500 text-sm mt-0.5">{users.length} users across the Origyn network</p>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['farmer', 'distributor', 'retailer', 'consumer'].map(role => {
          const count = users.filter(u => u.role === role).length;
          const rc = roleColors[role];
          return (
            <div key={role} className="glass-panel p-4 cursor-pointer hover:border-white/[0.12] transition-all" onClick={() => setRoleFilter(role === roleFilter ? 'all' : role)}>
              <div className={`p-2 rounded-lg ${rc.bg} w-fit mb-2`}>
                <UsersIcon size={14} className={rc.color} />
              </div>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-[11px] text-gray-500 capitalize">{role}s</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="glass-panel p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full bg-navy-950/60 border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent-green/40 transition-colors placeholder:text-gray-600" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="bg-navy-800/60 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-400 focus:outline-none">
            <option value="all">All Roles</option>
            <option value="farmer">Farmers</option>
            <option value="distributor">Distributors</option>
            <option value="retailer">Retailers</option>
            <option value="consumer">Consumers</option>
          </select>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((u, i) => {
          const rc = roleColors[u.role];
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-panel p-4 hover:border-white/[0.12] transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-blue/20 flex items-center justify-center border border-white/[0.06] text-sm font-bold flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold">{u.name}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${rc.bg} ${rc.color}`}>{u.role}</span>
                    {u.status === 'suspended' && <span className="text-[10px] font-bold text-accent-red bg-accent-red/10 px-1.5 py-0.5 rounded">SUSPENDED</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{u.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {u.location}</span>
                    <span className="flex items-center gap-1"><Star size={10} className="text-accent-amber" /> {u.reputation_score}</span>
                    <span>{u.products_handled} products</span>
                    {u.anomaly_count > 0 && (
                      <span className="flex items-center gap-1 text-accent-red"><AlertTriangle size={10} /> {u.anomaly_count}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
