
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { UserRole } from "@/types";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page
    return <Navigate to="/" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page or home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
