import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, Globe } from 'lucide-react';
import RequestInviteForm from '../components/RequestInviteForm';

// Import local image assets for itineraries
import khurjaItinerary from '../assets/gallery/khurja.png';
import hurjaItinerary from '../asset/Experience_1.png';
import descriptionImg from '../asset/Description_img.jpg';

type SpecificTripData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  duration: string;
  location: string;
};

const tripsData: Record<string, SpecificTripData> = {
  'hurja-gujarat': {
    id: 'hurja-gujarat',
    title: 'Hurja – Gujarat Solo Trip',
    subtitle: 'The salt, the sand, the silence.',
    image: hurjaItinerary,
    duration: '6 Days',
    location: 'Gujarat, India',
  },
  'clay-day-khurja': {
    id: 'clay-day-khurja',
    title: 'Clay Day — Khurja Craft Immersion',
    subtitle: 'Spend a day where clay becomes art and you become part of the process.',
    image: khurjaItinerary,
    duration: '1 Day',
    location: 'Khurja, UP',
  }
};

export default function TripDetail() {
  const { slug } = useParams();
  const trip = slug ? tripsData[slug] : null;
  const [open, setOpen] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-juno-bg p-6">
        <h1 className="text-3xl font-display font-bold text-juno-navy mb-4">Journey Not Found</h1>
        <Link to="/" className="text-juno-ochre font-bold uppercase tracking-widest text-xs">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-juno-bg min-h-screen pt-32 pb-24 px-6 md:px-12">
      <RequestInviteForm open={open} onClose={() => setOpen(false)} />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-juno-navy/60 hover:text-juno-navy transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-12 shadow-2xl aspect-[16/10] w-full max-w-5xl">
              <img 
                src={descriptionImg}
                alt="Trip Description" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-16">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-juno-navy mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                {trip.title}
              </h1>
              <p className="text-xl text-juno-navy/60 font-light italic mb-8">
                {trip.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-8 py-6 border-y border-juno-navy/10 text-sm font-medium text-juno-navy">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-juno-ochre" /> {trip.duration}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-juno-ochre" /> {trip.location}</span>
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-juno-ochre" /> Curated Experience</span>
              </div>
            </div>

            <div className="space-y-16">
              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy mb-6">About This Experience</h2>
                <div className="prose prose-lg text-juno-navy/70 font-light leading-relaxed space-y-4">
                  <p>Just beyond Delhi lies Khurja, a town where clay has shaped stories for generations.</p>
                  <p>This isn’t a sightseeing trip. It’s a chance to step into a working craft culture, meet the people behind it, and create something with your own hands.</p>
                  <p>Expect a day that feels slower, more tactile, and unexpectedly rewarding.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy mb-6">What You’ll Experience</h2>
                <div className="bg-juno-sand/5 p-8 rounded-3xl border border-juno-sand/20">
                  <p className="mb-6 font-medium text-juno-navy">A curated day of discovery, craft, and connection.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Meet local artisans',
                      'Step inside real pottery workshops',
                      'Try shaping clay yourself',
                      'Spend time exploring the heart of Khurja'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-juno-navy/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-juno-ochre" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 italic text-sm text-juno-navy/40">The rest, we’ll leave for you to experience.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-juno-navy mb-6">What’s Included</h2>
                <ul className="space-y-4">
                  {[
                    'Travel from Delhi and back',
                    'Access to pottery studios and workshops',
                    'Hands-on craft experience',
                    'Meals and refreshments',
                    'Support from the JUNO team',
                    'A small keepsake from the day'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-juno-navy/70 border-b border-juno-navy/5 pb-4">
                      <ArrowRight className="w-4 h-4 text-juno-ochre" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-juno-navy text-juno-bg p-12 rounded-[3rem] text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Why Join</h2>
                <p className="text-xl md:text-2xl font-light italic mb-10 opacity-80">
                  "Because sometimes the best way to understand a place<br />
                  is to make something in it."
                </p>
                <button 
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-juno-ochre text-juno-navy rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
                >
                  Request an Invitation <ArrowRight className="w-4 h-4" />
                </button>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar / Itinerary Preview */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-juno-navy p-10 shadow-2xl">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(232,169,74,0.15),transparent_70%)]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-8 mx-auto">
                  <span className="text-white font-display text-2xl font-bold">J</span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-8 text-center uppercase tracking-widest">
                  Preview Itinerary
                </h3>
                
                <div className="relative mt-8">
                  {/* Blurred Itinerary Text */}
                  <div className="space-y-6 blur-[3px] select-none opacity-50 pointer-events-none pb-12">
                    {[
                      { time: '08:00 AM', event: 'Departure from New Delhi' },
                      { time: '10:30 AM', event: 'Arrival and Artisan Greeting' },
                      { time: '11:30 AM', event: 'Studio Workshop Session I' },
                      { time: '01:30 PM', event: 'Farm-to-Table Traditional Lunch' },
                      { time: '03:00 PM', event: 'Guided Market Exploration' },
                      { time: '05:00 PM', event: 'Evening Tea and Reflection' },
                      { time: '06:30 PM', event: 'Return Journey Begins' },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 border-l border-white/20 pl-4">
                        <div className="text-[10px] font-bold text-juno-sand shrink-0">{step.time}</div>
                        <div className="text-sm text-white/80">{step.event}</div>
                      </div>
                    ))}
                  </div>

                  {/* Centered Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div className="bg-juno-navy/30 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 text-center w-full shadow-2xl">
                      <p className="text-white/90 text-sm xl:text-base font-light mb-8">
                        Unlock the full schedule and exclusive details by joining our community.
                      </p>
                      <button 
                        onClick={() => setOpen(true)}
                        className="w-full py-4 bg-white text-juno-navy rounded-full text-xs font-bold uppercase tracking-widest hover:bg-juno-sand transition-all transform hover:scale-105 shadow-[0_8px_30px_rgb(255,255,255,0.12)]"
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
