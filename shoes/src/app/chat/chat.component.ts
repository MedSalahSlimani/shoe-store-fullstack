// src/app/chat/chat.component.ts

import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../model/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  message = '';
  messages: ChatMessage[] = [];
  loading = false;
  
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {
    // Message de bienvenue
    this.messages.push({
      text: '👋 Bonjour ! Je suis votre assistant chaussures. Posez-moi vos questions sur Nike, Adidas, Hoka, etc.',
      isUser: false,
      timestamp: new Date()
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.message.trim()) return;

    // Ajouter le message de l'utilisateur
    this.messages.push({
      text: this.message,
      isUser: true,
      timestamp: new Date()
    });

    const userMessage = this.message;
    this.message = '';
    this.loading = true;

    // Envoyer au backend
    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        this.messages.push({
          text: response.response,
          isUser: false,
          timestamp: new Date()
        });
        this.loading = false;
      },
      error: (err) => {
        this.messages.push({
          text: '❌ Désolé, une erreur est survenue. Vérifiez que le backend est démarré.',
          isUser: false,
          timestamp: new Date()
        });
        this.loading = false;
        console.error('Erreur chat:', err);
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}