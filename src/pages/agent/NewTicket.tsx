
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { mockTicketTypes, addTicket } from "@/services/mockDataService";
import { TicketType } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AgentNewTicket = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketType || !description) {
      toast.error('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }

    if (user) {
      addTicket({
        agentId: user.id,
        type: ticketType as TicketType,
        description,
        notes,
        status: 'new',
        attachments: files ? Array.from(files).map(file => file.name) : undefined,
      });
      
      toast.success('تم إنشاء التذكرة بنجاح');
      navigate('/agent/tickets');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Check file size (2GB max)
      let totalSize = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        totalSize += selectedFiles[i].size;
      }
      
      const maxSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
      if (totalSize > maxSize) {
        toast.error('حجم الملفات يتجاوز الحد الأقصى (2 جيجابايت)');
        e.target.value = '';
        return;
      }
      
      setFiles(selectedFiles);
    }
  };

  return (
    <RequireAuth allowedRoles={['agent']}>
      <PageLayout title={t('newTicket')} role="agent">
        <Card className="p-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="ticketType">{t('type')}</Label>
              <Select
                value={ticketType || "unselected"}
                onValueChange={(value) => setTicketType(value as TicketType)}
              >
                <SelectTrigger id="ticketType">
                  <SelectValue placeholder={t('selectTicketType')} />
                </SelectTrigger>
                <SelectContent>
                  {mockTicketTypes.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                      {type.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="unselected">{t('selectTicketType')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">{t('description')}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('description')}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">{t('notes')}</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('notes')}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="files">{t('attachments')}</Label>
              <Input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                {t('maxFileSize')}: 2GB
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/agent/tickets')}>
                {t('cancel')}
              </Button>
              <Button type="submit">
                {t('createTicket')}
              </Button>
            </div>
          </form>
        </Card>
      </PageLayout>
    </RequireAuth>
  );
};

export default AgentNewTicket;
