
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddTicketTypeFormProps {
  onSubmit: (ticketTypeData: {
    name: string;
    key: string;
    description: string;
    requiresApproval: boolean;
  }) => void;
}

export const AddTicketTypeForm = ({ onSubmit }: AddTicketTypeFormProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [requiresApproval, setRequiresApproval] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      name,
      key,
      description,
      requiresApproval
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('addTicketType')}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div>
          <Label htmlFor="typeName">{t('name')}</Label>
          <Input
            id="typeName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('name')}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="typeKey">{t('key')}</Label>
          <Input
            id="typeKey"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={t('key')}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="typeDescription">{t('description')}</Label>
          <Textarea
            id="typeDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('description')}
            className="mt-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="requiresApproval"
            checked={requiresApproval}
            onCheckedChange={setRequiresApproval}
          />
          <Label htmlFor="requiresApproval">{t('requiresApproval')}</Label>
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          {t('add')}
        </Button>
      </div>
    </DialogContent>
  );
};
