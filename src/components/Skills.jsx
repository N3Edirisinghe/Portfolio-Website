import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Wrench, Hexagon, ChevronRight } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cybersecurity & Networking",
      icon: <Shield size={28} color="var(--primary)" />,
      skills: ["Network Security Fundamentals", "Threat Modeling", "Vulnerability Assessment", "Incident Response Basics", "Secure Coding Practices", "OWASP Concepts", "Networking Fundamentals", "Network Protocols"]
    },
    {
      title: "Languages & Frameworks",
      icon: <Terminal size={28} color="var(--secondary)" />,
      skills: ["JavaScript", "Python", "Kotlin", "C++ (Basic)", "React.js", "Next.js", "Node.js", "Express.js"]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={28} color="#00e5ff" />, // Cyan accent
      skills: ["HTML / CSS", "MongoDB", "MySQL", "Linux (Kali, CentOS)", "Windows", "macOS", "Figma"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5, fontStyle: 'normal' }}>02.</span>
              Technical <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Arsenal</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2.5rem' }}>
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="glass-panel"
                style={{ 
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.01)',
                  borderRadius: '32px'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, background: 'rgba(255, 255, 255, 0.03)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Background glowing orb */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : '#00e5ff',
                  filter: 'blur(80px)',
                  opacity: 0.15,
                  zIndex: -1,
                  borderRadius: '50%'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: 'rgba(0, 245, 212, 0.05)', 
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 245, 212, 0.1)'
                  }}>
                    {category.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                    {category.title}
                  </h3>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}
                >
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="skill-item"
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.5 }} />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .skill-item:hover {
          color: var(--primary) !important;
          transform: translateX(5px);
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Skills;
