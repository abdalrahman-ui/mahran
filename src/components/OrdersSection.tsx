
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

export const OrdersSection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const orders = [
    { id: 1, customer: "أحمد محمد", status: "جاري التوصيل", agent: "خالد", date: "2024-03-20", location: "الرياض" },
    { id: 2, customer: "محمد علي", status: "تم التوصيل", agent: "عمر", date: "2024-03-19", location: "جدة" },
    { id: 3, customer: "فاطمة أحمد", status: "قيد الانتظار", agent: "سعد", date: "2024-03-21", location: "الدمام" },
  ];

  const filteredOrders = orders.filter(order => 
    order.customer.includes(searchTerm) || 
    order.agent.includes(searchTerm) ||
    order.status.includes(searchTerm) ||
    order.location.includes(searchTerm)
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير البيانات إلى ملف Excel"
    });
  };

  const importFromExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log('Imported data:', jsonData);
          toast({
            title: "تم الاستيراد بنجاح",
            description: "تم استيراد البيانات من ملف Excel"
          });
        } catch (error) {
          toast({
            title: "حدث خطأ",
            description: "فشل استيراد البيانات",
            variant: "destructive"
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Label htmlFor="search">بحث في الطلبات</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن طريق اسم العميل، المندوب، الحالة، أو الموقع"
              className="mt-1"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={exportToExcel}
              className="flex-1 sm:flex-none"
              variant="outline"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير Excel
            </Button>
            <div className="relative flex-1 sm:flex-none">
              <Input
                type="file"
                accept=".xlsx,.xls"
                onChange={importFromExcel}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 ml-2" />
                استيراد Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Card key={order.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">طلب #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">العميل: {order.customer}</p>
                  <p className="text-sm text-muted-foreground">المندوب: {order.agent}</p>
                  <p className="text-sm text-muted-foreground">الموقع: {order.location}</p>
                </div>
                <div className="text-end">
                  <Badge variant={
                    order.status === "تم التوصيل" ? "default" :
                    order.status === "جاري التوصيل" ? "secondary" : "outline"
                  }>
                    {order.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
