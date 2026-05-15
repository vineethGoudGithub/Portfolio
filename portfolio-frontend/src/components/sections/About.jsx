import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { GraduationCap, Briefcase } from 'lucide-react';

const About = () => {
  const experiences = [
    {
      type: 'edu',
      title: 'B.Tech in Computer Science',
      org: 'JNTUH, Hyderabad',
      desc: 'Computer Science and  Engineering. Graduated '
    },
    {
      type: 'edu',
      title: 'MTECH Computer Science And Engineering',
      org: 'SRUniversity',
      desc: 'Computer Science and engineering'
    }
  ];

  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My <span className="text-gradient">Journey</span>
        </motion.h2>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={styles.timelineDot}>
                {exp.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
              </div>
              <div className={`glass ${styles.timelineContent}`}>
                <span className={styles.date}>{exp.date}</span>
                <h3>{exp.title}</h3>
                <h4>{exp.org}</h4>
                <p>{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
