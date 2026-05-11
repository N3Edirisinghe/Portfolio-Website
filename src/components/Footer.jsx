import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '6rem 0 4rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '6rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
          <span style={{ fontSize: '1.2rem', color: '#fff' }}>
            N.T. <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Edirisinghe</span>
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--text-muted)' }}>Architecture</span>
          <span style={{ color: 'var(--text-muted)' }}>Security</span>
          <span style={{ color: 'var(--text-muted)' }}>Excellence</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.2)', margin: 0, letterSpacing: '1px' }}>
          &copy; {new Date().getFullYear()} ENGINEERED BY NILUPUL THISARANGA. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
