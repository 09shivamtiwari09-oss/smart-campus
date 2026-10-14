import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom';
import { 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  Lock, 
  Mail, 
  ArrowRight, 
  Building,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../i18n/LanguageContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();
  const { addToast } = useToast();
  const { t, language } = useLanguage();

  const portalParam = searchParams.get('portal');
  const initialRole: UserRole = 
    portalParam === 'faculty' ? 'faculty' : portalParam === 'admin' ? 'admin' : 'student';

  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState(DEMO_USERS[initialRole].email);
  const [password, setPassword] = useState('campus@2026');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (portalParam && (portalParam === 'student' || portalParam === 'faculty' || portalParam === 'admin')) {
      setActiveRole(portalParam as UserRole);
      setEmail(DEMO_USERS[portalParam as UserRole].email);
    }
  }, [portalParam]);

  const handleRoleSelect = (role: UserRole) => {
    setActiveRole(role);
    setEmail(DEMO_USERS[role].email);
    setSearchParams({ portal: role });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(activeRole, email);
      addToast(
        'success',
        `Authenticated as ${DEMO_USERS[activeRole].name}`,
        `Role: ${activeRole.toUpperCase()} • ${DEMO_USERS[activeRole].department}`
      );

      // Route all roles to OCTA Bento first
      navigate('/bento');
    } catch {
      addToast('error', 'Authentication Failed', 'Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    handleRoleSelect(role);
    setIsLoading(true);
    await login(role, DEMO_USERS[role].email);
    addToast(
      'success',
      `Demo Session Initialized: ${DEMO_USERS[role].name}`,
      `Authorized for ${role.toUpperCase()} console. Navigating to OCTA Bento first.`
    );
    navigate('/bento');
    setIsLoading(false);
  };

  const roleMeta = {
    student: {
      title: t.portal.studentPortal,
      desc: t.portal.studentDesc,
      icon: GraduationCap,
      color: '#7c4bb0',
      allowedModules: [
        'OCTA Bento',
        'Student Hub',
        'AI Advisor',
        'Proctor Test',
        'Internships',
        'Sarthi Mentors',
        'What-If Simulator',
      ],
      user: DEMO_USERS.student,
    },
    faculty: {
      title: t.portal.facultyPortal,
      desc: t.portal.facultyDesc,
      icon: Users,
      color: '#147b37',
      allowedModules: [
        'OCTA Bento',
        'Faculty Console',
      ],
      user: DEMO_USERS.faculty,
    },
    admin: {
      title: t.portal.adminPortal,
      desc: t.portal.adminDesc,
      icon: Building,
      color: '#0D9488',
      allowedModules: [
        'OCTA Bento',
        'Admin Overview',
      ],
      user: DEMO_USERS.admin,
    },
  };

  const currentMeta = roleMeta[activeRole];
  const IconComponent = currentMeta.icon;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0b0a0c] text-[#eee3f7] overflow-hidden selection:bg-[#7c4bb0] selection:text-white">
      {/* Background ambient radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[160px] opacity-25 z-0"
        style={{ background: 'radial-gradient(circle, #a06cd5, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[45%] -right-44 h-[560px] w-[560px] rounded-full blur-[170px] opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, #7c4bb0, transparent 70%)' }}
      />

      <SEO
        title={`${currentMeta.title} | ${t.login.ssoTitle}`}
        description="Role-segregated institutional single sign-on for students, faculty advisors, and institutional deans."
      />

      <div className="relative z-10 max-w-xl w-full space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1526] border border-[#a06cd5]/30 text-xs font-semibold text-[#b78ce0] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.portal.selectTitle}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            {t.login.ssoTitle}
          </h1>
          <p className="text-xs text-[#aaa1b2] max-w-md mx-auto leading-relaxed">
            {t.portal.selectSubtitle}
          </p>
        </div>

        {/* Dedicated 3-Portal Switcher Strip */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#16111e] border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRole === 'student'
                ? 'bg-[#7c4bb0] text-white shadow-md'
                : 'text-[#aaa1b2] hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="truncate">{t.nav.student}</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('faculty')}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRole === 'faculty'
                ? 'bg-[#7c4bb0] text-white shadow-md'
                : 'text-[#aaa1b2] hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="truncate">{t.nav.teacher}</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRole === 'admin'
                ? 'bg-[#7c4bb0] text-white shadow-md'
                : 'text-[#aaa1b2] hover:text-white hover:bg-white/5'
            }`}
          >
            <Building className="w-4 h-4 shrink-0" />
            <span className="truncate">{t.nav.admin}</span>
          </button>
        </div>

        {/* Separate Login Card in OCTA Bento Styling */}
        <Card className="rounded-[24px] border border-[#d9bef0] p-6 sm:p-8 space-y-6">
          {/* Active Portal Header Lockup */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#d9bef0]/60">
            <div className="w-12 h-12 rounded-2xl bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 flex items-center justify-center shrink-0 shadow-md">
              <IconComponent className="w-6 h-6 text-[#b78ce0]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-[#1e1526] font-heading">
                  {currentMeta.title}
                </h2>
                <span className="text-3xs uppercase font-mono px-2 py-0.5 rounded-full bg-[#1e1526] text-white font-bold">
                  {activeRole}
                </span>
              </div>
              <p className="text-xs text-[#57495f] mt-1 leading-relaxed">
                {currentMeta.desc}
              </p>
            </div>
          </div>

          {/* Scope Boundaries Indicator */}
          <div className="p-3.5 rounded-xl bg-[#f6eefb] border border-[#d9bef0] text-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#1e1526]">
              <Info className="w-3.5 h-3.5 text-[#7c4bb0]" />
              <span>Authorized Portal Scope:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentMeta.allowedModules.map((mod) => (
                <span
                  key={mod}
                  className="bg-white border border-[#d9bef0] text-[#1e1526] px-2 py-0.5 rounded-md font-bold"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1e1526] uppercase tracking-wider mb-1">
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#57495f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@campus.edu.in"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d9bef0] bg-white text-[#1e1526] placeholder:text-[#6f6178] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#1e1526] uppercase tracking-wider">
                  {t.login.passwordLabel}
                </label>
                <span className="text-2xs text-[#7c4bb0] font-bold cursor-pointer hover:underline">
                  Default: campus@2026
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#57495f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d9bef0] bg-white text-[#1e1526] placeholder:text-[#6f6178] focus:outline-none focus:ring-2 focus:ring-[#7c4bb0] font-mono font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.login.authSubmitBtn} ({activeRole.toUpperCase()})
            </Button>
          </form>

          {/* 1-Click Fast Pre-Fill for Evaluators */}
          <div className="pt-4 border-t border-[#d9bef0]/60 space-y-2">
            <span className="text-2xs font-extrabold text-[#57495f] uppercase tracking-wider block text-center">
              {t.login.fastAccessTitle}
            </span>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(activeRole)}
              className="w-full p-2.5 rounded-xl border border-[#d9bef0] bg-white hover:bg-[#f6eefb] text-[#1e1526] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#147b37]" />
              <span>
                Enter as {currentMeta.user.name} ({currentMeta.user.department.split('&')[0]})
              </span>
            </button>
            <div className="pt-2 text-center">
              <NavLink
                to="/landing"
                className="text-2xs font-semibold text-[#57495f] hover:text-[#7c4bb0] transition-colors underline"
              >
                {language === 'hi' ? 'सार्वजनिक अवलोकन लैंडिंग पेज देखें →' : 'Looking for platform overview? View Public Landing Page →'}
              </NavLink>
            </div>
          </div>
        </Card>

        {/* Security & Contact Footer */}
        <div className="text-center text-2xs text-[#aaa1b2] space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#147b37]" />
            <span>{t.login.encryptedTelemetry}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a href="mailto:09shivamtiwari09@gmail.com" className="hover:text-white hover:underline font-mono">
              09shivamtiwari09@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+918934060356" className="hover:text-white hover:underline font-mono">
              +91 89340 60356
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
