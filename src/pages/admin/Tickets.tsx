
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  getTickets, 
  updateTicketStatus, 
  getTicketTypes,
  searchTickets 
} from "@/services/mockDataService";
import { Ticket, TicketStatus } from "@/types";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowDownUp, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  AlertCircle,
  Clock,
  MoreHorizontal
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const AdminTickets = () => {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<TicketStatus>("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [resolveNote, setResolveNote] = useState("");
  const [ticketTypes, setTicketTypes] = useState<any[]>([]);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  
  useEffect(() => {
    // الحصول على التذاكر وأنواع التذاكر
    setTickets(getTickets());
    setTicketTypes(getTicketTypes());
  }, []);
  
  // تصفية التذاكر حسب الحالة
  let filteredTickets = tickets.filter(ticket => ticket.status === activeTab);
  
  // تصفية حسب البحث
  if (searchTerm) {
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // تصفية حسب نوع التذكرة
  if (filterType) {
    filteredTickets = filteredTickets.filter(ticket => ticket.type === filterType);
  }
  
  // تصفية حسب التاريخ
  if (startDate && endDate) {
    filteredTickets = filteredTickets.filter(ticket => 
      new Date(ticket.createdAt) >= startDate &&
      new Date(ticket.createdAt) <= endDate
    );
  }
  
  // الحصول على اسم نوع التذكرة
  const getTicketTypeName = (key: string) => {
    const type = ticketTypes.find(t => t.key === key);
    return type ? type.name : key;
  };
  
  // تنسيق التاريخ
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA');
  };
  
  // معالجة تغيير حالة التذكرة
  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    if (newStatus === 'closed') {
      setSelectedTicket(tickets.find(t => t.id === ticketId) || null);
      setShowResolveDialog(true);
      return;
    }
    
    const updatedTicket = updateTicketStatus(ticketId, newStatus);
    if (updatedTicket) {
      setTickets(getTickets());
      toast.success(`تم تحديث حالة التذكرة إلى ${t(newStatus)}`);
    }
  };
  
  // معالجة إغلاق التذكرة مع ملاحظة
  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    
    const updatedTicket = updateTicketStatus(selectedTicket.id, 'closed', resolveNote);
    if (updatedTicket) {
      setTickets(getTickets());
      setShowResolveDialog(false);
      setResolveNote("");
      setSelectedTicket(null);
      toast.success(`تم إغلاق التذكرة بنجاح`);
    }
  };
  
  // أيقونة حالة التذكرة
  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'open':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'closed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  // تحديث نص الحالة
  const getStatusText = (status: TicketStatus) => {
    switch (status) {
      case 'new':
        return t('new');
      case 'open':
        return t('open');
      case 'pending':
        return t('pending');
      case 'closed':
        return t('closed');
      default:
        return '';
    }
  };
  
  // إعادة تعيين التصفية
  const resetFilters = () => {
    setSearchTerm("");
    setFilterRegion("");
    setFilterType("");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('tickets')} role="admin">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">{t('ticketManagement')}</h1>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('searchTickets')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('ticketType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allTypes')}</SelectItem>
                {ticketTypes.map(type => (
                  <SelectItem key={type.key} value={type.key}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate && endDate ? (
                      `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`
                    ) : (
                      t('dateRange')
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col space-y-2 p-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <div>{t('startDate')}</div>
                      </div>
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <div>{t('endDate')}</div>
                      </div>
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" onClick={resetFilters}>
                {t('resetFilters')}
              </Button>
            </div>
          </div>
        </div>
        
        <Card>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TicketStatus)}>
            <TabsList className="w-full justify-start border-b rounded-none p-0">
              <TabsTrigger 
                value="new"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('new')}
              </TabsTrigger>
              <TabsTrigger 
                value="open"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('open')}
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('pending')}
              </TabsTrigger>
              <TabsTrigger 
                value="closed"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-3"
              >
                {t('closed')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="p-0">
              {filteredTickets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('ticketId')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('type')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('description')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('date')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('status')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket.ticketId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getTicketTypeName(ticket.type)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" className="h-auto p-0 text-blue-600">
                                  {ticket.description.substring(0, 50)}
                                  {ticket.description.length > 50 && '...'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{t('ticketDetails')}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-2">
                                  <div>
                                    <h4 className="text-sm font-medium">{t('ticketId')}:</h4>
                                    <p className="mt-1">{ticket.ticketId}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">{t('type')}:</h4>
                                    <p className="mt-1">{getTicketTypeName(ticket.type)}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">{t('description')}:</h4>
                                    <p className="mt-1">{ticket.description}</p>
                                  </div>
                                  {ticket.notes && (
                                    <div>
                                      <h4 className="text-sm font-medium">{t('notes')}:</h4>
                                      <p className="mt-1">{ticket.notes}</p>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="text-sm font-medium">{t('createdAt')}:</h4>
                                    <p className="mt-1">
                                      {new Date(ticket.createdAt).toLocaleDateString('ar-SA', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">{t('status')}:</h4>
                                    <div className="flex items-center mt-1">
                                      {getStatusIcon(ticket.status)}
                                      <span className="ms-2">{getStatusText(ticket.status)}</span>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(ticket.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(ticket.status)}
                              <span className="ms-2 text-sm">
                                {getStatusText(ticket.status)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {activeTab !== 'closed' && (
                                <>
                                  {activeTab === 'new' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-yellow-600"
                                      onClick={() => handleStatusChange(ticket.id, 'open')}
                                    >
                                      <Clock className="mr-1 h-4 w-4" />
                                      {t('markAsOpen')}
                                    </Button>
                                  )}
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600"
                                    onClick={() => handleStatusChange(ticket.id, 'closed')}
                                  >
                                    <CheckCircle className="mr-1 h-4 w-4" />
                                    {t('resolve')}
                                  </Button>
                                </>
                              )}
                              
                              {activeTab === 'closed' && ticket.notes && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                    >
                                      <MessageCircle className="mr-1 h-4 w-4" />
                                      {t('viewNotes')}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{t('resolutionNotes')}</DialogTitle>
                                    </DialogHeader>
                                    <p className="mt-2">{ticket.notes}</p>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  {t('noTicketsFound')}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* نافذة حوارية لإغلاق التذكرة مع ملاحظة */}
        <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('resolveTicket')}</DialogTitle>
              <DialogDescription>
                {t('addResolutionNote')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Textarea
                value={resolveNote}
                onChange={(e) => setResolveNote(e.target.value)}
                placeholder={t('resolutionDetails')}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResolveDialog(false);
                    setResolveNote("");
                  }}
                >
                  {t('cancel')}
                </Button>
                <Button onClick={handleResolveTicket}>
                  {t('resolveAndClose')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminTickets;
