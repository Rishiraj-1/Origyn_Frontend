import { Hexagon, Database, Link as LinkIcon, Clock } from 'lucide-react';

export default function Blockchain() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Blockchain Explorer</h1>
          <p className="text-gray-400 mt-1">View raw transactions and smart contract state</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm flex items-center gap-4">
          <Database className="text-blue-400" size={32} />
          <div>
            <p className="text-gray-400 text-sm">Latest Block</p>
            <p className="text-white text-xl font-bold font-mono">14,291,042</p>
          </div>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm flex items-center gap-4">
          <Hexagon className="text-green-accent" size={32} />
          <div>
            <p className="text-gray-400 text-sm">Network</p>
            <p className="text-white text-xl font-bold">Aptos Testnet</p>
          </div>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm flex items-center gap-4">
          <Clock className="text-purple-400" size={32} />
          <div>
            <p className="text-gray-400 text-sm">Avg Block Time</p>
            <p className="text-white text-xl font-bold">~0.4s</p>
          </div>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm flex items-center gap-4">
          <LinkIcon className="text-yellow-400" size={32} />
          <div>
            <p className="text-gray-400 text-sm">Connected Peers</p>
            <p className="text-white text-xl font-bold">128</p>
          </div>
        </div>
      </div>

      <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-white text-xl font-bold mb-6">Recent Transactions</h3>
        <table className="w-full text-left text-gray-400 text-sm">
          <thead className="bg-navy-900/50 text-gray-300">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">Tx Hash</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2 rounded-tr-lg">Time</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-mono text-blue-400">0x8a9f...33{i}b</td>
                <td className="px-4 py-3"><span className="bg-green-accent/10 text-green-accent px-2 py-1 rounded text-xs">UpdateState</span></td>
                <td className="px-4 py-3 font-mono">0x12{i}...8cf</td>
                <td className="px-4 py-3">2 mins ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
