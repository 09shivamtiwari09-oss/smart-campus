import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Star, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  UserCheck 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CardSkeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../context/ToastContext';
import { apiService } from '../services/api';
import { SarthiMentor } from '../types';

export const SarthiMentorsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();

  const [mentors, setMentors] = useState<SarthiMentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Booking State
  const [searchSkill, setSearchSkill] = useState('');
  const [bookingMentor, setBookingMentor] = useState<SarthiMentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [sessionTopic, setSessionTopic] = useState('Operating Systems Mid-term Diagnostic & Code Review');
  const [studentNotes, setStudentNotes] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMentors();
      setMentors(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load Sarthi mentor directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((m) => {
    const q = searchSkill.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.branch.toLowerCase().includes(q) ||
      m.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const handleStartBooking = (mentor: SarthiMentor) => {
    setBookingMentor(mentor);
    setSelectedSlot(mentor.availableSlots[0] || '');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingMentor || !selectedSlot) return;

    try {
      setIsSubmittingBooking(true);
      const res = await apiService.bookMentorSession({
        mentorId: bookingMentor.name,
        studentName: 'Aarav Sharma',
        studentEmail: 'aarav.sharma@campus.edu.in',
        selectedSlot,
        topic: sessionTopic,
        notes: studentNotes,
      });

      addToast(
        'success',
        language === 'hi' ? 'मार्गदर्शन सत्र आरक्षित!' : 'Guidance Session Confirmed!',
        `${res.message} Ref ID: ${res.confirmationId}`
      );
      setBookingMentor(null);
      setStudentNotes('');
    } catch {
      addToast('error', 'Booking Failed', 'Unable to secure slot. Please try another time.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <PageContainer
      title={t.sarthi.pageTitle}
      subtitle={t.sarthi.pageSubtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'डोमेन-मिलान सहकर्मी' : 'Domain-Matched Peers'}
        </span>
      }
    >
      <SEO
        title="Sarthi Senior Mentorship Hub"
        description="Connect with domain-matched senior mentors, inspect match algorithms, and book 1-on-1 guidance sessions."
      />

      {/* Program Mission Callout Banner in OCTA Dark Bento Tile */}
      <div className="bg-[#16111e] text-white rounded-[20px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#a06cd5]/30">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-bold text-[#b78ce0]">
            <Sparkles className="w-3.5 h-3.5 text-[#b78ce0]" />
            <span>{language === 'hi' ? 'परियोजना सारथी: 87.5% समूह सुधार दर' : 'Project Sarthi: 87.5% Cohort Recovery Rate'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
            {t.sarthi.missionHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#aaa1b2] leading-relaxed">
            {t.sarthi.missionSub}
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#aaa1b2] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            placeholder={t.sarthi.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1e1526] border border-white/10 text-white text-xs placeholder:text-[#aaa1b2] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] font-medium"
          />
        </div>
      </div>

      {/* Mentors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchMentors} />
      ) : filteredMentors.length === 0 ? (
        <EmptyState
          title={language === 'hi' ? 'आपके मानदंड से कोई मेंटर नहीं मिला' : 'No mentors found matching your criteria'}
          description={language === 'hi' ? 'किसी अन्य कौशल जैसे DSA, FastAPI या Embedded C से खोजें।' : "Try searching for another skill such as 'DSA', 'FastAPI', 'Embedded C', or reset your search."}
          actionText={language === 'hi' ? 'खोज रीसेट करें' : 'Clear Search'}
          onAction={() => setSearchSkill('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-4">
                {/* Header with Match Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-white flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
                      {mentor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#1e1526]">{mentor.name}</h3>
                      <p className="text-2xs text-[#57495f] font-medium">{mentor.year}</p>
                      <p className="text-2xs font-mono text-[#6f6178] font-bold">{mentor.branch}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-[#147b37] bg-[#147b37]/15 px-2.5 py-1 rounded-full border border-[#147b37]/35">
                    {mentor.matchScore}% {t.sarthi.matchScore}
                  </span>
                </div>

                {/* Offer Callout */}
                {mentor.companyOffer && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#147b37]/15 border border-[#147b37]/35 text-2xs text-[#147b37] font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-[#147b37] shrink-0" />
                    <span>{mentor.companyOffer}</span>
                  </div>
                )}

                {/* Algorithmic Match Reason */}
                <div className="p-3.5 rounded-xl bg-[#f6eefb] border border-[#d9bef0] text-xs text-[#1e1526] space-y-1">
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-[#7c4bb0] block">
                    {t.sarthi.algorithmicReason}
                  </span>
                  <p className="leading-relaxed text-[#57495f]">{mentor.matchReason}</p>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#57495f] line-clamp-3 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-2xs bg-[#1e1526] text-[#eee3f7] px-2.5 py-0.5 rounded-full font-mono font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rating & Sessions */}
                <div className="flex items-center justify-between text-2xs text-[#57495f] pt-2 border-t border-[#d9bef0]/60">
                  <span className="flex items-center gap-1 text-[#7c4bb0] font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-[#7c4bb0] text-[#7c4bb0]" />
                    {mentor.rating} / 5.0
                  </span>
                  <span className="font-medium">
                    {mentor.totalSessions} {language === 'hi' ? 'सत्र पूर्ण' : 'sessions completed'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full"
                  onClick={() => handleStartBooking(mentor)}
                  rightIcon={<Calendar className="w-3.5 h-3.5" />}
                >
                  {t.sarthi.bookGuidance}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Form Modal in OCTA Style */}
      {bookingMentor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#eee3f7] rounded-[24px] shadow-2xl border border-[#d9bef0] max-w-lg w-full p-6 sm:p-7 space-y-5 text-[#1e1526]">
            <div className="flex items-center justify-between pb-3 border-b border-[#d9bef0]/60">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#7c4bb0]" />
                <h3 className="text-base font-extrabold text-[#1e1526] font-heading">
                  {t.sarthi.modalTitle} ({bookingMentor.name})
                </h3>
              </div>
              <button
                onClick={() => setBookingMentor(null)}
                className="p-1.5 text-[#57495f] hover:text-[#1e1526] hover:bg-[#d9bef0]/40 rounded-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#f6eefb] p-4 rounded-xl border border-[#d9bef0] text-xs">
              <p className="text-[#57495f] leading-relaxed">
                {t.sarthi.modalSub}
              </p>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.sarthi.timeSlotLabel}
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-2.5 text-[#1e1526] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                >
                  {bookingMentor.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.sarthi.topicLabel}
                </label>
                <input
                  type="text"
                  required
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  placeholder="e.g. Operating Systems Paging and Deadlock practice questions"
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-2.5 text-[#1e1526] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1e1526] mb-1">
                  {t.sarthi.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Share any GitHub repo links or questions you want your mentor to look into ahead of time..."
                  className="w-full text-xs rounded-xl border border-[#d9bef0] bg-white p-3 text-[#1e1526] placeholder:text-[#6f6178] focus:ring-2 focus:ring-[#7c4bb0] font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#d9bef0]/60">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookingMentor(null)}
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmittingBooking}
                >
                  {t.sarthi.confirmBooking}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
