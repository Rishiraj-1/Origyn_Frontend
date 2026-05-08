import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { Coins, TrendingUp, Award, ScanLine, Zap } from 'lucide-react';
import { tokenAnalytics } from '../../data/mockData';

const topScanners = [
  { name: 'Priya Consumer', scans: 23, tokens: 1150, badge: '🥇' },
  { name: 'Rahul Verma', scans: 18, tokens: 900, badge: '🥈' },
  { name: 'Anita Sharma', scans: 15, tokens: 750, badge: '🥉' },
  { name: 'Vikash Kumar', scans: 12, tokens: 600, badge: '' },
  { name: 'Neha Gupta', scans: 10, tokens: 500, badge: '' },
];

const rewardActivity = [
  { day: 'Mon', rewards: 340 },
  { day: 'Tue', rewards: 520 },
  { day: 'Wed', rewards: 280 },
  { day: 'Thu', rewards: 680 },
  { day: 'Fri', rewards: 450 },
  { day: 'Sat', rewards: 790 },
  { day: 'Sun', rewards: 610 },
];

export default function TokenAnalytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Token Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">ORG token economy — scan-to-earn rewards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-accent-amber/10"><Coins size={14} className="text-accent-amber" /></div>
          </div>
          <p className="text-xl font-bold">96,900</p>
          <p className="text-[11px] text-gray-500">Total ORG Issued</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-accent-green/10"><TrendingUp size={14} className="text-accent-green" /></div>
          </div>
          <p className="text-xl font-bold">29,900</p>
          <p className="text-[11px] text-gray-500">Tokens Spent</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-accent-blue/10"><ScanLine size={14} className="text-accent-blue" /></div>
          </div>
          <p className="text-xl font-bold">18.2K</p>
          <p className="text-[11px] text-gray-500">Reward Scans</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-accent-purple/10"><Zap size={14} className="text-accent-purple" /></div>
          </div>
          <p className="text-xl font-bold">+32%</p>
          <p className="text-[11px] text-gray-500">Growth (MoM)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Earned vs Spent */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
          <h3 className="text-sm font-semibold mb-4">Tokens Earned vs Spent</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gEarned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="earned" stroke="#F59E0B" strokeWidth={2} fill="url(#gEarned)" />
                <Area type="monotone" dataKey="spent" stroke="#8B5CF6" strokeWidth={2} fill="url(#gSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Reward Activity */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-5">
          <h3 className="text-sm font-semibold mb-4">Daily Reward Distribution</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rewardActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="rewards" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award size={14} className="text-accent-amber" />
          <h3 className="text-sm font-semibold">Top Scanners Leaderboard</h3>
        </div>
        <div className="space-y-2">
          {topScanners.map((s, i) => (
            <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-navy-950/40 border border-white/[0.04] hover:border-white/[0.08] transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg w-8 text-center">{s.badge || `#${i + 1}`}</span>
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-[11px] text-gray-500">{s.scans} scans</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins size={12} className="text-accent-amber" />
                <span className="text-sm font-bold text-accent-amber">{s.tokens}</span>
                <span className="text-[10px] text-gray-500">ORG</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
