import { User, UserStatus, TicketType, TicketStatus, Ticket, Agent, UserRole } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// قائمة المستخدمين
const users: User[] = [
  {
    id: "1",
    username: "admin",
    firstName: "عبدالله",
    lastName: "القحطاني",
    role: "admin",
    status: "approved",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    username: "manager1",
    firstName: "سعيد",
    lastName: "العتيبي",
    role: "manager",
    status: "approved",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "3",
    username: "supervisor1",
    firstName: "محمد",
    lastName: "الشمري",
    role: "supervisor",
    region: "الرياض",
    status: "approved",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: "4",
    username: "agent1",
    firstName: "أحمد",
    lastName: "الغامدي",
    role: "agent",
    region: "جدة",
    status: "approved",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: "5",
    username: "newagent",
    firstName: "خالد",
    lastName: "الحربي",
    role: "agent",
    region: "الدمام",
    status: "pending",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  }
];

// قائمة أنواع التذاكر
export const mockTicketTypes = [
  {
    id: "1",
    name: "سلفة",
    key: "advance",
    description: "طلب سلفة مالية للمندوب",
    requiresApproval: true,
    isActive: true,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "2",
    name: "قلة طلبات",
    key: "fewOrders",
    description: "الإبلاغ عن قلة الطلبات في منطقة معينة",
    requiresApproval: false,
    isActive: true,
    createdAt: new Date("2023-01-02")
  },
  {
    id: "3",
    name: "راتب",
    key: "salary",
    description: "استفسار أو مشكلة متعلقة بالراتب",
    requiresApproval: true,
    isActive: true,
    createdAt: new Date("2023-01-03")
  },
  {
    id: "4",
    name: "أخرى",
    key: "other",
    description: "أي نوع آخر من الطلبات أو المشكلات",
    requiresApproval: false,
    isActive: true,
    createdAt: new Date("2023-01-04")
  }
];

// قائمة التذاكر
const tickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT-12345",
    agentId: "4",
    type: "advance",
    description: "طلب سلفة بمبلغ 2000 ريال",
    status: "new",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-01"),
  },
  {
    id: "2",
    ticketId: "TKT-12346",
    agentId: "4",
    type: "fewOrders",
    description: "قلة الطلبات في منطقة حي النزهة بجدة",
    status: "open",
    createdAt: new Date("2023-06-02"),
    updatedAt: new Date("2023-06-02"),
  },
  {
    id: "3",
    ticketId: "TKT-12347",
    agentId: "4",
    type: "other",
    description: "طلب تغيير منطقة العمل",
    notes: "بسبب الانتقال للسكن في منطقة أخرى",
    status: "closed",
    createdAt: new Date("2023-06-03"),
    updatedAt: new Date("2023-06-05"),
    closedAt: new Date("2023-06-05"),
  }
];

// قائمة المناديب
let agents: Agent[] = [
  {
    id: "1",
    name: "أحمد الغامدي",
    idNumber: "1234567890",
    region: "جدة",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    createdBy: "3",
  },
  {
    id: "2",
    name: "خالد الحربي",
    idNumber: "0987654321",
    region: "الدمام",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
    createdBy: "3",
  }
];

// دالة جلب المستخدمين
export const getUsers = (): User[] => {
  return [...users];
};

// دالة تحديث حالة المستخدم
export const updateUserStatus = (userId: string, status: UserStatus): User | null => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex].status = status;
  users[userIndex].updatedAt = new Date();
  
  return users[userIndex];
};

// دالة إضافة مستخدم جديد
export const addUser = (user: User): User => {
  users.push(user);
  return user;
};

// دالة جلب أنواع التذاكر
export const getTicketTypes = () => {
  return [...mockTicketTypes];
};

// دالة إضافة نوع تذكرة جديد
export const addTicketType = (ticketType: any) => {
  mockTicketTypes.push(ticketType);
  return ticketType;
};

// دالة حذف نوع تذكرة
export const deleteTicketType = (id: string) => {
  const index = mockTicketTypes.findIndex(type => type.id === id);
  if (index !== -1) {
    mockTicketTypes.splice(index, 1);
    return true;
  }
  return false;
};

// دالة جلب التذاكر
export const getTickets = () => {
  return [...tickets];
};

