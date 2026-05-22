import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ padding: '6rem 0 4rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '6rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
          <span style={{ fontSize: '1.2rem', color: '#fff' }}>
            E.A.N.T <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Edirisinghe</span>
          </span>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.2)', margin: 0, letterSpacing: '1px' }}>
          &copy; {new Date().getFullYear()} NILUPUL THISARANGA EDIRISINGHE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
