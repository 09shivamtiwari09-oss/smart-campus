import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const OctaCampusBentoGrid: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const getBentoLinks = () => {
    if (!isAuthenticated || !user) {
      return [{ to: '/login', label: t.nav.login }];
    }
    if (user.role === 'student') {
      return [
        { to: '/student', label: t.nav.student },
        { to: '/ai-advisor', label: t.nav.aiAdvisor },
        { to: '/assessment', label: t.nav.proctorTest },
        { to: '/internships', label: t.nav.internships },
        { to: '/simulator', label: t.nav.simulator },
      ];
    }
    if (user.role === 'faculty') {
      return [{ to: '/teacher', label: t.nav.teacher }];
    }
    return [{ to: '/admin', label: t.nav.admin }];
  };

  const bentoLinks = getBentoLinks();

  return (
    <div className="w-full bg-[#0b0a0c] text-[#1e1526] rounded-3xl p-4 sm:p-8 lg:p-10 my-8 shadow-2xl border border-white/5 relative overflow-hidden font-sans">
      {/* Background ambient radial glows */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[150px] opacity-20"
        style={{ background: 'radial-gradient(circle, #a06cd5, transparent 70%)' }}
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-[40%] -right-44 h-[560px] w-[560px] rounded-full blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #7c4bb0, transparent 70%)' }}
      />

      {/* Bento Header */}
      <div className="relative z-10 max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-semibold text-[#b78ce0] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#b78ce0]" />
          <span>{t.bento.systemTag}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {t.nav.brand} <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9bef0] via-[#b78ce0] to-[#7c4bb0]">
            {t.bento.headerTitle}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-[#aaa1b2] mt-2 leading-relaxed">
          {t.bento.headerSub}
        </p>
      </div>

      {/* Main Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1120px] mx-auto text-left">
        
        {/* CARD 1: Radial Progress Ring & Milestone Tile (c1 r1-2) */}
        <div className="bg-[#eee3f7] rounded-[20px] p-5 flex flex-col items-center text-center justify-between hover:-translate-y-1 transition-transform duration-250 lg:row-span-2 min-h-[310px]">
          <p className="text-[13px] font-bold text-[#1e1526] leading-snug">
            {language === 'hi' ? 'सत्र मील का पत्थर\nसमग्र प्रगति' : 'Semester Milestone\nOverall Progress'}
          </p>

          <div className="relative w-28 h-28 my-3">
            <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90" aria-hidden="true">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#241b2e" strokeWidth="9" />
              <circle 
                cx="56" 
                cy="56" 
                r="48" 
                fill="none" 
                stroke="#b78ce0" 
                strokeWidth="9" 
                strokeLinecap="round"
                strokeDasharray="218 302" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <b className="text-[20px] font-extrabold text-[#1e1526] font-mono">72%</b>
              <span className="text-[8px] text-[#6f6178] uppercase tracking-wider font-semibold">
                {t.common.inProgress}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[28px] font-extrabold tracking-tight text-[#1e1526] font-mono leading-none">
              3.2K
            </div>
            <p className="text-[10.5px] text-[#57495f] leading-snug mt-1.5">
              {language === 'hi' ? 'पिछले सेमेस्टर में 218 सत्यापित हस्तक्षेप' : '218 Verified Interventions in the past semester'}
            </p>
          </div>
        </div>

        {/* CARD 2: Case Views / Telemetry Points (c2 r1) */}
        <div className="bg-[#f6eefb] rounded-[20px] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-250 min-h-[150px]">
          <div className="text-[34px] sm:text-[38px] font-extrabold tracking-tight text-[#1e1526] font-mono flex items-start gap-2.5 leading-none">
            <span>5,214</span>
            <div className="w-4 h-4 rounded-full bg-[#1e1526] flex items-center justify-center text-white mt-1 shrink-0">
              <TrendingUp className="w-2.5 h-2.5 text-[#b78ce0]" />
            </div>
          </div>
          <p className="text-[12.5px] font-bold text-[#1e1526] leading-snug mt-2">
            {language === 'hi' ? 'दैनिक मूल्यांकन\nटेलीमेट्री संकेत' : 'Telemetry Signals\nEvaluated Daily'}
          </p>
        </div>

        {/* CARD 3: New Users / Cohort Turnaround (c3 r1) */}
        <div className="bg-[#f6eefb] rounded-[20px] p-5 flex flex-col items-end text-right justify-between hover:-translate-y-1 transition-transform duration-250 min-h-[150px]">
          <p className="text-[13px] font-semibold text-[#57495f]">
            {language === 'hi' ? 'सक्रिय छात्र' : 'Active Students'}
          </p>
          <div>
            <div className="text-[36px] sm:text-[42px] font-extrabold tracking-tight text-[#1e1526] font-mono leading-none">
              42K
            </div>
            <div className="text-[14px] font-bold text-[#147b37] mt-1 font-mono">
              +12% {language === 'hi' ? 'प्रतिधारण' : 'Retained'}
            </div>
          </div>
        </div>

        {/* CARD 4: Senior Team & Mentors (c4 r1-2) */}
        <div className="bg-[#eee3f7] rounded-[20px] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-250 relative overflow-hidden lg:row-span-2 min-h-[310px]">
          <div>
            <h3 className="text-[16px] font-bold text-[#1e1526] leading-snug">
              {t.bento.mentorsCrew}
            </h3>
            
            {/* Avatars row */}
            <div className="flex items-center my-4">
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-gradient-to-tr from-[#f0c9a8] to-[#c98d5a] shrink-0" />
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-gradient-to-tr from-[#5c4a6e] to-[#2e2438] -ml-2 shrink-0" />
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-gradient-to-tr from-[#e8b4c8] to-[#b06a8a] -ml-2 shrink-0" />
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-gradient-to-tr from-[#b9d0e8] to-[#6e8fb4] -ml-2 shrink-0" />
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-gradient-to-tr from-[#d6c2ef] to-[#9a72c8] -ml-2 shrink-0" />
              <span className="w-8 h-8 rounded-full border-2 border-[#eee3f7] bg-[#dccbeb] text-[#57495f] text-[10px] font-bold flex items-center justify-center -ml-2 shrink-0 font-mono">
                +8
              </span>
            </div>
          </div>

          <div>
            <p className="text-[14px] font-bold text-[#1e1526] leading-tight">
              {language === 'hi' ? 'साप्ताहिक 1-ऑन-1\nसारथी क्लीनिक' : 'Weekly 1-on-1\nSarthi Clinics'}
            </p>
            <div className="text-[34px] font-extrabold tracking-tight text-[#1e1526] font-mono mt-1 leading-none">
              38
            </div>
            <div className="text-[13px] font-bold text-[#ad3568] mt-1 font-mono">
              +34% {language === 'hi' ? 'वृद्धि' : 'Growth'}
            </div>
          </div>

          {/* Chrome Spring SVG decorative graphic */}
          <svg className="absolute -right-6 bottom-4 w-24 h-36 pointer-events-none opacity-40" viewBox="0 0 104 170" aria-hidden="true">
            <defs>
              <linearGradient id="chromeOcta" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fafafa" />
                <stop offset="0.4" stopColor="#9c9ca2" />
                <stop offset="0.6" stopColor="#e8e8ec" />
                <stop offset="1" stopColor="#77777d" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#chromeOcta)" strokeWidth="11" strokeLinecap="round">
              <path d="M18 22 C50 8 92 14 96 30" />
              <path d="M14 52 C48 36 94 44 98 60" />
              <path d="M12 82 C46 66 94 74 100 90" />
              <path d="M14 112 C48 96 94 104 98 120" />
              <path d="M18 142 C50 126 92 134 96 150" />
            </g>
          </svg>
        </div>

        {/* CARD 5: Center Figure + Telemetry Chips (c2-3 r2-3) */}
        <div className="bg-gradient-to-br from-[#e3d2f2] to-[#eee3f7] rounded-[20px] p-4 relative overflow-hidden md:col-span-2 lg:col-span-2 min-h-[290px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-250">
          {/* Subtle Halo */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, #dcc6f0 0%, rgba(220,198,240,0) 72%)' }}
          />

          {/* Center Figure Graphic */}
          <svg className="h-56 w-auto max-w-full drop-shadow-md" viewBox="0 0 260 300" aria-hidden="true">
            <defs>
              <linearGradient id="octaFigbody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b48ede" />
                <stop offset="1" stopColor="#7c4bb0" />
              </linearGradient>
              <linearGradient id="octaFighair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3d2f4c" />
                <stop offset="1" stopColor="#241b2e" />
              </linearGradient>
            </defs>
            <circle cx="130" cy="64" r="52" fill="url(#octaFighair)" />
            <circle cx="130" cy="78" r="30" fill="#d9bef0" />
            <path d="M86 116 C100 104 160 104 174 116 C182 122 182 136 172 140 L88 140 C78 136 78 122 86 116 Z" fill="#cfaee9" />
            <path d="M62 300 C60 210 84 152 130 152 C176 152 200 210 198 300 Z" fill="url(#octaFigbody)" />
            <path d="M78 200 C86 230 106 246 128 248 L128 262 C98 262 72 240 66 208 Z" fill="#8f60be" />
            <path d="M182 200 C174 230 154 246 132 248 L132 262 C162 262 188 240 194 208 Z" fill="#8f60be" />
            <rect x="114" y="234" width="32" height="48" rx="7" fill="#2a2133" />
            <rect x="118" y="239" width="24" height="38" rx="4" fill="#efe2fa" />
          </svg>

          {/* Floating Chip 1: Age / Semester Demographics */}
          <div className="absolute top-4 right-4 bg-white rounded-xl p-2.5 shadow-lg border border-white/60 pointer-events-none hidden sm:block">
            <p className="text-[8.5px] font-semibold text-[#57495f] mb-1.5">
              {language === 'hi' ? 'समूह वितरण' : 'Cohort Distribution'}
            </p>
            <svg className="w-24 h-6" viewBox="0 0 104 34" aria-hidden="true">
              <rect x="2" y="16" width="9" height="18" rx="2.5" fill="#c9a8e8" />
              <rect x="18" y="8" width="9" height="26" rx="2.5" fill="#8250c0" />
              <rect x="34" y="2" width="9" height="32" rx="2.5" fill="#8250c0" />
              <rect x="50" y="12" width="9" height="22" rx="2.5" fill="#c9a8e8" />
              <rect x="66" y="20" width="9" height="14" rx="2.5" fill="#c9a8e8" />
              <rect x="82" y="24" width="9" height="10" rx="2.5" fill="#c9a8e8" />
            </svg>
          </div>

          {/* Floating Chip 2: Sparkline Trend */}
          <div className="absolute top-6 left-4 bg-white rounded-xl p-2 shadow-lg border border-white/60 pointer-events-none hidden sm:block">
            <svg className="w-16 h-6" viewBox="0 0 76 30" aria-hidden="true">
              <path d="M2 26 L18 18 L32 22 L48 10 L62 14 L74 3" fill="none" stroke="#b0538c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="74" cy="3" r="2.6" fill="#b0538c" />
            </svg>
          </div>

          {/* Floating Chip 3: Pill Counter */}
          <div className="absolute bottom-5 left-4 bg-white rounded-full px-3 py-1 shadow-lg border border-white/60 flex items-center gap-1.5 pointer-events-none">
            <span className="w-5 h-5 rounded-full bg-[#7c4bb0] text-white flex items-center justify-center text-[8px]">
              ▶
            </span>
            <b className="text-[11.5px] text-[#1e1526] font-mono">31,502</b>
          </div>

          {/* Floating Chip 4: Retention & Engagement Rate */}
          <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 shadow-lg border border-white/60 text-left pointer-events-none">
            <div className="text-[16px] font-extrabold text-[#1e1526] font-mono leading-none">96.12%</div>
            <div className="text-[9px] text-[#6f6178] mt-0.5">
              {language === 'hi' ? 'प्रतिधारण दर' : 'Retention Rate'}
            </div>
            <div className="text-[9.5px] font-bold text-[#147b37] mt-1 font-mono">▲ +8.4%</div>
          </div>

          {/* Accent Gold Dot */}
          <span className="absolute right-[22%] top-[46%] w-3 h-3 rounded-full bg-[#e9c94d]" />
        </div>

        {/* CARD 6: Inverted Tag Headline + Ovals (c1 r3-4) */}
        <div className="bg-[#f6eefb] rounded-[20px] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-250 lg:row-span-2 min-h-[260px]">
          <h3 className="text-[15.5px] font-bold text-[#1e1526] leading-relaxed">
            <span className="bg-[#171219] text-white px-2.5 py-1 rounded-md inline-block mr-1 mb-1">
              Predictive AI
            </span>
            <br />
            <span className="bg-[#171219] text-white px-2.5 py-1 rounded-md inline-block mr-1 mb-1">
              Decision Console
            </span>
            <br />
            <span className="bg-[#171219] text-white px-2.5 py-1 rounded-md inline-block">
              For Campus
            </span>
          </h3>

          <div className="mt-auto flex items-end gap-2.5 relative pt-4">
            <div className="w-20 h-24 rounded-[50%/46%] overflow-hidden relative bg-gradient-to-b from-[#cdb6e6] via-[#9d7cc4] to-[#5f4380] flex items-end justify-center">
              <svg viewBox="0 0 80 70" className="w-[82%]" aria-hidden="true">
                <circle cx="40" cy="24" r="15" fill="#33253f" />
                <path d="M8 70 C10 48 22 40 40 40 C58 40 70 48 72 70 Z" fill="#33253f" />
              </svg>
            </div>
            <div className="w-16 h-20 rounded-[50%/46%] overflow-hidden relative bg-gradient-to-b from-[#3a2f45] to-[#241c2e] flex items-end justify-center">
              <svg viewBox="0 0 80 70" className="w-[82%]" aria-hidden="true">
                <circle cx="40" cy="24" r="15" fill="#c7a6e6" />
                <path d="M8 70 C10 48 22 40 40 40 C58 40 70 48 72 70 Z" fill="#c7a6e6" />
              </svg>
            </div>
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e8d7f6] to-[#b48ede] border-2 border-[#f6eefb] -ml-2" />
          </div>
        </div>

        {/* CARD 7: Logo Wordmark Tile (c4 r3) */}
        <div className="bg-[#f6eefb] rounded-[20px] p-5 flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-transform duration-250 min-h-[120px]">
          <svg viewBox="0 0 34 30" fill="none" stroke="#1e1526" strokeWidth="1.8" className="w-8 h-8" aria-hidden="true">
            <circle cx="12" cy="11" r="8" />
            <circle cx="22" cy="11" r="8" />
            <circle cx="17" cy="19" r="8" />
          </svg>
          <div className="text-[24px] font-extrabold tracking-widest text-[#1e1526] font-mono">
            OCTA AI
          </div>
        </div>

        {/* CARD 8: Font Specimen & Palette Swatches (c2 r4) */}
        <div className="bg-[#f6eefb] rounded-[20px] p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-250 min-h-[140px]">
          <div>
            <div className="text-[20px] font-extrabold text-[#1e1526]">Tokens</div>
            <div className="text-[12px] text-[#57495f] mt-0.5">Plus Jakarta Sans & Mono</div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="h-8 flex-1 rounded-lg bg-[#2a2231]" title="#2a2231" />
            <span className="h-8 flex-1 rounded-lg bg-[#aaa1b2]" title="#aaa1b2" />
            <span className="h-8 flex-1 rounded-lg bg-[#b78ce0]" title="#b78ce0" />
            <span className="h-8 flex-1 rounded-lg bg-[#eadcf7] border border-[#1e1526]/10" title="#eadcf7" />
          </div>
        </div>

        {/* CARD 9: Wide Statement Tile with 3D Gloss Asterisk (c3-4 r4) */}
        <div className="bg-[#eee3f7] rounded-[20px] p-5 sm:p-6 flex items-center justify-between gap-4 md:col-span-2 lg:col-span-2 hover:-translate-y-1 transition-transform duration-250 min-h-[140px]">
          <div className="max-w-md">
            <h3 className="text-[19px] sm:text-[23px] font-extrabold tracking-tight text-[#1e1526] leading-tight">
              {t.bento.statement}
            </h3>
            <p className="text-[11.5px] text-[#57495f] mt-2 font-medium">
              Predict • Optimize • Improve &nbsp;|&nbsp; Smart Campus Decision Intelligence
            </p>
          </div>

          {/* 3D Asterisk Graphic */}
          <svg className="w-20 h-20 shrink-0 drop-shadow-md" viewBox="0 0 96 96" aria-hidden="true">
            <defs>
              <radialGradient id="glossOcta" cx="35%" cy="28%" r="80%">
                <stop offset="0" stopColor="#4a4552" />
                <stop offset="0.5" stopColor="#1c1822" />
                <stop offset="1" stopColor="#0c0a10" />
              </radialGradient>
            </defs>
            <g fill="url(#glossOcta)">
              <rect x="41" y="4" width="14" height="88" rx="7" />
              <rect x="41" y="4" width="14" height="88" rx="7" transform="rotate(60 48 48)" />
              <rect x="41" y="4" width="14" height="88" rx="7" transform="rotate(120 48 48)" />
            </g>
            <ellipse cx="42" cy="16" rx="4" ry="7" fill="rgba(255,255,255,0.35)" transform="rotate(14 42 16)" />
          </svg>
        </div>

      </div>

      {/* Bento Navigation Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 border-t border-white/10 text-xs text-[#aaa1b2]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#147b37] animate-pulse" />
          <span>
            {language === 'hi' 
              ? 'लाइव टेलीमेट्री स्ट्रीम • 14 सतत पैरामीटर निगरानी में' 
              : 'Live Telemetry Stream • 14 Continuous Parameters Monitored'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {bentoLinks.map((link, idx) => (
            <React.Fragment key={link.to}>
              {idx > 0 && <span className="text-white/20">•</span>}
              <NavLink to={link.to} className="text-white hover:text-[#b78ce0] font-semibold transition-colors flex items-center gap-1">
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
