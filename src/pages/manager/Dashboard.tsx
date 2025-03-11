
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";

const ManagerDashboard = () => {
  const { t } = useLanguage();

  return (
    <RequireAuth allowedRoles={['manager']}>
      <PageLayout title={t('dashboard')} role="manager">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('tickets')}</h3>
            <p className="text-3xl font-bold">143</p>
            <p className="text-sm text-gray-500 mt-2">23 {t('new')} • 85 {t('open')} • 35 {t('closed')}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('supervisors')}</h3>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-gray-500 mt-2">5 {t('active')} • 3 {t('inactive')}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('regions')}</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500 mt-2">{t('riyadh')} • {t('jeddah')} • {t('dammam')}</p>
          </Card>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default ManagerDashboard;
