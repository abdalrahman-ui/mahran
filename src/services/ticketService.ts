
import { v4 as uuidv4 } from 'uuid';
import { Ticket, TicketType, TicketStatus, TicketComment, UserRole } from "@/types";
import { findUserById } from './userService';
import { addActivityLog } from './activityLogService';
import { addNotification } from './notificationService';

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
let tickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT-12345",
    agentId: "4",
    type: "advance",
    description: "طلب سلفة بمبلغ 2000 ريال",
    status: "new",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-01"),
    comments: []
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
    comments: []
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
    comments: [
      {
        id: uuidv4(),
        ticketId: "3",
        userId: "3",
        userRole: "supervisor",
        content: "تم الموافقة على طلب تغيير المنطقة",
        createdAt: new Date("2023-06-05")
      }
    ]
  }
];

// دالة جلب أنواع التذاكر
export const getTicketTypes = () => {
  return [...mockTicketTypes];
};

// دالة إضافة نوع تذكرة جديد
export const addTicketType = (ticketType: any, createdById?: string) => {
  const newTicketType = {
    ...ticketType,
    id: uuidv4(),
    createdAt: new Date()
  };
  
  mockTicketTypes.push(newTicketType);
  
  // Log the activity
  if (createdById) {
    const creator = findUserById(createdById);
    if (creator) {
      addActivityLog({
        userId: createdById,
        userRole: creator.role,
        actionType: 'create',
        entityType: 'ticket',
        entityId: newTicketType.id,
        details: `تم إنشاء نوع تذكرة جديد: ${newTicketType.name}`,
        createdAt: new Date()
      });
    }
  }
  
  return newTicketType;
};

// دالة حذف نوع تذكرة
export const deleteTicketType = (id: string, deletedById?: string) => {
  const index = mockTicketTypes.findIndex(type => type.id === id);
  if (index !== -1) {
    const deletedType = mockTicketTypes[index];
    mockTicketTypes.splice(index, 1);
    
    // Log the activity
    if (deletedById) {
      const deleter = findUserById(deletedById);
      if (deleter) {
        addActivityLog({
          userId: deletedById,
          userRole: deleter.role,
          actionType: 'delete',
          entityType: 'ticket',
          entityId: id,
          details: `تم حذف نوع تذكرة: ${deletedType.name}`,
          createdAt: new Date()
        });
      }
    }
    
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

// دالة جلب التذاكر حسب المنطقة
export const getTicketsByRegion = (region: string) => {
  const regionAgents = getAgentsByRegion(region);
  const agentIds = regionAgents.map(agent => agent.id);
  return tickets.filter(ticket => agentIds.includes(ticket.agentId));
};

// Helper function to get agents by region
const getAgentsByRegion = (region: string) => {
  // Import from agentService would cause circular dependency
  // This is a temporary implementation to avoid that
  return require('./agentService').getAgents().filter((agent: any) => agent.region === region);
};

// دالة إضافة تعليق على تذكرة
export const addTicketComment = (ticketId: string, userId: string, userRole: UserRole, content: string) => {
  const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
  if (ticketIndex === -1) {
    return null;
  }
  
  const newComment: TicketComment = {
    id: uuidv4(),
    ticketId,
    userId,
    userRole,
    content,
    createdAt: new Date()
  };
  
  if (!tickets[ticketIndex].comments) {
    tickets[ticketIndex].comments = [];
  }
  
  tickets[ticketIndex].comments?.push(newComment);
  tickets[ticketIndex].updatedAt = new Date();
  
  // Log the activity
  addActivityLog({
    userId,
    userRole,
    actionType: 'comment',
    entityType: 'ticket',
    entityId: ticketId,
    details: `تم إضافة تعليق على التذكرة رقم ${tickets[ticketIndex].ticketId}`,
    createdAt: new Date()
  });
  
  // Create notification for the agent
  addNotification({
    userId: tickets[ticketIndex].agentId,
    title: 'تعليق جديد على تذكرتك',
    message: `تم إضافة تعليق جديد على تذكرتك رقم ${tickets[ticketIndex].ticketId}`,
    type: 'info',
    relatedTo: {
      type: 'ticket',
      id: ticketId
    }
  });
  
  return newComment;
};

// دالة إضافة تذكرة جديدة
export const addTicket = (ticketData: Omit<Ticket, 'id' | 'ticketId' | 'createdAt' | 'updatedAt' | 'comments'>): Ticket => {
  const newTicket: Ticket = {
    id: uuidv4(),
    ticketId: `TKT-${Math.floor(Math.random() * 90000) + 10000}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [],
    ...ticketData
  };
  
  tickets.push(newTicket);
  
  // Log the activity
  addActivityLog({
    userId: ticketData.agentId,
    userRole: 'agent',
    actionType: 'create',
    entityType: 'ticket',
    entityId: newTicket.id,
    details: `تم إنشاء تذكرة جديدة: ${newTicket.ticketId} (${newTicket.type})`,
    createdAt: new Date()
  });
  
  // Notify supervisors about new ticket
  const supervisors = require('./userService').getUsers().filter((user: any) => user.role === 'supervisor');
  supervisors.forEach((supervisor: any) => {
    addNotification({
      userId: supervisor.id,
      title: 'تذكرة جديدة',
      message: `تم إنشاء تذكرة جديدة رقم ${newTicket.ticketId} من نوع ${newTicket.type}`,
      type: 'info',
      relatedTo: {
        type: 'ticket',
        id: newTicket.id
      }
    });
  });
  
  return newTicket;
};

// دالة تحديث حالة تذكرة
export const updateTicketStatus = (ticketId: string, status: TicketStatus, notes?: string, updatedById?: string): Ticket | null => {
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
  
  // Log the activity
  if (updatedById) {
    const updater = findUserById(updatedById);
    if (updater) {
      addActivityLog({
        userId: updatedById,
        userRole: updater.role,
        actionType: 'update',
        entityType: 'ticket',
        entityId: ticketId,
        details: `تم تحديث حالة التذكرة ${tickets[ticketIndex].ticketId} إلى ${status}`,
        createdAt: new Date()
      });
    }
  }
  
  // Notify the agent about ticket update
  addNotification({
    userId: tickets[ticketIndex].agentId,
    title: 'تحديث حالة التذكرة',
    message: `تم تحديث حالة تذكرتك رقم ${tickets[ticketIndex].ticketId} إلى ${status}`,
    type: 'info',
    relatedTo: {
      type: 'ticket',
      id: ticketId
    }
  });
  
  return tickets[ticketIndex];
};

// دالة للبحث عن التذاكر
export const searchTickets = (query: string) => {
  if (!query) return tickets;
  
  const searchTerm = query.toLowerCase();
  return tickets.filter(ticket => 
    ticket.ticketId.toLowerCase().includes(searchTerm) || 
    ticket.description.toLowerCase().includes(searchTerm) || 
    ticket.type.toLowerCase().includes(searchTerm) ||
    (ticket.notes && ticket.notes.toLowerCase().includes(searchTerm))
  );
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
