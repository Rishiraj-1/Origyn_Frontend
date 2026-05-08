import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { scansPerDay, regionActivity, trustScoreDistribution } from '../../data/mockData';
import { BarChart3, TrendingUp, PieChart as PieIcon, Globe } from 'lucide-react';

const COLORS = ['#00FF88', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const counterfeitData = [
  { month: 'Jan', attempts: 12, blocked: 12 },
  { month: 'Feb', attempts: 18, blocked: 17 },
  { month: 'Mar', attempts: 8, blocked: 8 },
  { month: 'Apr', attempts: 24, blocked: 23 },
  { month: 'May', attempts: 15, blocked: 15 },
];

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">Supply chain intelligence & performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Scans per Day */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={14} className="text-accent-green" />
            <h3 className="text-sm font-semibold">Scans per Day</h3>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scansPerDay} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gScans2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00FF88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="scans" stroke="#00FF88" strokeWidth={2} fill="url(#gScans2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trust Score Distribution */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon size={14} className="text-accent-blue" />
            <h3 className="text-sm font-semibold">Trust Score Distribution</h3>
          </div>
          <div className="h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trustScoreDistribution} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={90} innerRadius={50} strokeWidth={0}>
                  {trustScoreDistribution.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Counterfeit Attempts */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={14} className="text-accent-red" />
            <h3 className="text-sm font-semibold">Counterfeit Attempts vs Blocked</h3>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={counterfeitData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="attempts" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="blocked" fill="#00FF88" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region-wise */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={14} className="text-accent-cyan" />
            <h3 className="text-sm font-semibold">Region-wise Activity</h3>
          </div>
          <div className="space-y-3">
            {regionActivity.map(r => (
              <div key={r.region} className="flex items-center justify-between p-3 rounded-xl bg-navy-950/40 border border-white/[0.04]">
                <div>
                  <p className="text-sm font-medium">{r.region}</p>
                  <p className="text-[11px] text-gray-500">{r.products} products • {r.scans.toLocaleString()} scans</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 rounded-full bg-navy-600 overflow-hidden">
                    <div className="h-full rounded-full bg-accent-green" style={{ width: `${(r.products / 1240) * 100}%` }} />
                  </div>
                  {r.alerts > 0 && <span className="text-[10px] font-bold text-accent-red bg-accent-red/10 px-1.5 py-0.5 rounded">{r.alerts} alerts</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
