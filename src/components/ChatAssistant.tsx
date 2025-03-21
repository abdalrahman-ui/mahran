
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, RefreshCw, Ticket, Search } from "lucide-react";
import { getTickets, addTicket, getTicketsByAgentId, searchTickets } from "@/services/ticketService";
import { Ticket as TicketType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t("aiWelcomeMessage"),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ticketData, setTicketData] = useState<TicketType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load tickets when component mounts
    if (user) {
      const allTickets = getTickets();
      setTicketData(allTickets);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Here we process the user's request
      const response = await processUserRequest(input);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t("aiErrorMessage"),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error processing request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processUserRequest = async (userInput: string): Promise<string> => {
    // Convert input to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Wait a short time to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Handle ticket search
    if (input.includes("search") || input.includes("find") || 
        input.includes("ticket") || input.includes("تذكرة") || 
        input.includes("بحث")) {
      
      const searchResults = searchTickets(userInput);
      
      if (searchResults.length === 0) {
        return t("noTicketsFound");
      }
      
      // Format the results
      let response = t("foundTickets") + ":\n\n";
      searchResults.slice(0, 5).forEach((ticket, index) => {
        response += `${index + 1}. ${ticket.ticketId}: ${ticket.description.substring(0, 100)}${ticket.description.length > 100 ? '...' : ''}\n`;
        response += `   ${t("status")}: ${t(ticket.status)}, ${t("date")}: ${new Date(ticket.createdAt).toLocaleDateString()}\n\n`;
      });
      
      if (searchResults.length > 5) {
        response += t("andMoreResults", { count: searchResults.length - 5 });
      }
      
      return response;
    }
    
    // Handle stats request
    if (input.includes("stats") || input.includes("statistics") || 
        input.includes("count") || input.includes("total") || 
        input.includes("إحصائيات")) {
      
      const allTickets = getTickets();
      const newTickets = allTickets.filter(t => t.status === "new").length;
      const openTickets = allTickets.filter(t => t.status === "open").length;
      const pendingTickets = allTickets.filter(t => t.status === "pending").length;
      const closedTickets = allTickets.filter(t => t.status === "closed").length;
      
      return `
${t("ticketStats")}:

• ${t("new")}: ${newTickets}
• ${t("open")}: ${openTickets}
• ${t("pending")}: ${pendingTickets}
• ${t("closed")}: ${closedTickets}
• ${t("total")}: ${allTickets.length}
      `;
    }
    
    // Handle help request
    if (input.includes("help") || input.includes("assist") || 
        input.includes("support") || input.includes("مساعدة") ||
        input.includes("how") || input.includes("كيف")) {
      
      return `
${t("aiHelpMessage")}:

1. ${t("searchTicketsCommand")}
2. ${t("getTicketStatsCommand")}
3. ${t("createTicketCommand")}
4. ${t("ticketStatusCommand")}

${t("askMoreSpecificQuestion")}
      `;
    }

    // Default response
    return t("aiDefaultResponse");
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`flex items-start space-x-2 ${
                language === "ar" || language === "ur" ? "space-x-reverse" : ""
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.role === "assistant"
                      ? "text-muted-foreground"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("typeYourMessage")}
            className="flex-1 min-h-[60px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-[60px] w-[60px]"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatAssistant;
