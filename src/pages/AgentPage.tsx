
import AgentLoginForm from "@/components/AgentLoginForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AgentPage = () => {
  const { t } = useLanguage();
  const { agentLogin, isAuthenticated, isLoading, error, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && user?.role === 'agent') {
      navigate('/agent/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (region: string, idNumber: string) => {
    agentLogin(region, idNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <AgentLoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default AgentPage;
