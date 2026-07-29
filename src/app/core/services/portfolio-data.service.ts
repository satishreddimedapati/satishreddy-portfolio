import { Injectable, signal } from '@angular/core';
import { Project, SkillCategory } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  
  readonly projects = signal<Project[]>([
    {
      id: 1,
      title: 'AI-Powered Personal Learning Tutor',
      category: 'live',
      categoryLabel: 'Featured Live GenAI App',
      techStack: ['Angular 17', '.NET Core', 'OpenAI API', 'Supabase', 'Firebase'],
      description: 'Dynamic Gen-AI application generating personalized technical study roadmaps, AI chat assistance, auto-generated code snippets, and quizzes.',
      longDescription: 'Engineered an adaptive learning platform tailored for tech job seekers. It features a conversational AI tutor, real-time code snippet evaluator, and automated day-by-day progress tracking.',
      impactMetrics: 'Integrated multi-modal learning & adaptive quiz generation for 500+ active users.',
      liveUrl: 'https://supabasetodo-85f3f.web.app/',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 2,
      title: 'EMI & Financial Management Suite',
      category: 'live',
      categoryLabel: 'Featured Live Financial System',
      techStack: ['Angular', '.NET Web API', 'SQL Server', 'T-SQL'],
      description: 'Database-driven financial management platform for tracking small business account ledgers, customer schedules, and daily transaction reports.',
      longDescription: 'Successfully migrated legacy Excel spreadsheet workflows into a secured Angular + .NET REST API platform with automated account summaries and customer reporting.',
      impactMetrics: 'Improved reporting accuracy by 35% across 200+ daily ledger transactions.',
      liveUrl: 'https://manafinance1.web.app/',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 3,
      title: 'AI Tools Navigator & Automation Hub',
      category: 'live',
      categoryLabel: 'Featured Live AI Directory',
      techStack: ['Angular', 'Python Automation', 'Azure App Services', 'Firebase'],
      description: 'Searchable AI tools directory web app featuring category filters, dynamic theme switching (Dark/Midnight), paired with Python automation scripts.',
      longDescription: 'Built an interactive portal for discovering AI models and utilities. Includes custom background Python worker scripts to sync work logs and ticket updates.',
      impactMetrics: 'Automated 90% of routine task entry & logs.',
      liveUrl: 'https://satishonlineaitools-b7199.web.app/',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 4,
      title: 'Campus Recruitment & Learning Portal',
      category: 'live',
      categoryLabel: 'Featured Educational Portal',
      techStack: ['Blogger', 'WordPress', 'HTML5/CSS3', 'JavaScript'],
      description: 'One-stop resource platform for engineering students providing learning materials, recruitment guidance, and interview prep.',
      longDescription: 'Created an early-career student portal at Pragati Engineering College consolidating course notes, recruitment syllabus, and technical interview guides.',
      impactMetrics: 'Served 1000+ engineering students during campus drives.',
      liveUrl: 'https://crtcrack.blogspot.com/',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 5,
      title: 'Kudosites Personal Developer Portfolio',
      category: 'live',
      categoryLabel: 'Featured Live Portfolio',
      techStack: ['Angular', 'TypeScript', 'CSS3', 'Web Hosting'],
      description: 'Interactive online portfolio website showcasing software development achievements, projects, and credentials.',
      longDescription: 'Custom developer profile site built to present projects, client work, and full stack engineering background.',
      impactMetrics: 'High conversion rate for recruiter inquiries.',
      liveUrl: 'https://www.kudosites.com/site/satish-reddy',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 6,
      title: 'Accenture Monolith Migration to Microservices',
      category: 'dotnet',
      categoryLabel: '.NET Enterprise',
      techStack: ['.NET Core 8', 'C#', 'Microservices', 'Docker', 'Azure AKS'],
      description: 'Modernization of legacy enterprise monolithic modules into scalable .NET Core RESTful microservices.',
      longDescription: 'Architected backend microservices executing core transaction logic. Containerized services using Docker and managed deployments on Kubernetes (Azure AKS).',
      impactMetrics: 'Increased application scalability & speed by 35% and reduced deploy errors by 25%.',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: true
    },
    {
      id: 7,
      title: 'High-Performance SQL & API Optimization Engine',
      category: 'dotnet',
      categoryLabel: '.NET & SQL Tuning',
      techStack: ['SQL Server', 'EF Core', 'T-SQL Indexing', 'xUnit', 'Moq'],
      description: 'Refactored complex relational SQL queries, indexing strategies, and stored procedures across 15+ backend database endpoints.',
      longDescription: 'Optimized EF Core queries and database schemas while enforcing xUnit test suites achieving 85% code coverage.',
      impactMetrics: 'Cut average API response retrieval times by 60%.',
      githubUrl: 'https://github.com/satishreddymedapati',
      featured: false
    },
    {
      id: 8,
      title: 'Python Automated JIRA Work Logger',
      category: 'pivot',
      categoryLabel: 'Automation & Productivity Pivot',
      techStack: ['Python', 'JIRA REST API', 'Automation'],
      description: 'Custom Python automation script replacing manual daily JIRA work hour submissions and task updates.',
      longDescription: 'Created a background CLI tool interacting with JIRA documents to fetch, update, and submit work logs without manual intervention.',
      impactMetrics: 'Saved 90% manual administrative time and eliminated entry errors.',
      featured: false
    },
    {
      id: 9,
      title: 'Cross-Platform Mobile UI (.NET MAUI & iOS)',
      category: 'angular',
      categoryLabel: 'Mobile & UI Frameworks',
      techStack: ['.NET MAUI', 'iOS', 'Angular', 'TypeScript'],
      description: 'Developed responsive UI screens and resolved critical cross-platform layout bugs across iOS 16.3 viewports.',
      longDescription: 'Ensured mobile UI stability, dark mode adaptations, and smooth animation transitions for cross-platform enterprise tools.',
      impactMetrics: 'Fixed 50+ cross-device UI bugs.',
      featured: false
    }
  ]);

  readonly skillCategories = signal<SkillCategory[]>([
    {
      title: 'Backend Engineering (.NET Core)',
      skills: [
        { name: '.NET Core / C#', level: 95, icon: '⚡' },
        { name: 'ASP.NET Web API', level: 92, icon: '🔌' },
        { name: 'Entity Framework Core', level: 90, icon: '🗄️' },
        { name: 'Microservices & Clean Architecture', level: 88, icon: '🏗️' },
        { name: 'xUnit / NUnit / Moq Testing', level: 85, icon: '🧪' }
      ]
    },
    {
      title: 'Frontend Engineering (Angular)',
      skills: [
        { name: 'Angular (v8–v17)', level: 95, icon: '🅰️' },
        { name: 'TypeScript & JavaScript (ES6+)', level: 94, icon: '📜' },
        { name: 'RxJS & Signals State', level: 90, icon: '🔄' },
        { name: 'HTML5, SASS & Glassmorphism UI', level: 92, icon: '🎨' },
        { name: 'Jasmine / Karma Unit Testing', level: 85, icon: '🎯' }
      ]
    },
    {
      title: 'Database & Cloud / DevOps',
      skills: [
        { name: 'SQL Server & T-SQL Optimization', level: 92, icon: '💾' },
        { name: 'Microsoft Azure (App Services, SQL)', level: 85, icon: '☁️' },
        { name: 'Docker & Kubernetes (AKS)', level: 82, icon: '🐳' },
        { name: 'Azure DevOps & CI/CD Pipelines', level: 88, icon: '🚀' },
        { name: 'Python Automation & Scripting', level: 88, icon: '🐍' }
      ]
    }
  ]);
}
