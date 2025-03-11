
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const SupervisorDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <RequireAuth allowedRoles={['supervisor']}>
      <PageLayout title={t('dashboard')} role="supervisor">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('agents')}</h3>
            <p className="text-3xl font-bold">43</p>
            <p className="text-sm text-gray-500 mt-2">{user?.region || 'الرياض'}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('tickets')}</h3>
            <p className="text-3xl font-bold">128</p>
            <p className="text-sm text-gray-500 mt-2">15 {t('new')} • 83 {t('open')} • 30 {t('closed')}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('pendingApprovals')}</h3>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-gray-500 mt-2">{t('needsReview')}</p>
          </Card>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default SupervisorDashboard;
