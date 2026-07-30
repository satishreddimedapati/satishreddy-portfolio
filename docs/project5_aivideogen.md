# 🎬 Project 5: AI Video & Avatar Generator

## 📌 Project Overview
- **Project Folder:** `c:\Users\satis\projects\project 9 -ai video gen\sample1`
- **Application Name:** `ai-video-app`
- **Architecture:** Dual-Tier (Angular/Next.js Web UI + Python Backend API)
- **Primary Domain:** Automated Video Production, AI Voiceovers, Avatar Animation

---

## 🛠️ Technology Stack & Libraries
- **Frontend Stack:** `ai-video-app` web dashboard for script entry and video preview.
- **Backend API Engine:** Python FastAPI/Flask server handling script processing.
- **AI Integrations:** OpenAI API (script generation), ElevenLabs (TTS voice synthesis).
- **Automation Scripts:** `start_app.bat` & `start.sh` concurrent server launcher.

---

## ⚡ Core Business & Architectural Features

### 1. Script-to-Video Rendering Pipeline
Converts raw text scripts into synthesized audio voiceovers and renders animated avatar video clips.

### 2. Dual-Tier Server Boot Launcher
Custom `start_app.bat` script launching both Python API workers and local web server simultaneously.
