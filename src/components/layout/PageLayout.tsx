
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  role?: UserRole; // Make role optional with '?'
}

const PageLayout = ({ children, title, role }: PageLayoutProps) => {
  const { language, t } = useLanguage();
  const isRtl = language === 'ar' || language === 'ur';
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');  // Always navigate to home page
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
      {role && <Sidebar role={role} />}
      
      <div className={role ? "lg:ml-64 p-6" : "p-6"}>
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {t('back')}
          </Button>
        </header>
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
