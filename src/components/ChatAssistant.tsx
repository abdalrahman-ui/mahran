
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا المساعد الذكي لنظام مهران. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // تمرير للأسفل عند إضافة رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // إضافة رسالة المستخدم
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // محاكاة استجابة الذكاء الاصطناعي (في الإنتاج، هذا سيكون طلبًا إلى API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      let responseText = "";
      
      // معالجة بعض الكلمات المفتاحية للمساعدة في الاختبار
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("مرحبا") || lowercaseInput.includes("اهلا")) {
        responseText = "مرحباً بك! كيف يمكنني مساعدتك في نظام مهران اليوم؟";
      } else if (lowercaseInput.includes("تذكرة") || lowercaseInput.includes("التذاكر")) {
        responseText = "يمكنك إنشاء تذكرة جديدة من خلال الذهاب إلى قسم 'التذاكر' ثم النقر على 'إنشاء تذكرة جديدة'. هل تحتاج إلى مساعدة أخرى؟";
      } else if (lowercaseInput.includes("مندوب") || lowercaseInput.includes("المناديب")) {
        responseText = "يمكنك إدارة المناديب من خلال صفحة 'المناديب' في لوحة التحكم. هناك يمكنك إضافة، تعديل، أو حذف معلومات المناديب.";
      } else {
        responseText = "شكراً لاستفسارك. سأقوم بالبحث عن المعلومات المطلوبة ومساعدتك في أقرب وقت. هل هناك شيء محدد تريد معرفته عن نظام مهران؟";
      }
      
      // إضافة رد المساعد
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      // إضافة رسالة خطأ
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "عذراً، حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى لاحقاً.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[70vh] p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-[80%] ${
              message.role === "user"
                ? "bg-primary text-primary-foreground mr-auto"
                : "bg-muted ml-auto"
            }`}
          >
            <p>{message.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("typeYourMessage")}
          className="flex-1 resize-none"
          rows={2}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ChatAssistant;
