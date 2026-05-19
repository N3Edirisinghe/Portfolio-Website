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
    { type: 'system', content: 'SYSTEM_ACCESS :: ESTABLISHED' },
    { type: 'system', content: 'ENCRYPTION :: ACTIVE' },
    { type: 'output', content: 'Welcome. Type "help" to navigate the system.' }
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
        response = 'Commands: whoami, projects, skills, contact, clear, time';
        break;
      case 'whoami':
        response = 'Nilupul Thisaranga Edirisinghe — Cybersecurity Strategist & Full Stack Architect.';
        break;
      case 'projects':
        response = 'DEPLOYED: UniVote, Lanka Smartmart, Secure-Scan-V2...';
        break;
      case 'skills':
        response = 'TECH: React, Node.js, Python, Java | SEC: Pentesting, Log Analysis, Secure Architecture';
        break;
      case 'time':
        response = new Date().toLocaleString();
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Unknown command: ${cmd}. Type "help" for a list of commands.`;
    }

    setHistory([...newHistory, { type: 'output', content: response }]);
    setInput('');
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '550px', 
      height: '320px', 
      background: 'rgba(5, 15, 15, 0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
    }}>
      {/* Terminal Header */}
      <div style={{ 
        padding: '12px 20px', 
        background: 'rgba(255, 255, 255, 0.02)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <span className="mono-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Terminal Session</span>
        <div style={{ width: '20px' }} />
      </div>

      {/* Terminal Content */}
      <div style={{ 
        flex: 1, 
        padding: '20px', 
        overflowY: 'auto', 
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        scrollbarWidth: 'none'
      }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '6px', lineHeight: '1.5' }}>
            {line.type === 'command' && (
              <span style={{ color: 'var(--primary)' }}>
                <span style={{ color: 'var(--text-muted)' }}>$</span> {line.content}
              </span>
            )}
            {line.type === 'output' && <span style={{ color: '#fff', opacity: 0.8 }}>{line.content}</span>}
            {line.type === 'system' && <span style={{ color: 'var(--primary)', opacity: 0.4, fontSize: '0.7rem' }}>[{line.content}]</span>}
          </div>
        ))}
        <div ref={terminalEndRef} />
        
        <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ color: 'var(--text-muted)', marginRight: '10px' }}>$</span>
          <input 
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
              fontSize: '0.8rem'
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
      
      {/* Animated Flowing Lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, opacity: 0.3 }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: ['-100%', '200%'],
              y: [100 * i, 150 * i],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 3
            }}
            style={{ 
              position: 'absolute', 
              width: '400px', 
              height: '1px', 
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
              filter: 'blur(2px)',
              transform: 'rotate(-20deg)'
            }}
          />
        ))}
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '100px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '2.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
            <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Available for hire</span>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="floating" style={{ margin: 0, color: '#fff' }}>
              Nilupul <br />
              Thisaranga
            </h1>
          </div>
          
          <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '550px', marginBottom: '3rem', color: 'var(--text-main)', opacity: 0.9 }}>
            Designing secure digital ecosystems with precision, elegance, and unyielding protection.
          </p>
          
          {/* Animated Terminal Section */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '3rem' }}
              >
                <CyberTerminal />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn" style={{ 
              padding: '1rem 2.5rem', 
              fontSize: '0.9rem', 
              background: 'var(--primary)', 
              color: 'var(--bg-dark)',
              borderRadius: '100px',
              letterSpacing: '1px'
            }}>
              Initiate Contact
            </a>
            
            <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className="btn" 
              style={{ 
                padding: '1rem 2rem', 
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '100px',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <TerminalIcon size={18} /> {showTerminal ? 'Terminate' : 'System Access'}
            </button>

            <motion.a 
              href="/CV.pdf" 
              download="Nilupul_Thisaranga_CV.pdf"
              className="btn" 
              style={{ 
                padding: '1rem 2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                border: '1px solid rgba(0, 245, 212, 0.2)', 
                color: 'var(--primary)',
                background: 'rgba(0, 245, 212, 0.05)',
                borderRadius: '100px',
                fontSize: '0.9rem'
              }}
              whileHover={{ background: 'rgba(0, 245, 212, 0.1)' }}
            >
              <Download size={18} /> Credentials
            </motion.a>
          </div>
        </motion.div>

        {/* Professional ID Badge Photo Area */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="glass-panel" style={{ 
            width: '100%', 
            maxWidth: '350px', 
            padding: '2.5rem',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '180px', 
              height: '180px', 
              margin: '0 auto 2rem',
              borderRadius: '50%',
              border: '2px solid var(--primary)',
              padding: '8px',
              position: 'relative'
            }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.5)'
              }}>
                <img 
                  src={profilePic} 
                  alt="Nilupul" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
            </div>
            
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Nilupul</h2>
            <p className="mono-text" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', opacity: 0.6, marginBottom: '2rem' }}>Senior Analyst / Dev</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <Shield size={20} color="var(--primary)" opacity={0.5} />
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
              <span className="mono-text" style={{ fontSize: '0.7rem' }}>LVL_99_SEC</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'center', padding: '6px' }}
        >
          <div style={{ width: '2px', height: '8px', background: 'var(--primary)', borderRadius: '2px' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
