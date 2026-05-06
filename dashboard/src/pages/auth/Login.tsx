import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {
  const [method, setMethod] = useState<'password' | 'otp'>('password');

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Particle background placeholder */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-accent to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-16 h-16 mx-auto bg-gradient-to-tr from-green-accent to-blue-500 rounded-2xl mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          >
            <span className="text-navy-900 font-black text-2xl">O</span>
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-gray-400 mt-2">Log in to your Origyn account</p>
        </div>

        <div className="flex bg-navy-900/50 rounded-lg p-1 mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${method === 'password' ? 'bg-navy-700 shadow text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setMethod('password')}
          >
            Password
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${method === 'otp' ? 'bg-navy-700 shadow text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setMethod('otp')}
          >
            OTP
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {method === 'password' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-green-accent transition-colors" placeholder="admin@origyn.com" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <Link to="/auth/forgot-password" className="text-sm text-green-accent hover:underline">Forgot?</Link>
                </div>
                <input type="password" className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-green-accent transition-colors" placeholder="••••••••" />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <span className="bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2 text-gray-400">+91</span>
                <input type="tel" className="flex-1 bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-green-accent transition-colors" placeholder="98765 43210" />
              </div>
            </div>
          )}

          <Link to="/dashboard" className="w-full mt-6 block text-center bg-green-accent text-navy-900 font-bold py-3 rounded-lg hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(0,255,136,0.3)]">
            {method === 'password' ? 'Sign In' : 'Send OTP'}
          </Link>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/auth/register" className="text-green-accent hover:underline">Register now</Link>
        </p>
      </motion.div>

      <p className="mt-8 text-sm text-gray-500 relative z-10">Trusted by 2,400+ businesses</p>
    </div>
  );
}
