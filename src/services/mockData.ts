import { 
  StudentProfile, 
  SarthiMentor, 
  DepartmentInsight, 
  InterventionMetric, 
  FairnessAuditMetric,
  SimulatorResult,
  Internship,
  ProctoredQuestion,
  UnbiasedDiagnosticReport
} from '../types';

export const mockMentors: SarthiMentor[] = [
  {
    id: 'mentor-1',
    name: 'Priya Mukherjee',
    degree: 'B.Tech Computer Science & Eng.',
    branch: 'CSE (Systems & Cloud)',
    year: 'Final Year (8th Sem)',
    companyOffer: 'Software Engineer @ Atlassian (₹28 LPA)',
    skills: ['DSA', 'Distributed Systems', 'C++', 'System Design'],
    matchReason: '98% match: Aligns with your current Data Structures coursework and systems engineering career preference.',
    matchScore: 98,
    email: 'priya.mukherjee@campus.edu.in',
    phone: '+91 98234 51092',
    availableSlots: ['Tomorrow, 4:00 PM - 4:45 PM', 'Thursday, 5:30 PM - 6:15 PM', 'Saturday, 11:00 AM - 11:45 AM'],
    rating: 4.9,
    totalSessions: 38,
    bio: 'Former ICPC regionalist. Passionate about helping 2nd and 3rd-year juniors overcome data structures roadblocks and master interview problem-solving without burnout.',
  },
  {
    id: 'mentor-2',
    name: 'Rohan Deshmukh',
    degree: 'B.Tech Information Technology',
    branch: 'IT (Full-Stack & DevOps)',
    year: 'Final Year (8th Sem)',
    companyOffer: 'Cloud Engineer @ Microsoft (₹42 LPA)',
    skills: ['React', 'Node.js', 'Kubernetes', 'FastAPI'],
    matchReason: '94% match: Specialized in full-stack architecture; ideal for reviewing your ongoing semester capstone repository.',
    matchScore: 94,
    email: 'rohan.deshmukh@campus.edu.in',
    phone: '+91 97112 34908',
    availableSlots: ['Wednesday, 3:00 PM - 3:45 PM', 'Friday, 4:00 PM - 4:45 PM', 'Sunday, 10:00 AM - 10:45 AM'],
    rating: 4.8,
    totalSessions: 45,
    bio: 'Led the Google Developer Student Club campus chapter. I focus on project code reviews, git workflows, and bridging theory into production-ready software.',
  },
  {
    id: 'mentor-3',
    name: 'Ananya Srivastav',
    degree: 'B.Tech Electronics & Communication',
    branch: 'ECE (Embedded ML & IoT)',
    year: 'Final Year (8th Sem)',
    companyOffer: 'Firmware Engineer @ Qualcomm (₹22 LPA)',
    skills: ['Python', 'Embedded C', 'Edge AI', 'MATLAB'],
    matchReason: '89% match: Strong mathematical fundamentals; recommended for strengthening probability and signal processing core modules.',
    matchScore: 89,
    email: 'ananya.srivastav@campus.edu.in',
    phone: '+91 98901 77234',
    availableSlots: ['Tuesday, 5:00 PM - 5:45 PM', 'Thursday, 6:00 PM - 6:45 PM'],
    rating: 4.95,
    totalSessions: 29,
    bio: 'Published systems researcher in edge computing. Happy to advise students balancing hardware labs with algorithmic problem-solving.',
  },
];

