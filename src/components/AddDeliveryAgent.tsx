
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AddDeliveryAgent = () => {
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
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">إضافة مندوب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* البيانات الشخصية */}
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

          {/* بيانات العمل */}
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

          {/* المستحقات والاستقطاعات */}
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            إضافة المندوب
          </Button>
        </div>
      </form>
    </Card>
  );
};
