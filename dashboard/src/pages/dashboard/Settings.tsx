import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure your Origyn dashboard</p>
        </div>
        <button className="bg-green-accent text-navy-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-400 transition-colors">
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm space-y-6">
        <div>
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <SettingsIcon className="text-gray-400" size={20} />
            Smart Contract Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">RPC Endpoint</label>
              <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-white" defaultValue="https://fullnode.devnet.aptoslabs.com" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Contract Address</label>
              <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-white font-mono" defaultValue="0x4b7...2f1" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h3 className="text-white text-lg font-bold mb-4">UI Preferences</h3>
          <div className="flex items-center justify-between bg-navy-900 p-4 rounded-lg">
            <span className="text-white">Dark Mode</span>
            <div className="w-12 h-6 bg-green-accent rounded-full relative">
              <div className="w-4 h-4 bg-navy-900 rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
