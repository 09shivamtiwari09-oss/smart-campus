import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  Scale,
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../context/ToastContext';
import { apiService } from '../services/api';
import { DepartmentInsight, InterventionMetric, FairnessAuditMetric } from '../types';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();

  const [departments, setDepartments] = useState<DepartmentInsight[]>([]);
  const [interventions, setInterventions] = useState<InterventionMetric[]>([]);
  const [fairness, setFairness] = useState<FairnessAuditMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAdminInsights();
      setDepartments(data.departments);
      setInterventions(data.interventions);
      setFairness(data.fairness);
    } catch (err: any) {
      setError(err?.message || 'Failed to load administrator intelligence.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleExportAudit = () => {
    const memoText = `INSTITUTIONAL GOVERNANCE MEMORANDUM & ETHICAL FAIRNESS AUDIT (2026)
Office of Academic Affairs & Accreditation | Smart Campus Analytics
Date Generated: ${new Date().toLocaleDateString()}

============================================================
1. EXECUTIVE CAMPUS OVERVIEW
============================================================
- Total Enrolled Students: 954 (Across 4 Engineering Departments)
- Campus Average Success Score: 75.2 / 100 (+3.4 pts vs previous term)
- Average Intervention Recovery Rate: 78.4%
- Overall Algorithmic Fairness Parity: 98.6%

============================================================
2. DEPARTMENT-WISE PERFORMANCE & RISK INDEX
============================================================
${departments.map((d) => `• Department: ${d.department}
  - Total Enrolled: ${d.totalStudents} | Avg Score: ${d.avgSuccessScore}/100
  - At Risk: ${d.atRiskCount} | Intervention Coverage: ${d.interventionRatePct}%`).join('\n\n')}

============================================================
3. INTERVENTION EFFICACY & TURNAROUND ROI (PRE vs POST)
============================================================
${interventions.map((i) => `• Protocol: ${i.interventionType}
  - Cohort Size: ${i.cohortSize} students
  - Pre-Intervention Score: ${i.beforeScore} -> Post-Intervention Score: ${i.afterScore} (Delta: +${(i.afterScore - i.beforeScore).toFixed(1)} pts)
  - Recovery Rate: ${i.recoveryRatePct}%`).join('\n\n')}

============================================================
4. ALGORITHMIC FAIRNESS & DEMOGRAPHIC PARITY AUDIT
============================================================
${fairness.map((f) => `• Cohort Demographic: ${f.demographicGroup}
  - Representation: ${f.representationPct}% | False Positive Rate: ${f.falsePositiveRatePct}%
  - Parity Score: ${f.parityScorePct}% (Audit Status: ${f.auditStatus.toUpperCase()})`).join('\n\n')}

============================================================
CONFIDENTIAL - OFFICIAL CAMPUS DECISION INTELLIGENCE MEMO
============================================================`;

    const blob = new Blob([memoText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Campus-Governance-Audit-2026.txt';
    link.click();
    URL.revokeObjectURL(url);

    addToast(
      'success',
      language === 'hi' ? 'ऑडिट मेमो डाउनलोड हुआ' : 'Audit Memo Exported',
      language === 'hi' ? 'Campus-Governance-Audit-2026.txt डाउनलोड किया गया।' : 'Campus-Governance-Audit-2026.txt downloaded.'
    );
  };

  // Distribution across 5 segments for visual chart using OCTA color palette
  const segmentDistributionData = [
    { name: language === 'hi' ? 'उच्च प्रदर्शनकर्ता' : 'High Performers', count: 184, color: '#147b37' },
    { name: language === 'hi' ? 'प्लेसमेंट-तैयार' : 'Placement-Ready', count: 351, color: '#0D9488' },
    { name: language === 'hi' ? 'छिपी प्रतिभा' : 'Hidden Potential', count: 210, color: '#7c4bb0' },
    { name: language === 'hi' ? 'स्थिर पर अटके' : 'Steady but Stuck', count: 115, color: '#b78ce0' },
    { name: language === 'hi' ? 'जोखिम में' : 'At Risk', count: 94, color: '#ad3568' },
  ];

  if (loading) {
    return (
      <PageContainer title={t.admin.title} subtitle={language === 'hi' ? 'एनालिटिक्स लोड हो रहे हैं...' : 'Loading analytics...'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title={t.admin.title}>
        <ErrorState message={error} onRetry={fetchAdminData} />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={t.admin.title}
      subtitle={t.admin.subtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#147b37] border border-[#147b37]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'संस्थागत पर्यवेक्षण' : 'Institutional Oversight'}
        </span>
      }
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportAudit}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          {t.admin.exportMemo}
        </Button>
      }
    >
      <SEO
        title="Executive Campus Intelligence"
        description="Department insights, intervention effectiveness pre vs post, cohort segment distribution, and ethical fairness audit."
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

      {/* Top Level Metric Summary Cards in OCTA Bento Style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#eee3f7] p-5 rounded-[20px] border border-[#d9bef0] text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.admin.totalEnrolled}</span>
          <span className="text-3xl font-extrabold font-mono text-[#1e1526] mt-1 block">954</span>
          <span className="text-2xs text-[#6f6178] font-medium">
            {language === 'hi' ? '4 इंजीनियरिंग विभागों में' : 'Across 4 Engineering Depts'}
          </span>
        </div>

        <div className="bg-[#eee3f7] p-5 rounded-[20px] border border-[#d9bef0] text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.admin.campusAvgScore}</span>
          <span className="text-3xl font-extrabold font-mono text-[#7c4bb0] mt-1 block">75.2</span>
          <span className="text-2xs text-[#147b37] font-bold">
            {language === 'hi' ? '+3.4 अंक पिछले सत्र की तुलना में' : '+3.4 pts vs previous term'}
          </span>
        </div>

        <div className="bg-[#eee3f7] p-5 rounded-[20px] border border-[#d9bef0] text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.admin.avgRecoveryRate}</span>
          <span className="text-3xl font-extrabold font-mono text-[#147b37] mt-1 block">79.3%</span>
          <span className="text-2xs text-[#147b37] font-bold">
            {language === 'hi' ? 'सारथी / परामर्श के बाद' : 'Following Sarthi / Advising'}
          </span>
        </div>

        <div className="bg-[#eee3f7] p-5 rounded-[20px] border border-[#d9bef0] text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.admin.fairnessParity}</span>
          <span className="text-3xl font-extrabold font-mono text-[#1e1526] mt-1 block">99.1%</span>
          <span className="text-2xs text-[#7c4bb0] font-bold">
            {language === 'hi' ? 'एथिकल एआई प्रमाणित' : 'Ethical AI Certified'}
          </span>
        </div>
      </div>

      {/* Charts Grid: Segment Distribution & Intervention Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Segment Breakdown */}
        <Card>
          <CardHeader
            title={language === 'hi' ? 'कैंपस-व्यापी छात्र समूह वितरण' : 'Campus-Wide Student Segment Distribution'}
            subtitle={language === 'hi' ? '954 सक्रिय स्नातक छात्रों में परिचालन वर्गीकरण' : 'Operational categorization across 954 active undergraduate students'}
          />
          <div className="pt-6">
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segmentDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9bef0" opacity={0.6} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#57495f" 
                    fontSize={11} 
                    angle={-20} 
                    textAnchor="end"
                    tickLine={false} 
                  />
                  <YAxis stroke="#57495f" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16111e',
                      borderColor: '#a06cd5',
                      borderRadius: '12px',
                      color: '#eee3f7',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} name={language === 'hi' ? 'छात्र' : 'Students'}>
                    {segmentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-3 border-t border-[#d9bef0]/60 flex justify-between text-2xs text-[#57495f]">
              <span className="font-semibold text-[#1e1526]">
                {language === 'hi' ? 'सबसे बड़ा समूह: प्लेसमेंट-तैयार (351 छात्र)' : 'Largest Cohort: Placement-Ready (351 students)'}
              </span>
              <span className="font-bold text-[#ad3568]">
                {language === 'hi' ? 'प्राथमिकता: 94 जोखिम वाले छात्र' : 'Action Priority: 94 At-Risk students'}
              </span>
            </div>
          </div>
        </Card>

        {/* Chart 2: Intervention Effectiveness (Before vs After) */}
        <Card>
          <CardHeader
            title={t.admin.interventionEffectiveness}
            subtitle={language === 'hi' ? '4 मानकीकृत समर्थन विधियों में मापी गई औसत स्कोर वृद्धि' : 'Quantified composite score uplift measured across 4 standardized support modes'}
          />
          <div className="pt-6">
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interventions} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9bef0" opacity={0.6} />
                  <XAxis 
                    dataKey="interventionType" 
                    stroke="#57495f" 
                    fontSize={10} 
                    angle={-20} 
                    textAnchor="end"
                    tickLine={false} 
                  />
                  <YAxis stroke="#57495f" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16111e',
                      borderColor: '#a06cd5',
                      borderRadius: '12px',
                      color: '#eee3f7',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="beforeScore" name={t.admin.preScore} fill="#b78ce0" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="afterScore" name={t.admin.postScore} fill="#147b37" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-3 border-t border-[#d9bef0]/60 flex justify-between text-2xs text-[#57495f]">
              <span className="font-semibold text-[#1e1526]">
                {language === 'hi' ? 'शीर्ष प्रभाव: सारथी सहकर्मी परामर्श (+22.6 अंक औसत लाभ)' : 'Top Efficacy: Sarthi Peer Mentorship (+22.6 pts average gain)'}
              </span>
              <span className="font-mono">
                {language === 'hi' ? 'औसत सुधार समय: 21 दिन' : 'Average Turnaround: 21 days'}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Department Breakdown Table */}
      <Card noPadding>
        <div className="p-5 border-b border-[#d9bef0]/60 bg-[#f6eefb]/80 rounded-t-[20px]">
          <h3 className="text-base font-extrabold text-[#1e1526] font-heading">{t.admin.departmentBreakdown}</h3>
          <p className="text-xs text-[#57495f] mt-0.5">
            {language === 'hi' ? 'शैक्षणिक विभागों द्वारा तुलनात्मक प्रदर्शन, जोखिम अनुपात और हस्तक्षेप भागीदारी' : 'Comparative performance, at-risk ratio, and intervention participation by academic department'}
          </p>
        </div>

        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#e6d5f2] border-b border-[#d9bef0] text-2xs uppercase tracking-wider font-extrabold text-[#1e1526]">
                <th className="py-3.5 px-4">{language === 'hi' ? 'विभाग' : 'Department'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'कुल छात्र' : 'Total Students'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'औसत सफलता स्कोर' : 'Avg Success Score'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'जोखिम में छात्र' : 'At Risk Students'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'प्लेसमेंट-तैयार' : 'Placement-Ready'}</th>
                <th className="py-3.5 px-4 text-right">{language === 'hi' ? 'हस्तक्षेप दर' : 'Intervention Rate'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6d5f2]/80 text-xs text-[#1e1526]">
              {departments.map((dept) => (
                <tr key={dept.department} className="hover:bg-[#f6eefb] bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-[#1e1526] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#7c4bb0]" />
                    <span>{dept.department}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">{dept.totalStudents}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-[#7c4bb0]">
                    {dept.avgSuccessScore} / 100
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#ad3568] font-extrabold">
                    {dept.atRiskCount} {language === 'hi' ? 'छात्र' : 'students'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#0D9488] font-bold">
                    {dept.placementReadyCount}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#147b37]">
                    {dept.interventionRatePct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Algorithmic Fairness & Demographic Parity Panel */}
      <Card>
        <CardHeader
          title={t.admin.fairnessPanelTitle}
          subtitle={language === 'hi' ? 'सक्रिय पूर्वाग्रह ऑडिट जो यह पुष्टि करते हैं कि मॉडल लिंग, पृष्ठभूमि या प्रवेश कोटे के आधार पर छात्रों को दंडित नहीं करते' : 'Proactive bias audits validating that risk classification models do not penalize students by gender, background, or admission stream'}
          badge={
            <span className="text-2xs font-mono font-bold text-[#147b37] bg-[#147b37]/15 px-2.5 py-0.5 rounded-full border border-[#147b37]/35 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              {language === 'hi' ? 'एल्गोरिथमिक समानता सत्यापित' : 'Algorithmic Parity Verified'}
            </span>
          }
        />

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {fairness.map((metric) => {
            const isCompliant = metric.auditStatus === 'Compliant';

            return (
              <div
                key={metric.demographicGroup}
                className="p-4 rounded-xl border border-[#d9bef0] bg-[#f6eefb] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-[#1e1526]">{metric.demographicGroup}</h4>
                  <span
                    className={`text-2xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isCompliant
                        ? 'bg-[#147b37]/15 text-[#147b37] border-[#147b37]/35'
                        : 'bg-amber-500/15 text-amber-800 border-amber-400/35'
                    }`}
                  >
                    {metric.auditStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between text-2xs text-[#57495f] font-mono pt-1">
                  <span>{language === 'hi' ? 'समूह प्रतिनिधित्व:' : 'Cohort Rep:'} {metric.representationPct}%</span>
                  <span>{language === 'hi' ? 'समानता सूचकांक:' : 'Parity Index:'} {metric.parityScorePct}%</span>
                  <span>{language === 'hi' ? 'एफपीआर डेल्टा:' : 'FPR Delta:'} {metric.falsePositiveRatePct}%</span>
                </div>

                <p className="text-[#57495f] text-2xs leading-relaxed pt-1.5 border-t border-[#d9bef0]/60">
                  {metric.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
};
