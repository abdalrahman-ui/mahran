
import { v4 as uuidv4 } from 'uuid';
import { Agent } from "@/types";
import { findUserById } from './userService';
import { addActivityLog } from './activityLogService';

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

// Get an agent by ID
export const findAgentById = (agentId: string): Agent | undefined => {
  return agents.find(agent => agent.id === agentId);
};

// Get agents by region
export const getAgentsByRegion = (region: string): Agent[] => {
  return agents.filter(agent => agent.region === region);
};
