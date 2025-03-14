
export type UserRole = 'admin' | 'manager' | 'supervisor' | 'agent';

export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  region?: string; // Required for supervisors and agents
  status: UserStatus;
  email?: string; // Added for notifications
  phone?: string; // Added for contact
  idNumber?: string; // For Saudi ID
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // ID of user who created this user
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
  comments?: TicketComment[]; // Added for admin/supervisor comments
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userRole: UserRole;
  content: string;
  createdAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  idNumber: string; // Saudi ID
  region: string;
  phone?: string; // Optional phone field
  email?: string; // Added for notifications
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Supervisor or Admin ID
  lastModifiedBy?: string; // For tracking who last modified
  lastModifiedAt?: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userRole: UserRole;
  actionType: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'comment';
  entityType: 'user' | 'agent' | 'ticket';
  entityId: string;
  details: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  relatedTo?: {
    type: 'ticket' | 'user' | 'agent';
    id: string;
  };
  createdAt: Date;
}