export const mockCurrentStudent: StudentProfile = {
  id: 'std-2024-089',
  rollNo: '21BCSE104',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu.in',
  phone: '+91 98450 11982',
  department: 'Computer Science & Engineering',
  semester: 5,
  successScore: 78,
  previousScore: 71,
  riskRank: 14,
  riskLevel: 'Moderate',
  segment: 'Hidden potential',
  flags: ['LMS Activity Stagnant', 'Theory Mid-term Deviation'],
  flagReasons: [
    'Theory exam scores deviate by -16% compared to lab assessment benchmarks.',
    'Missed 3 consecutive video module checkpoints in Operating Systems.',
  ],
  attendancePct: 79,
  assignmentsSubmittedPct: 92,
  projectsCount: 3,
  codingPracticeHrsPerWeek: 7.5,
  midTermAvg: 68.4,
  assignedMentor: mockMentors[0],
  suggestedAction: 'Schedule Sarthi mentor code clinic to reinforce Operating Systems concepts and bridge theory assessment gap.',
  lastActivity: 'Submitted Lab 6 Assignment (2 hours ago)',
  aiReport: {
    strengths: [
      'High practical competency: 92% laboratory assignment completion rate with strong automated test passes.',
      'Active peer collaboration in campus code summits and open-source project sprints.',
      'Solid programming discipline: logs 7.5+ weekly coding hours consistently on LeetCode & GitHub.',
    ],
    weaknesses: [
      'Mid-term theoretical assessment underperformance (-8.4 pts impact on composite score).',
      'Recent dip in morning lecture attendance (Operating Systems fell below 75% threshold to 68%).',
      'Low pre-lecture reading participation recorded on campus LMS portal.',
    ],
    improvementPoints: [
      'Attend the next 4 morning OS lectures to recover attendance above the institutional 75% mandate.',
      'Complete the interactive OS memory management simulation module before the Friday tutorial.',
      'Book a 30-minute peer mentoring session with Priya Mukherjee for mid-term paper review.',
    ],
    engagementLevel: 'Moderate',
    summary: 'Aarav exhibits strong technical execution in lab environments but struggles with traditional theoretical exam pacing. The model classifies him as "Hidden Potential" with an 84% recovery probability upon focused theory intervention.',
    generatedAt: 'Today at 09:30 AM IST (Automated Daily Cycle)',
  },
  drivers: [
    {
      factor: 'Lab Assignment Mastery',
      impact: 14.2,
      category: 'positive',
      description: 'Submitted 11 of 12 lab assignments ahead of deadline with 92% average correctness.',
      benchmark: 'Dept Avg: 78%',
      studentValue: '92% (Top 15%)',
    },
    {
      factor: 'Coding Practice Consistency',
      impact: 9.8,
      category: 'positive',
      description: 'Consistent weekly programming activity (7.5 hrs/week) demonstrates strong problem-solving initiative.',
      benchmark: 'Dept Avg: 4.2 hrs',
      studentValue: '7.5 hrs/week',
    },
    {
      factor: 'Capstone Repository Activity',
      impact: 6.4,
      category: 'positive',
      description: 'Active branch commits and pull request reviews in the Semester 5 Web Systems repository.',
      benchmark: 'Target: 2 PRs/mo',
      studentValue: '5 PRs merged',
    },
    {
      factor: 'Operating Systems Attendance Dip',
      impact: -11.5,
      category: 'negative',
      description: 'Attendance dropped to 68% over the past 3 weeks, risking the 75% semester examination eligibility bar.',
      benchmark: 'Mandatory: 75%',
      studentValue: '68% (At Risk)',
    },
    {
      factor: 'Mid-term Theory Exam Variance',
      impact: -8.4,
      category: 'negative',
      description: 'Mid-term 1 theory score was 18% lower than predicted from practical assignment performance.',
      benchmark: 'Dept Avg: 74%',
      studentValue: '61.5%',
    },
    {
      factor: 'LMS Reading Checkpoint Latency',
      impact: -4.1,
      category: 'negative',
      description: 'Delays in completing online chapter quizzes prior to scheduled classroom discussions.',
      benchmark: 'On-time: 85%',
      studentValue: '58%',
    },
  ],
  timeline: [
    { month: 'Jun', score: 65, attendance: 72, assignments: 78, codingHours: 3.5 },
    { month: 'Jul', score: 68, attendance: 75, assignments: 84, codingHours: 4.2 },
    { month: 'Aug', score: 72, attendance: 81, assignments: 89, codingHours: 6.0 },
    { month: 'Sep', score: 71, attendance: 78, assignments: 88, codingHours: 6.8 },
    { month: 'Oct', score: 78, attendance: 79, assignments: 92, codingHours: 7.5 },
    { month: 'Nov (Est)', score: 83, attendance: 84, assignments: 95, codingHours: 8.5 },
  ],
  roadmap: [
    {
      id: 'rm-1',
      week: 'Week 1',
      title: 'Operating Systems Process Scheduling Diagnostic',
      status: 'completed',
      action: 'Reviewed scheduling algorithms lab with Teaching Assistant; submitted correction memo.',
      category: 'Academic Core',
    },
    {
      id: 'rm-2',
      week: 'Week 2',
      title: 'Recover Morning Lecture Attendance Threshold',
      status: 'in-progress',
      action: 'Attend all 4 lectures this week to bring cumulative OS attendance from 68% to 73.5%.',
      category: 'Attendance',
    },
    {
      id: 'rm-3',
      week: 'Week 3',
      title: 'Sarthi Mentor Session with Priya Mukherjee',
      status: 'upcoming',
      action: '1-on-1 walkthrough of mid-term paper questions: Deadlocks and Virtual Memory paging.',
      category: 'Mentorship',
    },
    {
      id: 'rm-4',
      week: 'Week 4',
      title: 'DBMS Transaction Isolation Mock Assessment',
      status: 'upcoming',
      action: 'Take timed 45-minute practice test to solidify theoretical exam pacing before Mid-term 2.',
      category: 'Assessment',
    },
    {
      id: 'rm-5',
      week: 'Week 5',
      title: 'Mini-Project Sprint: Distributed Key-Value Store',
      status: 'upcoming',
      action: 'Implement raft consensus prototype for capstone milestone presentation.',
      category: 'Project',
    },
    {
      id: 'rm-6',
      week: 'Week 6',
      title: 'Pre-Final Comprehensive Readiness Evaluation',
      status: 'upcoming',
      action: 'Model re-evaluates composite Success Score with updated mid-term 2 and attendance telemetry.',
      category: 'Milestone',
    },
  ],
};

