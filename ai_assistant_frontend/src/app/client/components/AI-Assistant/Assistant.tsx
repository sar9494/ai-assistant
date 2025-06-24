"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Сайн уу! 👋 Би таны хувийн туслах REBECCA байна.",
    timestamp: getTimeString(),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: getTimeString(),
    };

    const assistantReply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "🤖 Энэ асуултад одоогоор хариулт бэлэн биш байна.",
      timestamp: getTimeString(),
    };

    setMessages((prev) => [...prev, newMessage, assistantReply]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="text-center mb-6">
        <p className="text-base">
          Сайн уу! 👋 Би таны <span className="font-semibold">хувийн туслах</span>
        </p>
        <p className="font-bold text-lg">REBECCA</p>
      </div>

      {/* Scrollable messages */}
      <div className="w-full max-w-xl h-[800px] overflow-y-auto mb-4 flex flex-col gap-2 border rounded-lg p-4 bg-muted">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}>
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-white text-muted-foreground"
              }`}
            >
              {msg.content}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {msg.timestamp}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="w-full max-w-xl flex gap-2">
        <Input
          placeholder="Танд ямар тусламж хэрэгтэй вэ?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
