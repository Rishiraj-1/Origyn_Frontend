import { BarChart2, TrendingUp, PieChart } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Network performance and tokenomics metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-64 flex flex-col items-center justify-center">
          <BarChart2 className="text-green-accent mb-4" size={48} />
          <h3 className="text-white text-xl font-bold">Transaction Volume</h3>
          <p className="text-gray-400 mt-2">Chart placeholder</p>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-64 flex flex-col items-center justify-center">
          <TrendingUp className="text-blue-400 mb-4" size={48} />
          <h3 className="text-white text-xl font-bold">Token Velocity (ORG)</h3>
          <p className="text-gray-400 mt-2">Chart placeholder</p>
        </div>
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-64 flex flex-col items-center justify-center md:col-span-2">
          <PieChart className="text-purple-400 mb-4" size={48} />
          <h3 className="text-white text-xl font-bold">User Demographics</h3>
          <p className="text-gray-400 mt-2">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
}
