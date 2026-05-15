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


1. Upload Resume (Frontend)

2. Send File to Backend (Frontend → Backend)

3. Extract Resume Text (Backend)
   - PDF/DOCX → raw text using pdf-parse / mammoth

4. Save Resume Data (Backend → DB)
   Store:
   - file URL
   - raw extracted text
   - userId

5. Take Job Description (Frontend)

6. Send JD + Resume Text to Backend (Frontend → Backend)
   Frontend sends:
   - resume text
   - job description

7. Weekly Usage Check (Backend)
   Before AI call:
   - check weekly limit
   - block if exceeded

8. Extract Skills Locally (Backend)
   Backend compares:
   - resume skills
   - JD skills
   using local TypeScript logic
   (includes, arrays, filters)

9. Calculate ATS Score Locally (Backend)
   Generate:
   - ATS score
   - matched skills
   - missing skills
   - match percentage

10. Save Local ATS Analysis (Backend → DB)
    Store:
    - ATS score
    - matched skills
    - missing skills
    - match percentage

11. Send Optimized Prompt to AI (Backend)
    Backend sends:
    - cleaned resume text
    - ATS result
    - missing skills
    - job description
    to Gemini / Claude

12. AI Resume Rewriter (Backend)
    AI generates:
    - improved summary
    - better bullet points
    - recruiter-style suggestions
    - ATS optimized rewrite

13. Save AI Result (Backend → DB)
    Store:
    - rewritten summary
    - suggestions
    - AI response

14. Show Results (Frontend)
    Dashboard displays:
    - ATS score
    - matched skills
    - missing skills
    - rewritten summary
    - AI suggestions

15. Future Upgrade (Optional)
    - Generate full ATS-ready resume
    - Export/download PDF
    - Pro/Gold plans