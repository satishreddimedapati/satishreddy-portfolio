import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-landing-gate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="gate-overlay">
      <div class="bg-mesh"></div>
      
      <div class="gate-card glass-panel">
        <div class="gate-header">
          <div class="avatar-badge">
            <img src="satish_pic.jpg" alt="Satish Reddy Medapati" class="avatar-mini" />
          </div>
          <h2 class="gate-title">SATISH REDDY MEDAPATI</h2>
          <p class="gate-subtitle">Senior Full Stack Developer Portfolio (.NET Core & Angular)</p>
        </div>

        <div class="auth-box">
          <!-- Access Mode Selector Tabs -->
          <div class="auth-tabs">
            <button class="auth-tab" [class.active]="mode() === 'user'" (click)="setMode('user')">
              🔐 User Sign In / Google
            </button>
            <button class="auth-tab" [class.active]="mode() === 'guest'" (click)="setMode('guest')">
              👤 Guest Recruiter Access
            </button>
          </div>

          @if (mode() === 'guest') {
            <!-- Guest Access Form: Asks Name & Company Name -->
            <div class="auth-form">
              <p class="form-hint">Quick access for HR & recruiters. Enter your Name & Company to enter.</p>

              <div class="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="guestName" 
                  name="guestName" 
                  placeholder="e.g. Sarah Jenkins" 
                  class="form-control" />
              </div>

              <div class="form-group">
                <label>Company / Organization Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="guestCompany" 
                  name="guestCompany" 
                  placeholder="e.g. Accenture / Hiring Firm" 
                  class="form-control" />
              </div>

              <button 
                (click)="handleGuestSubmit()" 
                [disabled]="!isGuestFormValid()" 
                class="btn-enter" 
                [class.btn-disabled]="!isGuestFormValid()">
                🚀 Enter Portfolio WebApp
              </button>
            </div>
          } @else {
            <!-- User Login Form -->
            <div class="auth-form">
              <div class="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  [(ngModel)]="email" 
                  (ngModelChange)="onEmailChange($event)"
                  name="email" 
                  placeholder="name@company.com" 
                  class="form-control" />
              </div>

              @if (isAdminDetected()) {
                <!-- Secret Admin Auto-Bypass Notice -->
                <div class="admin-detected-box">
                  <span class="admin-key-icon">🔑</span>
                  <p>Owner Key Verified. Click below for instant Admin Dashboard access.</p>
                </div>

                <button (click)="handleAdminSubmit()" class="btn-enter btn-admin-enter">
                  👑 Enter Admin Dashboard
                </button>
              } @else {
                <!-- Normal Visitor Login Inputs -->
                <div class="form-group">
                  <label>Full Name *</label>
                  <input type="text" [(ngModel)]="name" name="name" placeholder="e.g. Sarah Jenkins" class="form-control" />
                </div>

                <div class="form-group">
                  <label>Password *</label>
                  <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" class="form-control" />
                </div>

                <div class="form-group">
                  <label>Company / Organization Name (Optional)</label>
                  <input type="text" [(ngModel)]="company" name="company" placeholder="e.g. Accenture / Hiring Firm" class="form-control" />
                </div>

                <button 
                  (click)="handleUserLogin()" 
                  [disabled]="!isUserFormValid()" 
                  class="btn-enter" 
                  [class.btn-disabled]="!isUserFormValid()">
                  🔐 Sign In / Access Portfolio
                </button>

                <div class="divider">
                  <span>OR</span>
                </div>

                <!-- Google Login Button -->
                <button type="button" (click)="handleGoogleLogin()" class="btn-google">
                  <svg class="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              }
            </div>
          }

        </div>
      </div>
    </div>
  `,
  styles: [`
    .gate-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      background: rgba(9, 13, 22, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow-y: auto;
    }
    .gate-card {
      width: 100%;
      max-width: 480px;
      padding: 28px 24px;
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      border-color: var(--primary-glow);
    }
    .gate-header { text-align: center; margin-bottom: 20px; }
    .avatar-mini {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center top;
      border: 3px solid var(--primary);
      box-shadow: 0 0 20px var(--primary-glow);
      margin-bottom: 10px;
    }
    .gate-title { font-size: 1.3rem; font-weight: 800; color: var(--text-main); letter-spacing: 0.5px; }
    .gate-subtitle { font-size: 0.8rem; color: var(--primary); font-family: var(--font-mono); }

    .auth-tabs {
      display: flex;
      gap: 6px;
      background: rgba(15, 23, 42, 0.8);
      padding: 6px;
      border-radius: 16px;
      margin-bottom: 18px;
    }
    .auth-tab {
      flex: 1;
      padding: 10px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
    }
    .auth-tab.active {
      background: var(--primary);
      color: #000;
    }

    .form-hint { font-size: 0.78rem; color: var(--text-dim); margin-bottom: 14px; text-align: center; }
    .form-group { margin-bottom: 12px; text-align: left; }
    .form-group label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .form-control {
      width: 100%;
      padding: 10px 14px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.85rem;
    }
    .form-control:focus { outline: none; border-color: var(--primary); }

    .btn-enter {
      width: 100%;
      padding: 12px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border: none;
      color: #000;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      margin-top: 8px;
      box-shadow: 0 4px 20px var(--primary-glow);
      transition: all 0.2s;
    }
    .btn-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
    }
    .btn-admin-enter {
      background: linear-gradient(135deg, var(--accent-purple), var(--primary));
      color: #000;
    }

    .admin-detected-box {
      text-align: center;
      padding: 16px;
      border-radius: 14px;
      background: rgba(192, 132, 252, 0.1);
      border: 1px solid var(--accent-purple);
      margin-bottom: 14px;
    }
    .admin-key-icon { font-size: 1.8rem; display: block; margin-bottom: 6px; }
    .admin-detected-box p { font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; }

    .divider {
      text-align: center;
      margin: 14px 0;
      position: relative;
    }
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--border-subtle);
    }
    .divider span {
      position: relative;
      background: rgba(15, 23, 42, 0.95);
      padding: 0 10px;
      font-size: 0.75rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
    }

    .btn-google {
      width: 100%;
      padding: 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-subtle);
      color: #fff;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .google-icon { width: 18px; height: 18px; }

    @media (max-width: 480px) {
      .gate-card { padding: 20px 16px; }
      .avatar-mini { width: 75px; height: 75px; }
    }
  `]
})
export class LandingGateComponent {
  authService = inject(AuthService);
  
  mode = signal<'user' | 'guest'>('guest');

  // Guest inputs
  guestName = '';
  guestCompany = '';

  // User inputs
  email = '';
  name = '';
  password = '';
  company = '';

  isAdminDetected = signal(false);

  setMode(m: 'user' | 'guest') {
    this.mode.set(m);
  }

  onEmailChange(val: string) {
    if (val?.trim().toLowerCase() === 'satish@admin5678') {
      this.isAdminDetected.set(true);
    } else {
      this.isAdminDetected.set(false);
    }
  }

  isGuestFormValid(): boolean {
    return !!(this.guestName?.trim() && this.guestCompany?.trim());
  }

  isUserFormValid(): boolean {
    return !!(this.email?.trim() && this.password?.trim() && this.name?.trim());
  }

  handleGuestSubmit() {
    if (this.isGuestFormValid()) {
      this.authService.loginAsGuest(this.guestName.trim(), this.guestCompany.trim());
    }
  }

  handleAdminSubmit() {
    this.authService.loginAdminDirect();
  }

  handleUserLogin() {
    if (this.isUserFormValid()) {
      this.authService.loginAsUser(this.name.trim(), this.email.trim(), this.password.trim(), this.company.trim());
    }
  }

  handleGoogleLogin() {
    this.authService.loginWithGoogle();
  }
}
