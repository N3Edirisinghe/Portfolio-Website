import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0 }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>05.</span>
              Education & Activity
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)', maxWidth: '300px' }}></div>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                <GraduationCap color="var(--primary)" /> Academic Background
              </h3>
              
              <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '2rem', position: 'relative' }}>
                <div style={{ position: 'relative', marginBottom: '3rem' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>BSc (Hons) in Cybersecurity</h4>
                  <p className="mono-text" style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>SLTC Research University | 2023 - 2027</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Focused on advanced network security protocols, secure software engineering, and proactive threat modeling.</p>
                  
                  {/* Added Core Modules for Professional Look */}
                  <div style={{ marginBottom: '1rem' }}>
                    <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>CORE ACADEMIC MODULES:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Cyber Security Domains & Tools</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Cyber Law, Regulations & Policies</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Network Security</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Advanced Cryptography</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Digital Forensics</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Ethical Hacking</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Intelligent Threat Management</span>
                      <span className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(0,255,157,0.05)' }}>Blockchain & Applications</span>
                    </div>
                  </div>

                  {/* Research Interest */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', padding: '4px 10px', borderRadius: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 600 }}>RESEARCH INTEREST:</span>
                    <span style={{ fontSize: '0.75rem', color: '#fff' }}>Automated Threat Detection in IoT</span>
                  </div>
                </div>
                
                <div style={{ position: 'relative', marginBottom: '3rem' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--border-color)', borderRadius: '50%' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>NVQ Level 4 Computer Technician Course</h4>
                  <p className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>National Vocational Qualification | Awaiting Results</p>
                  <p style={{ fontSize: '0.9rem' }}>Gained hands-on expertise in computer hardware troubleshooting, network configuration, operating system deployment, and IT infrastructure maintenance.</p>
                </div>
                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.5rem', top: '0', width: '1rem', height: '1rem', background: 'var(--border-color)', borderRadius: '50%' }}></div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>G.C.E A/L Examination</h4>
                  <p className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Passed with 3S in Technology Stream | 2022</p>
                  <p style={{ fontSize: '0.9rem' }}>Specialized in ICT, Engineering Technology, and Science for Technology.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                <Award color="var(--secondary)" /> Certifications & Events
              </h3>
              
              <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Courses & Certifications</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><BookOpen size={16} color="var(--primary)" style={{ marginTop: '4px' }} /> <span style={{ fontSize: '0.9rem' }}>Introduction to Cybersecurity - (Cisco Networking Academy)</span></li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><BookOpen size={16} color="var(--primary)" style={{ marginTop: '4px' }} /> <span style={{ fontSize: '0.9rem' }}>Introduction to Cybersecurity Awareness - (Hp Life)</span></li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><BookOpen size={16} color="var(--primary)" style={{ marginTop: '4px' }} /> <span style={{ fontSize: '0.9rem' }}>Data Science & Analytics - (Hp Life)</span></li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><BookOpen size={16} color="var(--primary)" style={{ marginTop: '4px' }} /> <span style={{ fontSize: '0.9rem' }}>Fundamentals of Digital Marketing - (Google Digital Garage)</span></li>
                </ul>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Event Participation</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--secondary)' }}>▹</span> <span style={{ fontSize: '0.9rem' }}>Participated for Cybercon Workshop (2024) at SLTC premises</span></li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><span style={{ color: 'var(--secondary)' }}>▹</span> <span style={{ fontSize: '0.9rem' }}>Participated for CodeMania 5.0 (2025) at SLTC premises</span></li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
