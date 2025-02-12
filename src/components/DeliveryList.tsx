
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const deliveryAgents = [
  {
    id: 1,
    name: "أحمد محمد",
    status: "نشط",
    orders: 5,
    location: "شارع الملك فهد",
    lastUpdate: "قبل 2 دقيقة"
  },
  {
    id: 2,
    name: "خالد عبدالله",
    status: "مشغول",
    orders: 3,
    location: "شارع التحلية",
    lastUpdate: "قبل 5 دقائق"
  },
  {
    id: 3,
    name: "محمد علي",
    status: "متوقف",
    orders: 0,
    location: "شارع الأمير سلطان",
    lastUpdate: "قبل 15 دقيقة"
  },
  // يمكن إضافة المزيد من المناديب هنا
];

export const DeliveryList = () => {
  return (
    <ScrollArea className="h-[400px] rounded-md">
      <div className="space-y-4">
        {deliveryAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-4 glass-card rounded-lg transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{agent.name}</h3>
              <Badge
                variant={
                  agent.status === "نشط"
                    ? "default"
                    : agent.status === "مشغول"
                    ? "secondary"
                    : "destructive"
                }
              >
                {agent.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>الطلبات الحالية: {agent.orders}</p>
              <p>الموقع: {agent.location}</p>
              <p className="text-xs mt-2">{agent.lastUpdate}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
