
export type UserRole = 'admin' | 'manager' | 'supervisor' | 'agent';

export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  region?: string; // Required for supervisors
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TicketType = 'advance' | 'fewOrders' | 'salary' | 'other';

export type TicketStatus = 'new' | 'open' | 'closed' | 'pending';

export interface Ticket {
  id: string;
  ticketId: string; // External facing ID (e.g., TKT-12345)
  agentId: string;
  type: TicketType;
  description: string;
  notes?: string;
  attachments?: string[]; // File paths or URLs
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface Agent {
  id: string;
  name: string;
  idNumber: string; // Saudi ID
  region: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Supervisor ID
}
