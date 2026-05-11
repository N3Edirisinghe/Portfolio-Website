import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Lock, Cloud, Activity, ShieldAlert, BarChart, Eye, Globe } from 'lucide-react';
import certificates from '../data/certificates.json';

const IconMap = {
  Cloud: Cloud,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Lock: Lock,
  BarChart: BarChart,
  Eye: Eye,
  Globe: Globe
};

const CertificationCard = ({ cert, index }) => {
  const [imageError, setImageError] = useState(false);
  const IconComponent = IconMap[cert.icon] || ShieldCheck;

  return (
    <motion.div
      className="glass-panel"
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.01)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.03)'
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -5, background: 'rgba(255,255,255,0.03)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: (cert.image && !imageError) ? '#fff' : `${cert.color}10`,
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: cert.color,
          border: (cert.image && !imageError) ? 'none' : `1px solid ${cert.color}25`,
          overflow: 'hidden',
          padding: (cert.image && !imageError) ? '8px' : '0',
          boxShadow: (cert.image && !imageError) ? '0 4px 12px rgba(0,0,0,0.4)' : 'none'
        }}>
          {cert.image && !imageError ? (
            <img 
              src={cert.image} 
              alt={cert.issuer} 
              style={{ width: '120%', height: '120%', objectFit: 'contain' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <IconComponent size={24} />
          )}
        </div>
        <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cert.date}</span>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff', lineHeight: '1.4', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: '0' }}>{cert.title}</h3>
      <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>{cert.issuer}</p>
      
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono-text" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>ID: {cert.id}</div>
        </div>
        <a href={cert.link} target="_blank" rel="noreferrer" className="mono-text" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', textDecoration: 'none' }}>
          Verify <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5 }}>07.</span>
              Professional <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Certifications</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>

          {/* Certifications Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {certificates.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
