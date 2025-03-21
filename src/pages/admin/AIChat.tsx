
import PageLayout from "@/components/layout/PageLayout";
import ChatAssistant from "@/components/ChatAssistant";
import RequireAuth from "@/components/layout/RequireAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const AIChat = () => {
  const { t } = useLanguage();

  return (
    <RequireAuth allowedRoles={["admin", "manager"]}>
      <PageLayout title={t("aiAssistant")}>
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold mb-6">{t("aiAssistant")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("aiAssistantDescription")}
          </p>
          <ChatAssistant />
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default AIChat;
