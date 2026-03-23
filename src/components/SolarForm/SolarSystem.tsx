import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { QUESTIONS, SUN_IMAGE_URL } from './constants';
import Planet from './Planet';
import { getPlanetState } from './useSolarForm';
import styles from './SolarForm.module.css';

interface Props {
  currentStep: number;
  systemYRot: React.MutableRefObject<number>;
  onPositionUpdate: React.MutableRefObject<((r: number) => void) | null>;
}

function Sun() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(ref.current, {
      filter: 'brightness(1.08) drop-shadow(0 0 48px rgba(255, 160, 60, 0.85))',
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
    return () => tween.kill();
  }, []);

  return (
    <div ref={ref} className={styles.sun}>
      <div className={styles.sunRays} aria-hidden />
      <img
        className={styles.sunImage}
        src={SUN_IMAGE_URL}
        alt="The Sun — NASA Solar Dynamics Observatory"
        width={360}
        height={360}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function SolarSystem({ currentStep, systemYRot, onPositionUpdate }: Props) {
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applyPositions = (sysRot: number) => {
    QUESTIONS.forEach((_, i) => {
      const el = planetRefs.current[i];
      const glow = glowRefs.current[i];
      if (!el) return;

      const ps = getPlanetState(i, sysRot, currentStep);
      const activePlanetSize = 228;
      const inactivePlanetSize = 168;
      const size = ps.isActive ? activePlanetSize : inactivePlanetSize;

      gsap.set(el, {
        x: ps.x - size / 2,
        y: ps.y - size / 2,
        scale: ps.scale,
        opacity: ps.opacity,
        zIndex: ps.zIndex,
        width: size,
        height: size,
      });

      if (glow) {
        gsap.set(glow, {
          opacity: ps.isActive ? 1 : 0,
          scale: ps.isActive ? 1 : 0,
        });
      }
    });
  };

  useEffect(() => {
    applyPositions(systemYRot.current);
    onPositionUpdate.current = (rot) => applyPositions(rot);
    return () => {
      onPositionUpdate.current = null;
    };
  }, [currentStep]);

  useEffect(() => {
    const activeGlow = glowRefs.current[currentStep];
    if (!activeGlow) return;

    const glowTween = gsap.to(activeGlow, {
      boxShadow: `0 0 120px ${QUESTIONS[currentStep].color}aa, 0 0 200px ${QUESTIONS[currentStep].color}44`,
      scale: 1.12,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
    return () => glowTween.kill();
  }, [currentStep]);

  return (
    <div className={styles.solarWrapper}>
      <div className={styles.orbitRingWrapper}>
        <svg width="1500" height="540" viewBox="0 0 1500 540" fill="none" aria-hidden>
          <ellipse
            cx="750"
            cy="270"
            rx="720"
            ry="252"
            stroke="rgba(27,59,87,0.2)"
            strokeWidth="2"
            strokeDasharray="10 14"
          />
        </svg>
      </div>

      <Sun />

      <div className={styles.orrery}>
        {QUESTIONS.map((question, i) => (
          <Planet
            key={question.id}
            ref={(el) => {
              planetRefs.current[i] = el;
            }}
            glowRef={(el) => {
              glowRefs.current[i] = el;
            }}
            question={question}
          />
        ))}
      </div>
    </div>
  );
}
