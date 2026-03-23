/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone
} from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import ReactQuill from 'react-quill-new';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    sex: 'Male',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ age?: string; phone?: string; email?: string }>({});
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: container });

  const validateForm = () => {
    const nextErrors: { age?: string; phone?: string; email?: string } = {};
    const normalizedPhone = formData.phone.replace(/[^\d+]/g, '');
    const parsedAge = Number(formData.age);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (normalizedPhone.length < 8 || normalizedPhone.length > 16) {
      nextErrors.phone = 'Phone number should be between 8 and 16 characters.';
    }
    if (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 120) {
      nextErrors.age = 'Age must be between 18 and 120.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setErrorMessage('Please correct highlighted fields and submit again.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const path = 'invite_requests';
      await addDoc(collection(db, path), {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        age: parseInt(formData.age, 10),
        sex: formData.sex,
        message: formData.message.replace(/<[^>]*>/g, '').trim(),
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', age: '', sex: 'Male', message: '' });
      setFieldErrors({});
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'invite_requests');
      } catch (err: any) {
        try {
          const info = JSON.parse(err.message);
          setErrorMessage(info.error || 'Failed to submit request. Please try again.');
        } catch (e) {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div ref={container} className="bg-juno-bg overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-full bg-juno-navy/5 -skew-y-6 transform -translate-y-1/2 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block gsap-reveal">
              Contact
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-tight mb-8 text-juno-navy gsap-reveal">
              You don't need a reason <br />
              <span className="italic text-juno-ochre">to reach out.</span>
            </h1>
            <p className="text-lg md:text-2xl text-juno-navy/60 font-light leading-relaxed gsap-reveal">
              Whether you're ready to request an invitation, want to know if a trip is right for you, or just want to say hello — this is the right place.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* Info */}
        <div className="space-y-12 md:space-y-16">
          <div className="gsap-reveal">
            <h3 className="text-xl md:text-2xl font-display font-bold text-juno-navy mb-8 uppercase tracking-widest">Or find us here:</h3>
            <div className="space-y-6">
              <a href="mailto:hello@junojourneys.in" className="flex items-center gap-4 text-base md:text-lg font-light text-juno-navy/60 hover:text-juno-navy transition-colors group">
                <div className="w-12 h-12 rounded-full bg-juno-navy/5 flex items-center justify-center group-hover:bg-juno-navy group-hover:text-juno-bg transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                hello@junojourneys.in
              </a>
              <a href="tel:+910000000000" className="flex items-center gap-4 text-base md:text-lg font-light text-juno-navy/60 hover:text-juno-navy transition-colors group">
                <div className="w-12 h-12 rounded-full bg-juno-navy/5 flex items-center justify-center group-hover:bg-juno-navy group-hover:text-juno-bg transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                +91 00000 00000
              </a>
            </div>
          </div>

          <div className="gsap-reveal">
            <h3 className="text-xl md:text-2xl font-display font-bold text-juno-navy mb-8 uppercase tracking-widest">Follow the Journey:</h3>
            <div className="flex gap-6">
              <Instagram className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
              <Twitter className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
              <Facebook className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
            </div>
          </div>

          <div className="p-8 md:p-12 bg-juno-navy text-juno-bg rounded-[2rem] md:rounded-[3rem] gsap-reveal">
            <p className="text-lg md:text-xl font-light italic leading-relaxed">
              "We read every message. We respond to all of them."
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-16 bg-juno-card rounded-[2rem] md:rounded-[3rem] border border-juno-navy/5 shadow-2xl gsap-reveal">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">Full Name</label>
              <motion.input 
                required
                type="text"
                value={formData.name}
                whileFocus={{ scale: 1.01 }}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-juno-bg border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-juno-ochre/20 transition-all outline-none text-juno-navy"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">Email Address</label>
              <motion.input 
                required
                type="email"
                value={formData.email}
                whileFocus={{ scale: 1.01 }}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                }}
                className={`w-full bg-juno-bg border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-juno-ochre/20 transition-all outline-none text-juno-navy ${fieldErrors.email ? 'ring-2 ring-rose-300' : ''}`}
                placeholder="john@example.com"
              />
              {fieldErrors.email && <p className="text-xs text-rose-600">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">Phone Number</label>
                <motion.input 
                  required
                  type="tel"
                  value={formData.phone}
                  whileFocus={{ scale: 1.01 }}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: undefined });
                  }}
                  className={`w-full bg-juno-bg border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-juno-ochre/20 transition-all outline-none text-juno-navy ${fieldErrors.phone ? 'ring-2 ring-rose-300' : ''}`}
                  placeholder="+91 00000 00000"
                />
                {fieldErrors.phone && <p className="text-xs text-rose-600">{fieldErrors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">Age</label>
                <motion.input 
                  required
                  type="number"
                  min="18"
                  max="120"
                  value={formData.age}
                  whileFocus={{ scale: 1.01 }}
                  onChange={(e) => {
                    setFormData({...formData, age: e.target.value});
                    if (fieldErrors.age) setFieldErrors({ ...fieldErrors, age: undefined });
                  }}
                  className={`w-full bg-juno-bg border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-juno-ochre/20 transition-all outline-none text-juno-navy ${fieldErrors.age ? 'ring-2 ring-rose-300' : ''}`}
                  placeholder="25"
                />
                {fieldErrors.age && <p className="text-xs text-rose-600">{fieldErrors.age}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">Sex</label>
              <select 
                required
                value={formData.sex}
                onChange={(e) => setFormData({...formData, sex: e.target.value})}
                className="w-full bg-juno-bg border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-juno-ochre/20 transition-all outline-none text-juno-navy appearance-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-juno-navy/40 ml-1 font-bold">What's on your mind?</label>
              <ReactQuill 
                theme="snow"
                value={formData.message}
                onChange={(content) => setFormData({...formData, message: content})}
                placeholder="Tell us about your curiosity..."
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                  ],
                }}
              />
            </div>

            <motion.button 
              disabled={status === 'loading'}
              type="submit"
              whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
              className="btn-hover-effect w-full py-5 bg-juno-navy text-juno-bg text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>Send <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-4 text-emerald-600"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <div className="font-bold">Message Received</div>
                    <div className="text-sm opacity-80">We've received your message. We'll be in touch within 24 hours.</div>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-4 text-rose-600"
                >
                  <XCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <div className="font-bold">Submission Failed</div>
                    <div className="text-sm opacity-80">{errorMessage}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
