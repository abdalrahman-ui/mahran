
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Initial auth state
let authState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

// Mock users for login
const mockUsers = {
  admin: {
    id: uuidv4(),
    username: 'admin',
    password: 'admin123',
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
    password: 'manager123',
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
    password: 'supervisor123',
    firstName: 'خالد',
    lastName: 'عبدالله',
    role: 'supervisor' as UserRole,
    region: 'الرياض',
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

// Region passwords for agents
const regionPasswords = {
  'الرياض': 'riyadh123',
  'جدة': 'jeddah123',
  'الدمام': 'dammam123'
};

// Agent IDs
const validAgentIds = ['1234567890', '0987654321', '1122334455'];

export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        const user = mockUsers.admin;
        authState = {
          user,
          isAuthenticated: true,
          token: 'mock-token-admin-' + Date.now()
        };
        toast.success('تم تسجيل الدخول بنجاح');
        resolve(user);
      } else if (username === 'manager' && password === 'manager123') {
        const user = mockUsers.manager;
        authState = {
          user,
          isAuthenticated: true,
          token: 'mock-token-manager-' + Date.now()
        };
        toast.success('تم تسجيل الدخول بنجاح');
        resolve(user);
      } else if (username === 'supervisor' && password === 'supervisor123') {
        const user = mockUsers.supervisor;
        authState = {
          user,
          isAuthenticated: true,
          token: 'mock-token-supervisor-' + Date.now()
        };
        toast.success('تم تسجيل الدخول بنجاح');
        resolve(user);
      } else {
        toast.error('خطأ في اسم المستخدم أو كلمة المرور');
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const agentLogin = (region: string, idNumber: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (regionPasswords[region as keyof typeof regionPasswords] && validAgentIds.includes(idNumber)) {
        authState = {
          user: {
            id: uuidv4(),
            username: idNumber,
            firstName: 'مندوب',
            lastName: region,
            role: 'agent',
            region,
            status: 'approved',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          isAuthenticated: true,
          token: 'mock-token-agent-' + Date.now()
        };
        toast.success('تم تسجيل الدخول بنجاح');
        resolve(true);
      } else {
        toast.error('خطأ في رمز المنطقة أو رقم الهوية');
        reject(new Error('Invalid agent credentials'));
      }
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
