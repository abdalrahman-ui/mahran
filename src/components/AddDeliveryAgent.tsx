
import { Card } from "@/components/ui/card";
import { DeliveryAgentForm } from "./agent/DeliveryAgentForm";

export const AddDeliveryAgent = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">إضافة مندوب جديد</h2>
      <DeliveryAgentForm />
    </Card>
  );
};
