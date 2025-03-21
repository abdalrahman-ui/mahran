
import {
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Ticket,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/types";

const AdminLinks = [
  { href: "/admin/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "users", icon: Users },
  { href: "/admin/tickets", label: "tickets", icon: Ticket },
  { href: "/admin/ticket-types", label: "ticketTypes", icon: ListChecks },
  { href: "/admin/ai-chat", label: "aiAssistant", icon: MessageSquare },
];

const ManagerLinks = [
  { href: "/manager/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/manager/tickets", label: "tickets", icon: Ticket },
];

const SupervisorLinks = [
  { href: "/supervisor/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/supervisor/agents", label: "agents", icon: Users },
];

const AgentLinks = [
  { href: "/agent/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/agent/tickets", label: "tickets", icon: Ticket },
  { href: "/agent/new-ticket", label: "newTicket", icon: MessageSquare },
];

// Define props interface for Sidebar component
interface SidebarProps {
  role: UserRole;
}

const Sidebar = ({ role }: SidebarProps) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Use the role prop to determine which links to show
  const links =
    role === "admin"
      ? AdminLinks
      : role === "manager"
        ? ManagerLinks
        : role === "supervisor"
          ? SupervisorLinks
          : role === "agent"
            ? AgentLinks
            : [];

  return (
    <div className="flex flex-col h-full bg-secondary border-r">
      <div className="p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">{t("dashboard")}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel>
                {user?.firstName} {user?.lastName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                {t("settings")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-1">
          {links.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="justify-start gap-x-2 w-full"
              onClick={() => navigate(link.href)}
            >
              <link.icon className="h-4 w-4" />
              {t(link.label)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
