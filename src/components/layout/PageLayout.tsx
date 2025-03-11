
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserRole } from "@/types";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  role: UserRole;
}

const PageLayout = ({ children, title, role }: PageLayoutProps) => {
  const { language } = useLanguage();
  const isRtl = language === 'ar' || language === 'ur';

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Sidebar role={role} />
      
      <div className="lg:ml-64 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
