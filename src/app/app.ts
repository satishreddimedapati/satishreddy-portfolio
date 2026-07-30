import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { LandingGateComponent } from './landing-gate.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeroComponent } from './features/hero/hero.component';
import { ProjectsGridComponent } from './features/projects-grid/projects-grid.component';
import { TechStackComponent } from './features/tech-stack/tech-stack.component';
import { ResumeHubComponent } from './features/resume-hub/resume-hub.component';
import { ContactGuestbookComponent } from './features/contact-guestbook/contact-guestbook.component';
import { AiAssistantComponent } from './features/ai-assistant/ai-assistant.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LandingGateComponent,
    AdminDashboardComponent,
    NavbarComponent,
    HeroComponent,
    ProjectsGridComponent,
    TechStackComponent,
    ResumeHubComponent,
    ContactGuestbookComponent,
    AiAssistantComponent,
    FooterComponent
  ],
  template: `
    <div class="bg-mesh"></div>

    <!-- 1. Landing Gate Modal -->
    @if (!authService.isLoggedIn()) {
      <app-landing-gate></app-landing-gate>
    }

    <!-- 2. Private Admin Dashboard -->
    @if (authService.isAdmin()) {
      <app-admin-dashboard></app-admin-dashboard>
    }

    <!-- 3. Main Portfolio WebApp -->
    @if (authService.isLoggedIn()) {
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-projects-grid></app-projects-grid>
        <app-tech-stack></app-tech-stack>
        <app-resume-hub></app-resume-hub>
        <app-contact-guestbook></app-contact-guestbook>
      </main>

      <!-- Floating Interactive AI Career Assistant -->
      <app-ai-assistant></app-ai-assistant>

      <app-footer></app-footer>
    }
  `,
  styles: [`
    main {
      position: relative;
      z-index: 1;
    }
  `]
})
export class AppComponent {
  authService = inject(AuthService);
}
