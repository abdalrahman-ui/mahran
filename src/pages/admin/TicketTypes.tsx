
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockTicketTypes, addTicketType, deleteTicketType } from "@/services/mockDataService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash, Plus, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TicketTypeItem {
  id: string;
  name: string;
  key: string;
  description?: string;
  isActive?: boolean;
  requiresApproval?: boolean;
  createdAt?: Date;
}

interface EditFormState {
  isEditing: boolean;
  currentTicketType: TicketTypeItem | null;
}

const AdminTicketTypes = () => {
  const { t } = useLanguage();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeItem[]>([]);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeKey, setNewTypeKey] = useState("");
  const [newTypeDescription, setNewTypeDescription] = useState("");
  const [newTypeRequiresApproval, setNewTypeRequiresApproval] = useState(false);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>({
    isEditing: false,
    currentTicketType: null
  });

  useEffect(() => {
    // في التطبيق الحقيقي سيكون هناك استعلام API
    setTicketTypes(mockTicketTypes.map(type => ({
      ...type,
      description: type.description || '',
      isActive: type.isActive !== false, // إذا لم يتم تحديده، فهو نشط افتراضيًا
      requiresApproval: type.requiresApproval || false,
      createdAt: type.createdAt || new Date()
    })));
  }, []);

  const resetForm = () => {
    setNewTypeName("");
    setNewTypeKey("");
    setNewTypeDescription("");
    setNewTypeRequiresApproval(false);
    setEditForm({
      isEditing: false,
      currentTicketType: null
    });
  };

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
      description: newTypeDescription,
      isActive: true,
      requiresApproval: newTypeRequiresApproval,
      createdAt: new Date()
    };

    addTicketType(newTicketType);
    setTicketTypes([...ticketTypes, newTicketType]);
    resetForm();
    setShowAddDialog(false);
    toast.success('تم إضافة نوع التذكرة بنجاح');
  };

  const handleUpdateTicketType = () => {
    if (!editForm.currentTicketType) return;
    
    if (!editForm.currentTicketType.name.trim() || !editForm.currentTicketType.key.trim()) {
      toast.error('يرجى إدخال الاسم والمفتاح');
      return;
    }

    const updatedTypes = ticketTypes.map(type => 
      type.id === editForm.currentTicketType?.id ? editForm.currentTicketType : type
    );
    
    setTicketTypes(updatedTypes);
    resetForm();
    toast.success('تم تحديث نوع التذكرة بنجاح');
  };

  const handleEditTicketType = (typeId: string) => {
    const typeToEdit = ticketTypes.find(type => type.id === typeId);
    if (typeToEdit) {
      setEditForm({
        isEditing: true,
        currentTicketType: { ...typeToEdit }
      });
    }
  };

  const handleDeleteTicketType = (id: string) => {
    deleteTicketType(id);
    setTicketTypes(ticketTypes.filter(type => type.id !== id));
    toast.success('تم حذف نوع التذكرة بنجاح');
  };

  const handleEditFormChange = (field: keyof TicketTypeItem, value: any) => {
    if (editForm.currentTicketType) {
      setEditForm({
        ...editForm,
        currentTicketType: {
          ...editForm.currentTicketType,
          [field]: value
        }
      });
    }
  };

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('ticketTypes')} role="admin">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('ticketTypes')}</h2>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> {t('addTicketType')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('addTicketType')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="typeName">{t('name')}</Label>
                  <Input
                    id="typeName"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    placeholder={t('name')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="typeKey">{t('key')}</Label>
                  <Input
                    id="typeKey"
                    value={newTypeKey}
                    onChange={(e) => setNewTypeKey(e.target.value)}
                    placeholder={t('key')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="typeDescription">{t('description')}</Label>
                  <Textarea
                    id="typeDescription"
                    value={newTypeDescription}
                    onChange={(e) => setNewTypeDescription(e.target.value)}
                    placeholder={t('description')}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requiresApproval"
                    checked={newTypeRequiresApproval}
                    onCheckedChange={setNewTypeRequiresApproval}
                  />
                  <Label htmlFor="requiresApproval">{t('requiresApproval')}</Label>
                </div>
                <Button className="w-full" onClick={handleAddTicketType}>
                  {t('add')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">{t('name')}</th>
                        <th className="px-4 py-2 text-left">{t('key')}</th>
                        <th className="px-4 py-2 text-left">{t('description')}</th>
                        <th className="px-4 py-2 text-left">{t('requiresApproval')}</th>
                        <th className="px-4 py-2 text-left">{t('status')}</th>
                        <th className="px-4 py-2 text-right">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticketTypes.map((type) => (
                        <tr key={type.id}>
                          <td className="border px-4 py-2">{type.name}</td>
                          <td className="border px-4 py-2">{type.key}</td>
                          <td className="border px-4 py-2">
                            {type.description ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-blue-500" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{type.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="border px-4 py-2">
                            {type.requiresApproval ? 
                              <span className="text-green-600">{t('yes')}</span> : 
                              <span className="text-red-600">{t('no')}</span>
                            }
                          </td>
                          <td className="border px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${type.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {type.isActive ? t('active') : t('inactive')}
                            </span>
                          </td>
                          <td className="border px-4 py-2 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleEditTicketType(type.id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteTicketType(type.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* نموذج التحرير */}
        {editForm.isEditing && editForm.currentTicketType && (
          <Dialog open={editForm.isEditing} onOpenChange={(open) => !open && resetForm()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('editTicketType')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="editTypeName">{t('name')}</Label>
                  <Input
                    id="editTypeName"
                    value={editForm.currentTicketType.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                    placeholder={t('name')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editTypeKey">{t('key')}</Label>
                  <Input
                    id="editTypeKey"
                    value={editForm.currentTicketType.key}
                    onChange={(e) => handleEditFormChange('key', e.target.value)}
                    placeholder={t('key')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editTypeDescription">{t('description')}</Label>
                  <Textarea
                    id="editTypeDescription"
                    value={editForm.currentTicketType.description}
                    onChange={(e) => handleEditFormChange('description', e.target.value)}
                    placeholder={t('description')}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="editRequiresApproval"
                    checked={editForm.currentTicketType.requiresApproval}
                    onCheckedChange={(checked) => handleEditFormChange('requiresApproval', checked)}
                  />
                  <Label htmlFor="editRequiresApproval">{t('requiresApproval')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="editIsActive"
                    checked={editForm.currentTicketType.isActive}
                    onCheckedChange={(checked) => handleEditFormChange('isActive', checked)}
                  />
                  <Label htmlFor="editIsActive">{t('active')}</Label>
                </div>
                <Button className="w-full" onClick={handleUpdateTicketType}>
                  {t('update')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminTicketTypes;
