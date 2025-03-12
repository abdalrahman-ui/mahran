
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketTypeChart from "./TicketTypeChart";
import PieChartCard from "./PieChartCard";

interface DashboardChartsProps {
  ticketTypeData: { name: string; value: number }[];
  userRoleData: { name: string; value: number }[];
  agentsByRegionData: { name: string; value: number }[];
}

const DashboardCharts = ({ 
  ticketTypeData, 
  userRoleData, 
  agentsByRegionData 
}: DashboardChartsProps) => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState<"daily" | "weekly" | "monthly">("daily");
  
  return (
    <Tabs defaultValue="tickets" className="mb-8">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="tickets">{t('tickets')}</TabsTrigger>
        <TabsTrigger value="users">{t('users')}</TabsTrigger>
        <TabsTrigger value="agents">{t('agents')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tickets">
        <TicketTypeChart data={ticketTypeData} />
      </TabsContent>
      
      <TabsContent value="users">
        <PieChartCard title={t('usersByRole')} data={userRoleData} />
      </TabsContent>
      
      <TabsContent value="agents">
        <PieChartCard title={t('agentsByRegion')} data={agentsByRegionData} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardCharts;
