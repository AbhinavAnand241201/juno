import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const INTRO_KEY = 'juno_khurja_intro_seen';

export default function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    if (seen) return;

    setShow(true);
    const timer = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(INTRO_KEY, '1');
    }, 3500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999] bg-[#2A2520] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute top-[24%] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[radial-gradient(circle,_#E8A94A_30%,_#D4872A_70%,_transparent_100%)] shadow-[0_0_60px_#E8A94A,0_0_120px_rgba(232,169,74,0.3)]"
            />

            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 left-0 right-0 h-[120px] bg-[#2B5FA0]"
              style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }}
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 left-0 right-0 h-[180px] bg-[#5A6B2A]"
              style={{ clipPath: 'polygon(0 40%, 15% 20%, 30% 35%, 50% 10%, 70% 30%, 85% 15%, 100% 40%, 100% 100%, 0 100%)' }}
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 left-0 right-0 h-[250px] bg-[#D4872A]"
              style={{ clipPath: 'polygon(0 60%, 10% 40%, 25% 55%, 40% 30%, 55% 50%, 70% 25%, 85% 45%, 100% 30%, 100% 100%, 0 100%)' }}
            />
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 left-0 right-0 h-[320px] bg-[#C4622D]"
              style={{ clipPath: 'polygon(0 70%, 20% 50%, 40% 65%, 60% 40%, 80% 60%, 100% 45%, 100% 100%, 0 100%)' }}
            />

            <div className="text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(80px,15vw,160px)] leading-none text-[#F5F0E8] drop-shadow-[0_4px_40px_rgba(196,98,45,0.4)]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                J
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="text-[clamp(11px,2vw,14px)] tracking-[0.35em] uppercase text-[#E8A94A]"
              >
                Journeys of depth
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
