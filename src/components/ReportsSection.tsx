
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReportsSection = () => {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const agents = [
    { id: "1", name: "خالد محمد" },
    { id: "2", name: "أحمد علي" },
    { id: "3", name: "عمر أحمد" },
  ];

  const handleGenerateReport = (type: 'agent' | 'general') => {
    // هنا سيتم إضافة منطق توليد التقرير الفعلي
    const reportData = type === 'agent' ? 
      [{ agent: 'خالد محمد', orders: 25, completedOrders: 20, revenue: 5000 }] :
      [{ totalOrders: 150, activeAgents: 12, totalRevenue: 25000 }];

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type === 'agent' ? "Agent Report" : "General Report");
    XLSX.writeFile(workbook, `${type}-report.xlsx`);

    toast({
      title: "تم توليد التقرير",
      description: "تم تصدير التقرير إلى ملف Excel"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">تقرير المندوب</h2>
        <div className="space-y-4">
          <div>
            <Label>اختر المندوب</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المندوب" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">من تاريخ</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dateTo">إلى تاريخ</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>
          <Button 
            onClick={() => handleGenerateReport('agent')} 
            className="w-full"
            variant="default"
          >
            <Download className="w-4 h-4 ml-2" />
            توليد تقرير المندوب
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">التقرير العام</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="generalDateFrom">من تاريخ</Label>
              <Input
                id="generalDateFrom"
                type="date"
              />
            </div>
            <div>
              <Label htmlFor="generalDateTo">إلى تاريخ</Label>
              <Input
                id="generalDateTo"
                type="date"
              />
            </div>
          </div>
          <Button 
            onClick={() => handleGenerateReport('general')} 
            className="w-full"
            variant="default"
          >
            <Download className="w-4 h-4 ml-2" />
            توليد التقرير العام
          </Button>
        </div>
      </Card>
    </div>
  );
};
