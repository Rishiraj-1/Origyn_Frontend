import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-navy-900 overflow-hidden relative text-white">
      {/* Background network visualization placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FF88" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-accent to-blue-500">
            ORIGYN
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-green-accent/20 animate-scan-line pointer-events-none rounded mix-blend-overlay"></div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mt-4">
            Every product has a story. We make sure it's the truth.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link to="/auth/login" className="px-8 py-4 bg-green-accent text-navy-900 font-bold rounded-full hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(0,255,136,0.4)]">
            Admin Login
          </Link>
          <Link to="/auth/login" className="px-8 py-4 bg-navy-800 border border-white/20 font-bold rounded-full hover:bg-navy-700 transition-colors">
            Regulator Access
          </Link>
        </motion.div>
      </main>

      {/* Stats ticker placeholder */}
      <div className="absolute bottom-0 left-0 w-full bg-navy-800/80 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_20s_linear_infinite] px-4 text-sm font-mono text-green-accent">
          <span>₹1L Cr Fraud Prevented</span>
          <span>•</span>
          <span>2.4M Products Tracked</span>
          <span>•</span>
          <span>15K Active Nodes</span>
          <span>•</span>
          <span>₹1L Cr Fraud Prevented</span>
          <span>•</span>
          <span>2.4M Products Tracked</span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
