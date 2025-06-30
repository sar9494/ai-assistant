"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/userProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelRight, Plus, Search, Trash, Command, Heading } from "lucide-react";
import Blob from "../Blob";
import SendMessages from "./SendMessages";
import { Message } from "./types";

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
    <div className="p-2 bg-[#1b1d2f] rounded-lg hover:bg-[#2c2f48] cursor-pointer">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  );
}

export default function ChatAssistant() {
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#101522] text-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
            <PanelRight className="text-[#98A2B3]" />
          </div>
        </div>

        {/* Messages */}
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
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="relative w-full max-w-[895px] mx-auto mt-4">
            {/* <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Танд ямар тусламж хэрэгтэй вэ?"
              className="bg-[#1b1d2f] text-white border-none pr-12 h-30 pb-[72px] pl-5 pt-6 rounded-xl placeholder:text-lg focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
            /> */}
            <SendMessages
              message={input}
              setMessage={setInput}
              setMessages={setMessages}
            />
          </div>
        </div>
      </div>

      {/* History */}
      <div className="w-[340px] border-l border-[#2c2f48] pt-[47px] px-3  bg-[#0b111c]">
        <div className="mb-4 relative">
          <Input
            placeholder="Хайх"
            className="bg-[#1b1d2f] text-white border-none pl-[49px] h-12 text-[20px]"
            style={{ fontSize: '20px' }}
          />
          <Search className="text-[#98A2B3] absolute left-[10px] top-1/2 -translate-y-1/2 w-8 h-8" />
          <div>
            <div className="absolute right-[50px] top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
              <Command size={20.74} className="text-[#98A2B3] relative z-10" />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
              <Heading size={20.74} className="text-[#98A2B3] relative z-10" />
            </div>
          </div>
        </div>
        <ScrollArea className="h-[85vh]">
          <div className="space-y-2">
            <ChatItem title="Шинэ чат" date="Өнөөдөр, 11:50 pm" />
            <ChatItem title="Манай менежер ..." date="Өнөөдөр, 11:50 pm" />
            <ChatItem title=" ..." date="Өчигдөр, 11:50 pm" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
