export type StudentSegment = 
  | 'High performers' 
  | 'Hidden potential' 
  | 'Steady but stuck' 
  | 'At risk' 
  | 'Placement-ready';

export interface ScoreDriver {
  factor: string;
  impact: number; // point change, positive or negative (e.g. +14.5 or -11.2)
  category: 'positive' | 'negative';
  description: string;
  benchmark: string;
  studentValue: string;
}

export interface TimelineDataPoint {
  month: string;
  score: number;
  attendance: number;
  assignments: number;
  codingHours: number;
}

export interface AIReport {
  strengths: string[];
  weaknesses: string[];
  improvementPoints: string[];
  engagementLevel: 'High' | 'Moderate' | 'Critical';
  summary: string;
  generatedAt: string;
}

export interface RoadmapItem {
  id: string;
  week: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  action: string;
  category: string;
}

export interface SarthiMentor {
  id: string;
  name: string;
  degree: string;
  branch: string;
  year: string;
  companyOffer?: string;
  skills: string[];
  matchReason: string;
  matchScore: number; // e.g. 96%
  email: string;
  phone: string;
  availableSlots: string[];
  rating: number;
  totalSessions: number;
  bio: string;
}

export interface StudentProfile {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  successScore: number;
  previousScore: number;
  riskRank: number;
  riskLevel: 'Critical' | 'Moderate' | 'Low';
  segment: StudentSegment;
  flags: string[];
  flagReasons: string[];
  attendancePct: number;
  assignmentsSubmittedPct: number;
  projectsCount: number;
  codingPracticeHrsPerWeek: number;
  midTermAvg: number;
  assignedMentor?: SarthiMentor;
  suggestedAction: string;
  lastActivity: string;
  aiReport: AIReport;
  drivers: ScoreDriver[];
  timeline: TimelineDataPoint[];
  roadmap: RoadmapItem[];
}

export interface SimulatorParams {
  attendance: number;
  assignments: number;
  projects: number;
  codingPractice: number;
}

export interface SimulatorResult {
  baseScore: number;
  predictedScore: number;
  delta: number;
  predictedSegment: StudentSegment;
  predictedRisk: 'Critical' | 'Moderate' | 'Low';
  projectedDrivers: ScoreDriver[];
  recommendation: string;
}

export interface DepartmentInsight {
  department: string;
  totalStudents: number;
  avgSuccessScore: number;
  atRiskCount: number;
  interventionRatePct: number;
  placementReadyCount: number;
}

export interface InterventionMetric {
  interventionType: string;
  cohortSize: number;
  beforeScore: number;
  afterScore: number;
  recoveryRatePct: number;
  avgDaysToImprovement: number;
}

export interface FairnessAuditMetric {
  demographicGroup: string;
  representationPct: number;
  parityScorePct: number;
  falsePositiveRatePct: number;
  auditStatus: 'Compliant' | 'Audit Flag';
  explanation: string;
}

export interface MentorBookingRequest {
  mentorId: string;
  studentName: string;
  studentEmail: string;
  selectedSlot: string;
  topic: string;
  notes: string;
}

// ----------------- Authentication -----------------
export type UserRole = 'student' | 'faculty' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNo?: string;
  department: string;
  avatarInitials: string;
}

// ----------------- Internship System -----------------
export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  domain: string;
  stipend: string;
  duration: string;
  requiredSkills: string[];
  skillMatchScore: number; // e.g. 94%
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  matchRationale: string;
  deadline: string;
  openings: number;
  status: 'available' | 'applied' | 'interview_scheduled';
}

// ----------------- Anti-Cheat Proctored Test System -----------------
export interface ProctoredQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  isHoneypot: boolean; // Out-of-syllabus trap to detect web/AI bot lookups
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number; // 0 if honeypot
  trapExplanation?: string;
}

export interface ProctorIncident {
  id: string;
  timestamp: string;
  type: 'video_anomaly' | 'audio_anomaly' | 'honeypot_trap' | 'tab_blur' | 'copy_paste_attempt';
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface TestResult {
  studentId: string;
  studentName: string;
  testTitle: string;
  academicScore: number;
  maxAcademicScore: number;
  academicPercentage: number;
  honeypotQuestionsPresented: number;
  honeypotFlagsTriggered: number;
  integrityScore: number; // 0-100%
  incidents: ProctorIncident[];
  verdict: 'Honorable' | 'Audit Recommended' | 'Integrity Review Required' | 'DISQUALIFIED / DEBARRED';
  submittedAt: string;
}

// ----------------- AI Advisory Bot & Unbiased Diagnostic -----------------
export interface StrengthItem {
  area: string;
  observedMetric: string;
  impactScore: number;
  description: string;
}

export interface WeaknessItem {
  area: string;
  observedMetric: string;
  dragImpact: number;
  description: string;
}

export interface ImprovementSolution {
  deficiency: string;
  rootCause: string;
  actionableSolution: string;
  targetTimeline: string;
  recommendedResource: string;
  matchedInternshipSkills: string[];
}

export interface UnbiasedDiagnosticReport {
  studentId: string;
  studentName: string;
  assessmentCycle: string;
  overallAcademicStanding: string;
  percentileCohort: number;
  unbiasedVerdict: string;
  strengths: StrengthItem[];
  weaknesses: WeaknessItem[];
  improvementRoadmap: ImprovementSolution[];
  suggestedInternshipPaths: string[];
  generatedAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  diagnosticReport?: UnbiasedDiagnosticReport;
}

