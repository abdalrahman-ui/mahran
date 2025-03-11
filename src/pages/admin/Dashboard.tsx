
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const { t } = useLanguage();

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('dashboard')} role="admin">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('users')}</h3>
            <p className="text-3xl font-bold">15</p>
            <p className="text-sm text-gray-500 mt-2">4 {t('pending')} • 10 {t('approved')} • 1 {t('rejected')}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('ticketTypes')}</h3>
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-gray-500 mt-2">{t('advance')} • {t('fewOrders')} • {t('salary')} • {t('other')}</p>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{t('agents')}</h3>
            <p className="text-3xl font-bold">123</p>
            <p className="text-sm text-gray-500 mt-2">25 {t('active')} • 98 {t('inactive')}</p>
          </Card>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminDashboard;
