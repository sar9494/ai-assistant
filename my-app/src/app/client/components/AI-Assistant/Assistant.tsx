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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      received: true,
      content: "Сайн уу! 👋 Би таны хувийн туслах Анухай байна.",
      timestamp: getTimeString(),
    },
  ]);
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
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between pl-3 py-5 border-b border-[#2c2f48] pr-3">
          <h1 className="text-[22px] font-semibold text-[#C8CBCF]">Шинэ чат</h1>
          <div className="flex items-center gap-5">
            <Button
              className="text-white flex gap-2 items-center w-[133px] h-[42px] text-[18px] font-semibold justify-center rounded-[12px]"
              style={{
                background:
                  "linear-gradient(93.26deg, #82BCDF 11.08%, #967ADE 54.22%, #CB98E5 83.62%)",
              }}
            >
              <Plus style={{ width: "22px", height: "22px" }} /> Шинэ чат
            </Button>
            <div className="border-r h-[42px] border-[#344054] bg-[#344054] opacity-70 mr-[10px]"></div>
            <Trash className="text-[#98A2B3]" />
            <PanelRight
              className="text-[#98A2B3] cursor-pointer hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pb-[83px]">
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
          <div className="w-full max-w-[895px] mx-auto flex flex-col gap-2 rounded-xl px-2 pb-4">
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
                      ? "bg-[#1f2937] text-white"
                      : "bg-[#7a6af8] text-white"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-xs mt-1 text-gray-400">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col max-w-[80%] self-start items-start">
                <div className="px-4 py-2 rounded-lg text-sm bg-[#1f2937] text-white flex items-center gap-2">
                  <span>Анухай уншиж байна</span>
                  <span className="animate-bounce">...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="relative w-full max-w-[895px] mx-auto mt-4">
            <SendMessages
              message={input}
              setMessage={setInput}
              setMessages={setMessages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>

      {/* Chat History Sidebar */}
      {isSidebarOpen && (
        <div className="w-[340px] border-l border-[#2c2f48] pt-[47px] px-3 bg-[#0b111c]">
          <div className=" relative">
            <Input
              placeholder="Хайх"
              className="bg-[#1b1d2f] text-white border-none pl-[49px] h-12 text-[20px] placeholder:text-[#667085] placeholder:text-[20px]"
            />
            <Search className="text-[#98A2B3] absolute left-[10px] top-1/2 -translate-y-1/2 w-8 h-8" />
            <div className="absolute right-[50px] top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
              <Command size={20.74} className="text-[#98A2B3]" />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
              <Heading size={20.74} className="text-[#98A2B3]" />
            </div>
          </div>
          <ScrollArea className="h-[85vh] pr-2">
            <div className="space-y-4 px-3">
              {Object.entries(groupedChats).map(([group, items]) => (
                <div className="mb-10" key={group}>
                  <div className="text-[20px] text-[#98A2B3] mb-[12px] mt-[32px]">
                    {group}
                  </div>
                  <div className="flex flex-col gap-5">
                    {items.map((item, idx) => (
                      <ChatItem
                        key={idx}
                        title={item.title}
                        date={`${group}, ${item.date}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
