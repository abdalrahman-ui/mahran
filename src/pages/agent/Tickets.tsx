
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getTicketsByAgentId, mockTicketTypes } from "@/services/mockDataService";
import { Ticket, TicketStatus } from "@/types";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tab interface
interface Tab {
  value: TicketStatus;
  label: string;
}

const AgentTickets = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<TicketStatus>("new");
  
  // Define tabs
  const tabs: Tab[] = [
    { value: "new", label: t('newTicket') },
    { value: "open", label: t('openTickets') },
    { value: "pending", label: t('pending') },
    { value: "closed", label: t('closedTickets') },
  ];

  useEffect(() => {
    if (user) {
      const agentTickets = getTicketsByAgentId(user.id);
      setTickets(agentTickets);
    }
  }, [user]);

  // Filter tickets by status
  const filteredTickets = tickets.filter(ticket => ticket.status === activeTab);

  // Get ticket type name
  const getTicketTypeName = (key: string) => {
    const type = mockTicketTypes.find(t => t.key === key);
    return type ? type.name : key;
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <RequireAuth allowedRoles={['agent']}>
      <PageLayout title={t('myTickets')} role="agent">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('myTickets')}</h2>
          <Link to="/agent/new-ticket">
            <Button>
              {t('createTicket')}
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TicketStatus)}>
            <TabsList className="w-full justify-start border-b rounded-none p-0">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} className="p-0">
              {filteredTickets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ticketId')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('type')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('description')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('date')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket.ticketId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getTicketTypeName(ticket.type)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                            {ticket.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(ticket.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  {t('noTicketsFound')}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </PageLayout>
    </RequireAuth>
  );
};

export default AgentTickets;
