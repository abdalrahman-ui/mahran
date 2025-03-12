
import { useLanguage } from "@/contexts/LanguageContext";
import StatCard from "./StatCard";
import { Users, AlertTriangle, UserCheck, Clock } from "lucide-react";

interface SystemStats {
  users: {
    total: number;
    admins: number;
    managers: number;
    supervisors: number;
    agents: number;
    pending: number;
  };
  tickets: {
    total: number;
    new: number;
    open: number;
    pending: number;
    closed: number;
  };
  agents: {
    total: number;
    byRegion: {
      riyadh: number;
      jeddah: number;
      dammam: number;
      other: number;
    };
  };
}

interface StatsCardGridProps {
  stats: SystemStats;
}

const StatsCardGrid = ({ stats }: StatsCardGridProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title={t('totalUsers')}
        value={stats.users.total}
        icon={<Users className="h-8 w-8 text-blue-500" />}
        details={[
          { label: t('pendingUsers'), value: stats.users.pending, color: "text-amber-500" }
        ]}
      />
      
      <StatCard
        title={t('totalTickets')}
        value={stats.tickets.total}
        icon={<AlertTriangle className="h-8 w-8 text-yellow-500" />}
        details={[
          { label: t('newTickets'), value: stats.tickets.new, color: "text-blue-500" }
        ]}
      />
      
      <StatCard
        title={t('totalAgents')}
        value={stats.agents.total}
        icon={<UserCheck className="h-8 w-8 text-green-500" />}
        details={[
          { label: t('riyadh'), value: stats.agents.byRegion.riyadh },
          { label: t('jeddah'), value: stats.agents.byRegion.jeddah }
        ]}
      />
      
      <StatCard
        title={t('ticketStatus')}
        value={stats.tickets.open + stats.tickets.pending}
        icon={<Clock className="h-8 w-8 text-purple-500" />}
        details={[
          { label: t('open'), value: stats.tickets.open, color: "text-orange-500" },
          { label: t('closed'), value: stats.tickets.closed, color: "text-green-500" }
        ]}
      />
    </div>
  );
};

export default StatsCardGrid;
