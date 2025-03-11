
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockTicketTypes } from "@/services/mockDataService";
import { toast } from "sonner";

interface TicketTypeItem {
  id: string;
  name: string;
  key: string;
}

const AdminTicketTypes = () => {
  const { t } = useLanguage();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeItem[]>(mockTicketTypes);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeKey, setNewTypeKey] = useState("");

  const handleAddTicketType = () => {
    if (!newTypeName.trim() || !newTypeKey.trim()) {
      toast.error('يرجى إدخال الاسم والمفتاح');
      return;
    }

    const newId = (ticketTypes.length + 1).toString();
    const newTicketType: TicketTypeItem = {
      id: newId,
      name: newTypeName,
      key: newTypeKey,
    };

    setTicketTypes([...ticketTypes, newTicketType]);
    setNewTypeName("");
    setNewTypeKey("");
    toast.success('تم إضافة نوع التذكرة بنجاح');
  };

  const handleDeleteTicketType = (id: string) => {
    setTicketTypes(ticketTypes.filter(type => type.id !== id));
    toast.success('تم حذف نوع التذكرة بنجاح');
  };

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('ticketTypes')} role="admin">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('ticketTypes')}</h2>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">{t('name')}</th>
                      <th className="px-4 py-2 text-left">{t('key')}</th>
                      <th className="px-4 py-2 text-left">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketTypes.map((type) => (
                      <tr key={type.id}>
                        <td className="border px-4 py-2">{type.name}</td>
                        <td className="border px-4 py-2">{type.key}</td>
                        <td className="border px-4 py-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteTicketType(type.id)}
                          >
                            {t('delete')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('addTicketType')}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="typeName">{t('name')}</Label>
                  <Input
                    id="typeName"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    placeholder={t('name')}
                  />
                </div>
                <div>
                  <Label htmlFor="typeKey">{t('key')}</Label>
                  <Input
                    id="typeKey"
                    value={newTypeKey}
                    onChange={(e) => setNewTypeKey(e.target.value)}
                    placeholder={t('key')}
                  />
                </div>
                <Button className="w-full" onClick={handleAddTicketType}>
                  {t('add')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminTicketTypes;
