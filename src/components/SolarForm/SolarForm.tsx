import React, { useEffect } from 'react';
import gsap from 'gsap';
import styles from './SolarForm.module.css';
import StarField from './StarField';
import SolarSystem from './SolarSystem';
import QuestionPanel from './QuestionPanel';
import { QUESTIONS } from './constants';
import { useSolarForm } from './useSolarForm';

export default function SolarForm() {
  const { currentStep, answers, isComplete, isBusy, systemYRot, onPositionUpdate, panelRef, answerQuestion, reset } =
    useSolarForm();

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.88, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)', delay: 0.3 }
    );
  }, []);

  return (
    <section className={styles.root}>
      <StarField />

      <div className={styles.layout}>
        <div className={styles.sceneWrapper}>
          <SolarSystem currentStep={currentStep} systemYRot={systemYRot} onPositionUpdate={onPositionUpdate} />
        </div>

        <QuestionPanel
          panelRef={panelRef}
          question={QUESTIONS[Math.min(currentStep, QUESTIONS.length - 1)]}
          currentStep={currentStep}
          answers={answers}
          isComplete={isComplete}
          isBusy={isBusy}
          onAnswer={answerQuestion}
          onReset={reset}
        />
      </div>
    </section>
  );
}
