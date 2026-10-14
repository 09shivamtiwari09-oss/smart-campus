import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Languages, 
  SlidersHorizontal, 
  LayoutDashboard, 
  Users, 
  Compass, 
  ShieldCheck, 
  Bot, 
  FileCheck, 
  Briefcase, 
  LogOut, 
  LogIn, 
  ChevronDown,
  Sparkles,
  Building
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Compute allowed links dynamically strictly based on the logged-in role
  const getNavLinks = () => {
    if (!isAuthenticated || !user) {
      return [
        { to: '/bento', label: t.nav.bento, icon: Sparkles },
        { to: '/login?portal=student', label: t.portal.studentPortal, icon: GraduationCap },
        { to: '/login?portal=faculty', label: t.portal.facultyPortal, icon: Users },
        { to: '/login?portal=admin', label: t.portal.adminPortal, icon: Building },
      ];
    }

    if (user.role === 'student') {
      return [
        { to: '/bento', label: t.nav.bento, icon: Sparkles },
        { to: '/student', label: t.nav.student, icon: LayoutDashboard },
        { to: '/ai-advisor', label: t.nav.aiAdvisor, icon: Bot },
        { to: '/assessment', label: t.nav.proctorTest, icon: FileCheck },
        { to: '/internships', label: t.nav.internships, icon: Briefcase },
        { to: '/sarthi', label: t.nav.sarthi, icon: Compass },
        { to: '/simulator', label: t.nav.simulator, icon: SlidersHorizontal },
      ];
    }

    if (user.role === 'faculty') {
      return [
        { to: '/bento', label: t.nav.bento, icon: Sparkles },
        { to: '/teacher', label: t.nav.teacher, icon: Users },
      ];
    }

    // Admin / Dean role
    return [
      { to: '/bento', label: t.nav.bento, icon: Sparkles },
      { to: '/admin', label: t.nav.admin, icon: ShieldCheck },
    ];
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0a0c]/95 backdrop-blur-md border-b border-white/10 text-white selection:bg-[#7c4bb0] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Lockup */}
          <NavLink
            to={isAuthenticated ? '/bento' : '/login'}
            className="flex items-center gap-2.5 text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b78ce0] rounded shrink-0"
            aria-label="Smart Campus Analytics - Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1e1526] border border-[#a06cd5]/30 text-white flex items-center justify-center shadow-subtle group-hover:border-[#b78ce0] transition-colors">
              <GraduationCap className="w-5 h-5 text-[#b78ce0] group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                {t.nav.brand}
              </span>
              <span className="text-2xs font-bold text-[#b78ce0] uppercase tracking-wider block">
                {user ? `${user.role.toUpperCase()} PORTAL` : t.nav.tagline}
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links (Role Segregated) */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/40 shadow-sm'
                      : 'text-[#aaa1b2] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Bar: Language + User Role Pill + Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#b78ce0] text-xs font-bold text-[#eee3f7] bg-[#16111e] transition-colors focus-visible:ring-2 focus-visible:ring-[#b78ce0]"
              aria-label={`Switch language. Current: ${language === 'en' ? 'English' : 'Hindi'}`}
              title="Toggle English / हिन्दी"
            >
              <Languages className="w-3.5 h-3.5 text-[#b78ce0]" />
              <span className="font-mono">{language === 'en' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Authenticated User Status / Switcher */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-full border border-white/10 bg-[#16111e] hover:border-[#b78ce0] transition-colors text-xs text-white"
                >
                  <span className="w-6 h-6 rounded-full bg-[#7c4bb0] text-white font-mono text-2xs font-bold flex items-center justify-center">
                    {user.avatarInitials}
                  </span>
                  <div className="hidden sm:block text-left">
                    <span className="font-bold text-white block leading-tight text-2xs">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-3xs uppercase font-mono text-[#b78ce0] block leading-tight font-semibold">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#aaa1b2]" />
                </button>

                {/* Profile & Role Switcher Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#16111e] border border-white/15 rounded-2xl shadow-2xl p-2.5 z-50 text-xs space-y-1.5 text-white">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="font-extrabold text-white truncate">{user.name}</p>
                      <p className="text-2xs text-[#aaa1b2] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-3xs font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#7c4bb0]/30 text-[#b78ce0] border border-[#7c4bb0]/40">
                        {user.role} Scope Active
                      </span>
                    </div>

                    {/* Unique Authorized Modules for Current Role */}
                    <div className="pt-2">
                      <span className="px-3 text-3xs font-bold uppercase text-[#b78ce0] tracking-wider block mb-1.5">
                        {language === 'hi' ? 'आपके अधिकृत विशिष्ट मॉड्यूल:' : 'Your Unique Authorized Modules:'}
                      </span>
                      <div className="px-3 py-1 space-y-1">
                        {navLinks.map(({ to, label, icon: ModuleIcon }) => (
                          <div key={to} className="flex items-center gap-2 text-2xs text-[#eee3f7] py-0.5">
                            <ModuleIcon className="w-3 h-3 text-[#b78ce0]" />
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Isolated Session Notice */}
                    <div className="mx-2 my-2 p-2 rounded-xl bg-[#0b0a0c] border border-white/10 text-3xs text-[#aaa1b2] leading-tight">
                      {language === 'hi'
                        ? 'सुरक्षा नीति: अन्य पोर्टल तक पहुंचने के लिए पहले लॉग आउट करें।'
                        : 'Isolated Session: Other portals are restricted. Log out to access a different role.'}
                    </div>

                    <div className="pt-1 border-t border-white/10">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl text-[#ad3568] hover:bg-[#ad3568]/15 flex items-center gap-2 font-bold transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login">
                <Button size="sm" variant="primary" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                  {t.nav.login}
                </Button>
              </NavLink>
            )}

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#aaa1b2] hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b78ce0]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0b0a0c] px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200">
          <div className="px-3 py-2 text-2xs font-mono font-bold text-[#b78ce0] uppercase tracking-wider">
            {user ? `${user.role.toUpperCase()} PORTAL NAVIGATION` : 'INSTITUTIONAL NAVIGATION'}
          </div>

          <div className="space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/40 shadow-sm'
                      : 'text-[#aaa1b2] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#b78ce0]" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={handleLogout}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
              >
                {t.nav.logout}
              </Button>
            ) : (
              <NavLink to="/login" className="block">
                <Button variant="primary" size="sm" className="w-full text-xs">
                  {t.nav.login}
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
