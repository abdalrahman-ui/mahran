
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const AddDeliveryAgent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idNumber: "",
    vehicleType: "",
    startDate: "",
    deductions: {
      advances: 0,
      fines: 0,
      violations: 0,
      sponsorshipTransfer: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم إضافة منطق حفظ البيانات
    console.log(formData);
    toast({
      title: "تم إضافة المندوب بنجاح",
      description: `تم إضافة المندوب ${formData.name} بنجاح`
    });
    // إعادة تعيين النموذج
    setFormData({
      name: "",
      phone: "",
      idNumber: "",
      vehicleType: "",
      startDate: "",
      deductions: {
        advances: 0,
        fines: 0,
        violations: 0,
        sponsorshipTransfer: 0
      }
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">إضافة مندوب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* البيانات الأساسية */}
          <div className="space-y-4">
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
              <Label htmlFor="idNumber">رقم الهوية</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="vehicleType">نوع المركبة</Label>
              <Input
                id="vehicleType"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">تاريخ البداية</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* الاستقطاعات */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">الاستقطاعات</h3>
            <div>
              <Label htmlFor="advances">السلف</Label>
              <Input
                id="advances"
                type="number"
                value={formData.deductions.advances}
                onChange={(e) => setFormData({
                  ...formData,
                  deductions: {
                    ...formData.deductions,
                    advances: Number(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="fines">الغرامات</Label>
              <Input
                id="fines"
                type="number"
                value={formData.deductions.fines}
                onChange={(e) => setFormData({
                  ...formData,
                  deductions: {
                    ...formData.deductions,
                    fines: Number(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="violations">المخالفات</Label>
              <Input
                id="violations"
                type="number"
                value={formData.deductions.violations}
                onChange={(e) => setFormData({
                  ...formData,
                  deductions: {
                    ...formData.deductions,
                    violations: Number(e.target.value)
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="sponsorshipTransfer">نقل الكفالة</Label>
              <Input
                id="sponsorshipTransfer"
                type="number"
                value={formData.deductions.sponsorshipTransfer}
                onChange={(e) => setFormData({
                  ...formData,
                  deductions: {
                    ...formData.deductions,
                    sponsorshipTransfer: Number(e.target.value)
                  }
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
