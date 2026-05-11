import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Folder, RefreshCw, Users, User, X, Mail } from 'lucide-react';

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
          transition={{ duration: 0.6 }}
        >
          {/* Group Projects Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>03.</span>
              Group Projects <Users color="var(--primary)" size={28} />
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="mono-text" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>04.</span>
              Individual Projects <User color="var(--primary)" size={28} />
            </h2>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
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
              className="glass-panel"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              style={{ maxWidth: '800px', width: '100%', position: 'relative', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'none' }}
              >
                <X size={24} />
              </button>
              
              <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{selectedProject.title}</h2>
              <p className="mono-text" style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>{selectedProject.subtitle}</p>
              
              <h4 style={{ marginBottom: '1rem', color: '#fff' }}>About this Project</h4>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>{selectedProject.description}</p>
              
              <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Technologies Used</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '3rem' }}>
                {selectedProject.tech && selectedProject.tech.map((tech, i) => (
                  <span key={i} className="tag" style={{ fontSize: '0.9rem' }}>
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.members && !selectedProject.subtitle?.toLowerCase().includes('individual') && (
                <>
                  <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Development Team</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {selectedProject.members.map((member, i) => (
                      <div key={i} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid var(--border-color)' }} 
                        />
                        <div style={{ overflow: 'hidden' }}>
                          <h5 style={{ margin: 0, fontSize: '0.95rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</h5>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</p>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                            <a href={member.github} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                               GitHub <ExternalLink size={10} />
                            </a>
                            {member.gmail && (
                              <a href={`mailto:${member.gmail}`} style={{ fontSize: '0.7rem', color: 'var(--secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                 Mail <Mail size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {selectedProject.github && selectedProject.github !== "#" && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink size={18} /> View on GitHub
                  </a>
                )}
                {selectedProject.demo && selectedProject.demo !== "#" && (
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn btn-outline">
                    <ExternalLink size={18} /> Visit Live Project
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
      style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 10, cursor: 'none' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        {icon}
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <GithubIcon size={20} />
            </a>
          )}
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-main)', textTransform: 'capitalize' }}>{project.title}</h3>
      <p className="mono-text" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
        {project.subtitle} {project.isGithub && <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>(Auto-updated)</span>}
      </p>
      <p style={{ fontSize: '0.9rem', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {project.description}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.5rem' }}>
        {project.tech && project.tech.map((tech, i) => (
          <span key={i} className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '10px' }}>
            {tech}
          </span>
        ))}
      </div>
      
      <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
        Click to view details <ExternalLink size={14} />
      </div>
    </motion.div>
  );
};

export default Projects;
