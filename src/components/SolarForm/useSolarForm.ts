import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { ORBIT_RX, ORBIT_RY, QUESTIONS, TILT_RAD } from './constants';

export type Answers = Record<string, string>;

export interface PlanetState {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isActive: boolean;
}

const N = QUESTIONS.length;
const BASE_ANGLES = QUESTIONS.map((_, i) => ((2 * Math.PI) / N) * i);

export function getPlanetState(planetIdx: number, systemYRot: number, activeIdx: number): PlanetState {
  const theta = BASE_ANGLES[planetIdx] + systemYRot;
  const x = ORBIT_RX * Math.cos(theta);
  const y = ORBIT_RY * Math.sin(theta) * Math.cos(TILT_RAD);
  const z = ORBIT_RY * Math.sin(theta) * Math.sin(TILT_RAD);

  const zMax = ORBIT_RY * Math.sin(TILT_RAD);
  const zNorm = (z + zMax) / (2 * zMax);
  const isActive = planetIdx === activeIdx;

  const scale = isActive ? Math.max(0.6 + zNorm * 0.65, 1.1) : 0.5 + zNorm * 0.55;
  const opacity = isActive ? 1 : 0.28 + zNorm * 0.55;
  const zIndex = Math.round(zNorm * 20);

  return { x, y, z, scale, opacity, zIndex, isActive };
}

export function useSolarForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const systemYRot = useRef(0);
  const onPositionUpdate = useRef<((sysRot: number) => void) | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const answerQuestion = useCallback(
    (questionId: string, value: string) => {
      if (isBusy) return;
      setIsBusy(true);

      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);

      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.91,
        y: 10,
        duration: 0.28,
        ease: 'power2.in',
      });

      const targetRot = systemYRot.current - (2 * Math.PI) / N;
      const proxy = { val: systemYRot.current };

      gsap.to(proxy, {
        val: targetRot,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate() {
          systemYRot.current = proxy.val;
          onPositionUpdate.current?.(proxy.val);
        },
        onComplete() {
          systemYRot.current = targetRot;
          const next = currentStep + 1;

          if (next >= QUESTIONS.length) {
            setIsComplete(true);
            setIsBusy(false);
            gsap.fromTo(
              panelRef.current,
              { opacity: 0, scale: 0.9, y: 10 },
              { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          } else {
            setCurrentStep(next);
            gsap.fromTo(
              panelRef.current,
              { opacity: 0, scale: 0.88, y: 16 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.45,
                ease: 'back.out(1.5)',
                onComplete: () => setIsBusy(false),
              }
            );
          }
        },
      });
    },
    [answers, currentStep, isBusy]
  );

  const reset = useCallback(() => {
    const proxy = { val: systemYRot.current };
    gsap.to(proxy, {
      val: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      onUpdate() {
        systemYRot.current = proxy.val;
        onPositionUpdate.current?.(proxy.val);
      },
      onComplete() {
        systemYRot.current = 0;
        onPositionUpdate.current?.(0);
      },
    });

    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
    setIsBusy(false);
  }, []);

  return {
    currentStep,
    answers,
    isComplete,
    isBusy,
    systemYRot,
    onPositionUpdate,
    panelRef,
    answerQuestion,
    reset,
  };
}
