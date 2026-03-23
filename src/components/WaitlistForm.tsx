/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Firestore Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface WaitlistFormProps {
  variant?: 'light' | 'dark';
  buttonText?: string;
  placeholder?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ 
  variant = 'light', 
  buttonText = 'Join the Waitlist',
  placeholder = 'your@email.com'
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setErrorMessage('');

    try {
      const path = 'waitlist';
      await addDoc(collection(db, path), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'waitlist');
      } catch (err: any) {
        try {
          const info = JSON.parse(err.message);
          setErrorMessage(info.error || 'Failed to join waitlist.');
        } catch (e) {
          setErrorMessage('An unexpected error occurred.');
        }
      }
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input 
          required
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading'}
          className={`w-full rounded-full px-8 py-5 transition-all outline-none border ${
            isDark 
              ? 'bg-white/5 border-white/10 text-juno-bg placeholder:text-juno-bg/20 focus:ring-2 focus:ring-juno-sand/30' 
              : 'bg-juno-card border-juno-navy/10 text-juno-navy placeholder:text-juno-navy/30 focus:ring-2 focus:ring-juno-navy/20'
          }`}
        />
        <button 
          disabled={status === 'loading'}
          type="submit"
          className={`btn-hover-effect px-10 py-5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-500 flex items-center justify-center gap-3 shrink-0 ${
            isDark 
              ? 'bg-juno-sand text-juno-navy' 
              : 'bg-juno-navy text-juno-bg'
          } disabled:opacity-50`}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>{buttonText} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>You're on the list. We'll be in touch soon.</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm ${
              isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-50 text-rose-600'
            }`}
          >
            <XCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaitlistForm;
