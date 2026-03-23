import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LogOut, RefreshCw } from 'lucide-react';

type InviteRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number | string;
  sex: string;
  message: string;
  status: string;
  createdAt: string;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRows = async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'invite_requests'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => {
        const d = doc.data() as Record<string, any>;
        const createdAt = d.createdAt?.toDate ? d.createdAt.toDate().toLocaleString() : '-';
        return {
          id: doc.id,
          name: d.name ?? '-',
          email: d.email ?? '-',
          phone: d.phone ?? '-',
          age: d.age ?? '-',
          sex: d.sex ?? '-',
          message: d.message ?? '',
          status: d.status ?? '-',
          createdAt,
        };
      });
      setRows(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load data from Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin');
      } else {
        loadRows();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-juno-bg px-6 py-10 md:px-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-juno-navy">Invite Requests</h1>
            <p className="text-juno-navy/60 mt-2">Cofounder-only view of Firestore submissions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadRows}
              className="px-5 py-3 rounded-[999px] bg-juno-navy text-juno-bg text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-[999px] border border-juno-navy/20 text-juno-navy text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-300/30 bg-rose-100/50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.75rem] overflow-hidden border border-juno-navy/10 shadow-2xl bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-juno-navy text-juno-bg">
                <tr className="text-left">
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Name</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Email</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Phone</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Age</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Sex</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Status</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Submitted At</th>
                  <th className="px-4 py-4 uppercase tracking-[0.15em] text-[10px]">Message</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="px-4 py-5 text-juno-navy/60" colSpan={8}>Loading submissions...</td>
                  </tr>
                )}
                {!loading && rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-5 text-juno-navy/60" colSpan={8}>No data found in `invite_requests`.</td>
                  </tr>
                )}
                {!loading &&
                  rows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? 'bg-juno-bg/50' : 'bg-white'}>
                      <td className="px-4 py-4 text-juno-navy font-medium">{row.name}</td>
                      <td className="px-4 py-4 text-juno-navy/80">{row.email}</td>
                      <td className="px-4 py-4 text-juno-navy/80">{row.phone}</td>
                      <td className="px-4 py-4 text-juno-navy/80">{row.age}</td>
                      <td className="px-4 py-4 text-juno-navy/80">{row.sex}</td>
                      <td className="px-4 py-4 text-juno-navy/80">{row.status}</td>
                      <td className="px-4 py-4 text-juno-navy/70 whitespace-nowrap">{row.createdAt}</td>
                      <td className="px-4 py-4 text-juno-navy/70 max-w-[420px]">
                        <div className="line-clamp-2">{row.message || '-'}</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
