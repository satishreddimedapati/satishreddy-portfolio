import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-contact-guestbook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        
        <div class="header-center">
          <div class="section-badge">💬 RECRUITER & VISITOR HUB</div>
          <h2 class="section-heading">Get In Touch & Recruiter Inbox</h2>
          <p class="section-desc">
            Open for Senior Full Stack, Frontend Angular, and .NET Backend opportunities. Submissions are saved directly to Firebase for Admin review.
          </p>
        </div>

        <div class="contact-grid">
          
          <!-- Direct Contact Card -->
          <div class="info-card glass-panel">
            <h3 class="card-subtitle">Direct Contact Details</h3>

            <div class="info-item">
              <span class="info-icon">📧</span>
              <div>
                <span class="info-label">Direct Email</span>
                <a href="mailto:medapatisatishreddy2025@gmail.com" class="info-val">medapatisatishreddy2025@gmail.com</a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📞</span>
              <div>
                <span class="info-label">Phone / WhatsApp</span>
                <span class="info-val">+91 7670995678</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📍</span>
              <div>
                <span class="info-label">Current Location</span>
                <span class="info-val">Hyderabad, India</span>
              </div>
            </div>

            <div class="social-links">
              <a href="https://www.linkedin.com/in/satishreddy-medapati" target="_blank" class="social-btn">LinkedIn 🔗</a>
              <a href="https://github.com/satishreddimedapati" target="_blank" class="social-btn">GitHub 🔗</a>
            </div>
          </div>

          <!-- Message Form Card -->
          <div class="form-card glass-panel">
            <h3 class="card-subtitle">Send Inquiry to Satish</h3>

            @if (submitted()) {
              <div class="success-box">
                <span class="check-icon">✓</span>
                <h4>Message Sent to Admin Firebase Database!</h4>
                <p>Thank you, {{ authService.currentUser()?.name }}. Satish has received your inquiry.</p>
                <button class="btn-send-another" (click)="resetForm()">Send Another Message</button>
              </div>
            } @else {
              <form (ngSubmit)="sendMessage()">
                <div class="form-group">
                  <label>Logged In User / Company</label>
                  <input type="text" [value]="authService.currentUser()?.name + ' (' + (authService.currentUser()?.company || 'Guest') + ')'" disabled class="form-control disabled-input" />
                </div>

                <div class="form-group">
                  <label>Message / Job Opportunity Details</label>
                  <textarea [(ngModel)]="messageText" name="messageText" rows="4" placeholder="Hi Satish, we loved your portfolio! We have a Senior .NET/Angular opening..." required class="form-control"></textarea>
                </div>

                <button type="submit" class="btn-submit">
                  🚀 Send Inquiry to Satish (Private DB)
                </button>
              </form>
            }
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 80px 20px 120px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-center {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 40px;
    }
    .section-desc { color: var(--text-muted); }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 30px;
    }
    .info-card, .form-card { padding: 32px; }
    .card-subtitle {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 24px;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .info-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(56, 189, 248, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .info-label { display: block; font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono); }
    .info-val { display: block; font-weight: 600; color: var(--text-main); text-decoration: none; font-size: 0.95rem; }

    .social-links {
      display: flex;
      gap: 10px;
      margin-top: 24px;
    }
    .social-btn {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--primary);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .form-group { margin-bottom: 18px; }
    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.9rem;
      font-family: var(--font-sans);
    }
    .disabled-input { color: var(--primary); font-weight: 700; }
    .form-control:focus { outline: none; border-color: var(--primary); }

    .btn-submit {
      width: 100%;
      padding: 14px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border: none;
      color: #000;
      font-weight: 800;
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: 0 4px 15px var(--primary-glow);
      transition: transform 0.2s;
    }
    .btn-submit:hover { transform: translateY(-2px); }

    .success-box {
      text-align: center;
      padding: 30px 20px;
      color: var(--accent-green);
    }
    .check-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 8px;
    }
    .btn-send-another {
      margin-top: 16px;
      padding: 8px 18px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border-subtle);
      color: #fff;
      font-size: 0.85rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactGuestbookComponent {
  authService = inject(AuthService);

  messageText = '';
  submitted = signal(false);

  sendMessage() {
    if (this.messageText) {
      this.authService.submitInquiry(this.messageText);
      this.submitted.set(true);
    }
  }

  resetForm() {
    this.messageText = '';
    this.submitted.set(false);
  }
}
