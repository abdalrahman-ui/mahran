
import { DeliveryList } from "@/components/DeliveryList";
import { MapComponent } from "@/components/MapComponent";
import { AddDeliveryAgent } from "@/components/AddDeliveryAgent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Agents = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">المناديب</h1>
        <Link to="/">
          <Button variant="outline">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        <AddDeliveryAgent />
        
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
    </div>
  );
};

export default Agents;
