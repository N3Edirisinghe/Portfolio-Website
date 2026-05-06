import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`} 
      style={{ 
        background: scrolled ? 'rgba(5, 5, 8, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        padding: scrolled ? '1rem 0' : '1.5rem 0'
      }}
    >
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-main)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 255, 157, 0.1)',
            padding: '8px',
            borderRadius: '10px',
            border: '1px solid rgba(0, 255, 157, 0.2)'
          }}>
            <Cpu color="var(--primary)" size={22} />
          </div>
          <span style={{ letterSpacing: '0.5px' }}>
            Nilupul <span className="text-gradient">Thisaranga</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="md-flex">
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link, index) => (
              <li key={link.name} style={{ position: 'relative' }}>
                <a 
                  href={link.href} 
                  className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                  onClick={() => setActiveLink(link.name)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    letterSpacing: '1px', 
                    textTransform: 'uppercase',
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span className="mono-text" style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--primary)',
                    opacity: 0.8
                  }}>
                    0{index + 1}.
                  </span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md-hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            color: 'var(--primary)', 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              width: '100%', 
              background: 'rgba(5, 5, 8, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link, index) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveLink(link.name);
                  }}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '1.2rem', 
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <span className="mono-text" style={{ color: 'var(--primary)' }}>0{index + 1}.</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .md-hidden { display: none !important; }
          .md-flex { display: flex !important; }
        }
        
        .nav-link:hover {
          background: rgba(0, 255, 157, 0.1);
          color: var(--primary) !important;
        }

        .nav-link.active {
          background: rgba(0, 255, 157, 0.05);
          color: var(--primary) !important;
          border: 1px solid rgba(0, 255, 157, 0.2);
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
