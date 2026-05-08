package com.shoestore.controller;

import com.shoestore.dto.ChatRequest;
import com.shoestore.dto.ChatResponse;
import com.shoestore.service.OllamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {
    
    @Autowired
    private OllamaService ollamaService;
    
    @PostMapping
    public Mono<ChatResponse> chat(@RequestBody ChatRequest request) {
        String prompt = buildPrompt(request.getMessage());
        return ollamaService.generateResponse(prompt, request.getModel())
            .map(ChatResponse::new);
    }
    
    private String buildPrompt(String userMessage) {
        return """
            Tu es un assistant spécialisé dans la vente de chaussures (shoe store).
            
            Informations du magasin:
            - Marques disponibles: Nike, Adidas, Hoka, New Balance, Puma, Asics
            - Prix moyens: Nike 70€, Adidas 90€, Hoka 100€, New Balance 120€, Puma 60€, Asics 80€
            
            Règles:
            - Réponds en français
            - Sois court et utile (max 3 phrases)
            - Propose des chaussures selon les besoins du client
            
            Client: %s
            
            Assistant: 
            """.formatted(userMessage);
    }
}