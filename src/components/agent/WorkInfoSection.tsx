
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkInfoSectionProps {
  formData: {
    sponsorshipType: string;
    appType: string;
    vehicleType: string;
    startDate: string;
    bankAccount: string;
  };
  setFormData: Dispatch<SetStateAction<any>>;
}

export const WorkInfoSection = ({ formData, setFormData }: WorkInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">بيانات العمل</h3>
      <div>
        <Label htmlFor="sponsorshipType">نوع الكفالة</Label>
        <Select 
          value={formData.sponsorshipType}
          onValueChange={(value) => setFormData({ ...formData, sponsorshipType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع الكفالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">كفالة شركة</SelectItem>
            <SelectItem value="personal">كفالة شخصية</SelectItem>
            <SelectItem value="transfer">نقل كفالة</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="appType">نوع التطبيق</Label>
        <Select
          value={formData.appType}
          onValueChange={(value) => setFormData({ ...formData, appType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع التطبيق" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hungerstation">هنقرستيشن</SelectItem>
            <SelectItem value="jahez">جاهز</SelectItem>
            <SelectItem value="shgardi">شقردي</SelectItem>
            <SelectItem value="mrsool">مرسول</SelectItem>
            <SelectItem value="other">أخرى</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="vehicleType">نوع المركبة</Label>
        <Select
          value={formData.vehicleType}
          onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع المركبة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="car">سيارة</SelectItem>
            <SelectItem value="motorcycle">دراجة نارية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="startDate">تاريخ بداية العمل</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="bankAccount">رقم الحساب البنكي</Label>
        <Input
          id="bankAccount"
          value={formData.bankAccount}
          onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
        />
      </div>
    </div>
  );
};
