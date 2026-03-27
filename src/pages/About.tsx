/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Globe, ShieldCheck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import about1 from '../asset/About_1.png';
import about2 from '../asset/About_2.png';

gsap.registerPlugin(ScrollTrigger);

const AccordionItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="gsap-reveal border-b border-juno-navy/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <h4 className={`text-xl md:text-2xl font-display font-medium transition-colors ${isOpen ? 'text-juno-ochre' : 'text-juno-navy group-hover:text-juno-ochre'}`}>
          {question}
        </h4>
        <ChevronDown className={`w-6 h-6 text-juno-navy/40 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-juno-navy/60 font-light leading-relaxed text-lg max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animations on scroll
    const revealElements = gsap.utils.toArray('.gsap-reveal');
    revealElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Image zoom effect on scroll
    gsap.utils.toArray('.scroll-zoom').forEach((img: any) => {
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block gsap-reveal">
            About JUNO
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-tight mb-8 text-juno-navy gsap-reveal">
            Travel isn’t the problem. <br />
            <span className="italic text-juno-ochre">How we travel is.</span>
          </h1>
          <p className="text-lg md:text-2xl text-juno-navy/60 font-light leading-relaxed gsap-reveal">
            We create small, curated experiences where you don’t just visit places, you actually do things, learn something new, and come back with a story.
          </p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-juno-navy text-juno-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 lg:order-1 gsap-reveal">
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 leading-tight">
              You have everything. <br />
              <span className="italic text-juno-sand">Except something real.</span>
            </h2>
            <div className="space-y-6 text-juno-bg/60 font-light leading-relaxed text-base md:text-lg">
              <p>
                You’ve been to places. Seen the views.
              </p>
              <p>
                But the ones that stay with you? Those are different.
              </p>
              <p>
                JUNO is built around those experiences, the ones where you don’t just visit, you actually do, learn, and connect.
              </p>
            </div>
            <Link to="/contact" className="mt-12 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-juno-sand hover:text-juno-bg transition-colors">
              Request Invite <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 rounded-[3rem] overflow-hidden aspect-square gsap-reveal">
            <img 
              src={about1}
              className="scroll-zoom w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Real Experiences"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section 2 */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="rounded-[3rem] overflow-hidden aspect-square gsap-reveal">
            <img 
              src={about2}
              className="scroll-zoom w-full h-full object-cover"
              alt="Making It Accessible"
              loading="lazy"
            />
          </div>
          <div className="gsap-reveal">
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 leading-tight text-juno-navy">
              The world is out there. <br />
              <span className="italic text-juno-ochre">We just make it accessible.</span>
            </h2>
            <div className="space-y-6 text-juno-navy/60 font-light leading-relaxed text-base md:text-lg">
              <p>
                Learning pottery from a master in Khurja. Cooking with people who’ve been doing it for generations. Finding places you wouldn’t come across on your own.
              </p>
              <p>
                These experiences exist, they’re just not easy to access.
              </p>
              <p className="font-medium text-juno-navy">
                We make them simple, without taking away what makes them special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invite Only */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-juno-sand/10 border-y border-juno-sand/20">
        <div className="max-w-4xl mx-auto text-center gsap-reveal">
          <h2 className="text-3xl md:text-6xl font-display font-bold mb-12 text-juno-navy">Why invite-only?</h2>
          <div className="space-y-8 text-juno-navy/60 font-light leading-relaxed text-base md:text-lg">
            <p className="text-xl md:text-2xl font-display font-medium text-juno-navy italic">
              "Because the experience changes when the group is small."
            </p>
            <p>
              People open up more. You connect more — with the place, and with each other.
            </p>
            <p>
              Every JUNO journey is intentionally small and thoughtfully curated. That’s how we keep it meaningful.
            </p>
          </div>
          <div className="mt-16">
            <Link to="/contact" className="btn-hover-effect inline-flex px-12 py-5 bg-juno-navy text-juno-bg text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300">
              Request Invite
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {[
            { 
              title: 'Cultural Depth', 
              desc: 'We go beyond the tourist facade to connect you with the true soul of a place.',
              icon: Compass
            },
            { 
              title: 'Creative Integrity', 
              desc: 'We support and celebrate artisans, ensuring a fair and respectful exchange.',
              icon: Globe
            },
            { 
              title: 'Calm Power', 
              desc: 'Our journeys are designed to restore your focus and quiet the noise of modern life.',
              icon: ShieldCheck
            }
          ].map((pillar) => (
            <div key={pillar.title} className="text-center group gsap-reveal">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-juno-navy text-juno-bg flex items-center justify-center group-hover:bg-juno-sand group-hover:text-juno-navy transition-all duration-500 transform group-hover:rotate-12">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold mb-4 uppercase tracking-widest text-juno-navy">{pillar.title}</h4>
              <p className="text-juno-navy/40 font-light text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About FAQ Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-juno-card border-t border-juno-navy/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 gsap-reveal">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block">
              Deep Dive
            </span>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-juno-navy">Common Inquiries</h2>
          </div>
          
          <div className="border-t border-juno-navy/10">
            <AccordionItem 
              question="What is JUNO's core mission?" 
              answer="Our mission is to create journeys that go beyond sightseeing, built around meaningful experiences and real connection."
            />
            <AccordionItem 
              question="Who is the ideal JUNO traveler?" 
              answer="JUNO is for the curious and intentional people who value depth over distance, and connection over just checking things off."
            />
            <AccordionItem 
              question="What makes JUNO different from a travel agency?" 
              answer="We are curators, not agents. We don't just book trips; we design intentional experiences. Our journeys are invite-only, small-group, and focused on cultural depth and creative integrity, removing the friction between you and the extraordinary."
            />
          </div>

          <div className="mt-24 text-center gsap-reveal">
            <p className="text-juno-navy/60 font-light mb-8">Have more specific questions?</p>
            <Link to="/faq" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-juno-navy hover:text-juno-ochre transition-colors">
              Visit our full FAQ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
