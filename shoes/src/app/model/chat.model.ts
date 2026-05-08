// src/app/model/chat.model.ts

export interface ChatRequest {
  message: string;
  model: string;
}

export interface ChatResponse {
  response: string;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}