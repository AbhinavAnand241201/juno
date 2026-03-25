import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
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
              <ShieldCheck className="w-5 h-5 text-juno-bg" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-juno-navy/50 font-bold">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-juno-navy mb-4 leading-tight"
            style={{ fontFamily: '"Playfair Display", serif' }}>
            Privacy Policy
          </h1>
          <p className="text-juno-navy/50 text-sm mb-16">Last updated: 26th March 2026</p>

          <div className="space-y-12 text-juno-navy/70 font-light leading-relaxed text-base md:text-lg">
            <p>
              JUNO ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, and experiences.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect the following information:</p>
              <ul className="space-y-2 pl-4">
                {['Name', 'Email address', 'Phone number', 'Age and location', 'Emergency contact details', 'Payment and booking information', 'Travel preferences'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">We only collect information necessary to provide our services.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="space-y-2 pl-4">
                {['Process bookings and registrations', 'Communicate trip details and updates', 'Provide customer support', 'Improve our services and experiences', 'Ensure participant safety', 'Send important notifications'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-medium text-juno-navy">We do not sell your personal information.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">Data Security</h2>
              <p>We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure. However, no online system can be completely secure.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">Third-Party Services</h2>
              <p className="mb-4">We may use trusted third-party services such as:</p>
              <ul className="space-y-2 pl-4">
                {['Payment processors', 'Transport providers', 'Accommodation partners', 'Communication platforms'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">These partners only receive information necessary to perform their services.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">Cookies</h2>
              <p className="mb-4">Our website may use cookies to:</p>
              <ul className="space-y-2 pl-4">
                {['Improve user experience', 'Understand website usage', 'Enhance functionality'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">You can disable cookies in your browser settings.</p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-juno-navy mb-4">Your Rights</h2>
              <p className="mb-4">You may:</p>
              <ul className="space-y-2 pl-4">
                {['Request access to your data', 'Request correction of your data', 'Request deletion of your data'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-juno-ochre shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">To do so, contact us.</p>
            </div>

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

export default PrivacyPolicy;
