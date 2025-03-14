import { User, UserStatus, TicketType, TicketStatus, Ticket, Agent, UserRole, ActivityLog, Notification, TicketComment } from "@/types";
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
    email: "admin@example.com",
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
    email: "manager@example.com",
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
    email: "supervisor@example.com",
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
    idNumber: "1234567890",
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
    idNumber: "0987654321",
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

// قائمة المناديب
let agents: Agent[] = [
  {
    id: "1",
    name: "أحمد الغامدي",
    idNumber: "1234567890",
    region: "جدة",
    phone: "0511234567",
    email: "ahmed@example.com",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    createdBy: "3",
  },
  {
    id: "2",
    name: "خالد الحربي",
    idNumber: "0987654321",
    region: "الدمام",
    phone: "0529876543",
    email: "khalid@example.com",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
    createdBy: "3",
  }
];

// سجل النشاطات
let activityLogs: ActivityLog[] = [
  {
    id: uuidv4(),
    userId: "1",
    userRole: "admin",
    actionType: "login",
    entityType: "user",
    entityId: "1",
    details: "تسجيل دخول ناجح",
    createdAt: new Date("2023-06-01")
  },
  {
    id: uuidv4(),
    userId: "3",
    userRole: "supervisor",
    actionType: "create",
    entityType: "agent",
    entityId: "1",
    details: "إضافة مندوب جديد: أحمد الغامدي",
    createdAt: new Date("2023-01-01")
  }
];

// الإشعارات
let notifications: Notification[] = [
  {
    id: uuidv4(),
    userId: "4",
    title: "تم معالجة تذكرتك",
    message: "تم الرد على تذكرتك رقم TKT-12347 من قبل المشرف",
    isRead: false,
    type: "success",
    relatedTo: {
      type: "ticket",
      id: "3"
    },
    createdAt: new Date("2023-06-05")
  }
];

// دالة جلب المستخدمين
export const getUsers = (): User[] => {
  return [...users];
};

// دالة البحث عن مستخدم
export const findUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// دالة تحديث حالة المستخدم
export const updateUserStatus = (userId: string, status: UserStatus, updatedById?: string): User | null => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex].status = status;
  users[userIndex].updatedAt = new Date();
  
  // Log the activity
  if (updatedById) {
    const updater = users.find(user => user.id === updatedById);
    if (updater) {
      addActivityLog({
        userId: updatedById,
        userRole: updater.role,
        actionType: status === 'approved' ? 'approve' : (status === 'rejected' ? 'reject' : 'update'),
        entityType: 'user',
        entityId: userId,
        details: `تم تغيير حالة المستخدم ${users[userIndex].firstName} ${users[userIndex].lastName} إلى ${status}`,
        createdAt: new Date()
      });
    }
  }
  
  return users[userIndex];
};

// دالة إضافة مستخدم جديد
export const addUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, createdById?: string): User => {
  const newUser: User = {
    id: uuidv4(),
    ...user,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  
  // Log the activity
  if (createdById) {
    const creator = users.find(u => u.id === createdById);
    if (creator) {
      addActivityLog({
        userId: createdById,
        userRole: creator.role,
        actionType: 'create',
        entityType: 'user',
        entityId: newUser.id,
        details: `تم إنشاء مستخدم جديد: ${newUser.firstName} ${newUser.lastName} (${newUser.role})`,
        createdAt: new Date()
      });
    }
  }
  
  return newUser;
};

// دالة تحديث معلومات المستخدم
export const updateUser = (userId: string, userData: Partial<User>, updatedById?: string): User | null => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date()
  };
  
  // Log the activity
  if (updatedById) {
    const updater = users.find(user => user.id === updatedById);
    if (updater) {
      addActivityLog({
        userId: updatedById,
        userRole: updater.role,
        actionType: 'update',
        entityType: 'user',
        entityId: userId,
        details: `تم تحديث معلومات المستخدم ${users[userIndex].firstName} ${users[userIndex].lastName}`,
        createdAt: new Date()
      });
    }
  }
  
  return users[userIndex];
};

// دالة حذف مستخدم
export const deleteUser = (userId: string, deletedById?: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return false;
  }
  
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  
  // Log the activity
  if (deletedById) {
    const deleter = users.find(user => user.id === deletedById);
    if (deleter) {
      addActivityLog({
        userId: deletedById,
        userRole: deleter.role,
        actionType: 'delete',
        entityType: 'user',
        entityId: userId,
        details: `تم حذف المستخدم ${deletedUser.firstName} ${deletedUser.lastName} (${deletedUser.role})`,
        createdAt: new Date()
      });
    }
  }
  
  return true;
};

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
    const creator = users.find(user => user.id === createdById);
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
      const deleter = users.find(user => user.id === deletedById);
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
  const regionAgents = agents.filter(agent => agent.region === region);
  const agentIds = regionAgents.map(agent => agent.id);
  return tickets.filter(ticket => agentIds.includes(ticket.agentId));
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
  const supervisors = users.filter(user => user.role === 'supervisor');
  supervisors.forEach(supervisor => {
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
    const updater = users.find(user => user.id === updatedById);
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
    email: agentData.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: agentData.createdBy
  };
  
  agents.push(newAgent);
  
  // Log the activity
  addActivityLog({
    userId: agentData.createdBy,
    userRole: findUserById(agentData.createdBy)?.role || 'supervisor',
    actionType: 'create',
    entityType: 'agent',
    entityId: newAgent.id,
    details: `تم إضافة مندوب جديد: ${newAgent.name} (${newAgent.region})`,
    createdAt: new Date()
  });
  
  return newAgent;
};

