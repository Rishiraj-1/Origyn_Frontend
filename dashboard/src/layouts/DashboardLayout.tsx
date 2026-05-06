import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, AlertTriangle, BarChart2, Users, Activity, Hexagon, Settings } from 'lucide-react';
import clsx from 'clsx';

export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/dashboard/products' },
    { icon: AlertTriangle, label: 'Alerts', path: '/dashboard/alerts' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: Activity, label: 'IoT Simulator', path: '/dashboard/iot' },
    { icon: Hexagon, label: 'Blockchain', path: '/dashboard/blockchain' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-navy-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-navy-800/50 backdrop-blur-xl flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-2xl font-black tracking-tighter text-green-accent">
            ORIGYN
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive 
                    ? "bg-green-accent/10 text-green-accent shadow-[inset_0_0_20px_rgba(0,255,136,0.1)] border border-green-accent/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={20} className={isActive ? "drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" : ""} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-navy-800/30 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search products, tx hash... (Cmd+K)" 
              className="bg-navy-900/50 border border-white/10 rounded-full px-4 py-1.5 text-sm w-96 focus:outline-none focus:border-green-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <AlertTriangle size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-accent rounded-full animate-pulse"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-accent to-blue-500 border border-white/20"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 relative z-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
