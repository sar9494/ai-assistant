"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PanelRight,
  Plus,
  Search,
  Trash,
  Command,
  Heading,
  MessageCircle,
} from "lucide-react";
import Blob from "../Blob";
import SendMessages from "./SendMessages";
import { Message } from "./types";
import { Input } from "@/components/ui/input";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

type ChatItemProps = {
  title: string;
  date: string;
};

function ChatItem({ title, date }: ChatItemProps) {
  return (
    <div className="flex flex-col hover:bg-[#1b1d2f] rounded-lg cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-semibold text-white truncate max-w-[230px]">
          {title}
        </p>
        <MessageCircle className="text-[#98A2B3] w-[18px] h-[18px] mt-4" />
      </div>
      <p className="text-[18px] text-[#98A2B3]">{date}</p>
    </div>
  );
}

// Helper to group by Today / Yesterday
function getChatGroupLabel(dateStr: string): "Өнөөдөр" | "Өчигдөр" | string {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Өнөөдөр";
  if (isYesterday) return "Өчигдөр";
  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockChatHistory = [
    { id: 1, title: "Шинэ чат", date: new Date().toISOString() },
    {
      id: 2,
      title: "Манай менежер хар үс ...",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Манай менежер хэн бэ ...",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: "Манай менежер ...",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Grouping chat items
  const groupedChats: Record<string, { title: string; date: string }[]> = {};

  mockChatHistory.forEach((chat) => {
    const label = getChatGroupLabel(chat.date);
    if (!groupedChats[label]) groupedChats[label] = [];
    groupedChats[label].push({
      title: chat.title,
      date: new Date(chat.date).toLocaleTimeString("mn-MN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    });
  });

  // useEffect(() => {
  //   if (user?.messages?.length) {
  //     const userMessages = user.messages.map((m) => ({
  //       id: m.id,
  //       received: m.received,
  //       content: m.content,
  //       timestamp: new Date(m.createdAt).toLocaleTimeString("mn-MN", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: false,
  //       }),
  //     }));
  //     setMessages(userMessages);
  //   }
  // }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#101522] text-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <ChatHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col items-center justify-center pb-[100px]">
          <h1 className="text-[52px] text-white mb-10 flex items-center justify-center text-center">
            Хувийн туслах
            <div className="mx-4">
              <Blob />
            </div>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(93.26deg, #82BCDF 11.08%, #967ADE 54.22%, #CB98E5 83.62%)",
              }}
            >
              Анухай
            </span>
          </h1>
          <ChatMessages messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
        </div>
        <div className="w-full absolute left-0 bottom-0 z-10 bg-[#101522] pb-4">
          <ChatInput input={input} setInput={setInput} setMessages={setMessages} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>

      {/* Chat History Sidebar */}
      <ChatSidebar isSidebarOpen={isSidebarOpen} groupedChats={groupedChats} />
    </div>
  );
}
