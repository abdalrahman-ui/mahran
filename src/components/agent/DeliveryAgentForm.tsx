
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { WorkInfoSection } from "./WorkInfoSection";
import { FinancialSection } from "./FinancialSection";
import { useToast } from "@/hooks/use-toast";

export const DeliveryAgentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    idNumber: "",
    residencyNumber: "", // رقم الإقامة
    address: "",
    sponsorshipType: "", // نوع الكفالة
    appType: "", // نوع التطبيق
    vehicleType: "",
    startDate: "",
    bankAccount: "",
    nationalityId: "",
    workSchedule: {
      workingDays: [],
      hoursPerDay: 8,
    },
    salary: {
      basic: 0,
      housing: 0,
      transport: 0,
      other: 0
    },
    deductions: {
      advances: 0,
      fines: 0,
      violations: 0,
      sponsorshipTransfer: 0,
      residencyFees: 0,
      drivingLicense: 0,
      otherDeductions: 0
    },
    documents: {
      idCopy: false,
      residencyCopy: false,
      contractCopy: false,
      drivingLicense: false
    },
    orderTargets: {
      daily: 0,
      monthly: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "تم إضافة المندوب بنجاح",
      description: `تم إضافة المندوب ${formData.name} بنجاح`
    });
    setFormData({
      id: "",
      name: "",
      phone: "",
      email: "",
      idNumber: "",
      residencyNumber: "",
      address: "",
      sponsorshipType: "",
      appType: "",
      vehicleType: "",
      startDate: "",
      bankAccount: "",
      nationalityId: "",
      workSchedule: {
        workingDays: [],
        hoursPerDay: 8,
      },
      salary: {
        basic: 0,
        housing: 0,
        transport: 0,
        other: 0
      },
      deductions: {
        advances: 0,
        fines: 0,
        violations: 0,
        sponsorshipTransfer: 0,
        residencyFees: 0,
        drivingLicense: 0,
        otherDeductions: 0
      },
      documents: {
        idCopy: false,
        residencyCopy: false,
        contractCopy: false,
        drivingLicense: false
      },
      orderTargets: {
        daily: 0,
        monthly: 0
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PersonalInfoSection formData={formData} setFormData={setFormData} />
        <WorkInfoSection formData={formData} setFormData={setFormData} />
        <FinancialSection formData={formData} setFormData={setFormData} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto">
          إضافة المندوب
        </Button>
      </div>
    </form>
  );
};
