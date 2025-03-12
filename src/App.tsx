
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import SupervisorPage from "./pages/SupervisorPage";
import AgentPage from "./pages/AgentPage";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTicketTypes from "./pages/admin/TicketTypes";
import AdminTickets from "./pages/admin/Tickets";

// Manager Routes
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerTickets from "./pages/manager/Tickets";

// Supervisor Routes
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorAgents from "./pages/supervisor/Agents";

// Agent Routes
import AgentDashboard from "@/pages/agent/Dashboard";
import AgentTickets from "./pages/agent/Tickets";
import AgentNewTicket from "./pages/agent/NewTicket";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/ticket-types" element={<AdminTicketTypes />} />
              <Route path="/admin/tickets" element={<AdminTickets />} />
              
              {/* Manager Routes */}
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/tickets" element={<ManagerTickets />} />
              
              {/* Supervisor Routes */}
              <Route path="/supervisor" element={<SupervisorPage />} />
              <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
              <Route path="/supervisor/agents" element={<SupervisorAgents />} />
              
              {/* Agent Routes */}
              <Route path="/agent" element={<AgentPage />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/agent/tickets" element={<AgentTickets />} />
              <Route path="/agent/new-ticket" element={<AgentNewTicket />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
