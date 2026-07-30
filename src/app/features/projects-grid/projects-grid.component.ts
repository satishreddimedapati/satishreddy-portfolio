import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        
        <div class="header-center">
          <div class="section-badge">🚀 PORTFOLIO SHOWCASE</div>
          <h2 class="section-heading">25+ Enterprise & GenAI Projects</h2>
          <p class="section-desc">
            Explore complete technical documentations, architecture breakdowns, live production web apps, and repository links for Satish's 25+ projects.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs glass-panel">
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'all'"
            (click)="setTab('all')">
            All Projects (25+)
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'live'"
            (click)="setTab('live')">
            🌟 Live Production Apps
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'dotnet'"
            (click)="setTab('dotnet')">
            🔷 .NET & Financial Ledgers
          </button>
          <button 
            class="tab-btn" 
            [class.active]="selectedTab() === 'pivot'"
            (click)="setTab('pivot')">
            💡 AI & Automation Tools
          </button>
        </div>

        <!-- Projects Grid (Displays top 6 featured initially) -->
        <div class="projects-grid">
          @for (project of displayedProjects(); track project.id) {
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
                <button class="btn-card-doc" (click)="openDocModal(project)">
                  📖 View Spec
                </button>

                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" class="btn-card-primary">
                    <span>Launch App 🔗</span>
                  </a>
                }
              </div>
            </div>
          }
        </div>

        <!-- View All 25+ Projects Button Bar -->
        <div class="view-all-container">
          <button class="btn-view-all-projects" (click)="openAllProjectsModal()">
            <span class="view-all-icon">📂</span>
            <span>View All 25+ Projects & Source Audits</span>
            <span class="pulse-ring-btn"></span>
          </button>
        </div>

      </div>

      <!-- Technical Architecture Spec Modal -->
      @if (activeDocProject()) {
        <div class="doc-modal-overlay glass-panel" (click)="closeDocModal()">
          <div class="doc-modal-content glass-panel" (click)="$event.stopPropagation()">
            <div class="doc-modal-header">
              <div>
                <span class="doc-category">{{ activeDocProject()?.categoryLabel }}</span>
                <h3 class="doc-title">{{ activeDocProject()?.title }}</h3>
              </div>
              <button class="btn-close-doc" (click)="closeDocModal()">✕</button>
            </div>

            <div class="doc-modal-body">
              <div class="doc-section">
                <h4>📌 Project Overview & Purpose</h4>
                <p>{{ activeDocProject()?.longDescription }}</p>
              </div>

              <div class="doc-section">
                <h4>🛠️ Technology Stack & Libraries</h4>
                <div class="doc-tech-grid">
                  @for (tech of activeDocProject()?.techStack; track tech) {
                    <span class="doc-tech-badge">{{ tech }}</span>
                  }
                </div>
              </div>

              <div class="doc-section">
                <h4>⚡ Quantifiable Impact & Architecture Highlights</h4>
                <div class="doc-impact-box">
                  <span class="doc-impact-icon">⚡</span>
                  <span>{{ activeDocProject()?.impactMetrics }}</span>
                </div>
                @if (activeDocProject()?.lessonsLearned) {
                  <p class="doc-lessons"><strong>Architecture Note:</strong> {{ activeDocProject()?.lessonsLearned }}</p>
                }
              </div>
            </div>

            <div class="doc-modal-footer">
              @if (activeDocProject()?.liveUrl) {
                <a [href]="activeDocProject()?.liveUrl" target="_blank" class="btn-modal-launch">
                  🚀 Launch Live Production Web App 🔗
                </a>
              }
              <button class="btn-modal-close" (click)="closeDocModal()">Close Spec</button>
            </div>
          </div>
        </div>
      }

      <!-- Animating View All 25+ Projects Modal -->
      @if (showAllModal()) {
        <div class="all-modal-overlay" (click)="closeAllProjectsModal()">
          <div class="all-modal-content glass-panel animate-pop-in" (click)="$event.stopPropagation()">
            
            <div class="all-modal-header">
              <div>
                <div class="all-badge">📂 COMPLETE ARCHIVE</div>
                <h2 class="all-title">All 25+ Software & GenAI Projects</h2>
                <p class="all-sub">Source audited from Satish's local workspace & cloud deployments.</p>
              </div>
              <button class="btn-close-all" (click)="closeAllProjectsModal()">✕</button>
            </div>

            <div class="all-modal-grid">
              @for (proj of filteredProjects(); track proj.id) {
                <div class="all-project-item glass-panel">
                  <div class="item-top">
                    <span class="item-id">#{{ proj.id }}</span>
                    <span class="item-category">{{ proj.categoryLabel }}</span>
                    @if (proj.liveUrl) {
                      <span class="item-live-badge"><span class="pulse"></span> LIVE</span>
                    }
                  </div>

                  <h4 class="item-title">{{ proj.title }}</h4>
                  <p class="item-desc">{{ proj.description }}</p>

                  <div class="item-tech">
                    @for (t of proj.techStack; track t) {
                      <span class="t-chip">{{ t }}</span>
                    }
                  </div>

                  <div class="item-actions">
                    <button class="btn-item-spec" (click)="openDocModal(proj)">📖 View Spec</button>
                    @if (proj.liveUrl) {
                      <a [href]="proj.liveUrl" target="_blank" class="btn-item-launch">Launch 🔗</a>
                    }
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      }

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
    .btn-card-doc {
      flex: 1;
      padding: 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-card-doc:hover { border-color: var(--primary); color: var(--primary); }

    .btn-card-primary {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
      font-weight: 700;
      font-size: 0.82rem;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .btn-card-primary:hover { transform: translateY(-2px); }

    /* View All 25+ Container */
    .view-all-container {
      margin-top: 50px;
      text-align: center;
    }
    .btn-view-all-projects {
      padding: 16px 36px;
      border-radius: 40px;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(168, 85, 247, 0.15));
      border: 1px solid var(--primary);
      color: #fff;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 30px var(--primary-glow);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-view-all-projects:hover {
      transform: translateY(-4px) scale(1.03);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #000;
    }
    .view-all-icon { font-size: 1.2rem; }

    /* Animating View All Modal */
    .all-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      background: rgba(9, 13, 22, 0.95);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .all-modal-content {
      width: 100%;
      max-width: 1000px;
      height: 85vh;
      border-radius: 28px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      border-color: var(--primary-glow);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.95);
    }
    .animate-pop-in {
      animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.9) translateY(30px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }

    .all-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .all-badge { font-size: 0.75rem; font-family: var(--font-mono); color: var(--primary); font-weight: 700; }
    .all-title { font-size: 1.6rem; font-weight: 800; color: #fff; margin-top: 4px; }
    .all-sub { font-size: 0.85rem; color: var(--text-muted); }
    .btn-close-all { background: transparent; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; }

    .all-modal-grid {
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding-right: 8px;
    }
    .all-project-item {
      padding: 16px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .item-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .item-id { font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted); }
    .item-category { font-size: 0.7rem; color: var(--primary); font-weight: 600; }
    .item-live-badge {
      font-size: 0.65rem; font-weight: 700; color: var(--accent-green);
      margin-left: auto; display: flex; align-items: center; gap: 4px;
    }
    .item-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .item-desc { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.4; }
    .item-tech { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
    .t-chip { font-size: 0.68rem; padding: 2px 6px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: var(--text-dim); }

    .item-actions { display: flex; gap: 6px; }
    .btn-item-spec {
      flex: 1; padding: 6px 10px; border-radius: 8px; background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle); color: #fff; font-size: 0.75rem; font-weight: 600; cursor: pointer;
    }
    .btn-item-launch {
      flex: 1; text-align: center; padding: 6px 10px; border-radius: 8px;
      background: var(--primary); color: #000; font-size: 0.75rem; font-weight: 700; text-decoration: none;
    }

    /* Technical Spec Modal */
    .doc-modal-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10001;
      background: rgba(9, 13, 22, 0.95); display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .doc-modal-content {
      width: 100%; max-width: 640px; padding: 30px; border-radius: 24px;
      border-color: var(--primary-glow); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
    }
    .doc-modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle); }
    .doc-category { font-size: 0.75rem; color: var(--accent-purple); font-family: var(--font-mono); }
    .doc-title { font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-top: 4px; }
    .btn-close-doc { background: transparent; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; }
    .doc-modal-body { display: flex; flex-direction: column; gap: 18px; margin-bottom: 24px; }
    .doc-section h4 { font-size: 0.9rem; color: var(--primary); margin-bottom: 8px; font-weight: 700; }
    .doc-section p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
    .doc-tech-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .doc-tech-badge { padding: 6px 12px; border-radius: 12px; background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-subtle); color: var(--primary); font-size: 0.8rem; font-weight: 600; }
    .doc-impact-box { padding: 12px; border-radius: 12px; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); color: var(--accent-green); font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    .doc-lessons { margin-top: 10px; font-size: 0.85rem; color: var(--text-dim); }
    .doc-modal-footer { display: flex; gap: 12px; justify-content: flex-end; }
    .btn-modal-launch { padding: 12px 24px; border-radius: 20px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #000; font-weight: 800; text-decoration: none; font-size: 0.88rem; }
    .btn-modal-close { padding: 12px 20px; border-radius: 20px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-subtle); color: var(--text-main); cursor: pointer; font-weight: 600; }

    @media (max-width: 768px) {
      .projects-grid { grid-template-columns: 1fr; }
      .all-modal-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProjectsGridComponent {
  private dataService = inject(PortfolioDataService);
  
  readonly selectedTab = signal<'all' | 'live' | 'dotnet' | 'pivot'>('all');
  readonly activeDocProject = signal<Project | null>(null);
  readonly showAllModal = signal(false);

  readonly filteredProjects = computed(() => {
    const tab = this.selectedTab();
    const all = this.dataService.projects();
    if (tab === 'all') return all;
    return all.filter(p => p.category === tab);
  });

  // Displays top featured initially in main grid
  readonly displayedProjects = computed(() => {
    const list = this.filteredProjects();
    return list.slice(0, 6);
  });

  setTab(tab: 'all' | 'live' | 'dotnet' | 'pivot') {
    this.selectedTab.set(tab);
  }

  openDocModal(project: Project) {
    this.activeDocProject.set(project);
  }

  closeDocModal() {
    this.activeDocProject.set(null);
  }

  openAllProjectsModal() {
    this.showAllModal.set(true);
  }

  closeAllProjectsModal() {
    this.showAllModal.set(false);
  }
}
