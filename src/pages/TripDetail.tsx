import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock } from 'lucide-react';
import RequestInviteForm from '../components/RequestInviteForm';

// Import local image assets for itineraries
import khurjaItinerary from '../assets/gallery/khurja.png';
import hurjaItinerary from '../asset/Experience_1.png';

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
    <div className="bg-juno-bg min-h-screen relative font-sans flex items-center justify-center pt-24 pb-12 px-6">
      <RequestInviteForm open={open} onClose={() => setOpen(false)} />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full lg:h-[80vh]">
        
        {/* Left Side: Blurred Itinerary Image */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-xl border border-juno-sand/20 group h-[50vh] lg:h-full">
          <img 
            src={trip.image} 
            alt="Itinerary Details" 
            className="w-full h-full object-cover blur-sm transition-all duration-700 opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-juno-navy/20 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-juno-bg mb-4 block drop-shadow-md">Exclusive Itinerary Preview</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white drop-shadow-lg mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              {trip.title}
            </h1>
            <p className="text-white/90 italic font-light drop-shadow text-lg max-w-lg mb-8">
              {trip.subtitle}
            </p>
            
            <div className="flex items-center gap-6 text-white text-sm font-medium tracking-wide drop-shadow">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {trip.duration}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {trip.location}</span>
            </div>
          </div>

          <div className="absolute top-6 left-6 z-10">
            <Link to="/" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest bg-black/20 hover:bg-black/40 px-5 py-3 rounded-full backdrop-blur-md shadow">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Link>
          </div>
        </div>

        {/* Right Side: Request Invite Form Option */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-juno-navy/10 border border-juno-sand/30">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-juno-navy/5 mb-8 mx-auto">
              <span className="text-juno-navy font-display text-3xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>J</span>
            </div>
            
            <h3 className="text-2xl font-display font-bold text-juno-navy mb-4 text-center leading-tight">
              Ready to unlock the full journey?
            </h3>
            
            <p className="text-juno-navy/60 font-light text-center leading-relaxed mb-10 text-sm">
              Our full itineraries are shared exclusively with invited guests to maintain the intimacy and surprise of the experience. Request an invite to view complete details, dates, and pricing.
            </p>
            
            <button 
              onClick={() => setOpen(true)}
              className="w-full flex items-center justify-center gap-3 py-5 bg-juno-navy text-juno-bg rounded-[999px] text-xs font-bold uppercase tracking-[0.2em] group shadow-lg hover:bg-juno-ochre transition-all duration-300"
            >
              Request Full Invite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-[10px] uppercase tracking-widest text-juno-navy/40 mt-6 font-bold">
              Secure & Private Request
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
