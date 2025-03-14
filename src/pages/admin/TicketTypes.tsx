
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { mockTicketTypes, addTicketType, deleteTicketType } from "@/services/mockDataService";
import { TicketTypeTable } from "@/components/admin/tickets/TicketTypeTable";
import { AddTicketTypeForm } from "@/components/admin/tickets/AddTicketTypeForm";
import { EditTicketTypeForm } from "@/components/admin/tickets/EditTicketTypeForm";
import { EditFormState, TicketTypeItem } from "@/components/admin/tickets/types";

const AdminTicketTypes = () => {
  const { t } = useLanguage();
  const [ticketTypes, setTicketTypes] = useState<TicketTypeItem[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>({
    isEditing: false,
    currentTicketType: null
  });

  useEffect(() => {
    // In a real app, there would be an API query
    setTicketTypes(mockTicketTypes.map(type => ({
      ...type,
      description: type.description || '',
      isActive: type.isActive !== false, // If not specified, it's active by default
      requiresApproval: type.requiresApproval || false,
      createdAt: type.createdAt || new Date()
    })));
  }, []);

  const resetForm = () => {
    setEditForm({
      isEditing: false,
      currentTicketType: null
    });
  };

  const handleAddTicketType = (newTypeData: {
    name: string;
    key: string;
    description: string;
    requiresApproval: boolean;
  }) => {
    if (!newTypeData.name.trim() || !newTypeData.key.trim()) {
      toast.error('يرجى إدخال الاسم والمفتاح');
      return;
    }

    const newId = (ticketTypes.length + 1).toString();
    const newTicketType: TicketTypeItem = {
      id: newId,
      name: newTypeData.name,
      key: newTypeData.key,
      description: newTypeData.description,
      isActive: true,
      requiresApproval: newTypeData.requiresApproval,
      createdAt: new Date()
    };

    addTicketType(newTicketType);
    setTicketTypes([...ticketTypes, newTicketType]);
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
            <AddTicketTypeForm onSubmit={handleAddTicketType} />
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <Card className="overflow-hidden">
              <div className="p-6">
                <TicketTypeTable 
                  ticketTypes={ticketTypes} 
                  onEdit={handleEditTicketType} 
                  onDelete={handleDeleteTicketType} 
                />
              </div>
            </Card>
          </div>
        </div>
        
        {/* Edit Form Dialog */}
        {editForm.isEditing && editForm.currentTicketType && (
          <Dialog open={editForm.isEditing} onOpenChange={(open) => !open && resetForm()}>
            <EditTicketTypeForm 
              ticketType={editForm.currentTicketType}
              onChange={handleEditFormChange}
              onSubmit={handleUpdateTicketType}
            />
          </Dialog>
        )}
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminTicketTypes;
