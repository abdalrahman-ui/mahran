
import PageLayout from "@/components/layout/PageLayout";
import ChatAssistant from "@/components/ChatAssistant";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bot, Ticket, MessageSquare } from "lucide-react";

const AIChat = () => {
  const { t } = useLanguage();

  return (
    <RequireAuth allowedRoles={["admin", "manager"]}>
      <PageLayout title={t("aiAssistant")} role="admin">
        <div className="container mx-auto py-6">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={24} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{t("aiAssistant")}</CardTitle>
                <CardDescription>
                  {t("aiAssistantDescription")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  <span>{t("searchTicketsCommand")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>{t("getTicketStatsCommand")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <ChatAssistant />
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AIChat;
