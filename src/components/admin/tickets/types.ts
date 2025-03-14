
export interface TicketTypeItem {
  id: string;
  name: string;
  key: string;
  description?: string;
  isActive?: boolean;
  requiresApproval?: boolean;
  createdAt?: Date;
}

export interface EditFormState {
  isEditing: boolean;
  currentTicketType: TicketTypeItem | null;
}
