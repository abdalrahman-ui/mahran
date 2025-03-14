
import { v4 as uuidv4 } from 'uuid';
import { User, UserStatus, UserRole, ActivityLog } from "@/types";
import { addActivityLog } from './activityLogService';

// Mock users data
let users: User[] = [
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

// User Service functions
export const getUsers = (): User[] => {
  return [...users];
};

export const findUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

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

// Search users
export const searchUsers = (query: string): User[] => {
  if (!query) return [...users];
  
  const searchTerm = query.toLowerCase();
  return users.filter(user => 
    user.username.toLowerCase().includes(searchTerm) || 
    user.firstName.toLowerCase().includes(searchTerm) || 
    user.lastName.toLowerCase().includes(searchTerm) ||
    (user.email && user.email.toLowerCase().includes(searchTerm)) ||
    (user.region && user.region.toLowerCase().includes(searchTerm))
  );
};
