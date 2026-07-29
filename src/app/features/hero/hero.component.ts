import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="container hero-container">
        
        <!-- Left Column: Intro & Impact Badges -->
        <div class="hero-text-col">
          
          <div class="status-pill">
            <span class="pulse-dot"></span>
            <span>AVAILABLE FOR SENIOR FULL STACK / LEAD ROLES</span>
          </div>

          <h1 class="hero-title">
            Hi, I'm <span class="gradient-text">Satish Reddy Medapati</span> 👋
          </h1>
          
          <h2 class="hero-subtitle">
            Senior Full Stack Engineer & Product Creator (5+ Yrs Exp @ Accenture)
          </h2>

          <!-- Smart Executive Summary Capsule -->
          <div class="executive-summary-box glass-panel">
            <div class="summary-header">
              <span class="summary-badge">⚡ THE ENGINEERING PROFILE</span>
            </div>
            <p class="summary-text">
              High-output Senior Full Stack Engineer with <strong>5+ years at Accenture</strong> specializing in 
              <strong>.NET Core 8 microservices</strong>, <strong>Angular 17/21 Signals</strong>, and <strong>Cloud AI Architecture</strong>. 
              Creator of <strong>25+ production apps</strong> spanning financial ledgers, GenAI roadmaps, and automated media pipelines.
            </p>

            <div class="archetype-tags">
              <span class="arch-tag">🏎️ High-Output Builder</span>
              <span class="arch-tag">🤖 GenAI Integrator</span>
              <span class="arch-tag">💳 FinTech & Ledger Architect</span>
              <span class="arch-tag">☁️ Azure Cloud Practitioner</span>
            </div>
          </div>

          <div class="hero-metrics">
            <div class="metric-card glass-panel">
              <span class="metric-num">5+</span>
              <span class="metric-label">Years @ Accenture</span>
            </div>
            <div class="metric-card glass-panel">
              <span class="metric-num">25+</span>
              <span class="metric-label">Projects Built</span>
            </div>
            <div class="metric-card glass-panel">
              <span class="metric-num">60%</span>
              <span class="metric-label">SQL Latency Cut</span>
            </div>
            <div class="metric-card glass-panel">
              <span class="metric-num">1,000+</span>
              <span class="metric-label">Students Reached</span>
            </div>
          </div>

          <div class="hero-actions">
            <a href="#projects" class="btn-primary">
              <span>Explore 25+ Projects 🚀</span>
            </a>
            <a href="#resumes" class="btn-secondary">
              <span>View Resumes 📄</span>
            </a>
          </div>

        </div>

        <!-- Right Column: Widescreen Expandable Video Intro & Fitted Avatar -->
        <div class="hero-media-col">
          <div class="avatar-card glass-panel" [class.expanded]="isVideoPlaying">
            
            @if (isVideoPlaying) {
              <div class="video-container">
                <video 
                  #videoPlayer
                  controls 
                  autoplay 
                  src="satish_intro.mp4" 
                  class="hero-video"
                  (ended)="onVideoEnded()">
                </video>
                <button class="btn-close-video" (click)="stopVideo()">✕ Close Video</button>
              </div>
            } @else {
              <div class="avatar-wrapper" (click)="playVideo()">
                <img src="satish_pic.jpg" alt="Satish Reddy Medapati" class="avatar-img" />
                <div class="play-overlay">
                  <div class="play-btn">
                    <span class="play-icon">▶</span>
                  </div>
                  <span class="play-text">Watch 1-Min Video Intro</span>
                </div>
              </div>
            }

            <div class="media-footer">
              <div class="person-info">
                <h3 class="person-name">Satish Reddy Medapati</h3>
                <p class="person-title">Hyderabad, India • Accenturite</p>
              </div>
              <div class="social-mini-links">
                <a href="https://linkedin.com/in/satishreddy-medapati" target="_blank" title="LinkedIn">💼</a>
                <a href="https://github.com/satishreddimedapati" target="_blank" title="GitHub">🐙</a>
                <a href="https://www.kudosites.com/site/satish-reddy" target="_blank" title="Kudosites">🌐</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding: 100px 20px 60px;
      position: relative;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 40px;
      align-items: center;
      max-width: 1250px;
      margin: 0 auto;
      transition: all 0.4s ease;
    }
    .hero-text-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.3);
      color: var(--accent-green);
      font-size: 0.78rem;
      font-family: var(--font-mono);
      font-weight: 600;
      width: fit-content;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 10px var(--accent-green);
    }
    .hero-title {
      font-size: 2.8rem;
      font-weight: 800;
      line-height: 1.15;
    }
    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--primary);
      font-weight: 600;
    }

    /* Smart Executive Summary Box */
    .executive-summary-box {
      padding: 20px;
      border-radius: 20px;
      border-color: var(--primary-glow);
      background: rgba(15, 23, 42, 0.85);
    }
    .summary-header { margin-bottom: 10px; }
    .summary-badge { font-size: 0.72rem; font-family: var(--font-mono); color: var(--primary); font-weight: 700; }
    .summary-text { font-size: 0.92rem; color: var(--text-main); line-height: 1.6; margin-bottom: 14px; }
    .archetype-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .arch-tag {
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-weight: 600;
    }

    .hero-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .metric-card {
      padding: 14px 10px;
      text-align: center;
      border-radius: 16px;
    }
    .metric-num {
      display: block;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--primary);
    }
    .metric-label {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .hero-actions {
      display: flex;
      gap: 16px;
    }
    .btn-primary {
      padding: 14px 28px;
      border-radius: 30px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 800;
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
    }

    /* Media Col & Video Theater */
    .avatar-card {
      padding: 16px;
      border-radius: 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.4s ease;
    }
    .avatar-wrapper {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 4/3;
      background: #0f172a;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .play-overlay {
      position: absolute;
      inset: 0;
      background: rgba(9, 13, 22, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .avatar-wrapper:hover .play-overlay { opacity: 1; }
    .play-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px var(--primary-glow);
    }
    .play-icon { color: #000; font-size: 1.2rem; margin-left: 2px; }
    .play-text { font-size: 0.85rem; font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }

    .video-container {
      position: relative;
      width: 100%;
      height: 560px;
      border-radius: 20px;
      overflow: hidden;
      background: #000;
    }
    .hero-video { width: 100%; height: 100%; object-fit: contain; }
    .btn-close-video {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(0,0,0,0.7);
      border: 1px solid var(--border-subtle);
      color: #fff;
      font-size: 0.8rem;
      cursor: pointer;
    }

    .media-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 6px;
    }
    .person-name { font-size: 1rem; font-weight: 700; }
    .person-title { font-size: 0.78rem; color: var(--text-muted); }
    .social-mini-links { display: flex; gap: 12px; font-size: 1.2rem; }

    @media (min-width: 1024px) {
      .hero-container:has(.expanded) {
        grid-template-columns: 1fr 1.3fr;
      }
    }
    @media (max-width: 768px) {
      .hero-container { grid-template-columns: 1fr; }
      .hero-metrics { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class HeroComponent {
  isVideoPlaying = false;

  playVideo() {
    this.isVideoPlaying = true;
  }

  stopVideo() {
    this.isVideoPlaying = false;
  }

  onVideoEnded() {
    this.isVideoPlaying = false;
  }
}
