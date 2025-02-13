
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { StatsGrid } from '@/components/StatsGrid';
import { Link } from "react-router-dom";
import { MapPin, Package, Users, FileText } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen p-4 sm:p-6 animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <Badge variant="outline" className="px-4 py-1">
            مباشر
          </Badge>
        </div>
      </header>

      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Link to="/agents">
          <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">المناديب</h3>
                <p className="text-sm text-muted-foreground">إدارة وتتبع المناديب</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/orders">
          <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">الطلبات</h3>
                <p className="text-sm text-muted-foreground">إدارة ومتابعة الطلبات</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/reports">
          <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">التقارير</h3>
                <p className="text-sm text-muted-foreground">تقارير وإحصائيات</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Index;
