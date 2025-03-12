
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Initial auth state - reset all stored data
let authState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

// Reset all mock users with new empty passwords
const mockUsers = {
  admin: {
    id: uuidv4(),
    username: 'admin',
    password: '',
    firstName: 'محمد',
    lastName: 'أحمد',
    role: 'admin' as UserRole,
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  manager: {
    id: uuidv4(),
    username: 'manager',
    password: '',
    firstName: 'أحمد',
    lastName: 'محمود',
    role: 'manager' as UserRole,
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  supervisor: {
    id: uuidv4(),
    username: 'supervisor',
    password: '',
    firstName: 'خالد',
    lastName: 'عبدالله',
    role: 'supervisor' as UserRole,
    region: 'الرياض',
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

// Reset region passwords for agents
const regionPasswords: Record<string, string> = {
  'الرياض': '',
  'جدة': '',
  'الدمام': ''
};

// Reset agent IDs
const validAgentIds: string[] = [];

export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Since passwords are empty, any attempt will show a message
      toast.error('تم مسح كلمات المرور. يرجى التواصل مع المسؤول');
      reject(new Error('Credentials have been reset'));
    }, 500);
  });
};

export const agentLogin = (region: string, idNumber: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Since region passwords and IDs are empty, any attempt will show a message
      toast.error('تم مسح بيانات المناديب. يرجى التواصل مع المسؤول');
      reject(new Error('Agent credentials have been reset'));
    }, 500);
  });
};

export const logout = (): void => {
  authState = {
    user: null,
    isAuthenticated: false,
    token: null
  };
  toast.success('تم تسجيل الخروج بنجاح');
};

export const getAuthState = (): AuthState => {
  return { ...authState };
};

export const isAuthenticated = (): boolean => {
  return authState.isAuthenticated;
};

export const getUser = (): User | null => {
  return authState.user;
};

export const getToken = (): string | null => {
  return authState.token;
};
