/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, ShieldCheck, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import IntroOverlay from '../components/IntroOverlay';
import RequestInviteForm from '../components/RequestInviteForm';

// Local assets
import heroVideo from '../asset/HERO SECTION_Option__1.mp4';
import potteryImage from '../assets/gallery/pottery.png';
import isItForYouImg from '../asset/is_it_for_u.jpg';

// Gallery images from asset folder
import exp1 from '../asset/Experience_1.png';
import exp2 from '../asset/Experience_2.jpg';
import exp3 from '../asset/Exp_3.png';
import exp4 from '../asset/EXP_4.png';
import exp5 from '../asset/EXP_5.png';
import exp6 from '../asset/EXP_6.png';
import gallery1 from '../asset/GALLERY.png';
import gallery2 from '../asset/GALLERY1.png';
import gallery3 from '../asset/GALLERY7.png';

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
      <RequestInviteForm open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Scrolling Ticker */}
      <section className="bg-[#2A2520] text-[#E8A94A] py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-[ticker_25s_linear_infinite] inline-block">
          {Array.from({ length: 4 }).map((_, idx) => (
            <span key={idx}>
              <span className="px-8 text-xs tracking-[0.2em] uppercase">Where stories, experiences and connections unfold ✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section relative h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="hero-text">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6 drop-shadow-2xl"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              "You've been everywhere.<br />
              <span className="italic text-[#E8A94A]">But have you ever truly arrived?"</span>
            </h1>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="mt-10">
              <button
                onClick={() => setBookingOpen(true)}
                className="btn-hover-effect px-12 py-5 bg-[#E8A94A] text-[#2A2520] text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-2xl hover:shadow-[#E8A94A]/30 transition-all duration-300"
              >
                Request Invite
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is JUNO Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-juno-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-juno-ochre font-bold mb-4 block">About Us</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-juno-navy mb-8 leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                What is <span className="italic text-juno-ochre">JUNO?</span>
              </h2>
              <div className="space-y-5 text-juno-navy/70 font-light leading-relaxed text-base md:text-lg">
                <p>
                  JUNO is an experiential travel platform designed for people who want more than just a trip.
                </p>
                <p>
                  Instead of rushing from one destination to another, we create journeys where you participate, learn, and connect with the places you visit. You might spend a day shaping clay with artisans in Khurja, stay in a monastery in the mountains, or cycle through quiet villages where life moves at a different pace.
                </p>
                <p>
                  Our experiences are intentionally small, thoughtfully curated, and built around real people and real places. Every journey is designed to feel personal, meaningful, and memorable.
                </p>
                <p className="font-medium text-juno-navy italic text-xl">
                  Because travel should not just show you the world — it should let you experience it.
                </p>
              </div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl">
              <img 
                src={gallery1} 
                alt="Juno Experience" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy (3 Pillars) */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-juno-navy text-juno-bg">
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
                <p className="text-juno-bg/60 text-sm font-light">Every journey is intentionally curated for depth and connection.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Journeys / Upcoming Trips */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 gsap-reveal">
          <div className="max-w-xl reveal-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-juno-navy">Upcoming Journeys</h2>
            <p className="text-juno-navy/60 font-light leading-relaxed">
              Ready to make something real? Join us on our next journey and unlock an experience the city could never give you.
            </p>
          </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Khurja Trip Card */}
          <div className="gsap-reveal reveal-left">
            <Link to="/trip/clay-day-khurja" className="group block relative aspect-[4/5] overflow-hidden rounded-3xl bg-juno-navy/5">
              <img
                src={potteryImage}
                alt="Pottery in Khurja"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-juno-navy/90 via-juno-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="text-juno-sand text-[10px] uppercase tracking-widest mb-2 font-bold">Khurja | 5th March 2026</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-juno-bg mb-3">Clay Day — Khurja Craft Immersion</h3>
                <p className="text-juno-bg/70 font-light text-sm mb-6 max-w-md">
                  Spend a day where clay becomes art and you become part of the process.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-juno-bg group-hover:text-juno-sand transition-colors mt-auto">
                  Book your free slot <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>

          {/* The Promise */}
          <div className="flex flex-col justify-center p-8 bg-juno-sand/10 rounded-3xl border border-juno-sand/20 gsap-reveal reveal-right">
            <h4 className="text-lg md:text-xl font-display font-bold text-juno-navy mb-4 uppercase tracking-widest">The Promise</h4>
            <p className="text-juno-navy/60 font-light leading-relaxed mb-8 italic text-base md:text-lg">
              "We handle everything you'd worry about. So you can forget that worry exists."
            </p>
            <ul className="space-y-6">
              {[
                'Vetted transport & stays',
                'Curated artisan communities',
                'Fair exchange and respectful travel'
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
      <section className="gallery-section py-16 md:py-24 px-6 bg-juno-bg overflow-hidden">
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
          {[exp1, exp2, exp3, exp4, exp5, exp6, gallery1, gallery2, gallery3].map((img, i) => (
            <div key={i} className="w-64 md:w-96 h-80 md:h-[30rem] shrink-0 rounded-2xl overflow-hidden hover-zoom">
              <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Gallery" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - ARCHIVED until 5th April */}
      {/* <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        Testimonials section archived until 5th April as per client request
      </section> */}

      {/* Final CTA - Is It For You */}
      <section
        className="py-24 md:py-40 px-6 text-juno-bg text-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${isItForYouImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-juno-navy/60" />
        <div className="relative z-10 max-w-4xl mx-auto gsap-reveal">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-12 leading-tight -translate-y-8">
            This isn't for everyone. <br />
            <span className="italic text-juno-sand">Is it for you?</span>
          </h2>
          <button
            onClick={() => setBookingOpen(true)}
            className="btn-hover-effect inline-flex px-14 py-6 bg-juno-bg text-juno-navy text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-2xl transition-all duration-300 translate-y-8"
          >
            Request an Invitation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
