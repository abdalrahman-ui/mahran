
import { User, UserStatus, TicketType, TicketStatus, Ticket, Agent, UserRole } from "@/types";

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
const agents: Agent[] = [
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

// دالة جلب المناديب
export const getAgents = () => {
  return [...agents];
};

// دالة إضافة مندوب جديد
export const addAgent = (agent: Agent) => {
  agents.push(agent);
  return agent;
};
