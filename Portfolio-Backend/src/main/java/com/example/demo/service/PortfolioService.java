package com.example.demo.service;

import com.example.demo.dto.ContactRequest;
import com.example.demo.entity.ContactMessage;
import com.example.demo.entity.Project;
import com.example.demo.entity.Skill;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ContactRepository contactRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public ContactMessage saveContactMessage(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setMessage(request.getMessage());
        return contactRepository.save(message);
    }
}
