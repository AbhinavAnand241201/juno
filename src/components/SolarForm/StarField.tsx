import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SolarForm.module.css';

export default function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tweens: gsap.core.Tween[] = [];
    const stars = Array.from({ length: 65 }).map(() => {
      const star = document.createElement('div');
      const size = Math.random() * 2.2 + 0.8;
      Object.assign(star.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: Math.random() > 0.6 ? '#8b78ff' : '#ffffff',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: '0',
      });
      el.appendChild(star);

      const tween = gsap.to(star, {
        opacity: Math.random() * 0.55 + 0.08,
        duration: 1.5 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 6,
      });
      tweens.push(tween);
      return star;
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      stars.forEach((star) => star.remove());
    };
  }, []);

  return <div ref={ref} className={styles.starfield} />;
}
