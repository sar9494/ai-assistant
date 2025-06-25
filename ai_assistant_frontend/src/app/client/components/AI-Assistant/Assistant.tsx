"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/userProvider";
import SendMessages from "./SendMessages";
import { Message } from "./types";

// Цаг буцаах тусгай функц
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
  console.log(user);
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

  // Автоматаар доод хэсэг рүү scroll хийх
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-base">
          Сайн уу! 👋 Би таны{" "}
          <span className="font-semibold">хувийн туслах</span>
        </p>
        <p className="text-lg font-bold">REBECCA</p>
      </div>

      {/* Messages box */}
      <div className="w-1/2 max-w-full h-[800px] mb-4 flex flex-col gap-2  rounded-lg p-4 bg-white overflow-y-scroll custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.received === false
                ? "self-end items-end"
                : "self-start items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                msg.received === false
                  ? "bg-blue-400 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.content}
            </div>
            <span
              className={`text-xs mt-1 ${
                msg.received === false
                  ? "text-right text-gray-300"
                  : "text-left text-gray-500"
              }`}
            >
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Scroll target */}
        <div ref={bottomRef} />
        <SendMessages message={input} setMessage={setInput} setMessages={setMessages}/>
      </div>
    </div>
  );
}
