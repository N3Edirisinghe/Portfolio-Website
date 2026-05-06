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
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>02.</span>
              Technical Arsenal
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, var(--primary) 0%, transparent 100%)', opacity: 0.5 }}></div>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="glass-panel skill-card"
                style={{ 
                  position: 'relative', 
                  zIndex: 10,
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 255, 157, 0.1)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {category.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: 0, lineHeight: 1.2 }}>
                    {category.title}
                  </h3>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}
                >
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="skill-item"
                    >
                      <Hexagon size={12} color={index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : '#00e5ff'} style={{ minWidth: '12px' }} />
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
        .skill-card {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .skill-card:hover {
          border-color: rgba(0, 255, 157, 0.3);
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .skill-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          transform: translateX(5px);
          border-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Skills;
