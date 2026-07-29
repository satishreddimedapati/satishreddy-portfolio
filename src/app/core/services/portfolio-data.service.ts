import { Injectable, signal } from '@angular/core';
import { Project, SkillCategory } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  
  readonly projects = signal<Project[]>([
    {
      id: 1,
      title: 'Gold Loan & Finance Suite',
      category: 'dotnet',
      categoryLabel: 'Angular 21 & Supabase',
      techStack: ['Angular 21', 'Supabase', 'jspdf', 'xlsx', 'Chart.js', 'Firebase'],
      description: 'Gold ornament purity/weight valuation engine, LTV calculator, pledge PDF receipts, and daily repayment ledgers.',
      longDescription: 'Specialized gold loan collateral management platform built for gold loan providers. Manages customer identity, ornament weights in grams/carats, interest rates, printable PDF pledge receipts, and daily recovery ledgers.',
      impactMetrics: 'Improved collateral valuation & interest calculation accuracy by 35%.',
      lessonsLearned: 'Uses Angular 21 Signals for real-time LTV calculation without RxJS overhead.',
      featured: true
    },
    {
      id: 2,
      title: 'Next.js 15 AI Daily Tracker Pro',
      category: 'pivot',
      categoryLabel: 'Next.js 15 & Gemini AI',
      techStack: ['Next.js 15', 'Genkit AI', 'Firebase', 'TanStack Query', 'TailwindCSS', 'Recharts'],
      description: 'AI daily task analytics portal using Google Gemini models for automated work log summaries.',
      longDescription: 'Full-stack AI developer task tracker built with Next.js 15 App Router and Turbopack. Integrates Google Genkit AI serverless pipelines to analyze developer goals and generate habit focus summaries.',
      impactMetrics: 'Automates daily developer goal breakdowns and focus recommendations.',
      featured: true
    },
    {
      id: 3,
      title: 'Executive Assistant & Analytics Dashboard',
      category: 'dotnet',
      categoryLabel: 'Angular 17 & SSR',
      techStack: ['Angular 17', 'PrimeNG', 'ngx-datatable', 'Chart.js', 'Express SSR'],
      description: 'Executive schedule planner and expense dashboard with high-throughput data tables and SSR server rendering.',
      longDescription: 'High-speed personal assistant dashboard consolidating schedule planning, expense tracking, and data analytics. Combines PrimeNG and ngx-datatable for high-speed rendering.',
      impactMetrics: 'High-throughput rendering of large data grids with Express SSR pre-rendering.',
      featured: true
    },
    {
      id: 4,
      title: 'AI Tools & API Directory Navigator',
      category: 'live',
      categoryLabel: 'Featured Live AI Directory',
      techStack: ['Angular 17', 'Firebase Firestore', 'GitHub Pages', 'Express SSR'],
      description: 'Searchable directory portal for discovering AI models, online API utilities, and developer tools.',
      longDescription: 'Curated resource navigator with reactive search filtering across 100+ AI models and APIs. Automated GitHub Pages deployment pipeline.',
      impactMetrics: 'Automated 90% of routine task entry & work logs.',
      liveUrl: 'https://satishonlineaitools-b7199.web.app/',
      featured: true
    },
    {
      id: 5,
      title: 'AI Video & Avatar Generator',
      category: 'pivot',
      categoryLabel: 'Python & Web UI Suite',
      techStack: ['Python FastAPI', 'OpenAI API', 'ElevenLabs TTS', 'MoviePy'],
      description: 'Automated video generation pipeline converting text scripts into synthesized voiceovers and AI avatar clips.',
      longDescription: 'Dual-tier AI video processing pipeline that accepts text scripts, synthesizes audio voiceovers via ElevenLabs, and renders animated avatar video clips.',
      impactMetrics: 'One-click shell orchestration script for concurrent server launching.',
      featured: true
    },
    {
      id: 6,
      title: 'Advanced Multi-Database Task Suite',
      category: 'pivot',
      categoryLabel: 'Angular 19 & Multi-DB',
      techStack: ['Angular 19', 'Supabase', 'Firebase', 'PocketBase', 'FullCalendar'],
      description: 'Task scheduling app with drag-and-drop calendar UI and backend driver switching between Supabase, Firebase, and PocketBase.',
      longDescription: 'Multi-database task architecture allowing dynamic switching between Supabase PostgreSQL, Firebase Firestore, and PocketBase backends with interactive FullCalendar integration.',
      impactMetrics: 'Multi-DB storage bridge supporting seamless offline & cloud sync.',
      featured: false
    },
    {
      id: 7,
      title: 'High-Speed EMI & Ledger Tracker',
      category: 'live',
      categoryLabel: 'Featured Live Financial App',
      techStack: ['Angular 19', 'AG-Grid 34', 'D3.js', 'ExcelJS', 'Supabase'],
      description: 'High-throughput accounting ledger managing customer EMI timelines, D3 analytics, and structured Excel reports.',
      longDescription: 'Database-driven financial management platform for tracking small business ledgers, customer schedules, and daily transaction reports.',
      impactMetrics: 'Improved reporting accuracy by 35% across 200+ daily ledger transactions.',
      liveUrl: 'https://manafinance1.web.app/',
      featured: true
    },
    {
      id: 8,
      title: 'Multi-Account Finance WebApp',
      category: 'dotnet',
      categoryLabel: 'Angular 19 & AG-Grid',
      techStack: ['Angular 19', 'Supabase v2.50', 'AG-Grid 32', 'Canvas Confetti'],
      description: 'Multi-account business finance ledger with celebratory milestone animations and multi-select filtering.',
      longDescription: 'Comprehensive business ledger app supporting multi-select customer filters, confetti animations on loan completion, and account balances.',
      impactMetrics: 'Optimized state rendering speed by 40%.',
      featured: false
    },
    {
      id: 9,
      title: 'SwitchBuddy Career & Interview Copilot',
      category: 'dotnet',
      categoryLabel: 'Angular 19 & Material',
      techStack: ['Angular 19', 'Angular Material 19', 'Express SSR'],
      description: 'Developer interview preparation platform covering .NET Core microservices, Angular coding challenges, and C# fundamentals.',
      longDescription: 'Interview preparation copilot app providing candidates with structured question banks, C#/.NET fundamental guides, and coding challenges.',
      impactMetrics: 'Accelerated technical interview prep for candidate drives.',
      featured: false
    },
    {
      id: 10,
      title: 'Daily Debrief & Automation Cron Engine',
      category: 'pivot',
      categoryLabel: 'Node.js Microservice',
      techStack: ['Node.js', 'node-cron v4.2'],
      description: 'Background cron service automating daily work log debriefs and periodic database cleanup tasks.',
      longDescription: 'Automated Node.js cron microservice running periodic background tasks, status updates, and database maintenance scripts.',
      impactMetrics: 'Automates 100% of daily cron execution schedules.',
      featured: false
    },
    {
      id: 11,
      title: 'Industrial Cylinder Rental & Ledger WebApp',
      category: 'dotnet',
      categoryLabel: 'Angular 19 & Neon Postgres',
      techStack: ['Angular 19', 'Neon Serverless Postgres', 'Supabase', 'AG-Grid 34', 'jspdf'],
      description: 'Industrial cylinder supply ledger tracking delivery schedules, deposit ledgers, rental invoices, and serverless Postgres queries.',
      longDescription: 'Supply and rental ledger system managing industrial cylinder delivery schedules, customer deposit accounts, and PDF rental invoice rendering.',
      impactMetrics: 'Serverless Postgres database queries via Neon API.',
      featured: false
    },
    {
      id: 12,
      title: 'SwitchBuddy Angular Edition',
      category: 'angular',
      categoryLabel: 'Angular 19 & Supabase',
      techStack: ['Angular 19', 'Supabase v2.87', 'Angular Material 19'],
      description: 'Frontend Angular quiz portal with question bookmarking and mock interview progress tracking.',
      longDescription: 'Angular-focused interview portal with real-time Supabase database backend for saving user quiz scores and question bookmarks.',
      impactMetrics: 'Tracks real-time score analytics across Angular modules.',
      featured: false
    },
    {
      id: 13,
      title: 'SwitchBuddy AI Edition with Gemini',
      category: 'pivot',
      categoryLabel: 'Angular 19 & Gemini AI',
      techStack: ['Angular 19', 'Google Gemini AI', 'TailwindCSS', 'Supabase'],
      description: 'Generative AI interview assistant providing real-time AI code reviews, mock interview answers, and resume bullet rewrites.',
      longDescription: 'AI-enhanced SwitchBuddy platform utilizing `@google/generative-ai` to generate instant AI code reviews, mock interview practice, and resume enhancements.',
      impactMetrics: 'Instant AI code feedback powered by Google Gemini SDK.',
      featured: true
    },
    {
      id: 14,
      title: 'Modern Personal Metric Tracker',
      category: 'angular',
      categoryLabel: 'Angular 21.2 & Vitest',
      techStack: ['Angular 21.2', 'Esbuild Engine', 'Vitest v4', 'Lucide Icons', 'Chart.js'],
      description: 'Modern personal habit and expense metric tracker built on Angular 21.2 with Vitest unit testing.',
      longDescription: 'Next-generation personal expense and habit tracker built on Angular 21.2, featuring Lucide icons, Chart.js visual graphs, and modern Vitest runner.',
      impactMetrics: 'Ultra-fast Esbuild compilation and Vitest unit testing pipeline.',
      featured: false
    },
    {
      id: 15,
      title: 'Railway Transit & Booking Portal',
      category: 'angular',
      categoryLabel: 'Angular 21.2 & Supabase',
      techStack: ['Angular 21.2', 'Supabase v2.105', 'Vitest', 'Express v5'],
      description: 'Railway ticket booking and transit status web app built on Angular 21.2 with Supabase database backend.',
      longDescription: 'Transit booking single-page web app built on Angular 21.2 with serverless Express v5 and Supabase database integration.',
      impactMetrics: 'Real-time train status tracking and ticket booking.',
      featured: false
    },
    {
      id: 16,
      title: 'Instagram Automated Content Autobot',
      category: 'pivot',
      categoryLabel: 'Python 3.11 & Edge-TTS',
      techStack: ['Python 3.11', 'edge-tts', 'MoviePy', 'Pillow', 'Instagram Graph API'],
      description: 'Automated video bot generating reels with Telugu/English Edge-TTS voiceovers and auto-publishing to Instagram.',
      longDescription: 'Automated Instagram reel generator that parses content JSON databases, renders Telugu/English voiceovers via Edge-TTS, composes video slides with MoviePy, and posts to Instagram API.',
      impactMetrics: 'Fully automated video synthesis and Instagram publishing.',
      featured: true
    },
    {
      id: 17,
      title: 'Interview OS Master Candidate Platform',
      category: 'angular',
      categoryLabel: 'Angular 21 & Firebase',
      techStack: ['Angular 21.2', '@angular/fire', 'Firebase v12.15', 'marked'],
      description: 'Comprehensive tech interview candidate portal featuring single-page ATS resume generation and Markdown document viewer.',
      longDescription: 'Candidate master suite providing verified single-page ATS resumes, Markdown technical guide parser, and Firebase cloud backup.',
      impactMetrics: 'Generates 95+ ATS score verified resumes.',
      featured: true
    },
    {
      id: 18,
      title: 'Interactive Digital Portfolio WebApp',
      category: 'live',
      categoryLabel: 'Featured Live Portfolio',
      techStack: ['Angular 21', 'Firebase Firestore', 'Vercel Deployment', 'Ask Satish AI'],
      description: 'Glassmorphic 3D profile webapp featuring video intro, AI assistant, project showcase grid, and recruiter inbox.',
      longDescription: 'Official developer portfolio web app built with Angular 21, Signals, Vercel deployment, and Ask Satish AI assistant widget.',
      impactMetrics: 'Deployed live on Vercel (satishreddy-portfolio.vercel.app).',
      liveUrl: 'https://satishreddy-portfolio.vercel.app',
      featured: true
    },
    {
      id: 19,
      title: 'Campus Recruitment Hub (CRT Crack)',
      category: 'live',
      categoryLabel: 'Featured Educational Hub',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Blogger API'],
      description: 'Educational resource portal serving 1,000+ engineering students with placement material and coding guides.',
      longDescription: 'Created during Satish\'s engineering studies to consolidate course notes, placement syllabi, and technical interview guides for campus drive candidates.',
      impactMetrics: 'Served 1,000+ engineering students during campus drives.',
      liveUrl: 'https://crtcrack.blogspot.com/',
      featured: true
    },
    {
      id: 20,
      title: 'AI-Powered Personal Learning Tutor',
      category: 'live',
      categoryLabel: 'Featured Live GenAI App',
      techStack: ['Angular 17', 'OpenAI GPT-4', 'Supabase', 'Firebase Auth'],
      description: 'Dynamic Gen-AI application generating personalized technical study roadmaps, AI chat assistance, and quizzes.',
      longDescription: 'Adaptive learning platform for tech job seekers featuring conversational AI tutor, code evaluator, and day-by-day progress tracking.',
      impactMetrics: '500+ active learners using generated roadmaps.',
      liveUrl: 'https://supabasetodo-85f3f.web.app/',
      featured: true
    },
    {
      id: 21,
      title: 'Kudosites Developer Profile Site',
      category: 'live',
      categoryLabel: 'Featured Live Profile Site',
      techStack: ['Angular', 'TypeScript', 'Responsive SASS'],
      description: 'Official developer profile site highlighting client projects, software achievements, and credentials.',
      longDescription: 'Public developer profile landing page built to present software development achievements, credentials, and client project showcases.',
      impactMetrics: 'High conversion rate for recruiter inquiries.',
      liveUrl: 'https://www.kudosites.com/site/satish-reddy',
      featured: true
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
        { name: 'Angular (v8–v21)', level: 95, icon: '🅰️' },
        { name: 'TypeScript & JavaScript (ES6+)', level: 94, icon: '📜' },
        { name: 'RxJS & Signals State', level: 90, icon: '🔄' },
        { name: 'HTML5, SASS & Glassmorphism UI', level: 92, icon: '🎨' },
        { name: 'Jasmine / Karma / Vitest Testing', level: 85, icon: '🎯' }
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
