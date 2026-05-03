import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import styles from './AIChatbot.module.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Vineeth's AI Assistant. Ask me anything about his skills, experience, or projects!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (question) => {
    const q = question.toLowerCase();
    
    // Simple Rule-based Fallback NLP logic
    if (q.includes('skill') || q.includes('tech')) {
      return "Vineeth specializes in React.js on the frontend and Spring Boot (Java) on the backend. He's also skilled in Python for AI and Selenium for testing.";
    } else if (q.includes('project') || q.includes('build')) {
      return "He has built several projects including an AI Financial Scorer, CareConnect Healthcare portal, and Anil Traders E-commerce app. Check out the Projects section!";
    } else if (q.includes('experience') || q.includes('work')) {
      return "Vineeth is a passionate Software Engineer with a strong foundation in full-stack development. Check out the Journey section to see more!";
    } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
      return "You can reach him via the Contact form on this site, or directly at vineeth@example.com.";
    } else if (q.includes('ai') || q.includes('machine learning')) {
      return "He is an AI enthusiast, skilled in Python and integrating AI tools into full-stack applications (like this Chatbot!).";
    } else {
      return "That's a great question! While I'm just a simple AI assistant, I recommend reaching out to Vineeth directly via the Contact section for a detailed answer.";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    // Simulate network delay
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages([...newMessages, { text: response, isBot: true }]);
    }, 600);
  };

  return (
    <>
      <button 
        className={styles.chatToggleBtn} 
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`glass ${styles.chatWindow}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className={styles.chatHeader}>
              <div>
                <h4>Ask about Vineeth AI</h4>
                <span className={styles.onlineStatus}>Online</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.chatBody}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.isBot ? styles.botMessage : styles.userMessage}`}>
                  <div className={styles.messageBubble}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.chatFooter} onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Type your question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
