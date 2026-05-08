package com.shoestore.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class OllamaService {
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public OllamaService() {
        this.webClient = WebClient.create("http://localhost:11434");
        this.objectMapper = new ObjectMapper();
    }
    
    public Mono<String> generateResponse(String prompt, String model) {
        String body = String.format(
            "{\"model\": \"%s\", \"prompt\": \"%s\", \"stream\": false}",
            model, escapeJson(prompt)
        );
        
        System.out.println("📤 Appel Ollama avec modèle: " + model);
        
        return webClient.post()
            .uri("/api/generate")
            .header("Content-Type", "application/json")
            .bodyValue(body)
            .retrieve()
            .bodyToMono(String.class)
            .map(response -> {
                try {
                    JsonNode json = objectMapper.readTree(response);
                    String result = json.get("response").asText();
                    System.out.println("📥 Réponse reçue");
                    return result;
                } catch (Exception e) {
                    return "❌ Erreur: " + e.getMessage();
                }
            })
            .onErrorReturn("❌ Désolé, l'assistant IA n'est pas disponible. Vérifiez que Ollama est lancé (`ollama serve`)");
    }
    
    private String escapeJson(String s) {
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}