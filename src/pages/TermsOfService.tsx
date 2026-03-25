import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Booking & Participation',
      content: 'Participation in JUNO trips is subject to: Availability, Eligibility, Completion of required forms, and Payment confirmation. JUNO reserves the right to refuse participation if safety or conduct concerns arise.',
    },
    {
      title: 'Payments',
      content: 'All bookings must be paid in full before the trip begins unless otherwise specified. Prices may change without prior notice.',
    },
    {
      title: 'Cancellations & Refunds',
      content: 'Cancellation policies will be shared for each trip. Refund eligibility depends on: Timing of cancellation, Operational costs, and Third-party commitments.',
    },
    {
      title: 'Participant Responsibility',
      items: ['Follow safety instructions', 'Respect local communities', 'Behave responsibly', 'Disclose relevant health conditions'],
      extra: 'JUNO is not responsible for damages caused by participant negligence.',
    },
    {
      title: 'Travel Risks',
      content: 'Participation in travel activities involves inherent risks.',
      items: ['Weather conditions', 'Transportation delays', 'Physical injury'],
      extra: 'By participating, you acknowledge and accept these risks.',
    },
    {
      title: 'Changes to Itinerary',
      content: 'JUNO reserves the right to: Modify schedules, Adjust activities, Change accommodations. This may occur due to: Weather, Safety concerns, Operational requirements.',
    },
    {
      title: 'Liability',
      content: 'JUNO acts as a facilitator connecting participants with service providers. We are not liable for: Third-party actions, Unforeseen circumstances, Force majeure events.',
    },
  ];

  return (
    <div className="bg-juno-bg min-h-screen">
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-juno-navy flex items-center justify-center">
              <FileText className="w-5 h-5 text-juno-bg" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-juno-navy/50 font-bold">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-juno-navy mb-4 leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            Terms of Service
          </h1>
          <p className="text-juno-navy/50 text-sm mb-16">Last updated: 26th March 2026</p>

          <p className="text-juno-navy/70 font-light leading-relaxed text-base md:text-lg mb-12">
            By using our website or participating in any JUNO experience, you agree to the following terms.
          </p>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="border-b border-juno-navy/10 pb-10"
              >
                <h2 className="text-xl font-display font-bold text-juno-navy mb-4">{section.title}</h2>
                {section.content && (
                  <p className="text-juno-navy/70 font-light leading-relaxed mb-4">{section.content}</p>
                )}
                {section.items && (
                  <ul className="space-y-2 pl-4 mb-4">
                    {section.items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-juno-navy/70 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.extra && (
                  <p className="text-juno-navy/70 font-light leading-relaxed mt-4">{section.extra}</p>
                )}
              </motion.div>
            ))}

            <div className="p-8 bg-juno-navy/5 rounded-2xl border border-juno-navy/10">
              <h2 className="text-xl font-display font-bold text-juno-navy mb-3">Contact</h2>
              <a href="mailto:info.clubjuno@gmail.com" className="text-juno-ochre hover:underline font-medium">
                info.clubjuno@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsOfService;
