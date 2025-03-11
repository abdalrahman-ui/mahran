
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { getTickets, mockTicketTypes } from "@/services/mockDataService";
import { Ticket, TicketStatus } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManagerTickets = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TicketStatus>("new");
  const tickets = getTickets();
  
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
    <RequireAuth allowedRoles={['manager']}>
      <PageLayout title={t('tickets')} role="manager">
        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TicketStatus)}>
            <TabsList className="w-full justify-start border-b rounded-none p-0">
              <TabsTrigger 
                value="new"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('new')}
              </TabsTrigger>
              <TabsTrigger 
                value="open"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('openTickets')}
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('pending')}
              </TabsTrigger>
              <TabsTrigger 
                value="closed"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('closedTickets')}
              </TabsTrigger>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('region')}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            الرياض
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

export default ManagerTickets;
