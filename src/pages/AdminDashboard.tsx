import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut, RefreshCw } from 'lucide-react';

type InviteRowV2 = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  state: string;
  instagram: string;
  occupation: string;
  hobbies: string;
  experiences: string[];
  whyJuno: string;
  seekingThroughTravel: string;
  timestamp: string;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<InviteRowV2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Protect the route using localStorage mock token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    } else {
      loadRows();
    }
  }, [navigate]);

  const loadRows = async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'invite_requests_v2'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => {
        const d = doc.data() as Record<string, any>;
        const timestampValue = d.timestamp?.toDate ? d.timestamp.toDate().toLocaleString() : '-';
        return {
          id: doc.id,
          name: d.name ?? '-',
          email: d.email ?? '-',
          phone: d.phone ?? '-',
          age: d.age ?? 0,
          gender: d.gender ?? '-',
          state: d.state ?? '-',
          instagram: d.instagram ?? '-',
          occupation: d.occupation ?? '-',
          hobbies: d.hobbies ?? '-',
          experiences: d.experiences ?? [],
          whyJuno: d.whyJuno ?? '',
          seekingThroughTravel: d.seekingThroughTravel ?? '',
          timestamp: timestampValue,
        };
      });
      setRows(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load data from Firestore.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('adminToken');
    await signOut(auth);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-juno-bg px-6 py-10 md:px-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-juno-navy">Admin Dashboard</h1>
            <p className="text-juno-navy/60 mt-2">View all secure submissions (invite_requests_v2).</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadRows}
              className="px-5 py-3 rounded-[999px] bg-juno-navy text-juno-bg text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 transition-transform active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-[999px] border border-juno-navy/20 text-juno-navy text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 transition-transform active:scale-95"
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
            <table className="w-full min-w-[2000px] text-sm text-juno-navy">
              <thead className="bg-juno-navy text-juno-bg">
                <tr className="text-left whitespace-nowrap">
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Name</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Age</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Gender</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">State/City</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Email</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Phone</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Instagram</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Occupation</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Hobbies</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Experiences</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Why JUNO</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Seeking</th>
                  <th className="px-4 py-5 uppercase tracking-[0.15em] text-[10px]">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="px-4 py-8 text-center text-juno-navy/60" colSpan={13}>Loading submissions...</td>
                  </tr>
                )}
                {!loading && rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-juno-navy/60" colSpan={13}>No request invites found.</td>
                  </tr>
                )}
                {!loading &&
                  rows.map((row, idx) => (
                    <tr key={row.id} className={`transition-colors hover:bg-black/[0.02] ${idx % 2 === 0 ? 'bg-juno-bg/30' : 'bg-white'} border-b border-black/5 align-top`}>
                      <td className="px-4 py-4 whitespace-nowrap font-bold">{row.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.age}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.gender}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.state}</td>
                      <td className="px-4 py-4 whitespace-nowrap"><a href={`mailto:${row.email}`} className="hover:text-juno-ochre transition-colors text-blue-600 truncate">{row.email}</a></td>
                      <td className="px-4 py-4 whitespace-nowrap"><a href={`tel:${row.phone}`} className="hover:text-juno-ochre transition-colors truncate">{row.phone}</a></td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.instagram}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.occupation}</td>
                      <td className="px-4 py-4 max-w-[200px] truncate" title={row.hobbies}>{row.hobbies}</td>
                      <td className="px-4 py-4 max-w-[200px] truncate" title={row.experiences.join(', ')}>
                        <div className="flex flex-wrap gap-1">
                          {row.experiences.map((exp, i) => (
                            <span key={i} className="text-[10px] bg-juno-ochre/10 text-juno-navy px-2 py-0.5 rounded inline-block">{exp}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 max-w-[300px] text-xs leading-relaxed" title={row.whyJuno}>
                        <div className="line-clamp-3">{row.whyJuno}</div>
                      </td>
                      <td className="px-4 py-4 max-w-[300px] text-xs leading-relaxed" title={row.seekingThroughTravel}>
                        <div className="line-clamp-3">{row.seekingThroughTravel}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-juno-navy/70">{row.timestamp}</td>
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
