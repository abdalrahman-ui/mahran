
import { getUsers } from './userService';
import { getTickets } from './ticketService';
import { getAgents } from './agentService';

// دالة للحصول على إحصائيات النظام
export const getSystemStats = () => {
  const users = getUsers();
  const tickets = getTickets();
  const agents = getAgents();

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
