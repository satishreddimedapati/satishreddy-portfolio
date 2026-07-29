export interface Project {
  id: number;
  title: string;
  category: 'live' | 'dotnet' | 'angular' | 'pivot';
  categoryLabel: string;
  techStack: string[];
  description: string;
  longDescription: string;
  impactMetrics: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  lessonsLearned?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface UserSession {
  id: string;
  name: string;
  email?: string;
  company?: string;
  role: 'guest' | 'user' | 'admin';
  createdAt: string;
}

export interface RecruiterInquiry {
  id: string;
  userId: string;
  senderName: string;
  senderEmail: string;
  company: string;
  message: string;
  timestamp: string;
}
