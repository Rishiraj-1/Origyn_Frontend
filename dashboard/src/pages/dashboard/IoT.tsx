import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Cpu, Thermometer, Droplets, MapPin, Battery, Wifi, WifiOff, Zap } from 'lucide-react';
import { sensorReadings } from '../../data/mockData';

export default function IoTMonitor() {
  const [temp, setTemp] = useState(4.2);
  const [humidity, setHumidity] = useState(85);
  const [logs, setLogs] = useState(sensorReadings);
  const [live, setLive] = useState(true);
  const [tempHistory, setTempHistory] = useState([
    { t: '10:36', temp: 4.0, hum: 83 },
    { t: '10:37', temp: 4.1, hum: 84 },
    { t: '10:38', temp: 4.3, hum: 86 },
    { t: '10:39', temp: 4.1, hum: 84 },
    { t: '10:40', temp: 4.3, hum: 86 },
    { t: '10:41', temp: 4.1, hum: 84 },
    { t: '10:42', temp: 4.2, hum: 85 },
  ]);

  // Simulate live data
  useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => {
      const newTemp = +(temp + (Math.random() - 0.5) * 0.4).toFixed(1);
      const newHum = Math.min(100, Math.max(60, Math.round(humidity + (Math.random() - 0.5) * 3)));
      setTemp(newTemp);
      setHumidity(newHum);
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const shortTime = `${now.getMinutes()}:${now.getSeconds().toString().padStart(2, '0')}`;
      setTempHistory(prev => [...prev.slice(-11), { t: shortTime, temp: newTemp, hum: newHum }]);
      setLogs(prev => [{
        timestamp: timeStr,
        node_id: 'NODE-01',
        temperature: newTemp,
        humidity: newHum,
        gps: [18.5204, 73.8567] as [number, number],
        battery: 92 - Math.floor(Math.random() * 3),
        tx_hash: `0x${Math.random().toString(16).slice(2, 5)}...${Math.random().toString(16).slice(2, 4)}`,
      }, ...prev.slice(0, 14)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [live, temp, humidity]);

  const isTempDanger = temp > 8 || temp < 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">IoT Live Monitor</h1>
          <p className="text-gray-500 text-sm mt-0.5">Real-time sensor data & cold-chain monitoring</p>
        </div>
        <button
          onClick={() => setLive(!live)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${live ? 'bg-accent-green/10 text-accent-green border-accent-green/20' : 'bg-navy-800/60 text-gray-500 border-white/[0.06]'}`}
        >
          {live ? <Wifi size={14} /> : <WifiOff size={14} />}
          {live ? 'Live' : 'Paused'}
        </button>
      </div>

      {/* Sensor Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`glass-panel p-4 ${isTempDanger ? 'border-accent-red/30 glow-red' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={14} className={isTempDanger ? 'text-accent-red' : 'text-accent-blue'} />
            <span className="text-[11px] text-gray-500">Temperature</span>
          </div>
          <p className={`text-3xl font-bold font-mono ${isTempDanger ? 'text-accent-red animate-pulse' : 'text-white'}`}>{temp}°C</p>
          <p className="text-[10px] text-gray-500 mt-1">Threshold: 0-8°C</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={14} className="text-accent-cyan" />
            <span className="text-[11px] text-gray-500">Humidity</span>
          </div>
          <p className="text-3xl font-bold font-mono">{humidity}%</p>
          <p className="text-[10px] text-gray-500 mt-1">Optimal: 75-90%</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-accent-green" />
            <span className="text-[11px] text-gray-500">GPS</span>
          </div>
          <p className="text-sm font-mono text-white">18.5204, 73.8567</p>
          <p className="text-[10px] text-gray-500 mt-1">Pune Warehouse</p>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Battery size={14} className="text-accent-amber" />
            <span className="text-[11px] text-gray-500">Battery</span>
          </div>
          <p className="text-3xl font-bold font-mono">92%</p>
          <p className="text-[10px] text-gray-500 mt-1">NODE-01</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Live Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-accent-green" />
            <h3 className="text-sm font-semibold">Temperature & Humidity (Live)</h3>
            {live && <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />}
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tempHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="t" stroke="#4b5563" tick={{ fontSize: 10 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0c1220', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={2} fill="url(#gTemp)" name="Temp (°C)" />
                <Area type="monotone" dataKey="hum" stroke="#06B6D4" strokeWidth={1.5} fill="url(#gHum)" name="Humidity (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Console */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={14} className="text-accent-blue" />
            <h3 className="text-sm font-semibold">Sensor Console</h3>
          </div>
          <div className="bg-navy-950 p-4 rounded-xl font-mono text-[11px] h-[250px] overflow-y-auto space-y-1 border border-white/[0.04]">
            {logs.map((l, i) => (
              <div key={i} className={`flex gap-2 ${i === 0 && live ? 'text-accent-green' : 'text-gray-500'}`}>
                <span className="text-gray-600">[{l.timestamp}]</span>
                <span>{l.node_id}: Temp {l.temperature}°C, Hum {l.humidity}%</span>
                <span className="text-gray-700">TX: {l.tx_hash}</span>
              </div>
            ))}
            {live && <div className="text-accent-green animate-pulse">▌ Listening...</div>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
