
import { ReportsSection } from "@/components/ReportsSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">التقارير</h1>
        <Link to="/">
          <Button variant="outline">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
      <ReportsSection />
    </div>
  );
};

export default Reports;
