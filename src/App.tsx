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
  Twitter, 
  Facebook,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Invite from './pages/Invite';

// Components
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
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

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
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
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 transition-all duration-500 transition-colors ${
        scrolled 
          ? 'md:py-4 bg-juno-bg/90 backdrop-blur-xl border-b border-juno-navy/10 shadow-sm' 
          : 'md:py-10 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Compass className="w-6 h-6 md:w-8 md:h-8 text-juno-navy group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-xl md:text-2xl font-display font-bold tracking-[0.2em] uppercase text-juno-navy">JUNO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-juno-ochre relative group ${
                location.pathname === link.path ? 'text-juno-navy' : 'text-juno-navy/50'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-juno-ochre transition-all duration-300 group-hover:w-full ${
                location.pathname === link.path ? 'w-full' : ''
              }`} />
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-juno-navy/5 transition-colors text-juno-navy"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link 
            to="/invite"
            className="btn-hover-effect px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase bg-juno-navy text-juno-bg rounded-[999px] transition-all shadow-lg hover:shadow-juno-navy/20"
          >
            Request Invite
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-juno-navy"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="text-juno-navy p-2" onClick={() => setIsOpen(!isOpen)}>
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
            className="absolute top-full left-0 right-0 bg-juno-bg border-b border-juno-navy/10 p-10 lg:hidden flex flex-col gap-8 shadow-2xl overflow-hidden"
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
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/invite"
                onClick={() => setIsOpen(false)}
                className="text-center block px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase bg-juno-navy text-juno-bg rounded-[999px] shadow-xl"
              >
                Request Invite
              </Link>
            </motion.div>
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
  <footer className="bg-juno-footer-bg text-juno-footer-text py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-500">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-10">
          <Compass className="w-10 h-10 text-juno-sand" />
          <span className="text-3xl font-display font-bold tracking-[0.2em] uppercase">JUNO</span>
        </div>
        <p className="text-juno-footer-text/60 font-light max-w-md mb-12 text-lg leading-relaxed">
          Curated experiential journeys for the curious and mindful. 
          India's first invite-only experiential journey club.
        </p>
        <div className="flex gap-8">
          <a href="#" className="group">
            <Instagram className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <a href="#" className="group">
            <Twitter className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
          <a href="#" className="group">
            <Facebook className="w-6 h-6 text-juno-footer-text/40 group-hover:text-juno-sand group-hover:-translate-y-1 transition-all duration-300" />
          </a>
        </div>
      </div>
      
      <div>
        <h5 className="text-[10px] uppercase tracking-[0.3em] text-juno-sand mb-10 font-bold">Explore</h5>
        <ul className="space-y-5 text-base font-light">
          <li><Link to="/gallery" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Gallery</Link></li>
          <li><Link to="/about" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Our Story</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-[10px] uppercase tracking-[0.3em] text-juno-sand mb-10 font-bold">Support</h5>
        <ul className="space-y-5 text-base font-light">
          <li><Link to="/faq" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">FAQ</Link></li>
          <li><Link to="/contact" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Contact Us</Link></li>
          <li><a href="#" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-juno-footer-text/60 hover:text-juno-sand transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 text-[10px] uppercase tracking-[0.4em] text-juno-footer-text/20 flex flex-col md:flex-row justify-between items-center gap-6">
      <span>© 2026 JUNO Experiential Journeys</span>
      <span className="text-juno-sand/40">Curated with Intention</span>
    </div>
  </footer>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });

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

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-juno-ochre selection:text-juno-bg bg-juno-bg transition-colors duration-500">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="flex-grow pt-24 md:pt-32">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
