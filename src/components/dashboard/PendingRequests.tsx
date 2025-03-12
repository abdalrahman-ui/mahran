
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface PendingRequestsProps {
  pendingCount: number;
}

const PendingRequests = ({ pendingCount }: PendingRequestsProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t('pendingRequests')}</h3>
        <div className="space-y-4">
          {pendingCount === 0 ? (
            <p className="text-center text-gray-500 py-8">{t('noPendingRequests')}</p>
          ) : (
            pendingCount > 0 && (
              <div className="flex items-start border-b pb-4">
                <div className="p-2 rounded-full mr-4 bg-yellow-100 text-yellow-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{t('newUserRegistrations')}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('youHavePendingUsers', { count: pendingCount })}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default PendingRequests;
