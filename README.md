# 🎓 Smart Campus Analytics: AI-Powered Student Success Platform

> **"Predict, Optimize & Improve Student Success."**  
> *Move beyond passive dashboards: convert continuous student telemetry into explainable drivers, actionable cohort segmentation, and peer-to-peer interventions.*

[![React 18](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS_%2B_OCTA_Bento-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Bilingual](https://img.shields.io/badge/Language-English_%26_हिन्दी-8b5cf6?style=flat-square)](#-bilingual-localization)
[![Hackathon Ready](https://img.shields.io/badge/Status-Hackathon_Submission_Ready-success?style=flat-square)](#)

---

## 🏆 Problem Statement & Bonus Criteria Alignment

| Requirement | How Smart Campus Analytics Solves It | Key Screen / Feature |
| :--- | :--- | :--- |
| **Move Beyond Dashboard** | Converts raw telemetry into proactive faculty check-in briefs, actionable peer matching, and What-If score simulation. | `Faculty Console`, `Sarthi Mentors`, `Simulator` |
| **Bonus 1: Student Segmentation** | Unsupervised ML segmentation into 5 operational categories (`High Performers`, `Hidden Potential`, `Steady but Stuck`, `At Risk`, `Placement Ready`), each tied to concrete intervention protocols. | `TeacherDashboard.tsx`, `AdminDashboard.tsx` |
| **Bonus 2: Explainable Score** | Visible SHAP-style attribution waterfall displaying exact positive (+ pts) and negative (- pts) drivers relative to department benchmarks. | `ExplainableDriverChart.tsx`, `ScoreGauge.tsx` |
| **Bonus 3: Anti-Cheating Integrity** | Computer vision face-tracking, live acoustic decibel microphone detector, and 0-mark honeypot trap questions that identify web/LLM plagiarism. | `ProctoredTestPage.tsx` |
| **Bonus 4: AI Career Advisor** | Diagnostic career counselor explaining student strengths, weaknesses, and direct skill-verified internship matching. | `AIBotAdvisorPage.tsx`, `InternshipDashboard.tsx` |

---

## ⚡ 1-Click Evaluator Quickstart

### 1. Launch the Application
```powershell
cd smart-campus-analytics
$env:PATH = "C:\Users\DELL-PC\tools\node;" + $env:PATH
npm run dev
# Running live at http://localhost:3000/
```

### 2. Evaluator Demo Credentials (3 Independent Portals)
The portal features **strict role-based access isolation** (`RoleRoute`). Unauthenticated visits land directly at `/login`.

| Role | Demo Identity | Department / Scope | Exclusive Accessible Modules |
| :--- | :--- | :--- | :--- |
| **Student** | Aarav Sharma (`21BCSE104`) | Computer Science & Engg | `OCTA Bento`, `Student Hub`, `AI Advisor`, `Proctor Test`, `Internships`, `Sarthi Mentors`, `What-If Simulator` |
| **Faculty** | Dr. Ramanathan K. | Computer Science & Engg | `OCTA Bento`, `Faculty Console` (Risk-Ranked Roster & Interventions) |
| **Dean / Admin** | Prof. Sunita Rao | Office of Academic Affairs | `OCTA Bento`, `Admin Overview` (Department Benchmarks, Intervention ROI, Fairness Audit) |

---

## 📱 Feature Walkthrough & Evaluation Guide

### 1. OCTA Bento Living Telemetry Grid (`/bento`)
- Engineered following the **Kombai Gallery OCTA design reference**: flat minimal dark canvas (`#0B0A0C`), pale lilac cards (`#EEE3F7`), deep royal purple accents (`#7C4BB0`), bold grotesque numerals, and living milestone rings.
- **Positioned First**: Every user lands on the Bento Grid first upon authenticating.
- Dynamic CTA ribbons guide students to their Hub, faculty to their Console, and administrators to the Institutional Overview.

### 2. Student Success Hub (`/student`)
- **Success Score (0-100)**: XGBoost ensemble metric with delta tracking.
- **Explainable Driver Breakdown**: Visualized positive impact drivers (Attendance +9.4, Mini Projects +8.2) vs. negative risk factors (OS Theory -7.1).
- **AI Diagnostic Report**: Identifies core strengths, weaknesses, and gives a 1-click **Download Brief** option.
- **6-Week Recovery Roadmap**: Clear chronological milestones to recover lagging theory grades.

### 3. Faculty Early Warning Console (`/teacher`)
- **"5 Students to Talk to Today" Brief**: Automated triage identifying students with recent pattern drift.
- **Cohort Filter by Segment**: Filter by High Performers, Hidden Potential, Steady but Stuck, At Risk, Placement Ready.
- **1-Click Intervention Logging**: Record academic advising, lab clinic referrals, and behavioral check-ins with instant toast receipts.

### 4. Anti-Cheating Proctored Assessment Engine (`/assessment`)
- **Vision Tracking**: Real-time webcam face orientation monitor.
- **Live Acoustic Sensor**: Web Audio API decibel analyzer listening in real time to catch background whispers or audio cheating.
- **Canary Trap Questions**: Random out-of-syllabus honeypot questions inserted midway (marks: 0). They detect if a student pastes the question into search engines or AI bots without affecting their genuine exam score.

### 5. What-If Trajectory Simulator (`/simulator`)
- Interactive sliders for Attendance, Assignments, Capstone Projects, and Weekly Coding Practice.
- Live algorithmic recalculation of final Success Score, delta projection, and segment transition.
- 1-click preset scenarios: *Placement-Ready Surge*, *Exam Burnout Slip*, *Theory Recovery Plan*.

### 6. Institutional Decision Intelligence & Fairness Audit (`/admin`)
- Department-wide benchmarking curves.
- Intervention efficacy tracking (Pre-Score vs. Post-Score deltas).
- **AI Demographic Parity Audit**: True Positive Rate (TPR) and False Positive Rate (FPR) equality verification across demographic cohorts.
- 1-click **Export Governance Memo** (.txt file download).

---

## 🌐 Bilingual Localization
- Native toggle between **English** and **हिन्दी (Hindi)** in the top navigation bar.
- Changes translate all dashboard metrics, labels, proctor instructions, and dynamic status badges.
- Dynamically updates `<html lang="en">` and `<html lang="hi">` for accessibility.

---

## 🛠️ Architecture & Tech Stack

```text
Frontend: React 18 + Vite + Tailwind CSS + React Router + Lucide Icons + Recharts
State & Context: AuthContext (LocalStorage Session) + LanguageContext (Bilingual) + ToastContext
API Integration: Unified Data-Service Layer (src/services/api.ts) with companion FastAPI backend (backend/main.py)
Integrity Sensors: Web Audio API (Live Acoustic Meter) + MediaDevices API (Vision Stream)
```

---

## 📞 Project Coordinator Contact
- **Email**: [09shivamtiwari09@gmail.com](mailto:09shivamtiwari09@gmail.com)
- **Phone**: [+91 89340 60356](tel:+918934060356)
- **Repo Archive**: `smart-campus-analytics-final.zip` (Root directory)
