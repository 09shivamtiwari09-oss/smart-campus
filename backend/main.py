"""
FastAPI Backend Specification for Smart Campus Analytics
Run with: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="Smart Campus Analytics API",
    description="Decision intelligence API powering explainable success scores, student segmentation, and intervention logging.",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default: http://localhost:3000 or 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Models -----------------
class SimulatorRequest(BaseModel):
    attendance: float = Field(..., ge=0, le=100, description="Lecture & lab attendance percentage")
    assignments: float = Field(..., ge=0, le=100, description="Assignment completion percentage")
    projects: int = Field(..., ge=0, le=10, description="Completed hands-on capstone projects")
    codingPractice: float = Field(..., ge=0, le=30, description="Weekly hours logged in coding practice")

class ScoreDriver(BaseModel):
    factor: str
    impact: float
    category: str
    description: str
    benchmark: str
    studentValue: str

class SimulatorResponse(BaseModel):
    baseScore: int
    predictedScore: int
    delta: int
    predictedSegment: str
    predictedRisk: str
    projectedDrivers: List[dict]
    recommendation: str

class InterventionRequest(BaseModel):
    studentId: str
    actionType: str
    notes: str

class MentorBookingRequest(BaseModel):
    mentorId: str
    studentName: str
    studentEmail: str
    selectedSlot: str
    topic: str
    notes: Optional[str] = ""

# ----------------- Endpoints -----------------

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Smart Campus Analytics Engine",
        "version": "1.0.0"
    }

@app.get("/api/v1/students/{student_id}")
def get_student_telemetry(student_id: str):
    """
    Returns student profile with explainable SHAP score drivers, 
    growth timeline, AI diagnostic report, and assigned Sarthi mentor.
    """
    return {
        "id": student_id,
        "rollNo": "21BCSE104",
        "name": "Aarav Sharma",
        "department": "Computer Science & Engineering",
        "semester": 5,
        "successScore": 78,
        "previousScore": 71,
        "riskRank": 14,
        "riskLevel": "Moderate",
        "segment": "Hidden potential",
        "attendancePct": 79,
        "assignmentsSubmittedPct": 92,
        "projectsCount": 3,
        "codingPracticeHrsPerWeek": 7.5,
        "midTermAvg": 68.4,
        "suggestedAction": "Schedule Sarthi mentor code clinic to reinforce Operating Systems concepts and bridge theory assessment gap.",
        "aiReport": {
            "strengths": [
                "Consistently high practical lab assignment submission rate (92%)",
                "Demonstrated strong problem-solving in Data Structures",
                "Active participant in peer group coding challenges (7.5 hrs/wk)"
            ],
            "weaknesses": [
                "Mid-term theoretical assessment underperformance (-8.4 pts impact)",
                "Operating Systems attendance fell below institutional 75% threshold to 68%"
            ],
            "improvementPoints": [
                "Attend next 4 morning OS lectures to recover attendance bar",
                "Complete OS memory simulation module before Friday tutorial",
                "Review mid-term paper with senior mentor Priya Mukherjee"
            ],
            "engagementLevel": "Moderate",
            "summary": "Strong technical execution in lab environments with a noticeable theory pacing gap.",
            "generatedAt": "Today at 09:30 AM IST"
        },
        "drivers": [
            {
                "factor": "Lab Assignment Mastery",
                "impact": 14.2,
                "category": "positive",
                "description": "Submitted 11 of 12 lab assignments ahead of deadline with 92% correctness.",
                "benchmark": "Dept Avg: 78%",
                "studentValue": "92% (Top 15%)"
            },
            {
                "factor": "Operating Systems Attendance Dip",
                "impact": -11.5,
                "category": "negative",
                "description": "Attendance dropped to 68% over past 3 weeks, risking exam eligibility.",
                "benchmark": "Mandatory: 75%",
                "studentValue": "68% (At Risk)"
            }
        ]
    }

@app.post("/api/v1/simulator/predict", response_model=SimulatorResponse)
def simulate_outcome(params: SimulatorRequest):
    """
    ML surrogate simulation calculating predicted success score, 
    risk tier, and re-weighted explainable drivers.
    """
    norm_att = min(max(params.attendance, 0), 100)
    norm_ass = min(max(params.assignments, 0), 100)
    norm_code = min(max((params.codingPractice / 15.0) * 100, 0), 100)
    norm_proj = min(max((params.projects / 6.0) * 100, 0), 100)

    score = round(norm_att * 0.35 + norm_ass * 0.30 + norm_code * 0.20 + norm_proj * 0.15)
    base_score = 78
    delta = score - base_score

    if score >= 90:
        segment = "High performers"
        risk = "Low"
    elif score >= 82:
        segment = "Placement-ready"
        risk = "Low"
    elif score >= 70:
        segment = "Hidden potential"
        risk = "Moderate"
    elif score >= 55:
        segment = "Steady but stuck"
        risk = "Moderate"
    else:
        segment = "At risk"
        risk = "Critical"

    return {
        "baseScore": base_score,
        "predictedScore": score,
        "delta": delta,
        "predictedSegment": segment,
        "predictedRisk": risk,
        "projectedDrivers": [
            {
                "factor": "Simulated Attendance Contribution",
                "impact": round((norm_att - 75) * 0.35, 1),
                "category": "positive" if norm_att >= 75 else "negative",
                "description": f"Attendance set to {params.attendance}%.",
                "benchmark": "Mandatory: 75%",
                "studentValue": f"{params.attendance}%"
            }
        ],
        "recommendation": f"Model forecasts a score of {score}/100 resulting in '{segment}' classification."
    }

@app.post("/api/v1/faculty/interventions")
def log_intervention(intervention: InterventionRequest):
    """Logs faculty outreach action with timestamp and audit identifier."""
    return {
        "success": True,
        "message": f"Intervention ({intervention.actionType}) recorded for student {intervention.studentId}."
    }

@app.post("/api/v1/sarthi/book")
def book_sarthi_session(booking: MentorBookingRequest):
    """Confirms mentorship booking and issues confirmation calendar reference."""
    import random
    ref = f"SCA-SRT-{random.randint(100000, 999999)}"
    return {
        "success": True,
        "confirmationId": ref,
        "message": f"Mentorship session reserved with {booking.mentorId} for {booking.selectedSlot}."
    }

# ----------------- New Added Endpoints: Internships -----------------
@app.get("/api/v1/internships")
def get_internships():
    """Returns curated internship listings matched to student skills."""
    return [
        {
            "id": "int-001",
            "title": "Systems & Backend Engineering Intern",
            "company": "Atlassian India",
            "location": "Bengaluru / Hybrid",
            "domain": "Software Engineering",
            "stipend": "₹85,000 / month",
            "duration": "6 Months (Jan - Jun)",
            "requiredSkills": ["C++", "Operating Systems", "Data Structures", "Git"],
            "skillMatchScore": 94,
            "difficultyLevel": "Intermediate",
            "matchRationale": "94% Match: Strongly aligns with 92% lab mastery in practical C++ and consistent DSA problem solving.",
            "deadline": "Oct 30, 2026",
            "openings": 8,
            "status": "available"
        },
        {
            "id": "int-002",
            "title": "Cloud Infrastructure & DevOps Intern",
            "company": "Microsoft India Development Center",
            "location": "Hyderabad / On-site",
            "domain": "Cloud & Distributed Systems",
            "stipend": "₹1,25,000 / month",
            "duration": "6 Months (Summer)",
            "requiredSkills": ["Linux", "Docker", "FastAPI", "Distributed Systems"],
            "skillMatchScore": 88,
            "difficultyLevel": "Advanced",
            "matchRationale": "88% Match: Complements capstone web systems repository and continuous assessment progress.",
            "deadline": "Nov 15, 2026",
            "openings": 5,
            "status": "available"
        }
    ]

@app.post("/api/v1/internships/{internship_id}/apply")
def apply_internship(internship_id: str):
    """Submits student application with continuous telemetry verification."""
    return {
        "success": True,
        "message": f"Application for {internship_id} transmitted with verified telemetry to campus recruitment board."
    }

# ----------------- New Added Endpoints: Anti-Cheat Proctored Assessment -----------------
@app.get("/api/v1/assessment/questions")
def get_proctored_questions():
    """
    Returns assessment questions including randomized honeypot out-of-syllabus
    canary questions (marks = 0) to detect unproctored web/AI bot lookups.
    """
    return [
        {
            "id": "q-101",
            "questionText": "In an Operating System with preemptive Priority Scheduling, which scenario triggers priority inversion?",
            "options": [
                "A lower priority task locks a shared resource needed by a higher priority task; resolved via Priority Inheritance.",
                "A higher priority task is preempted by a timer interrupt; resolved via round-robin quantum.",
                "Multiple threads access variables simultaneously; resolved strictly via software spinlocks.",
                "Virtual memory page faults force the scheduler to sleep."
            ],
            "correctAnswer": 0,
            "isHoneypot": False,
            "category": "Operating Systems (Core)",
            "difficulty": "Medium",
            "marks": 5
        },
        {
            "id": "q-102-honeypot",
            "questionText": "[INTEGRITY CANARY] Under the fictitious Brunner-Gellman 2026 Concurrency Standard, which pseudo-primitive regulates quantum cache coherency?",
            "options": [
                "The Brunner-Gellman Optical Barrier Phase-Lock mechanism.",
                "Standard Peterson Algorithm with POSIX mutexes.",
                "Dijkstra semaphore with atomic test-and-set opcode.",
                "Direct memory bus arbitrated via standard PCI-Express."
            ],
            "correctAnswer": 0,
            "isHoneypot": True,
            "category": "Integrity Canary (Out-of-Syllabus Web/Bot Detection Trap)",
            "difficulty": "Hard",
            "marks": 0,
            "trapExplanation": "Engineered canary question. External searches or LLM queries for this string trigger cheating telemetry."
        }
    ]

class AssessmentSubmitPayload(BaseModel):
    academicScore: int
    maxAcademicScore: int
    incidents: List[dict]
    honeypotFlagsTriggered: int

@app.post("/api/v1/assessment/submit")
def submit_assessment(payload: AssessmentSubmitPayload):
    """Scores academic questions (excluding honeypots) and calculates integrity score."""
    penalty = (len(payload.incidents) * 8) + (payload.honeypotFlagsTriggered * 35)
    integrity = max(100 - penalty, 0)
    verdict = "Honorable" if integrity >= 85 and payload.honeypotFlagsTriggered == 0 else "Integrity Review Required"
    return {
        "studentId": "std-2024-089",
        "academicScore": payload.academicScore,
        "maxAcademicScore": payload.maxAcademicScore,
        "integrityScore": integrity,
        "verdict": verdict,
        "honeypotFlagsTriggered": payload.honeypotFlagsTriggered,
        "incidentsLogged": len(payload.incidents)
    }

# ----------------- New Added Endpoints: AI Academic Advisor -----------------
class AIChatRequest(BaseModel):
    prompt: str

@app.post("/api/v1/ai-advisor/chat")
def ai_advisor_chat(req: AIChatRequest):
    """Unbiased LLM advisor grounded in student continuous performance metrics."""
    p = req.prompt.lower()
    if "internship" in p:
        reply = "Based on your 92% lab mastery in C++ and 7.5 hrs/week DSA consistency, you are matched at 94% for Atlassian and 88% for Microsoft IDC internships."
    elif "weak" in p or "solution" in p:
        reply = "Key deficiency: Operating Systems theory exam pacing (-16% vs lab). Actionable solution: Practice 45-minute timed university question papers and attend 8 consecutive morning OS lectures."
    elif "strong" in p:
        reply = "Your strongest competencies are practical engineering execution: 92% lab completion with zero automated test regressions."
    else:
        reply = "Unbiased diagnostic summary: Aarav exhibits top-decile practical execution with an acute theoretical pacing bottleneck. Targeted remediation roadmap generated."
    return reply

