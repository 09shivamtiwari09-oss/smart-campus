import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Building 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { CardSkeleton } from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { Internship } from '../types';

export const InternshipDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & State
  const [activeTab, setActiveTab] = useState<'available' | 'applied'>('available');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({
    'int-003': true, // Swiggy pre-applied for realism
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const data = await apiService.getInternships();
        setInternships(data);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  const handleApplyClick = (internship: Internship) => {
    setApplyingInternship(internship);
    setCoverNote(
      language === 'hi'
        ? `मैं स्मार्ट कैंपस एनालिटिक्स द्वारा सत्यापित अपनी सतत टेलीमेट्री के आधार पर ${internship.company} में ${internship.title} पद के लिए आवेदन कर रहा हूँ। मेरा प्रैक्टिकल लैब स्कोर 92% और कोडिंग 7.5 घंटे/सप्ताह है।`
        : `I am applying for the ${internship.title} role at ${internship.company} backed by my verified continuous telemetry (92% lab completion, 7.5 hrs/week coding volume). I look forward to contributing.`
    );
  };

  const handleConfirmApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingInternship) return;

    try {
      setIsSubmitting(true);
      const res = await apiService.applyForInternship(applyingInternship.id, coverNote);
      setAppliedIds((prev) => ({ ...prev, [applyingInternship.id]: true }));
      addToast(
        'success',
        language === 'hi' ? 'आवेदन सफलतापूर्वक अग्रेषित किया गया' : 'Application Forwarded Successfully',
        res.message
      );
      setApplyingInternship(null);
    } catch {
      addToast('error', 'Application Failed', 'Unable to reach recruiter telemetry portal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredInternships = internships.filter((item) => {
    const isApplied = !!appliedIds[item.id];
    if (activeTab === 'applied' && !isApplied) return false;
    if (activeTab === 'available' && isApplied) return false;

    const matchesDifficulty =
      selectedDifficulty === 'ALL' || item.difficultyLevel === selectedDifficulty;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDifficulty && matchesSearch;
  });

  return (
    <PageContainer
      title={t.internships.pageTitle}
      subtitle={t.internships.pageSubtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#147b37] border border-[#147b37]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'कौशल-सत्यापित अवसर' : 'Skills-Verified Matches'}
        </span>
      }
      action={
        <div className="flex bg-[#1e1526] p-1 rounded-xl text-xs font-bold border border-white/10">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'available'
                ? 'bg-[#7c4bb0] text-white shadow-sm'
                : 'text-[#aaa1b2] hover:text-white'
            }`}
          >
            {t.internships.availableTab}
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'applied'
                ? 'bg-[#7c4bb0] text-white shadow-sm'
                : 'text-[#aaa1b2] hover:text-white'
            }`}
          >
            <span>{t.internships.appliedTab}</span>
            <span className="w-4 h-4 rounded-full bg-white text-[#1e1526] text-3xs font-mono flex items-center justify-center font-bold">
              {Object.keys(appliedIds).length}
            </span>
          </button>
        </div>
      }
    >
      <SEO
        title="Skill-Level Internship Dashboard"
        description="Explore internship positions matched algorithmically to your verified skills, lab results, and programming hours."
      />

      {/* Hero Match Insight Callout */}
      <div className="bg-[#16111e] text-white rounded-[20px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#a06cd5]/30">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-[#b78ce0] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#b78ce0]" />
            <span>{language === 'hi' ? 'टेलीमेट्री-समर्थित उम्मीदवार सत्यापन' : 'Telemetry-Backed Candidate Verification'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
            {t.internships.verificationHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#aaa1b2] leading-relaxed">
            {t.internships.verificationSub}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#aaa1b2] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'भूमिका, कंपनी या कौशल खोजें...' : 'Search role, company or skill...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1e1526] border border-white/10 text-white text-xs placeholder:text-[#aaa1b2] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] font-medium"
          />
        </div>
      </div>

      {/* Filter Bar in OCTA Style */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#f6eefb] border border-[#d9bef0] rounded-[18px] text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-extrabold text-[#1e1526] uppercase tracking-wider text-2xs mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#7c4bb0]" />
            {t.internships.skillTierLabel}
          </span>
          {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-[#7c4bb0] text-white shadow-sm'
                  : 'bg-white/80 text-[#57495f] hover:bg-white border border-[#d9bef0]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <span className="text-2xs text-[#57495f] font-mono font-bold">
          {language === 'hi' 
            ? `${filteredInternships.length} अवसर प्रदर्शित` 
            : `Showing ${filteredInternships.length} opportunities`}
        </span>
      </div>

      {/* Internships Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredInternships.length === 0 ? (
        <EmptyState
          title={activeTab === 'available' ? 'No opportunities match your criteria' : 'No submitted applications yet'}
          description={
            activeTab === 'available'
              ? 'Try resetting your search query or switching your skill tier filter above.'
              : 'Browse available internships and submit your application with 1-click verified telemetry.'
          }
          actionText={activeTab === 'available' ? 'Reset Filters' : 'Browse Available'}
          onAction={() => {
            setSearchQuery('');
            setSelectedDifficulty('ALL');
            if (activeTab === 'applied') setActiveTab('available');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => {
            const isApplied = !!appliedIds[internship.id];

            return (
              <Card
                key={internship.id}
                className="flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-white flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
                        {internship.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-[#1e1526] leading-snug">
                          {internship.title}
                        </h3>
                        <p className="text-2xs font-bold text-[#57495f] flex items-center gap-1 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-[#7c4bb0]" />
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-extrabold text-[#147b37] bg-[#147b37]/15 px-2.5 py-1 rounded-full border border-[#147b37]/35 shrink-0">
                      {internship.skillMatchScore}% Match
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-3 text-2xs text-[#57495f] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7c4bb0]" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#7c4bb0]" />
                      {internship.duration}
                    </span>
                    <span className="font-mono font-extrabold text-[#1e1526]">
                      {internship.stipend}
                    </span>
                  </div>

                  {/* Skill Match Rationale */}
                  <div className="p-3.5 rounded-xl bg-[#f6eefb] border border-[#d9bef0] text-xs text-[#1e1526] space-y-1">
                    <span className="text-3xs font-extrabold uppercase tracking-wider text-[#7c4bb0] block">
                      {language === 'hi' ? 'टेलीमेट्री मिलान तर्क' : 'Telemetry Match Rationale'}
                    </span>
                    <p className="text-2xs leading-relaxed text-[#57495f]">
                      {internship.matchRationale}
                    </p>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <span className="text-3xs uppercase font-extrabold text-[#1e1526] tracking-wider block mb-1.5">
                      {language === 'hi' ? 'आवश्यक कौशल' : 'Required Skills'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.requiredSkills.map((sk) => (
                        <span
                          key={sk}
                          className="text-2xs bg-[#1e1526] text-[#eee3f7] px-2.5 py-0.5 rounded-full font-mono font-bold"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-2xs text-[#57495f] pt-2 border-t border-[#d9bef0]/60">
                    <span>{language === 'hi' ? 'अंतिम तिथि:' : 'Deadline:'} {internship.deadline}</span>
                    <span>{internship.openings} {language === 'hi' ? 'स्थान' : 'open positions'}</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6">
                  {isApplied ? (
                    <div className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#147b37]/15 text-[#147b37] border border-[#147b37]/35 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#147b37]" />
                      <span>{t.internships.applicationForwarded}</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      className="w-full"
                      onClick={() => handleApplyClick(internship)}
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      {t.internships.applyWithSkills}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Application Confirmation Modal */}
      {applyingInternship && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#eee3f7] rounded-[24px] shadow-2xl border border-[#d9bef0] max-w-lg w-full p-6 sm:p-7 space-y-4 text-[#1e1526]">
            <div className="flex items-center justify-between pb-3 border-b border-[#d9bef0]/60">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#7c4bb0]" />
                <h3 className="text-base font-extrabold text-[#1e1526] font-heading">
                  {t.internships.modalTitle}
                </h3>
              </div>
              <button
                onClick={() => setApplyingInternship(null)}
                className="p-1.5 text-[#57495f] hover:text-[#1e1526] hover:bg-[#d9bef0]/40 rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#f6eefb] p-4 rounded-xl border border-[#d9bef0] text-xs">
              <span className="text-[#57495f] block font-medium">
                {language === 'hi' ? 'पद एवं कंपनी:' : 'Position & Company:'}
              </span>
              <strong className="text-sm font-extrabold text-[#1e1526] block mt-0.5">
                {applyingInternship.title} • {applyingInternship.company}
              </strong>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-2xs font-mono font-bold text-[#147b37] bg-[#147b37]/15 px-2.5 py-0.5 rounded-full border border-[#147b37]/35">
                  {applyingInternship.skillMatchScore}% {language === 'hi' ? 'सत्यापित मिलान' : 'Verified Telemetry Match'}
                </span>
                <span className="text-2xs text-[#57495f] font-mono">
                  {applyingInternship.location}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.internships.modalStatement}
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-3 text-[#1e1526] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 border border-[#d9bef0] text-2xs text-[#57495f] space-y-1">
                <p className="font-bold text-[#1e1526]">{language === 'hi' ? 'संलग्न सत्यापित प्रमाणपत्र:' : 'Attached Verified Credentials:'}</p>
                <p>• 92% Lab Completion Score (C++ & Operating Systems)</p>
                <p>• 7.5 hrs/week continuous DSA problem solving audit</p>
                <p>• 0-100 Success Score: 78.4 (Tier: Hidden Potential / Placement Track)</p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#d9bef0]/60">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setApplyingInternship(null)}
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                >
                  {t.internships.confirmDispatch}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
