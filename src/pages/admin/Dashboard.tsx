
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSystemStats, getTickets, getTicketTypes } from "@/services/mockDataService";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { CalendarRange, Users, UserCheck, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState<"daily" | "weekly" | "monthly">("daily");
  
  // الحصول على إحصائيات النظام
  const stats = getSystemStats();
  const tickets = getTickets();
  const ticketTypes = getTicketTypes();
  
  // بيانات للرسم البياني للتذاكر حسب النوع
  const ticketTypeData = ticketTypes.map(type => {
    const count = tickets.filter(ticket => ticket.type === type.key).length;
    return {
      name: type.name,
      value: count,
    };
  });
  
  // بيانات للرسم البياني للمستخدمين حسب النوع
  const userRoleData = [
    { name: t('admins'), value: stats.users.admins },
    { name: t('managers'), value: stats.users.managers },
    { name: t('supervisors'), value: stats.users.supervisors },
    { name: t('agents'), value: stats.users.agents },
  ];
  
  // بيانات للرسم البياني للمناديب حسب المنطقة
  const agentsByRegionData = [
    { name: t('riyadh'), value: stats.agents.byRegion.riyadh },
    { name: t('jeddah'), value: stats.agents.byRegion.jeddah },
    { name: t('dammam'), value: stats.agents.byRegion.dammam },
    { name: t('otherRegions'), value: stats.agents.byRegion.other },
  ];
  
  // ألوان للرسم البياني
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('dashboard')} role="admin">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t('welcomeToMehraanAdmin')}</h1>
          <p className="text-gray-500">{t('adminDashboardDescription')}</p>
        </div>
        
        {/* إحصائيات عامة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t('totalUsers')}</p>
                <h3 className="text-3xl font-bold mt-1">{stats.users.total}</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>{t('pendingUsers')}</span>
                <span className="font-medium text-amber-500">{stats.users.pending}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t('totalTickets')}</p>
                <h3 className="text-3xl font-bold mt-1">{stats.tickets.total}</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>{t('newTickets')}</span>
                <span className="font-medium text-blue-500">{stats.tickets.new}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t('totalAgents')}</p>
                <h3 className="text-3xl font-bold mt-1">{stats.agents.total}</h3>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span>{t('riyadh')}</span>
                  <span className="font-medium">{stats.agents.byRegion.riyadh}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('jeddah')}</span>
                  <span className="font-medium">{stats.agents.byRegion.jeddah}</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{t('ticketStatus')}</p>
                <h3 className="text-3xl font-bold mt-1">{stats.tickets.open + stats.tickets.pending}</h3>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span>{t('open')}</span>
                  <span className="font-medium text-orange-500">{stats.tickets.open}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('closed')}</span>
                  <span className="font-medium text-green-500">{stats.tickets.closed}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* تبويبات للتقارير والإحصائيات */}
        <Tabs defaultValue="tickets" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="tickets">{t('tickets')}</TabsTrigger>
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="agents">{t('agents')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t('ticketsByType')}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name={t('ticketCount')} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t('usersByRole')}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t('agentsByRegion')}</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={agentsByRegionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {agentsByRegionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* أحدث التذاكر والمستخدمين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('latestTickets')}</h3>
              <div className="space-y-4">
                {tickets.slice(0, 5).map(ticket => (
                  <div key={ticket.id} className="flex items-start border-b pb-4">
                    <div className={`p-2 rounded-full mr-4 ${
                      ticket.status === 'new' ? 'bg-blue-100 text-blue-600' :
                      ticket.status === 'open' ? 'bg-yellow-100 text-yellow-600' :
                      ticket.status === 'closed' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.status === 'new' ? (
                        <AlertTriangle className="h-5 w-5" />
                      ) : ticket.status === 'open' ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{ticket.ticketId}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{ticket.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('pendingRequests')}</h3>
              <div className="space-y-4">
                {stats.users.pending === 0 ? (
                  <p className="text-center text-gray-500 py-8">{t('noPendingRequests')}</p>
                ) : (
                  stats.users.pending > 0 && (
                    <div className="flex items-start border-b pb-4">
                      <div className="p-2 rounded-full mr-4 bg-yellow-100 text-yellow-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium">{t('newUserRegistrations')}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date().toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {t('youHavePendingUsers', { count: stats.users.pending })}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminDashboard;
