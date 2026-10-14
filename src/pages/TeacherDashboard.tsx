import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  MessageSquarePlus, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SegmentBadge } from '../components/common/SegmentBadge';
import { DailyBriefModal } from '../components/domain/DailyBriefModal';
import { EmptyState } from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../context/ToastContext';
import { apiService } from '../services/api';
import { StudentProfile } from '../types';

export const TeacherDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [selectedSegment, setSelectedSegment] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [selectedInterventionStudent, setSelectedInterventionStudent] = useState<StudentProfile | null>(null);
  const [interventionNote, setInterventionNote] = useState('');
  const [interventionType, setInterventionType] = useState('Faculty 1-on-1 Academic Advising');
  const [isSubmittingIntervention, setIsSubmittingIntervention] = useState(false);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getFacultyStudents();
      setStudents(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load faculty cohort roster.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesSegment = selectedSegment === 'ALL' || s.segment === selectedSegment;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const handleOpenIntervention = (student: StudentProfile) => {
    setSelectedInterventionStudent(student);
    setInterventionNote('');
  };

  const handleSaveIntervention = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterventionStudent) return;

    try {
      setIsSubmittingIntervention(true);
      const res = await apiService.recordIntervention(
        selectedInterventionStudent.id,
        interventionType,
        interventionNote || 'Standard early advising advisory logged.'
      );
      addToast(
        'success',
        language === 'hi' ? 'हस्तक्षेप दर्ज किया गया' : 'Intervention Recorded',
        res.message
      );
      setSelectedInterventionStudent(null);
      setInterventionNote('');
    } catch {
      addToast('error', 'Failed to Record', 'Could not sync intervention with campus log.');
    } finally {
      setIsSubmittingIntervention(false);
    }
  };

  return (
    <PageContainer
      title={t.teacher.pageTitle}
      subtitle={t.teacher.pageSubtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'लाइव समूह टेलीमेट्री' : 'Live Cohort Telemetry'}
        </span>
      }
      action={
        <Button
          variant="primary"
          onClick={() => setBriefModalOpen(true)}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          {t.teacher.dailyBriefTitle}
        </Button>
      }
    >
      <SEO
        title="Faculty Early Warning & Intervention Console"
        description="Risk-ranked student roster, explainable flag reasons, 5 students to talk to today brief, and segment-targeted interventions."
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

      {/* Roster Summary KPI Blocks in OCTA Bento Style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#eee3f7] p-5 rounded-[20px] border border-[#d9bef0] text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#57495f] font-bold block">{t.teacher.totalMonitored}</span>
          <span className="text-3xl font-extrabold font-mono text-[#1e1526] mt-1 block">
            {students.length}
          </span>
          <span className="text-2xs text-[#6f6178] font-medium">B.Tech 3rd & 5th Sem</span>
        </div>

        <div className="bg-[#ad3568]/15 p-5 rounded-[20px] border border-[#ad3568]/35 text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#ad3568] font-bold block">{t.teacher.criticalAttention}</span>
          <span className="text-3xl font-extrabold font-mono text-[#ad3568] mt-1 block">
            {students.filter((s) => s.segment === 'At risk').length}
          </span>
          <span className="text-2xs text-[#ad3568] font-bold">
            {language === 'hi' ? 'प्रतिबंध या ड्रॉप का जोखिम' : 'Debarment or drop risk'}
          </span>
        </div>

        <div className="bg-[#7c4bb0]/15 p-5 rounded-[20px] border border-[#7c4bb0]/35 text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#7c4bb0] font-bold block">{t.teacher.hiddenPotential}</span>
          <span className="text-3xl font-extrabold font-mono text-[#7c4bb0] mt-1 block">
            {students.filter((s) => s.segment === 'Hidden potential').length}
          </span>
          <span className="text-2xs text-[#7c4bb0] font-bold">
            {language === 'hi' ? 'थ्योरी गैप सुधार हेतु तैयार' : 'Theory gap bridge ready'}
          </span>
        </div>

        <div className="bg-[#0D9488]/15 p-5 rounded-[20px] border border-[#0D9488]/35 text-[#1e1526] hover:-translate-y-1 transition-transform">
          <span className="text-2xs uppercase text-[#0D9488] font-bold block">{t.teacher.placementReady}</span>
          <span className="text-3xl font-extrabold font-mono text-[#0D9488] mt-1 block">
            {students.filter((s) => s.segment === 'Placement-ready').length}
          </span>
          <span className="text-2xs text-[#0D9488] font-bold">
            {language === 'hi' ? 'कैंपस ड्राइव हेतु तैयार' : 'Ready for campus drives'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <Card noPadding>
        <div className="p-4 sm:p-5 border-b border-[#d9bef0]/60 bg-[#f6eefb]/80 rounded-t-[20px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#57495f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.teacher.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d9bef0] bg-white text-xs sm:text-sm text-[#1e1526] placeholder:text-[#6f6178] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] focus:border-transparent font-medium"
            />
          </div>

          {/* Segment Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-2xs font-extrabold text-[#1e1526] uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#7c4bb0]" />
              {t.teacher.filterBySegment}
            </span>
            {(['ALL', 'At risk', 'Hidden potential', 'Steady but stuck', 'Placement-ready', 'High performers'] as const).map(
              (seg) => (
                <button
                  key={seg}
                  onClick={() => setSelectedSegment(seg)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedSegment === seg
                      ? 'bg-[#7c4bb0] text-white shadow-sm'
                      : 'bg-white/80 text-[#57495f] hover:bg-white border border-[#d9bef0]/60'
                  }`}
                >
                  {seg === 'ALL' ? t.teacher.allCohorts : seg}
                </button>
              )
            )}
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <TableSkeleton rows={5} />
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} onRetry={fetchFacultyData} />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title={language === 'hi' ? 'वर्तमान फ़िल्टर से कोई छात्र मेल नहीं खाता' : 'No students match the current filter'}
              description={language === 'hi' ? 'अपनी खोज मानदंड समायोजित करें या समूह खंड बदलें।' : 'Try adjusting your search criteria or switching the cohort segment filter above.'}
              actionText={language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
              onAction={() => {
                setSelectedSegment('ALL');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#e6d5f2] border-b border-[#d9bef0] text-2xs uppercase tracking-wider font-extrabold text-[#1e1526]">
                  <th className="py-3.5 px-4">{t.teacher.riskRank}</th>
                  <th className="py-3.5 px-4">{language === 'hi' ? 'छात्र एवं रोल नं.' : 'Student & Roll No'}</th>
                  <th className="py-3.5 px-4">{t.common.successScore}</th>
                  <th className="py-3.5 px-4">{language === 'hi' ? 'समूह खंड' : 'Cohort Segment'}</th>
                  <th className="py-3.5 px-4">{language === 'hi' ? 'व्याख्यात्मक जोखिम फ्लैग' : 'Explainable Risk Flags'}</th>
                  <th className="py-3.5 px-4">{t.teacher.suggestedAction}</th>
                  <th className="py-3.5 px-4 text-right">{language === 'hi' ? 'हस्तक्षेप' : 'Intervention'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6d5f2]/80 text-xs text-[#1e1526]">
                {filteredStudents.map((s) => {
                  const isCritical = s.riskLevel === 'Critical';

                  return (
                    <tr
                      key={s.id}
                      className={`hover:bg-[#f6eefb] transition-colors ${
                        isCritical ? 'bg-[#ad3568]/10' : 'bg-white/60'
                      }`}
                    >
                      {/* Risk Rank */}
                      <td className="py-3.5 px-4 font-mono font-extrabold">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold ${
                            isCritical
                              ? 'bg-[#ad3568] text-white'
                              : 'bg-[#1e1526] text-[#eee3f7]'
                          }`}
                        >
                          #{s.riskRank}
                        </span>
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-[#1e1526]">{s.name}</div>
                        <div className="text-2xs font-mono text-[#57495f] font-bold">{s.rollNo}</div>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-base font-extrabold tabular-nums ${
                              s.successScore >= 80
                                ? 'text-[#147b37]'
                                : s.successScore >= 65
                                ? 'text-[#1e1526]'
                                : 'text-[#ad3568]'
                            }`}
                          >
                            {s.successScore}
                          </span>
                          <span className="text-2xs text-[#6f6178]">/100</span>
                        </div>
                        <div className="text-2xs text-[#57495f]">
                          {language === 'hi' ? 'उपस्थिति' : 'Att'}: {s.attendancePct}%
                        </div>
                      </td>

                      {/* Segment */}
                      <td className="py-3.5 px-4">
                        <SegmentBadge segment={s.segment} size="sm" />
                      </td>

                      {/* Risk Flags & Explainable Reason */}
                      <td className="py-3.5 px-4 max-w-xs">
                        {s.flags.length > 0 ? (
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-1">
                              {s.flags.map((flag, idx) => (
                                <span
                                  key={idx}
                                  className="text-2xs font-bold bg-[#ad3568]/15 text-[#ad3568] border border-[#ad3568]/30 px-2 py-0.5 rounded-md"
                                >
                                  {flag}
                                </span>
                              ))}
                            </div>
                            <p className="text-2xs text-[#57495f] line-clamp-2">
                              {s.flagReasons[0]}
                            </p>
                          </div>
                        ) : (
                          <span className="text-2xs text-[#147b37] flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {language === 'hi' ? 'शून्य सक्रिय विसंगतियाँ' : 'Zero active anomalies'}
                          </span>
                        )}
                      </td>

                      {/* Suggested Action */}
                      <td className="py-3.5 px-4 max-w-xs text-[#57495f] text-2xs leading-relaxed">
                        <p className="line-clamp-2 font-medium">{s.suggestedAction}</p>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          size="sm"
                          variant={isCritical ? 'danger' : 'outline'}
                          onClick={() => handleOpenIntervention(s)}
                          leftIcon={<MessageSquarePlus className="w-3.5 h-3.5" />}
                        >
                          {language === 'hi' ? 'कार्रवाई' : 'Act'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal 1: 5 Students to Talk to Today */}
      <DailyBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        students={students}
      />

      {/* Modal 2: Intervention Logging in OCTA Modal Style */}
      {selectedInterventionStudent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#eee3f7] rounded-[24px] shadow-2xl border border-[#d9bef0] max-w-lg w-full p-6 sm:p-7 space-y-4 text-[#1e1526]">
            <div className="flex items-center justify-between pb-3 border-b border-[#d9bef0]/60">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#7c4bb0]" />
                <h3 className="text-base font-extrabold text-[#1e1526] font-heading">
                  {t.teacher.recordIntervention}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInterventionStudent(null)}
                className="p-1.5 text-[#57495f] hover:text-[#1e1526] hover:bg-[#d9bef0]/40 rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#f6eefb] p-4 rounded-xl border border-[#d9bef0] text-xs">
              <span className="text-[#57495f] block font-medium">{t.teacher.targetStudent}:</span>
              <strong className="text-sm font-extrabold text-[#1e1526] block mt-0.5">
                {selectedInterventionStudent.name} ({selectedInterventionStudent.rollNo})
              </strong>
              <div className="mt-2.5 flex items-center gap-2">
                <SegmentBadge segment={selectedInterventionStudent.segment} size="sm" />
                <span className="text-2xs text-[#57495f] font-mono font-bold">
                  {t.common.successScore}: {selectedInterventionStudent.successScore}
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveIntervention} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.teacher.protocolLabel}
                </label>
                <select
                  value={interventionType}
                  onChange={(e) => setInterventionType(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-2.5 text-[#1e1526] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                >
                  <option>Faculty 1-on-1 Academic Advising</option>
                  <option>Assign Sarthi Senior Peer Mentor</option>
                  <option>Remedial Lab Hands-on Clinic</option>
                  <option>Attendance Debarment Formal Warning</option>
                  <option>Parent-Department Academic Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.teacher.notesLabel}
                </label>
                <textarea
                  required
                  rows={3}
                  value={interventionNote}
                  onChange={(e) => setInterventionNote(e.target.value)}
                  placeholder="e.g., Reviewed Operating Systems mid-term test paper. Student committed to attending all remaining lectures..."
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-3 text-[#1e1526] placeholder:text-[#6f6178] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#d9bef0]/60">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedInterventionStudent(null)}
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmittingIntervention}
                >
                  {t.teacher.commitIntervention}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
