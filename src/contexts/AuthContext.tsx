
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login, logout, agentLogin, getAuthState, getUser } from '@/services/authService';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  agentLogin: (region: string, idNumber: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authState = getAuthState();
    if (authState.isAuthenticated && authState.user) {
      setUser(authState.user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await login(username, password);
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentLogin = async (region: string, idNumber: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await agentLogin(region, idNumber);
      const currentUser = getUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من رمز المنطقة ورقم الهوية.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    agentLogin: handleAgentLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
