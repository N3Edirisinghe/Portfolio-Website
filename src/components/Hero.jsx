import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ArrowRight, Shield, Download, X, Maximize2, ChevronRight } from 'lucide-react';
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

const CyberTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'NILUPUL_OS v2.0.4 - INITIALIZING...' },
    { type: 'system', content: 'SECURE_SHELL ESTABLISHED' },
    { type: 'output', content: 'Welcome, Guest. Type "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    let response = '';

    const newHistory = [...history, { type: 'command', content: input }];

    switch (cmd) {
      case 'help':
        response = 'Available commands: whoami, ls, skills, contact, clear, date';
        break;
      case 'whoami':
        response = 'Nilupul Thisaranga Edirisinghe - Cybersecurity Undergraduate. Specializing in secure architectures and full-stack development.';
        break;
      case 'ls':
        response = 'PROJECTS: SLTC-Voting, Lanka Smartmart, Portfolio-V2, Network-Scanner...';
        break;
      case 'skills':
        response = 'CORE: React, Node.js, Python, Java | SECURITY: Penetration Testing, Log Analysis, Secure Coding';
        break;
      case 'date':
        response = new Date().toLocaleString();
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'hello':
      case 'hi':
        response = 'System: Access granted. How can I help you today?';
        break;
      default:
        response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    setHistory([...newHistory, { type: 'output', content: response }]);
    setInput('');
  };

  return (
    <div className="glass-panel" style={{ 
      width: '100%', 
      maxWidth: '500px', 
      height: '300px', 
      background: 'rgba(5, 5, 8, 0.95)',
      border: '1px solid rgba(0, 255, 157, 0.2)',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      {/* Terminal Header */}
      <div style={{ 
        padding: '8px 12px', 
        background: 'rgba(0, 255, 157, 0.05)', 
        borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>bash — nilupul-thisaranga</span>
        <Maximize2 size={12} color="var(--text-muted)" />
      </div>

      {/* Terminal Content */}
      <div style={{ 
        flex: 1, 
        padding: '12px', 
        overflowY: 'auto', 
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        scrollbarWidth: 'thin'
      }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '4px', lineHeight: '1.4' }}>
            {line.type === 'command' && (
              <span style={{ color: 'var(--primary)' }}>
                <span style={{ color: 'var(--secondary)' }}>guest@nilupul-os</span>:~$ {line.content}
              </span>
            )}
            {line.type === 'output' && <span style={{ color: '#fff', opacity: 0.9 }}>{line.content}</span>}
            {line.type === 'system' && <span style={{ color: 'var(--primary)', opacity: 0.6, fontSize: '0.7rem' }}>[SYSTEM] {line.content}</span>}
          </div>
        ))}
        <div ref={terminalEndRef} />
        
        <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <span style={{ color: 'var(--secondary)', marginRight: '8px' }}>guest@nilupul-os:~$</span>
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#fff', 
              outline: 'none',
              flex: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
        </form>
      </div>
    </div>
  );
};

const Hero = () => {
  const [showTerminal, setShowTerminal] = useState(false);

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
            <TerminalIcon size={16} color="var(--primary)" />
            <span className="mono-text" style={{ fontSize: '0.9rem', margin: 0 }}>System Node: ONLINE</span>
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

          <p style={{ fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
            A motivated and detail-oriented Cybersecurity undergraduate with a passion for securing modern applications. 
            Specializing in secure coding and vulnerability assessment.
          </p>
          
          {/* Animated Terminal Section */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: '2.5rem' }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <CyberTerminal />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
              Contact us <ArrowRight size={18} />
            </a>
            
            <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className="btn btn-outline" 
              style={{ 
                padding: '0.8rem 1.5rem', 
                fontSize: '0.9rem',
                borderColor: showTerminal ? 'var(--primary)' : 'rgba(0,255,157,0.3)',
                background: showTerminal ? 'rgba(0,255,157,0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <TerminalIcon size={18} /> {showTerminal ? 'Close Terminal' : 'System Access'}
            </button>

            <motion.a 
              href="/CV.pdf" 
              download="Nilupul_Thisaranga_CV.pdf"
              className="btn btn-outline" 
              style={{ 
                padding: '0.8rem 1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                border: '1px solid rgba(0,255,157,0.4)', 
                color: 'var(--primary)',
                background: 'rgba(0,255,157,0.02)',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '0.9rem'
              }}
              animate={{ 
                boxShadow: ["0 0 0px rgba(0,255,157,0)", "0 0 20px rgba(0,255,157,0.2)", "0 0 0px rgba(0,255,157,0)"],
                borderColor: ["rgba(0,255,157,0.4)", "rgba(0,255,157,0.8)", "rgba(0,255,157,0.4)"]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.05, background: 'rgba(0,255,157,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} /> CV
            </motion.a>
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
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary)' }} />
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)', transform: 'rotate(30deg)', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
              <div>
                <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>UNIVERSITY CREDENTIAL</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>LEVEL: UNDERGRAD</div>
              </div>
              <Shield size={24} color="var(--primary)" />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
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
                    objectPosition: 'center 20%',
                    opacity: 0.95 
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.15) 2px, rgba(0, 255, 157, 0.15) 4px)', pointerEvents: 'none', mixBlendMode: 'overlay' }} />
                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 15px rgba(0,255,157,0.3)', pointerEvents: 'none' }} />
              </div>

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
