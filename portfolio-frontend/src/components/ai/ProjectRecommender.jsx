import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { recommendProject } from '../../utils/api';
import styles from './ProjectRecommender.module.css';
import { Sparkles, ArrowRight } from 'lucide-react';

const ProjectRecommender = ({ projects, onRecommend }) => {
  const [interest, setInterest] = useState('');

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!interest.trim()) return;
    const recommended = recommendProject(interest, projects);
    if (recommended) {
      onRecommend(recommended);
    }
  };

  return (
    <motion.div 
      className={`glass ${styles.recommenderContainer}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.recommenderHeader}>
        <Sparkles size={24} className={styles.icon} />
        <div>
          <h3>Smart Project Recommender</h3>
          <p>Not sure what to look at? Tell me what interests you!</p>
        </div>
      </div>
      
      <form onSubmit={handleRecommend} className={styles.form}>
        <input 
          type="text" 
          placeholder="e.g. 'I like AI and Python' or 'Show me frontend'"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Find Match <ArrowRight size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default ProjectRecommender;