export const mockFacultyStudents: StudentProfile[] = [
  {
    ...mockCurrentStudent,
    id: 'std-2024-001',
    rollNo: '21BCSE014',
    name: 'Tanvi Saxena',
    successScore: 92,
    previousScore: 88,
    riskRank: 78,
    riskLevel: 'Low',
    segment: 'High performers',
    flags: [],
    flagReasons: ['No active risk indicators. Consistently excelling across practical and theoretical metrics.'],
    attendancePct: 96,
    assignmentsSubmittedPct: 98,
    projectsCount: 5,
    codingPracticeHrsPerWeek: 11.0,
    midTermAvg: 91.5,
    suggestedAction: 'Nominate for Google Summer of Code research stipend and departmental peer tutor role.',
    lastActivity: 'Submitted Research Summary (3 hours ago)',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-002',
    rollNo: '21BCSE088',
    name: 'Kabir Verma',
    successScore: 42,
    previousScore: 54,
    riskRank: 1,
    riskLevel: 'Critical',
    segment: 'At risk',
    flags: ['Attendance Below 60%', 'Consecutive Unsubmitted Labs', 'Sudden Engagement Drop'],
    flagReasons: [
      'Attendance at 54% over the last 30 days triggers statutory debarment notice.',
      'Failed to submit 3 consecutive Data Structures assignments.',
      'LMS log shows 0 platform logins in the preceding 9 days.',
    ],
    attendancePct: 54,
    assignmentsSubmittedPct: 48,
    projectsCount: 1,
    codingPracticeHrsPerWeek: 1.0,
    midTermAvg: 41.0,
    suggestedAction: 'Immediate Advisor Outreach: Issue counseling summons and schedule parent-faculty consultation.',
    lastActivity: 'Last login 9 days ago',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-003',
    rollNo: '21BCSE042',
    name: 'Meera Iyer',
    successScore: 61,
    previousScore: 60,
    riskRank: 8,
    riskLevel: 'Moderate',
    segment: 'Steady but stuck',
    flags: ['Plateauing Scores', 'Low Practical Coding Volume'],
    flagReasons: [
      'Consistent 60-62% score across 4 semesters; showing zero upward trajectory.',
      'Only 1.5 coding hours per week; lacks portfolio projects needed for placement benchmarks.',
    ],
    attendancePct: 88,
    assignmentsSubmittedPct: 85,
    projectsCount: 1,
    codingPracticeHrsPerWeek: 1.5,
    midTermAvg: 64.0,
    suggestedAction: 'Pair with Rohan Deshmukh for hands-on project mentoring to boost practical portfolio before 6th semester.',
    lastActivity: 'Submitted Quiz 4 (1 day ago)',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-089',
    rollNo: '21BCSE104',
    name: 'Aarav Sharma',
    successScore: 78,
    previousScore: 71,
    riskRank: 14,
    riskLevel: 'Moderate',
    segment: 'Hidden potential',
    flags: ['LMS Activity Stagnant', 'Theory Mid-term Deviation'],
    flagReasons: [
      'Exceptional lab scores (92%) decoupled from mid-term theory results (61%).',
      'Operating Systems attendance dip (68%) requires quick corrective remediation.',
    ],
    attendancePct: 79,
    assignmentsSubmittedPct: 92,
    projectsCount: 3,
    codingPracticeHrsPerWeek: 7.5,
    midTermAvg: 68.4,
    suggestedAction: 'Schedule Sarthi mentor code clinic to reinforce Operating Systems concepts and bridge theory assessment gap.',
    lastActivity: 'Submitted Lab 6 Assignment (2 hours ago)',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-005',
    rollNo: '21BCSE003',
    name: 'Devanshu Patel',
    successScore: 88,
    previousScore: 84,
    riskRank: 62,
    riskLevel: 'Low',
    segment: 'Placement-ready',
    flags: [],
    flagReasons: ['All eligibility criteria satisfied: 4 completed projects, 85%+ attendance, 8+ DSA hours/week.'],
    attendancePct: 91,
    assignmentsSubmittedPct: 95,
    projectsCount: 4,
    codingPracticeHrsPerWeek: 9.0,
    midTermAvg: 86.5,
    suggestedAction: 'Fast-track to Tier-1 campus placement drives and mock technical interview rounds with alumni.',
    lastActivity: 'Pushed code to GitHub (4 hours ago)',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-006',
    rollNo: '21BCSE112',
    name: 'Rhea Nambiar',
    successScore: 47,
    previousScore: 59,
    riskRank: 3,
    riskLevel: 'Critical',
    segment: 'At risk',
    flags: ['Medical Leave Backlog', 'Missed Mid-Term 1'],
    flagReasons: [
      'Missed 2 mid-term modules following documented medical absence; requires re-examination schedule.',
      'Assignment backlog accumulating in Computer Networks and Microprocessors.',
    ],
    attendancePct: 62,
    assignmentsSubmittedPct: 52,
    projectsCount: 1,
    codingPracticeHrsPerWeek: 2.0,
    midTermAvg: 45.0,
    suggestedAction: 'Approve medical waiver and assign Department Teaching Assistant for re-test preparation.',
    lastActivity: 'LMS portal access (Yesterday)',
  },
  {
    ...mockCurrentStudent,
    id: 'std-2024-007',
    rollNo: '21BCSE067',
    name: 'Vikramaditya Roy',
    successScore: 74,
    previousScore: 69,
    riskRank: 19,
    riskLevel: 'Moderate',
    segment: 'Hidden potential',
    flags: ['Low Class Participation'],
    flagReasons: ['Strong algorithmic coding scores but reluctant in oral seminar presentations and vivas.'],
    attendancePct: 82,
    assignmentsSubmittedPct: 88,
    projectsCount: 3,
    codingPracticeHrsPerWeek: 8.0,
    midTermAvg: 73.0,
    suggestedAction: 'Encourage participation in technical symposium lightning talks to build viva confidence.',
    lastActivity: 'Submitted Assignment (6 hours ago)',
  },
];

