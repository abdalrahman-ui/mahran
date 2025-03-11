
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HomePage = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-end mb-4">
          <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ur">اردو</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">{t('welcome')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin">
              <Button variant="outline" className="w-full h-32 text-lg">
                {t('admin')}
              </Button>
            </Link>
            <Link to="/manager">
              <Button variant="outline" className="w-full h-32 text-lg">
                {t('managers')}
              </Button>
            </Link>
            <Link to="/supervisor">
              <Button variant="outline" className="w-full h-32 text-lg">
                {t('supervisors')}
              </Button>
            </Link>
            <Link to="/agent">
              <Button variant="outline" className="w-full h-32 text-lg">
                {t('agents')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
