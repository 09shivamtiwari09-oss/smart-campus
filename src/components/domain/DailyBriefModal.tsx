import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { X, PhoneCall, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';
import { SegmentBadge } from '../common/SegmentBadge';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface DailyBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
}

export const DailyBriefModal: React.FC<DailyBriefModalProps> = ({
  isOpen,
  onClose,
  students,
}) => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();
  const [completedOutreach, setCompletedOutreach] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // The 5 students requiring highest priority attention today
  const top5Students = students
    .slice()
    .sort((a, b) => a.riskRank - b.riskRank)
    .slice(0, 5);

  const handleMarkDone = (id: string, name: string) => {
    setCompletedOutreach((prev) => ({ ...prev, [id]: true }));
    addToast(
      'success',
      language === 'hi' ? 'संपर्क दर्ज किया गया' : 'Outreach Logged',
      language === 'hi' ? `${name} के लिए कार्रवाई दर्ज की गई।` : `Action logged for ${name}. Department audit trail updated.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#eee3f7] rounded-[24px] shadow-2xl border border-[#d9bef0] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1e1526]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#d9bef0]/60 bg-[#f6eefb]/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#ad3568]/15 text-[#ad3568] rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-extrabold text-[#1e1526] font-heading">
                {t.teacher.dailyBriefTitle}
              </h2>
            </div>
            <p className="text-xs text-[#57495f] mt-1">
              {t.teacher.dailyBriefSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#57495f] hover:text-[#1e1526] hover:bg-[#d9bef0]/40 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-4">
          {top5Students.map((student, idx) => {
            const isDone = !!completedOutreach[student.id];

            return (
              <div
                key={student.id}
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-[#f6eefb]/60 border-[#d9bef0]/50 opacity-70'
                    : 'bg-white/80 border-[#d9bef0] hover:border-[#7c4bb0] shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1e1526] text-white text-xs font-bold flex items-center justify-center font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1e1526]">{student.name}</h3>
                    <span className="text-xs font-mono text-[#57495f]">({student.rollNo})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SegmentBadge segment={student.segment} size="sm" />
                    <span className="text-xs font-mono font-bold text-[#ad3568] bg-[#ad3568]/10 px-2 py-0.5 rounded-full border border-[#ad3568]/30">
                      Score: {student.successScore}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#57495f] mb-3">
                  <p>
                    <strong className="text-[#1e1526]">{language === 'hi' ? 'प्राथमिक फ्लैग:' : 'Primary Flag:'}</strong>{' '}
                    {student.flagReasons[0] || (language === 'hi' ? 'अनियमित उपस्थिति चेकपॉइंट।' : 'Irregular attendance checkpoint.')}
                  </p>
                  <p className="text-[#4a2e6f] bg-[#f6eefb] p-2.5 rounded-lg border border-[#d9bef0]">
                    <strong className="text-[#1e1526]">{t.teacher.suggestedAction}:</strong>{' '}
                    {student.suggestedAction}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#d9bef0]/50">
                  <div className="flex items-center gap-3 text-xs">
                    <a
                      href={`mailto:${student.email}`}
                      className="inline-flex items-center gap-1 text-[#57495f] hover:text-[#7c4bb0] font-medium"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#7c4bb0]" />
                      Email
                    </a>
                    <a
                      href={`tel:${student.phone}`}
                      className="inline-flex items-center gap-1 text-[#57495f] hover:text-[#7c4bb0] font-mono"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#147b37]" />
                      {student.phone}
                    </a>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#147b37] bg-[#147b37]/15 px-3 py-1 rounded-full border border-[#147b37]/30">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.teacher.outreachDone}
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleMarkDone(student.id, student.name)}
                    >
                      {t.teacher.markContacted}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#d9bef0]/60 bg-[#f6eefb]/70 flex items-center justify-between text-xs text-[#57495f]">
          <span className="font-medium">
            {language === 'hi' 
              ? `आज 5 में से ${Object.keys(completedOutreach).length} छात्रों से संपर्क किया गया` 
              : `${Object.keys(completedOutreach).length} of 5 students contacted today`}
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t.teacher.closeBrief}
          </Button>
        </div>
      </div>
    </div>
  );
};
