import { motion } from 'framer-motion';
import {
  Package, ShieldAlert, ScanLine, Coins, TrendingUp, TrendingDown,
  Hexagon, Activity, AlertTriangle, ArrowRight, CheckCircle, XCircle, Truck
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar
} from 'recharts';
import { activityFeed, scansPerDay, alerts, regionActivity } from '../../data/mockData';
import { Link } from 'react-router-dom';

const stats = [
  { title: 'Total Products', value: '2,400', icon: Package, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', trend: '+12.5%', up: true },
  { title: 'Active Shipments', value: '342', icon: Truck, color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', trend: '+8.3%', up: true },
  { title: 'Fake Attempts', value: '47', icon: ShieldAlert, color: '#EF4444', bg: 'rgba(239,68,68,0.08)', trend: '-4.2%', up: false },
  { title: 'Total Scans', value: '18.2K', icon: ScanLine, color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', trend: '+24.1%', up: true },
  { title: 'Trust Score Avg', value: '94.2', icon: CheckCircle, color: '#00FF88', bg: 'rgba(0,255,136,0.08)', trend: '+1.1%', up: true },
  { title: 'Chain Txns', value: '9,841', icon: Hexagon, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', trend: '+18.7%', up: true },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const activityIcons: Record<string, { icon: typeof Package; color: string }> = {
  registration: { icon: Package, color: '#3B82F6' },
  scan: { icon: ScanLine, color: '#8B5CF6' },
  update: { icon: Activity, color: '#06B6D4' },
  anomaly: { icon: AlertTriangle, color: '#EF4444' },
  recall: { icon: XCircle, color: '#EF4444' },
  token: { icon: Coins, color: '#F59E0B' },
};

export default function MainDashboard() {
  const critAlerts = alerts.filter(a => !a.resolved && (a.severity === 'critical' || a.severity === 'high'));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
          <p className="text-gray-500 text-sm mt-0.5">Real-time supply chain intelligence</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          Last updated: just now
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.title} className="glass-panel p-4 group hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: s.bg }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-semibold ${s.up ? 'text-accent-green' : 'text-accent-red'}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.trend}
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight">{s.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{s.title}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts + Feed Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Scans Chart */}
        <motion.div variants={item} className="glass-panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold">Scans & Anomalies (7 Days)</h3>
            <span className="text-[11px] text-gray-500">Updated live</span>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scansPerDay} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00FF88" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gAnomalies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="scans" stroke="#00FF88" strokeWidth={2} fill="url(#gScans)" />
                <Area type="monotone" dataKey="anomalies" stroke="#EF4444" strokeWidth={2} fill="url(#gAnomalies)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Feed */}
        <motion.div variants={item} className="glass-panel p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              Live Activity
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[260px]">
            {activityFeed.map((evt) => {
              const meta = activityIcons[evt.type] || activityIcons.update;
              const Icon = meta.icon;
              return (
                <div key={evt.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-navy-800/40 hover:bg-navy-800/70 transition-colors group cursor-pointer">
                  <div className="p-1.5 rounded-md mt-0.5" style={{ backgroundColor: `${meta.color}15` }}>
                    <Icon size={12} style={{ color: meta.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-300 leading-relaxed">{evt.message}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{evt.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Alerts + Region Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Critical Alerts */}
        <motion.div variants={item} className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle size={14} className="text-accent-red" />
              Active Alerts
            </h3>
            <Link to="/dashboard/alerts" className="text-[11px] text-accent-green hover:underline flex items-center gap-1">
              View all <ArrowRight size={10} />
            </Link>
          </div>
          <div className="space-y-2">
            {critAlerts.slice(0, 4).map((a) => (
              <div key={a.id} className={`p-3 rounded-xl border ${a.severity === 'critical' ? 'border-accent-red/20 bg-accent-red/[0.04]' : 'border-accent-amber/20 bg-accent-amber/[0.04]'} hover:border-opacity-40 transition-colors`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${a.severity === 'critical' ? 'bg-accent-red/10 text-accent-red' : 'bg-accent-amber/10 text-accent-amber'}`}>
                    {a.severity}
                  </span>
                  <span className="text-[10px] text-gray-600">{a.timestamp}</span>
                </div>
                <p className="text-xs font-medium text-white">{a.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Batch: {a.batch_id} • {a.location}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Region Activity */}
        <motion.div variants={item} className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Region Activity</h3>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="region" stroke="#4b5563" tick={{ fontSize: 10 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }}
                />
                <Bar dataKey="products" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alerts" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
