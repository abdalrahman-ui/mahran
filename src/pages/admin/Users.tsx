import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUsers, updateUserStatus, addUser } from "@/services/mockDataService";
import { User, UserStatus, UserRole } from "@/types";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";

const AdminUsers = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(getUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  // نموذج إضافة مستخدم جديد
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "agent" as UserRole,
    region: "",
  });
  
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    const updatedUser = updateUserStatus(userId, newStatus);
    if (updatedUser) {
      setUsers(getUsers());
      toast.success(`تم تحديث حالة المستخدم إلى ${t(newStatus)}`);
    }
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.firstName || !newUser.lastName) {
      toast.error('يرجى ملء جميع الحقول الإلزامية');
      return;
    }

    try {
      addUser({
        ...newUser,
        status: 'pending',
      });
      
      setUsers(getUsers());
      setNewUser({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "agent",
        region: "",
      });
      setShowAddUserDialog(false);
      toast.success('تم إضافة المستخدم بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة المستخدم');
      console.error(error);
    }
  };

  const getUserRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return t('admin');
      case 'manager':
        return t('managers');
      case 'supervisor':
        return t('supervisors');
      case 'agent':
        return t('agents');
      default:
        return role;
    }
  };

  const getStatusBadgeClass = (status: UserStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      searchTerm === "" || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = 
      roleFilter === "" || 
      user.role === roleFilter;
      
    const matchesStatus = 
      statusFilter === "" || 
      user.status === statusFilter;
      
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('users')} role="admin">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">{t('users')}</h2>
          
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button>
                {t('addUser')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('addUser')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">{t('username')}</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">{t('firstName')}</Label>
                  <Input
                    id="firstName"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">{t('lastName')}</Label>
                  <Input
                    id="lastName"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">{t('role')}</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t('selectRole')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t('admin')}</SelectItem>
                      <SelectItem value="manager">{t('managers')}</SelectItem>
                      <SelectItem value="supervisor">{t('supervisors')}</SelectItem>
                      <SelectItem value="agent">{t('agents')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(newUser.role === 'supervisor' || newUser.role === 'agent') && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="region" className="text-right">{t('region')}</Label>
                    <Input
                      id="region"
                      value={newUser.region}
                      onChange={(e) => setNewUser({...newUser, region: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button onClick={handleAddUser} className="w-full">{t('add')}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={t('searchUsers')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t('role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t('allRoles')}</SelectItem>
                  <SelectItem value="admin">{t('admin')}</SelectItem>
                  <SelectItem value="manager">{t('managers')}</SelectItem>
                  <SelectItem value="supervisor">{t('supervisors')}</SelectItem>
                  <SelectItem value="agent">{t('agents')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t('allStatuses')}</SelectItem>
                  <SelectItem value="pending">{t('pending')}</SelectItem>
                  <SelectItem value="approved">{t('approved')}</SelectItem>
                  <SelectItem value="rejected">{t('rejected')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('username')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('firstName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('lastName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('role')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('region')}
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getUserRoleName(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.region || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                          {t(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleStatusChange(user.id, 'approved')}
                            >
                              {t('approve')}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleStatusChange(user.id, 'rejected')}
                            >
                              {t('reject')}
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      {t('noUsersFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminUsers;
