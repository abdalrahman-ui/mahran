
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';
import { addActivityLog } from './mockDataService';

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

// Mock users data
const mockUsers = {
  admin: {
    id: uuidv4(),
    username: 'admin',
    firstName: 'محمد',
    lastName: 'أحمد',
    role: 'admin' as UserRole,
    status: 'approved' as const,
    email: 'admin@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  manager: {
    id: uuidv4(),
    username: 'manager',
    firstName: 'أحمد',
    lastName: 'محمود',
    role: 'manager' as UserRole,
    status: 'approved' as const,
    email: 'manager@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  supervisor: {
    id: uuidv4(),
    username: 'supervisor',
    firstName: 'خالد',
    lastName: 'عبدالله',
    role: 'supervisor' as UserRole,
    region: 'الرياض',
    status: 'approved' as const,
    email: 'supervisor@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

// For demo purposes, login always returns the admin user
export const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const adminUser = { ...mockUsers.admin };
      
      // Set auth state
      authState = {
        user: adminUser,
        isAuthenticated: true,
        token: uuidv4()
      };

      // Log successful login
      addActivityLog({
        userId: adminUser.id,
        userRole: adminUser.role,
        actionType: 'login',
        entityType: 'user',
        entityId: adminUser.id,
        details: 'تسجيل دخول ناجح',
        createdAt: new Date()
      });

      toast.success('تم تسجيل الدخول بنجاح');
      resolve(adminUser);
    }, 500);
  });
};

export const agentLogin = (region: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (region) {
        const agent = {
          id: uuidv4(),
          username: `agent_${region}`,
          firstName: 'مندوب',
          lastName: region,
          role: 'agent' as UserRole,
          region: region,
          status: 'approved' as const,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        authState = {
          user: agent,
          isAuthenticated: true,
          token: uuidv4()
        };

        // Log successful login
        addActivityLog({
          userId: agent.id,
          userRole: agent.role,
          actionType: 'login',
          entityType: 'user',
          entityId: agent.id,
          details: 'تسجيل دخول مندوب ناجح',
          createdAt: new Date()
        });

        toast.success('تم تسجيل دخول المندوب بنجاح');
        resolve(true);
      } else {
        // Log failed login
        addActivityLog({
          userId: 'unknown',
          userRole: 'unknown' as UserRole,
          actionType: 'login',
          entityType: 'user',
          entityId: `region:${region}`,
          details: 'محاولة تسجيل دخول مندوب فاشلة',
          createdAt: new Date()
        });

        toast.error('فشل تسجيل الدخول. يرجى التحقق من المنطقة.');
        reject(new Error('Invalid agent region'));
      }
    }, 500);
  });
};

export const logout = (): void => {
  // Log logout activity if user is logged in
  if (authState.user) {
    addActivityLog({
      userId: authState.user.id,
      userRole: authState.user.role,
      actionType: 'logout',
      entityType: 'user',
      entityId: authState.user.id,
      details: 'تسجيل خروج ناجح',
      createdAt: new Date()
    });
  }

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