export const mockDepartmentInsights: DepartmentInsight[] = [
  {
    department: 'Computer Science & Engineering',
    totalStudents: 320,
    avgSuccessScore: 79.4,
    atRiskCount: 18,
    interventionRatePct: 88.5,
    placementReadyCount: 142,
  },
  {
    department: 'Information Technology',
    totalStudents: 240,
    avgSuccessScore: 76.8,
    atRiskCount: 19,
    interventionRatePct: 84.0,
    placementReadyCount: 96,
  },
  {
    department: 'Electronics & Communication',
    totalStudents: 210,
    avgSuccessScore: 72.1,
    atRiskCount: 26,
    interventionRatePct: 78.2,
    placementReadyCount: 68,
  },
  {
    department: 'Mechanical Engineering',
    totalStudents: 180,
    avgSuccessScore: 69.5,
    atRiskCount: 31,
    interventionRatePct: 71.0,
    placementReadyCount: 45,
  },
];

export const mockInterventionMetrics: InterventionMetric[] = [
  {
    interventionType: 'Sarthi Senior Peer Mentorship',
    cohortSize: 64,
    beforeScore: 51.2,
    afterScore: 73.8,
    recoveryRatePct: 87.5,
    avgDaysToImprovement: 24,
  },
  {
    interventionType: 'Faculty 1-on-1 Academic Advising',
    cohortSize: 42,
    beforeScore: 46.0,
    afterScore: 66.5,
    recoveryRatePct: 78.6,
    avgDaysToImprovement: 18,
  },
  {
    interventionType: 'Remedial Lab Hands-on Clinic',
    cohortSize: 55,
    beforeScore: 53.4,
    afterScore: 71.0,
    recoveryRatePct: 81.8,
    avgDaysToImprovement: 21,
  },
  {
    interventionType: 'Automated Attendance Warning SMS/Notice',
    cohortSize: 88,
    beforeScore: 58.0,
    afterScore: 69.2,
    recoveryRatePct: 69.3,
    avgDaysToImprovement: 12,
  },
];

