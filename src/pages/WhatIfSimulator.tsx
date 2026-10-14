import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SegmentBadge } from '../components/common/SegmentBadge';
import { ExplainableDriverChart } from '../components/domain/ExplainableDriverChart';
import { useLanguage } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { SimulatorResult } from '../types';

export const WhatIfSimulator: React.FC = () => {
  const { t, language } = useLanguage();

  // Baseline input values matching Aarav Sharma
  const defaultParams = {
    attendance: 79,
    assignments: 92,
    projects: 3,
    codingPractice: 7.5,
  };

  const [attendance, setAttendance] = useState(defaultParams.attendance);
  const [assignments, setAssignments] = useState(defaultParams.assignments);
  const [projects, setProjects] = useState(defaultParams.projects);
  const [codingPractice, setCodingPractice] = useState(defaultParams.codingPractice);

  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    try {
      setLoading(true);
      const res = await apiService.simulateWhatIf({
        attendance,
        assignments,
        projects,
        codingPractice,
      });
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  // Run simulation on mount and when sliders change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation();
    }, 150);
    return () => clearTimeout(timer);
  }, [attendance, assignments, projects, codingPractice]);

  const applyPreset = (preset: { att: number; ass: number; proj: number; code: number }) => {
    setAttendance(preset.att);
    setAssignments(preset.ass);
    setProjects(preset.proj);
    setCodingPractice(preset.code);
  };

  return (
    <PageContainer
      title={t.simulator.title}
      subtitle={t.simulator.subtitle}
      badge={
        <span className="text-2xs font-mono bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 px-3 py-1 rounded-full font-bold">
          {language === 'hi' ? 'भविष्यसूचक निर्णय आसूचना' : 'Predictive Decision Intelligence'}
        </span>
      }
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            applyPreset({
              att: defaultParams.attendance,
              ass: defaultParams.assignments,
              proj: defaultParams.projects,
              code: defaultParams.codingPractice,
            })
          }
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          {t.simulator.resetBaseline}
        </Button>
      }
    >
      <SEO
        title="What-If Success Simulator"
        description="Tune attendance, assignments, and coding hours to preview model-projected success score and segment transitions."
      />

      {/* Preset Quick Actions in OCTA pill container */}
      <div className="flex flex-wrap items-center gap-2 p-3.5 bg-[#f6eefb] border border-[#d9bef0] rounded-[18px] text-xs">
        <span className="font-extrabold text-[#1e1526] uppercase tracking-wider text-2xs mr-1">
          {t.simulator.presets}
        </span>
        <button
          onClick={() => applyPreset({ att: 95, ass: 100, proj: 5, code: 12 })}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#147b37]/15 hover:text-[#147b37] border border-[#d9bef0] text-[#1e1526] font-bold transition-all"
        >
          {t.simulator.presetSurge}
        </button>
        <button
          onClick={() => applyPreset({ att: 58, ass: 50, proj: 1, code: 2 })}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#ad3568]/15 hover:text-[#ad3568] border border-[#d9bef0] text-[#1e1526] font-bold transition-all"
        >
          {t.simulator.presetBurnout}
        </button>
        <button
          onClick={() => applyPreset({ att: 88, ass: 95, proj: 3, code: 8 })}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#7c4bb0]/15 hover:text-[#7c4bb0] border border-[#d9bef0] text-[#1e1526] font-bold transition-all"
        >
          {t.simulator.presetRecovery}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Console Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader
              title={language === 'hi' ? 'अकादमिक एवं व्यवहारिक टेलीमेट्री स्लाइडर' : 'Academic & Behavioral Telemetry Sliders'}
              subtitle={language === 'hi' ? 'इनपुट समायोजित करने के लिए स्लाइडर खींचें। मॉडल तुरंत पूर्वानुमान की गणना करता है।' : 'Drag the levers to adjust inputs. The XGBoost surrogate model recalculates predictions in real time.'}
            />

            <div className="pt-6 space-y-6">
              {/* Slider 1: Attendance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1e1526]">
                  <label htmlFor="att-slider" className="flex items-center gap-1.5">
                    <span>{t.simulator.attendanceLabel}</span>
                    <span className="text-2xs text-[#57495f] font-normal">({language === 'hi' ? 'भार: 35%' : 'Weight: 35%'})</span>
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#7c4bb0] bg-white px-2.5 py-0.5 rounded-full border border-[#d9bef0]">
                    {attendance}%
                  </span>
                </div>
                <input
                  id="att-slider"
                  type="range"
                  min="40"
                  max="100"
                  step="1"
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#f6eefb] rounded-lg appearance-none cursor-pointer accent-[#7c4bb0] border border-[#d9bef0]/60"
                />
                <div className="flex justify-between text-2xs text-[#57495f] font-mono">
                  <span className="text-[#ad3568] font-bold">40% ({language === 'hi' ? 'प्रतिबंध' : 'Debarment'})</span>
                  <span className="text-[#7c4bb0] font-bold">75% ({language === 'hi' ? 'अनिवार्य सीमा' : 'Mandatory Bar'})</span>
                  <span className="text-[#147b37] font-bold">100% ({language === 'hi' ? 'आदर्श' : 'Perfect'})</span>
                </div>
              </div>

              {/* Slider 2: Assignments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1e1526]">
                  <label htmlFor="ass-slider" className="flex items-center gap-1.5">
                    <span>{t.simulator.assignmentLabel}</span>
                    <span className="text-2xs text-[#57495f] font-normal">({language === 'hi' ? 'भार: 30%' : 'Weight: 30%'})</span>
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#7c4bb0] bg-white px-2.5 py-0.5 rounded-full border border-[#d9bef0]">
                    {assignments}%
                  </span>
                </div>
                <input
                  id="ass-slider"
                  type="range"
                  min="30"
                  max="100"
                  step="1"
                  value={assignments}
                  onChange={(e) => setAssignments(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#f6eefb] rounded-lg appearance-none cursor-pointer accent-[#7c4bb0] border border-[#d9bef0]/60"
                />
                <div className="flex justify-between text-2xs text-[#57495f] font-mono">
                  <span>30%</span>
                  <span>{language === 'hi' ? 'विभाग औसत: 80%' : 'Dept Avg: 80%'}</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Slider 3: Hands-on Projects */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1e1526]">
                  <label htmlFor="proj-slider" className="flex items-center gap-1.5">
                    <span>{t.simulator.projectsLabel}</span>
                    <span className="text-2xs text-[#57495f] font-normal">({language === 'hi' ? 'भार: 15%' : 'Weight: 15%'})</span>
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#7c4bb0] bg-white px-2.5 py-0.5 rounded-full border border-[#d9bef0]">
                    {projects} {language === 'hi' ? 'पूर्ण' : 'Completed'}
                  </span>
                </div>
                <input
                  id="proj-slider"
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={projects}
                  onChange={(e) => setProjects(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#f6eefb] rounded-lg appearance-none cursor-pointer accent-[#7c4bb0] border border-[#d9bef0]/60"
                />
                <div className="flex justify-between text-2xs text-[#57495f] font-mono">
                  <span>0 Projects</span>
                  <span>3 ({language === 'hi' ? 'अनुशंसित' : 'Recommended'})</span>
                  <span>6 Projects</span>
                </div>
              </div>

              {/* Slider 4: Weekly Coding Practice */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1e1526]">
                  <label htmlFor="code-slider" className="flex items-center gap-1.5">
                    <span>{t.simulator.codingPracticeLabel}</span>
                    <span className="text-2xs text-[#57495f] font-normal">({language === 'hi' ? 'भार: 20%' : 'Weight: 20%'})</span>
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#7c4bb0] bg-white px-2.5 py-0.5 rounded-full border border-[#d9bef0]">
                    {codingPractice} {language === 'hi' ? 'घंटे / सप्ताह' : 'Hours / Wk'}
                  </span>
                </div>
                <input
                  id="code-slider"
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={codingPractice}
                  onChange={(e) => setCodingPractice(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#f6eefb] rounded-lg appearance-none cursor-pointer accent-[#7c4bb0] border border-[#d9bef0]/60"
                />
                <div className="flex justify-between text-2xs text-[#57495f] font-mono">
                  <span>0 hrs</span>
                  <span>7.5 hrs ({language === 'hi' ? 'वर्तमान' : 'Current'})</span>
                  <span>15 hrs ({language === 'hi' ? 'गहन' : 'Intensive'})</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Prediction Results Column (5 Cols) in OCTA Bento Tile */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="dark">
            <CardHeader
              title={t.simulator.forecastedScore}
              subtitle={language === 'hi' ? 'समायोजित इनपुट वेक्टर के आधार पर अनुमानित समग्र स्कोर' : 'Projected composite based on adjusted input vector'}
              isDark={true}
              badge={
                result ? (
                  <SegmentBadge segment={result.predictedSegment} size="sm" />
                ) : null
              }
            />

            {result ? (
              <div className="pt-6 space-y-5">
                {/* Score Big Display */}
                <div className="flex items-center justify-between bg-[#1e1526] p-5 rounded-[18px] border border-[#a06cd5]/30">
                  <div>
                    <span className="text-2xs uppercase tracking-wider text-[#aaa1b2] font-bold block">
                      {language === 'hi' ? 'अनुमानित समग्र' : 'Forecasted Composite'}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-5xl font-mono font-extrabold text-white">
                        {result.predictedScore}
                      </span>
                      <span className="text-sm font-mono text-[#aaa1b2]">/100</span>
                    </div>
                  </div>

                  {/* Delta Callout */}
                  <div
                    className={`flex flex-col items-end px-4 py-2.5 rounded-xl font-mono font-extrabold text-sm border ${
                      result.delta > 0
                        ? 'bg-[#147b37]/20 border-[#147b37]/40 text-[#147b37]'
                        : result.delta < 0
                        ? 'bg-[#ad3568]/20 border-[#ad3568]/40 text-[#ad3568]'
                        : 'bg-[#1e1526] border-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {result.delta > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : result.delta < 0 ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <Minus className="w-4 h-4" />
                      )}
                      <span>
                        {result.delta > 0 ? `+${result.delta}` : result.delta} pts
                      </span>
                    </div>
                    <span className="text-2xs font-normal text-[#aaa1b2] mt-0.5">
                      vs. Base ({result.baseScore})
                    </span>
                  </div>
                </div>

                {/* AI Recommendation Message */}
                <div className="bg-[#1e1526] p-4 rounded-xl border border-[#a06cd5]/20 text-xs text-[#eee3f7] space-y-2">
                  <div className="flex items-center gap-2 text-[#b78ce0] font-extrabold uppercase tracking-wider text-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.simulator.decisionVerdict}</span>
                  </div>
                  <p className="leading-relaxed text-[#aaa1b2]">{result.recommendation}</p>
                </div>

                <div className="space-y-2 text-2xs text-[#aaa1b2] pt-3 border-t border-white/10 font-medium">
                  <div className="flex justify-between">
                    <span>{t.simulator.projectedRisk}:</span>
                    <strong className="text-white font-mono">{result.predictedRisk}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.simulator.projectedCohort}:</span>
                    <strong className="text-white font-mono">{result.predictedSegment}</strong>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </div>

      {/* Simulated Explainable Drivers Trace */}
      {result && (
        <Card>
          <CardHeader
            title={language === 'hi' ? 'सिम्युलेटेड परिदृश्य के तहत अनुमानित व्याख्यात्मक कारक' : 'Projected Explainable Drivers Under Simulated Scenario'}
            subtitle={language === 'hi' ? 'समझें कि प्रत्येक स्लाइडर समायोजन सकारात्मक प्रेरकों और ड्रैग कारकों को कैसे पुनर्गठित करता है' : 'Understand how each slider adjustment reweights the positive boosters and drag factors'}
          />
          <div className="pt-4">
            <ExplainableDriverChart drivers={result.projectedDrivers} />
          </div>
        </Card>
      )}
    </PageContainer>
  );
};
