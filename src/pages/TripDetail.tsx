import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RequestInviteForm from '../components/RequestInviteForm';
import AmbientGlow from '../components/AmbientGlow';

gsap.registerPlugin(ScrollTrigger);

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const T = {
  cream:       "#F5F0E4",
  creamDark:   "#EDE8D8",
  navy:        "#1C3554",
  navyLight:   "#2A4A6E",
  terracotta:  "#C4541A",
  amber:       "#E8A020",
  amberLight:  "#F2BC55",
  olive:       "#5A7A2E",
  sand:        "#D4C4A0",
} as const;

type SpecificTripData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  duration: string;
  location: string;
  groupSize: string;
  about?: React.ReactNode;
  experience?: string[];
  included?: string[];
  whyJoin?: React.ReactNode;
};

const tripsData: Record<string, SpecificTripData> = {
  'hurja-gujarat': {
    id: 'hurja-gujarat',
    title: 'Hurja – Gujarat Solo Trip',
    subtitle: 'The salt, the sand, the silence.',
    about: <p>Detailed description for Hurja trip will be provided here later. Explore the vast white Rann, hidden artisan villages, and the authentic pulse of Gujarat in this curated solo experiential journey.</p>,
    image: 'https://images.unsplash.com/photo-1616422285623-14c1bf8d8e87?auto=format&fit=crop&q=80&w=2000',
    duration: '6 Days',
    location: 'Gujarat, India',
    groupSize: 'Max 8 Explorers',
  },
  'clay-day-khurja': {
    id: 'clay-day-khurja',
    title: 'Clay Day — Khurja Craft Immersion',
    subtitle: 'Spend a day where clay becomes art and you become part of the process.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=2000',
    duration: '1 Day',
    location: 'Khurja, UP',
    groupSize: 'Max 12 People',
    about: (
      <>
        <p>Just beyond Delhi lies Khurja, a town where clay has shaped stories for generations.</p>
        <p>This isn&apos;t a sightseeing trip. It&apos;s a chance to step into a working craft culture, meet the people behind it, and create something with your own hands.</p>
        <p>Expect a day that feels slower, more tactile, and unexpectedly rewarding.</p>
      </>
    ),
    experience: [
      "Meet local artisans",
      "Step inside real pottery workshops",
      "Try shaping clay yourself",
      "Spend time exploring the heart of Khurja",
      "The rest, we'll leave for you to experience."
    ],
    included: [
      "Travel from Delhi and back",
      "Access to pottery studios and workshops",
      "Hands-on craft experience",
      "Meals and refreshments",
      "Support from the JUNO team",
      "A small keepsake from the day"
    ],
    whyJoin: (
      <>
        <p className="text-xl md:text-3xl font-display italic text-juno-navy/80 leading-relaxed">
          &quot;Because sometimes the best way to understand a place is to make something in it.&quot;
        </p>
      </>
    )
  }
};

