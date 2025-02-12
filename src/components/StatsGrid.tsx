
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Users, MapPin } from 'lucide-react';

export const StatsGrid = () => {
  const stats = [
    {
      title: "المناديب النشطين",
      value: "12",
      icon: <Users className="h-4 w-4" />,
      trend: "+2"
    },
    {
      title: "الطلبات الجارية",
      value: "28",
      icon: <Package className="h-4 w-4" />,
      trend: "+5"
    },
    {
      title: "طلبات مكتملة اليوم",
      value: "145",
      icon: <Truck className="h-4 w-4" />,
      trend: "+22"
    },
    {
      title: "المواقع النشطة",
      value: "8",
      icon: <MapPin className="h-4 w-4" />,
      trend: "-1"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
          <div className="mt-4">
            <Badge variant={stat.trend.startsWith('+') ? 'default' : 'destructive'}>
              {stat.trend} من أمس
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
