import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-overlay">
      <div class="admin-card glass-panel">
        
        <div class="admin-header">
          <div>
            <div class="section-badge">👑 OWNER / ADMIN DASHBOARD</div>
            <h2 class="admin-title">Welcome, Satish Reddy Medapati</h2>
            <p class="admin-subtitle">Private Cloud Analytics: Recruiter Inquiries & Portfolio Visitors</p>
          </div>
          <button class="btn-close-admin" (click)="closeAdmin()">✕ Exit Admin View</button>
        </div>

        <!-- Metric Cards -->
        <div class="admin-stats">
          <div class="stat-box glass-panel">
            <span class="stat-val">{{ authService.allInquiries().length }}</span>
            <span class="stat-lbl">Recruiter Inquiries (Firebase)</span>
          </div>
          <div class="stat-box glass-panel">
            <span class="stat-val">{{ authService.allVisitors().length }}</span>
            <span class="stat-lbl">Total Visitors Logged</span>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="admin-sections">
          
          <!-- Inquiries Table -->
          <div class="table-card glass-panel">
            <h3 class="table-heading">📬 Received Inquiries / Messages (Firestore Cloud)</h3>
            @if (authService.allInquiries().length === 0) {
              <p class="empty-txt">No messages received in Firebase database yet. Submit a test message to see it appear live.</p>
            } @else {
              <div class="table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Sender Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Message Detail</th>
                      <th>Date / Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (inq of authService.allInquiries(); track inq.id) {
                      <tr>
                        <td><strong>{{ inq.senderName }}</strong></td>
                        <td class="email-col">{{ inq.senderEmail }}</td>
                        <td><span class="company-tag">{{ inq.company }}</span></td>
                        <td class="msg-col">{{ inq.message }}</td>
                        <td class="time-col">{{ inq.timestamp }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>

          <!-- Visitors Log -->
          <div class="table-card glass-panel">
            <h3 class="table-heading">👥 Portfolio Visitors & Guest Sessions</h3>
            @if (authService.allVisitors().length === 0) {
              <p class="empty-txt">No visitor sessions logged in Firebase yet.</p>
            } @else {
              <div class="table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Visitor Name</th>
                      <th>Role</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Visited At</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (v of authService.allVisitors(); track v.id) {
                      <tr>
                        <td><strong>{{ v.name }}</strong></td>
                        <td><span class="role-badge" [class.admin-role]="v.role === 'admin'">{{ v.role }}</span></td>
                        <td>{{ v.company || 'Not Specified' }}</td>
                        <td>{{ v.email || 'Guest User' }}</td>
                        <td class="time-col">{{ v.createdAt }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .admin-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: rgba(9, 13, 22, 0.96);
      backdrop-filter: blur(20px);
      padding: 30px 20px;
      overflow-y: auto;
    }
    .admin-card {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px;
      border-color: var(--primary-glow);
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .admin-title { font-size: 2rem; font-weight: 800; color: var(--text-main); }
    .admin-subtitle { color: var(--text-muted); font-size: 0.95rem; }
    .btn-close-admin {
      padding: 10px 20px;
      border-radius: 20px;
      background: rgba(244, 63, 94, 0.15);
      border: 1px solid #f43f5e;
      color: #f43f5e;
      font-weight: 700;
      cursor: pointer;
    }

    .admin-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-box { padding: 20px; text-align: center; }
    .stat-val { display: block; font-size: 2.2rem; font-weight: 800; color: var(--primary); }
    .stat-lbl { font-size: 0.8rem; color: var(--text-dim); font-family: var(--font-mono); }

    .table-card { padding: 24px; margin-bottom: 30px; }
    .table-heading { font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-bottom: 16px; }
    .empty-txt { color: var(--text-dim); font-size: 0.9rem; text-align: center; padding: 20px; }

    .table-wrapper { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem; }
    .data-table th, .data-table td { padding: 12px 14px; border-bottom: 1px solid var(--border-subtle); }
    .data-table th { color: var(--text-dim); font-family: var(--font-mono); font-weight: 600; }
    .data-table td { color: var(--text-main); }
    .email-col { color: var(--primary); font-family: var(--font-mono); }
    .company-tag {
      background: rgba(192, 132, 252, 0.15);
      color: var(--accent-purple);
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .msg-col { max-width: 300px; color: var(--text-muted); }
    .time-col { font-family: var(--font-mono); color: var(--text-dim); font-size: 0.75rem; }
    .role-badge {
      padding: 4px 10px;
      border-radius: 12px;
      background: rgba(56, 189, 248, 0.1);
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 700;
    }
    .admin-role { background: rgba(52, 211, 153, 0.2); color: var(--accent-green); }
  `]
})
export class AdminDashboardComponent {
  authService = inject(AuthService);

  closeAdmin() {
    this.authService.logout();
  }
}
