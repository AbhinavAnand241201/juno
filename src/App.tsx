/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Facebook,
  Linkedin,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Invite from './pages/Invite';
import TripDetail from './pages/TripDetail';
import Blogs from './pages/Blogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import logo from './assets/logo.png';

// Components
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const w = window as any;
    if (w.lenis) {
      w.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // Refresh ScrollTrigger after route change and a small delay for DOM updates
    const timer = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDarkTopPage = location.pathname === '/' || location.pathname === '/blogs' || location.pathname.startsWith('/trip/');
  const navRef = useRef<HTMLDivElement>(null);

  if (isAdminRoute) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power4.out',
    });
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  const isLightText = isDarkTopPage && !scrolled;

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 transition-all duration-500 ${
        scrolled 
          ? 'bg-juno-bg/95 backdrop-blur-xl border-b border-juno-navy/10 shadow-sm' 
          : isDarkTopPage 
            ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent' 
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img src={logo} alt="Juno" className={`w-full h-full object-cover scale-[1.8] transition-all duration-500 ${isLightText ? 'brightness-0 invert opacity-90' : ''}`} />
          </div>
          <span className={`text-[12px] md:text-sm font-bold tracking-[0.25em] uppercase transition-colors duration-500 ${isLightText ? 'text-white' : 'text-juno-navy'}`}>JUNO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[11px] xl:text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-juno-ochre relative group ${
                location.pathname === link.path 
                  ? (isLightText ? 'text-white' : 'text-juno-navy')
                  : (isLightText ? 'text-white/70' : 'text-juno-navy/60')
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                location.pathname === link.path ? 'w-full' : ''
              } ${isLightText ? 'bg-white' : 'bg-juno-ochre'}`} />
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button className={`p-2 transition-colors duration-500 ${isLightText ? 'text-white' : 'text-juno-navy'}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-juno-bg/95 backdrop-blur-xl border-b border-juno-navy/10 p-10 lg:hidden flex flex-col gap-8 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold tracking-[0.2em] uppercase transition-colors ${
                    location.pathname === link.path ? 'text-juno-ochre' : 'text-juno-navy'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
  <footer className="bg-[#0D1B2A] text-juno-footer-text py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-500 border-t-4 border-juno-ochre/20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
            <img src={logo} alt="Juno" className="w-full h-full object-cover scale-[1.8] brightness-0 invert opacity-80" />
          </div>
          <span className="text-2xl font-bold tracking-[0.25em] text-white/80">JUNO</span>
        </div>
        <p className="text-juno-footer-text/60 font-light max-w-md mb-12 text-lg leading-relaxed">
          Curated experiential journeys for the curious and mindful. 
          India's first invite-only experiential journey club.
        </p>
        <div className="flex gap-8">
          <a href="https://www.instagram.com/experiencejuno?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="group">
            <Instagram className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61578476350934" target="_blank" rel="noreferrer" className="group">
            <Facebook className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <a href="https://www.linkedin.com/company/experiencejuno/" target="_blank" rel="noreferrer" className="group">
            <Linkedin className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
        </div>
      </div>
      
      <div>
        <h5 className="text-[10px] uppercase tracking-[0.3em] text-juno-sand mb-10 font-bold">Explore</h5>
        <ul className="space-y-5 text-base font-light">
          <li><Link to="/gallery" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Gallery</Link></li>
          <li><Link to="/about" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Our Story</Link></li>
          <li><Link to="/blogs" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Blogs</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-[10px] uppercase tracking-[0.3em] text-juno-sand mb-10 font-bold">Support</h5>
        <ul className="space-y-5 text-base font-light">
          <li><Link to="/faq" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">FAQ</Link></li>
          <li><Link to="/contact" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Contact Us</Link></li>
          <li><Link to="/privacy-policy" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Terms of Service</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] text-juno-footer-text/20 flex flex-col md:flex-row justify-between items-center gap-6">
      <span>© 2026 JUNO Experiential Journeys</span>
      <div className="flex items-center gap-3">
        <span className="text-juno-sand/40">Curated with Intention</span>
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ml-4">
          <img src={logo} alt="Juno" className="w-full h-full object-cover scale-[1.8] brightness-0 invert opacity-50" />
        </div>
      </div>
    </div>
  </footer>
  );
};

export default function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });
    
    (window as any).lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);



  return (
    <Router>
      <Toaster position="bottom-center" toastOptions={{ duration: 5000, className: 'text-sm shadow-xl rounded-2xl border border-juno-navy/10' }} />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-juno-ochre selection:text-juno-bg bg-juno-bg transition-colors duration-500">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/trip/:slug" element={<TripDetail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
