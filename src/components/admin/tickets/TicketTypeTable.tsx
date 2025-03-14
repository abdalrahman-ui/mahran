
import React from "react";
import { Pencil, Trash, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TicketTypeItem {
  id: string;
  name: string;
  key: string;
  description?: string;
  isActive?: boolean;
  requiresApproval?: boolean;
  createdAt?: Date;
}

interface TicketTypeTableProps {
  ticketTypes: TicketTypeItem[];
  onEdit: (typeId: string) => void;
  onDelete: (typeId: string) => void;
}

export const TicketTypeTable = ({ ticketTypes, onEdit, onDelete }: TicketTypeTableProps) => {
  const { t } = useLanguage();
  
  return (
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
                    onClick={() => onEdit(type.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete(type.id)}
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
  );
};
