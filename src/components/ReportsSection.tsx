
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReportsSection = () => {
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

  const handleGenerateReport = () => {
    console.log("توليد تقرير بالمعايير:", {
      agent: selectedAgent,
      dateRange,
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
          <Button onClick={handleGenerateReport} className="w-full">
            توليد التقرير
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
          <Button className="w-full">
            توليد التقرير العام
          </Button>
        </div>
      </Card>
    </div>
  );
};
