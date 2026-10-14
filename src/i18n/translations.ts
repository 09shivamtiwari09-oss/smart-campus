export type Language = 'en' | 'hi';

export interface Translations {
  nav: {
    brand: string;
    tagline: string;
    student: string;
    teacher: string;
    simulator: string;
    admin: string;
    sarthi: string;
    bento: string;
    aiAdvisor: string;
    proctorTest: string;
    internships: string;
    language: string;
    login: string;
    logout: string;
    switchPersona: string;
    currentRole: string;
  };
  portal: {
    selectTitle: string;
    selectSubtitle: string;
    studentPortal: string;
    facultyPortal: string;
    adminPortal: string;
    studentDesc: string;
    facultyDesc: string;
    adminDesc: string;
    accessDenied: string;
    accessDeniedSubtitle: string;
    returnHome: string;
    switchAccount: string;
    authorizedOnly: string;
  };
  common: {
    successScore: string;
    explainableDrivers: string;
    positiveImpact: string;
    negativeImpact: string;
    loading: string;
    retry: string;
    errorTitle: string;
    emptyTitle: string;
    contactSupport: string;
    callNow: string;
    emailUs: string;
    viewDetails: string;
    saveChanges: string;
    bookSession: string;
    cancel: string;
    confirm: string;
    submit: string;
    search: string;
    filter: string;
    all: string;
    status: string;
    timeline: string;
    completed: string;
    inProgress: string;
    upcoming: string;
    match: string;
    deadline: string;
  };
  student: {
    welcome: string;
    scoreSubtitle: string;
    growthTrend: string;
    aiReport: string;
    strengths: string[];
    improvementPoints: string[];
    weaknesses: string[];
    actionRoadmap: string;
    mentorHeading: string;
    matchReasonLabel: string;
    rerunDiagnostic: string;
    openSimulator: string;
    attendance: string;
    assignments: string;
    codingHrs: string;
    midtermAvg: string;
    reqBar: string;
    labsDone: string;
    topCohort: string;
    theoryDip: string;
  };
  teacher: {
    pageTitle: string;
    pageSubtitle: string;
    dailyBriefTitle: string;
    dailyBriefSubtitle: string;
    filterBySegment: string;
    riskRank: string;
    suggestedAction: string;
    takeIntervention: string;
    totalMonitored: string;
    criticalAttention: string;
    hiddenPotential: string;
    placementReady: string;
    allCohorts: string;
    searchPlaceholder: string;
    markContacted: string;
    outreachDone: string;
    closeBrief: string;
    recordIntervention: string;
    targetStudent: string;
    protocolLabel: string;
    notesLabel: string;
    commitIntervention: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    attendanceLabel: string;
    assignmentLabel: string;
    projectsLabel: string;
    codingPracticeLabel: string;
    predictBtn: string;
    forecastedScore: string;
    projectedDelta: string;
    resetBaseline: string;
    presets: string;
    presetSurge: string;
    presetBurnout: string;
    presetRecovery: string;
    projectedRisk: string;
    projectedCohort: string;
    decisionVerdict: string;
  };
  admin: {
    title: string;
    subtitle: string;
    departmentBreakdown: string;
    interventionEffectiveness: string;
    fairnessPanelTitle: string;
    cohortRecovery: string;
    exportMemo: string;
    totalEnrolled: string;
    campusAvgScore: string;
    avgRecoveryRate: string;
    fairnessParity: string;
    preScore: string;
    postScore: string;
  };
  sarthi: {
    pageTitle: string;
    pageSubtitle: string;
    missionHeading: string;
    missionSub: string;
    searchPlaceholder: string;
    matchScore: string;
    algorithmicReason: string;
    bookGuidance: string;
    modalTitle: string;
    modalSub: string;
    timeSlotLabel: string;
    topicLabel: string;
    notesLabel: string;
    confirmBooking: string;
  };
  aiAdvisor: {
    pageTitle: string;
    pageSubtitle: string;
    diagnosticTab: string;
    chatTab: string;
    matchedInternships: string;
    ethicalGuaranteeTitle: string;
    ethicalGuaranteeSub: string;
    verdictTitle: string;
    strengthsTitle: string;
    weaknessesTitle: string;
    solutionMatrixTitle: string;
    rootCause: string;
    actionableSolution: string;
    chatPlaceholder: string;
    resetChat: string;
    ask: string;
  };
  proctor: {
    pageTitle: string;
    pageSubtitle: string;
    visionSensor: string;
    faceCentered: string;
    acousticSensor: string;
    honeypotSensor: string;
    canaryAlert: string;
    timeRemaining: string;
    submitTest: string;
    auditTrailTitle: string;
    zeroIncidents: string;
    examCompleted: string;
    academicScore: string;
    integrityIndex: string;
    honeypotAuditTitle: string;
    retakeBtn: string;
    returnHub: string;
    testMicPrompt: string;
    micActive: string;
    micInactive: string;
    multiPersonTitle: string;
    multiPersonWarning1Title: string;
    multiPersonWarning1Desc: string;
    multiPersonCancelTitle: string;
    multiPersonCancelDesc: string;
    cancelCountdownText: string;
    testCancelledTitle: string;
    testCancelledDebarment: string;
    personsDetected: string;
    soloCandidate: string;
    noFaceDetected: string;
    simMultipleBtn: string;
    simSoloBtn: string;
    simNoFaceBtn: string;
    acknowledgedBtn: string;
  };
  internships: {
    pageTitle: string;
    pageSubtitle: string;
    availableTab: string;
    appliedTab: string;
    verificationHeading: string;
    verificationSub: string;
    skillTierLabel: string;
    applyWithSkills: string;
    applicationForwarded: string;
    modalTitle: string;
    modalStatement: string;
    confirmDispatch: string;
  };
  landing: {
    heroTag: string;
    heroHeading: string;
    heroGradient: string;
    heroSubtitle: string;
    exploreStudentBtn: string;
    facultyConsoleBtn: string;
    whatIfBtn: string;
    explainableScoreKpi: string;
    distinctSegmentsKpi: string;
    signalsKpi: string;
    auditedFairnessKpi: string;
    threePersonasTag: string;
    threePersonasTitle: string;
    threePersonasSubtitle: string;
    studentPersonaTitle: string;
    studentPersonaSub: string;
    facultyPersonaTitle: string;
    facultyPersonaSub: string;
    adminPersonaTitle: string;
    adminPersonaSub: string;
    segmentationTag: string;
    segmentationTitle: string;
    segmentationSubtitle: string;
    specsTag: string;
    specsTitle: string;
    specsSubtitle: string;
    specsCardTitle: string;
  };
  login: {
    portalBadge: string;
    ssoTitle: string;
    ssoSub: string;
    emailLabel: string;
    passwordLabel: string;
    authSubmitBtn: string;
    fastAccessTitle: string;
    encryptedTelemetry: string;
  };
  bento: {
    showcaseTag: string;
    showcaseTitle: string;
    backHome: string;
    milestoneTitle: string;
    milestoneSub: string;
    telemetryTitle: string;
    telemetrySub: string;
    turnaroundTitle: string;
    turnaroundSub: string;
    aiTitle: string;
    aiSub: string;
    systemTag: string;
    headerTitle: string;
    headerSub: string;
    mentorsCrew: string;
    statement: string;
    viewBentoBanner: string;
    openBentoBtn: string;
    proceedToStudent: string;
    proceedToFaculty: string;
    proceedToAdmin: string;
  };
  footer: {
    copyright: string;
    contactNote: string;
    team: string;
    platformModules: string;
    targetedSegments: string;
    supportHours: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brand: 'Smart Campus Analytics',
      tagline: 'AI Student Success Platform',
      student: 'Student Hub',
      teacher: 'Faculty Console',
      simulator: 'What-If Simulator',
      admin: 'Admin Overview',
      sarthi: 'Sarthi Mentors',
      bento: 'OCTA Bento',
      aiAdvisor: 'AI Advisor',
      proctorTest: 'Proctor Test',
      internships: 'Internships',
      language: 'Language',
      login: 'Sign In',
      logout: 'Sign Out',
      switchPersona: 'Switch Persona',
      currentRole: 'Active Role',
    },
    portal: {
      selectTitle: 'Institutional Access Portals',
      selectSubtitle: 'Dedicated role-segregated consoles for Students, Faculty, and Deans',
      studentPortal: 'Student Success Portal',
      facultyPortal: 'Faculty Triage Console',
      adminPortal: 'Dean & Administration Portal',
      studentDesc: 'Track 0–100 Success Score, AI Counselor, proctor test, internships & recovery roadmap.',
      facultyDesc: 'Early warning student triage, 5 check-ins today brief, and intervention logging.',
      adminDesc: 'Department metrics, turnaround efficacy, demographic fairness & accreditation audits.',
      accessDenied: 'Restricted Portal Access',
      accessDeniedSubtitle: 'Your current account does not have authorization to view this institutional section.',
      returnHome: 'Return to Authorized Hub',
      switchAccount: 'Switch Login Portal',
      authorizedOnly: 'Authorized Personnel Only',
    },
    common: {
      successScore: 'Success Score',
      explainableDrivers: 'Explainable Score Drivers',
      positiveImpact: 'Positive Drivers (+ pts)',
      negativeImpact: 'Risk Drag Factors (- pts)',
      loading: 'Analyzing academic indicators...',
      retry: 'Retry Analysis',
      errorTitle: 'Unable to Load Telemetry',
      emptyTitle: 'No Records Found',
      contactSupport: 'Campus AI Helpdesk',
      callNow: '+91 89340 60356',
      emailUs: '09shivamtiwari09@gmail.com',
      viewDetails: 'Inspect Metrics',
      saveChanges: 'Save Changes',
      bookSession: 'Book 1-on-1 Guidance',
      cancel: 'Cancel',
      confirm: 'Confirm',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      status: 'Status',
      timeline: 'Timeline',
      completed: 'Completed',
      inProgress: 'In Progress',
      upcoming: 'Upcoming',
      match: 'Match',
      deadline: 'Deadline',
    },
    student: {
      welcome: 'Welcome, Aarav Sharma',
      scoreSubtitle: 'Predictive Success Composite based on 14 weighted campus signals',
      growthTrend: 'Academic Growth Trajectory (Last 6 Months)',
      aiReport: 'AI-Synthesized Diagnostic Report',
      strengths: [
        'Consistently high lab assignment submission rate (94%)',
        'Demonstrated strong problem-solving in Data Structures',
        'Active participant in peer group coding challenges',
      ],
      improvementPoints: [
        'Increase Operating Systems lecture attendance from 68% to 80%',
        'Resolve lingering backlog questions in Database Management Systems',
        'Schedule bi-weekly check-in with your assigned Sarthi mentor',
      ],
      weaknesses: [
        'Mid-term dip in theory assessments (-8.4 pts impact)',
        'Low engagement with LMS video review material during exam prep',
      ],
      actionRoadmap: 'Personalized 6-Week Recovery Roadmap',
      mentorHeading: 'Your Matched Sarthi Senior Mentor',
      matchReasonLabel: 'Algorithmic Match Reason',
      rerunDiagnostic: 'Re-run Diagnostic',
      openSimulator: 'What-If Simulator',
      attendance: 'Attendance',
      assignments: 'Assignments',
      codingHrs: 'Coding / Wk',
      midtermAvg: 'Mid-term Avg',
      reqBar: 'Req: 75% bar',
      labsDone: '11 of 12 labs',
      topCohort: 'Top 15% cohort',
      theoryDip: '-18% theory dip',
    },
    teacher: {
      pageTitle: 'Faculty Early Warning & Intervention Console',
      pageSubtitle: 'Targeted student segmentation and automated triage for academic advisors',
      dailyBriefTitle: '5 Students to Talk to Today',
      dailyBriefSubtitle: 'High-priority early interventions identified by pattern drift detection',
      filterBySegment: 'Filter by Cohort Segment',
      riskRank: 'Risk Rank',
      suggestedAction: 'Recommended Action',
      takeIntervention: 'Record Intervention',
      totalMonitored: 'Total Monitored',
      criticalAttention: 'Critical Attention',
      hiddenPotential: 'Hidden Potential',
      placementReady: 'Placement Ready',
      allCohorts: 'All Cohorts',
      searchPlaceholder: 'Search by student name, roll number, or department...',
      markContacted: 'Mark Contacted',
      outreachDone: 'Outreach Done',
      closeBrief: 'Close Brief',
      recordIntervention: 'Record Faculty Intervention',
      targetStudent: 'Target Student',
      protocolLabel: 'Intervention Protocol',
      notesLabel: 'Advisory Notes & Agreed Action Items',
      commitIntervention: 'Commit Intervention',
    },
    simulator: {
      title: 'Academic Trajectory "What-If" Simulator',
      subtitle: 'Tune behavioral inputs to preview the model-predicted impact on final Success Score',
      attendanceLabel: 'Lecture & Lab Attendance (%)',
      assignmentLabel: 'Assignment Completion Rate (%)',
      projectsLabel: 'Hands-on Mini Projects Completed',
      codingPracticeLabel: 'Weekly Coding Practice (Hours)',
      predictBtn: 'Simulate Outcome',
      forecastedScore: 'Projected Success Score',
      projectedDelta: 'Estimated Score Delta',
      resetBaseline: 'Reset to Baseline',
      presets: 'Preset Scenarios:',
      presetSurge: 'Placement-Ready Surge (95% Att / 12h Code)',
      presetBurnout: 'Exam Burnout Slip (58% Att / 2h Code)',
      presetRecovery: 'Theory Recovery Plan (88% Att / 3 Proj)',
      projectedRisk: 'Projected Risk Level:',
      projectedCohort: 'Projected Cohort:',
      decisionVerdict: 'Decision Intelligence Verdict',
    },
    admin: {
      title: 'Institutional Decision Intelligence Overview',
      subtitle: 'Cohort analytics, intervention efficacy, and algorithmic fairness metrics',
      departmentBreakdown: 'Department Performance & At-Risk Ratios',
      interventionEffectiveness: 'Pre vs. Post Intervention Score Delta',
      fairnessPanelTitle: 'AI Explainability & Demographic Parity Audit',
      cohortRecovery: 'Cohort Recovery Rate',
      exportMemo: 'Export Governance Memo',
      totalEnrolled: 'Total Enrolled',
      campusAvgScore: 'Campus Avg Score',
      avgRecoveryRate: 'Avg Recovery Rate',
      fairnessParity: 'Fairness Parity',
      preScore: 'Pre-Intervention Score',
      postScore: 'Post-Intervention Score',
    },
    sarthi: {
      pageTitle: 'Sarthi Peer Mentorship Hub',
      pageSubtitle: 'Connect with verified final-year seniors and placement offer holders matched to your academic gaps',
      missionHeading: 'Peer Mentoring That Removes the Fear of Asking',
      missionSub: 'Students who engage in at least three Sarthi check-ins experience an average +22.6 point increase in continuous assessment scores.',
      searchPlaceholder: 'Search by skill or branch...',
      matchScore: 'Match',
      algorithmicReason: 'Algorithmic Match Reason',
      bookGuidance: 'Book 1-on-1 Guidance',
      modalTitle: 'Book Guidance Session',
      modalSub: 'You are scheduling a dedicated 45-minute virtual guidance session. Your telemetry summary will be pre-shared with your mentor.',
      timeSlotLabel: 'Choose an Available Time Slot',
      topicLabel: 'Primary Focus / Topic',
      notesLabel: 'Specific Questions or Code Repository Links',
      confirmBooking: 'Confirm & Reserve Slot',
    },
    aiAdvisor: {
      pageTitle: 'Sarthi AI Academic Counselor',
      pageSubtitle: 'Unbiased, data-grounded student diagnostic intelligence & personalized skill-to-internship routing',
      diagnosticTab: 'Diagnostic Matrix',
      chatTab: 'Interactive Counselor Chat',
      matchedInternships: 'Matched Internships',
      ethicalGuaranteeTitle: 'Unbiased Evaluation Guarantee (Ethical AI Certified)',
      ethicalGuaranteeSub: 'Every score, weak point, and recommended remedy is derived strictly from objective test logs and automated git test suites.',
      verdictTitle: 'Algorithmic Diagnostic Verdict',
      strengthsTitle: 'Validated Strong Points & Technical Mastery',
      weaknessesTitle: 'Identified Weaknesses & Risk Drag Factors',
      solutionMatrixTitle: 'Targeted Deficiency & Concrete Solution Matrix',
      rootCause: 'Observed Root Cause',
      actionableSolution: 'Actionable Solution & Remedy',
      chatPlaceholder: 'Ask Sarthi AI for diagnostic advice, weaknesses, solutions, or internship matches...',
      resetChat: 'Reset Chat',
      ask: 'Ask:',
    },
    proctor: {
      pageTitle: 'Anti-Cheating Proctored Assessment Engine',
      pageSubtitle: 'Multi-Modal Integrity: Vision Face Mesh, Acoustic Decibel Meter & Canary Trap Questions',
      visionSensor: 'Computer Vision',
      faceCentered: 'Face Centered (Compliant)',
      acousticSensor: 'Acoustic Meter',
      honeypotSensor: 'Honeypot Trap Questions',
      canaryAlert: 'Canary Trap Question (Marks: 0)',
      timeRemaining: 'Time Remaining',
      submitTest: 'Submit Test',
      auditTrailTitle: 'Live Proctor Audit Trail',
      zeroIncidents: 'Zero integrity incidents detected. Assessment in compliance.',
      examCompleted: 'Examination Completed',
      academicScore: 'Academic Score',
      integrityIndex: 'Integrity Index',
      honeypotAuditTitle: 'Honeypot Canary Audit:',
      retakeBtn: 'Retake Assessment',
      returnHub: 'Return to Student Hub',
      testMicPrompt: 'Live Microphone Audio Detection Active',
      micActive: 'Live Mic Listening',
      micInactive: 'Mic Inactive (Room Sensor Active)',
      multiPersonTitle: 'Multi-Person Frame Monitor',
      multiPersonWarning1Title: 'PROCTOR WARNING (Strike 1 of 2): Multiple People in Frame!',
      multiPersonWarning1Desc: 'More than 1 person detected by camera vision. Candidates must remain strictly alone during the test. A second violation will CANCEL your test in 3 seconds.',
      multiPersonCancelTitle: 'CRITICAL VIOLATION (Strike 2): Auto-Cancelling Test!',
      multiPersonCancelDesc: 'Multiple persons detected in camera frame again. Immediate academic integrity cancellation triggered.',
      cancelCountdownText: 'Debarring candidate and voiding exam in:',
      testCancelledTitle: 'Assessment Terminated & Cancelled',
      testCancelledDebarment: 'Test Cancelled Due to Academic Integrity Debarment (Multiple Persons Detected in Proctored Camera Feed). Score has been recorded as 0 with formal incident report.',
      personsDetected: 'People Detected',
      soloCandidate: '1 Person (Candidate Only)',
      noFaceDetected: 'No Face Detected (Out of Frame)',
      simMultipleBtn: '+ Add Person (Simulate 2)',
      simSoloBtn: 'Solo (1 Person)',
      simNoFaceBtn: 'Missing (0 Person)',
      acknowledgedBtn: 'I Understand & Will Remain Alone',
    },
    internships: {
      pageTitle: 'Skill-Level Internship Matching Portal',
      pageSubtitle: 'Curated opportunities matched directly against your verified lab scores and coding telemetry',
      availableTab: 'Available Opportunities',
      appliedTab: 'My Applications',
      verificationHeading: 'Apply with Confidence: Your Telemetry Is Your Resume',
      verificationSub: 'Partner companies review candidates whose continuous performance scores guarantee readiness. Verified lab mastery grants priority status.',
      skillTierLabel: 'Skill Tier:',
      applyWithSkills: 'Apply with Verified Skills',
      applicationForwarded: 'Application Forwarded',
      modalTitle: 'Submit Verified Application',
      modalStatement: 'Verified Telemetry Application Statement',
      confirmDispatch: 'Confirm & Dispatch Application',
    },
    landing: {
      heroTag: 'Smart Campus Analytics • AI Decision Intelligence',
      heroHeading: 'Move Beyond Dashboards.',
      heroGradient: 'Convert Campus Data Into Timely Interventions.',
      heroSubtitle: 'An explainable student success platform that identifies academic risk weeks before exams, segments cohorts for targeted faculty action, and pairs students with verified senior Sarthi mentors.',
      exploreStudentBtn: 'Explore Student Hub',
      facultyConsoleBtn: 'Faculty Triage Console',
      whatIfBtn: 'Try What-If Simulator',
      explainableScoreKpi: 'Explainable Score',
      distinctSegmentsKpi: 'Actionable Segments',
      signalsKpi: 'Weighted Telemetry',
      auditedFairnessKpi: 'Audited Fairness',
      threePersonasTag: 'Three Distinct Personas',
      threePersonasTitle: 'Designed for Everyone Shaping Student Growth',
      threePersonasSubtitle: 'Tailored workflows for students tracking milestones, faculty prioritizing early check-ins, and academic deans reviewing institution-wide metrics.',
      studentPersonaTitle: 'For Students',
      studentPersonaSub: 'Autonomous academic clarity & growth',
      facultyPersonaTitle: 'For Teachers & Mentors',
      facultyPersonaSub: 'Automated early warning triage',
      adminPersonaTitle: 'For Deans & Administrators',
      adminPersonaSub: 'Decision intelligence & governance',
      segmentationTag: 'Targeted Action Engine',
      segmentationTitle: 'Student Segmentation Designed for Concrete Interventions',
      segmentationSubtitle: 'Instead of generic "Good / Bad" labels, our ML engine maps each student into one of five operational categories with predetermined support pathways.',
      specsTag: 'Verified Telemetry Architecture',
      specsTitle: 'Ready to Deploy Across Your Department or Campus',
      specsSubtitle: 'Connect your LMS, attendance biometric logs, and automated lab evaluators. Speak directly with our campus engineering team for an integration walkthrough:',
      specsCardTitle: 'Platform Architecture & Specifications',
    },
    login: {
      portalBadge: 'Institutional Authentication Portal',
      ssoTitle: 'Smart Campus Analytics',
      ssoSub: 'Authorized Single Sign-On for Continuous Telemetry, AI Advisory & Proctored Assessments',
      emailLabel: 'Institutional Email Address',
      passwordLabel: 'Password',
      authSubmitBtn: 'Authenticate & Enter Console',
      fastAccessTitle: 'Evaluator 1-Click Fast Access:',
      encryptedTelemetry: '256-Bit Encrypted Academic Telemetry',
    },
    bento: {
      showcaseTag: 'Living Telemetry Bento Grid',
      showcaseTitle: 'Smart Campus Analytics Presented Through Living Telemetry',
      backHome: 'Back to Home',
      milestoneTitle: 'Semester Milestone Overall Progress',
      milestoneSub: 'Verified Interventions in the past semester',
      telemetryTitle: 'Telemetry Signals Evaluated Daily',
      telemetrySub: 'Continuous automated analysis',
      turnaroundTitle: 'Intervention Turnaround Efficacy',
      turnaroundSub: 'Avg score increase following intervention',
      aiTitle: 'AI Decision Engine & Attribution',
      aiSub: 'Explainable drivers decomposed by SHAP models',
      systemTag: 'OCTA-Grade Bento Design System',
      headerTitle: 'Presented Through Living Telemetry',
      headerSub: 'Flat minimal dark canvas, pale lilac cards, bold grotesque statistics, and explainable decision intelligence engineered for modern universities.',
      mentorsCrew: 'A crew of curious mentors and faculty advisors',
      statement: 'We Shape What Student Success Becomes',
      viewBentoBanner: 'OCTA Bento Telemetry Overview: View live system statistics, student segmentation rings & predictive metrics.',
      openBentoBtn: 'Open OCTA Bento Grid',
      proceedToStudent: 'Proceed to Student Hub',
      proceedToFaculty: 'Proceed to Faculty Console',
      proceedToAdmin: 'Proceed to Admin Overview',
    },
    footer: {
      copyright: 'Smart Campus Analytics. All rights reserved.',
      contactNote: 'Campus Coordination & Technical Support Desk:',
      team: 'Core Platform Engineering Team',
      platformModules: 'Platform Modules',
      targetedSegments: 'Targeted Segments',
      supportHours: 'Campus Support Desk • Mon–Sat 9:00 AM – 6:00 PM IST',
    },
  },
  hi: {
    nav: {
      brand: 'स्मार्ट कैंपस एनालिटिक्स',
      tagline: 'एआई छात्र सफलता मंच',
      student: 'छात्र हब',
      teacher: 'शिक्षक कंसोल',
      simulator: 'व्हाट-इफ़ सिम्युलेटर',
      admin: 'प्रशासन अवलोकन',
      sarthi: 'सारथी मेंटर्स',
      bento: 'ऑक्टा बेंटो ग्रिड',
      aiAdvisor: 'एआई सलाहकार',
      proctorTest: 'प्रॉक्टर परीक्षा',
      internships: 'इंटर्नशिप्स',
      language: 'भाषा',
      login: 'लॉग इन',
      logout: 'लॉग आउट',
      switchPersona: 'भूमिका बदलें',
      currentRole: 'सक्रिय भूमिका',
    },
    portal: {
      selectTitle: 'संस्थागत प्रवेश पोर्टल',
      selectSubtitle: 'छात्रों, शिक्षकों एवं डीन/प्रशासकों के लिए पृथक भूमिका-आधारित कंसोल',
      studentPortal: 'छात्र सफलता पोर्टल',
      facultyPortal: 'संकाय सलाहकार कंसोल',
      adminPortal: 'डीन एवं प्रशासन पोर्टल',
      studentDesc: '0–100 सफलता स्कोर, एआई सलाहकार, प्रॉक्टर परीक्षा, इंटर्नशिप एवं सुधार योजना देखें।',
      facultyDesc: 'जोखिम-आधारित छात्र प्राथमिकता, आज संपर्क करने योग्य 5 छात्र, एवं हस्तक्षेप रिकॉर्डिंग।',
      adminDesc: 'विभागवार मेट्रिक्स, हस्तक्षेप प्रभावशीलता, जनसांख्यिकीय निष्पक्षता एवं ऑडिट रिपोर्ट।',
      accessDenied: 'प्रतिबंधित पोर्टल पहुंच',
      accessDeniedSubtitle: 'आपके वर्तमान खाते को इस संस्थागत अनुभाग को देखने की अनुमति नहीं है।',
      returnHome: 'अपने अधिकृत हब पर लौटें',
      switchAccount: 'लॉगिन पोर्टल बदलें',
      authorizedOnly: 'केवल अधिकृत उपयोगकर्ताओं के लिए',
    },
    common: {
      successScore: 'सफलता स्कोर',
      explainableDrivers: 'स्कोर के मुख्य व्याख्यात्मक कारक',
      positiveImpact: 'सकारात्मक कारक (+ अंक)',
      negativeImpact: 'जोखिम कारक (- अंक)',
      loading: 'अकादमिक संकेतकों का विश्लेषण किया जा रहा है...',
      retry: 'पुनः प्रयास करें',
      errorTitle: 'डेटा लोड करने में असमर्थ',
      emptyTitle: 'कोई रिकॉर्ड नहीं मिला',
      contactSupport: 'कैंपस एआई हेल्पडेस्क',
      callNow: '+91 89340 60356',
      emailUs: '09shivamtiwari09@gmail.com',
      viewDetails: 'विवरण देखें',
      saveChanges: 'परिवर्तन सहेजें',
      bookSession: '1-ऑन-1 सत्र बुक करें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      submit: 'सबमिट करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      all: 'सभी',
      status: 'स्थिति',
      timeline: 'समयरेखा',
      completed: 'पूर्ण',
      inProgress: 'प्रगति पर',
      upcoming: 'आगामी',
      match: 'मैच',
      deadline: 'अंतिम तिथि',
    },
    student: {
      welcome: 'स्वागत है, आरव शर्मा',
      scoreSubtitle: '14 भारित कैंपस सिग्नलों पर आधारित भविष्यसूचक समग्र सफलता स्कोर',
      growthTrend: 'अकादमिक प्रगति रुझान (पिछले 6 माह)',
      aiReport: 'एआई-संश्लेषित नैदानिक रिपोर्ट',
      strengths: [
        'प्रयोगशाला असाइनमेंट पूरा करने की दर उत्कृष्ट है (94%)',
        'डेटा संरचनाओं में मजबूत समस्या-समाधान क्षमता प्रदर्शित',
        'सहकर्मी कोडिंग चुनौतियों में सक्रिय भागीदारी',
      ],
      improvementPoints: [
        'ऑपरेटिंग सिस्टम्स व्याख्यान उपस्थिति 68% से बढ़ाकर 80% करें',
        'डेटाबेस मैनेजमेंट सिस्टम्स के शेष प्रश्नों को हल करें',
        'अपने आवंटित सारथी मेंटर के साथ पाक्षिक बैठक आयोजित करें',
      ],
      weaknesses: [
        'सत्रांत सैद्धांतिक परीक्षा में गिरावट (-8.4 अंक प्रभाव)',
        'परीक्षा पूर्व एलएमएस वीडियो समीक्षा में कम भागीदारी',
      ],
      actionRoadmap: 'व्यक्तिगत 6-सप्ताह सुधार कार्ययोजना',
      mentorHeading: 'आपका आवंटित सारथी सीनियर मेंटर',
      matchReasonLabel: 'एल्गोरिथम मिलान कारण',
      rerunDiagnostic: 'नैदानिक परीक्षण पुनः चलाएं',
      openSimulator: 'व्हाट-इफ़ सिम्युलेटर',
      attendance: 'उपस्थिति',
      assignments: 'असाइनमेंट्स',
      codingHrs: 'कोडिंग / सप्ताह',
      midtermAvg: 'सत्रांत औसत',
      reqBar: 'अनिवार्य: 75% बार',
      labsDone: '11 / 12 लैब पूर्ण',
      topCohort: 'शीर्ष 15% समूह',
      theoryDip: '-18% थ्योरी गिरावट',
    },
    teacher: {
      pageTitle: 'संकाय प्रारंभिक चेतावनी एवं हस्तक्षेप कंसोल',
      pageSubtitle: 'अकादमिक सलाहकारों के लिए लक्षित छात्र वर्गीकरण एवं स्वचालित प्राथमिकता',
      dailyBriefTitle: 'आज बात करने योग्य 5 छात्र',
      dailyBriefSubtitle: 'पैटर्न बहाव पहचान द्वारा चिह्नित उच्च-प्राथमिकता वाले प्रारंभिक हस्तक्षेप',
      filterBySegment: 'समूह खंड द्वारा फ़िल्टर करें',
      riskRank: 'जोखिम रैंक',
      suggestedAction: 'सुझाई गई कार्रवाई',
      takeIntervention: 'हस्तक्षेप रिकॉर्ड करें',
      totalMonitored: 'कुल मॉनिटर किए गए',
      criticalAttention: 'अति-महत्वपूर्ण ध्यान',
      hiddenPotential: 'छुपी हुई क्षमता',
      placementReady: 'प्लेसमेंट के लिए तैयार',
      allCohorts: 'सभी समूह',
      searchPlaceholder: 'छात्र का नाम, रोल नंबर या विभाग से खोजें...',
      markContacted: 'संपर्क किया गया चिह्नित करें',
      outreachDone: 'संपर्क पूर्ण',
      closeBrief: 'ब्रीफ बंद करें',
      recordIntervention: 'संकाय हस्तक्षेप दर्ज करें',
      targetStudent: 'लक्षित छात्र',
      protocolLabel: 'हस्तक्षेप प्रोटोकॉल',
      notesLabel: 'सलाहकार टिप्पणियां एवं सहमत कार्य',
      commitIntervention: 'हस्तक्षेप सहेजें',
    },
    simulator: {
      title: 'अकादमिक प्रक्षेपवक्र "व्हाट-इफ़" सिम्युलेटर',
      subtitle: 'अंतिम सफलता स्कोर पर अनुमानित प्रभाव देखने के लिए मापदंडों को समायोजित करें',
      attendanceLabel: 'व्याख्यान एवं लैब उपस्थिति (%)',
      assignmentLabel: 'असाइनमेंट पूर्णता दर (%)',
      projectsLabel: 'पूर्ण किए गए व्यावहारिक प्रोजेक्ट्स',
      codingPracticeLabel: 'साप्ताहिक कोडिंग अभ्यास (घंटे)',
      predictBtn: 'परिणाम अनुकरण करें',
      forecastedScore: 'अनुमानित समग्र सफलता स्कोर',
      projectedDelta: 'अनुमानित स्कोर अंतर',
      resetBaseline: 'मूल स्थिति पर रीसेट करें',
      presets: 'पूर्वनिर्धारित परिदृश्य:',
      presetSurge: 'प्लेसमेंट-रेडी उछाल (95% उपस्थिति / 12 घंटे कोडिंग)',
      presetBurnout: 'परीक्षा थकान गिरावट (58% उपस्थिति / 2 घंटे कोडिंग)',
      presetRecovery: 'थ्योरी सुधार योजना (88% उपस्थिति / 3 प्रोजेक्ट)',
      projectedRisk: 'अनुमानित जोखिम स्तर:',
      projectedCohort: 'अनुमानित समूह:',
      decisionVerdict: 'निर्णय आसूचना निष्कर्ष',
    },
    admin: {
      title: 'संस्थागत निर्णय आसूचना अवलोकन',
      subtitle: 'समूह विश्लेषण, हस्तक्षेप प्रभावशीलता एवं एल्गोरिदमिक निष्पक्षता मेट्रिक्स',
      departmentBreakdown: 'विभाग प्रदर्शन एवं जोखिम अनुपात',
      interventionEffectiveness: 'हस्तक्षेप पूर्व एवं पश्चात स्कोर अंतर',
      fairnessPanelTitle: 'एआई व्याख्यात्मकता एवं जनसांख्यिकीय समानता ऑडिट',
      cohortRecovery: 'समूह सुधार दर',
      exportMemo: 'गवर्नेंस मेमो निर्यात करें',
      totalEnrolled: 'कुल नामांकित',
      campusAvgScore: 'कैंपस औसत स्कोर',
      avgRecoveryRate: 'औसत सुधार दर',
      fairnessParity: 'निष्पक्षता समानता',
      preScore: 'हस्तक्षेप पूर्व स्कोर',
      postScore: 'हस्तक्षेप पश्चात स्कोर',
    },
    sarthi: {
      pageTitle: 'सारथी सहकर्मी मेंटरशिप हब',
      pageSubtitle: 'आपकी अकादमिक कमियों को पूरा करने हेतु सत्यापित अंतिम वर्ष के सीनियर्स एवं प्लेसमेंट धारकों से जुड़ें',
      missionHeading: 'सहकर्मी मेंटरिंग जो पूछने का डर दूर करती है',
      missionSub: 'कम से कम तीन सारथी सत्रों में भाग लेने वाले छात्रों के निरंतर मूल्यांकन स्कोर में औसतन +22.6 अंकों की वृद्धि होती है।',
      searchPlaceholder: 'कौशल या शाखा द्वारा खोजें...',
      matchScore: 'मैच',
      algorithmicReason: 'एल्गोरिदम मिलान कारण',
      bookGuidance: '1-ऑन-1 मार्गदर्शन बुक करें',
      modalTitle: 'मार्गदर्शन सत्र बुक करें',
      modalSub: 'आप 45 मिनट का समर्पित वर्चुअल मार्गदर्शन सत्र निर्धारित कर रहे हैं। आपका टेलीमेट्री सारांश मेंटर के साथ साझा किया जाएगा।',
      timeSlotLabel: 'उपलब्ध समय स्लॉट चुनें',
      topicLabel: 'प्राथमिक विषय / फ़ोकस',
      notesLabel: 'विशिष्ट प्रश्न या गिटहब रेपो लिंक',
      confirmBooking: 'पुष्टि करें और स्लॉट आरक्षित करें',
    },
    aiAdvisor: {
      pageTitle: 'सारथी एआई अकादमिक काउंसलर',
      pageSubtitle: 'निष्पक्ष, डेटा-आधारित छात्र नैदानिक आसूचना एवं व्यक्तिगत कौशल-से-इंटर्नशिप मार्ग',
      diagnosticTab: 'नैदानिक मैट्रिक्स',
      chatTab: 'इंटरैक्टिव काउंसलर चैट',
      matchedInternships: 'अनुरूप इंटर्नशिप्स',
      ethicalGuaranteeTitle: 'निष्पक्ष मूल्यांकन गारंटी (नैतिक एआई प्रमाणित)',
      ethicalGuaranteeSub: 'प्रत्येक स्कोर, कमजोरी और अनुशंसित उपाय निष्पक्ष परीक्षण लॉग और स्वचालित परीक्षणों से व्युत्पन्न हैं।',
      verdictTitle: 'एल्गोरिदमिक नैदानिक निष्कर्ष',
      strengthsTitle: 'सत्यापित मजबूत पक्ष एवं तकनीकी दक्षता',
      weaknessesTitle: 'पहचानी गई कमजोरियां एवं जोखिम कारक',
      solutionMatrixTitle: 'लक्षित कमी एवं ठोस समाधान मैट्रिक्स',
      rootCause: 'मूल कारण',
      actionableSolution: 'कार्रवाई योग्य समाधान एवं उपाय',
      chatPlaceholder: 'सारथी एआई से नैदानिक सलाह, कमजोरियों, समाधान या इंटर्नशिप के बारे में पूछें...',
      resetChat: 'चैट रीसेट करें',
      ask: 'पूछें:',
    },
    proctor: {
      pageTitle: 'एंटी-चीटिंग प्रॉक्टर्ड मूल्यांकन इंजन',
      pageSubtitle: 'मल्टी-मॉडल निष्ठा: विजन फेस मेश, ध्वनिक डेसिबल मीटर एवं कैनरी ट्रैप प्रश्न',
      visionSensor: 'कंप्यूटर विजन',
      faceCentered: 'चेहरा केंद्रित (अनुपालन में)',
      acousticSensor: 'ध्वनिक मीटर (माइक्रोफ़ोन)',
      honeypotSensor: 'हनीपॉट ट्रैप प्रश्न',
      canaryAlert: 'कैनरी ट्रैप प्रश्न (अंक: 0)',
      timeRemaining: 'शेष समय',
      submitTest: 'परीक्षा सबमिट करें',
      auditTrailTitle: 'लाइव प्रॉक्टर ऑडिट ट्रेल',
      zeroIncidents: 'कोई अनुचित घटना नहीं पाई गई। परीक्षा पूरी तरह अनुपालन में है।',
      examCompleted: 'परीक्षा संपन्न',
      academicScore: 'अकादमिक अंक',
      integrityIndex: 'निष्ठा सूचकांक',
      honeypotAuditTitle: 'हनीपॉट कैनरी ऑडिट:',
      retakeBtn: 'परीक्षा पुनः दें',
      returnHub: 'छात्र हब पर लौटें',
      testMicPrompt: 'लाइव माइक्रोफ़ोन ऑडियो डिटेक्शन सक्रिय',
      micActive: 'लाइव माइक सक्रिय (सुन रहा है)',
      micInactive: 'माइक निष्क्रिय (रूम सेंसर सक्रिय)',
      multiPersonTitle: 'कैमरा बहु-व्यक्ति मॉनिटर',
      multiPersonWarning1Title: 'प्रॉक्टर चेतावनी (स्ट्राइक 1 / 2): कैमरे में एक से अधिक व्यक्ति!',
      multiPersonWarning1Desc: 'कैमरा विजन द्वारा 1 से अधिक व्यक्ति का पता चला है। उम्मीदवार को परीक्षा के दौरान पूर्णतः अकेला रहना अनिवार्य है। दोबारा उल्लंघन पर 3 सेकंड में परीक्षा रद्द हो जाएगी।',
      multiPersonCancelTitle: 'गंभीर उल्लंघन (स्ट्राइक 2): परीक्षा स्वतः रद्द हो रही है!',
      multiPersonCancelDesc: 'कैमरा फ्रेम में पुनः एक से अधिक व्यक्ति पाए गए। शैक्षणिक सत्यनिष्ठा के तहत तत्काल परीक्षा रद्दीकरण सक्रिय हुआ।',
      cancelCountdownText: 'उम्मीदवार को निष्कासित कर परीक्षा रद्द की जा रही है:',
      testCancelledTitle: 'मूल्यांकन समाप्त एवं रद्द',
      testCancelledDebarment: 'शैक्षणिक सत्यनिष्ठा निष्कासन (प्रॉक्टर कैमरा फीड में कई व्यक्ति उपस्थित) के कारण परीक्षा रद्द कर दी गई है। औपचारिक घटना रिपोर्ट के साथ अंक 0 दर्ज किए गए हैं।',
      personsDetected: 'व्यक्ति उपस्थित',
      soloCandidate: '1 व्यक्ति (केवल उम्मीदवार)',
      noFaceDetected: 'कोई चेहरा नहीं दिखा (कैमरे से बाहर)',
      simMultipleBtn: '+ व्यक्ति जोड़ें (2 व्यक्ति)',
      simSoloBtn: 'अकेला (1 व्यक्ति)',
      simNoFaceBtn: 'अनुपस्थित (0 व्यक्ति)',
      acknowledgedBtn: 'मैं समझ गया, अकेला रहूंगा',
    },
    internships: {
      pageTitle: 'कौशल-स्तरीय इंटर्नशिप मिलान पोर्टल',
      pageSubtitle: 'आपके सत्यापित लैब स्कोर और कोडिंग टेलीमेट्री से सीधे मेल खाने वाले अवसर',
      availableTab: 'उपलब्ध अवसर',
      appliedTab: 'मेरे आवेदन',
      verificationHeading: 'आत्मविश्वास से आवेदन करें: आपकी टेलीमेट्री ही आपका रिज्यूमे है',
      verificationSub: 'साझेदार कंपनियां उन उम्मीदवारों की समीक्षा करती हैं जिनका निरंतर प्रदर्शन तत्परता की गारंटी देता है।',
      skillTierLabel: 'कौशल स्तर:',
      applyWithSkills: 'सत्यापित कौशल के साथ आवेदन करें',
      applicationForwarded: 'आवेदन अग्रेषित किया गया',
      modalTitle: 'सत्यापित आवेदन सबमिट करें',
      modalStatement: 'सत्यापित टेलीमेट्री आवेदन वक्तव्य',
      confirmDispatch: 'पुष्टि करें और आवेदन भेजें',
    },
    landing: {
      heroTag: 'स्मार्ट कैंपस एनालिटिक्स • एआई निर्णय आसूचना',
      heroHeading: 'डैशबोर्ड से आगे बढ़ें।',
      heroGradient: 'कैंपस डेटा को समयबद्ध हस्तक्षेपों में बदलें।',
      heroSubtitle: 'एक व्याख्यात्मक छात्र सफलता मंच जो परीक्षाओं से हफ्तों पहले अकादमिक जोखिम की पहचान करता है, लक्षित संकाय कार्रवाई के लिए समूहों को विभाजित करता है, और छात्रों को वरिष्ठ सारथी मेंटर्स से जोड़ता है।',
      exploreStudentBtn: 'छात्र हब देखें',
      facultyConsoleBtn: 'शिक्षक कंसोल खोलें',
      whatIfBtn: 'व्हाट-इफ़ सिम्युलेटर आज़माएं',
      explainableScoreKpi: 'व्याख्यात्मक स्कोर',
      distinctSegmentsKpi: 'सक्रिय समूह',
      signalsKpi: 'भारित टेलीमेट्री',
      auditedFairnessKpi: 'सत्यापित निष्पक्षता',
      threePersonasTag: 'तीन विशिष्ट भूमिकाएं',
      threePersonasTitle: 'छात्रों के विकास को आकार देने वाले सभी के लिए निर्मित',
      threePersonasSubtitle: 'छात्रों, शिक्षकों और अकादमिक डीन के लिए विशेष रूप से डिज़ाइन किए गए कार्यप्रवाह।',
      studentPersonaTitle: 'छात्रों के लिए',
      studentPersonaSub: 'स्वायत्त अकादमिक स्पष्टता एवं प्रगति',
      facultyPersonaTitle: 'शिक्षकों एवं सलाहकारों के लिए',
      facultyPersonaSub: 'स्वचालित प्रारंभिक चेतावनी ट्राइएज',
      adminPersonaTitle: 'डीन एवं प्रशासकों के लिए',
      adminPersonaSub: 'निर्णय आसूचना एवं सुशासन',
      segmentationTag: 'लक्षित कार्रवाई इंजन',
      segmentationTitle: 'ठोस हस्तक्षेपों के लिए डिज़ाइन किया गया छात्र वर्गीकरण',
      segmentationSubtitle: 'सामान्य "अच्छा / बुरा" लेबल के बजाय, हमारा एमएल इंजन प्रत्येक छात्र को पांच परिचालन श्रेणियों में मैप करता है।',
      specsTag: 'सत्यापित टेलीमेट्री आर्किटेक्चर',
      specsTitle: 'आपके विभाग या पूरे कैंपस में लागू करने के लिए तैयार',
      specsSubtitle: 'अपने एलएमएस, बायोमेट्रिक उपस्थिति और स्वचालित लैब परीक्षकों को एकीकृत करें। हमारी इंजीनियरिंग टीम से संपर्क करें:',
      specsCardTitle: 'मंच वास्तुकला एवं तकनीकी विनिर्देश',
    },
    login: {
      portalBadge: 'संस्थागत प्रमाणीकरण पोर्टल',
      ssoTitle: 'स्मार्ट कैंपस एनालिटिक्स',
      ssoSub: 'निरंतर टेलीमेट्री, एआई परामर्श एवं प्रॉक्टर परीक्षाओं हेतु एकल साइन-ऑन',
      emailLabel: 'संस्थागत ईमेल पता',
      passwordLabel: 'पासवर्ड',
      authSubmitBtn: 'प्रमाणित करें और कंसोल में प्रवेश करें',
      fastAccessTitle: 'मूल्यांकनकर्ता 1-क्लिक त्वरित पहुंच:',
      encryptedTelemetry: '256-बिट एन्क्रिप्टेड अकादमिक टेलीमेट्री',
    },
    bento: {
      showcaseTag: 'लिविंग टेलीमेट्री बेंटो ग्रिड',
      showcaseTitle: 'जीवंत टेलीमेट्री द्वारा प्रस्तुत स्मार्ट कैंपस एनालिटिक्स',
      backHome: 'मुख्य पृष्ठ पर लौटें',
      milestoneTitle: 'सत्र मील का पत्थर समग्र प्रगति',
      milestoneSub: 'गत सेमेस्टर में सत्यापित हस्तक्षेप',
      telemetryTitle: 'प्रतिदिन मूल्यांकित टेलीमेट्री संकेत',
      telemetrySub: 'निरंतर स्वचालित विश्लेषण',
      turnaroundTitle: 'हस्तक्षेप सुधार प्रभावशीलता',
      turnaroundSub: 'हस्तक्षेप के बाद औसत स्कोर वृद्धि',
      aiTitle: 'एआई निर्णय इंजन एवं विशेषता',
      aiSub: 'एसएचएपी मॉडल द्वारा व्याख्यात्मक कारकों का विश्लेषण',
      systemTag: 'OCTA बेंटो डिज़ाइन सिस्टम',
      headerTitle: 'जीवंत टेलीमेट्री द्वारा प्रस्तुत',
      headerSub: 'फ्लैट मिनिमल डार्क कैनवास, पेल लाइलैक कार्ड, बोल्ड ग्रोटेस्क आंकड़े, और आधुनिक विश्वविद्यालयों के लिए व्याख्यात्मक निर्णय आसूचना।',
      mentorsCrew: 'जिज्ञासु सलाहकारों और संकाय मार्गदर्शकों की एक समर्पित टीम',
      statement: 'हम छात्र की वास्तविक सफलता को आकार देते हैं',
      viewBentoBanner: 'ऑक्टा बेंटो टेलीमेट्री अवलोकन: जीवंत सिस्टम सांख्यिकी, छात्र विभाजन रिंग एवं पूर्वानुमान मेट्रिक्स देखें।',
      openBentoBtn: 'ऑक्टा बेंटो ग्रिड खोलें',
      proceedToStudent: 'छात्र हब पर आगे बढ़ें',
      proceedToFaculty: 'संकाय कंसोल पर आगे बढ़ें',
      proceedToAdmin: 'प्रशासन अवलोकन पर आगे बढ़ें',
    },
    footer: {
      copyright: 'स्मार्ट कैंपस एनालिटिक्स। सर्वाधिकार सुरक्षित।',
      contactNote: 'कैंपस समन्वय एवं तकनीकी सहायता डेस्क:',
      team: 'कोर प्लेटफॉर्म इंजीनियरिंग टीम',
      platformModules: 'मंच मॉड्यूल',
      targetedSegments: 'लक्षित समूह',
      supportHours: 'कैंपस सहायता डेस्क • सोम–शनि सुबह 9:00 से शाम 6:00 बजे तक',
    },
  },
};
