
import LoginForm from "@/components/LoginForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerPage = () => {
  const { t } = useLanguage();
  const { login, isAuthenticated, isLoading, error, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && user?.role === 'manager') {
      navigate('/manager/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (username: string, password: string) => {
    login(username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <LoginForm 
        onSubmit={handleLogin}
        title={t('managers')}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ManagerPage;
