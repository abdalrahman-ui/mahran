
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinancialSectionProps {
  formData: {
    salary: {
      basic: number;
    };
    orderTargets: {
      daily: number;
      monthly: number;
    };
    deductions: {
      advances: number;
      residencyFees: number;
    };
  };
  setFormData: Dispatch<SetStateAction<any>>;
}

export const FinancialSection = ({ formData, setFormData }: FinancialSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">المستحقات والاستقطاعات</h3>
      <div>
        <Label htmlFor="salary">الراتب الأساسي</Label>
        <Input
          id="salary"
          type="number"
          value={formData.salary.basic}
          onChange={(e) => setFormData({
            ...formData,
            salary: { ...formData.salary, basic: Number(e.target.value) }
          })}
        />
      </div>
      <div>
        <Label htmlFor="orderTargets">الطلبات المستهدفة يومياً</Label>
        <Input
          id="orderTargets"
          type="number"
          value={formData.orderTargets.daily}
          onChange={(e) => setFormData({
            ...formData,
            orderTargets: { ...formData.orderTargets, daily: Number(e.target.value) }
          })}
        />
      </div>
      <div>
        <Label htmlFor="monthlyTarget">الطلبات المستهدفة شهرياً</Label>
        <Input
          id="monthlyTarget"
          type="number"
          value={formData.orderTargets.monthly}
          onChange={(e) => setFormData({
            ...formData,
            orderTargets: { ...formData.orderTargets, monthly: Number(e.target.value) }
          })}
        />
      </div>
      <div>
        <Label htmlFor="advances">السلف</Label>
        <Input
          id="advances"
          type="number"
          value={formData.deductions.advances}
          onChange={(e) => setFormData({
            ...formData,
            deductions: { ...formData.deductions, advances: Number(e.target.value) }
          })}
        />
      </div>
      <div>
        <Label htmlFor="residencyFees">رسوم الإقامة</Label>
        <Input
          id="residencyFees"
          type="number"
          value={formData.deductions.residencyFees}
          onChange={(e) => setFormData({
            ...formData,
            deductions: { ...formData.deductions, residencyFees: Number(e.target.value) }
          })}
        />
      </div>
    </div>
  );
};
