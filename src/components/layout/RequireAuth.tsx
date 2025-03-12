
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { UserRole } from "@/types";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  // Bypass all authentication checks - allow access to all routes
  return children;
};

export default RequireAuth;