// دالة جلب التذاكر حسب المندوب
export const getTicketsByAgent = (agentId: string) => {
  return tickets.filter(ticket => ticket.agentId === agentId);
};

// تصحيح الاسم لتطابق الاستدعاء في الصفحة
export const getTicketsByAgentId = (agentId: string) => {
  return tickets.filter(ticket => ticket.agentId === agentId);
};

// دالة إضافة تذكرة جديدة
export const addTicket = (ticketData: Omit<Ticket, 'id' | 'ticketId' | 'createdAt' | 'updatedAt'>): Ticket => {
  const newTicket: Ticket = {
    id: uuidv4(),
    ticketId: `TKT-${Math.floor(Math.random() * 90000) + 10000}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...ticketData
  };
  
  tickets.push(newTicket);
  return newTicket;
};

// دالة تحديث حالة تذكرة
export const updateTicketStatus = (ticketId: string, status: TicketStatus, notes?: string): Ticket | null => {
  const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
  if (ticketIndex === -1) {
    return null;
  }
  
  tickets[ticketIndex].status = status;
  tickets[ticketIndex].updatedAt = new Date();
  
  if (notes) {
    tickets[ticketIndex].notes = notes;
  }
  
  if (status === 'closed') {
    tickets[ticketIndex].closedAt = new Date();
  }
  
  return tickets[ticketIndex];
};

// دالة جلب المناديب
export const getAgents = () => {
  return [...agents];
};

// دالة إضافة مندوب جديد
export const addAgent = (agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>): Agent => {
  const newAgent: Agent = {
    id: uuidv4(),
    name: agentData.name,
    idNumber: agentData.idNumber,
    region: agentData.region,
    phone: agentData.phone,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: agentData.createdBy
  };
  
  agents.push(newAgent);
  return newAgent;
};

// دالة للبحث عن المناديب
export const searchAgents = (query: string) => {
  if (!query) return agents;
  
  const searchTerm = query.toLowerCase();
  return agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm) || 
    agent.idNumber.includes(searchTerm) || 
    agent.region.toLowerCase().includes(searchTerm)
  );
};

// دالة للبحث عن التذاكر
export const searchTickets = (query: string) => {
  if (!query) return tickets;
  
  const searchTerm = query.toLowerCase();
  return tickets.filter(ticket => 
    ticket.ticketId.toLowerCase().includes(searchTerm) || 
    ticket.description.toLowerCase().includes(searchTerm) || 
    ticket.type.toLowerCase().includes(searchTerm)
  );
};

// دالة للحصول على إحصائيات النظام
export const getSystemStats = () => {
  return {
    users: {
      total: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      managers: users.filter(u => u.role === 'manager').length,
      supervisors: users.filter(u => u.role === 'supervisor').length,
      agents: users.filter(u => u.role === 'agent').length,
      pending: users.filter(u => u.status === 'pending').length,
    },
    tickets: {
      total: tickets.length,
      new: tickets.filter(t => t.status === 'new').length,
      open: tickets.filter(t => t.status === 'open').length,
      pending: tickets.filter(t => t.status === 'pending').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    },
    agents: {
      total: agents.length,
      byRegion: {
        riyadh: agents.filter(a => a.region === 'الرياض').length,
        jeddah: agents.filter(a => a.region === 'جدة').length,
        dammam: agents.filter(a => a.region === 'الدمام').length,
        other: agents.filter(a => !['الرياض', 'جدة', 'الدمام'].includes(a.region)).length,
      }
    }
  };
};

// دالة للحصول على تذاكر حسب التاريخ
export const getTicketsByDate = (startDate: Date, endDate: Date) => {
  return tickets.filter(ticket => 
    ticket.createdAt >= startDate && 
    ticket.createdAt <= endDate
  );
};

// دالة للحصول على تذاكر حسب النوع
export const getTicketsByType = (type: TicketType) => {
  return tickets.filter(ticket => ticket.type === type);
};

// دالة للحصول على تذاكر حسب المنطقة
export const getTicketsByRegion = (region: string) => {
  // أولاً نحصل على قائمة المناديب في المنطقة المحددة
  const regionAgents = agents.filter(agent => agent.region === region);
  const agentIds = regionAgents.map(agent => agent.id);
  
  // ثم نحصل على التذاكر المرتبطة بهؤلاء المناديب
  return tickets.filter(ticket => agentIds.includes(ticket.agentId));
};
