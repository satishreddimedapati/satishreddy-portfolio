import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating AI Chat Trigger Button -->
    <button class="ai-fab-btn" (click)="toggleChat()">
      <div class="fab-content">
        <span class="fab-icon">🤖</span>
        <span class="fab-text">Ask Satish AI</span>
      </div>
      <span class="pulse-ring"></span>
    </button>

    <!-- Interactive AI Chat Dialog Modal -->
    @if (isOpen()) {
      <div class="chat-modal glass-panel">
        
        <!-- Header -->
        <div class="chat-header">
          <div class="ai-avatar">
            <span class="bot-icon">🤖</span>
            <span class="online-dot"></span>
          </div>
          <div>
            <h3 class="chat-title">Satish's AI Career Assistant</h3>
            <span class="chat-status">Trained on 5+ Years Exp & 25+ Projects</span>
          </div>
          <button class="btn-close-chat" (click)="toggleChat()">✕</button>
        </div>

        <!-- Chat History Area -->
        <div class="chat-messages">
          @for (msg of messages(); track msg.timestamp) {
            <div class="message-bubble" [class.user-bubble]="msg.sender === 'user'" [class.ai-bubble]="msg.sender === 'ai'">
              <span class="msg-sender-label">{{ msg.sender === 'user' ? 'Recruiter' : 'Satish AI' }}</span>
              <p class="msg-text">{{ msg.text }}</p>
            </div>
          }

          @if (isTyping()) {
            <div class="message-bubble ai-bubble typing-indicator">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          }
        </div>

        <!-- Quick Prompts Pills -->
        <div class="quick-prompts">
          <button class="prompt-chip" (click)="sendQuickPrompt('What is Satish\\'s experience with .NET Core & Microservices?')">
            🔷 .NET Core & Microservices
          </button>
          <button class="prompt-chip" (click)="sendQuickPrompt('Tell me about Satish\\'s Angular & Frontend expertise.')">
            🅰️ Angular 17 & Signals
          </button>
          <button class="prompt-chip" (click)="sendQuickPrompt('What Docker, Kubernetes and Azure skills does Satish have?')">
            ☁️ Azure, Docker & AKS
          </button>
          <button class="prompt-chip" (click)="sendQuickPrompt('How can I schedule an interview or hire Satish?')">
            📅 Book Interview / Contact
          </button>
        </div>

        <!-- Input Box -->
        <div class="chat-input-area">
          <input 
            type="text" 
            [(ngModel)]="userQuery" 
            (keyup.enter)="sendMessage()"
            placeholder="Ask anything about Satish's career or skills..." 
            class="chat-input" />
          <button (click)="sendMessage()" [disabled]="!userQuery.trim()" class="btn-send-msg">
            ➔
          </button>
        </div>

      </div>
    }
  `,
  styles: [`
    .ai-fab-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 999;
      padding: 12px 22px;
      border-radius: 40px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border: none;
      color: #000;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      box-shadow: 0 8px 30px var(--primary-glow);
      transition: transform 0.2s;
    }
    .ai-fab-btn:hover { transform: scale(1.05); }
    .fab-content { display: flex; align-items: center; gap: 8px; }
    .fab-icon { font-size: 1.2rem; }

    /* Chat Modal Drawer */
    .chat-modal {
      position: fixed;
      bottom: 95px;
      right: 28px;
      width: 400px;
      max-width: calc(100vw - 40px);
      height: 540px;
      max-height: calc(100vh - 120px);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      border-radius: 24px;
      padding: 0;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
      border-color: var(--primary-glow);
    }
    .chat-header {
      padding: 16px 20px;
      background: rgba(15, 23, 42, 0.95);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ai-avatar { position: relative; }
    .bot-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .online-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 6px var(--accent-green);
    }
    .chat-title { font-size: 0.95rem; font-weight: 800; color: #fff; margin: 0; }
    .chat-status { font-size: 0.7rem; color: var(--primary); font-family: var(--font-mono); }
    .btn-close-chat {
      margin-left: auto;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.1rem;
      cursor: pointer;
    }

    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: rgba(9, 13, 22, 0.85);
    }
    .message-bubble {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .user-bubble {
      align-self: flex-end;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 600;
      border-bottom-right-radius: 4px;
    }
    .ai-bubble {
      align-self: flex-start;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      border-bottom-left-radius: 4px;
    }
    .msg-sender-label {
      display: block;
      font-size: 0.68rem;
      font-family: var(--font-mono);
      opacity: 0.7;
      margin-bottom: 4px;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 18px;
    }
    .typing-indicator .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--primary);
      animation: pulse 1s infinite alternate;
    }
    .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse {
      0% { opacity: 0.3; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); }
    }

    .quick-prompts {
      padding: 8px 12px;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid var(--border-subtle);
    }
    .prompt-chip {
      white-space: nowrap;
      padding: 6px 12px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 600;
      cursor: pointer;
    }
    .prompt-chip:hover { border-color: var(--primary); color: var(--primary); }

    .chat-input-area {
      padding: 12px;
      background: rgba(15, 23, 42, 0.98);
      display: flex;
      gap: 8px;
    }
    .chat-input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 20px;
      background: rgba(9, 13, 22, 0.8);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.85rem;
    }
    .chat-input:focus { outline: none; border-color: var(--primary); }
    .btn-send-msg {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--primary);
      border: none;
      color: #000;
      font-weight: 800;
      cursor: pointer;
    }
  `]
})
export class AiAssistantComponent {
  isOpen = signal(false);
  isTyping = signal(false);
  userQuery = '';

  messages = signal<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hi! I am Satish\'s AI Career Assistant. Ask me anything about Satish\'s 5+ years of experience at Accenture, .NET Core microservices, Angular 17, or 25+ projects!',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  toggleChat() {
    this.isOpen.update(val => !val);
  }

  sendQuickPrompt(promptText: string) {
    this.userQuery = promptText;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.userQuery.trim()) return;

    const queryText = this.userQuery.trim();
    this.userQuery = '';

    // Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString()
    };
    this.messages.update(msgs => [...msgs, userMsg]);
    this.isTyping.set(true);

    // Generate intelligent response based on Satish's verified data
    setTimeout(() => {
      const responseText = this.generateResponse(queryText);
      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString()
      };
      this.messages.update(msgs => [...msgs, aiMsg]);
      this.isTyping.set(false);
    }, 900);
  }

  private generateResponse(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('net') || q.includes('c#') || q.includes('microservice') || q.includes('backend')) {
      return 'Satish has 5+ years of experience at Accenture architecting .NET Core 8 microservices, Entity Framework Core, SQL Server indexing, xUnit testing, and Docker/Kubernetes containerization. He achieved a 60% reduction in SQL query retrieval latency!';
    }
    
    if (q.includes('angular') || q.includes('frontend') || q.includes('typescript') || q.includes('signal')) {
      return 'Satish specializes in modern Angular (v8 through v17), TypeScript, RxJS, Angular Signals state management, and Glassmorphism CSS design. He built high-performance SPAs with lazy loading that boosted load speed by 35%.';
    }

    if (q.includes('azure') || q.includes('docker') || q.includes('kubernetes') || q.includes('devops') || q.includes('aks')) {
      return 'Satish containerizes applications using Docker and manages cloud deployments on Microsoft Azure (App Services, Azure SQL, Azure DevOps CI/CD pipelines, and Azure Kubernetes Service AKS).';
    }

    if (q.includes('project') || q.includes('live') || q.includes('portfolio')) {
      return 'Satish has built 25+ projects! Key live production apps include: 1) AI-Powered Learning Tutor (supabasetodo-85f3f.web.app), 2) EMI & Financial Management Suite (manafinance1.web.app), and 3) AI Tools Navigator (satishonlineaitools-b7199.web.app).';
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('interview') || q.includes('email') || q.includes('phone')) {
      return 'Satish is open for Senior Full Stack, Frontend Angular, and .NET Backend roles! Direct Email: medapatisatishreddy2026@gmail.com | Phone/WhatsApp: +91 7670995678. You can also leave a message in the Contact section of this webapp!';
    }

    return 'Satish Reddy Medapati is a Senior Full Stack Developer with 5+ years of Accenture enterprise experience in .NET Core, Angular, SQL Server, Azure, and GenAI integrations. Feel free to download his target resumes in the Resume Hub section!';
  }
}
