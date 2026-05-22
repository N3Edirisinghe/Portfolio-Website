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
    { name: 'Research', href: '#research' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`} 
      style={{ 
        background: scrolled ? 'rgba(5, 10, 10, 0.4)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid transparent',
        padding: scrolled ? '1.2rem 0' : '2rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#home" className="logo" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          fontSize: '1.4rem', 
          fontWeight: 400, 
          fontFamily: 'var(--font-serif)', 
          color: '#fff', 
          textDecoration: 'none',
          letterSpacing: '1px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 245, 212, 0.05)',
            borderRadius: '50%',
            border: '1px solid rgba(0, 245, 212, 0.1)'
          }}>
            <Cpu color="var(--primary)" size={18} />
          </div>
          <span style={{ fontStyle: 'italic' }}>
            Nilupul <span style={{ fontWeight: 600, color: 'var(--primary)', fontStyle: 'normal' }}>Thisaranga</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="md-flex">
          <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
                  onClick={() => setActiveLink(link.name)}
                  style={{ 
                    padding: '8px 16px',
                    fontSize: '0.75rem', 
                    fontWeight: 500, 
                    letterSpacing: '1px', 
                    textTransform: 'uppercase',
                    color: activeLink === link.name ? 'var(--primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    borderRadius: '100px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: activeLink === link.name ? 'rgba(0, 245, 212, 0.05)' : 'transparent'
                  }}
                >
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
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            color: 'var(--primary)', 
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              width: '100%', 
              background: 'rgba(2, 6, 6, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                    justifyContent: 'space-between',
                    fontSize: '1.1rem', 
                    fontWeight: 500,
                    color: activeLink === link.name ? 'var(--primary)' : 'var(--text-main)',
                    textDecoration: 'none',
                    padding: '16px 24px',
                    borderRadius: '16px',
                    background: activeLink === link.name ? 'rgba(0, 245, 212, 0.05)' : 'transparent',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  <span>{link.name}</span>
                  <Cpu size={16} opacity={activeLink === link.name ? 1 : 0} />
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
          color: #fff !important;
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-link.active {
          box-shadow: inset 0 0 10px rgba(0, 245, 212, 0.1);
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
