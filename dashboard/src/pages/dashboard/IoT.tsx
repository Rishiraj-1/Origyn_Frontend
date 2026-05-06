import { Activity, Cpu, Thermometer, Wifi } from 'lucide-react';

export default function IoTSimulator() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">IoT Simulator</h1>
          <p className="text-gray-400 mt-1">Simulate sensor data for supply chain tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-blue-400" size={24} />
            <h3 className="text-white text-xl font-bold">Virtual Sensor Node</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Target Batch ID</label>
              <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-white" defaultValue="BATCH-1002" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-navy-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Thermometer className="text-red-400" size={20} />
                <span className="text-white">Temperature</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="range" className="w-24" />
                <span className="text-white font-mono w-12 text-right">4.2°C</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-navy-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="text-green-400" size={20} />
                <span className="text-white">Humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="range" className="w-24" />
                <span className="text-white font-mono w-12 text-right">85%</span>
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mt-4">
              <Wifi size={20} /> Inject Data to Blockchain
            </button>
          </div>
        </div>

        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-white text-xl font-bold mb-4">Live Sensor Feed</h3>
          <div className="bg-navy-900 p-4 rounded-lg font-mono text-xs text-green-400 h-64 overflow-y-auto">
            <p>[10:42:01] Node 1: Temp 4.2°C, Hum 85% - TX: 0x8f2...a1</p>
            <p>[10:41:01] Node 1: Temp 4.1°C, Hum 84% - TX: 0x3d1...b2</p>
            <p className="text-gray-500">Waiting for next transmission...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
