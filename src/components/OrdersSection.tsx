
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const OrdersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const orders = [
    { id: 1, customer: "أحمد محمد", status: "جاري التوصيل", agent: "خالد", date: "2024-03-20" },
    { id: 2, customer: "محمد علي", status: "تم التوصيل", agent: "عمر", date: "2024-03-19" },
    { id: 3, customer: "فاطمة أحمد", status: "قيد الانتظار", agent: "سعد", date: "2024-03-21" },
  ];

  const filteredOrders = orders.filter(order => 
    order.customer.includes(searchTerm) || 
    order.agent.includes(searchTerm) ||
    order.status.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-4">
          <Label htmlFor="search">بحث في الطلبات</Label>
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن طريق اسم العميل، المندوب، أو الحالة"
          />
        </div>

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">طلب #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">العميل: {order.customer}</p>
                  <p className="text-sm text-muted-foreground">المندوب: {order.agent}</p>
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