export default function TripDetail() {
  const { slug } = useParams();
  const trip = slug ? tripsData[slug] : null;
  const [open, setOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!trip) return;

    const ctx = gsap.context(() => {
      // Hero Image Parallax & Zoom
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Hero Content Fade In
      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Content Sections Scroll Reveal
      const sections = gsap.utils.toArray(".gsap-section");
      sections.forEach((sec: any) => {
        gsap.from(sec, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            once: true,
          }
        });
      });

      // Stagger list items
      const lists = gsap.utils.toArray(".gsap-list");
      lists.forEach((list: any) => {
        const items = list.querySelectorAll("li");
        gsap.from(items, {
          x: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            once: true
          }
        });
      });

    });

    return () => ctx.revert();
  }, [trip]);

  if (!trip) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-juno-bg p-6">
        <h1 className="text-3xl font-display font-bold text-juno-navy mb-4">Journey Not Found</h1>
        <Link to="/" className="text-juno-ochre font-bold uppercase tracking-widest text-xs">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-juno-bg min-h-screen relative font-sans">
      <AmbientGlow />
      <RequestInviteForm open={open} onClose={() => setOpen(false)} />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-juno-navy">
          <img 
            ref={imageRef}
            src={trip.image} 
            alt={trip.title} 
            className="w-full h-[120%] object-cover opacity-80"
            style={{ transformOrigin: "top" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#112233] via-transparent to-black/40" />
        
        <div className="absolute top-8 left-6 md:left-12 z-10 hero-content">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest bg-black/20 hover:bg-black/40 px-5 py-3 rounded-full backdrop-blur-md border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Discover More
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="hero-content bg-juno-terracotta/90 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block shadow-lg">
              Featured Experience
            </div>
            <h1 className="hero-content text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] mb-6 max-w-5xl shadow-sm drop-shadow-lg">
              {trip.title}
            </h1>
            <p className="hero-content text-xl md:text-2xl text-white/90 font-light italic max-w-2xl drop-shadow-md">
              {trip.subtitle}
            </p>
        </div>
      </section>

      {/* Detail Content */}
      <section ref={contentRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* About */}
            {trip.about && (
              <div className="gsap-section">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-juno-terracotta"></div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-juno-terracotta">About This Experience</h2>
                </div>
                <div className="text-xl md:text-2xl text-juno-navy leading-relaxed font-light space-y-6">
                  {trip.about}
                </div>
              </div>
            )}

            {/* What you'll experience */}
            {trip.experience && (
              <div className="gsap-section">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-juno-olive"></div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-juno-olive">What You'll Experience</h2>
                </div>
                <p className="text-lg text-juno-navy/70 mb-8 font-light">
                  A curated day of discovery, craft, and connection. You will:
                </p>
                <ul className="gsap-list grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trip.experience.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-juno-sand/30 flex items-center justify-center shrink-0">
                        <Star className="w-3 h-3 text-juno-olive" />
                      </div>
                      <span className="text-lg text-juno-navy">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Join */}
            {trip.whyJoin && (
              <div className="gsap-section bg-juno-sand/10 p-10 md:p-16 rounded-[3rem] border border-juno-sand/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-juno-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-px bg-juno-amber"></div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-juno-amber">Why Join</h2>
                </div>
                <div className="relative z-10">
                  {trip.whyJoin}
                </div>
              </div>
            )}
          </div>
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-12 gsap-section">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(28,53,84,0.08)] border border-juno-sand/20">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-juno-navy mb-8 text-center">Journey Details</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-juno-bg/50 border border-juno-sand/20">
                  <div className="w-10 h-10 rounded-full bg-juno-amber/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-juno-amber" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-juno-navy/50 tracking-wider">Duration</p>
                    <p className="font-medium text-juno-navy text-lg">{trip.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-juno-bg/50 border border-juno-sand/20">
                  <div className="w-10 h-10 rounded-full bg-juno-terracotta/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-juno-terracotta" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-juno-navy/50 tracking-wider">Location</p>
                    <p className="font-medium text-juno-navy text-lg">{trip.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-juno-bg/50 border border-juno-sand/20">
                  <div className="w-10 h-10 rounded-full bg-juno-olive/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-juno-olive" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-juno-navy/50 tracking-wider">Group Size</p>
                    <p className="font-medium text-juno-navy text-lg">{trip.groupSize}</p>
                  </div>
                </div>
              </div>

              {trip.included && (
                <div className="mb-10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-juno-navy mb-4">What's Included</h4>
                  <ul className="space-y-3">
                    {trip.included.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-juno-navy/70">
                        <span className="text-juno-terracotta mr-3 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-3 py-5 bg-juno-navy text-juno-bg rounded-2xl text-xs font-bold uppercase tracking-widest group shadow-[0_8px_30px_rgba(28,53,84,0.3)] transition-all hover:bg-[#2A4A6E] hover:shadow-[0_12px_40px_rgba(28,53,84,0.4)] hover:-translate-y-1"
              >
                Request Invite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
