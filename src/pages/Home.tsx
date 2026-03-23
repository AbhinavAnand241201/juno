/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import IntroOverlay from '../components/IntroOverlay';
import KhurjaForm from '../components/KhurjaForm';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useGSAP(() => {
    // Hero Text Animation
    gsap.from('.hero-text', {
      y: 60,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    });

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

    gsap.utils.toArray('.reveal-left').forEach((el: any) => {
      gsap.fromTo(
        el,
        { x: -35, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    gsap.utils.toArray('.reveal-right').forEach((el: any) => {
      gsap.fromTo(
        el,
        { x: 35, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    // Parallax effect for hero image
    gsap.to('.hero-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Horizontal scroll for gallery teaser
    const track = document.querySelector('.gallery-track');
    if (track) {
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const xDist = scrollWidth - windowWidth + 100;

      gsap.to('.gallery-track', {
        x: -xDist,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top center',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg overflow-hidden">
      <IntroOverlay />
      <KhurjaForm open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <section className="bg-[#2A2520] text-[#E8A94A] py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-[ticker_25s_linear_infinite] inline-block">
          {Array.from({ length: 2 }).map((_, idx) => (
            <span key={idx}>
              <span className="px-8 text-xs tracking-[0.2em] uppercase">Khurja Craft Immersion ✦</span>
              <span className="px-8 text-xs tracking-[0.2em] uppercase">Clay. Culture. Connection ✦</span>
              <span className="px-8 text-xs tracking-[0.2em] uppercase">Just beyond Delhi ✦</span>
              <span className="px-8 text-xs tracking-[0.2em] uppercase">Limited seats available ✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2070" 
            className="hero-img w-full h-full object-cover opacity-60 scale-110"
            alt="Luxury Travel"
            loading="eager"
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-juno-bg/60 via-transparent to-juno-bg" />
          <div className="floating-orb absolute top-16 left-10 w-28 h-28 bg-juno-sand/30 rounded-full blur-2xl" />
          <div className="floating-orb-delayed absolute bottom-20 right-20 w-36 h-36 bg-juno-ochre/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <div className="hero-text">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block">
              Day Trip from Delhi
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-none mb-8 tracking-tighter text-juno-navy">
              Clay Day - <br />
              <span className="italic text-juno-ochre">Khurja Craft Immersion</span>
            </h1>
            <p className="text-base md:text-xl text-juno-navy/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed px-4">
              Step inside working pottery workshops, meet the makers, and create something with your own hands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-hover-effect px-14 py-6 bg-juno-navy text-juno-bg text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  Reserve your spot <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tension Line */}
      <section className="py-24 md:py-40 text-center px-6 gsap-reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-light text-juno-navy italic leading-relaxed">
            "You've been everywhere. But have you ever truly arrived?"
          </h2>
        </div>
      </section>

      {/* Philosophy (3 Pillars) */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-juno-navy text-juno-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {[
            { 
              title: 'Create', 
              desc: 'Reconnect with your restless hands through master-led workshops and craft revival.',
              icon: Compass
            },
            { 
              title: 'Explore', 
              desc: 'Venture into the raw, high-octane pulse of a world that exists entirely beyond the screen.',
              icon: Globe
            },
            { 
              title: 'Restore', 
              desc: 'Find calm in the intentional silence of a journey designed to help you truly arrive.',
              icon: ShieldCheck
            }
          ].map((pillar, idx) => (
            <motion.div 
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="text-center group gsap-reveal"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-juno-sand/20 flex items-center justify-center group-hover:bg-juno-sand group-hover:text-juno-navy transition-all duration-500 transform group-hover:rotate-12">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 tracking-widest uppercase">{pillar.title}</h3>
              <p className="text-juno-bg/60 font-light leading-relaxed text-sm md:text-base">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Journeys */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 gsap-reveal">
          <div className="max-w-xl reveal-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-juno-navy">Upcoming Journeys</h2>
            <p className="text-juno-navy/60 font-light leading-relaxed">
              Ready to make something real? Join us on our next journey and unlock an experience the city could never give you.
            </p>
          </div>
          <Link to="/gallery" className="group text-xs font-bold tracking-widest uppercase text-juno-navy hover:text-juno-ochre transition-colors flex items-center gap-2">
            View Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="gsap-reveal reveal-left">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-juno-navy/5">
              <img 
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000" 
                alt="Pottery in Khurja" 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-juno-navy/90 via-juno-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="text-juno-sand text-[10px] uppercase tracking-widest mb-2 font-bold">Khurja | Coming Soon</div>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-juno-bg mb-4">Clay & Quiet</h3>
                <p className="text-juno-bg/60 font-light text-sm mb-6 max-w-md">
                  Wheel-thrown. Sun-dried. Fired at dawn. A weekend with a master potter and eleven strangers.
                </p>
                <Link to="/invite" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-juno-bg hover:text-juno-sand transition-colors">
                  I want in <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12 bg-juno-sand/10 rounded-3xl border border-juno-sand/20 gsap-reveal reveal-right">
            <h4 className="text-lg md:text-xl font-display font-bold text-juno-navy mb-4 uppercase tracking-widest">The Promise</h4>
            <p className="text-juno-navy/60 font-light leading-relaxed mb-8 italic text-base md:text-lg">
              "We handle everything you'd worry about. So you can forget that worry exists."
            </p>
            <ul className="space-y-6">
              {[
                'Vetted transport & stays',
                'Minimal group per journey',
                'Fair exchange with artisan communities'
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm md:text-base font-medium text-juno-navy">
                  <div className="w-6 h-6 rounded-full bg-juno-navy text-juno-bg flex items-center justify-center text-[10px] shrink-0">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section py-24 md:py-40 px-6 bg-juno-bg overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16 gsap-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-juno-navy">Ready to see the world JUNO opens up?</h2>
          <p className="text-juno-navy/60 font-light max-w-2xl mx-auto">
            Every image is a room you haven't walked into yet.
          </p>
          <Link to="/gallery" className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-juno-navy hover:text-juno-ochre transition-colors">
            View More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="gallery-track flex gap-4 md:gap-8">
          {[
            'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600'
          ].map((img, i) => (
            <div key={i} className="w-64 md:w-96 h-80 md:h-[30rem] shrink-0 rounded-2xl overflow-hidden hover-zoom">
              <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Gallery" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 gsap-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-juno-navy">Traveler Testimonials</h2>
          <p className="text-juno-navy/60 font-light max-w-2xl mx-auto">
            Discover what our guests have to say about their journeys with us. From the first touch of wet clay to the long drive home in silence — their words say what ours cannot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { name: 'James W.', role: 'Creative Director', text: 'The most seamless travel experience I\'ve ever had. Truly exceptional service.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
            { name: 'Sarah L.', role: 'Architect', text: 'JUNO reconnected me with the tactile world. The pottery workshop in Khurja was life-changing.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
            { name: 'Michael R.', role: 'Tech Founder', text: 'A quiet luxury that is hard to find. The small group size made all the difference.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' }
          ].map((t, idx) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -8 }}
              className="p-8 bg-juno-bg border border-juno-navy/5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 gsap-reveal"
            >
              <p className="text-juno-navy/80 font-light italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} className="w-12 h-12 rounded-full object-cover" alt={t.name} loading="lazy" referrerPolicy="no-referrer" />
                <div>
                  <div className="text-sm font-bold text-juno-navy uppercase tracking-widest">{t.name}</div>
                  <div className="text-[10px] text-juno-navy/40 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 px-6 bg-juno-navy text-juno-bg text-center">
        <div className="max-w-4xl mx-auto gsap-reveal">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
            This isn't for everyone. <br />
            <span className="italic text-juno-sand">Is it for you?</span>
          </h2>
          <Link to="/invite" className="btn-hover-effect inline-flex px-14 py-6 bg-juno-bg text-juno-navy text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-2xl transition-all duration-300">
            Request an Invitation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
