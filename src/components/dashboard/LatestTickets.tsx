
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Ticket } from "@/types";

interface LatestTicketsProps {
  tickets: Ticket[];
}

const LatestTickets = ({ tickets }: LatestTicketsProps) => {
  const { t } = useLanguage();

  return (
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
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{ticket.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LatestTickets;
