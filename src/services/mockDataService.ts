
import { User, UserRole, UserStatus, Ticket, TicketType, TicketStatus, Agent } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
const mockUsers: User[] = [
  {
    id: uuidv4(),
    username: 'admin',
    firstName: 'محمد',
    lastName: 'أحمد',
    role: 'admin',
    status: 'approved',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: uuidv4(),
    username: 'manager1',
    firstName: 'أحمد',
    lastName: 'محمود',
    role: 'manager',
    status: 'approved',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: uuidv4(),
    username: 'supervisor1',
    firstName: 'خالد',
    lastName: 'عبدالله',
    role: 'supervisor',
    region: 'الرياض',
    status: 'approved',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
  {
    id: uuidv4(),
    username: 'supervisor2',
    firstName: 'عمر',
    lastName: 'محمد',
    role: 'supervisor',
    region: 'جدة',
    status: 'pending',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04'),
  }
];

// Mock Agents
const mockAgents: Agent[] = [
  {
    id: uuidv4(),
    name: 'سلمان علي',
    idNumber: '1234567890',
    region: 'الرياض',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
    createdBy: mockUsers[2].id, // Supervisor 1
  },
  {
    id: uuidv4(),
    name: 'ماجد سعد',
    idNumber: '0987654321',
    region: 'الرياض',
    createdAt: new Date('2023-01-06'),
    updatedAt: new Date('2023-01-06'),
    createdBy: mockUsers[2].id, // Supervisor 1
  },
  {
    id: uuidv4(),
    name: 'فهد محمد',
    idNumber: '1122334455',
    region: 'جدة',
    createdAt: new Date('2023-01-07'),
    updatedAt: new Date('2023-01-07'),
    createdBy: mockUsers[3].id, // Supervisor 2
  }
];

// Mock Tickets
const mockTickets: Ticket[] = [
  {
    id: uuidv4(),
    ticketId: 'TKT-001',
    agentId: mockAgents[0].id,
    type: 'advance',
    description: 'طلب سلفة بمبلغ 1000 ريال',
    status: 'new',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
  },
  {
    id: uuidv4(),
    ticketId: 'TKT-002',
    agentId: mockAgents[1].id,
    type: 'fewOrders',
    description: 'لم يتم استلام طلبات كافية هذا الأسبوع',
    status: 'open',
    createdAt: new Date('2023-01-11'),
    updatedAt: new Date('2023-01-12'),
  },
  {
    id: uuidv4(),
    ticketId: 'TKT-003',
    agentId: mockAgents[2].id,
    type: 'salary',
    description: 'لم يتم استلام الراتب الشهري',
    notes: 'يرجى التحقق من حساب البنك المرفق',
    status: 'closed',
    createdAt: new Date('2023-01-13'),
    updatedAt: new Date('2023-01-15'),
    closedAt: new Date('2023-01-15'),
  }
];

// Mock Ticket Types
export const mockTicketTypes = [
  { id: '1', name: 'سلفة', key: 'advance' },
  { id: '2', name: 'قلة طلبات', key: 'fewOrders' },
  { id: '3', name: 'راتب', key: 'salary' },
  { id: '4', name: 'أخرى', key: 'other' }
];

// Mock Service Functions
export const getUsers = () => {
  return [...mockUsers];
};

export const getUserById = (id: string) => {
  return mockUsers.find(user => user.id === id);
};

export const addUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newUser: User = {
    ...user,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUserStatus = (id: string, status: UserStatus) => {
  const user = mockUsers.find(u => u.id === id);
  if (user) {
    user.status = status;
    user.updatedAt = new Date();
    return user;
  }
  return null;
};

export const getAgents = () => {
  return [...mockAgents];
};

export const getAgentsByRegion = (region: string) => {
  return mockAgents.filter(agent => agent.region === region);
};

export const addAgent = (agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newAgent: Agent = {
    ...agent,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockAgents.push(newAgent);
  return newAgent;
};

export const getTickets = () => {
  return [...mockTickets];
};

export const getTicketsByAgentId = (agentId: string) => {
  return mockTickets.filter(ticket => ticket.agentId === agentId);
};

export const getTicketById = (id: string) => {
  return mockTickets.find(ticket => ticket.id === id || ticket.ticketId === id);
};

export const addTicket = (ticket: Omit<Ticket, 'id' | 'ticketId' | 'createdAt' | 'updatedAt'>) => {
  // Generate sequential ticket ID (in real app, this would be more robust)
  const ticketNumber = mockTickets.length + 1;
  const ticketId = `TKT-${ticketNumber.toString().padStart(3, '0')}`;
  
  const newTicket: Ticket = {
    ...ticket,
    id: uuidv4(),
    ticketId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockTickets.push(newTicket);
  return newTicket;
};

export const updateTicketStatus = (id: string, status: TicketStatus) => {
  const ticket = mockTickets.find(t => t.id === id || t.ticketId === id);
  if (ticket) {
    ticket.status = status;
    ticket.updatedAt = new Date();
    if (status === 'closed') {
      ticket.closedAt = new Date();
    }
    return ticket;
  }
  return null;
};
