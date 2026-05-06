import { Package, Search, Plus } from 'lucide-react';

export default function Products() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">Manage and trace all products in the network</p>
        </div>
        <button className="bg-green-accent text-navy-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(0,255,136,0.2)]">
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by ID, name, or batch..." 
              className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-green-accent"
            />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-navy-900/50 border border-white/5 rounded-lg hover:border-green-accent/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-accent/10 border border-green-accent/20 flex items-center justify-center">
                  <Package className="text-green-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Premium Apples - Batch #{1000 + i}</h3>
                  <p className="text-gray-400 text-sm">Farmer: Rajesh Kumar • Added: 2 days ago</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                  In Transit
                </span>
                <p className="text-gray-500 text-xs font-mono">0x7F8...3A1</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
