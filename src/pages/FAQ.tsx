/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type FAQItem = {
  question: string;
  answer: string;
  category: 'Journeys' | 'Booking' | 'Safety' | 'Experience';
};

const AccordionItem: React.FC<{ question: string; answer: string; category: FAQItem['category'] }> = ({
  question,
  answer,
  category
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="gsap-reveal border-b border-juno-navy/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <h4 className={`text-xl md:text-2xl font-display font-medium transition-colors ${isOpen ? 'text-juno-ochre' : 'text-juno-navy group-hover:text-juno-ochre'}`}>
          <span className="block text-xs uppercase tracking-[0.25em] text-juno-navy/40 mb-2">{category}</span>
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

const FAQ = () => {
  const container = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const faqs: FAQItem[] = [
    {
      question: "Who is JUNO actually for?",
      answer: "People who are quietly tired of ordinary weekends. Professionals, creatives, and curious minds between 25–40 who want to make something real — and don't know where to start. If you felt something reading this page, it's probably for you.",
      category: 'Experience'
    },
    {
      question: "What does \"invite-only\" actually mean?",
      answer: "It means we don't run open registrations. You request a seat, we have a brief conversation, and we make sure the fit is right — for you and for the group. It's not exclusive for the sake of ego. It's intentional for the sake of experience.",
      category: 'Booking'
    },
    {
      question: "Do I need skills or experience?",
      answer: "Bring none. Our artisans are extraordinary teachers. The only prerequisite is genuine curiosity.",
      category: 'Experience'
    },
    {
      question: "What's included?",
      answer: "Everything that removes friction — curated transport from Delhi, handpicked accommodation, all workshop sessions, most meals, and our team on the ground with you. The full breakdown is shared before you commit a single rupee.",
      category: 'Journeys'
    },
    {
      question: "How small is small?",
      answer: "Twelve. That's the ceiling. We won't cross it.",
      category: 'Experience'
    },
    {
      question: "What about safety?",
      answer: "Every vehicle, partner, and property is personally vetted. You'll never be handed off to a stranger. Our team is present from departure to return.",
      category: 'Safety'
    },
    {
      question: "Can I cancel?",
      answer: "Life happens — we understand that. Our policy is fair and fully transparent. We'll walk you through it before you book.",
      category: 'Booking'
    },
    {
      question: "When do I get trip details?",
      answer: "You receive your full itinerary, packing notes, weather guidance, and host contacts right after your seat is confirmed.",
      category: 'Journeys'
    },
    {
      question: "Can I join solo?",
      answer: "Absolutely. Most members join solo, and the journeys are designed to make conversation and comfort natural from day one.",
      category: 'Experience'
    },
    {
      question: "How do payments work?",
      answer: "A confirmation fee secures your seat. The balance follows a transparent milestone schedule, shared clearly before you commit.",
      category: 'Booking'
    }
  ];
  const filteredFaqs = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return faqs;
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search) ||
      faq.category.toLowerCase().includes(search)
    );
  }, [faqs, query]);

  useGSAP(() => {
    // Ensure triggers are fresh
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });

    gsap.from('.gsap-reveal', {
      y: 30,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-juno-navy/5 -skew-x-12 transform translate-x-1/4 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block gsap-reveal">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-tight mb-8 text-juno-navy gsap-reveal">
              Real Answers. <br />
              <span className="italic text-juno-ochre">No Fine Print.</span>
            </h1>
            <p className="text-lg md:text-2xl text-juno-navy/60 font-light leading-relaxed gsap-reveal">
              Everything you'd want to know before saying yes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="gsap-reveal mb-10 md:mb-14">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-juno-navy/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by question, answer, or category..."
              className="w-full bg-white/70 border border-juno-navy/10 rounded-2xl py-4 pl-14 pr-4 text-juno-navy outline-none focus:ring-2 focus:ring-juno-ochre/30 transition-all"
            />
          </div>
          <p className="mt-3 text-sm text-juno-navy/50">
            Showing {filteredFaqs.length} of {faqs.length} answers
          </p>
        </div>

        <div className="border-t border-juno-navy/10">
          {filteredFaqs.map((faq, idx) => (
            <AccordionItem key={`${faq.question}-${idx}`} question={faq.question} answer={faq.answer} category={faq.category} />
          ))}
        </div>
        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl border border-juno-navy/10 bg-juno-card text-juno-navy/70"
          >
            No FAQ matched your search yet. Try shorter keywords like `booking`, `safety`, or `solo`.
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 gsap-reveal">
          {[
            { title: 'Response Time', value: '<24 hrs' },
            { title: 'Avg Group Size', value: '10-12' },
            { title: 'Host Support', value: '24/7' }
          ].map((stat) => (
            <motion.div
              key={stat.title}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-6 rounded-2xl border border-juno-navy/10 bg-white/50"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-juno-navy/50 mb-2">{stat.title}</div>
              <div className="text-2xl font-display font-bold text-juno-navy">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="gsap-reveal mt-24 md:mt-40 p-10 md:p-24 bg-juno-navy text-juno-bg rounded-[3rem] md:rounded-[4rem] text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 text-juno-sand text-xs tracking-[0.3em] uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Need a custom answer?
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-10 leading-tight">Still wondering something?</h3>
          <Link to="/contact" className="btn-hover-effect inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-juno-sand hover:text-juno-bg transition-all group">
            Just ask us <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
