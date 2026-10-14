import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { UserRole } from './types';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { WhatIfSimulator } from './pages/WhatIfSimulator';
import { AdminDashboard } from './pages/AdminDashboard';
import { SarthiMentorsPage } from './pages/SarthiMentorsPage';
import { AIBotAdvisorPage } from './pages/AIBotAdvisorPage';
import { ProctoredTestPage } from './pages/ProctoredTestPage';
import { InternshipDashboard } from './pages/InternshipDashboard';
import { BentoShowcasePage } from './pages/BentoShowcasePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Role-Based Route Guard
const RoleRoute: React.FC<{
  allowedRoles: UserRole[];
  children: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    addToast(
      'error',
      'Restricted Portal Access',
      `Your account (${user.role.toUpperCase()}) does not have clearance for this section. Redirected to OCTA Bento.`
    );

    return <Navigate to="/bento" replace />;
  }

  return <>{children}</>;
};

// Root route handler: if authenticated, redirect to /bento; if not, go to /login
const RootRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user) {
    return <Navigate to="/bento" replace />;
  }
  return <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#0b0a0c] text-[#eee3f7] font-sans selection:bg-[#7c4bb0] selection:text-white">
              {/* Header Navigation with Dynamic Role Links */}
              <Navbar />

              {/* Main Routes */}
              <div className="flex-1 flex flex-col">
                <Routes>
                  {/* Root Gateway & Authentication */}
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/landing" element={<LandingPage />} />

                  {/* OCTA Bento is accessible to ALL roles (student, faculty, admin) */}
                  <Route
                    path="/bento"
                    element={
                      <RoleRoute allowedRoles={['student', 'faculty', 'admin']}>
                        <BentoShowcasePage />
                      </RoleRoute>
                    }
                  />

                  {/* Student-Only Portal Routes: Student Hub, AI Advisor, Proctor Test, Internships, Sarthi Mentors, What-If Simulator */}
                  <Route
                    path="/student"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <StudentDashboard />
                      </RoleRoute>
                    }
                  />
                  <Route
                    path="/ai-advisor"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <AIBotAdvisorPage />
                      </RoleRoute>
                    }
                  />
                  <Route
                    path="/assessment"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <ProctoredTestPage />
                      </RoleRoute>
                    }
                  />
                  <Route
                    path="/internships"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <InternshipDashboard />
                      </RoleRoute>
                    }
                  />
                  <Route
                    path="/sarthi"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <SarthiMentorsPage />
                      </RoleRoute>
                    }
                  />
                  <Route
                    path="/simulator"
                    element={
                      <RoleRoute allowedRoles={['student']}>
                        <WhatIfSimulator />
                      </RoleRoute>
                    }
                  />

                  {/* Faculty-Only Portal Route */}
                  <Route
                    path="/teacher"
                    element={
                      <RoleRoute allowedRoles={['faculty']}>
                        <TeacherDashboard />
                      </RoleRoute>
                    }
                  />

                  {/* Dean / Administrator-Only Portal Route */}
                  <Route
                    path="/admin"
                    element={
                      <RoleRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </RoleRoute>
                    }
                  />

                  {/* Catch-all 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              {/* Persistent Footer with Mandatory Contact Information */}
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
