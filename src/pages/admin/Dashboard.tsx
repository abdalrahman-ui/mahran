
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSystemStats, getTickets, getTicketTypes } from "@/services/mockDataService";

// Import the refactored components
import StatsCardGrid from "@/components/dashboard/StatsCardGrid";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import LatestTickets from "@/components/dashboard/LatestTickets";
import PendingRequests from "@/components/dashboard/PendingRequests";

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  // Get system data
  const stats = getSystemStats();
  const tickets = getTickets();
  const ticketTypes = getTicketTypes();
  
  // Prepare data for charts
  const ticketTypeData = ticketTypes.map(type => {
    const count = tickets.filter(ticket => ticket.type === type.key).length;
    return {
      name: type.name,
      value: count,
    };
  });
  
  // User role data
  const userRoleData = [
    { name: t('admins'), value: stats.users.admins },
    { name: t('managers'), value: stats.users.managers },
    { name: t('supervisors'), value: stats.users.supervisors },
    { name: t('agents'), value: stats.users.agents },
  ];
  
  // Agents by region data
  const agentsByRegionData = [
    { name: t('riyadh'), value: stats.agents.byRegion.riyadh },
    { name: t('jeddah'), value: stats.agents.byRegion.jeddah },
    { name: t('dammam'), value: stats.agents.byRegion.dammam },
    { name: t('otherRegions'), value: stats.agents.byRegion.other },
  ];

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('dashboard')} role="admin">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t('welcomeToMehraanAdmin')}</h1>
          <p className="text-gray-500">{t('adminDashboardDescription')}</p>
        </div>
        
        {/* Stats Cards */}
        <StatsCardGrid stats={stats} />
        
        {/* Charts */}
        <DashboardCharts 
          ticketTypeData={ticketTypeData}
          userRoleData={userRoleData}
          agentsByRegionData={agentsByRegionData}
        />
        
        {/* Latest Tickets and Pending Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LatestTickets tickets={tickets} />
          <PendingRequests pendingCount={stats.users.pending} />
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminDashboard;
