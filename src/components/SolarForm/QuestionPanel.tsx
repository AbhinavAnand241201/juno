import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { QUESTIONS, Question } from './constants';
import { Answers } from './useSolarForm';
import styles from './SolarForm.module.css';

interface Props {
  panelRef: React.RefObject<HTMLDivElement | null>;
  question: Question;
  currentStep: number;
  answers: Answers;
  isComplete: boolean;
  isBusy: boolean;
  onAnswer: (id: string, value: string) => void;
  onReset: () => void;
}

export default function QuestionPanel({
  panelRef,
  question,
  currentStep,
  answers,
  isComplete,
  isBusy,
  onAnswer,
  onReset,
}: Props) {
  const optsRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const currentValue = useMemo(() => answers[question.id] ?? '', [answers, question.id]);

  useEffect(() => {
    if (!optsRef.current || isComplete) return;
    setValue(currentValue);
    setInputError('');

    gsap.fromTo(
      optsRef.current.querySelectorAll('button, input, select'),
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.32, stagger: 0.07, ease: 'power2.out', delay: 0.12 }
    );
  }, [currentStep, isComplete, currentValue]);

  const validateValue = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setInputError('This field is required.');
      return false;
    }

    if (question.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setInputError('Please enter a valid email.');
      return false;
    }

    if (question.type === 'tel' && trimmed.replace(/[^\d]/g, '').length < 8) {
      setInputError('Please enter a valid phone number.');
      return false;
    }

    setInputError('');
    return true;
  };

  const handleNext = () => {
    if (!validateValue()) return;
    onAnswer(question.id, value.trim());
  };

  const handleSubmit = async () => {
    if (submitStatus === 'loading' || submitStatus === 'success') return;
    setSubmitStatus('loading');
    setInputError('');

    try {
      await addDoc(collection(db, 'invite_requests'), {
        name: answers.name?.trim() || '',
        email: answers.email?.trim().toLowerCase() || '',
        phone: answers.phone?.trim() || '',
        age: parseInt(answers.age || '0', 10),
        sex: answers.sex || 'Other',
        message: `City: ${answers.city?.trim() || ''} | Trip Style: ${answers.tripStyle?.trim() || ''}`,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitStatus('success');
    } catch (e: any) {
      setSubmitStatus('error');
      setInputError(e?.message || 'Failed to submit. Please try again.');
    }
  };

  if (isComplete) {
    if (submitStatus === 'success') {
      return (
        <div ref={panelRef} className={styles.panel}>
          <div className={styles.completeInner} style={{ textAlign: 'center' }}>
            <span className={styles.rocketEmoji} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={64} color="#10b981" />
            </span>
            <h3 className={styles.completeTitle}>Request Received</h3>
            <p className={styles.completeSubtitle}>Your journey is being charted. We will be in touch shortly.</p>
            <button className={styles.resetBtn} onClick={onReset} style={{ marginTop: '2rem' }}>
              Explore again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div ref={panelRef} className={styles.panel}>
        <div className={styles.completeInner}>
          <span className={styles.rocketEmoji}>🚀</span>
          <h3 className={styles.completeTitle}>Your journey awaits</h3>
          <p className={styles.completeSubtitle}>We have charted the perfect trip from your answers.</p>
          <div className={styles.answerTags}>
            {Object.values(answers).map((val, idx) => (
              <span key={`${val}-${idx}`} className={styles.aTag}>
                {val}
              </span>
            ))}
          </div>
          {submitStatus === 'error' && inputError && (
            <p className={styles.errorText} style={{ textAlign: 'center', marginTop: '1rem' }}>{inputError}</p>
          )}
          <button 
            className={styles.submitBtn} 
            onClick={handleSubmit}
            disabled={submitStatus === 'loading'}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: submitStatus === 'loading' ? 0.7 : 1 }}
          >
            {submitStatus === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'See My Itinerary'}
          </button>
          <button className={styles.resetBtn} onClick={onReset} disabled={submitStatus === 'loading'}>
            Explore again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={panelRef} className={styles.panel}>
      <div className={styles.dots}>
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={[styles.dot, i < currentStep ? styles.dotDone : '', i === currentStep ? styles.dotActive : ''].join(' ')}
          />
        ))}
        <span className={styles.stepCount}>
          {currentStep + 1} / {QUESTIONS.length}
        </span>
      </div>

      <p className={styles.questionLabel}>{question.label}</p>
      <p className={styles.questionText}>{question.text}</p>

      <div ref={optsRef} className={styles.optList}>
        {(question.type === 'text' || question.type === 'email' || question.type === 'tel') && (
          <input
            type={question.type}
            value={value}
            disabled={isBusy}
            onChange={(e) => setValue(e.target.value)}
            placeholder={question.placeholder}
            className={styles.inputField}
          />
        )}

        {question.type === 'select' && (
          <select value={value} disabled={isBusy} onChange={(e) => setValue(e.target.value)} className={styles.selectField}>
            <option value="">Select an option</option>
            {(question.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {inputError && <p className={styles.errorText}>{inputError}</p>}

        <button
          type="button"
          disabled={isBusy}
          className={[styles.opt, styles.optSel, styles.nextBtn].join(' ')}
          style={{ ['--q-color' as any]: question.color }}
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
