import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        
        <div class="header-center">
          <div class="section-badge">🚀 PORTFOLIO SHOWCASE</div>
          <h2 class="section-heading">25+ Total Projects Journey</h2>
          <p class="section-desc">
            Displaying top featured live applications, enterprise .NET microservices, Angular frontend tools, and productivity automation scripts.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs glass-panel">
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'all'"
            (click)="setTab('all')">
            Highlight Projects (25+)
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'live'"
            (click)="setTab('live')">
            🌟 Featured Live Apps (5)
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'dotnet'"
            (click)="setTab('dotnet')">
            🔷 .NET & Microservices
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'pivot'"
            (click)="setTab('pivot')">
            💡 Automation & Pivots
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <div class="project-card glass-panel">
              <div class="card-header">
                <span class="category-tag">{{ project.categoryLabel }}</span>
                @if (project.liveUrl) {
                  <span class="live-status"><span class="pulse"></span> LIVE APP</span>
                }
              </div>

              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description }}</p>

              <div class="tech-tags">
                @for (tech of project.techStack; track tech) {
                  <span class="tech-badge">{{ tech }}</span>
                }
              </div>

              <div class="impact-box">
                <span class="impact-icon">⚡</span>
                <span class="impact-text">{{ project.impactMetrics }}</span>
              </div>

              <div class="card-actions">
                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" class="btn-card-primary">
                    <span>Launch Live Web App 🔗</span>
                  </a>
                } @else if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" class="btn-card-secondary">
                    <span>View GitHub Repo</span>
                  </a>
                }
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-center {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 40px;
    }
    .section-desc {
      color: var(--text-muted);
      font-size: 1rem;
    }
    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      padding: 8px;
      border-radius: 40px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 10px 22px;
      border-radius: 25px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab-btn:hover {
      color: var(--text-main);
    }
    .tab-btn.active {
      background: var(--primary);
      color: #000;
      font-weight: 700;
      box-shadow: 0 4px 15px var(--primary-glow);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    .project-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .category-tag {
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--accent-purple);
      font-weight: 600;
    }
    .live-status {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--accent-green);
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(52, 211, 153, 0.1);
      padding: 4px 10px;
      border-radius: 12px;
    }
    .pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 8px var(--accent-green);
    }
    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--text-main);
    }
    .project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }
    .tech-badge {
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--primary);
      border: 1px solid var(--border-subtle);
    }
    .impact-box {
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(56, 189, 248, 0.05);
      border: 1px dashed rgba(56, 189, 248, 0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .impact-icon { font-size: 1rem; }
    .impact-text { font-size: 0.8rem; color: #e2e8f0; font-weight: 500; }

    .card-actions {
      display: flex;
      gap: 10px;
    }
    .btn-card-primary {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 700;
      font-size: 0.85rem;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .btn-card-primary:hover { transform: translateY(-2px); }
    .btn-card-secondary {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .projects-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProjectsGridComponent {
  private dataService = inject(PortfolioDataService);
  
  readonly selectedTab = signal<'all' | 'live' | 'dotnet' | 'pivot'>('all');

  readonly filteredProjects = computed(() => {
    const tab = this.selectedTab();
    const all = this.dataService.projects();
    if (tab === 'all') return all;
    return all.filter(p => p.category === tab);
  });

  setTab(tab: 'all' | 'live' | 'dotnet' | 'pivot') {
    this.selectedTab.set(tab);
  }
}
