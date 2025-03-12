
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  details?: {
    label: string;
    value: number | string;
    color?: string;
  }[];
}

const StatCard = ({ title, value, icon, details }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        {icon}
      </div>
      {details && (
        <div className="mt-4 text-sm text-gray-500">
          <div className={details.length > 2 ? "grid grid-cols-2 gap-2" : "flex justify-between"}>
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between">
                <span>{detail.label}</span>
                <span className={`font-medium ${detail.color || ""}`}>{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
