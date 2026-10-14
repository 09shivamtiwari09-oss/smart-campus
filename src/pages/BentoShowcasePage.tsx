import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Bot, 
  FileCheck, 
  Briefcase, 
  Compass, 
  SlidersHorizontal,
  LayoutDashboard
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { OctaCampusBentoGrid } from '../components/domain/OctaCampusBentoGrid';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const BentoShowcasePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getPrimaryAction = () => {
    if (!user) {
      return {
        to: '/login',
        label: language === 'hi' ? 'लॉगिन पोर्टल पर जाएं' : 'Go to Login Portal',
        icon: Sparkles,
      };
    }

    if (user.role === 'student') {
      return {
        to: '/student',
        label: t.bento.proceedToStudent,
        icon: LayoutDashboard,
      };
    }

    if (user.role === 'faculty') {
      return {
        to: '/teacher',
        label: t.bento.proceedToFaculty,
        icon: Users,
      };
    }

    return {
      to: '/admin',
      label: t.bento.proceedToAdmin,
      icon: ShieldCheck,
    };
  };

  const primaryAction = getPrimaryAction();

  return (
    <div className="min-h-screen bg-[#0b0a0c] text-white py-8 sm:py-12 selection:bg-[#7c4bb0] selection:text-white">
      <SEO
        title="OCTA Bento Telemetry Hub | Smart Campus Analytics"
        description="Asymmetric bento grid of living statistics, radial milestone rings, and explainable decision intelligence for Smart Campus Analytics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner with Role Status */}
        <div className="p-4 sm:p-6 rounded-[22px] bg-[#1e1526]/80 border border-[#a06cd5]/30 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#7c4bb0]/30 border border-[#b78ce0]/40 text-2xs font-mono font-bold text-[#b78ce0] uppercase tracking-wider">
                {user ? `${user.role.toUpperCase()} PORTAL ACTIVE` : 'LIVING TELEMETRY HUB'}
              </span>
              <span className="text-2xs text-[#aaa1b2] font-mono">
                {user ? `${user.name} • ${user.department}` : 'Kombai OCTA Bento Spec'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'OCTA बेंटो टेलीमेट्री अवलोकन' : 'OCTA Bento Telemetry Overview'}
            </h1>
            <p className="text-xs sm:text-sm text-[#aaa1b2] max-w-2xl">
              {language === 'hi' 
                ? 'सिस्टम सांख्यिकी, 89% सत्र माइलस्टोन रिंग एवं व्याख्यात्मक निर्णय आसूचना। अपनी अधिकृत कंसोल पर आगे बढ़ें।'
                : 'Living campus statistics, 89% semester milestone ring, and explainable AI attribution. Proceed directly to your authorized console.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <NavLink to={primaryAction.to} className="w-full sm:w-auto">
              <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto shadow-md">
                {primaryAction.label}
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Student Quick Navigation Pills (Only when logged in as Student) */}
        {user?.role === 'student' && (
          <div className="bg-[#120f18] p-3 rounded-2xl border border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-2xs font-mono uppercase text-[#b78ce0] font-bold px-2 py-1">
              {language === 'hi' ? 'छात्र मॉड्यूल:' : 'Student Modules:'}
            </span>
            <NavLink
              to="/student"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.student}</span>
            </NavLink>
            <NavLink
              to="/ai-advisor"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.aiAdvisor}</span>
            </NavLink>
            <NavLink
              to="/assessment"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.proctorTest}</span>
            </NavLink>
            <NavLink
              to="/internships"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.internships}</span>
            </NavLink>
            <NavLink
              to="/sarthi"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.sarthi}</span>
            </NavLink>
            <NavLink
              to="/simulator"
              className="px-3 py-1.5 rounded-xl bg-[#1e1526] hover:bg-[#7c4bb0]/30 border border-[#a06cd5]/30 text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span>{t.nav.simulator}</span>
            </NavLink>
          </div>
        )}

        {/* The Full Bento Grid Component */}
        <OctaCampusBentoGrid />

        {/* Bottom Callout Ribbon Directing to Primary Portal */}
        <div className="p-6 rounded-[22px] bg-gradient-to-r from-[#1e1526] via-[#120f18] to-[#1e1526] border border-[#a06cd5]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h3 className="text-base font-bold text-white">
              {language === 'hi' 
                ? 'क्या आप विस्तृत विश्लेषण देखना चाहते हैं?' 
                : 'Ready to dive into detailed diagnostic analytics?'}
            </h3>
            <p className="text-xs text-[#aaa1b2] mt-0.5">
              {language === 'hi'
                ? `आपके ${user?.role.toUpperCase() || 'USER'} विशेषाधिकार सक्रिय हैं। एक क्लिक में अपने कंसोल में प्रवेश करें।`
                : `Your ${user?.role.toUpperCase() || 'USER'} privileges are active. Seamlessly transition to your operational dashboard.`}
            </p>
          </div>
          <NavLink to={primaryAction.to} className="shrink-0 w-full sm:w-auto">
            <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {primaryAction.label}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

