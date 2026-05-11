import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Folder, RefreshCw, Users, User, X, Mail, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const groupProjects = [
    {
      title: "Neurocloud",
      subtitle: "Group Project",
      description: "A full-stack application built to track user moods with secure data handling. Features a responsive UI and efficient frontend & backend integration. This project involved extensive user research and implementing secure authentication flows to protect sensitive user data.",
      tech: ["Kotlin", "Next.js", "Node.js", "MongoDB"],
      github: "https://github.com/N3Edirisinghe/Neuro-Cloud-Mood-Tracking-Application",
      demo: "https://neurocloud.netlify.app",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Chanika Anuradhi", role: "UI/UX & Frontend", github: "https://github.com/Anuradhi-Gunawardhana", avatar: "https://avatars.githubusercontent.com/u/212206235?v=4", gmail: "chanikaanuradhi@gmail.com" }
      ]
    },
    {
      title: "Neuronix",
      subtitle: "Group Project",
      description: "Designed UI/UX for a sign language detection and learning platform. Focused on accessibility, clean layout, and ease of navigation for diverse users. The interface was rigorously tested with target demographics to ensure maximum usability.",
      tech: ["Figma", "UI/UX Design"],
      github: "https://github.com/N3Edirisinghe",
      demo: "https://www.figma.com/design/6qrctqUdIPNty42dLKB73f/Neuronix?node-id=0-1&t=VnmTWjtZzqG6bNEo-1",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Team Neuronix", role: "Collaborative Effort", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" }
      ]
    },
    {
      title: "Findit",
      subtitle: "Group Project",
      description: "Built a secure lost and found web app using React.js, Node.js, and MySQL. Implemented user authentication and robust data handling. The system matches reported lost items with found items using an optimized database schema.",
      tech: ["React.js", "Node.js", "MySQL"],
      github: "https://github.com/N3Edirisinghe",
      demo: "#",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Team Findit", role: "Collaborative Effort", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" }
      ]
    },
    {
      title: "Ovumate",
      subtitle: "Group Project",
      description: "A cycle tracking application designed with user privacy and accurate predictions in mind. Features a highly intuitive interface and secure data management. Health metrics are encrypted and stored locally whenever possible to ensure maximum security.",
      tech: ["React Native", "Node.js", "MongoDB"],
      github: "https://github.com/N3Edirisinghe/Ovumate-Cycle-Tracking-App-",
      demo: "https://ovumate.netlify.app",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Chanika Anuradhi", role: "Frontend Developer", github: "https://github.com/Anuradhi-Gunawardhana", avatar: "https://avatars.githubusercontent.com/u/212206235?v=4", gmail: "chanikaanuradhi@gmail.com" }
      ]
    },
    {
      title: "Lanka Smartmart",
      subtitle: "Group Project",
      description: "A comprehensive e-commerce platform built for the Sri Lankan market. Implemented secure payment gateways, inventory management, and a user-friendly shopping experience. Includes vendor dashboards and automated email receipts.",
      tech: ["React.js", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/N3Edirisinghe/Lanka_Smart_Mart",
      demo: "#",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Binara Hansaka", role: "QA & Features", github: "https://github.com/binarahansaka", avatar: "https://avatars.githubusercontent.com/u/205523367?v=4", gmail: "binarahansaka@gmail.com" },
        { name: "Thrithwaka", role: "Core Features", github: "https://github.com/Thrithwaka", avatar: "https://avatars.githubusercontent.com/u/156334953?v=4", gmail: "thrithwaka@gmail.com" }
      ]
    },
    {
      title: "Malsimx",
      subtitle: "Group Project",
      description: "A collaborative digital solution built to address specific user needs with a focus on scalable architecture and secure implementation. We designed a microservices architecture to handle high traffic and ensure platform stability.",
      tech: ["React.js", "Node.js", "MongoDB"],
      github: "https://github.com/N3Edirisinghe/MalSimX",
      demo: "#",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" },
        { name: "Siluna Dangalla", role: "Systems Developer", github: "https://github.com/GitGuru29", avatar: "https://avatars.githubusercontent.com/u/153946603?v=4", gmail: "silunadangalla@gmail.com" }
      ]
    },
    {
      title: "AetherNet",
      subtitle: "Group Project (Currently Developing)",
      description: "A high-performance networking engine being scaled to support 10Gbps+ throughput. Currently implementing advanced optimizations including kernel-bypass (AF_XDP), SIMD-accelerated packet inspection, and lock-free multi-threading for enterprise-grade scalability.",
      tech: ["C++", "AF_XDP", "Networking", "SIMD"],
      github: "https://github.com/N3Edirisinghe",
      demo: "#",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" }
      ]
    }
  ];

  // Individual Projects
  const individualProjects = [
    {
      title: "UniVote",
      subtitle: "Individual Project",
      description: "A secure, digital voting platform designed for university elections. Implemented robust authentication and a streamlined voting interface to ensure election integrity and user accessibility.",
      tech: ["React.js", "Node.js", "MongoDB"],
      github: "https://github.com/N3Edirisinghe/UniVote",
      demo: "https://sltc-voting.vercel.app/",
      members: [
        { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" }
      ]
    }
  ];

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        setLoading(true);
        const username = 'N3Edirisinghe'; 
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (response.ok) {
          const data = await response.json();
          const formattedProjects = data
            .filter(repo => !repo.fork && repo.name.toLowerCase() !== username.toLowerCase())
            .map(repo => ({
              title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
              subtitle: "Individual Project (GitHub)",
              description: repo.description || "No description provided for this repository.",
              tech: repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
              github: repo.html_url,
              demo: repo.homepage || "#",
              isGithub: true,
              members: [
                { name: "Nilupul Thisaranga", role: "UI/UX & Core", github: "https://github.com/N3Edirisinghe", avatar: "https://avatars.githubusercontent.com/u/263918354?v=4", gmail: "10nilupulthisaranga@gmail.com" }
              ]
            }))
            .filter(repo => {
              const repoTitle = repo.title.toLowerCase().replace(/\s+/g, '');
              const allManualProjects = [...groupProjects, ...individualProjects];
              return !allManualProjects.some(mp => {
                const mpTitle = mp.title.toLowerCase().replace(/\s+/g, '');
                return repoTitle.includes(mpTitle) || mpTitle.includes(repoTitle);
              });
            });
          setGithubProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubProjects();
  }, []);

  const allIndividualProjects = [
    ...individualProjects,
    ...githubProjects.filter(repo => {
      const repoTitle = repo.title.toLowerCase().replace(/\s+/g, '');
      const allManualProjects = [...groupProjects, ...individualProjects];
      return !allManualProjects.some(mp => {
        const mpTitle = mp.title.toLowerCase().replace(/\s+/g, '');
        return repoTitle.includes(mpTitle) || mpTitle.includes(repoTitle);
      });
    })
  ];

  return (
    <section id="projects" className="section" style={{ minHeight: 'auto' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Group Projects Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5 }}>03.</span>
              Collaborative <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Ventures</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>

          <div className="grid grid-cols-3" style={{ marginBottom: '5rem' }}>
            {groupProjects.map((project, index) => (
              <ProjectCard 
                key={`group-${index}`} 
                project={project} 
                index={index} 
                icon={<Users size={32} color="var(--secondary)" />} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Individual Projects Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '1rem', opacity: 0.5 }}>04.</span>
              Independent <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Systems</span>
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
            {loading && <RefreshCw className="animate-spin" color="var(--primary)" size={24} />}
          </div>

          <div className="grid grid-cols-3">
            {allIndividualProjects.map((project, index) => (
              <ProjectCard 
                key={`indiv-${index}`} 
                project={project} 
                index={index} 
                icon={<Folder size={32} color="var(--primary)" />} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          
        </motion.div>
      </div>

      {/* Modal Popup for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              zIndex: 99999, padding: '2rem'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ 
                maxWidth: '800px', 
                width: '100%', 
                position: 'relative', 
                cursor: 'default',
                background: 'rgba(5, 15, 15, 0.8)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderRadius: '40px',
                padding: '4rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
              
              <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '2.5rem' }}>{selectedProject.title}</h2>
              <p style={{ color: 'var(--primary)', marginBottom: '3rem', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{selectedProject.subtitle}</p>
              
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Project Narrative</h4>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', opacity: 0.9, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{selectedProject.description}</p>
              </div>
              
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Technology Stack</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {selectedProject.tech && selectedProject.tech.map((tech, i) => (
                    <span key={i} style={{ 
                      padding: '8px 20px', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      borderRadius: '100px', 
                      fontSize: '0.8rem', 
                      color: 'var(--primary)',
                      border: '1px solid rgba(0, 245, 212, 0.1)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.members && !selectedProject.subtitle?.toLowerCase().includes('individual') && (
                <div style={{ marginBottom: '4rem' }}>
                  <h4 style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>The Architects</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {selectedProject.members.map((member, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} 
                        />
                        <div style={{ overflow: 'hidden' }}>
                          <h5 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>{member.name}</h5>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {selectedProject.github && selectedProject.github !== "#" && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn" style={{ 
                    padding: '1rem 2.5rem', 
                    background: 'var(--primary)', 
                    color: 'var(--bg-dark)',
                    borderRadius: '100px'
                  }}>
                    Source Intel
                  </a>
                )}
                {selectedProject.demo && selectedProject.demo !== "#" && (
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn" style={{ 
                    padding: '1rem 2.5rem', 
                    border: '1px solid var(--primary)', 
                    color: 'var(--primary)',
                    borderRadius: '100px'
                  }}>
                    Live Access
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7a5.2 5.2 0 0 0-1.5-3.8 4.3 4.3 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.5 5 1.8 5 1.8a4.3 4.3 0 0 0-.1 3.8A5.2 5.2 0 0 0 3 9.4c0 5.6 3.3 6.6 6.5 7a4.8 4.8 0 0 0-1 3.03V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const ProjectCard = ({ project, index, icon, onClick }) => {
  return (
    <motion.div 
      className="glass-panel"
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        position: 'relative', 
        zIndex: 10, 
        cursor: 'none',
        padding: '3rem 2.5rem',
        borderRadius: '32px',
        background: 'rgba(255, 255, 255, 0.01)'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, background: 'rgba(255, 255, 255, 0.02)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ color: 'var(--primary)', opacity: 0.4 }}>{icon}</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'all 0.3s' }}>
              <GithubIcon size={18} />
            </a>
          )}
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'all 0.3s' }}>
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: '#fff', textTransform: 'none' }}>{project.title}</h3>
      <p style={{ fontSize: '0.75rem', marginBottom: '1.5rem', color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
        {project.subtitle}
      </p>
      
      <p style={{ fontSize: '0.95rem', flex: 1, color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
        {project.description}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '2rem' }}>
        {project.tech && project.tech.slice(0, 3).map((tech, i) => (
          <span key={i} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
            {tech}
          </span>
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>
        Details <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

export default Projects;
