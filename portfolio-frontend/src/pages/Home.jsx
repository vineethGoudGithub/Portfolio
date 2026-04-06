import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import AIChatbot from '../components/ai/AIChatbot';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <AIChatbot />
      
      <footer style={{ textAlign: 'center', padding: '2rem 0', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
        <p>© {new Date().getFullYear()} Thallapally Vineeth. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
