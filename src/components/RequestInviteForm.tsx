import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Loader2, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

type Props = { 
  open: boolean; 
  onClose: () => void;
};

const EXPERIENCES = [
  "Pottery & Craft",
  "Food & Culinary Culture",
  "Wellness & Reflection",
  "Nature & Slow Travel",
  "Music & Cultural Immersion",
  "Creative Workshops"
];

export default function RequestInviteForm({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    state: '',
    instagram: '',
    occupation: '',
    hobbies: '',
    experiences: [] as string[],
    whyJuno: '',
    seekingThroughTravel: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExperienceToggle = (exp: string) => {
    setFormData(prev => {
      const current = prev.experiences;
      if (current.includes(exp)) {
        return { ...prev, experiences: current.filter(e => e !== exp) };
      }
      if (current.length < 3) {
        return { ...prev, experiences: [...current, exp] };
      }
      return prev;
    });
  };

  const isStep1Valid = formData.name && formData.age && formData.gender && formData.phone && formData.email && formData.state;
  const isStep2Valid = formData.instagram && formData.occupation && formData.hobbies;
  const isStep3Valid = formData.experiences.length > 0 && formData.experiences.length <= 3 && formData.whyJuno && formData.seekingThroughTravel;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;
    
    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'invite_requests_v2'), {
        ...formData,
        age: Number(formData.age),
        status: 'pending',
        timestamp: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setStep(1);
    setFormData({
      name: '', age: '', gender: '', phone: '', email: '', state: '',
      instagram: '', occupation: '', hobbies: '', experiences: [],
      whyJuno: '', seekingThroughTravel: ''
    });
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-juno-bg/80 backdrop-blur-sm"
          data-lenis-prevent="true"
        >
          <div className="flex min-h-full items-center justify-center p-4 py-12">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-juno-bg border border-juno-navy/10 shadow-2xl rounded-2xl w-full max-w-2xl relative"
            >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 text-juno-navy/60 hover:text-juno-navy rounded-full hover:bg-black/5 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-display text-juno-navy mb-3">Request an Invite</h2>
                <p className="text-juno-navy/60 text-sm md:text-base">
                  Tell us a bit about yourself to join our curated community.
                </p>
              </div>

              {/* Progress Bar */}
              {!success && (
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        step >= i ? 'bg-juno-ochre' : 'bg-juno-navy/10'
                      }`}
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-display text-juno-navy mb-4">Request Submitted</h3>
                  <p className="text-juno-navy/60">
                    Thank you for your interest in JUNO. We will review your application and get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Full Name</label>
                          <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Age</label>
                          <input required type="number" name="age" min="18" max="100" value={formData.age} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="25" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Email Address</label>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Phone Number</label>
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Gender</label>
                          <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors appearance-none">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">State / City</label>
                          <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="Maharashtra" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Profile Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Instagram Handle</label>
                          <input required type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="@username" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Occupation</label>
                          <input required type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="Designer, Engineer, etc." />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Name 2 Hobbies of yours</label>
                        <input required type="text" name="hobbies" value={formData.hobbies} onChange={handleInputChange} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors" placeholder="Photography, Reading" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Travel Preferences */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-4">
                          Which of these experiences resonate most with you? *
                          <span className="block text-[#a0a0a0] normal-case tracking-normal mt-1">Make between 1 and 3 choices</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {EXPERIENCES.map((exp) => {
                            const isSelected = formData.experiences.includes(exp);
                            const isDisabled = !isSelected && formData.experiences.length >= 3;
                            return (
                              <button
                                type="button"
                                key={exp}
                                onClick={() => handleExperienceToggle(exp)}
                                disabled={isDisabled}
                                className={`p-4 text-left border rounded-xl transition-all flex items-center justify-between
                                  ${isSelected 
                                    ? 'border-juno-ochre bg-juno-ochre/5 text-juno-navy' 
                                    : 'border-juno-navy/10 text-juno-navy/70 hover:border-juno-navy/30'
                                  }
                                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                              >
                                <span className="text-sm">{exp}</span>
                                {isSelected && <Check className="w-4 h-4 text-juno-ochre" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">Why do you want to join JUNO?</label>
                        <textarea required name="whyJuno" value={formData.whyJuno} onChange={handleInputChange} rows={3} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors resize-none" placeholder="Tell us what draws you to our experiences..." />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-juno-navy/70 uppercase mb-2">In one sentence, what are you currently seeking through travel?</label>
                        <textarea required name="seekingThroughTravel" value={formData.seekingThroughTravel} onChange={handleInputChange} rows={2} className="w-full bg-transparent border-b border-juno-navy/20 py-3 text-juno-navy focus:border-juno-ochre focus:outline-none transition-colors resize-none" placeholder="Type your answer here..." />
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-6 mt-8 border-t border-juno-navy/10 flex gap-4">
                    {step > 1 && (
                      <button type="button" onClick={handlePrev} className="px-6 py-4 border border-juno-navy/20 text-juno-navy rounded-xl hover:bg-black/5 transition-colors flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    )}
                    
                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNext} 
                        disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                        className="flex-1 bg-juno-navy text-juno-bg rounded-xl py-4 flex justify-center items-center gap-2 font-bold tracking-widest uppercase text-xs hover:bg-juno-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={submitting || !isStep3Valid}
                        className="flex-1 bg-juno-ochre text-white rounded-xl py-4 flex justify-center items-center gap-2 font-bold tracking-widest uppercase text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Request'}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
