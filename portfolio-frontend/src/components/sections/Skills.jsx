import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getSkills } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, 
  FaJava, FaDatabase, FaCode, FaGitAlt, FaAws 
} from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiSpring } from 'react-icons/si';
import styles from './Skills.module.css';

const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('html')) return <FaHtml5 />;
  if (n.includes('css')) return <FaCss3Alt />;
  if (n.includes('javascript') || n === 'js') return <FaJs />;
  if (n.includes('react')) return <FaReact />;
  if (n.includes('angular')) return <FaAngular />;
  if (n.includes('spring boot')) return <SiSpringboot />;
  if (n.includes('spring')) return <SiSpring />;
  if (n.includes('java')) return <FaJava />;
  if (n.includes('mysql')) return <SiMysql />;
  if (n.includes('sql') || n.includes('database')) return <FaDatabase />;
  if (n.includes('c++') || n.includes('c') || n.includes('jdbc')) return <FaCode />;
  if (n.includes('git')) return <FaGitAlt />;
  if (n.includes('aws') || n.includes('cloud')) return <FaAws />;
  return <FaCode />;
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  useEffect(() => {
    getSkills()
      .then(data => {
        setSkills(data);
        setLoading(false);
      });
  }, []);

  const desiredOrder = ['Frontend', 'Backend', 'Database', 'Programming', 'Tools', 'Cloud'];
  const categories = [...new Set(skills.map(skill => skill.category))].sort((a,b) => {
      let idxA = desiredOrder.indexOf(a);
      let idxB = desiredOrder.indexOf(b);
      idxA = idxA === -1 ? 99 : idxA;
      idxB = idxB === -1 ? 99 : idxB;
      return idxA - idxB;
  });

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={48} />
          </div>
        ) : (
          <>
            {/* Infinite Scrolling Marquee Banner */}
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeTrack}>
                {/* Render twice for seamless infinite loop */}
                {[...skills, ...skills].map((skill, i) => (
                  <div key={i} className={styles.marqueeItem}>
                    <span className={styles.marqueeIcon}>{getSkillIcon(skill.name)}</span>
                    <span className={styles.marqueeName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parallax Categorized Grid */}
            <motion.div style={{ y: yParallax }} className={styles.skillsGrid}>
              {categories.map((category, idx) => (
                <motion.div 
                  key={category} 
                  className={`glass ${styles.skillCategoryCard}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className={styles.categoryTitle}>{category}</h3>
                  <div className={styles.skillList}>
                    {skills.filter(s => s.category === category).map((skill, index) => (
                      <motion.div 
                        key={skill.name + index} 
                        className={styles.skillItem}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + (index * 0.05), type: "spring" }}
                      >
                        <div className={styles.skillIconWrapper}>
                          <span className={styles.icon}>{getSkillIcon(skill.name)}</span>
                        </div>
                        <span className={styles.skillName}>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Skills;
