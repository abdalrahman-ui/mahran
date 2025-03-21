
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgentLoginFormProps {
  onSubmit: (region: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const regions = [
  { value: 'الرياض', label: 'الرياض' },
  { value: 'جدة', label: 'جدة' },
  { value: 'الدمام', label: 'الدمام' },
];

const AgentLoginForm = ({ onSubmit, isLoading = false, error = null }: AgentLoginFormProps) => {
  const [region, setRegion] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(region);
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('agents')}</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="region">{t('region')}</Label>
          <Select
            value={region}
            onValueChange={setRegion}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('region')} />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || !region}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('loading')}
            </>
          ) : (
            t('login')
          )}
        </Button>
      </form>
    </Card>
  );
};

export default AgentLoginForm;
