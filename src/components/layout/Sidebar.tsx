
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Ticket,
  BarChart,
  LogOut,
  Menu,
  X,
  Globe,
  Tag,
  Home,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps {
  role: 'admin' | 'manager' | 'supervisor' | 'agent';
}

const Sidebar = ({ role }: SidebarProps) => {
  const { t, language, setLanguage } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return [
          { path: '/admin/dashboard', icon: <BarChart className="h-5 w-5 mr-2" />, label: t('dashboard') },
          { path: '/admin/users', icon: <Users className="h-5 w-5 mr-2" />, label: t('users') },
          { path: '/admin/ticket-types', icon: <Tag className="h-5 w-5 mr-2" />, label: t('ticketTypes') },
        ];
      case 'manager':
        return [
          { path: '/manager/dashboard', icon: <BarChart className="h-5 w-5 mr-2" />, label: t('dashboard') },
          { path: '/manager/tickets', icon: <Ticket className="h-5 w-5 mr-2" />, label: t('tickets') },
        ];
      case 'supervisor':
        return [
          { path: '/supervisor/dashboard', icon: <BarChart className="h-5 w-5 mr-2" />, label: t('dashboard') },
          { path: '/supervisor/agents', icon: <Users className="h-5 w-5 mr-2" />, label: t('agents') },
        ];
      case 'agent':
        return [
          { path: '/agent/dashboard', icon: <BarChart className="h-5 w-5 mr-2" />, label: t('dashboard') },
          { path: '/agent/tickets', icon: <Ticket className="h-5 w-5 mr-2" />, label: t('myTickets') },
          { path: '/agent/new-ticket', icon: <Ticket className="h-5 w-5 mr-2" />, label: t('newTicket') },
        ];
      default:
        return [];
    }
  };

  const baseClass = isOpen
    ? "fixed inset-y-0 rtl:right-0 ltr:left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    : "fixed inset-y-0 rtl:right-0 ltr:left-0 z-50 w-64 bg-white shadow-lg transform -translate-x-full rtl:translate-x-full transition-transform duration-300 ease-in-out";

  return (
    <>
      <div className={baseClass}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="text-xl font-bold">
              {t('welcome')}
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-200 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {getMenuItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t space-y-3">
            <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('language')}>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>
                      {language === 'ar' ? 'العربية' : 
                       language === 'en' ? 'English' : 
                       language === 'hi' ? 'हिंदी' : 'اردو'}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="ur">اردو</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 ${
          language === 'ar' || language === 'ur' ? 'right-4' : 'left-4'
        } z-50 p-2 rounded-md bg-white shadow-md lg:hidden ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
};

export default Sidebar;
