import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolio-1-89xt.onrender.com/api/portfolio',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Fallback data
export const fallbackProjects = [
  { id: 1, title: 'Employee Management System', description: 'A comprehensive system for managing employee records securely and efficiently.', techStack: ['Angular', 'Spring Boot'], githubLink: '#', liveLink: null, imageUrl: 'https://picsum.photos/seed/p1/800/600' },
  { id: 2, title: 'E-Commerce Web Application', description: 'A rich e-commerce platform with secure JWT authentication and state-of-the-art UI.', techStack: ['React', 'Spring Boot', 'JWT'], githubLink: '#', liveLink: '#', imageUrl: 'https://picsum.photos/seed/p2/800/600' },
  { id: 3, title: 'Delivery Management System', description: 'A scalable API-driven system designed to handle high-volume delivery operations.', techStack: ['Spring Boot APIs'], githubLink: '#', liveLink: null, imageUrl: 'https://picsum.photos/seed/p3/800/600' },
  { id: 4, title: 'Heart Disease Prediction System', description: 'An intelligent predictive model assisting in early diagnosis of heart disease.', techStack: ['Machine Learning', 'Python'], githubLink: '#', liveLink: null, imageUrl: 'https://picsum.photos/seed/p4/800/600' }
];

export const fallbackSkills = [
  { category: 'Frontend', name: 'HTML', proficiencyLevel: 95 },
  { category: 'Frontend', name: 'CSS', proficiencyLevel: 90 },
  { category: 'Frontend', name: 'JavaScript', proficiencyLevel: 90 },
  { category: 'Frontend', name: 'React.js', proficiencyLevel: 85 },
  { category: 'Frontend', name: 'Angular', proficiencyLevel: 80 },
  { category: 'Backend', name: 'Java', proficiencyLevel: 95 },
  { category: 'Backend', name: 'Spring Boot', proficiencyLevel: 90 },
  { category: 'Backend', name: 'Spring MVC', proficiencyLevel: 85 },
  { category: 'Database', name: 'MySQL', proficiencyLevel: 85 },
  { category: 'Database', name: 'SQL', proficiencyLevel: 90 },
  { category: 'Programming', name: 'C', proficiencyLevel: 80 },
  { category: 'Programming', name: 'C++', proficiencyLevel: 80 },
  { category: 'Programming', name: 'Java', proficiencyLevel: 95 }, // Can be in both categories conceptually
  { category: 'Tools', name: 'Git', proficiencyLevel: 90 },
  { category: 'Tools', name: 'JDBC', proficiencyLevel: 85 },
  { category: 'Cloud', name: 'AWS', proficiencyLevel: 75 },
];

export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (error) {
    console.warn("API Call Failed: Using Fallback Projects Data");
    return fallbackProjects;
  }
};

export const getSkills = async () => {
  try {
    const res = await api.get('/skills');
    return res.data;
  } catch (error) {
    console.warn("API Call Failed: Using Fallback Skills Data");
    return fallbackSkills;
  }
};

export const submitContact = async (data) => {
  try {
    const res = await api.post('/contact', data);
    return res.data;
  } catch (error) {
    console.warn("API Call Failed: Simulating Successful Contact Submission");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: 999, ...data, createdAt: new Date().toISOString() };
  }
};

export const recommendProject = (interest, allProjects) => {
  if (!allProjects || allProjects.length === 0) return null;
  const keywords = interest.toLowerCase().split(/[\s,]+/);
  let bestMatch = null;
  let maxScore = -1;

  allProjects.forEach((proj) => {
    let score = 0;
    const textToSearch = `${proj.title} ${proj.description} ${proj.techStack.join(' ')}`.toLowerCase();
    keywords.forEach(kw => {
      if (kw.length > 2 && textToSearch.includes(kw)) score++;
    });
    // Add bonus if title strongly matches
    if (textToSearch.includes(interest.toLowerCase())) score += 5;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = proj;
    }
  });

  return maxScore > 0 ? bestMatch : allProjects[0];
};

export default api;