export const mockFairnessAudit: FairnessAuditMetric[] = [
  {
    demographicGroup: 'Gender Parity (Female / Male)',
    representationPct: 38.4,
    parityScorePct: 99.1,
    falsePositiveRatePct: 2.1,
    auditStatus: 'Compliant',
    explanation: 'Model false positive rate on risk flags differs by < 1.2% across gender categories. Fully within national ethical AI thresholds.',
  },
  {
    demographicGroup: 'First-Generation College Learners',
    representationPct: 29.0,
    parityScorePct: 97.4,
    falsePositiveRatePct: 3.4,
    auditStatus: 'Compliant',
    explanation: 'Feature weights explicitly mask parental income or geographic domicile; purely performance and engagement driven.',
  },
  {
    demographicGroup: 'Rural/Regional Medium Schooling Background',
    representationPct: 22.5,
    parityScorePct: 95.8,
    falsePositiveRatePct: 4.2,
    auditStatus: 'Compliant',
    explanation: 'English language fluency bias mitigated by weight normalization on coding syntax and practical lab submissions.',
  },
  {
    demographicGroup: 'Lateral Entry (Diploma to 2nd Year)',
    representationPct: 12.0,
    parityScorePct: 91.2,
    falsePositiveRatePct: 6.8,
    auditStatus: 'Audit Flag',
    explanation: 'Lateral entry students exhibit steeper 3rd-semester calibration curves. Re-calibrating semester baseline weights recommended.',
  },
];

export function calculateSimulatorOutcome(
  attendance: number,
  assignments: number,
  projects: number,
  codingPractice: number
): SimulatorResult {
  // Base model formula simulating real regression coefficients:
  // Attendance (weight: 0.35), Assignments (weight: 0.30), Coding Practice (weight: 0.20), Projects (weight: 0.15)
  const normAttendance = Math.min(Math.max(attendance, 0), 100);
  const normAssignments = Math.min(Math.max(assignments, 0), 100);
  const normCoding = Math.min(Math.max((codingPractice / 15) * 100, 0), 100); // normalized against 15 hrs max
  const normProjects = Math.min(Math.max((projects / 6) * 100, 0), 100); // normalized against 6 projects max

  const weightedScore = Math.round(
    normAttendance * 0.35 +
    normAssignments * 0.30 +
    normCoding * 0.20 +
    normProjects * 0.15
  );

  const baseScore = 78;
  const delta = weightedScore - baseScore;

  let predictedSegment: StudentProfile['segment'] = 'Hidden potential';
  let predictedRisk: 'Critical' | 'Moderate' | 'Low' = 'Moderate';

  if (weightedScore >= 90) {
    predictedSegment = 'High performers';
    predictedRisk = 'Low';
  } else if (weightedScore >= 82) {
    predictedSegment = 'Placement-ready';
    predictedRisk = 'Low';
  } else if (weightedScore >= 70) {
    predictedSegment = 'Hidden potential';
    predictedRisk = 'Moderate';
  } else if (weightedScore >= 55) {
    predictedSegment = 'Steady but stuck';
    predictedRisk = 'Moderate';
  } else {
    predictedSegment = 'At risk';
    predictedRisk = 'Critical';
  }

  const projectedDrivers = [
    {
      factor: 'Simulated Attendance Contribution',
      impact: Number(((normAttendance - 75) * 0.35).toFixed(1)),
      category: normAttendance >= 75 ? ('positive' as const) : ('negative' as const),
      description: `Attendance set to ${attendance}%. ${attendance < 75 ? 'Debarment threshold violation risk.' : 'Comfortably exceeds 75% institutional requirement.'}`,
      benchmark: 'Mandatory: 75%',
      studentValue: `${attendance}%`,
    },
    {
      factor: 'Assignment Completion Weight',
      impact: Number(((normAssignments - 80) * 0.30).toFixed(1)),
      category: normAssignments >= 80 ? ('positive' as const) : ('negative' as const),
      description: `Targeting ${assignments}% assignment submission consistency.`,
      benchmark: 'Dept Avg: 80%',
      studentValue: `${assignments}%`,
    },
    {
      factor: 'Hands-on Coding Hours Impact',
      impact: Number(((normCoding - 50) * 0.20).toFixed(1)),
      category: normCoding >= 50 ? ('positive' as const) : ('negative' as const),
      description: `${codingPractice} hrs/week of active coding boosts placement technical round readiness.`,
      benchmark: 'Target: 8 hrs/week',
      studentValue: `${codingPractice} hrs/wk`,
    },
    {
      factor: 'Capstone Project Multiplier',
      impact: Number(((normProjects - 40) * 0.15).toFixed(1)),
      category: normProjects >= 40 ? ('positive' as const) : ('negative' as const),
      description: `${projects} completed projects provide strong resume signals for campus recruitment.`,
      benchmark: 'Recommended: 3+ projects',
      studentValue: `${projects} projects`,
    },
  ];

  let recommendation = '';
  if (delta > 8) {
    recommendation = `Outstanding leap! Increasing these inputs yields a +${delta} points boost, elevating you to the "${predictedSegment}" cohort and maximizing tier-1 placement prospects.`;
  } else if (delta >= 0) {
    recommendation = `Positive trajectory (+${delta} pts). Sustaining this behavioral cadence secures academic standing and stabilizes exam performance.`;
  } else {
    recommendation = `Caution: This scenario projects a ${delta} points regression down to "${predictedSegment}" status. Prioritize recovering lecture attendance first.`;
  }

  return {
    baseScore,
    predictedScore: weightedScore,
    delta,
    predictedSegment,
    predictedRisk,
    projectedDrivers,
    recommendation,
  };
}

