import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Thermometer, QrCode, MapPin, Clock, ShieldAlert,
  CheckCircle, Eye, XCircle, ImageOff, UserX
} from 'lucide-react';
import { alerts } from '../../data/mockData';

const typeConfig: Record<string, { icon: typeof AlertTriangle; label: string; color: string }> = {
  temperature_breach: { icon: Thermometer, label: 'Temperature Breach', color: '#EF4444' },
  qr_clone: { icon: QrCode, label: 'QR Clone Attempt', color: '#F59E0B' },
  gps_fraud: { icon: MapPin, label: 'GPS Fraud', color: '#EF4444' },
  timeline_fraud: { icon: Clock, label: 'Timeline Fraud', color: '#F59E0B' },
  unknown_handler: { icon: UserX, label: 'Unknown Handler', color: '#8B5CF6' },
  image_mismatch: { icon: ImageOff, label: 'Image Mismatch', color: '#EF4444' },
};

const severityColors: Record<string, { text: string; bg: string; border: string }> = {
  critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  high: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  medium: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  low: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const filtered = alerts.filter(a => filter === 'all' || (filter === 'active' && !a.resolved) || (filter === 'resolved' && a.resolved));
  const critical = alerts.filter(a => !a.resolved && a.severity === 'critical').length;
  const high = alerts.filter(a => !a.resolved && a.severity === 'high').length;
  const resolved = alerts.filter(a => a.resolved).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Anomaly Monitor</h1>
        <p className="text-gray-500 text-sm mt-0.5">AI-powered fraud detection & alert management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel p-4 border-accent-red/20 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-red/10"><AlertTriangle size={20} className="text-accent-red" /></div>
          <div>
            <p className="text-2xl font-bold">{critical}</p>
            <p className="text-xs text-gray-500">Critical Alerts</p>
          </div>
        </div>
        <div className="glass-panel p-4 border-accent-amber/20 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-amber/10"><ShieldAlert size={20} className="text-accent-amber" /></div>
          <div>
            <p className="text-2xl font-bold">{high}</p>
            <p className="text-xs text-gray-500">High Priority</p>
          </div>
        </div>
        <div className="glass-panel p-4 border-accent-green/20 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-green/10"><CheckCircle size={20} className="text-accent-green" /></div>
          <div>
            <p className="text-2xl font-bold">{resolved}</p>
            <p className="text-xs text-gray-500">Resolved</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-1 bg-navy-800/40 rounded-xl p-1 border border-white/[0.04] w-fit">
        {(['all', 'active', 'resolved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filter === f ? 'bg-navy-600/60 text-white border border-white/[0.08]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filtered.map((a, i) => {
          const tc = typeConfig[a.type];
          const sc = severityColors[a.severity];
          const Icon = tc.icon;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-panel p-4 ${a.resolved ? 'opacity-60' : ''} hover:border-white/[0.12] transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${tc.color}12` }}>
                  <Icon size={18} style={{ color: tc.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{a.severity}</span>
                    <span className="text-[10px] text-gray-600 bg-navy-600/40 px-1.5 py-0.5 rounded">{tc.label}</span>
                    {a.resolved && <span className="text-[10px] text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded font-bold">RESOLVED</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{a.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{a.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                    <span>Batch: {a.batch_id}</span>
                    <span>•</span>
                    <span>{a.location}</span>
                    <span>•</span>
                    <span>{a.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!a.resolved && (
                    <button className="px-3 py-1.5 rounded-lg bg-accent-red/10 text-accent-red text-xs font-medium border border-accent-red/20 hover:bg-accent-red/20 transition-colors">
                      Recall
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg bg-navy-600/40 text-gray-400 hover:text-white transition-colors">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
