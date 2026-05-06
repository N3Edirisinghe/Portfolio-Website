import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', marginTop: '4rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Shield color="var(--primary)" size={20} />
          <span style={{ fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>E.A.N.T. EDIRISINGHE</span>
        </div>
        <p className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
          Designed & Built by Nilupul Thisaranga &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
