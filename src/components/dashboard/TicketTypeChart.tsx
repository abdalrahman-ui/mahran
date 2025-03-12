
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface TicketTypeChartProps {
  data: { name: string; value: number }[];
}

const TicketTypeChart = ({ data }: TicketTypeChartProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t('ticketsByType')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
  );
};

export default TicketTypeChart;
