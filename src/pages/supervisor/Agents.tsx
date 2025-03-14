
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAgents, addAgent } from "@/services/mockDataService";
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
  Phone
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as XLSX from 'xlsx';

const SupervisorAgents = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>(getAgents());
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentIdNumber, setNewAgentIdNumber] = useState("");
  const [newAgentPhone, setNewAgentPhone] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [importSuccessCount, setImportSuccessCount] = useState(0);

  useEffect(() => {
    // Apply filters
    let result = agents;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(agent => 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.idNumber.includes(searchTerm) ||
        agent.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Tab filter
    if (activeTab !== "all") {
      // Additional tab filters could be implemented here
      // For example, filtering by status, region, etc.
    }
    
    setFilteredAgents(result);
  }, [agents, searchTerm, activeTab]);

  const handleAddAgent = () => {
    if (!newAgentName.trim() || !newAgentIdNumber.trim()) {
      toast.error(t('pleaseEnterAllRequiredData'));
      return;
    }

    // Check if ID already exists
    const idExists = agents.some(agent => agent.idNumber === newAgentIdNumber);
    if (idExists) {
      toast.error(t('idNumberAlreadyExists'));
      return;
    }

    if (user) {
      const newAgent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'> = {
        name: newAgentName,
        idNumber: newAgentIdNumber,
        region: user.region || 'الرياض',
        createdBy: user.id,
        phone: newAgentPhone || '',
      };

      const addedAgent = addAgent(newAgent);
      setAgents([...agents, addedAgent]);
      setNewAgentName("");
      setNewAgentIdNumber("");
      setNewAgentPhone("");
      setShowAddDialog(false);
      toast.success(t('agentAddedSuccessfully'));
    }
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

        // Validate and process data
        const errors: string[] = [];
        let successCount = 0;
        const newAgents: Agent[] = [];

        data.forEach((row, index) => {
          // Validate required fields
          if (!row.name || !row.idNumber) {
            errors.push(`صف ${index + 1}: اسم المندوب أو رقم الهوية مفقود`);
            return;
          }

          // Check for duplicate ID
          if (agents.some(agent => agent.idNumber === row.idNumber) || 
              newAgents.some(agent => agent.idNumber === row.idNumber)) {
            errors.push(`صف ${index + 1}: رقم الهوية ${row.idNumber} موجود بالفعل`);
            return;
          }

          // Create new agent
          if (user) {
            const newAgent = addAgent({
              name: row.name,
              idNumber: row.idNumber,
              region: row.region || user.region || 'الرياض',
              createdBy: user.id,
              phone: row.phone || '',
            });
            newAgents.push(newAgent);
            successCount++;
          }
        });

        // Update state
        setAgents([...agents, ...newAgents]);
        setImportErrors(errors);
        setImportSuccessCount(successCount);

        // Show results
        if (errors.length > 0) {
          toast.error(`تم استيراد ${successCount} مندوب بنجاح، مع ${errors.length} خطأ`);
        } else {
          toast.success(`تم استيراد ${successCount} مندوب بنجاح`);
        }

        // Reset file input
        e.target.value = '';
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        toast.error(t('errorParsingExcelFile'));
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExportToExcel = () => {
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(agents.map(agent => ({
      name: agent.name,
      idNumber: agent.idNumber,
      region: agent.region,
      phone: agent.phone || '',
      createdAt: new Date(agent.createdAt).toLocaleDateString(),
    })));
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agents");
    
    // Generate Excel file
    XLSX.writeFile(workbook, "agents.xlsx");
    
    toast.success(t('exportedSuccessfully'));
  };

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowDetailDialog(true);
  };

  return (
    <RequireAuth allowedRoles={['supervisor']}>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('addAgent')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">{t('name')} *</Label>
                    <Input
                      id="agentName"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                      placeholder={t('name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentIdNumber">{t('idNumber')} *</Label>
                    <Input
                      id="agentIdNumber"
                      value={newAgentIdNumber}
                      onChange={(e) => setNewAgentIdNumber(e.target.value)}
                      placeholder={t('idNumber')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentPhone">{t('phone')}</Label>
                    <Input
                      id="agentPhone"
                      value={newAgentPhone}
                      onChange={(e) => setNewAgentPhone(e.target.value)}
                      placeholder={t('phone')}
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
            
            <label htmlFor="excel-upload">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="all">{t('allAgents')}</TabsTrigger>
            <TabsTrigger value="active">{t('activeAgents')}</TabsTrigger>
            <TabsTrigger value="inactive">{t('inactiveAgents')}</TabsTrigger>
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
                      <th className="px-4 py-2 text-left">{t('phone')}</th>
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
                            {agent.phone ? (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1 text-gray-500" />
                                {agent.phone}
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="border px-4 py-2">
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                              {new Date(agent.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="border px-4 py-2 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewDetails(agent)}
                            >
                              {t('viewDetails')}
                            </Button>
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

        {/* Agent Details Dialog */}
        {selectedAgent && (
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('agentDetails')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('name')}</p>
                  <p className="text-lg">{selectedAgent.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('idNumber')}</p>
                  <p className="text-lg">{selectedAgent.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('region')}</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-lg">{selectedAgent.region}</p>
                  </div>
                </div>
                {selectedAgent.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('phone')}</p>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <p className="text-lg">{selectedAgent.phone}</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('createdAt')}</p>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-lg">{new Date(selectedAgent.createdAt).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('createdBy')}</p>
                  <p className="text-lg">{selectedAgent.createdBy}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </PageLayout>
    </RequireAuth>
  );
};

export default SupervisorAgents;
