package com.example.demo.controller;

import com.example.demo.dto.ContactRequest;
import com.example.demo.entity.ContactMessage;
import com.example.demo.entity.Project;
import com.example.demo.entity.Skill;
import com.example.demo.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(portfolioService.getAllProjects());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(portfolioService.getAllSkills());
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactMessage> submitContact(@Valid @RequestBody ContactRequest request) {
        ContactMessage savedMessage = portfolioService.saveContactMessage(request);
        return ResponseEntity.ok(savedMessage);
    }
}
