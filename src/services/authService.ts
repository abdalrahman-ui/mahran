
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';
import { addActivityLog } from './mockDataService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loginAttempts: Record<string, number>; // Track failed login attempts
}

// Initial auth state - reset all stored data
let authState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loginAttempts: {}
};

// Reset all mock users with new empty passwords
const mockUsers = {
  admin: {
    id: uuidv4(),
    username: 'admin',
    password: 'Admin@123', // Strong password for demo
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
    password: 'Manager@123', // Strong password for demo
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
    password: 'Supervisor@123', // Strong password for demo
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

// Reset region passwords for agents
const regionPasswords: Record<string, string> = {
  'الرياض': 'Riyadh@123',
  'جدة': 'Jeddah@123',
  'الدمام': 'Dammam@123'
};

// Reset agent IDs for demo purposes
const validAgentIds = ['1234567890', '0987654321', '5678901234'];

export const login = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Check if there are too many failed login attempts for this username
    if (authState.loginAttempts[username] && authState.loginAttempts[username] >= 3) {
      toast.error('تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى المحاولة لاحقًا');
      reject(new Error('Too many login attempts'));
      return;
    }

    setTimeout(() => {
      let user = null;

      // Check admin
      if (username === mockUsers.admin.username && password === mockUsers.admin.password) {
        user = { ...mockUsers.admin };
      }
      // Check manager
      else if (username === mockUsers.manager.username && password === mockUsers.manager.password) {
        user = { ...mockUsers.manager };
      }
      // Check supervisor
      else if (username === mockUsers.supervisor.username && password === mockUsers.supervisor.password) {
        user = { ...mockUsers.supervisor };
      }

      if (user) {
        // Reset login attempts on successful login
        if (authState.loginAttempts[username]) {
          delete authState.loginAttempts[username];
        }

        // Remove password from user object
        const { password, ...userWithoutPassword } = user;
        
        // Set auth state
        authState = {
          user: userWithoutPassword,
          isAuthenticated: true,
          token: uuidv4(),
          loginAttempts: { ...authState.loginAttempts }
        };

        // Log successful login
        addActivityLog({
          userId: userWithoutPassword.id,
          userRole: userWithoutPassword.role,
          actionType: 'login',
          entityType: 'user',
          entityId: userWithoutPassword.id,
          details: 'تسجيل دخول ناجح',
          createdAt: new Date()
        });

        toast.success('تم تسجيل الدخول بنجاح');
        resolve(userWithoutPassword);
      } else {
        // Increment failed login attempts
        authState.loginAttempts[username] = (authState.loginAttempts[username] || 0) + 1;
        
        // Log failed login
        addActivityLog({
          userId: 'unknown',
          userRole: 'unknown' as UserRole,
          actionType: 'login',
          entityType: 'user',
          entityId: username,
          details: 'محاولة تسجيل دخول فاشلة',
          createdAt: new Date()
        });

        let errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.';
        if (authState.loginAttempts[username] >= 3) {
          errorMessage = 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى المحاولة لاحقًا';
        }

        toast.error(errorMessage);
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const agentLogin = (region: string, idNumber: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if region password exists and idNumber is valid
      if (regionPasswords[region] && validAgentIds.includes(idNumber)) {
        const agent = {
          id: uuidv4(),
          username: `agent_${idNumber}`,
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
          token: uuidv4(),
          loginAttempts: { ...authState.loginAttempts }
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
          entityId: `region:${region}-id:${idNumber}`,
          details: 'محاولة تسجيل دخول مندوب فاشلة',
          createdAt: new Date()
        });

        toast.error('فشل تسجيل الدخول. يرجى التحقق من رمز المنطقة ورقم الهوية.');
        reject(new Error('Invalid agent credentials'));
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
    token: null,
    loginAttempts: { ...authState.loginAttempts }
  };
  
  toast.success('تم تسجيل الخروج بنجاح');
};

export const getAuthState = (): Omit<AuthState, 'loginAttempts'> => {
  // Don't expose login attempts to clients
  const { loginAttempts, ...safeAuthState } = authState;
  return safeAuthState;
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

// Password validation for security
export const isStrongPassword = (password: string): boolean => {
  // Check for at least 8 characters, uppercase, lowercase, number, and special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const resetPassword = (userId: string, newPassword: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!isStrongPassword(newPassword)) {
      toast.error('كلمة المرور ضعيفة. يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز');
      reject(new Error('Weak password'));
      return;
    }

    // In a real app, this would update the user's password in the database
    setTimeout(() => {
      // Log password reset activity
      if (authState.user) {
        addActivityLog({
          userId: authState.user.id,
          userRole: authState.user.role,
          actionType: 'update',
          entityType: 'user',
          entityId: userId,
          details: 'تم إعادة تعيين كلمة المرور',
          createdAt: new Date()
        });
      }

      toast.success('تم إعادة تعيين كلمة المرور بنجاح');
      resolve(true);
    }, 500);
  });
};
