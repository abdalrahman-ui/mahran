
import { OrdersSection } from "@/components/OrdersSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">الطلبات</h1>
        <Link to="/">
          <Button variant="outline">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
      <OrdersSection />
    </div>
  );
};

export default Orders;
