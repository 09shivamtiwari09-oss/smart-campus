import React, { useState } from 'react';
import { ScoreDriver } from '../../types';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ExplainableDriverChartProps {
  drivers: ScoreDriver[];
}

export const ExplainableDriverChart: React.FC<ExplainableDriverChartProps> = ({ drivers }) => {
  const { t, language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const positiveDrivers = drivers.filter((d) => d.category === 'positive');
  const negativeDrivers = drivers.filter((d) => d.category === 'negative');

  // Max absolute impact for scaling
  const maxImpact = Math.max(...drivers.map((d) => Math.abs(d.impact)), 15);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 bg-[#f6eefb] border border-[#d9bef0] p-4 rounded-xl text-xs text-[#57495f]">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#7c4bb0] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#1e1526]">
              {language === 'hi' ? 'SHAP-विशेषता व्याख्यात्मकता:' : 'SHAP-Attributed Explainability:'}
            </strong>{' '}
            {language === 'hi'
              ? 'ये बार दर्शाते हैं कि प्रत्येक मीट्रिक ने कैंपस बेंचमार्क की तुलना में समग्र सफलता स्कोर में कैसे योगदान दिया। टेलीमेट्री ऑडिट देखने हेतु किसी भी ड्राइवर पर क्लिक करें।'
              : 'These bars illustrate exactly how each metric contributed to the composite Success Score relative to campus cohort benchmarks. Click any driver to inspect the telemetry audit trace.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positive Drivers Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#147b37]/30">
            <span className="p-1 rounded-lg bg-[#147b37]/15 text-[#147b37]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-extrabold text-[#147b37]">
              {language === 'hi' ? 'सकारात्मक प्रेरक (+ स्कोर वृद्धि)' : 'Key Value Drivers (+ Score Boost)'}
            </h4>
          </div>

          <div className="space-y-2.5">
            {positiveDrivers.map((driver, i) => {
              const widthPct = Math.min((Math.abs(driver.impact) / maxImpact) * 100, 100);
              const isExpanded = expandedIndex === i;

              return (
                <div
                  key={driver.factor}
                  onClick={() => toggleExpand(i)}
                  className="bg-white/80 border border-[#d9bef0] hover:border-[#147b37] rounded-xl p-3.5 transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#1e1526] truncate">
                      {driver.factor}
                    </span>
                    <span className="text-xs font-extrabold font-mono tabular-nums text-[#147b37] bg-[#147b37]/10 px-2 py-0.5 rounded-full border border-[#147b37]/30">
                      +{driver.impact} pts
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-[#f6eefb] h-2 rounded-full overflow-hidden mb-1.5 border border-[#d9bef0]/60">
                    <div
                      className="bg-[#147b37] h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-2xs text-[#57495f]">
                    <span>
                      {language === 'hi' ? 'अवलोकित:' : 'Observed:'}{' '}
                      <strong className="text-[#1e1526]">{driver.studentValue}</strong>
                    </span>
                    <span className="text-[#6f6178]">{driver.benchmark}</span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 pt-2 border-t border-[#d9bef0]/50 text-xs text-[#57495f] bg-[#f6eefb] p-2.5 rounded-lg">
                      <p>{driver.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Negative Drivers Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ad3568]/30">
            <span className="p-1 rounded-lg bg-[#ad3568]/15 text-[#ad3568]">
              <TrendingDown className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-extrabold text-[#ad3568]">
              {language === 'hi' ? 'जोखिम कारक (- अंक प्रभाव)' : 'Risk Drag Factors (- Points Impact)'}
            </h4>
          </div>

          <div className="space-y-2.5">
            {negativeDrivers.map((driver, i) => {
              const globalIdx = i + 100;
              const widthPct = Math.min((Math.abs(driver.impact) / maxImpact) * 100, 100);
              const isExpanded = expandedIndex === globalIdx;

              return (
                <div
                  key={driver.factor}
                  onClick={() => toggleExpand(globalIdx)}
                  className="bg-white/80 border border-[#d9bef0] hover:border-[#ad3568] rounded-xl p-3.5 transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#1e1526] truncate">
                      {driver.factor}
                    </span>
                    <span className="text-xs font-extrabold font-mono tabular-nums text-[#ad3568] bg-[#ad3568]/10 px-2 py-0.5 rounded-full border border-[#ad3568]/30">
                      {driver.impact} pts
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-[#f6eefb] h-2 rounded-full overflow-hidden mb-1.5 border border-[#d9bef0]/60">
                    <div
                      className="bg-[#ad3568] h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-2xs text-[#57495f]">
                    <span>
                      {language === 'hi' ? 'अवलोकित:' : 'Observed:'}{' '}
                      <strong className="text-[#1e1526]">{driver.studentValue}</strong>
                    </span>
                    <span className="text-[#6f6178]">{driver.benchmark}</span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 pt-2 border-t border-[#d9bef0]/50 text-xs text-[#57495f] bg-[#f6eefb] p-2.5 rounded-lg">
                      <p>{driver.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