// =========================================================================
// INTERNSHIP SYSTEM MOCK DATA
// =========================================================================
export const mockInternships: Internship[] = [
  {
    id: 'int-001',
    title: 'Systems & Backend Engineering Intern',
    company: 'Atlassian India',
    location: 'Bengaluru / Hybrid',
    domain: 'Software Engineering',
    stipend: '₹85,000 / month',
    duration: '6 Months (Jan - Jun)',
    requiredSkills: ['C++', 'Operating Systems', 'Data Structures', 'Git'],
    skillMatchScore: 94,
    difficultyLevel: 'Intermediate',
    matchRationale: '94% Match: Perfectly matches your 92% lab assignment mastery and 7.5 hrs/week DSA consistency. Strengthening OS theory makes you top 5% candidate.',
    deadline: 'Oct 30, 2026',
    openings: 8,
    status: 'available',
  },
  {
    id: 'int-002',
    title: 'Cloud Infrastructure & DevOps Intern',
    company: 'Microsoft India Development Center',
    location: 'Hyderabad / On-site',
    domain: 'Cloud & Distributed Systems',
    stipend: '₹1,25,000 / month',
    duration: '6 Months (Summer)',
    requiredSkills: ['Linux', 'Docker', 'FastAPI', 'Distributed Systems'],
    skillMatchScore: 88,
    difficultyLevel: 'Advanced',
    matchRationale: '88% Match: Complements your Semester 5 capstone project repository. Sarthi mentor Rohan Deshmukh can provide pre-referral code review.',
    deadline: 'Nov 15, 2026',
    openings: 5,
    status: 'available',
  },
  {
    id: 'int-003',
    title: 'Frontend Platform & Web Performance Intern',
    company: 'Swiggy Tech',
    location: 'Bengaluru / Remote',
    domain: 'Full-Stack Web',
    stipend: '₹60,000 / month',
    duration: '3 Months (Winter Break)',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Web Vitals'],
    skillMatchScore: 82,
    difficultyLevel: 'Beginner',
    matchRationale: '82% Match: Strong fit based on your modern frontend project commits and clean component design skills.',
    deadline: 'Oct 25, 2026',
    openings: 12,
    status: 'applied',
  },
  {
    id: 'int-004',
    title: 'Quantitative Systems & Algo Trading Intern',
    company: 'Zerodha Technology',
    location: 'Bengaluru / In-Office',
    domain: 'High Performance Systems',
    stipend: '₹90,000 / month',
    duration: '6 Months',
    requiredSkills: ['Algorithms', 'Low Latency Networking', 'C++', 'Python'],
    skillMatchScore: 78,
    difficultyLevel: 'Advanced',
    matchRationale: '78% Match: Demands high theoretical precision in OS concurrency and socket programming; recommended after clearing your Week 4 roadmap.',
    deadline: 'Nov 05, 2026',
    openings: 3,
    status: 'available',
  },
  {
    id: 'int-005',
    title: 'Embedded AI & Edge Firmware Intern',
    company: 'Qualcomm India',
    location: 'Noida / On-site',
    domain: 'Edge Computing & Hardware',
    stipend: '₹75,000 / month',
    duration: '6 Months',
    requiredSkills: ['Embedded C', 'Microprocessors', 'Python', 'RTOS'],
    skillMatchScore: 68,
    difficultyLevel: 'Intermediate',
    matchRationale: '68% Match: Higher emphasis on hardware-level memory management; requires bridging your Operating Systems and Microprocessor coursework.',
    deadline: 'Dec 01, 2026',
    openings: 6,
    status: 'available',
  },
];

