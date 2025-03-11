
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  
  // بيانات إحصائية (في التطبيق الحقيقي ستأتي من واجهة برمجة التطبيقات)
  const userStats = {
    total: 15,
    pending: 4, 
    approved: 10,
    rejected: 1
  };
  
  const ticketStats = {
    total: 156,
    open: 45,
    closed: 92,
    pending: 19
  };
  
  const regionalData = [
    { name: 'الرياض', agents: 35, tickets: 62 },
    { name: 'جدة', agents: 28, tickets: 49 },
    { name: 'الدمام', agents: 17, tickets: 23 },
    { name: 'مكة', agents: 14, tickets: 18 },
    { name: 'المدينة', agents: 9, tickets: 4 }
  ];
  
  const ticketTypeData = [
    { name: t('advance'), value: 45 },
    { name: t('fewOrders'), value: 30 },
    { name: t('salary'), value: 65 },
    { name: t('other'), value: 16 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('dashboard')} role="admin">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="tickets">{t('tickets')}</TabsTrigger>
            <TabsTrigger value="regions">{t('regions')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('users')}</h3>
                <p className="text-3xl font-bold">{userStats.total}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {userStats.pending} {t('pending')} • {userStats.approved} {t('approved')} • {userStats.rejected} {t('rejected')}
                </p>
              </Card>
              
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('tickets')}</h3>
                <p className="text-3xl font-bold">{ticketStats.total}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {ticketStats.open} {t('open')} • {ticketStats.pending} {t('pending')} • {ticketStats.closed} {t('closed')}
                </p>
              </Card>
              
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{t('agents')}</h3>
                <p className="text-3xl font-bold">123</p>
                <p className="text-sm text-gray-500 mt-2">25 {t('active')} • 98 {t('inactive')}</p>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">{t('ticketTypes')}</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {ticketTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">{t('recentActivity')}</h3>
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-500">22/06/2023 - 14:25</p>
                    <p>تم إضافة 3 مناديب جدد في منطقة الرياض</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-500">22/06/2023 - 11:13</p>
                    <p>تم تغيير حالة 5 تذاكر إلى "مغلقة"</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-gray-500">21/06/2023 - 09:45</p>
                    <p>تم إضافة نوع تذكرة جديد "طلب إجازة"</p>
                  </div>
                  <div className="pb-2">
                    <p className="text-sm text-gray-500">20/06/2023 - 16:30</p>
                    <p>تم قبول 2 من طلبات المستخدمين الجدد</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t('userRegistration')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'يناير', count: 5 },
                      { month: 'فبراير', count: 7 },
                      { month: 'مارس', count: 3 },
                      { month: 'أبريل', count: 12 },
                      { month: 'مايو', count: 8 },
                      { month: 'يونيو', count: 15 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name={t('users')} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t('usersByRole')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-800">3</p>
                  <p className="text-sm text-blue-600">{t('admin')}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-800">7</p>
                  <p className="text-sm text-green-600">{t('managers')}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-800">12</p>
                  <p className="text-sm text-yellow-600">{t('supervisors')}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-800">123</p>
                  <p className="text-sm text-purple-600">{t('agents')}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-6">
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t('ticketStats')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'يناير', open: 25, closed: 40 },
                      { month: 'فبراير', open: 30, closed: 35 },
                      { month: 'مارس', open: 15, closed: 20 },
                      { month: 'أبريل', open: 27, closed: 32 },
                      { month: 'مايو', open: 18, closed: 22 },
                      { month: 'يونيو', open: 23, closed: 19 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="open" name={t('openTickets')} fill="#FF8042" />
                    <Bar dataKey="closed" name={t('closedTickets')} fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="regions" className="space-y-6">
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t('regionalDistribution')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="agents" name={t('agents')} fill="#8884d8" />
                    <Bar dataKey="tickets" name={t('tickets')} fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regionalData.map((region) => (
                <Card key={region.name} className="p-4 shadow-md">
                  <h3 className="text-lg font-semibold">{region.name}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="text-xs text-gray-500">{t('agents')}</p>
                      <p className="text-xl font-semibold">{region.agents}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-xs text-gray-500">{t('tickets')}</p>
                      <p className="text-xl font-semibold">{region.tickets}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminDashboard;
