import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5 }}>01.</span>
              The <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Philosophy</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>

          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div style={{ paddingRight: '2rem' }}>
              <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#fff', opacity: 0.9, marginBottom: '2.5rem', lineHeight: '1.6' }}>
                At the intersection of code and security, I build resilient digital landscapes.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                I am a Cybersecurity undergraduate at <span style={{ color: 'var(--primary)' }}>SLTC Research University</span>. 
                My journey began with a fascination for hidden vulnerabilities and evolved into a mission to engineer unyielding protection.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Through academic research and hands-on development, I have refined my ability to harmonize complex architectures with robust security protocols.
              </p>
            </div>

            <div className="glass-panel floating" style={{ padding: '3rem', borderRadius: '32px', background: 'rgba(255,255,255,0.01)' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <ShieldCheck color="var(--primary)" size={28} style={{ opacity: 0.6 }} />
                  <div>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff', letterSpacing: '2px' }}>Security First</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Implementing robust encryption and threat mitigation in every architectural layer.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <Code color="var(--primary)" size={28} style={{ opacity: 0.6 }} />
                  <div>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff', letterSpacing: '2px' }}>Clean Logic</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Writing elegant, maintainable code that prioritizes performance without compromising integrity.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
