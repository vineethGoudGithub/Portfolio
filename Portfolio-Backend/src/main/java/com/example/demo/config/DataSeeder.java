package com.example.demo.config;

import com.example.demo.entity.Project;
import com.example.demo.entity.Skill;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private SkillRepository skillRepository;

    @Override
    public void run(String... args) {
        seedSkills();
        seedProjects();
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            // Frontend
            skillRepository.save(new Skill(null, "HTML", "Frontend", 95));
            skillRepository.save(new Skill(null, "CSS", "Frontend", 90));
            skillRepository.save(new Skill(null, "JavaScript", "Frontend", 90));
            skillRepository.save(new Skill(null, "React.js", "Frontend", 85));
            skillRepository.save(new Skill(null, "Angular", "Frontend", 80));
            // Backend
            skillRepository.save(new Skill(null, "Java", "Backend", 95));
            skillRepository.save(new Skill(null, "Spring Boot", "Backend", 90));
            skillRepository.save(new Skill(null, "Spring MVC", "Backend", 85));
            // Database
            skillRepository.save(new Skill(null, "MySQL", "Database", 85));
            skillRepository.save(new Skill(null, "SQL", "Database", 90));
            // Programming
            skillRepository.save(new Skill(null, "C", "Programming", 80));
            skillRepository.save(new Skill(null, "C++", "Programming", 80));
            skillRepository.save(new Skill(null, "Java", "Programming", 95));
            // Tools
            skillRepository.save(new Skill(null, "Git", "Tools", 90));
            skillRepository.save(new Skill(null, "JDBC", "Tools", 85));
            // Cloud
            skillRepository.save(new Skill(null, "AWS", "Cloud", 75));
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            Project p1 = new Project(null, "Employee Management System", 
                "A comprehensive system for managing employee records securely and efficiently.", 
                List.of("Angular", "Spring Boot"), "https://github.com/vineeth/employee-management", null, "https://picsum.photos/seed/p1/800/600");

            Project p2 = new Project(null, "E-Commerce Web Application", 
                "A rich e-commerce platform with secure JWT authentication and state-of-the-art UI.", 
                List.of("React", "Spring Boot", "JWT", "SQL"), "https://github.com/vineeth/ecommerce", "https://demo.ecommerce.com", "https://picsum.photos/seed/p2/800/600");

            Project p3 = new Project(null, "Delivery Management System", 
                "A scalable API-driven system designed to handle high-volume delivery operations.", 
                List.of("Spring Boot", "Java", "MySQL"), "https://github.com/vineeth/delivery-system", null, "https://picsum.photos/seed/p3/800/600");
                
            Project p4 = new Project(null, "Heart Disease Prediction System", 
                "An intelligent predictive model assisting in early diagnosis of heart disease parameters.", 
                List.of("Machine Learning", "Python"), "https://github.com/vineeth/heart-disease-ml", null, "https://picsum.photos/seed/p4/800/600");

            projectRepository.saveAll(List.of(p1, p2, p3, p4));
        }
    }
}
