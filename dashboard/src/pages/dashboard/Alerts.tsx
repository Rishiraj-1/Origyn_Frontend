import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">System Alerts</h1>
          <p className="text-gray-400 mt-1">Monitor network anomalies and notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-navy-800/50 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm">
          <AlertTriangle className="text-red-500 mb-4" size={32} />
          <h3 className="text-white text-3xl font-bold">3</h3>
          <p className="text-gray-400">Critical Alerts</p>
        </div>
        <div className="bg-navy-800/50 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-sm">
          <Bell className="text-yellow-500 mb-4" size={32} />
          <h3 className="text-white text-3xl font-bold">12</h3>
          <p className="text-gray-400">Warnings</p>
        </div>
        <div className="bg-navy-800/50 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
          <CheckCircle className="text-green-500 mb-4" size={32} />
          <h3 className="text-white text-3xl font-bold">99.8%</h3>
          <p className="text-gray-400">System Health</p>
        </div>
      </div>

      <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm space-y-4">
        {[
          { type: 'critical', msg: 'Temperature anomaly detected in Transit #T-882 (Apple Batch)', time: '10 mins ago', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { type: 'warning', msg: 'Smart contract interaction delayed by 5 blocks', time: '1 hour ago', icon: Bell, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
          { type: 'info', msg: 'New distributor node successfully joined the network', time: '3 hours ago', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        ].map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-lg border ${alert.border} ${alert.bg}`}>
              <Icon className={alert.color} size={24} />
              <div className="flex-1">
                <p className="text-white font-medium">{alert.msg}</p>
                <p className="text-gray-400 text-sm mt-1">{alert.time}</p>
              </div>
              <button className="text-sm text-gray-400 hover:text-white">Dismiss</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
