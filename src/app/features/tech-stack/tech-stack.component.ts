import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section">
      <div class="container">
        
        <div class="header-center">
          <div class="section-badge">⚡ TECHNICAL PROFICIENCY</div>
          <h2 class="section-heading">Skills & Architecture Matrix</h2>
          <p class="section-desc">
            5+ years of hands-on experience across backend microservices, modern Angular frontends, and cloud DevOps environments.
          </p>
        </div>

        <div class="skills-grid">
          @for (category of dataService.skillCategories(); track category.title) {
            <div class="category-card glass-panel">
              <h3 class="category-title">{{ category.title }}</h3>

              <div class="skill-list">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-info">
                      <span class="skill-name">{{ skill.icon }} {{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.level }}%</span>
                    </div>
                    <div class="progress-bar-bg">
                      <div class="progress-bar-fill" [style.width.%]="skill.level"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Architecture Flow Visualizer -->
        <div class="arch-box glass-panel">
          <h3 class="arch-title">🏗️ Enterprise Architecture Design Pattern</h3>
          <div class="arch-flow">
            <div class="arch-node node-client">Angular 17 SPA (Client UI)</div>
            <div class="arch-arrow">➔ REST / JSON ➔</div>
            <div class="arch-node node-api">.NET Core 8 Web API (Gateway)</div>
            <div class="arch-arrow">➔ EF Core ➔</div>
            <div class="arch-node node-db">SQL Server & Azure SQL</div>
            <div class="arch-arrow">➔ Docker ➔</div>
            <div class="arch-node node-cloud">Azure AKS & CI/CD</div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .skills-section {
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

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    .category-card { padding: 24px; }
    .category-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .skill-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .skill-name { color: var(--text-main); }
    .skill-percent { color: var(--accent-purple); font-family: var(--font-mono); font-weight: 700; }

    .progress-bar-bg {
      height: 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--primary), var(--accent-purple));
      transition: width 1s ease-in-out;
    }

    .arch-box {
      padding: 30px;
      text-align: center;
    }
    .arch-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--text-main);
    }
    .arch-flow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .arch-node {
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
      font-family: var(--font-mono);
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--border-glow);
    }
    .node-client { color: #f43f5e; }
    .node-api { color: var(--accent-purple); }
    .node-db { color: var(--primary); }
    .node-cloud { color: var(--accent-green); }
    .arch-arrow { color: var(--text-dim); font-size: 0.85rem; }
  `]
})
export class TechStackComponent {
  dataService = inject(PortfolioDataService);
}
