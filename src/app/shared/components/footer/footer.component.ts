import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <p class="copyright">
          © 2026 <strong>Satish Reddy Medapati</strong>. Built with Angular 21, Signals & Glassmorphism Design.
        </p>
        <div class="footer-links">
          <a href="#about">About</a>
          <a href="#projects">24 Projects</a>
          <a href="#skills">Tech Matrix</a>
          <a href="#resumes">95+ ATS Resumes</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--border-subtle);
      padding: 30px 20px;
      background: rgba(9, 13, 22, 0.95);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .copyright {
      font-size: 0.85rem;
      color: var(--text-dim);
    }
    .copyright strong { color: var(--text-muted); }
    .footer-links {
      display: flex;
      gap: 20px;
    }
    .footer-links a {
      color: var(--text-dim);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--primary); }
  `]
})
export class FooterComponent {}
