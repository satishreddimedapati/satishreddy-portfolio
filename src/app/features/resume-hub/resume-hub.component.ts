import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-hub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resumes" class="resume-section">
      <div class="container">
        
        <div class="header-center">
          <div class="section-badge">📄 RECRUITER RESUME HUB</div>
          <h2 class="section-heading">Professional Target Resumes</h2>
          <p class="section-desc">
            Download target-tailored, single-page PDF resumes optimized for Full Stack, Angular Frontend, or .NET Backend job openings.
          </p>
        </div>

        <!-- Resume Selector Tabs -->
        <div class="resume-tabs glass-panel">
          <button 
            class="tab-btn" 
            [class.active]="selectedResume() === 'fullstack'"
            (click)="setResume('fullstack')">
            ⚡ Full Stack Master (.NET + Angular)
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedResume() === 'angular'"
            (click)="setResume('angular')">
            🅰️ Angular Frontend Specific
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedResume() === 'dotnet'"
            (click)="setResume('dotnet')">
            🔷 .NET Backend Specific
          </button>
        </div>

        <!-- Resume Preview & Download Card -->
        <div class="resume-preview-card glass-panel">
          <div class="card-details">
            <div class="score-pill">
              <span class="score-num">📄</span>
              <span class="score-txt">VERIFIED RESUME</span>
            </div>

            <h3 class="resume-title">{{ currentTitle() }}</h3>
            <p class="resume-summary">{{ currentDesc() }}</p>

            <div class="resume-specs">
              <span class="spec-item">✓ Single Page (Zero Waste Space)</span>
              <span class="spec-item">✓ Docker, Kubernetes & xUnit Included</span>
              <span class="spec-item">✓ Standard Headers & Hyperlinked Live Apps</span>
            </div>

            <div class="download-actions">
              <a [href]="currentPdfPath()" download class="btn-download-pdf">
                📥 Download PDF Resume
              </a>
              <a [href]="currentPdfPath()" target="_blank" class="btn-view-inline">
                👁️ Preview PDF Online
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .resume-section {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-center {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 40px;
    }
    .section-desc { color: var(--text-muted); }

    .resume-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      padding: 8px;
      border-radius: 40px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 12px 24px;
      border-radius: 25px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab-btn.active {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 700;
      box-shadow: 0 4px 15px var(--primary-glow);
    }

    .resume-preview-card {
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      position: relative;
    }
    .score-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid var(--primary);
      margin-bottom: 16px;
    }
    .score-num { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
    .score-txt { font-size: 0.75rem; font-family: var(--font-mono); color: #e2e8f0; font-weight: 700; }

    .resume-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 12px;
      color: var(--text-main);
    }
    .resume-summary {
      color: var(--text-muted);
      font-size: 1rem;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .resume-specs {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 32px;
      font-size: 0.85rem;
      color: var(--primary);
    }
    .download-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .btn-download-pdf {
      padding: 14px 32px;
      border-radius: 30px;
      background: var(--primary);
      color: #000;
      font-weight: 800;
      text-decoration: none;
      font-size: 0.95rem;
      box-shadow: 0 4px 20px var(--primary-glow);
      transition: transform 0.2s;
    }
    .btn-download-pdf:hover { transform: translateY(-2px); }
    .btn-view-inline {
      padding: 14px 28px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-weight: 600;
      text-decoration: none;
    }
  `]
})
export class ResumeHubComponent {
  readonly selectedResume = signal<'fullstack' | 'angular' | 'dotnet'>('fullstack');

  readonly currentTitle = () => {
    switch (this.selectedResume()) {
      case 'angular': return 'Senior Frontend Developer Resume (Angular & TypeScript)';
      case 'dotnet': return 'Senior .NET Backend Developer Resume (C# & Microservices)';
      default: return 'Full Stack Master Resume (.NET Core & Angular)';
    }
  };

  readonly currentDesc = () => {
    switch (this.selectedResume()) {
      case 'angular': return 'Tailored for Senior Frontend roles focusing on Angular 17, RxJS, SASS, Lazy Loading, and Jasmine unit testing.';
      case 'dotnet': return 'Tailored for Senior Backend roles focusing on .NET Core 8, C#, Microservices, SQL query tuning, Docker, and xUnit.';
      default: return 'Comprehensive resume balancing full-stack .NET backend microservices and Angular frontend engineering.';
    }
  };

  readonly currentPdfPath = () => {
    switch (this.selectedResume()) {
      case 'angular': return 'Satish_Reddy_Medapati_Angular_Resume.pdf';
      case 'dotnet': return 'Satish_Reddy_Medapati_DotNet_Resume.pdf';
      default: return 'Satish_Reddy_Medapati_FullStack_Resume.pdf';
    }
  };

  setResume(type: 'fullstack' | 'angular' | 'dotnet') {
    this.selectedResume.set(type);
  }
}
