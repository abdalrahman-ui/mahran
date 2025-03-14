
import { v4 as uuidv4 } from 'uuid';
import { ActivityLog } from "@/types";

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
