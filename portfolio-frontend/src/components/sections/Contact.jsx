import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { submitContact } from '../../utils/api';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email formatting";
    if (formData.message.trim().length < 10) tempErrors.message = "Message must be at least 10 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (Object.keys(errors).length > 0) setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    try {
      await submitContact(formData);
      // Ensure we hit success even on fallback (api.js intercepts failures)
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="container">
        <motion.div 
          className={`glass ${styles.contactContainer}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.contactInfo}>
            <h2>Let's <span className="text-gradient">Connect</span></h2>
            <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            
            <div className={styles.infoDetails}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email</span>
                <a href="mailto:vineeth@example.com">vineeth@example.com</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Socials</span>
                <div className={styles.socialLinks}>
                  <a href="https://linkedin.com/in/vineeth-thallapally" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://github.com/vineethGoudGithub" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="#">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            {status === 'success' ? (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircle size={48} className={styles.successIcon} />
                <h3>Message Sent!</h3>
                <p>I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={errors.name ? styles.inputError : ''}
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                  {errors.name && <span className={styles.errorText}><AlertCircle size={14}/> {errors.name}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={errors.email ? styles.inputError : ''}
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                  {errors.email && <span className={styles.errorText}><AlertCircle size={14}/> {errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    className={errors.message ? styles.inputError : ''}
                    value={formData.message} 
                    onChange={handleChange} 
                  ></textarea>
                  {errors.message && <span className={styles.errorText}><AlertCircle size={14}/> {errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? (
                    <><Loader2 className={styles.spinner} size={18} /> Sending...</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
                {status === 'error' && (
                  <p className={styles.errorMsg}>Something went wrong. Please try again later.</p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
