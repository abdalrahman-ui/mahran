
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types";
import { toast } from "sonner";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // For demo purposes, we'll simulate authentication
  // but still allow access in development mode
  const isDevMode = process.env.NODE_ENV === 'development';
  
  if (isDevMode) {
    // In development mode, we still check roles but don't block access
    if (user && !allowedRoles.includes(user.role)) {
      toast.warning(`تنبيه: أنت لا تملك صلاحية الوصول لهذه الصفحة (${user.role} لا يمكنه الوصول إلى صفحات ${allowedRoles.join(', ')})`);
    }
    return children;
  }

  // In production, enforce authentication and authorization
  if (!isAuthenticated) {
    // Redirect to login with returnUrl parameter
    return <Navigate to="/" state={{ returnUrl: location.pathname }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have the right role
    toast.error("ليس لديك صلاحية للوصول إلى هذه الصفحة");
    
    // Redirect based on user role
    const roleRedirectMap = {
      admin: '/admin/dashboard',
      manager: '/manager/dashboard',
      supervisor: '/supervisor/dashboard',
      agent: '/agent/dashboard'
    };
    
    return <Navigate to={roleRedirectMap[user.role] || '/'} replace />;
  }

  return children;
};

export default RequireAuth;
