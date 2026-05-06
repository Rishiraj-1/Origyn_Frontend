import { motion } from 'framer-motion';
import { Package, ShieldAlert, CheckCircle, Coins, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', products: 4000, alerts: 24 },
  { name: 'Tue', products: 3000, alerts: 13 },
  { name: 'Wed', products: 2000, alerts: 98 },
  { name: 'Thu', products: 2780, alerts: 39 },
  { name: 'Fri', products: 1890, alerts: 48 },
  { name: 'Sat', products: 2390, alerts: 38 },
  { name: 'Sun', products: 3490, alerts: 43 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel p-6 relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-${color} group-hover:scale-150 transition-transform duration-500`}></div>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg bg-${color}/10 text-${color}`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <TrendingUp size={16} className="text-green-accent" />
      <span className="text-green-accent font-medium">{trend}</span>
      <span className="text-gray-500">vs last week</span>
    </div>
  </motion.div>
);

export default function MainDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value="2.4M" icon={Package} color="blue-500" trend="+12.5%" />
        <StatCard title="Active Alerts" value="34" icon={ShieldAlert} color="red-accent" trend="-4.2%" />
        <StatCard title="Avg Trust Score" value="94/100" icon={CheckCircle} color="green-accent" trend="+1.1%" />
        <StatCard title="ORIGYN Issued" value="1.2M" icon={Coins} color="amber-accent" trend="+24.8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 lg:col-span-2 h-[400px]"
        >
          <h3 className="text-lg font-medium mb-6">Product Registrations (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff20', borderRadius: '8px' }}
                itemStyle={{ color: '#00FF88' }}
              />
              <Area type="monotone" dataKey="products" stroke="#00FF88" fillOpacity={1} fill="url(#colorProducts)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Live Alerts Feed */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 flex flex-col h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse"></span>
              Live Alerts
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-navy-900 border border-red-accent/20 hover:border-red-accent/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-red-accent bg-red-accent/10 px-2 py-0.5 rounded">CRITICAL</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <p className="text-sm font-medium">Temperature Breach Detected</p>
                <p className="text-xs text-gray-400 mt-1">Batch #8922 • Transit to Mumbai</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
