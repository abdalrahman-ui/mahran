
import { v4 as uuidv4 } from 'uuid';
import { Notification } from "@/types";

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
