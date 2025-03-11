
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDot, Package, Ticket } from "lucide-react";
import RequireAuth from "@/components/layout/RequireAuth";

const AgentDashboard = () => {
  const { t, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // تعيين اللغة العربية كلغة افتراضية
    setLanguage('ar');
  }, [setLanguage]);

  // بيانات تجريبية - في التطبيق الحقيقي ستأتي من واجهة برمجة التطبيقات
  const stats = {
    openTickets: 3,
    pendingTickets: 2,
    closedTickets: 8,
  };

  return (
    <RequireAuth allowedRoles={['agent']}>
      <PageLayout title={t('dashboard')} role="agent">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/agent/tickets')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Ticket className="h-5 w-5 mr-2 text-blue-500" />
                  {t('openTickets')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.openTickets}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/agent/tickets')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CircleDot className="h-5 w-5 mr-2 text-yellow-500" />
                  {t('pendingTickets')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.pendingTickets}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/agent/tickets')}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-500" />
                  {t('closedTickets')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.closedTickets}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{t('noRecentActivity')}</p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/agent/new-ticket')}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {t('createNewTicket')}
            </button>
          </div>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AgentDashboard;
