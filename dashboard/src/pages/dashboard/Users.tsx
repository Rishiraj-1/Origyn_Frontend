import { Users as UsersIcon, Shield, Search } from 'lucide-react';

export default function Users() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage roles and permissions across the network</p>
        </div>
      </div>

      <div className="bg-navy-800/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-green-accent"
            />
          </div>
        </div>

        <table className="w-full text-left text-gray-400">
          <thead className="text-xs uppercase bg-navy-900/50 text-gray-300">
            <tr>
              <th className="px-6 py-3 rounded-tl-lg">User</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {['Farmer', 'Distributor', 'Retailer', 'Consumer'].map((role, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
                    <UsersIcon size={16} className="text-white" />
                  </div>
                  <span className="text-white font-medium">Test {role}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-navy-700 text-white px-2 py-1 rounded text-xs">{role}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-accent"></div>
                    <span>Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
