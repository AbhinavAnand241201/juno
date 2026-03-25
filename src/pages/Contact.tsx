import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg overflow-hidden min-h-screen">
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-juno-navy/5 -skew-y-6 transform -translate-y-1/2 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block gsap-reveal">
              Contact
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-tight mb-8 text-juno-navy gsap-reveal">
              You don't need a reason <br />
              <span className="italic text-juno-ochre">to reach out.</span>
            </h1>
            <p className="text-lg md:text-2xl text-juno-navy/60 font-light leading-relaxed gsap-reveal">
              Whether you're ready to request an invitation, want to know if a trip is right for you, or just want to say hello — this is the right place.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="space-y-16 w-full max-w-3xl">
          <div className="gsap-reveal bg-juno-card p-12 rounded-[3rem] shadow-sm border border-juno-navy/5">
            <h3 className="text-xl md:text-2xl font-display font-bold text-juno-navy mb-8 uppercase tracking-widest">Reach out directly:</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <a href="mailto:info.clubjuno@gmail.com" className="flex flex-col items-center gap-4 text-lg font-light text-juno-navy/60 hover:text-juno-navy transition-colors group">
                <div className="w-16 h-16 rounded-full bg-juno-navy/5 flex items-center justify-center group-hover:bg-juno-navy group-hover:text-juno-bg transition-all duration-500">
                  <Mail className="w-6 h-6" />
                </div>
                info.clubjuno@gmail.com
              </a>
            </div>
          </div>

          <div className="gsap-reveal">
            <h3 className="text-xl font-display font-bold text-juno-navy mb-6 uppercase tracking-widest">Follow the Journey</h3>
            <div className="flex justify-center gap-8">
              <a href="https://www.instagram.com/experiencejuno?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
                <Instagram className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578476350934" target="_blank" rel="noreferrer">
                <Facebook className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com/company/experiencejuno/" target="_blank" rel="noreferrer">
                <Linkedin className="w-8 h-8 text-juno-navy/40 hover:text-juno-navy cursor-pointer transition-all duration-500 hover:scale-110" />
              </a>
            </div>
          </div>

          <div className="p-10 md:p-12 bg-juno-navy text-juno-bg rounded-[2rem] md:rounded-[3rem] gsap-reveal">
            <p className="text-lg md:text-xl font-light italic leading-relaxed">
              "We read every message. We respond to all of them."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
