import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  student: {
    id: 'usr-std-089',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu.in',
    role: 'student',
    rollNo: '21BCSE104',
    department: 'Computer Science & Engineering',
    avatarInitials: 'AS',
  },
  faculty: {
    id: 'usr-fac-012',
    name: 'Dr. Ramanathan K.',
    email: 'dr.raman@campus.edu.in',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    avatarInitials: 'RK',
  },
  admin: {
    id: 'usr-adm-001',
    name: 'Prof. Sunita Rao',
    email: 'dean.academics@campus.edu.in',
    role: 'admin',
    department: 'Office of Academic Affairs & Accreditation',
    avatarInitials: 'SR',
  },
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, customEmail?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('sca_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Prompt login portal if not previously authenticated
    return null;
  });

  const login = async (role: UserRole, customEmail?: string): Promise<boolean> => {
    const baseUser = DEMO_USERS[role];
    const loggedUser: AuthUser = {
      ...baseUser,
      email: customEmail || baseUser.email,
    };
    setUser(loggedUser);
    localStorage.setItem('sca_auth_user', JSON.stringify(loggedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sca_auth_user');
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('sca_auth_user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
