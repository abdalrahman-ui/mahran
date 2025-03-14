
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  getAgents, 
  addAgent, 
  updateAgent, 
  deleteAgent,
  searchAgents,
  findUserById // Import the missing function
} from "@/services/mockDataService";
import { Agent } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  Upload, 
  Download, 
  UserPlus, 
  Users, 
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Edit,
  Check,
  X
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as XLSX from 'xlsx';

const SupervisorAgents = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>(getAgents());
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [newAgent, setNewAgent] = useState({
    name: "",
    idNumber: "",
    phone: "",
    email: "",
    region: user?.region || "الرياض"
  });
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [importSuccessCount, setImportSuccessCount] = useState(0);
  const [showImportErrorDialog, setShowImportErrorDialog] = useState(false);
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    let result = searchAgents(searchTerm);
    
    if (regionFilter) {
      result = result.filter(agent => agent.region === regionFilter);
    }
    
    if (activeTab === "myAgents" && user) {
      result = result.filter(agent => agent.createdBy === user.id);
    }
    
    setFilteredAgents(result);
  }, [agents, searchTerm, activeTab, regionFilter, user]);

  const validateAgent = (agent: Partial<Agent>) => {
    if (!agent.name || !agent.idNumber || !agent.region) {
      toast.error(t('pleaseEnterAllRequiredData') || "الرجاء إدخال جميع البيانات المطلوبة");
      return false;
    }

    const idExists = agents.some(existingAgent => 
      existingAgent.idNumber === agent.idNumber && 
      (!editAgent || existingAgent.id !== editAgent.id)
    );
    
    if (idExists) {
      toast.error(t('idNumberAlreadyExists') || "رقم الهوية موجود بالفعل");
      return false;
    }

    if (agent.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agent.email)) {
      toast.error(t('invalidEmail') || "البريد الإلكتروني غير صالح");
      return false;
    }

    if (agent.phone && !/^05\d{8}$/.test(agent.phone)) {
      toast.error(t('invalidPhone') || "رقم الهاتف غير صالح، يجب أن يبدأ بـ 05 ويتكون من 10 أرقام");
      return false;
    }

    return true;
  };

  const handleAddAgent = () => {
    if (!validateAgent(newAgent)) {
      return;
    }

    if (!user || !user.id) {
      toast.error("خطأ في معلومات المستخدم");
      return;
    }

    try {
      const agentData = {
        ...newAgent,
        createdBy: user.id
      };

      const addedAgent = addAgent(agentData);
      setAgents(prevAgents => [...prevAgents, addedAgent]);
      
      // Reset form
      setNewAgent({
        name: "",
        idNumber: "",
        phone: "",
        email: "",
        region: user.region || "الرياض"
      });
      
      setShowAddDialog(false);
      toast.success(t('agentAddedSuccessfully') || "تمت إضافة المندوب بنجاح");
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error("حدث خطأ أثناء إضافة المندوب");
    }
  };

  const handleUpdateAgent = () => {
    if (!editAgent || !validateAgent(editAgent)) {
      return;
    }

    if (!user || !user.id) {
      toast.error("خطأ في معلومات المستخدم");
      return;
    }

    try {
      const updatedAgent = updateAgent(editAgent.id, editAgent, user.id);
      if (updatedAgent) {
        setAgents(prevAgents => 
          prevAgents.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
        );
        
        setShowEditDialog(false);
        toast.success(t('agentUpdatedSuccessfully') || "تم تحديث بيانات المندوب بنجاح");
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      toast.error("حدث خطأ أثناء تحديث بيانات المندوب");
    }
  };

  const handleDeleteAgent = (agentId: string) => {
    if (!user || !user.id) {
      toast.error("خطأ في معلومات المستخدم");
      return;
    }

    try {
      const success = deleteAgent(agentId, user.id);
      if (success) {
        setAgents(prevAgents => prevAgents.filter(agent => agent.id !== agentId));
        toast.success(t('agentDeletedSuccessfully') || "تم حذف المندوب بنجاح");
      } else {
        toast.error(t('failedToDeleteAgent') || "فشل في حذف المندوب");
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast.error("حدث خطأ أثناء حذف المندوب");
    }
  };

  const handleEditClick = (agent: Agent) => {
    setEditAgent({...agent});
    setShowEditDialog(true);
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const binaryString = evt.target?.result as string;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json<any>(worksheet);

        const errors: string[] = [];
        let successCount = 0;
        const newAgents: Agent[] = [];

        if (!user || !user.id) {
          toast.error("خطأ في معلومات المستخدم");
          return;
        }

        data.forEach((row, index) => {
          if (!row.name || !row.idNumber || !row.region) {
            errors.push(`صف ${index + 1}: اسم المندوب أو رقم الهوية أو المنطقة مفقود`);
            return;
          }

          if (agents.some(agent => agent.idNumber === row.idNumber) || 
              newAgents.some(agent => agent.idNumber === row.idNumber)) {
            errors.push(`صف ${index + 1}: رقم الهوية ${row.idNumber} موجود بالفعل`);
            return;
          }

          // Validate email and phone
          if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
            errors.push(`صف ${index + 1}: البريد الإلكتروني ${row.email} غير صالح`);
            return;
          }

          if (row.phone && !/^05\d{8}$/.test(row.phone)) {
            errors.push(`صف ${index + 1}: رقم الهاتف ${row.phone} غير صالح، يجب أن يبدأ بـ 05 ويتكون من 10 أرقام`);
            return;
          }

          try {
            const newAgent = addAgent({
              name: row.name,
              idNumber: row.idNumber,
              region: row.region,
              createdBy: user.id,
              phone: row.phone || '',
              email: row.email || ''
            });
            newAgents.push(newAgent);
            successCount++;
          } catch (error) {
            errors.push(`صف ${index + 1}: خطأ في إضافة المندوب`);
            console.error("Error adding agent from Excel:", error);
          }
        });

        if (newAgents.length > 0) {
          setAgents(prevAgents => [...prevAgents, ...newAgents]);
        }
        
        setImportErrors(errors);
        setImportSuccessCount(successCount);

        if (errors.length > 0) {
          setShowImportErrorDialog(true);
        }

        if (successCount > 0) {
          toast.success(`تم استيراد ${successCount} مندوب بنجاح`);
        } else if (errors.length > 0) {
          toast.error("لم يتم استيراد أي مناديب بسبب وجود أخطاء");
        } else {
          toast.error("لم يتم استيراد أي مناديب");
        }

        e.target.value = '';
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        toast.error(t('errorParsingExcelFile') || "خطأ في قراءة ملف الإكسل");
        e.target.value = '';
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      
      const worksheet = XLSX.utils.json_to_sheet(filteredAgents.map(agent => ({
        name: agent.name,
        idNumber: agent.idNumber,
        region: agent.region,
        phone: agent.phone || '',
        email: agent.email || '',
        createdAt: new Date(agent.createdAt).toLocaleDateString(),
      })));
      
      XLSX.utils.book_append_sheet(workbook, worksheet, "Agents");
      
      XLSX.writeFile(workbook, "agents.xlsx");
      
      toast.success(t('exportedSuccessfully') || "تم التصدير بنجاح");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("حدث خطأ أثناء تصدير البيانات");
    }
  };

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowDetailDialog(true);
  };

  const downloadExcelTemplate = () => {
    const template = [
      {
        name: "اسم المندوب",
        idNumber: "رقم الهوية",
        region: "المنطقة",
        phone: "رقم الهاتف (اختياري)",
        email: "البريد الإلكتروني (اختياري)"
      }
    ];
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(template);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "agents_template.xlsx");
    
    toast.success("تم تنزيل قالب الإكسل بنجاح");
  };

  return (
    <RequireAuth allowedRoles={['supervisor', 'admin']}>
      <PageLayout title={t('agents')} role="supervisor">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold">
            <Users className="h-5 w-5 inline mr-2" />
            {t('agents')}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('searchAgents')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10"
              />
            </div>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t('addAgent')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{t('addAgent')}</DialogTitle>
                  <DialogDescription>أدخل بيانات المندوب الجديد</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">{t('name')} *</Label>
                    <Input
                      id="agentName"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                      placeholder={t('name')}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentIdNumber">{t('idNumber')} *</Label>
                    <Input
                      id="agentIdNumber"
                      value={newAgent.idNumber}
                      onChange={(e) => setNewAgent({...newAgent, idNumber: e.target.value})}
                      placeholder={t('idNumber')}
                      required
                    />
                    <p className="text-xs text-gray-500">يجب أن يكون رقم الهوية فريدًا.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentRegion">{t('region')} *</Label>
                    <Select 
                      value={newAgent.region} 
                      onValueChange={(value) => setNewAgent({...newAgent, region: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('region')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الرياض">الرياض</SelectItem>
                        <SelectItem value="جدة">جدة</SelectItem>
                        <SelectItem value="الدمام">الدمام</SelectItem>
                        <SelectItem value="مكة">مكة</SelectItem>
                        <SelectItem value="المدينة">المدينة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentPhone">{t('phone')}</Label>
                    <Input
                      id="agentPhone"
                      value={newAgent.phone}
                      onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                      placeholder="05xxxxxxxx"
                    />
                    <p className="text-xs text-gray-500">يجب أن يبدأ برقم 05 ويتكون من 10 أرقام.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentEmail">{t('email')}</Label>
                    <Input
                      id="agentEmail"
                      type="email"
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                      placeholder="example@example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleAddAgent}>
                    {t('add')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{t('editAgent')}</DialogTitle>
                  <DialogDescription>تعديل بيانات المندوب</DialogDescription>
                </DialogHeader>
                {editAgent && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="editAgentName">{t('name')} *</Label>
                      <Input
                        id="editAgentName"
                        value={editAgent.name}
                        onChange={(e) => setEditAgent({...editAgent, name: e.target.value})}
                        placeholder={t('name')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAgentIdNumber">{t('idNumber')} *</Label>
                      <Input
                        id="editAgentIdNumber"
                        value={editAgent.idNumber}
                        onChange={(e) => setEditAgent({...editAgent, idNumber: e.target.value})}
                        placeholder={t('idNumber')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAgentRegion">{t('region')} *</Label>
                      <Select 
                        value={editAgent.region} 
                        onValueChange={(value) => setEditAgent({...editAgent, region: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('region')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="الرياض">الرياض</SelectItem>
                          <SelectItem value="جدة">جدة</SelectItem>
                          <SelectItem value="الدمام">الدمام</SelectItem>
                          <SelectItem value="مكة">مكة</SelectItem>
                          <SelectItem value="المدينة">المدينة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAgentPhone">{t('phone')}</Label>
                      <Input
                        id="editAgentPhone"
                        value={editAgent.phone || ''}
                        onChange={(e) => setEditAgent({...editAgent, phone: e.target.value})}
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="editAgentEmail">{t('email')}</Label>
                      <Input
                        id="editAgentEmail"
                        type="email"
                        value={editAgent.email || ''}
                        onChange={(e) => setEditAgent({...editAgent, email: e.target.value})}
                        placeholder="example@example.com"
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleUpdateAgent}>
                    {t('save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadExcelTemplate}>
                <Download className="h-4 w-4 mr-2" />
                {t('downloadTemplate')}
              </Button>
              
              <label htmlFor="excel-upload" className="cursor-pointer">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <div>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('uploadExcel')}
                  </div>
                </Button>
              </label>
              <input
                id="excel-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImportExcel}
                className="hidden"
              />
              
              <Button variant="outline" onClick={handleExportToExcel}>
                <Download className="h-4 w-4 mr-2" />
                {t('exportExcel')}
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('region')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('allRegions')}</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الدمام">الدمام</SelectItem>
                <SelectItem value="مكة">مكة</SelectItem>
                <SelectItem value="المدينة">المدينة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
            <TabsTrigger value="all">{t('allAgents')}</TabsTrigger>
            <TabsTrigger value="myAgents">{t('myAgents')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">{t('name')}</th>
                      <th className="px-4 py-2 text-left">{t('idNumber')}</th>
                      <th className="px-4 py-2 text-left">{t('region')}</th>
                      <th className="px-4 py-2 text-left">{t('contact')}</th>
                      <th className="px-4 py-2 text-left">{t('createdAt')}</th>
                      <th className="px-4 py-2 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.length > 0 ? (
                      filteredAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{agent.name}</td>
                          <td className="border px-4 py-2">{agent.idNumber}</td>
                          <td className="border px-4 py-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                              {agent.region}
                            </div>
                          </td>
                          <td className="border px-4 py-2">
                            <div className="flex flex-col">
                              {agent.phone && (
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-1 text-gray-500" />
                                  {agent.phone}
                                </div>
                              )}
                              {agent.email && (
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-1 text-gray-500" />
                                  {agent.email}
                                </div>
                              )}
                              {!agent.phone && !agent.email && "-"}
                            </div>
                          </td>
                          <td className="border px-4 py-2">
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                              {new Date(agent.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="border px-4 py-2 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewDetails(agent)}
                              >
                                {t('view')}
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditClick(agent)}
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      هل أنت متأكد من حذف المندوب {agent.name}؟
                                      <br />
                                      لا يمكن التراجع عن هذا الإجراء.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDeleteAgent(agent.id)}>
                                      حذف
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="border px-4 py-8 text-center text-gray-500">
                          {t('noAgentsFound')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedAgent && (
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('agentDetails')}</DialogTitle>
                <DialogDescription>تفاصيل المندوب</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAgent.name}</h3>
                    <p className="text-sm text-gray-500">{selectedAgent.region}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">{t('idNumber')}</Label>
                    <div className="font-medium">{selectedAgent.idNumber}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">{t('region')}</Label>
                    <div className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {selectedAgent.region}
                    </div>
                  </div>
                  
                  {selectedAgent.phone && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500">{t('phone')}</Label>
                      <div className="font-medium flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        {selectedAgent.phone}
                      </div>
                    </div>
                  )}
                  
                  {selectedAgent.email && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500">{t('email')}</Label>
                      <div className="font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        {selectedAgent.email}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">{t('createdAt')}</Label>
                    <div className="font-medium flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                      {new Date(selectedAgent.createdAt).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">{t('createdBy')}</Label>
                    <div className="font-medium">
                      {findUserById(selectedAgent.createdBy) ? 
                        `${findUserById(selectedAgent.createdBy)?.firstName} ${findUserById(selectedAgent.createdBy)?.lastName}` :
                        selectedAgent.createdBy}
                    </div>
                  </div>
                </div>
                
                {selectedAgent.lastModifiedAt && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      آخر تحديث بواسطة {selectedAgent.lastModifiedBy ? findUserById(selectedAgent.lastModifiedBy)?.firstName : "غير معروف"} بتاريخ {new Date(selectedAgent.lastModifiedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={showImportErrorDialog} onOpenChange={setShowImportErrorDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>نتيجة استيراد الملف</DialogTitle>
              <DialogDescription>
                تم استيراد {importSuccessCount} مندوب بنجاح، مع {importErrors.length} خطأ
              </DialogDescription>
            </DialogHeader>
            {importErrors.length > 0 && (
              <div className="space-y-4 py-4">
                <h4 className="font-medium text-red-500">الأخطاء:</h4>
                <div className="bg-red-50 p-4 rounded-md max-h-60 overflow-y-auto">
                  <ul className="list-disc pl-5 space-y-2">
                    {importErrors.map((error, index) => (
                      <li key={index} className="text-red-700">{error}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  يرجى تصحيح الأخطاء في ملف الإكسل وإعادة المحاولة.
                </p>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setShowImportErrorDialog(false)}>
                إغلاق
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageLayout>
    </RequireAuth>
  );
};

export default SupervisorAgents;
