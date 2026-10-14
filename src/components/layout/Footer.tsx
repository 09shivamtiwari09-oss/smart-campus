import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Mail, Phone, Lock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const getFooterModules = () => {
    if (!isAuthenticated || !user) {
      return [
        { to: '/bento', label: t.nav.bento },
        { to: '/login', label: t.nav.login },
      ];
    }

    if (user.role === 'student') {
      return [
        { to: '/bento', label: t.nav.bento },
        { to: '/student', label: t.nav.student },
        { to: '/ai-advisor', label: t.nav.aiAdvisor },
        { to: '/assessment', label: t.nav.proctorTest },
        { to: '/internships', label: t.nav.internships },
        { to: '/sarthi', label: t.nav.sarthi },
        { to: '/simulator', label: t.nav.simulator },
      ];
    }

    if (user.role === 'faculty') {
      return [
        { to: '/bento', label: t.nav.bento },
        { to: '/teacher', label: t.nav.teacher },
      ];
    }

    // Admin / Dean
    return [
      { to: '/bento', label: t.nav.bento },
      { to: '/admin', label: t.nav.admin },
    ];
  };

  const footerModules = getFooterModules();

  return (
    <footer className="bg-[#0b0a0c] text-[#eee3f7] mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-[#1e1526] border border-[#a06cd5]/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#b78ce0]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                {t.nav.brand}
              </span>
            </div>
            <p className="text-xs text-[#aaa1b2] leading-relaxed">
              {language === 'hi' 
                ? 'एआई-संचालित छात्र सफलता और निर्णय आसूचना मंच। निरंतर टेलीमेट्री को व्याख्यात्मक प्रेरकों, सार्थक समूहों और समयबद्ध हस्तक्षेपों में बदलना।'
                : 'AI-Powered Student Success and Decision Intelligence Platform. Converting continuous telemetry into explainable drivers, student segmentation, and timely interventions.'}
            </p>
          </div>

          {/* Platform Modules (Strictly Unique to Logged-in Persona) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#b78ce0] mb-3">
              {user ? `${user.role.toUpperCase()} ${t.footer.platformModules}` : t.footer.platformModules}
            </h4>
            <ul className="space-y-2 text-xs text-[#aaa1b2]">
              {footerModules.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Targeted Segments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#b78ce0] mb-3">
              {t.footer.targetedSegments}
            </h4>
            <ul className="space-y-2 text-xs text-[#aaa1b2]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#147b37]" />
                <span>{language === 'hi' ? 'उच्च प्रदर्शनकर्ता (High Performers)' : 'High Performers'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7c4bb0]" />
                <span>{language === 'hi' ? 'छिपी प्रतिभा (Hidden Potential)' : 'Hidden Potential'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#b48ede]" />
                <span>{language === 'hi' ? 'स्थिर पर अटके (Steady but Stuck)' : 'Steady but Stuck'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ad3568]" />
                <span>{language === 'hi' ? 'जोखिम में (At Risk)' : 'At Risk'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                <span>{language === 'hi' ? 'प्लेसमेंट-तैयार (Placement-Ready)' : 'Placement-Ready'}</span>
              </li>
            </ul>
          </div>

          {/* Contact Section (Mandatory on Every Page) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#b78ce0]">
              {language === 'hi' ? 'कैंपस समन्वय एवं सहायता' : 'Campus Coordination & Support'}
            </h4>
            <p className="text-xs text-[#aaa1b2] leading-relaxed">
              {t.footer.contactNote}
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs">
                <Mail className="w-4 h-4 text-[#b78ce0] shrink-0" />
                <a
                  href="mailto:09shivamtiwari09@gmail.com"
                  className="text-white hover:text-[#b78ce0] hover:underline font-mono text-2xs sm:text-xs break-all"
                >
                  09shivamtiwari09@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Phone className="w-4 h-4 text-[#147b37] shrink-0" />
                <a
                  href="tel:+918934060356"
                  className="text-white hover:text-[#b78ce0] hover:underline font-mono"
                >
                  +91 89340 60356
                </a>
              </div>
            </div>
            <p className="text-2xs text-[#6f6178] pt-1">
              {t.footer.supportHours}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6f6178]">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="text-2xs text-[#aaa1b2]">
            {language === 'hi' ? 'डेटा-संचालित उच्च शिक्षा निर्णय आसूचना' : 'Data-Driven Higher Education Decision Intelligence'}
          </p>
        </div>
      </div>
    </footer>
  );
};
