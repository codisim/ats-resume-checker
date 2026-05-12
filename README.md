# 🚀 ATS Resume Checker (AI-Powered SaaS)

An AI-powered Resume Analyzer that compares your resume with job descriptions and provides ATS score, skill gaps, and improvement suggestions.

Built with **Next.js + TypeScript + AI + PostgreSQL**, designed for global users and scalable SaaS architecture.

---

## 🌍 Live Demo
> Coming Soon: https://resume.codisim.com

---

## 📌 Features

### ✨ Core Features
- Upload Resume (PDF / DOCX)
- Paste Job Description
- AI-powered ATS Score
- Skill Gap Analysis
- Resume Improvement Suggestions
- Improved Summary Generator
- Match Percentage Calculation

### 📊 Dashboard
- View past resume analyses
- Track ATS score history
- Resume comparison history

### 🔐 Authentication
- Google login (Clerk)
- User-based dashboard
- Protected routes

### 📈 Usage System
- Weekly scan limit system
- Free tier (7–12 scans/week)
- Future Pro / Gold plan support

### 🌍 Global Features (Future)
- Country-based usage analytics
- Interactive global user map
- Waitlist system for Pro users

---

## 🧠 How It Works (Flow)

```txt
User Login
   ↓
Upload Resume (PDF/DOCX)
   ↓
Paste Job Description
   ↓
Extract Resume Text
   ↓
Send Data to AI (Gemini)
   ↓
AI Analysis:
   - ATS Score
   - Missing Keywords
   - Strengths & Weaknesses
   - Suggestions
   ↓
Save Result in Database
   ↓
Show Dashboard Report

// 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

Day 1 → Setup + Prisma + Auth
Day 2 → Upload + Resume parsing
Day 3 → AI integration
Day 4 → Usage limit + DB logic
Day 5 → Dashboard
Day 6 → Landing page + waitlist
Day 7 → Deploy 