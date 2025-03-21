
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSubmit: () => void;
  title: string;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm = ({ onSubmit, title, isLoading = false, error = null }: LoginFormProps) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
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

export default LoginForm;
