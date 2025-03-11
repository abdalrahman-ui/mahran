
import { useState } from "react";
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

const SupervisorAgents = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>(getAgents());
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentIdNumber, setNewAgentIdNumber] = useState("");

  const handleAddAgent = () => {
    if (!newAgentName.trim() || !newAgentIdNumber.trim()) {
      toast.error('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }

    // Check if ID already exists
    const idExists = agents.some(agent => agent.idNumber === newAgentIdNumber);
    if (idExists) {
      toast.error('رقم الهوية موجود بالفعل');
      return;
    }

    if (user) {
      const newAgent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'> = {
        name: newAgentName,
        idNumber: newAgentIdNumber,
        region: user.region || 'الرياض',
        createdBy: user.id,
      };

      const addedAgent = addAgent(newAgent);
      setAgents([...agents, addedAgent]);
      setNewAgentName("");
      setNewAgentIdNumber("");
      toast.success('تم إضافة المندوب بنجاح');
    }
  };

  return (
    <RequireAuth allowedRoles={['supervisor']}>
      <PageLayout title={t('agents')} role="supervisor">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('agents')}</h2>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">{t('name')}</th>
                      <th className="px-4 py-2 text-left">{t('idNumber')}</th>
                      <th className="px-4 py-2 text-left">{t('region')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.id}>
                        <td className="border px-4 py-2">{agent.name}</td>
                        <td className="border px-4 py-2">{agent.idNumber}</td>
                        <td className="border px-4 py-2">{agent.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('addAgent')}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agentName">{t('name')}</Label>
                  <Input
                    id="agentName"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder={t('name')}
                  />
                </div>
                <div>
                  <Label htmlFor="agentIdNumber">{t('idNumber')}</Label>
                  <Input
                    id="agentIdNumber"
                    value={newAgentIdNumber}
                    onChange={(e) => setNewAgentIdNumber(e.target.value)}
                    placeholder={t('idNumber')}
                  />
                </div>
                <Button className="w-full" onClick={handleAddAgent}>
                  {t('add')}
                </Button>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  {t('uploadExcel')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default SupervisorAgents;
