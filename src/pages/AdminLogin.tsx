import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import bcrypt from 'bcryptjs';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch directly by document ID
      const { doc, getDoc } = await import('firebase/firestore');
      const adminRef = doc(db, 'admins', username.trim());
      const adminSnap = await getDoc(adminRef);
      
      if (!adminSnap.exists()) {
        throw new Error(`Admin document '${username.trim()}' not found in Firebase. Please ensure the Document ID is exactly '${username.trim()}'.`);
      }

      const adminDoc = adminSnap.data();
      
      if (!adminDoc.passwordHash) {
        throw new Error('The "passwordHash" field is missing in your Firebase document.');
      }
      
      // Compare password hash robustly
      const isValid = bcrypt.compareSync(password, adminDoc.passwordHash.trim());
      if (!isValid) {
        throw new Error('Incorrect password. The hash in Firebase might have a typo, or the password is wrong.');
      }

      // Generate Access Token (mock token)
      const mockToken = btoa(JSON.stringify({ username, role: 'admin', timestamp: Date.now() }));
      localStorage.setItem('adminToken', mockToken);

      // Sign in anonymously to satisfy Firestore rules
      await signInAnonymously(auth);

      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-display font-bold text-juno-navy">Admin Access</h1>
          <p className="mt-2 text-sm text-juno-navy/60">Restricted portal for JUNO administrators.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-juno-navy/50 font-bold ml-1">Username</label>
            <div className="mt-2 relative">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-juno-navy/40" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl bg-juno-bg border border-juno-navy/10 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-juno-ochre/30 text-juno-navy"
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
                className="w-full rounded-2xl bg-juno-bg border border-juno-navy/10 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-juno-ochre/30 text-juno-navy"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-300/30 bg-rose-100/50 px-4 py-3 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[999px] bg-juno-navy text-juno-bg py-4 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-juno-navy/90 transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Login <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
