import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../../utils/api';
import ProjectRecommender from '../ai/ProjectRecommender';
import { ExternalLink, X, Loader2 } from 'lucide-react';
import styles from './Projects.module.css';

// 3D Tilt Card Component
const TiltCard = ({ project, onClick, isHighlighted }) => {
  return (
    <motion.div
      className={`${styles.projectCard} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={() => onClick(project)}
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.3)' }}
      animate={{ 
        scale: isHighlighted ? 1.02 : 1 
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layoutId={`project-${project.id}`}
    >
      <div className={styles.cardImageContainer}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
        ) : (
          <div className={styles.imagePlaceholder} style={{ background: `linear-gradient(135deg, ${getRandomColor()} 0%, #13141c 100%)`}}>
            <h3>{project.title.substring(0, 2)}</h3>
          </div>
        )}
      </div>
      
      <div className={styles.cardContent}>
        <h3>{project.title}</h3>
        <p className={styles.shortDesc}>{project.description.slice(0, 80)}...</p>
        <div className={styles.techStackSmall}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech}>{tech}</span>
          ))}
          {project.techStack.length > 3 && <span>+{project.techStack.length - 3}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const getRandomColor = () => {
  const colors = ['#6366f1', '#a855f7', '#14b8a6', '#f59e0b', '#ef4444'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    // API logic with fallback handled cleanly in api.js
    getProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleRecommend = (project) => {
    setHighlightedId(project.id);
    document.getElementById(`projects`).scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setHighlightedId(null), 3000);
  };

  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Selected <span className="text-gradient">Work</span>
        </motion.h2>

        <ProjectRecommender projects={projects} onRecommend={handleRecommend} />

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={48} />
            <p>Loading projects...</p>
          </div>
        ) : (
          <div className={styles.bentoGrid}>
            {projects.map((project) => (
              <TiltCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                isHighlighted={highlightedId === project.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedProject && (
          <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
            <motion.div 
              className={`glass ${styles.modalContent}`}
              layoutId={`project-${selectedProject.id}`}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              <div className={styles.modalImageContainer}>
                {selectedProject.imageUrl ? (
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} className={styles.modalImage} />
                ) : (
                  <div className={styles.imagePlaceholder} style={{ background: `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`}}>
                    <h3>{selectedProject.title.substring(0, 2)}</h3>
                  </div>
                )}
              </div>

              <div className={styles.modalBody}>
                <h2>{selectedProject.title}</h2>
                <p className={styles.modalDescription}>{selectedProject.description}</p>
                
                <div className={styles.techStackFull}>
                  {selectedProject.techStack.map(tech => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className={styles.modalLinks}>
                  <a href={selectedProject.githubLink || '#'} target="_blank" rel="noreferrer" className={styles.iconLink}>
                    Source Code
                  </a>
                  {selectedProject.liveLink && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className={styles.iconLink}>
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
