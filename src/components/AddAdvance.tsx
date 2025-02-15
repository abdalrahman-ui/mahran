
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

export const AddAdvance = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    agentId: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    reason: "",
    paymentMethod: "",
    repaymentDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "تم تسجيل السلفة بنجاح",
      description: `تم تسجيل سلفة بقيمة ${formData.amount} ريال`
    });
    setFormData({
      agentId: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      reason: "",
      paymentMethod: "",
      repaymentDate: "",
      notes: "",
    });
  };

  const agents = [
    { id: "1", name: "أحمد محمد" },
    { id: "2", name: "محمد علي" },
    { id: "3", name: "خالد عبدالله" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">تسجيل سلفة جديدة</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="agentId">المندوب</Label>
            <Select 
              value={formData.agentId}
              onValueChange={(value) => setFormData({ ...formData, agentId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المندوب" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">مبلغ السلفة</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">تاريخ السلفة</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="paymentMethod">طريقة الدفع</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">نقدي</SelectItem>
                <SelectItem value="bank">تحويل بنكي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">سبب السلفة</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="repaymentDate">تاريخ السداد المتوقع</Label>
            <Input
              id="repaymentDate"
              type="date"
              value={formData.repaymentDate}
              onChange={(e) => setFormData({ ...formData, repaymentDate: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            تسجيل السلفة
          </Button>
        </div>
      </form>
    </Card>
  );
};
