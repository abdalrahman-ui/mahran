
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUsers, updateUserStatus } from "@/services/mockDataService";
import { User, UserStatus } from "@/types";
import { toast } from "sonner";

const AdminUsers = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(getUsers());
  
  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    const updatedUser = updateUserStatus(userId, newStatus);
    if (updatedUser) {
      setUsers(getUsers());
      toast.success(`تم تحديث حالة المستخدم إلى ${t(newStatus)}`);
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

  return (
    <RequireAuth allowedRoles={['admin']}>
      <PageLayout title={t('users')} role="admin">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('users')}</h2>
          <Button>
            {t('addUser')}
          </Button>
        </div>
        
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
                {users.map((user) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </PageLayout>
    </RequireAuth>
  );
};

export default AdminUsers;
