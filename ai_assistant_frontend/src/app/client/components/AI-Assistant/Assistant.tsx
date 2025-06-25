"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/userProvider";

type Message = {
  id: string;
  received: boolean;
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

export default function Chat() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      received: true,
      content: "Сайн уу! 👋 Би таны хувийн туслах REBECCA байна.",
      timestamp: getTimeString(),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const hasUserSentMessage = messages.some((msg) => !msg.received);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      received: false,
      content: input,
      timestamp: getTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const assistantReply: Message = {
        id: crypto.randomUUID(),
        received: true,
        content: "🤖 Энэ асуултад одоогоор хариулт бэлэн биш байна.",
        timestamp: getTimeString(),
      };
      setMessages((prev) => [...prev, assistantReply]);
    }, 500);
  };

  useEffect(() => {
    if (user?.messages?.length) {
      const userMessages = user.messages.map((m) => ({
        id: m.id,
        received: m.received,
        content: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString("mn-MN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      }));

      setMessages(userMessages);
    }
  }, [user]);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!hasUserSentMessage) {
    // Greeting + input stacked vertically centered
    return (
      <div className="flex flex-col h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-[720px] rounded-xl p-6 flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-base text-gray-800">
              Сайн уу! 👋 Би таны{" "}
              <span className="font-bold">хувийн туслах</span>
            </p>
            <p className="text-2xl font-extrabold text-black">REBECCA байна.</p>
          </div>
          <div className="w-full h-[60px] flex items-center px-2 gap-2 border border-gray-300 rounded-xl bg-white">
            <Input
              className="flex-1 h-full border-none rounded-none focus-visible:ring-0 focus-visible:ring-transparent text-[15px] px-4"
              placeholder="Танд ямар тусламж хэрэгтэй вэ?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoFocus
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-[36px] w-[69px] bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:bg-blue-200 rounded-md"
            >
              Илгээх
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // After user sends message — full chat layout with messages scroll + input at bottom
  return (
    <div className="flex flex-col h-screen items-center justify-center px-4 py-8 ">
      <div className="w-full max-w-[720px] h-screen flex flex-col justify-between rounded-xl">
        <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto flex-grow">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                msg.received ? "self-start items-start" : "self-end items-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg text-sm ${
                  msg.received
                    ? "bg-gray-100 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {msg.content}
              </div>
              <span
                className={`text-xs mt-1 ${
                  msg.received
                    ? "text-left text-gray-500"
                    : "text-right text-gray-300"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="w-full h-[60px] flex items-center px-2 gap-2 border rounded-xl bg-white">
          <Input
            className="flex-1 h-full border-none rounded-none focus-visible:ring-0 focus-visible:ring-transparent text-[15px] px-4"
            placeholder="Танд ямар тусламж хэрэгтэй вэ?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            autoFocus
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-[36px] w-[69px] bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:bg-blue-200 rounded-md"
          >
            Илгээх
          </Button>
        </div>
      </div>
    </div>
  );
}
