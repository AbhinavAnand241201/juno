import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // We use a quick setter for better performance than continuous .to() calls
    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

    const mouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the glow to center it
      xTo(e.clientX - 200);
      yTo(e.clientY - 200);
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen z-50 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(232, 160, 32, 0.15) 0%, rgba(232, 160, 32, 0) 70%)',
      }}
    />
  );
}
