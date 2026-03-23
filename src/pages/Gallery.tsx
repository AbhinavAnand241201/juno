/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, X, Maximize2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Gallery = () => {
  const container = useRef<HTMLDivElement>(null);
  const cinematicRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);
  const { scrollYProgress } = useScroll({
    target: cinematicRef,
    offset: ['start end', 'end start']
  });
  const cinematicScale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);
  const cinematicBlur = useTransform(scrollYProgress, [0, 1], ['10px', '0px']);

  const images = [
    { url: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&q=80&w=1000', title: 'Hands in Action', category: 'Craft', description: 'The raw precision of a master artisan at work in a desert workshop.' },
    { url: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=1000', title: 'Morning Calm', category: 'Nature', description: 'First light breaking over the silent peaks of the Himalayas.' },
    { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000', title: 'Kyoto Zen', category: 'Culture', description: 'A moment of stillness in the heart of a centuries-old temple garden.' },
    { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000', title: 'Santorini Blue', category: 'Landscape', description: 'The iconic caldera views, curated for those who seek the quiet side of the island.' },
    { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000', title: 'Amalfi Coast', category: 'Culture', description: 'Hidden pathways and private terraces overlooking the Tyrrhenian Sea.' },
    { url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000', title: 'Clay Textures', category: 'Process', description: 'Understanding the earth through the medium of ancient pottery techniques.' },
    { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000', title: 'Luxury Stay', category: 'Experience', description: 'Handpicked accommodations that blend seamless luxury with local soul.' },
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000', title: 'Shared Tables', category: 'Culinary', description: 'Long dinners under the stars, where every ingredient has a story.' },
    { url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1000', title: 'Natural Light', category: 'Atmosphere', description: 'Capturing the ephemeral beauty of golden hour in remote landscapes.' },
    { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000', title: 'Alpine Serenity', category: 'Nature', description: 'Crystal clear lakes reflecting the majesty of the high Alps.' },
    { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000', title: 'The Long Road', category: 'Journey', description: 'The beauty of the transition, where the journey becomes the destination.' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000', title: 'Valley Mist', category: 'Landscape', description: 'Waking up to a world shrouded in the soft embrace of mountain mist.' }
  ];

  useGSAP(() => {
    // Ensure triggers are fresh
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });

    gsap.from('.gsap-reveal', {
      y: 40,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
      }
    });

    gsap.from('.gallery-item', {
      scale: 0.95,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 90%',
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-juno-bg overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-juno-sand/10 via-juno-bg to-juno-bg" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mb-12">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block gsap-reveal">
              Gallery
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold leading-tight mb-8 text-juno-navy gsap-reveal">
              A thousand words <br />
              <span className="italic text-juno-ochre">would ruin it.</span>
            </h1>
            <p className="text-lg md:text-2xl text-juno-navy/60 font-light leading-relaxed gsap-reveal">
              Come on a journey. Leave with a story.
            </p>
            <Link to="/invite" className="mt-12 inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-juno-navy hover:text-juno-ochre transition-all group gsap-reveal">
              Request Invite <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&q=80&w=900',
              'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=900',
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=900',
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=900'
            ].map((url, idx) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl overflow-hidden shadow-lg"
              >
                <img src={url} alt="Travel preview" className="w-full h-40 md:h-56 object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={cinematicRef} className="px-6 md:px-12 pb-20 md:pb-28">
        <motion.div
          style={{ scale: cinematicScale, filter: cinematicBlur }}
          className="max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] md:rounded-[3rem] relative"
        >
          <img
            src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=2000"
            alt="Cinematic journey"
            className="w-full h-[20rem] md:h-[32rem] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-juno-navy/70 via-juno-navy/20 to-transparent p-8 md:p-14 flex items-end">
            <p className="text-juno-bg text-xl md:text-3xl font-display max-w-2xl">Travel is not consumed. It is felt, slowly, deeply, together.</p>
          </div>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              onClick={() => setSelectedImage(img)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (idx % 6) * 0.08 }}
              whileHover={{ y: -10 }}
              className="gallery-item group relative aspect-square overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-juno-navy/5 cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="image-overlay absolute inset-0 bg-juno-navy/60 transition-all duration-700 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-widest text-juno-sand mb-4 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{img.category}</div>
                <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">{img.title}</h4>
                <div className="mt-4 p-3 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 md:mt-40 text-center gsap-reveal">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-juno-navy mb-12 uppercase tracking-widest">Your hands belong in this frame.</h3>
          <Link to="/invite" className="btn-hover-effect inline-flex px-14 py-6 bg-juno-navy text-juno-bg text-sm font-bold tracking-widest uppercase rounded-[999px] transition-all duration-500">
            Request an Invitation
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-juno-navy/95 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Orbital Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-juno-sand/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-juno-ochre/5 rounded-full"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-juno-ochre/10 blur-[100px] rounded-full"
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-juno-navy/20 blur-[100px] rounded-full"
              />
            </div>

            <motion.button 
              className="absolute top-8 right-8 text-juno-bg/60 hover:text-juno-bg transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center bg-juno-navy/40 p-6 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:col-span-3 relative group">
                {/* Orbital Ring around Image */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-dashed border-juno-sand/20 rounded-[2.5rem] pointer-events-none"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs font-bold tracking-[0.4em] uppercase text-juno-sand mb-4 flex items-center gap-3"
                  >
                    <Compass className="w-4 h-4" />
                    {selectedImage.category}
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-display font-bold text-white leading-tight"
                  >
                    {selectedImage.title}
                  </motion.h2>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-juno-bg/60 font-light leading-relaxed"
                >
                  {selectedImage.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    to="/invite"
                    className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-juno-sand hover:text-white transition-colors group"
                  >
                    Book this experience <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