// دالة تحديث معلومات المندوب
export const updateAgent = (agentId: string, agentData: Partial<Agent>, updatedById: string): Agent | null => {
  const agentIndex = agents.findIndex(agent => agent.id === agentId);
  if (agentIndex === -1) {
    return null;
  }
  
  const updatedAgent: Agent = {
    ...agents[agentIndex],
    ...agentData,
    updatedAt: new Date(),
    lastModifiedBy: updatedById,
    lastModifiedAt: new Date()
  };
  
  agents[agentIndex] = updatedAgent;
  
  // Log the activity
  addActivityLog({
    userId: updatedById,
    userRole: findUserById(updatedById)?.role || 'supervisor',
    actionType: 'update',
    entityType: 'agent',
    entityId: agentId,
    details: `تم تحديث معلومات المندوب: ${updatedAgent.name}`,
    createdAt: new Date()
  });
  
  return updatedAgent;
};

// دالة حذف مندوب
export const deleteAgent = (agentId: string, deletedById: string): boolean => {
  const agentIndex = agents.findIndex(agent => agent.id === agentId);
  if (agentIndex === -1) {
    return false;
  }
  
  const deletedAgent = agents[agentIndex];
  agents.splice(agentIndex, 1);
  
  // Log the activity
  addActivityLog({
    userId: deletedById,
    userRole: findUserById(deletedById)?.role || 'supervisor',
    actionType: 'delete',
    entityType: 'agent',
    entityId: agentId,
    details: `تم حذف المندوب: ${deletedAgent.name} (${deletedAgent.region})`,
    createdAt: new Date()
  });
  
  return true;
};

// دالة للبحث عن المناديب
export const searchAgents = (query: string) => {
  if (!query) return agents;
  
  const searchTerm = query.toLowerCase();
  return agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm) || 
    agent.idNumber.includes(searchTerm) || 
    agent.region.toLowerCase().includes(searchTerm) ||
    (agent.phone && agent.phone.includes(searchTerm)) ||
    (agent.email && agent.email.toLowerCase().includes(searchTerm))
  );
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

// دالة للحصول على سجل النشاطات
export const getActivityLogs = (): ActivityLog[] => {
  return [...activityLogs];
};

// دالة للبحث في سجل النشاطات
export const searchActivityLogs = (query: string): ActivityLog[] => {
  if (!query) return activityLogs;
  
  const searchTerm = query.toLowerCase();
  return activityLogs.filter(log =>
    log.details.toLowerCase().includes(searchTerm) ||
    log.actionType.toLowerCase().includes(searchTerm) ||
    log.entityType.toLowerCase().includes(searchTerm) ||
    log.entityId.toLowerCase().includes(searchTerm)
  );
};

// دالة لإضافة نشاط جديد إلى السجل
export const addActivityLog = (log: Omit<ActivityLog, 'id'>): ActivityLog => {
  const newLog: ActivityLog = {
    id: uuidv4(),
    ...log
  };
  
  activityLogs.push(newLog);
  return newLog;
};

// دالة للحصول على الإشعارات الخاصة بمستخدم
export const getUserNotifications = (userId: string): Notification[] => {
  return notifications.filter(notification => notification.userId === userId);
};

// دالة لإضافة إشعار جديد
export const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): Notification => {
  const newNotification: Notification = {
    id: uuidv4(),
    isRead: false,
    createdAt: new Date(),
    ...notification
  };
  
  notifications.push(newNotification);
  return newNotification;
};

// دالة لتحديث حالة قراءة الإشعار
export const markNotificationAsRead = (notificationId: string): Notification | null => {
  const index = notifications.findIndex(notification => notification.id === notificationId);
  if (index === -1) {
    return null;
  }
  
  notifications[index].isRead = true;
  return notifications[index];
};

// دالة لتوليد تقرير Excel
export const generateExcelReport = (data: any[], reportType: string) => {
  // في التطبيق الحقيقي، هذه الدالة ستقوم بتوليد ملف إكسل
  // ولكن هنا سنعيد البيانات فقط كتمثيل للعملية
  return {
    reportType,
    data,
    generatedAt: new Date(),
    format: 'excel'
  };
};

// دالة لتوليد تقرير PDF
export const generatePDFReport = (data: any[], reportType: string) => {
  // في التطبي�� الحقيقي، هذه الدالة ستقوم بتوليد ملف PDF
  // ولكن هنا سنعيد البيانات فقط كتمثيل للعملية
  return {
    reportType,
    data,
    generatedAt: new Date(),
    format: 'pdf'
  };
};
