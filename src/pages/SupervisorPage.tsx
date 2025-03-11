
import LoginForm from "@/components/LoginForm";
import { useLanguage } from "@/contexts/LanguageContext";

const SupervisorPage = () => {
  const { t } = useLanguage();
  
  const handleLogin = (username: string, password: string) => {
    console.log("Supervisor login:", { username, password });
    // Add actual login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <LoginForm 
        onSubmit={handleLogin}
        title={t('supervisors')}
      />
    </div>
  );
};

export default SupervisorPage;
