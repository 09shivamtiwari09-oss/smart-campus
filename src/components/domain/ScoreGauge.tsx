import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ScoreGaugeProps {
  score: number;
  previousScore?: number;
  riskLevel?: 'Critical' | 'Moderate' | 'Low';
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  previousScore,
  riskLevel = 'Moderate',
  size = 'lg',
}) => {
  const { language } = useLanguage();
  const delta = previousScore !== undefined ? score - previousScore : 0;

  // Semantic color based on institutional performance tiers
  let colorClass = 'text-[#7c4bb0] border-[#7c4bb0] bg-[#7c4bb0]/10';
  let badgeColor = 'bg-[#7c4bb0]/15 text-[#7c4bb0] border-[#7c4bb0]/35';
  let statusText = language === 'hi' ? 'सतत प्रगति' : 'Steady Progress';

  if (score >= 85) {
    colorClass = 'text-[#147b37] border-[#147b37] bg-[#147b37]/10';
    badgeColor = 'bg-[#147b37]/15 text-[#147b37] border-[#147b37]/35';
    statusText = language === 'hi' ? 'शैक्षणिक विशिष्टता' : 'Academic Distinction';
  } else if (score >= 70) {
    colorClass = 'text-[#7c4bb0] border-[#7c4bb0] bg-[#7c4bb0]/10';
    badgeColor = 'bg-[#7c4bb0]/15 text-[#7c4bb0] border-[#7c4bb0]/35';
    statusText = language === 'hi' ? 'सतत प्रगति' : 'Steady Progress';
  } else if (score >= 55) {
    colorClass = 'text-[#ad3568] border-[#ad3568] bg-[#ad3568]/10';
    badgeColor = 'bg-[#ad3568]/15 text-[#ad3568] border-[#ad3568]/35';
    statusText = language === 'hi' ? 'ध्यान देने की आवश्यकता' : 'Needs Attention';
  } else {
    colorClass = 'text-[#ad3568] border-[#ad3568] bg-[#ad3568]/15';
    badgeColor = 'bg-[#ad3568]/20 text-[#ad3568] border-[#ad3568]/40';
    statusText = language === 'hi' ? 'उच्च हस्तक्षेप आवश्यक' : 'High Intervention Required';
  }

  // Size dimensions
  const circleDimensions = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-32 h-32 text-4xl',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
      <div
        className={`relative flex items-center justify-center rounded-full border-4 font-mono font-extrabold tracking-tight shadow-md shrink-0 ${circleDimensions[size]} ${colorClass}`}
        aria-label={`Success score: ${score} out of 100`}
      >
        <span className="tabular-nums">{score}</span>
        <span className="text-2xs font-bold text-[#6f6178] absolute bottom-2">/100</span>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
            {riskLevel === 'Low' ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            {statusText}
          </span>

          {previousScore !== undefined && (
            <span
              className={`inline-flex items-center text-xs font-bold font-mono tabular-nums ${
                delta > 0
                  ? 'text-[#147b37]'
                  : delta < 0
                  ? 'text-[#ad3568]'
                  : 'text-[#6f6178]'
              }`}
            >
              {delta > 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : delta < 0 ? (
                <ArrowDownRight className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              {delta > 0 ? `+${delta}` : delta} {language === 'hi' ? 'अंक (पिछले महीने से)' : 'pts from last month'}
            </span>
          )}
        </div>

        <p className="text-xs text-[#57495f] leading-relaxed max-w-sm">
          {language === 'hi' 
            ? 'प्रयोगशाला दक्षता, कोड कमिट और व्याख्यान निरंतरता के 14 टेलीमेट्री चेकपॉइंट्स पर एनसेंबल मॉडल द्वारा गणना।' 
            : 'Calculated by ensemble XGBoost + Random Forest on 14 continuous telemetry checkpoints across lab mastery, code commits, and lecture pacing.'}
        </p>
      </div>
    </div>
  );
};
