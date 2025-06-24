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

// Цаг буцаах тусгай функц
function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Эхний AI мессеж
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

  // Автоматаар доод хэсэг рүү scroll хийх
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-base">
          Сайн уу! 👋 Би таны <span className="font-semibold">хувийн туслах</span>
        </p>
        <p className="text-lg font-bold">REBECCA</p>
      </div>

      {/* Messages box */}
      <div
        className="w-1/3 max-w-full h-[800px] mb-4 flex flex-col gap-2  rounded-lg p-4 bg-white overflow-y-scroll custom-scrollbar"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.role === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.content}
            </div>
            <span
              className={`text-xs mt-1 ${
                msg.role === "user" ? "text-right text-gray-300" : "text-left text-gray-500"
              }`}
            >
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="w-1/3 max-w-full flex gap-2">
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
