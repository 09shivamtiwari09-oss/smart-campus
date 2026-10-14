import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Home, Mail, Phone } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();

  const getRoleRoute = () => {
    if (!user) return { to: '/login', label: language === 'hi' ? 'लॉगिन पोर्टल' : 'Login Portal' };
    if (user.role === 'student') return { to: '/student', label: language === 'hi' ? 'छात्र हब' : 'Student Hub' };
    if (user.role === 'faculty') return { to: '/teacher', label: language === 'hi' ? 'संकाय कंसोल' : 'Faculty Console' };
    return { to: '/admin', label: language === 'hi' ? 'प्रशासन अवलोकन' : 'Admin Overview' };
  };

  const roleRoute = getRoleRoute();

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#0b0a0c] text-[#eee3f7] overflow-hidden">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[160px] opacity-25 z-0"
        style={{ background: 'radial-gradient(circle, #a06cd5, transparent 70%)' }}
      />

      <SEO
        title="404 - Page Not Found"
        description="The requested campus analytics route could not be found. Return to platform overview."
      />

      <Card className="relative z-10 max-w-md w-full text-center space-y-6 rounded-[24px] border border-[#d9bef0]">
        <div className="w-16 h-16 rounded-2xl bg-[#1e1526] text-[#b78ce0] border border-[#a06cd5]/30 flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-8 h-8 text-[#b78ce0] animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div>
          <span className="text-5xl font-mono font-extrabold text-[#1e1526] block tracking-tight">
            404
          </span>
          <h1 className="text-xl font-extrabold text-[#1e1526] mt-2 font-heading">
            {language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Academic Route Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-[#57495f] mt-2 leading-relaxed">
            {language === 'hi'
              ? 'अनुरोधित संसाधन या एंडपॉइंट उपलब्ध नहीं है या स्थानांतरित कर दिया गया है।'
              : 'The analytics resource, student cohort, or simulator endpoint you requested does not exist or has been archived.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NavLink to={isAuthenticated ? '/bento' : '/login'} className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              {language === 'hi' ? 'OCTA बेंटो पर लौटें' : 'Return to OCTA Bento'}
            </Button>
          </NavLink>
          <NavLink to={roleRoute.to} className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full">
              {roleRoute.label}
            </Button>
          </NavLink>
        </div>

        <div className="pt-6 border-t border-[#d9bef0]/60 text-2xs text-[#57495f] space-y-1.5 font-medium">
          <p>Need technical assistance?</p>
          <div className="flex items-center justify-center gap-3 text-[#1e1526] font-mono font-bold">
            <a href="mailto:09shivamtiwari09@gmail.com" className="hover:text-[#7c4bb0] hover:underline">
              09shivamtiwari09@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+918934060356" className="hover:text-[#7c4bb0] hover:underline">
              +91 89340 60356
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
