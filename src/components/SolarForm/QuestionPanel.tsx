import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
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

  if (isComplete) {
    return (
      <div ref={panelRef} className={styles.panel}>
        <div className={styles.completeInner}>
          <span className={styles.rocketEmoji}>🚀</span>
          <h3 className={styles.completeTitle}>Your journey awaits</h3>
          <p className={styles.completeSubtitle}>We have charted the perfect trip from your answers.</p>
          <div className={styles.answerTags}>
            {Object.values(answers).map((value, idx) => (
              <span key={`${value}-${idx}`} className={styles.aTag}>
                {value}
              </span>
            ))}
          </div>
          <button className={styles.submitBtn}>See My Itinerary</button>
          <button className={styles.resetBtn} onClick={onReset}>
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
