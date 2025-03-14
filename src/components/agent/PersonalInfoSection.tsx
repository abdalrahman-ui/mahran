
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    idNumber: string;
    residencyNumber: string;
    address: string;
  };
  setFormData: Dispatch<SetStateAction<any>>;
}

export const PersonalInfoSection = ({ formData, setFormData }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">البيانات الشخصية</h3>
      <div>
        <Label htmlFor="name">اسم المندوب</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">رقم الجوال</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="idNumber">رقم الهوية</Label>
        <Input
          id="idNumber"
          value={formData.idNumber}
          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="residencyNumber">رقم الإقامة</Label>
        <Input
          id="residencyNumber"
          value={formData.residencyNumber}
          onChange={(e) => setFormData({ ...formData, residencyNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">عنوان السكن</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
