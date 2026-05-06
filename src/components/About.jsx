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
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0 }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>01.</span>
              About Me
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', maxWidth: '300px' }}></div>
          </div>

          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div>
              <p>
                I am a motivated Cybersecurity undergraduate at <span className="text-gradient">SLTC Research University</span>. 
                My journey began with a fascination for how networks operate and quickly evolved into a passion for securing them.
              </p>
              <p>
                Through academic and personal projects, I have gained hands-on experience in secure coding and web technologies 
                such as JavaScript, React.js, and Node.js. My coursework has strengthened my foundation in threat modeling, 
                vulnerability assessment, and incident response.
              </p>
              <p>
                I thrive on solving real-world problems with innovative, resilient solutions and am seeking opportunities 
                to grow as a security-minded developer.
              </p>
            </div>

            <div className="glass-panel" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '50px', height: '50px', borderTop: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' }}></div>
              <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '50px', height: '50px', borderBottom: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' }}></div>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <ShieldCheck color="var(--primary)" size={24} style={{ marginTop: '3px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#fff' }}>Security First</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Implementing robust security best practices in every application I build.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Code color="var(--secondary)" size={24} style={{ marginTop: '3px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#fff' }}>Clean Code</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Writing maintainable, efficient, and scalable code for modern web architectures.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Target color="var(--accent)" size={24} style={{ marginTop: '3px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: '#fff' }}>Continuous Learning</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Eagerly exploring new tools, emerging threats, and mitigation techniques.</p>
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