// =========================================================================
// ANTI-CHEAT PROCTORED TEST SYSTEM (WITH HONEYPOT TRAP QUESTIONS)
// =========================================================================
export const mockProctoredQuestions: ProctoredQuestion[] = [
  {
    id: 'q-101',
    questionText: 'In an Operating System with preemptive Priority Scheduling, which of the following scenarios triggers priority inversion and how is it definitively resolved?',
    options: [
      'A lower priority task locks a shared resource needed by a higher priority task; resolved via Priority Inheritance Protocol.',
      'A higher priority task is preempted by a timer interrupt; resolved via round-robin quantum enlargement.',
      'Multiple threads access shared variables simultaneously; resolved strictly via software spinlocks without kernel traps.',
      'Virtual memory page faults force the scheduler to sleep; resolved by swapping process memory to secondary disk.',
    ],
    correctAnswer: 0,
    isHoneypot: false,
    category: 'Operating Systems (Core Syllabus)',
    difficulty: 'Medium',
    marks: 5,
  },
  {
    id: 'q-102-honeypot',
    questionText: '[INTEGRITY AUDIT CANARY] Under the fictitious Brunner-Gellman 2026 Concurrency Standard, which pseudo-primitive regulates quantum cache coherency on non-existent dual-core optical CPUs?',
    options: [
      'The Brunner-Gellman Optical Barrier Phase-Lock mechanism.',
      'Standard Peterson Algorithm with POSIX pthread mutexes.',
      'Dijkstra semaphore with atomic test-and-set assembly opcode.',
      'Direct memory bus arbitrated via standard PCI-Express clocking.',
    ],
    correctAnswer: 0,
    isHoneypot: true, // HONEYPOT: Trap to catch external web search / LLM querying!
    category: 'Integrity Canary (Out-of-Syllabus Web/Bot Detection Trap)',
    difficulty: 'Hard',
    marks: 0, // Marks NEVER count towards final grade!
    trapExplanation: 'This is an engineered canary question containing an artificial terminology construct. Web searches or LLM queries for this string flag automated external lookup behavior.',
  },
  {
    id: 'q-103',
    questionText: 'What is the maximum number of rotations required to restore the Red-Black Tree invariant after an insertion operation?',
    options: [
      'At most 2 rotations',
      'At most 1 rotation',
      'At most O(log N) rotations',
      'At most 3 rotations',
    ],
    correctAnswer: 0,
    isHoneypot: false,
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    marks: 5,
  },
  {
    id: 'q-104',
    questionText: 'Consider a relational schema R(A, B, C, D) with functional dependencies {A -> B, B -> C, C -> D}. In which highest normal form does this schema reside without decomposition?',
    options: [
      '1NF only (Transitive dependency exists from candidate key A to D)',
      '2NF and 3NF',
      'Boyce-Codd Normal Form (BCNF)',
      '4NF (Multi-valued dependency absent)',
    ],
    correctAnswer: 0,
    isHoneypot: false,
    category: 'Database Management Systems',
    difficulty: 'Hard',
    marks: 5,
  },
  {
    id: 'q-105-honeypot',
    questionText: '[INTEGRITY AUDIT CANARY] Which imaginary opcode defines the speculative hyper-paging bypass protocol in the non-standardized RISC-X IX99 instruction set architecture?',
    options: [
      'HYPER_PAGE_BYPASS_IX99 (Synthesized Canary Token)',
      'Standard TLB_FLUSH_ALL kernel routine',
      'Memory Management Unit (MMU) hardware address translation',
      'Standard software interrupt vector table index 0x80',
    ],
    correctAnswer: 0,
    isHoneypot: true, // HONEYPOT: Trap to catch external web search / LLM querying!
    category: 'Integrity Canary (Out-of-Syllabus Web/Bot Detection Trap)',
    difficulty: 'Hard',
    marks: 0, // Zero grade impact!
    trapExplanation: 'Engineered search-engine poison token. An external search or automated bot prompt input identifies unproctored web lookup attempts.',
  },
  {
    id: 'q-106',
    questionText: 'Given the recurrence relation T(N) = 2T(N/2) + N*log(N), what is the tight asymptotic upper bound according to the Master Theorem (Case 2 generalized)?',
    options: [
      'Θ(N * log²(N))',
      'Θ(N * log(N))',
      'Θ(N²)',
      'Θ(N * sqrt(N))',
    ],
    correctAnswer: 0,
    isHoneypot: false,
    category: 'Analysis of Algorithms',
    difficulty: 'Medium',
    marks: 5,
  },
];

