import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Compass, 
  Clock, 
  RefreshCw, 
  TrendingUp, 
  BookOpen, 
  ArrowUpRight,
  Download 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SegmentBadge } from '../components/common/SegmentBadge';
import { ScoreGauge } from '../components/domain/ScoreGauge';
import { ExplainableDriverChart } from '../components/domain/ExplainableDriverChart';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../context/ToastContext';
import { apiService } from '../services/api';
import { StudentProfile } from '../types';

export const StudentDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getStudentProfile();
      setStudent(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load student profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleRefreshReport = async () => {
    try {
      setIsGeneratingReport(true);
      const report = await apiService.generateAIReport();
      if (student) {
        setStudent({ ...student, aiReport: report });
      }
      addToast(
        'success',
        language === 'hi' ? 'नैदानिक ​​रिपोर्ट ताज़ा की गई' : 'Diagnostic Report Refreshed',
        language === 'hi' ? 'ताज़ा टेलीमेट्री विश्लेषण सफलतापूर्वक लोड हुआ।' : 'Live telemetry parsed. AI strengths and recovery roadmap updated.'
      );
    } catch {
      addToast('error', 'Report Generation Failed', 'Could not sync with AI diagnostic engine.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleDownloadReport = () => {
    if (!student) return;
    const reportText = `SMART CAMPUS ANALYTICS - STUDENT DIAGNOSTIC REPORT
Student: ${student.name} (${student.rollNo})
Department: ${student.department} (Semester ${student.semester})
Generated: ${new Date().toLocaleDateString()}
Success Score: ${student.successScore}/100 (Risk Level: ${student.riskLevel})
Cohort Segment: ${student.segment}

AI DIAGNOSTIC SUMMARY:
${student.aiReport.summary}

IDENTIFIED STRENGTHS:
${student.aiReport.strengths.map((s) => `- ${s}`).join('\n')}

IDENTIFIED WEAKNESSES:
${student.aiReport.weaknesses.map((w) => `- ${w}`).join('\n')}

ACTIONABLE IMPROVEMENT POINTS:
${student.aiReport.improvementPoints.map((i) => `- ${i}`).join('\n')}

6-WEEK CALIBRATED RECOVERY ROADMAP:
${student.roadmap.map((r) => `[${r.week}] ${r.title} (${r.status.toUpperCase()}): ${r.action}`).join('\n')}

${student.assignedMentor ? `ASSIGNED SARTHI PEER MENTOR:
- Name: ${student.assignedMentor.name} (${student.assignedMentor.branch}, ${student.assignedMentor.year})
- Offer / Target: ${student.assignedMentor.companyOffer || 'Industry Benchmark'}
- Match Score: ${student.assignedMentor.matchScore}%
- Match Rationale: ${student.assignedMentor.matchReason}` : 'ASSIGNED SARTHI PEER MENTOR:\n- In review for Sarthi matching'}
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Diagnostic-${student.rollNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast(
      'success',
      language === 'hi' ? 'रिपोर्ट डाउनलोड हुई' : 'Diagnostic Report Downloaded',
      `AI-Diagnostic-${student.rollNo}.txt saved.`
    );
  };

  if (loading) {
    return (
      <PageContainer
        title={t.student.welcome}
        subtitle={language === 'hi' ? 'छात्र टेलीमेट्री और सफलता मेट्रिक्स लोड हो रहे हैं...' : 'Loading student telemetry and success metrics...'}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </PageContainer>
    );
  }

  if (error || !student) {
    return (
      <PageContainer title="Student Success Platform">
        <ErrorState
          title="Telemetry Feed Disconnected"
          message={error || 'Unable to retrieve current student telemetry.'}
          onRetry={fetchStudentData}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={student.name}
      subtitle={`Roll: ${student.rollNo} • ${student.department} (${language === 'hi' ? 'सत्र' : 'Semester'} ${student.semester})`}
      badge={<SegmentBadge segment={student.segment} />}
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshReport}
            isLoading={isGeneratingReport}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            {t.student.rerunDiagnostic}
          </Button>
          <NavLink to="/simulator">
            <Button size="sm" variant="primary">
              {t.student.openSimulator}
            </Button>
          </NavLink>
        </div>
      }
    >
      <SEO
        title="Student Success Dashboard"
        description={`Track explainable success score (${student.successScore}/100), driver breakdown, growth trajectory, and AI recovery roadmap.`}
      />

      {/* OCTA Bento Telemetry Hub Banner (Positioned First) */}
      <div className="bg-[#1e1526] p-4 sm:p-5 rounded-[20px] border border-[#a06cd5]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#7c4bb0]/30 border border-[#b78ce0]/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#b78ce0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-mono font-bold text-[#b78ce0] uppercase tracking-wider">
                OCTA Bento Telemetry
              </span>
              <span className="text-2xs text-[#aaa1b2]">• Living Milestone Rings</span>
            </div>
            <p className="text-xs sm:text-sm text-[#eee3f7] font-medium">
              {t.bento.viewBentoBanner}
            </p>
          </div>
        </div>
        <NavLink to="/bento" className="shrink-0 w-full sm:w-auto">
          <Button size="sm" variant="outline" className="w-full sm:w-auto border-[#b78ce0]/40 text-white hover:bg-white/10" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            {t.bento.openBentoBtn}
          </Button>
        </NavLink>
      </div>

      {/* Top Bento Row: Success Score & Sarthi Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Success Score Bento Card */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.common.successScore}
            subtitle={t.student.scoreSubtitle}
            badge={
              <span className="text-2xs font-mono bg-[#1e1526] text-[#eee3f7] px-2.5 py-0.5 rounded-full font-bold">
                XGBoost Ensemble
              </span>
            }
          />
          <div className="pt-6">
            <ScoreGauge
              score={student.successScore}
              previousScore={student.previousScore}
              riskLevel={student.riskLevel}
            />

            {/* Quick 4 KPI Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#d9bef0]/60">
              <div className="bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0]/70">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.student.attendance}</span>
                <span className="text-xl font-extrabold font-mono text-[#1e1526] mt-0.5 block">
                  {student.attendancePct}%
                </span>
                <span className="text-2xs text-[#ad3568] font-bold">{t.student.reqBar}</span>
              </div>

              <div className="bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0]/70">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.student.assignments}</span>
                <span className="text-xl font-extrabold font-mono text-[#1e1526] mt-0.5 block">
                  {student.assignmentsSubmittedPct}%
                </span>
                <span className="text-2xs text-[#147b37] font-bold">{t.student.labsDone}</span>
              </div>

              <div className="bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0]/70">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.student.codingHrs}</span>
                <span className="text-xl font-extrabold font-mono text-[#1e1526] mt-0.5 block">
                  {student.codingPracticeHrsPerWeek}h
                </span>
                <span className="text-2xs text-[#147b37] font-bold">{t.student.topCohort}</span>
              </div>

              <div className="bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0]/70">
                <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.student.midtermAvg}</span>
                <span className="text-xl font-extrabold font-mono text-[#1e1526] mt-0.5 block">
                  {student.midTermAvg}%
                </span>
                <span className="text-2xs text-[#ad3568] font-bold">{t.student.theoryDip}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Assigned Sarthi Mentor Bento Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader
              title={t.student.mentorHeading}
              subtitle={language === 'hi' ? 'एल्गोरिथमिक वरिष्ठ मिलान' : 'Algorithmic Senior Match'}
              badge={
                <span className="text-2xs font-mono font-bold text-[#147b37] bg-[#147b37]/15 px-2.5 py-0.5 rounded-full border border-[#147b37]/35">
                  {student.assignedMentor?.matchScore}% Match
                </span>
              }
            />

            {student.assignedMentor ? (
              <div className="pt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-white flex items-center justify-center font-extrabold text-lg shrink-0 shadow-md">
                    {student.assignedMentor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#1e1526]">{student.assignedMentor.name}</h4>
                    <p className="text-2xs text-[#57495f]">{student.assignedMentor.degree}</p>
                    {student.assignedMentor.companyOffer && (
                      <span className="text-2xs font-bold text-[#147b37] block mt-0.5">
                        {student.assignedMentor.companyOffer}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-[#f6eefb] p-3.5 rounded-xl border border-[#d9bef0] text-xs text-[#57495f] space-y-1">
                  <span className="text-2xs font-extrabold text-[#1e1526] uppercase tracking-wider block">
                    {t.student.matchReasonLabel}
                  </span>
                  <p className="leading-relaxed">{student.assignedMentor.matchReason}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {student.assignedMentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-2xs bg-[#1e1526] text-[#eee3f7] px-2.5 py-0.5 rounded-full font-mono font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="pt-6">
            <NavLink to="/sarthi" className="block">
              <Button size="sm" variant="secondary" className="w-full" rightIcon={<Compass className="w-3.5 h-3.5" />}>
                {language === 'hi' ? 'मेंटर सत्र बुक करें' : 'Book Mentor Session'}
              </Button>
            </NavLink>
          </div>
        </Card>
      </div>

      {/* Explainable Driver Breakdown Card */}
      <Card>
        <CardHeader
          title={t.common.explainableDrivers}
          subtitle={language === 'hi' ? 'सकारात्मक प्रेरकों और जोखिम कारकों का पारदर्शी विश्लेषण' : 'Direct breakdown of positive boosters and risk drag factors impacting your Success Score'}
        />
        <div className="pt-4">
          <ExplainableDriverChart drivers={student.drivers} />
        </div>
      </Card>

      {/* Growth Timeline Chart */}
      <Card>
        <CardHeader
          title={t.student.growthTrend}
          subtitle={language === 'hi' ? 'उपस्थिति और असाइनमेंट निरंतरता के साथ मासिक स्कोर वृद्धि' : 'Monthly score progression plotted alongside attendance and assignment consistency'}
          badge={<span className="text-2xs font-mono text-[#57495f] font-bold">6 {language === 'hi' ? 'माह खिड़की' : 'Month Window'}</span>}
        />
        <div className="pt-6">
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={student.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c4bb0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7c4bb0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9bef0" opacity={0.6} />
                <XAxis dataKey="month" stroke="#57495f" fontSize={12} tickLine={false} />
                <YAxis stroke="#57495f" fontSize={12} domain={[40, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16111e',
                    borderColor: '#a06cd5',
                    borderRadius: '12px',
                    color: '#eee3f7',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#b78ce0' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#7c4bb0"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                  name={language === 'hi' ? 'सफलता स्कोर' : 'Success Score'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-[#57495f] border-t border-[#d9bef0]/60">
            <span className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#7c4bb0] rounded-full" />
              <span className="font-semibold text-[#1e1526]">
                {language === 'hi' ? 'सफलता स्कोर समग्र (0-100)' : 'Success Score Composite (0-100)'}
              </span>
            </span>
            <span className="text-[#57495f] font-mono">
              {language === 'hi' ? 'नवंबर के लिए अनुमान: 83 (+5 अंक)' : 'Projection for Nov: 83 (+5 pts)'}
            </span>
          </div>
        </div>
      </Card>

      {/* AI Diagnostic Report (Strengths, Weaknesses, Improvement Points) */}
      <Card>
        <CardHeader
          title={t.student.aiReport}
          subtitle={student.aiReport.summary}
          badge={
            <div className="flex items-center gap-2">
              <span className="text-2xs font-mono text-[#1e1526] bg-[#f6eefb] border border-[#d9bef0] px-2.5 py-0.5 rounded-full font-bold">
                {student.aiReport.generatedAt}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadReport}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                {language === 'hi' ? 'रिपोर्ट डाउनलोड' : 'Download Brief'}
              </Button>
            </div>
          }
        />

        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Strengths */}
          <div className="bg-[#147b37]/10 border border-[#147b37]/35 rounded-[18px] p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#147b37] font-extrabold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'पहचानी गई ताकत' : 'Identified Strengths'}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1e1526]">
              {student.aiReport.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#147b37] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-[#ad3568]/10 border border-[#ad3568]/35 rounded-[18px] p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#ad3568] font-extrabold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'कमजोरियां एवं जोखिम' : 'Observed Vulnerabilities'}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1e1526]">
              {student.aiReport.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad3568] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Improvement Points */}
          <div className="bg-[#7c4bb0]/10 border border-[#7c4bb0]/35 rounded-[18px] p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#7c4bb0] font-extrabold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>{language === 'hi' ? 'अनुशंसित कदम' : 'Recommended Action Steps'}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1e1526]">
              {student.aiReport.improvementPoints.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7c4bb0] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Personalized 6-Week Recovery Roadmap */}
      <Card>
        <CardHeader
          title={t.student.actionRoadmap}
          subtitle={language === 'hi' ? 'ऑपरेटिंग सिस्टम थ्योरी और परीक्षा बेंचमार्क को पुनः प्राप्त करने के लिए साप्ताहिक मील के पत्थर' : 'Sequenced weekly milestones calibrated to recover Operating Systems theory and exam benchmarks'}
        />

        <div className="pt-6 space-y-3">
          {student.roadmap.map((item) => {
            const isCompleted = item.status === 'completed';
            const isInProgress = item.status === 'in-progress';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isCompleted
                    ? 'bg-[#147b37]/10 border-[#147b37]/35 text-[#1e1526]'
                    : isInProgress
                    ? 'bg-[#7c4bb0]/15 border-[#7c4bb0]/45 text-[#1e1526]'
                    : 'bg-white/80 border-[#d9bef0] text-[#1e1526]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-[#147b37] text-white'
                        : isInProgress
                        ? 'bg-[#7c4bb0] text-white'
                        : 'bg-[#1e1526] text-white'
                    }`}
                  >
                    {item.week}
                  </span>
                  <div>
                    <h5 className="text-sm font-extrabold text-[#1e1526]">{item.title}</h5>
                    <p className="text-xs text-[#57495f] mt-0.5">{item.action}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="text-2xs px-2.5 py-0.5 rounded-full bg-[#f6eefb] border border-[#d9bef0] text-[#57495f] font-mono font-bold">
                    {item.category}
                  </span>
                  {isCompleted && (
                    <span className="text-xs font-bold text-[#147b37] bg-[#147b37]/15 px-2.5 py-0.5 rounded-full border border-[#147b37]/35">
                      {t.common.completed}
                    </span>
                  )}
                  {isInProgress && (
                    <span className="text-xs font-bold text-[#7c4bb0] bg-[#7c4bb0]/15 px-2.5 py-0.5 rounded-full border border-[#7c4bb0]/35 animate-pulse">
                      {t.common.inProgress}
                    </span>
                  )}
                  {item.status === 'upcoming' && (
                    <span className="text-xs font-bold text-[#6f6178] bg-[#f6eefb] px-2.5 py-0.5 rounded-full border border-[#d9bef0]">
                      {t.common.upcoming}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
};
