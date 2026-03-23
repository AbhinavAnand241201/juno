import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

type Props = { open: boolean; onClose: () => void };

const TOTAL_STEPS = 7;

export default function KhurjaForm({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    city: '',
    email: '',
    phone: '',
    exoticDestinations: '',
  });
  const stepLabel = useMemo(() => `Step ${step + 1} of ${TOTAL_STEPS}`, [step]);

  const close = () => {
    setStep(0);
    setSuccess(false);
    setError('');
    onClose();
  };

  const validateStep = () => {
    if (step === 0 && !formData.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    if (step === 1) {
      const age = Number(formData.age);
      if (!Number.isInteger(age) || age < 18 || age > 120) {
        setError('Please enter a valid age between 18 and 120.');
        return false;
      }
    }
    if (step === 2 && !formData.sex) {
      setError('Please select one option.');
      return false;
    }
    if (step === 3 && !formData.city.trim()) {
      setError('Please enter your city.');
      return false;
    }
    if (step === 4 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (step === 5 && formData.phone.replace(/[^\d]/g, '').length < 8) {
      setError('Please enter a valid phone number.');
      return false;
    }
    if (step === 6 && !formData.exoticDestinations.trim()) {
      setError('Please share your destination ideas.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'khurja_bookings'), {
        tripSlug: 'clay-day-khurja-craft-immersion',
        name: formData.name.trim(),
        age: Number(formData.age),
        sex: formData.sex,
        city: formData.city.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        exoticDestinations: formData.exoticDestinations.trim(),
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      await addDoc(collection(db, 'invite_requests'), {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        sex: formData.sex,
        message: `City: ${formData.city.trim()} | Top destinations: ${formData.exoticDestinations.trim()}`,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message || 'Could not save booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[600] p-4 md:p-6 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-[#2A2520]/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-[28px] bg-[#FAF7F2] shadow-[0_40px_120px_rgba(42,37,32,0.35)]"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#C4622D] to-[#D4872A] px-7 md:px-10 py-8 text-[#FAF7F2]">
              <div className="absolute right-0 bottom-[-28px] font-serif text-[140px] leading-none text-white/10">J</div>
              <div className="flex justify-between items-start relative z-10">
                <div className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>JUNO</div>
                <button onClick={close} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-lg">
                  ✕
                </button>
              </div>
              <div className="mt-5 relative z-10">
                <h3 className="italic text-2xl" style={{ fontFamily: '"Playfair Display", serif' }}>Clay Day - Khurja Craft Immersion</h3>
                <p className="text-xs tracking-[0.14em] uppercase text-white/75 mt-1">Reserve your experience</p>
              </div>
              <div className="mt-5 flex items-center gap-2 relative z-10">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <span key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-8 bg-white' : 'w-4 bg-white/45'}`} />
                ))}
                <span className="ml-1 text-xs tracking-[0.1em] uppercase text-white/70">{stepLabel}</span>
              </div>
            </div>

            <div className="p-7 md:p-10 overflow-y-auto max-h-[calc(92vh-210px)]">
              {success ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                    className="text-6xl mb-4"
                  >
                    🏺
                  </motion.div>
                  <h4 className="text-3xl text-[#2A2520]" style={{ fontFamily: '"Playfair Display", serif' }}>You&apos;re on the list!</h4>
                  <p className="mt-3 text-[#7b6f63]">We&apos;ll be in touch within 24 hours to confirm your spot.</p>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    {step === 0 && (
                      <Field label="1" title="What's your full name?">
                        <input
                          className="kh-input"
                          placeholder="First & Last Name"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        />
                      </Field>
                    )}
                    {step === 1 && (
                      <Field label="2" title="How old are you?">
                        <input
                          type="number"
                          className="kh-input"
                          placeholder="Age"
                          value={formData.age}
                          onChange={(e) => setFormData((p) => ({ ...p, age: e.target.value }))}
                        />
                      </Field>
                    )}
                    {step === 2 && (
                      <Field label="3" title="How do you identify?">
                        <PillGroup items={['Male', 'Female', 'Other']} value={formData.sex} onChange={(v) => setFormData((p) => ({ ...p, sex: v }))} />
                      </Field>
                    )}
                    {step === 3 && (
                      <Field label="4" title="Which city are you based in?">
                        <input
                          className="kh-input"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                        />
                      </Field>
                    )}
                    {step === 4 && (
                      <Field label="5" title="What's your email address?">
                        <input
                          type="email"
                          className="kh-input"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        />
                      </Field>
                    )}
                    {step === 5 && (
                      <Field label="6" title="And your phone number?">
                        <input
                          type="tel"
                          className="kh-input"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </Field>
                    )}
                    {step === 6 && (
                      <Field label="7" title="Name your top 5 exotic destinations to visit.">
                        <p className="text-[#618A4D] text-sm mt-[-6px] mb-2">Anywhere in the world. Dream big.</p>
                        <textarea
                          className="kh-input resize-none"
                          rows={3}
                          placeholder="1. Kyoto, 2. Patagonia..."
                          value={formData.exoticDestinations}
                          onChange={(e) => setFormData((p) => ({ ...p, exoticDestinations: e.target.value }))}
                        />
                      </Field>
                    )}
                    {error && (
                      <div className="rounded-xl border border-rose-300/50 bg-rose-100 px-4 py-3 text-sm text-rose-700">
                        {error}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {!success && (
              <div className="border-t border-[#E8DCC8] px-7 md:px-10 py-5 flex justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`text-sm text-[#8A7A6A] ${step === 0 ? 'invisible' : 'visible'} hover:text-[#2A2520]`}
                >
                  ← Back
                </button>
                <button
                  disabled={submitting}
                  onClick={() => (step < TOTAL_STEPS - 1 ? handleNext() : handleSubmit())}
                  className="rounded-full px-7 py-3 bg-[#C4622D] hover:bg-[#2A2520] text-[#FAF7F2] text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {step < TOTAL_STEPS - 1 ? 'Continue →' : submitting ? 'Submitting...' : 'Submit Journey'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium text-[#2A2520] mb-2 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-[#C4622D] text-white text-[11px] grid place-items-center">{label}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function PillGroup({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-4 py-2 text-sm border transition ${
            value === item ? 'bg-[#C4622D] border-[#C4622D] text-white' : 'bg-white border-[#E8DCC8] text-[#2A2520]'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