// =========================================================================
// UNBIASED AI DIAGNOSTIC REPORT & ADVISORY SYSTEM
// =========================================================================
export const mockUnbiasedDiagnosticReport: UnbiasedDiagnosticReport = {
  studentId: 'std-2024-089',
  studentName: 'Aarav Sharma',
  assessmentCycle: 'Semester 5 Continuous Evaluation (Mid-Term Cycle 2)',
  overallAcademicStanding: 'High Practical Aptitude with Acute Theoretical Pacing Bottleneck',
  percentileCohort: 78.4,
  unbiasedVerdict: 'The model evaluated 14 objective telemetry parameters with demographic masking enabled. The analysis confirms zero demographic or attendance-duration bias: Aarav possesses top-decile engineering implementation competence, but his theoretical examination score variance (-16% vs lab median) constitutes a high-priority risk factor.',
  strengths: [
    {
      area: 'Laboratory & Automated Test Execution',
      observedMetric: '92% Submission Rate (11/12 Labs Verified)',
      impactScore: 14.2,
      description: 'Excels at translating specification documents into functional C++ and Python code with 0 syntax regressions on automated lab test runners.',
    },
    {
      area: 'Continuous Algorithmic Practice',
      observedMetric: '7.5 Hours/Week Logged (Top 15% in Department)',
      impactScore: 9.8,
      description: 'Demonstrates strong consistency on competitive programming platforms and version control commits across semester projects.',
    },
    {
      area: 'Collaborative Project Delivery',
      observedMetric: '3 Full-Stack Capstone Repositories Deployed',
      impactScore: 6.4,
      description: 'Strong architectural understanding of modular codebases, pull requests, and git-flow team conventions.',
    },
  ],
  weaknesses: [
    {
      area: 'Theoretical Examination Pacing & Written Proofs',
      observedMetric: '61.5% in Mid-term 1 (Dept Avg: 74.0%)',
      dragImpact: -8.4,
      description: 'Struggles with time-pressured mathematical proofs (e.g. Master Theorem derivations, deadlock state-space graphs) despite implementing them correctly in code.',
    },
    {
      area: 'Morning Lecture Attendance Regularity',
      observedMetric: '68% Attendance in Operating Systems (Threshold: 75%)',
      dragImpact: -11.5,
      description: 'Attendance dip over the preceding 3 weeks jeopardizes examination hall admit card statutory clearance.',
    },
    {
      area: 'LMS Pre-Lecture Reading Checkpoints',
      observedMetric: '58% On-Time Quiz Completion (Target: 85%)',
      dragImpact: -4.1,
      description: 'Skips asynchronous pre-reading quizzes, leading to lower contextual retention during oral seminar discussions and professor pop quizzes.',
    },
  ],
  improvementRoadmap: [
    {
      deficiency: 'Operating Systems Attendance Debarment Risk (<75%)',
      rootCause: 'Consecutive missed morning 8:30 AM lectures over the past 3 weeks.',
      actionableSolution: 'Commit to 100% attendance in the next 8 scheduled OS lectures (Tuesdays & Thursdays) to raise cumulative ratio to 74.2% within 14 calendar days.',
      targetTimeline: 'Next 14 Days (Immediate Priority)',
      recommendedResource: 'Class lecture notes and audio recap archives on campus LMS portal.',
      matchedInternshipSkills: ['Operating Systems Concurrency', 'Linux Kernel Basics'],
    },
    {
      deficiency: 'Mid-term Written Assessment Score Gap (-16% vs Lab)',
      rootCause: 'Lack of timed written mock test practice under exam pressure.',
      actionableSolution: 'Complete two timed 45-minute past-year university paper sets focusing specifically on Memory Paging, Deadlocks, and B-Tree indexing.',
      targetTimeline: 'By Week 3 (Oct 28, 2026)',
      recommendedResource: 'Sarthi code clinic session with Priya Mukherjee (Atlassian offer holder).',
      matchedInternshipSkills: ['Systems Design', 'Algorithms', 'Database Normalization'],
    },
    {
      deficiency: 'Low Asynchronous LMS Pre-Quiz Engagement (58%)',
      rootCause: 'Submitting quizzes only after classroom lecture delivery.',
      actionableSolution: 'Set calendar reminder 18 hours prior to lecture to complete 5-question pre-reading formative quiz.',
      targetTimeline: 'Ongoing Weekly Habit',
      recommendedResource: 'LMS mobile notifications enabled.',
      matchedInternshipSkills: ['Technical Documentation', 'Continuous Learning'],
    },
  ],
  suggestedInternshipPaths: [
    'Systems & Backend Engineering Intern @ Atlassian (94% Skill Match)',
    'Cloud Infrastructure & DevOps Intern @ Microsoft (88% Skill Match)',
    'Frontend Platform Intern @ Swiggy Tech (82% Skill Match)',
  ],
  generatedAt: 'Oct 13, 2026 • 09:30 AM IST (Unbiased Ethical Audit Cycle)',
};

