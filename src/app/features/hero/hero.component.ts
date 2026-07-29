import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="hero-section">
      <div class="hero-container" [class.video-active-grid]="isPlayingVideo()">
        
        <!-- Left Column: Bio & Role Switcher -->
        <div class="hero-content" [class.compact-content]="isPlayingVideo()">
          <div class="section-badge">
            <span class="pulse-dot"></span> 5+ YEARS ENTERPRISE SOFTWARE EXPERIENCE
          </div>

          <h1 class="hero-name">
            Hi, I'm <span class="name-gradient">Satish Reddy Medapati</span>
          </h1>

          <div class="role-terminal glass-panel">
            <span class="terminal-prefix">> current_role:</span>
            <span class="role-text">{{ currentRole() }}</span>
          </div>

          <p class="hero-bio">
            Senior Full Stack Developer specializing in <strong>.NET Core, Angular (v8-v17), SQL Server</strong>, and <strong>Microsoft Azure</strong>. Proven track record at Accenture converting legacy enterprise monoliths into clean microservices, optimizing database retrieval speeds by 60%, and automating workflows with Python & AI integration.
          </p>

          <div class="hero-actions">
            <a href="#resumes" class="btn-primary">
              <span>📄 View Professional Resumes</span>
            </a>
            <a href="#projects" class="btn-secondary">
              <span>🚀 Explore 25+ Projects</span>
            </a>
          </div>

          <!-- Quick Metrics -->
          <div class="hero-stats glass-panel">
            <div class="stat-item">
              <span class="stat-num">5+</span>
              <span class="stat-label">Years Exp</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">25+</span>
              <span class="stat-label">Total Projects</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">35%</span>
              <span class="stat-label">App Speed Gain</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">60%</span>
              <span class="stat-label">SQL Latency Cut</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Horizontally & Vertically Expanded Media Card -->
        <div class="hero-visual">
          <div class="avatar-card glass-panel" [class.expanded-card]="isPlayingVideo()">
            
            @if (isPlayingVideo()) {
              <div class="video-container">
                <video 
                  src="satish_intro.mp4" 
                  controls 
                  autoplay
                  (ended)="onVideoEnded()" 
                  class="intro-video-element">
                  Your browser does not support HTML5 video.
                </video>
                <button class="close-video-btn" (click)="stopVideo()">
                  ✕ Close Theater View
                </button>
              </div>
            } @else {
              <div class="avatar-wrapper">
                <img src="satish_pic.jpg" alt="Satish Reddy Medapati" class="avatar-img" />
                <div class="avatar-glow"></div>
              </div>

              <div class="intro-video-overlay" (click)="playVideo()">
                <button class="play-btn">
                  <span class="play-icon">▶</span>
                </button>
                <div class="video-info">
                  <span class="video-title">Play Self-Intro Video 🎥</span>
                  <span class="video-subtitle">Click to expand & play Satish's video (Plays once)</span>
                </div>
              </div>
            }

            <!-- Floating Tech Badges -->
            <div class="badge-float badge-dotnet">.NET Core 8</div>
            <div class="badge-float badge-angular">Angular 17</div>
            <div class="badge-float badge-azure">Azure Cloud</div>
            <div class="badge-float badge-ai">GenAI / OpenAI</div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding: 110px 20px 60px;
      max-width: 1320px;
      margin: 0 auto;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      transition: all 0.4s ease-in-out;
    }
    .hero-container.video-active-grid {
      grid-template-columns: 0.7fr 1.3fr;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 10px var(--accent-green);
    }
    .hero-name {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 16px;
    }
    .name-gradient {
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .role-terminal {
      padding: 12px 18px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-size: 1.1rem;
      border-radius: 12px;
      margin-bottom: 20px;
      background: rgba(15, 23, 42, 0.8);
      border-color: var(--primary-glow);
    }
    .terminal-prefix { color: var(--accent-green); }
    .role-text { color: var(--primary); font-weight: 700; }
    .hero-bio {
      color: var(--text-muted);
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 28px;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .btn-primary {
      padding: 14px 28px;
      border-radius: 30px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 20px var(--primary-glow);
      transition: transform 0.2s;
    }
    .btn-primary:hover { transform: translateY(-2px); }
    .btn-secondary {
      padding: 14px 28px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-secondary:hover { border-color: var(--primary); color: var(--primary); }

    .hero-stats {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 16px 24px;
      border-radius: 16px;
    }
    .stat-item { text-align: center; }
    .stat-num {
      display: block;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--primary);
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }
    .stat-divider {
      width: 1px;
      height: 30px;
      background: var(--border-subtle);
    }

    .avatar-card {
      position: relative;
      padding: 14px;
      border-radius: 24px;
      text-align: center;
      transition: all 0.3s ease;
    }
    .avatar-wrapper {
      position: relative;
      width: 100%;
      height: 500px;
      border-radius: 20px;
      overflow: hidden;
      background: #000;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      border-radius: 20px;
      display: block;
    }

    .video-container {
      position: relative;
      width: 100%;
      height: 560px;
      border-radius: 20px;
      overflow: hidden;
      background: #000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    }
    .intro-video-element {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 20px;
      display: block;
      background: #000;
    }
    .close-video-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      padding: 8px 16px;
      border-radius: 20px;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--primary);
      color: var(--primary);
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      z-index: 10;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }

    .intro-video-overlay {
      position: absolute;
      bottom: 24px;
      left: 24px;
      right: 24px;
      padding: 14px 20px;
      background: rgba(9, 13, 22, 0.92);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      border: 1px solid var(--primary-glow);
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .intro-video-overlay:hover { transform: scale(1.02); }
    .play-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--primary);
      border: none;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      cursor: pointer;
      box-shadow: 0 0 15px var(--primary-glow);
    }
    .video-info { text-align: left; }
    .video-title { display: block; font-weight: 700; font-size: 0.9rem; color: #fff; }
    .video-subtitle { font-size: 0.72rem; color: var(--text-muted); }

    .badge-float {
      position: absolute;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 700;
      font-family: var(--font-mono);
      background: rgba(16, 24, 40, 0.9);
      border: 1px solid var(--border-glow);
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
    .badge-dotnet { top: -12px; left: -12px; color: var(--accent-purple); }
    .badge-angular { top: -12px; right: -12px; color: #f43f5e; }
    .badge-azure { bottom: 95px; left: -18px; color: var(--primary); }
    .badge-ai { bottom: 95px; right: -18px; color: var(--accent-green); }

    @media (max-width: 900px) {
      .hero-section { padding-top: 100px; }
      .hero-container, .hero-container.video-active-grid { grid-template-columns: 1fr; gap: 30px; }
      .hero-name { font-size: 2.2rem; }
      .avatar-wrapper { height: 360px; }
      .video-container { height: 360px; }
      .hero-stats { flex-wrap: wrap; gap: 16px; }
      .stat-divider { display: none; }
      .badge-float { display: none; }
    }
  `]
})
export class HeroComponent {
  readonly currentRole = signal('Senior Full Stack Developer (.NET & Angular)');
  readonly isPlayingVideo = signal(false);

  playVideo() {
    this.isPlayingVideo.set(true);
  }

  stopVideo() {
    this.isPlayingVideo.set(false);
  }

  onVideoEnded() {
    this.isPlayingVideo.set(false);
  }
}
