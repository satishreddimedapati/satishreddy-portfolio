import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar glass-panel">
      <div class="nav-brand">
        <span class="brand-avatar-mini">
          <img src="satish_pic.jpg" alt="Satish Reddy Medapati" />
        </span>
        <div class="brand-text">
          <span class="brand-name">SATISH REDDY MEDAPATI</span>
          <span class="brand-role">Senior Full Stack Developer</span>
        </div>
      </div>

      <div class="nav-links">
        <a href="#about" class="nav-link">About</a>
        <a href="#projects" class="nav-link">Projects (25+)</a>
        <a href="#skills" class="nav-link">Tech Stack</a>
        <a href="#resumes" class="nav-link highlight">Resumes</a>
        <a href="#contact" class="nav-link">Contact</a>

        @if (authService.currentUser()) {
          <div class="user-pill">
            <span class="user-name">👤 {{ authService.currentUser()?.name }}</span>
            @if (authService.isAdmin()) {
              <span class="admin-tag">👑 Admin</span>
            }
            <button class="btn-logout" (click)="authService.logout()">Logout</button>
          </div>
        }
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      max-width: 1200px;
      padding: 10px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      border-radius: 50px;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-avatar-mini {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--primary);
    }
    .brand-avatar-mini img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .brand-name {
      display: block;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-main);
      letter-spacing: 0.5px;
    }
    .brand-role {
      display: block;
      font-size: 0.75rem;
      color: var(--primary);
      font-family: var(--font-mono);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-link:hover, .nav-link.highlight {
      color: var(--primary);
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--border-glow);
    }
    .user-name { font-size: 0.75rem; color: var(--text-main); font-weight: 600; }
    .admin-tag {
      background: var(--accent-purple);
      color: #000;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.65rem;
      font-weight: 800;
    }
    .btn-logout {
      background: transparent;
      border: none;
      color: #f43f5e;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
}
