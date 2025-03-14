
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import AgentLoginForm from "@/components/AgentLoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LockIcon, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { login, agentLogin, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, toggleLanguage, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("staff");

  const handleStaffLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      const state = location.state as { returnUrl?: string };
      const returnUrl = state?.returnUrl;

      // Navigate based on role
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        const user = await login(username, password);
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "manager") {
          navigate("/manager/dashboard");
        } else if (user.role === "supervisor") {
          navigate("/supervisor/dashboard");
        } else {
          navigate("/agent/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleAgentLogin = async (region: string, idNumber: string) => {
    try {
      await agentLogin(region, idNumber);
      navigate("/agent/dashboard");
    } catch (error) {
      console.error("Agent login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      <Button 
        variant="ghost" 
        className="absolute top-4 right-4" 
        onClick={toggleLanguage}
      >
        {currentLanguage === 'ar' ? 'English' : 'العربية'}
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          تذاكر مهران للخدمات اللوجستية
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          {t('welcomeMessage')}
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full rounded-t-lg rounded-b-none">
              <TabsTrigger value="staff" className="rounded-tl-lg py-3">
                <User className="w-4 h-4 mr-2" />
                {t('staff')}
              </TabsTrigger>
              <TabsTrigger value="agent" className="rounded-tr-lg py-3">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {t('agents')}
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="staff" className="mt-0">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <LockIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <LoginForm
                  onSubmit={handleStaffLogin}
                  title={t('loginToSystem')}
                  isLoading={isLoading}
                  error={error}
                />
              </TabsContent>
              <TabsContent value="agent" className="mt-0">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <AgentLoginForm
                  onSubmit={handleAgentLogin}
                  isLoading={isLoading}
                  error={error}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2023 تذاكر مهران للخدمات اللوجستية. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  );
};

export default HomePage;
