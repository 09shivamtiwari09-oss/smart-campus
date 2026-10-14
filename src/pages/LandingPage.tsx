import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  SlidersHorizontal, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Mail, 
  Phone, 
  BrainCircuit, 
  BarChart3, 
  Target,
  Lock 
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { SegmentBadge } from '../components/common/SegmentBadge';
import { OctaCampusBentoGrid } from '../components/domain/OctaCampusBentoGrid';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col bg-[#0b0a0c] text-[#eee3f7] selection:bg-[#7c4bb0] selection:text-white">
      <SEO
        title="Predict, Optimize & Improve Student Success"
        description="Smart Campus Analytics moves beyond passive dashboards to convert student telemetry into explainable drivers, actionable segmentation, and peer interventions."
      />

      {/* Institutional Hero Section with OCTA Canvas */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-white/10">
        {/* Ambient radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[160px] opacity-25"
          style={{ background: 'radial-gradient(circle, #a06cd5, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-44 h-[560px] w-[560px] rounded-full blur-[170px] opacity-20"
          style={{ background: 'radial-gradient(circle, #7c4bb0, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-semibold text-[#b78ce0] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.landing.heroTag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {t.landing.heroHeading} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9bef0] via-[#b78ce0] to-[#7c4bb0]">
                {t.landing.heroGradient}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#aaa1b2] leading-relaxed max-w-2xl">
              {t.landing.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  <NavLink to="/bento">
                    <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {t.nav.bento}
                    </Button>
                  </NavLink>
                  {user.role === 'student' && (
                    <>
                      <NavLink to="/student">
                        <Button size="lg" variant="secondary">
                          {t.nav.student}
                        </Button>
                      </NavLink>
                      <NavLink to="/simulator">
                        <Button size="lg" variant="outline" className="border-[#b78ce0]/50 text-white hover:bg-white/10">
                          {t.landing.whatIfBtn}
                        </Button>
                      </NavLink>
                    </>
                  )}
                  {user.role === 'faculty' && (
                    <NavLink to="/teacher">
                      <Button size="lg" variant="secondary">
                        {t.nav.teacher}
                      </Button>
                    </NavLink>
                  )}
                  {user.role === 'admin' && (
                    <NavLink to="/admin">
                      <Button size="lg" variant="secondary">
                        {t.nav.admin}
                      </Button>
                    </NavLink>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/login?portal=student">
                    <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {t.portal.studentPortal}
                    </Button>
                  </NavLink>
                  <NavLink to="/login?portal=faculty">
                    <Button size="lg" variant="outline" className="border-[#b78ce0]/50 text-white hover:bg-white/10">
                      {t.portal.facultyPortal}
                    </Button>
                  </NavLink>
                  <NavLink to="/login?portal=admin">
                    <Button size="lg" variant="secondary">
                      {t.portal.adminPortal}
                    </Button>
                  </NavLink>
                </>
              )}
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs text-[#aaa1b2]">
              <div className="bg-[#1e1526]/50 p-4 rounded-xl border border-white/5">
                <span className="block text-2xl font-extrabold font-mono text-white">0–100</span>
                <span className="text-[#6f6178] mt-1 block">{t.landing.explainableScoreKpi}</span>
              </div>
              <div className="bg-[#1e1526]/50 p-4 rounded-xl border border-white/5">
                <span className="block text-2xl font-extrabold font-mono text-[#147b37]">5 Distinct</span>
                <span className="text-[#6f6178] mt-1 block">{t.landing.distinctSegmentsKpi}</span>
              </div>
              <div className="bg-[#1e1526]/50 p-4 rounded-xl border border-white/5">
                <span className="block text-2xl font-extrabold font-mono text-[#b78ce0]">14 Signals</span>
                <span className="text-[#6f6178] mt-1 block">{t.landing.signalsKpi}</span>
              </div>
              <div className="bg-[#1e1526]/50 p-4 rounded-xl border border-white/5">
                <span className="block text-2xl font-extrabold font-mono text-white">99.1%</span>
                <span className="text-[#6f6178] mt-1 block">{t.landing.auditedFairnessKpi}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Living Telemetry Bento Grid Section */}
      <section className="py-8 sm:py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OctaCampusBentoGrid />
        </div>
      </section>

      {/* Who It's For (Three Roles Architecture) */}
      <section className="py-16 sm:py-20 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-semibold text-[#b78ce0] mb-3">
              <Users className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.landing.threePersonasTag}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              {t.landing.threePersonasTitle}
            </h3>
            <p className="text-sm text-[#aaa1b2] mt-3 leading-relaxed">
              {t.landing.threePersonasSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Role */}
            <Card className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-[#b78ce0] flex items-center justify-center font-bold shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-[#1e1526]">{t.landing.studentPersonaTitle}</h4>
                  <p className="text-xs text-[#57495f] mt-1">{t.landing.studentPersonaSub}</p>
                </div>
                <p className="text-xs text-[#57495f] leading-relaxed">
                  {language === 'hi' 
                    ? 'सटीक समझें कि आपका स्कोर क्यों बदला। अपने शीर्ष सकारात्मक प्रेरक, अवरोधक कारक, साप्ताहिक पुनर्प्राप्ति रोडमैप और वरिष्ठ सारथी मेंटर्स के साथ मिलान देखें।'
                    : 'Understand exactly why your score moved. View your top positive drivers, drag factors, weekly recovery roadmap, and algorithmic matching with senior Sarthi mentors.'}
                </p>
                <ul className="space-y-2 text-xs text-[#1e1526] pt-3 border-t border-[#d9bef0]/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? '0–100 व्याख्यात्मक स्कोर विवरण' : '0–100 Explainable Score breakdown'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'एआई-संश्लेषित साप्ताहिक कार्य रोडमैप' : 'AI-synthesized weekly action roadmap'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'अंग्रेज़ी एवं हिन्दी भाषा टॉगल' : 'English & Hindi language toggle'}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {isAuthenticated && user ? (
                  user.role === 'student' ? (
                    <NavLink to="/student" className="block">
                      <Button variant="primary" size="sm" className="w-full">
                        {language === 'hi' ? 'छात्र हब खोलें' : 'Open Student Hub'}
                      </Button>
                    </NavLink>
                  ) : (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-[#16111e] border border-white/10 text-center text-2xs font-bold text-[#ad3568] flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ad3568]" />
                      <span>{language === 'hi' ? 'प्रतिबंधित: छात्र खाता आवश्यक' : 'Restricted: Student Clearance Required'}</span>
                    </div>
                  )
                ) : (
                  <NavLink to="/login?portal=student" className="block">
                    <Button variant="secondary" size="sm" className="w-full">
                      {language === 'hi' ? 'छात्र लॉगिन पोर्टल' : 'Enter Student Portal'}
                    </Button>
                  </NavLink>
                )}
              </div>
            </Card>

            {/* Faculty Role */}
            <Card className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-[#147b37] flex items-center justify-center font-bold shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-[#1e1526]">{t.landing.facultyPersonaTitle}</h4>
                  <p className="text-xs text-[#57495f] mt-1">{t.landing.facultyPersonaSub}</p>
                </div>
                <p className="text-xs text-[#57495f] leading-relaxed">
                  {language === 'hi'
                    ? 'सैकड़ों पंक्तियों को छांटने की आवश्यकता नहीं। स्वचालित ट्राइएज आज बात करने के लिए शीर्ष 5 छात्रों को उजागर करता है और प्रत्येक समूह खंड के लिए अनुकूलित कार्य योजनाओं का सुझाव देता है।'
                    : 'No more sifting through hundreds of rows. The automated triage highlights the top 5 students to speak with today and suggests tailored action plans per cohort segment.'}
                </p>
                <ul className="space-y-2 text-xs text-[#1e1526] pt-3 border-t border-[#d9bef0]/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'जोखिम-रैंक प्राथमिकता सूची' : 'Risk-ranked priority roster'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? '"आज बात करने हेतु 5 छात्र" ब्रीफ' : '"5 Students to Talk to Today" brief'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? '1-क्लिक हस्तक्षेप ऑडिट लॉगिंग' : '1-click intervention audit logging'}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {isAuthenticated && user ? (
                  user.role === 'faculty' ? (
                    <NavLink to="/teacher" className="block">
                      <Button variant="primary" size="sm" className="w-full">
                        {language === 'hi' ? 'शिक्षक कंसोल खोलें' : 'Open Faculty Console'}
                      </Button>
                    </NavLink>
                  ) : (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-[#16111e] border border-white/10 text-center text-2xs font-bold text-[#ad3568] flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ad3568]" />
                      <span>{language === 'hi' ? 'प्रतिबंधित: संकाय खाता आवश्यक' : 'Restricted: Faculty Clearance Required'}</span>
                    </div>
                  )
                ) : (
                  <NavLink to="/login?portal=faculty" className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      {language === 'hi' ? 'शिक्षक लॉगिन पोर्टल' : 'Enter Faculty Portal'}
                    </Button>
                  </NavLink>
                )}
              </div>
            </Card>

            {/* Admin Role */}
            <Card className="flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-[#b78ce0] flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-[#1e1526]">{t.landing.adminPersonaTitle}</h4>
                  <p className="text-xs text-[#57495f] mt-1">{t.landing.adminPersonaSub}</p>
                </div>
                <p className="text-xs text-[#57495f] leading-relaxed">
                  {language === 'hi'
                    ? 'मैक्रो-स्तरीय विभाग प्रक्षेपवक्र की समीक्षा करें, हस्तक्षेप से पहले और बाद में सुधार दरों को मापें, और विभिन्न समूहों में एल्गोरिथम जनसांख्यिकीय निष्पक्षता को सत्यापित करें।'
                    : 'Review macro-level department trajectories, quantify pre- and post-intervention turnaround rates, and verify algorithm demographic fairness across cohorts.'}
                </p>
                <ul className="space-y-2 text-xs text-[#1e1526] pt-3 border-t border-[#d9bef0]/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'विभाग एवं बैच बेंचमार्क वक्र' : 'Department & batch benchmark curves'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'हस्तक्षेप टर्नअराउंड आरओआई ट्रैकिंग' : 'Intervention turnaround ROI tracking'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0" />
                    <span>{language === 'hi' ? 'व्यापक जनसांख्यिकीय समानता ऑडिट' : 'Comprehensive demographic parity audit'}</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {isAuthenticated && user ? (
                  user.role === 'admin' ? (
                    <NavLink to="/admin" className="block">
                      <Button variant="primary" size="sm" className="w-full">
                        {language === 'hi' ? 'एडमिन ओवरव्यू खोलें' : 'Open Admin Overview'}
                      </Button>
                    </NavLink>
                  ) : (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-[#16111e] border border-white/10 text-center text-2xs font-bold text-[#ad3568] flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ad3568]" />
                      <span>{language === 'hi' ? 'प्रतिबंधित: डीन / प्रशासन खाता आवश्यक' : 'Restricted: Admin Clearance Required'}</span>
                    </div>
                  )
                ) : (
                  <NavLink to="/login?portal=admin" className="block">
                    <Button variant="secondary" size="sm" className="w-full">
                      {language === 'hi' ? 'एडमिन लॉगिन पोर्टल' : 'Enter Admin Portal'}
                    </Button>
                  </NavLink>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Segmentation Section */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-semibold text-[#b78ce0] mb-3">
              <Target className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.landing.segmentationTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              {t.landing.segmentationTitle}
            </h2>
            <p className="text-sm text-[#aaa1b2] mt-2 leading-relaxed">
              {t.landing.segmentationSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-[#eee3f7] p-6 rounded-[20px] border border-[#d9bef0] space-y-3 text-[#1e1526] hover:-translate-y-1 transition-transform">
              <SegmentBadge segment="High performers" />
              <h4 className="text-base font-extrabold text-[#1e1526] pt-1">
                {language === 'hi' ? 'उच्च प्रदर्शनकर्ता' : 'High Performers'}
              </h4>
              <p className="text-xs text-[#57495f] leading-relaxed">
                {language === 'hi'
                  ? 'सैद्धांतिक परीक्षाओं और व्यावहारिक प्रयोगशालाओं दोनों में विभागीय बेंचमार्क से लगातार आगे।'
                  : 'Consistently exceeding departmental benchmarks across theoretical exams and practical labs.'}
              </p>
              <p className="text-2xs text-[#147b37] bg-[#147b37]/15 p-2.5 rounded-xl font-bold border border-[#147b37]/30">
                {language === 'hi'
                  ? 'कार्रवाई: अनुसंधान फैलोशिप, उन्नत सम्मान ट्रैक और टीए पीयर ट्यूटरिंग के लिए नामांकित करें।'
                  : 'Action: Nominate for research fellowships, advanced honors tracks & TA peer tutoring.'}
              </p>
            </div>

            <div className="bg-[#eee3f7] p-6 rounded-[20px] border border-[#d9bef0] space-y-3 text-[#1e1526] hover:-translate-y-1 transition-transform">
              <SegmentBadge segment="Hidden potential" />
              <h4 className="text-base font-extrabold text-[#1e1526] pt-1">
                {language === 'hi' ? 'छिपी प्रतिभा' : 'Hidden Potential'}
              </h4>
              <p className="text-xs text-[#57495f] leading-relaxed">
                {language === 'hi'
                  ? 'मजबूत व्यावहारिक समस्या-समाधान क्षमता लेकिन लिखित थ्योरी या समय-प्रबंधन में अचानक अंतराल।'
                  : 'Strong practical problem-solving but experiencing a sudden gap in written theory or pacing.'}
              </p>
              <p className="text-2xs text-[#7c4bb0] bg-[#7c4bb0]/15 p-2.5 rounded-xl font-bold border border-[#7c4bb0]/30">
                {language === 'hi'
                  ? 'कार्रवाई: परीक्षा तैयारी रणनीतियों और अवधारणा सुदृढ़ीकरण के लिए वरिष्ठ सारथी मेंटर से जोड़ें।'
                  : 'Action: Pair with senior Sarthi mentor for exam prep strategies & concept reinforcement.'}
              </p>
            </div>

            <div className="bg-[#eee3f7] p-6 rounded-[20px] border border-[#d9bef0] space-y-3 text-[#1e1526] hover:-translate-y-1 transition-transform">
              <SegmentBadge segment="Steady but stuck" />
              <h4 className="text-base font-extrabold text-[#1e1526] pt-1">
                {language === 'hi' ? 'स्थिर पर अटके' : 'Steady but Stuck'}
              </h4>
              <p className="text-xs text-[#57495f] leading-relaxed">
                {language === 'hi'
                  ? 'मध्यम अंकों के साथ निरंतर उपस्थिति जो लगातार महीनों में स्थिर हो गई है।'
                  : 'Consistent attendance with moderate scores that have plateaued over consecutive months.'}
              </p>
              <p className="text-2xs text-[#54337d] bg-[#b48ede]/20 p-2.5 rounded-xl font-bold border border-[#b48ede]/40">
                {language === 'hi'
                  ? 'कार्रवाई: नैदानिक ​​कौशल मूल्यांकन, लक्षित कोडिंग स्प्रिंट और परियोजना-आधारित प्रोत्साहन।'
                  : 'Action: Diagnostic skills assessment, targeted coding sprints, and project-based stimulation.'}
              </p>
            </div>

            <div className="bg-[#eee3f7] p-6 rounded-[20px] border border-[#d9bef0] space-y-3 text-[#1e1526] hover:-translate-y-1 transition-transform">
              <SegmentBadge segment="At risk" />
              <h4 className="text-base font-extrabold text-[#1e1526] pt-1">
                {language === 'hi' ? 'जोखिम में' : 'At Risk'}
              </h4>
              <p className="text-xs text-[#57495f] leading-relaxed">
                {language === 'hi'
                  ? 'एकाधिक मिश्रित खतरे: कम उपस्थिति, छूटी हुई लैब प्रस्तुतियाँ और स्कोर गिरावट।'
                  : 'Multiple compounding flags: low attendance, missing lab submissions, and score degradation.'}
              </p>
              <p className="text-2xs text-[#ad3568] bg-[#ad3568]/15 p-2.5 rounded-xl font-bold border border-[#ad3568]/30">
                {language === 'hi'
                  ? 'कार्रवाई: तत्काल शिक्षक 1-ऑन-1, सहकर्मी अध्ययन समूह आवंटन, और औपचारिक उपस्थिति वसूली अनुबंध।'
                  : 'Action: Immediate faculty 1-on-1, peer study group assignment, and formal attendance recovery contract.'}
              </p>
            </div>

            <div className="bg-[#eee3f7] p-6 rounded-[20px] border border-[#d9bef0] space-y-3 text-[#1e1526] hover:-translate-y-1 transition-transform">
              <SegmentBadge segment="Placement-ready" />
              <h4 className="text-base font-extrabold text-[#1e1526] pt-1">
                {language === 'hi' ? 'प्लेसमेंट-तैयार' : 'Placement-Ready'}
              </h4>
              <p className="text-xs text-[#57495f] leading-relaxed">
                {language === 'hi'
                  ? 'मजबूत डीएसए समस्या समाधान, पूर्ण कैपस्टोन परियोजनाएं और उच्च व्यावहारिक निरंतरता।'
                  : 'Strong DSA problem solving, completed capstone projects, and high behavioral consistency.'}
              </p>
              <p className="text-2xs text-[#0D9488] bg-[#0D9488]/15 p-2.5 rounded-xl font-bold border border-[#0D9488]/30">
                {language === 'hi'
                  ? 'कार्रवाई: कैंपस भर्ती ड्राइव, मॉक तकनीकी साक्षात्कार और बायोडाटा समीक्षा के लिए त्वरित ट्रैकिंग।'
                  : 'Action: Fast-track to campus recruitment drives, mock technical interviews, and resume reviews.'}
              </p>
            </div>

            <div className="bg-[#16111e] p-6 rounded-[20px] border border-[#a06cd5]/30 space-y-3 text-[#eee3f7] flex flex-col justify-between">
              <div>
                <span className="text-2xs uppercase tracking-wider font-bold text-[#b78ce0]">
                  {language === 'hi' ? 'इंटरैक्टिव पूर्वावलोकन' : 'Interactive Preview'}
                </span>
                <h4 className="text-base font-extrabold text-white mt-1">
                  {language === 'hi' ? 'वास्तविक समय में परिदृश्यों का परीक्षण करें' : 'Test Scenarios in Real Time'}
                </h4>
                <p className="text-xs text-[#aaa1b2] mt-2 leading-relaxed">
                  {language === 'hi'
                    ? 'यह देखने के लिए हमारे सिम्युलेटर का उपयोग करें कि 5% अधिक उपस्थिति या 2 अतिरिक्त कोडिंग घंटे छात्र को समूहों के बीच कैसे ले जाते हैं।'
                    : 'Use our behavioral simulator to see how 5% more attendance or 2 extra coding hours moves a student between cohorts.'}
                </p>
              </div>
              <NavLink to="/simulator" className="pt-3">
                <Button variant="primary" size="sm" className="w-full">
                  {t.landing.whatIfBtn}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Contact Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#16111e] rounded-[24px] border border-[#a06cd5]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/40 text-xs font-semibold text-[#b78ce0]">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>{t.landing.specsTag}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                  {t.landing.specsTitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#aaa1b2] leading-relaxed">
                  {t.landing.specsSubtitle}
                </p>

                {/* Direct Contact Lockup */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1e1526] border border-[#a06cd5]/30 text-[#b78ce0] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-2xs text-[#6f6178] uppercase tracking-wider font-bold">
                        {language === 'hi' ? 'संस्थागत समन्वय डेस्क' : 'Institutional Coordination Desk'}
                      </span>
                      <a
                        href="mailto:09shivamtiwari09@gmail.com"
                        className="text-base sm:text-lg font-mono font-bold text-white hover:text-[#b78ce0] hover:underline break-all"
                      >
                        09shivamtiwari09@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1e1526] border border-[#147b37]/30 text-[#147b37] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-2xs text-[#6f6178] uppercase tracking-wider font-bold">
                        {language === 'hi' ? 'सीधा टेलीफोन संपर्क (मोबाइल तैयार)' : 'Direct Telephone Support (Mobile Ready)'}
                      </span>
                      <a
                        href="tel:+918934060356"
                        className="text-base sm:text-lg font-mono font-bold text-white hover:text-[#147b37] hover:underline"
                      >
                        +91 89340 60356
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Specifications Card */}
              <div className="bg-[#eee3f7] p-6 sm:p-8 rounded-[20px] border border-[#d9bef0] text-xs text-[#1e1526] space-y-4 shadow-lg">
                <h4 className="text-sm font-extrabold text-[#1e1526] uppercase tracking-wider">
                  {t.landing.specsCardTitle}
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0 mt-0.5" />
                    <span><strong>Frontend:</strong> React 18, Vite, Tailwind CSS, Lucide icons, Recharts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0 mt-0.5" />
                    <span><strong>Backend Integration:</strong> Single data-service layer with companion FastAPI endpoints</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0 mt-0.5" />
                    <span><strong>Explainable AI:</strong> Deterministic SHAP-style attribution for positive & negative drivers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0 mt-0.5" />
                    <span><strong>Localization:</strong> Native English & Hindi context switcher</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#147b37] shrink-0 mt-0.5" />
                    <span><strong>Proctoring Engine:</strong> Webcam face-mesh tracking, live auto-detect decibel acoustic microphone & canary questions</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d9bef0]/60 flex flex-wrap gap-2">
                  {isAuthenticated && user ? (
                    user.role === 'student' ? (
                      <NavLink to="/student">
                        <Button size="sm" variant="primary">{t.landing.exploreStudentBtn}</Button>
                      </NavLink>
                    ) : user.role === 'faculty' ? (
                      <NavLink to="/teacher">
                        <Button size="sm" variant="primary">{t.landing.facultyConsoleBtn}</Button>
                      </NavLink>
                    ) : (
                      <NavLink to="/admin">
                        <Button size="sm" variant="primary">{t.nav.admin}</Button>
                      </NavLink>
                    )
                  ) : (
                    <NavLink to="/login">
                      <Button size="sm" variant="primary">{t.nav.login}</Button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
