import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USERNAME = 'cofounder';
const ADMIN_PASSWORD = 'juno@2026';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('');
      sessionStorage.setItem('juno_admin_unlocked', '1');
      navigate('/admin/dashboard');
      return;
    }
    setError('Invalid credentials. Please try again.');
  };

  return (
    <div className="min-h-screen bg-juno-bg px-6 py-16 md:py-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-juno-card border border-juno-navy/10 rounded-[2rem] p-8 md:p-10 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-juno-navy">Cofounder Access</h1>
          <p className="mt-2 text-sm text-juno-navy/60">Manual login required for admin dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-juno-navy/50 font-bold ml-1">Username</label>
            <div className="mt-2 relative">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-juno-navy/40" />
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl bg-juno-bg border border-juno-navy/10 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-juno-ochre/30"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-juno-navy/50 font-bold ml-1">Password</label>
            <div className="mt-2 relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-juno-navy/40" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-juno-bg border border-juno-navy/10 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-juno-ochre/30"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-300/30 bg-rose-100/50 px-4 py-3 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-[999px] bg-juno-navy text-juno-bg py-4 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2"
          >
            Login <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
