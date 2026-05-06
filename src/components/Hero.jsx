import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Shield, Download } from 'lucide-react';
import profilePic from '../assets/Profile Pic.png';

const Typewriter = ({ texts, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const fullText = texts[currentIndex];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, delay]);

  return (
    <span>
      {currentText}
      <span className="cursor-blink">|</span>
      <style>{`
        .cursor-blink { animation: blink 1s step-end infinite; color: var(--primary); }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
      
      {/* Premium Background Glow */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0, 255, 157, 0.1)', borderRadius: '20px', border: '1px solid rgba(0, 255, 157, 0.2)', marginBottom: '2rem' }}>
            <Terminal size={16} color="var(--primary)" />
            <span className="mono-text" style={{ fontSize: '0.9rem', margin: 0 }}>Hello World, I am</span>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{ lineHeight: '1.1', margin: 0 }} className="glitch" data-text="Nilupul">
              Nilupul
            </h1>
            <h1 style={{ lineHeight: '1.1', margin: 0 }} className="glitch" data-text="Thisaranga">
              Thisaranga
            </h1>
          </div>
          
          <h2 style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', marginBottom: '1.5rem', height: '3rem', fontWeight: 400 }}>
            I am a <span className="text-gradient" style={{ fontWeight: 600 }}>
              <Typewriter texts={['Cybersecurity undergraduate.', 'Full Stack Developer.', 'Security Enthusiast.']} delay={100} />
            </span>
          </h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '500px', marginBottom: '3rem', color: 'var(--text-muted)' }}>
            A motivated and detail-oriented Cybersecurity undergraduate with a passion for securing modern applications. 
            Specializing in secure coding, vulnerability assessment, and full-stack web development.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Check out my work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
              Get In Touch
            </a>
            <a 
              href="/CV.pdf" 
              download="Nilupul_Thisaranga_CV.pdf"
              className="btn btn-outline" 
              style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,255,157,0.4)', color: 'var(--primary)' }}
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Professional ID Badge Photo Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}
        >
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="id-card glass-panel"
            style={{ 
              width: '100%', 
              maxWidth: '320px', 
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 157, 0.3)',
              background: 'linear-gradient(145deg, rgba(16, 18, 27, 0.8) 0%, rgba(5, 5, 8, 0.9) 100%)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Holographic overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary)' }} />
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)', transform: 'rotate(30deg)', pointerEvents: 'none' }} />
            
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
              <div>
                <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>UNIVERSITY CREDENTIAL</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>LEVEL: UNDERGRAD</div>
              </div>
              <Shield size={24} color="var(--primary)" />
            </div>

            {/* Photo & Details Flex */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* The actual photo container - small and professional */}
              <div style={{ 
                width: '90px', 
                height: '110px', 
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0, 255, 157, 0.4)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={profilePic} 
                  alt="Nilupul Thisaranga" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center 20%', /* Focuses on the upper body/face for full-body shots */
                    opacity: 0.95 
                  }} 
                />
                {/* Scanline effect over photo */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.15) 2px, rgba(0, 255, 157, 0.15) 4px)', pointerEvents: 'none', mixBlendMode: 'overlay' }} />
                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 15px rgba(0,255,157,0.3)', pointerEvents: 'none' }} />
              </div>

              {/* Data points */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.4rem' }}>
                <div>
                  <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>IDENTIFICATION</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)' }}>#NT-CYBER-UG</div>
                </div>
                <div>
                  <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>DESIGNATION</div>
                  <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>Cybersecurity Undergraduate</div>
                </div>
                <div>
                  <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>STATUS</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(0, 255, 157, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 5px var(--primary)' }} />
                    <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px' }}>ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barcode / Fingerprint area */}
            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '4px' }}>BIOMETRIC HASH</div>
                <div style={{ display: 'flex', gap: '2px', height: '24px' }}>
                  {[...Array(20)].map((_, i) => (
                    <div key={i} style={{ width: '3px', height: `${Math.random() * 100}%`, background: 'var(--primary)', opacity: 0.7 }} />
                  ))}
                </div>
              </div>
              <div className="mono-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>VALID THRU // 2028</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <motion.a 
          href="#skills" 
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textDecoration: 'none', cursor: 'none' }}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.span 
            className="mono-text" 
            variants={{
              rest: { color: 'var(--text-muted)', letterSpacing: '0.1rem' },
              hover: { color: 'var(--primary)', letterSpacing: '0.4rem', textShadow: '0 0 10px rgba(0, 255, 157, 0.6)' }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ fontSize: '0.7rem', fontWeight: 600 }}
          >
            SCROLL
          </motion.span>
          
          <motion.div
            variants={{
              rest: { height: '40px', background: 'linear-gradient(to bottom, rgba(0,255,157,0.5), transparent)' },
              hover: { height: '65px', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: '2px', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}
          >
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: '#fff', opacity: 0.8 }}
            />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
