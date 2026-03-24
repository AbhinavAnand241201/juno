import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { X, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

type Props = { 
  open: boolean; 
  onClose: () => void;
};

export default function RequestInviteForm({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    sex: '',
    tripInterest: '',
    message: ''
  });

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields in this step');
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sex || !formData.tripInterest) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setSubmitting(true);
    try {
      const finalMessage = formData.message 
        ? `Gender: ${formData.sex}\n\n${formData.message}` 
        : `Gender: ${formData.sex}`;

      await addDoc(collection(db, 'requestInvites'), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        tripInterest: formData.tripInterest,
        message: finalMessage,
        timestamp: serverTimestamp()
      });
      toast.success("Successfully submitted. We'll get back to you soon.");
      onClose();
      // Reset form after close animation
      setTimeout(() => {
        setStep(1);
        setFormData({ fullName: '', email: '', phone: '', sex: '', tripInterest: '', message: '' });
      }, 300);
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to submit request: Insufficient Permissions or network error.');
    } finally {
      setSubmitting(false);
    }
  };

  // Variants for fluid slide animation
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        position: 'absolute' as const
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'relative' as const
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        position: 'absolute' as const
      };
    }
  };

  const direction = step === 1 ? -1 : 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 text-left">
          <motion.div 
            className="absolute inset-0 bg-juno-navy/80 backdrop-blur-sm" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="relative w-full max-w-lg bg-juno-bg rounded-[28px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            <div className="p-6 sm:p-8 bg-juno-navy text-juno-bg flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-2xl font-display font-bold mb-2">Request an Invite</h2>
                <div className="flex items-center gap-2 text-juno-sand/80 text-xs font-bold uppercase tracking-widest">
                  <span>Step {step} of 2</span>
                  <div className="flex gap-1">
                    <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-juno-sand' : 'bg-juno-sand/20'}`}></div>
                    <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-juno-sand' : 'bg-juno-sand/20'}`}></div>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto relative min-h-[420px] flex flex-col">
              <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="flex-1 flex flex-col relative">
                <AnimatePresence initial={false} custom={direction}>
                  
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                      className="w-full space-y-5"
                    >
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Full Name *</label>
                        <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors" placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Email Address *</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors" placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Phone Number *</label>
                        <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors" placeholder="+91 98765 43210" />
                      </div>

                      <div className="pt-6">
                        <button onClick={nextStep} className="w-full bg-juno-navy text-juno-bg rounded-xl py-4 flex justify-center items-center gap-2 font-bold tracking-widest uppercase text-xs hover:bg-juno-navy/90 focus:ring-2 outline-none focus:ring-juno-ochre transition-all shadow-md">
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                      className="w-full space-y-5"
                    >
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Gender *</label>
                        <select required value={formData.sex} onChange={(e) => setFormData({...formData, sex: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors appearance-none">
                          <option value="" disabled>Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer Not to Say">Prefer Not to Say</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Trip Interest *</label>
                        <select required value={formData.tripInterest} onChange={(e) => setFormData({...formData, tripInterest: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors appearance-none">
                          <option value="" disabled>Select a journey</option>
                          <option value="Khurja Craft Immersion">Clay Day - Khurja Craft Immersion</option>
                          <option value="Khurja Trip">Khurja Trip</option>
                          <option value="General Inquiry">General Invite / Waitlist</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-juno-navy/60 font-bold mb-2">Message (Optional)</label>
                        <textarea rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border border-juno-navy/20 rounded-xl px-4 py-3 text-juno-navy text-sm outline-none focus:border-juno-ochre transition-colors resize-none" placeholder="Tell us what you're looking for..." />
                      </div>

                      <div className="pt-6 flex gap-3">
                        <button type="button" onClick={prevStep} className="px-5 bg-transparent border border-juno-navy/20 text-juno-navy rounded-xl py-4 flex justify-center items-center hover:bg-juno-navy/5 focus:ring-2 outline-none focus:ring-juno-ochre transition-all">
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button type="submit" disabled={submitting} className="flex-1 bg-juno-navy text-juno-bg rounded-xl py-4 flex justify-center items-center gap-2 font-bold tracking-widest uppercase text-xs hover:bg-juno-navy/90 focus:ring-2 outline-none focus:ring-juno-ochre transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md">
                          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Request"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
