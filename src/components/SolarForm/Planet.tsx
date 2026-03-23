import React, { forwardRef } from 'react';
import { Question } from './constants';
import styles from './SolarForm.module.css';

interface Props {
  question: Question;
  glowRef: (el: HTMLDivElement | null) => void;
}

const Planet = forwardRef<HTMLDivElement, Props>(({ question, glowRef }, ref) => {
  return (
    <div
      ref={ref}
      className={styles.planet}
      style={{
        position: 'absolute',
        background: question.planetBg,
        border: `1.5px solid ${question.color}55`,
      }}
    >
      <div
        ref={glowRef}
        className={styles.planetGlow}
        style={{ ['--glow-color' as any]: question.color }}
      />
      <span className={styles.planetIcon}>{question.icon}</span>
      <span className={styles.planetLabel}>{question.id}</span>
    </div>
  );
});

Planet.displayName = 'Planet';
export default Planet;
