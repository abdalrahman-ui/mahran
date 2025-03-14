
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TicketTypeItem {
  id: string;
  name: string;
  key: string;
  description?: string;
  isActive?: boolean;
  requiresApproval?: boolean;
  createdAt?: Date;
}

interface EditTicketTypeFormProps {
  ticketType: TicketTypeItem;
  onChange: (field: keyof TicketTypeItem, value: any) => void;
  onSubmit: () => void;
}

export const EditTicketTypeForm = ({ ticketType, onChange, onSubmit }: EditTicketTypeFormProps) => {
  const { t } = useLanguage();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('editTicketType')}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <Label htmlFor="editTypeName">{t('name')}</Label>
          <Input
            id="editTypeName"
            value={ticketType.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder={t('name')}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="editTypeKey">{t('key')}</Label>
          <Input
            id="editTypeKey"
            value={ticketType.key}
            onChange={(e) => onChange('key', e.target.value)}
            placeholder={t('key')}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="editTypeDescription">{t('description')}</Label>
          <Textarea
            id="editTypeDescription"
            value={ticketType.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder={t('description')}
            className="mt-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="editRequiresApproval"
            checked={ticketType.requiresApproval}
            onCheckedChange={(checked) => onChange('requiresApproval', checked)}
          />
          <Label htmlFor="editRequiresApproval">{t('requiresApproval')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="editIsActive"
            checked={ticketType.isActive}
            onCheckedChange={(checked) => onChange('isActive', checked)}
          />
          <Label htmlFor="editIsActive">{t('active')}</Label>
        </div>
        <Button className="w-full" onClick={onSubmit}>
          {t('update')}
        </Button>
      </div>
    </DialogContent>
  );
};
