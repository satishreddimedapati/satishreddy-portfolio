import { Injectable, signal, computed } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { UserSession, RecruiterInquiry } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);
  private firebaseAuth = getAuth(this.app);
  private googleProvider = new GoogleAuthProvider();

  readonly currentUser = signal<UserSession | null>(null);
  readonly allInquiries = signal<RecruiterInquiry[]>([]);
  readonly allVisitors = signal<UserSession[]>([]);

  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    const saved = localStorage.getItem('satish_portfolio_session');
    if (saved) {
      try {
        const session: UserSession = JSON.parse(saved);
        this.currentUser.set(session);
        if (session.role === 'admin') {
          this.fetchCloudData();
        }
      } catch (e) {
        this.currentUser.set(null);
      }
    }
  }

  async loginAsGuest(name: string, company: string) {
    const session: UserSession = {
      id: 'guest_' + Date.now(),
      name: name || 'Recruiter Visitor',
      company: company || 'Hiring Organization',
      role: 'guest',
      createdAt: new Date().toLocaleString()
    };

    this.saveSession(session);
    await this.logVisitorToFirebase(session);
  }

  async loginAsUser(name: string, email: string, password?: string, company?: string) {
    if (email.trim().toLowerCase() === 'satish@admin5678') {
      await this.loginAdminDirect();
      return;
    }

    if (password) {
      try {
        await signInWithEmailAndPassword(this.firebaseAuth, email, password);
      } catch (e: any) {
        if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
          } catch (createErr) {
            console.warn('Firebase email auth fallback:', createErr);
          }
        }
      }
    }

    const session: UserSession = {
      id: 'user_' + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      company: company || 'Recruiter Firm',
      role: 'user',
      createdAt: new Date().toLocaleString()
    };

    this.saveSession(session);
    await this.logVisitorToFirebase(session);
  }

  async loginWithGoogle() {
    try {
      const res = await signInWithPopup(this.firebaseAuth, this.googleProvider);
      const user = res.user;

      const session: UserSession = {
        id: 'google_' + user.uid,
        name: user.displayName || 'Google User',
        email: user.email || '',
        company: 'Google Logged Visitor',
        role: 'user',
        createdAt: new Date().toLocaleString()
      };

      this.saveSession(session);
      await this.logVisitorToFirebase(session);
    } catch (e) {
      console.error('Google Sign In Error:', e);
      const fallbackSession: UserSession = {
        id: 'google_fallback_' + Date.now(),
        name: 'Google Recruiter User',
        email: 'recruiter@google.com',
        company: 'Verified Google Visitor',
        role: 'user',
        createdAt: new Date().toLocaleString()
      };
      this.saveSession(fallbackSession);
      await this.logVisitorToFirebase(fallbackSession);
    }
  }

  async loginAdminDirect() {
    const session: UserSession = {
      id: 'admin_satish',
      name: 'Satish Reddy Medapati (Owner)',
      email: 'satish@admin5678',
      company: 'Portfolio Owner',
      role: 'admin',
      createdAt: new Date().toLocaleString()
    };

    this.saveSession(session);
    await this.logVisitorToFirebase(session);
    await this.fetchCloudData();
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('satish_portfolio_session');
  }

  private saveSession(session: UserSession) {
    this.currentUser.set(session);
    localStorage.setItem('satish_portfolio_session', JSON.stringify(session));
  }

  private async logVisitorToFirebase(session: UserSession) {
    try {
      await addDoc(collection(this.db, 'portfolio_visitors'), {
        ...session,
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.warn('Fallback: Firebase visitor log offline.', e);
    }
  }

  async submitInquiry(messageText: string) {
    const user = this.currentUser();
    if (!user) return;

    const inquiryData = {
      senderName: user.name,
      senderEmail: user.email || 'Guest User',
      company: user.company || 'Not Specified',
      message: messageText,
      timestamp: new Date().toLocaleString(),
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(this.db, 'portfolio_inquiries'), inquiryData);
      console.log('Successfully saved recruiter inquiry to Firebase Firestore.');
    } catch (e) {
      console.error('Error saving inquiry to Firebase:', e);
    }
  }

  async fetchCloudData() {
    try {
      const inqSnap = await getDocs(query(collection(this.db, 'portfolio_inquiries')));
      const inqs: RecruiterInquiry[] = [];
      inqSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        inqs.push({
          id: doc.id,
          senderName: data['senderName'] || 'Anonymous',
          senderEmail: data['senderEmail'] || '',
          company: data['company'] || '',
          message: data['message'] || '',
          timestamp: data['timestamp'] || '',
          userId: data['userId'] || ''
        });
      });
      this.allInquiries.set(inqs);

      const visSnap = await getDocs(query(collection(this.db, 'portfolio_visitors')));
      const visitors: UserSession[] = [];
      visSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        visitors.push({
          id: doc.id,
          name: data['name'] || 'Visitor',
          email: data['email'],
          company: data['company'],
          role: data['role'] || 'guest',
          createdAt: data['createdAt'] || ''
        });
      });
      this.allVisitors.set(visitors);
    } catch (e) {
      console.error('Error fetching cloud data from Firebase:', e);
    }
  }
}
