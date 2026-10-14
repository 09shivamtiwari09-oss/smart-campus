import { 
  StudentProfile, 
  SarthiMentor, 
  DepartmentInsight, 
  InterventionMetric, 
  FairnessAuditMetric,
  SimulatorParams,
  SimulatorResult,
  MentorBookingRequest
} from '../types';
import { 
  mockCurrentStudent, 
  mockFacultyStudents, 
  mockMentors, 
  mockDepartmentInsights, 
  mockInterventionMetrics, 
  mockFairnessAudit,
  calculateSimulatorOutcome
} from './mockData';

// Configuration: Switch between mock JSON and real FastAPI backend
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';
export const USE_MOCK = true; // Toggle to false when FastAPI backend is live

// Network delay simulation for realistic skeleton/loading states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // 1. Student Dashboard Telemetry
  async getStudentProfile(studentId: string = 'std-2024-089'): Promise<StudentProfile> {
    if (USE_MOCK) {
      await delay(450);
      return mockCurrentStudent;
    }
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch student analytics');
    return response.json();
  },

  // 2. Teacher/Faculty Cohort & Intervention Triage
  async getFacultyStudents(): Promise<StudentProfile[]> {
    if (USE_MOCK) {
      await delay(500);
      return mockFacultyStudents;
    }
    const response = await fetch(`${API_BASE_URL}/faculty/students`);
    if (!response.ok) throw new Error('Failed to fetch cohort telemetry');
    return response.json();
  },

  // Record an intervention for a student
  async recordIntervention(studentId: string, actionType: string, notes: string): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      await delay(400);
      return { 
        success: true, 
        message: `Intervention (${actionType}) recorded successfully for student ${studentId}.` 
      };
    }
    const response = await fetch(`${API_BASE_URL}/faculty/interventions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, actionType, notes }),
    });
    if (!response.ok) throw new Error('Failed to record intervention');
    return response.json();
  },

  // 3. What-If Simulator
  async simulateWhatIf(params: SimulatorParams): Promise<SimulatorResult> {
    if (USE_MOCK) {
      await delay(350);
      return calculateSimulatorOutcome(
        params.attendance,
        params.assignments,
        params.projects,
        params.codingPractice
      );
    }
    const response = await fetch(`${API_BASE_URL}/simulator/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Failed to compute simulated prediction');
    return response.json();
  },

  // 4. Admin Overview & Decision Intelligence
  async getAdminInsights(): Promise<{
    departments: DepartmentInsight[];
    interventions: InterventionMetric[];
    fairness: FairnessAuditMetric[];
  }> {
    if (USE_MOCK) {
      await delay(500);
      return {
        departments: mockDepartmentInsights,
        interventions: mockInterventionMetrics,
        fairness: mockFairnessAudit,
      };
    }
    const response = await fetch(`${API_BASE_URL}/admin/overview`);
    if (!response.ok) throw new Error('Failed to fetch administrator analytics');
    return response.json();
  },

  // 5. Sarthi Mentors List & Booking
  async getMentors(): Promise<SarthiMentor[]> {
    if (USE_MOCK) {
      await delay(400);
      return mockMentors;
    }
    const response = await fetch(`${API_BASE_URL}/sarthi/mentors`);
    if (!response.ok) throw new Error('Failed to fetch Sarthi mentors');
    return response.json();
  },

  async bookMentorSession(booking: MentorBookingRequest): Promise<{ success: boolean; confirmationId: string; message: string }> {
    if (USE_MOCK) {
      await delay(600);
      return {
        success: true,
        confirmationId: `SCA-SRT-${Math.floor(100000 + Math.random() * 900000)}`,
        message: `Mentorship session confirmed with ${booking.mentorId} for ${booking.selectedSlot}. Calendar invite sent.`,
      };
    }
    const response = await fetch(`${API_BASE_URL}/sarthi/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!response.ok) throw new Error('Failed to book mentorship session');
    return response.json();
  },

  // 6. Internship Portal & Skill-level Application
  async getInternships(): Promise<import('../types').Internship[]> {
    if (USE_MOCK) {
      await delay(350);
      const { mockInternships } = await import('./mockData');
      return mockInternships;
    }
    const response = await fetch(`${API_BASE_URL}/internships`);
    if (!response.ok) throw new Error('Failed to fetch internship listings');
    return response.json();
  },

  async applyToInternship(internshipId: string): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      await delay(500);
      return {
        success: true,
        message: 'Application successfully forwarded to campus recruitment coordination team. Verified against continuous academic telemetry.',
      };
    }
    const response = await fetch(`${API_BASE_URL}/internships/${internshipId}/apply`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to apply for internship');
    return response.json();
  },

  // 7. Anti-Cheat Proctored Test System
  async getProctoredQuestions(): Promise<import('../types').ProctoredQuestion[]> {
    if (USE_MOCK) {
      await delay(400);
      const { mockProctoredQuestions } = await import('./mockData');
      return mockProctoredQuestions;
    }
    const response = await fetch(`${API_BASE_URL}/assessment/questions`);
    if (!response.ok) throw new Error('Failed to fetch assessment paper');
    return response.json();
  },

  async submitProctoredTest(payload: any): Promise<import('../types').TestResult> {
    if (USE_MOCK) {
      await delay(600);
      const { academicScore = 15, maxAcademicScore = 20, incidents = [], honeypotFlagsTriggered = 0 } = payload;
      const academicPercentage = Math.round((academicScore / maxAcademicScore) * 100);
      const integrityPenalty = (incidents.length * 8) + (honeypotFlagsTriggered * 35);
      const integrityScore = Math.max(100 - integrityPenalty, 0);

      let verdict: 'Honorable' | 'Audit Recommended' | 'Integrity Review Required' = 'Honorable';
      if (honeypotFlagsTriggered > 0 || integrityScore < 60) {
        verdict = 'Integrity Review Required';
      } else if (integrityScore < 85) {
        verdict = 'Audit Recommended';
      }

      return {
        studentId: 'std-2024-089',
        studentName: 'Aarav Sharma',
        testTitle: 'Continuous Evaluation Assessment 2: Systems, DSA & DBMS',
        academicScore,
        maxAcademicScore,
        academicPercentage,
        honeypotQuestionsPresented: 2,
        honeypotFlagsTriggered,
        integrityScore,
        incidents,
        verdict,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
    const response = await fetch(`${API_BASE_URL}/assessment/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to submit proctored assessment');
    return response.json();
  },

  // 8. AI Academic Advisor & Unbiased Diagnostic Report
  async getUnbiasedDiagnosticReport(): Promise<import('../types').UnbiasedDiagnosticReport> {
    if (USE_MOCK) {
      await delay(450);
      const { mockUnbiasedDiagnosticReport } = await import('./mockData');
      return mockUnbiasedDiagnosticReport;
    }
    const response = await fetch(`${API_BASE_URL}/ai-advisor/diagnostic`);
    if (!response.ok) throw new Error('Failed to generate diagnostic report');
    return response.json();
  },

  async sendAIChatQuery(prompt: string): Promise<string> {
    if (USE_MOCK) {
      await delay(600);
      const p = prompt.toLowerCase();
      if (p.includes('internship') || p.includes('apply') || p.includes('job')) {
        return 'Based on your 92% lab mastery in C++ and 7.5 hrs/week DSA consistency, you have a 94% match for the Systems & Backend Engineering Intern role at Atlassian and an 88% match at Microsoft IDC. I have prioritized these in your Internship Dashboard.';
      }
      if (p.includes('weak') || p.includes('lack') || p.includes('improve') || p.includes('solution')) {
        return 'Data analysis indicates: 1) Your main deficiency is theoretical examination pacing in Operating Systems (-16% vs lab median). 2) Solution: Complete past-year university paper sets under 45-minute timed mock conditions. 3) Attendance in OS is 68% (under the 75% requirement); attend the next 8 lectures consecutively to regain compliance.';
      }
      if (p.includes('strong') || p.includes('strength')) {
        return 'Your top strengths are practical programming execution: 92% lab assignment completion with clean automated test passes, strong problem-solving discipline, and active capstone git commits. This puts you in the top 15% of your department for engineering implementation.';
      }
      return 'I have synthesized an unbiased diagnostic assessment of your continuous academic telemetry across 14 signals. You possess high practical aptitude with an acute theoretical pacing bottleneck. Check your diagnostic matrix for concrete 14-day solutions.';
    }
    const response = await fetch(`${API_BASE_URL}/ai-advisor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Failed to query AI advisor');
    return response.json();
  },

  async askAICounselor(prompt: string): Promise<{ answer: string }> {
    const answer = await this.sendAIChatQuery(prompt);
    return { answer };
  },

  async applyForInternship(internshipId: string, _coverNote?: string): Promise<{ success: boolean; message: string }> {
    return this.applyToInternship(internshipId);
  },

  async generateAIReport(): Promise<import('../types').AIReport> {
    await delay(500);
    return mockCurrentStudent.aiReport;
  },
};

