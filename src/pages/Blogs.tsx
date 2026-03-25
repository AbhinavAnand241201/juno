import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import blogsImg from '../asset/Vlogs.jpg';

import RequestInviteForm from '../components/RequestInviteForm';
const Blogs = () => {
  const container = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = React.useState(false);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 30,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg min-h-screen overflow-hidden">
      <RequestInviteForm open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={blogsImg}
          alt="Juno Blogs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-juno-bg via-juno-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12">
          <div className="max-w-7xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-juno-ochre font-bold mb-3 block gsap-reveal">Stories & Insights</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight gsap-reveal"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              The JUNO <span className="italic text-juno-sand">Journal</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Article Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">

        {/* Article Meta */}
        <div className="gsap-reveal mb-10 flex flex-wrap gap-6 items-center text-sm text-juno-navy/50">
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-juno-ochre" />
            <span className="text-juno-ochre font-bold uppercase tracking-widest text-[10px]">Experiential Travel</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            4 min read
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            By the JUNO Editorial Team
          </span>
        </div>

        {/* Article Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-juno-navy mb-10 leading-tight"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Khurja: The Ceramic Capital Two Hours from Delhi That Most People Drive Past
        </motion.h1>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none space-y-8 text-juno-navy/80 font-light leading-relaxed">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl md:text-2xl font-light text-juno-navy/70 italic border-l-4 border-juno-ochre pl-6"
          >
            There's a town in western Uttar Pradesh that produces a quiet fraction of the cups you've drunk chai from, the plates your office canteen uses, the ceramic tiles lining countless Delhi bathrooms. Most people have never heard of it. Fewer have been.
          </motion.p>

          <p>
            Khurja doesn't announce itself. There are no billboards on the highway. No travel influencer has made it famous yet. And that, honestly, is most of its charm.
          </p>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy pt-6"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            A City Built on Clay
          </h2>
          <p>
            About 85 kilometres from Delhi, Khurja has been a centre of ceramic and pottery production for centuries — some accounts trace the craft back to the Mughal period, when artisans from Central Asia are said to have settled here and shaped its distinct blue-and-white aesthetic.
          </p>
          <p>
            Today, it produces an estimated 60% of India's crockery, alongside fine decorative ceramics, glazed tiles, and traditional pottery.
          </p>
          <p>
            Walk through the older quarters and the evidence is everywhere — walls stacked with drying pieces, workshops open to the street, the particular chalky smell of unfired clay in the air. It is a working town, not a heritage installation. The craft here is alive because it is economic, not because it has been preserved for visitors.
          </p>
          <p className="font-medium text-juno-navy italic">
            That distinction matters. It changes how an experience feels.
          </p>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy pt-6"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            What a Real Visit Looks Like
          </h2>
          <p>
            Most people who "visit" Khurja do so by accident — a pit stop on the way to Agra, a quick look before getting back on the highway. But the town rewards slowness in a way that a 45-minute stopover simply cannot deliver.
          </p>
          <p>
            The family workshops — several of which have been operating for three or four generations — are where the real encounter happens. Here, you're not watching a demonstration. You're in a working space where someone has been at this wheel since early morning, where the rhythms of the day are set by kiln temperatures and drying times, not tourist schedules.
          </p>
          <p>
            Spending a few hours here — watching, attempting, asking questions, failing gracefully at the wheel — produces the kind of memory that doesn't fade. The specific resistance of wet clay. The quiet correction from someone who has done this ten thousand times. The moment something almost takes shape.
          </p>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy pt-6"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            The Comfort Question
          </h2>
          <p>
            The assumption that "authentic" means "rough" is one that thoughtful travel has been dismantling for a while now. You don't need to sacrifice comfort to have a genuine experience — and in fact, arriving tired and underfed tends to make you less present, not more.
          </p>
          <p>
            This is something JUNO has thought carefully about in designing their artisan trips out of Delhi. The approach is simple: everything logistical is handled — good transport, quality stays, meals that reflect the region — so that when you arrive at a Khurja workshop, the only thing left to do is be there. Fully. That's a different kind of trip.
          </p>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy pt-6"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            Why Now
          </h2>
          <p>
            Khurja is not undiscovered forever. The combination of proximity to Delhi, extraordinary craft density, and a growing appetite for meaningful weekend travel means it is only a matter of time before it becomes a fixture on every "hidden gems near Delhi" list.
          </p>
          <p>
            The version of Khurja that exists right now — unhurried, unperformed, genuinely itself — is worth experiencing before the signage goes up.
          </p>
          <p className="text-xl font-medium text-juno-navy italic">
            Two hours from Delhi. A world away from it.
          </p>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-10 md:p-16 bg-juno-navy rounded-[2.5rem] text-center"
        >
          <p className="text-juno-bg/70 font-light mb-4 text-lg">
            Interested in experiencing Khurja the right way? JUNO's upcoming artisan trips are designed for exactly this — deep, comfortable, and carefully considered.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="mt-6 inline-flex items-center gap-3 px-10 py-5 bg-juno-ochre text-juno-navy text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-xl transition-all duration-300"
          >
            Join the Waitlist <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Blogs;
