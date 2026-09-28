import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';
import { AiService } from '../../../core/services/ai.service';


interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss'
})
export class AiAssistantComponent {

  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;

  open = false;
  loading = false;

  input = '';

  messages: ChatMessage[] = [];

  constructor(
    private aiService: AiService
  ) {}

  toggle(): void {
    this.open = !this.open;

    if (this.open && this.messages.length === 0) {
      this.addWelcomeMessage();
    }
  }

  close(): void {
    this.open = false;
  }

  handleEnter(event: Event): void {
    if (event instanceof KeyboardEvent && event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.send();
  }

  addWelcomeMessage(): void {

    this.messages.push({
      role: 'assistant',
      content:
        'Hi! I’m SupplyDesk AI. I can help you understand your sales workspace, products, customers and orders.'
    });
  }

  send(): void {

    const message = this.input.trim();

    if (!message || this.loading) {
      return;
    }

    this.messages.push({
      role: 'user',
      content: message
    });

    this.input = '';
    this.loading = true;

    this.scrollToBottom();

    this.aiService.chat(message).subscribe({

      next: response => {

        this.messages.push({
          role: 'assistant',
          content: response.message
        });

        this.loading = false;

        this.scrollToBottom();
      },

      error: error => {

        this.messages.push({
          role: 'assistant',
          content:
            error?.error?.message ??
            'Sorry, I could not process that request.'
        });

        this.loading = false;

        this.scrollToBottom();
      }
    });
  }

  askSuggestion(message: string): void {

    this.input = message;

    this.send();
  }

  private scrollToBottom(): void {

    setTimeout(() => {

      const element = this.messagesContainer?.nativeElement;

      if (!element) {
        return;
      }

      element.scrollTop = element.scrollHeight;

    });
  }

}