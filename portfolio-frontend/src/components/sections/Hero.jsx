import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import styles from './Hero.module.css';
import profileImg from '../../assets/vineeth_profile.jpg'; // Real Profile Image

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer | AI Enthusiast";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className={`section ${styles.heroSection}`}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.greeting}>Hello, I'm</h2>
            <h1 className={styles.name}>Thallapally <span className="text-gradient">Vineeth</span></h1>
            <h3 className={styles.role}>
              {text}
              <span className={styles.cursor}>|</span>
            </h3>
            <p className={styles.description}>
              I build high-end, scalable web applications with a focus on premium user experiences, robust backend architectures, and AI integrations.
            </p>
            
            <div className={styles.ctaGroup}>
              <a href="#projects" className={styles.primaryBtn}>
                View Projects
              </a>
              <a href="/resume.pdf" className={styles.secondaryBtn} target="_blank" rel="noreferrer" download>
                <Download size={18} />
                Resume
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.heroImageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <img src={profileImg} alt="Thallapally Vineeth" className={styles.profileImg} />
            <div className={styles.glowEffect}></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <a href="#about"><ChevronDown size={32} /></a>
      </motion.div>
    </section>
  );
};

export default Hero;
