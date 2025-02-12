
import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapComponent } from '@/components/MapComponent';
import { DeliveryList } from '@/components/DeliveryList';
import { AddDeliveryAgent } from '@/components/AddDeliveryAgent';
import { StatsGrid } from '@/components/StatsGrid';
import { MapPin, Package, Truck, Users } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showAddAgent, setShowAddAgent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث حالة المناديب بنجاح",
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddAgent(!showAddAgent)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              {showAddAgent ? "إخفاء النموذج" : "إضافة مندوب جديد"}
            </button>
            <Badge variant="outline" className="px-4 py-1">
              مباشر
            </Badge>
          </div>
        </div>
      </header>

      {showAddAgent && (
        <div className="mb-6">
          <AddDeliveryAgent />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="المناديب النشطين"
          value="12"
          icon={<Users className="h-4 w-4" />}
          trend="+2"
        />
        <StatsCard
          title="الطلبات الجارية"
          value="28"
          icon={<Package className="h-4 w-4" />}
          trend="+5"
        />
        <StatsCard
          title="طلبات مكتملة اليوم"
          value="145"
          icon={<Truck className="h-4 w-4" />}
          trend="+22"
        />
        <StatsCard
          title="المواقع النشطة"
          value="8"
          icon={<MapPin className="h-4 w-4" />}
          trend="-1"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card p-4 h-[500px]">
          <h2 className="text-xl font-semibold mb-4">خريطة المناديب</h2>
          <MapComponent />
        </Card>
        
        <Card className="glass-card p-4 h-[500px] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">قائمة المناديب</h2>
          <DeliveryList />
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, trend }: { 
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) => (
  <Card className="glass-card p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="mt-4">
      <Badge variant={trend.startsWith('+') ? 'default' : 'destructive'}>
        {trend} من أمس
      </Badge>
    </div>
  </Card>
);

export default Index;
