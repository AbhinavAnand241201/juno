import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import RequestInviteForm from '../components/RequestInviteForm';

export default function Invite() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-juno-bg">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block">
            Exclusive Access
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-tight mb-6 text-juno-navy">
            Curated journeys for the <span className="italic text-juno-ochre">mindful.</span>
          </h1>
          <p className="text-base md:text-xl text-juno-navy/70 font-light mx-auto mb-10 leading-relaxed px-4">
            Our journeys are strictly invite-only to preserve the intimacy and authenticity of the experience. Request an invitation below.
          </p>
          <button 
            onClick={() => setOpen(true)}
            className="btn-hover-effect inline-flex items-center gap-3 px-12 py-5 bg-juno-navy text-juno-bg text-sm font-bold tracking-widest uppercase rounded-[999px] hover:shadow-2xl transition-all duration-300"
          >
            Request Your Invite <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <RequestInviteForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
