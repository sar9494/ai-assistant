"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUp } from "lucide-react";
import Blob from "../Blob";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatSidebar from "./ChatSidebar";
import SendMessages from "./SendMessages";
import { io, Socket } from "socket.io-client";
import { Message } from "@/types/types";
import { useUser } from "@/app/provider/userProvider";
let socket: Socket;

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
  const { user } = useUser();
  const conversationId =
    typeof window !== "undefined" ? localStorage.getItem("conversationId") : "";

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

  user?.conversation.forEach((chat) => {
    const label = getChatGroupLabel(chat.createdAt);
    if (!groupedChats[label]) groupedChats[label] = [];
    groupedChats[label].push({
      title: chat.title,
      date: new Date(chat.createdAt).toLocaleTimeString("mn-MN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    });
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input !== "") {
      socket.emit("chatMessage", {
        content: input,
        room: user?.id,
        received: false,
        userId: user?.id,
        conversationId: messages.length == 0 ? "" : conversationId,
      });
      console.log("sending", input);
      setIsLoading(true);

      setMessages((prev) => [...prev, { received: false, content: input }]);
      setInput("");
    }
  };

  useEffect(() => {
    setMessages([]);

    socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
    socket.on("chatMessage", (msg: { content: string; received: boolean }) => {
      console.log("Received message:", msg);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { received: true, content: msg.content },
      ]);
    });
    socket.emit("join_room", user?.id);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#101522] text-white font-gip relative overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#101522]">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col h-0">
          {/* Centered welcome if no messages */}
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* BLOB BACKGROUND */}
              <div className="absolute bottom-[-300px] left-[-100px] w-[500px] h-[500px] pointer-events-none z-0">
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#C600FC_0%,#967ADE_60%)] opacity-50 blur-[120px]" />
              </div>
              <h1 className="text-[52px] text-white mb-10 flex items-center justify-center text-center font-gip font-bold">
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
              <div className="w-full max-w-[895px] mx-auto">
                <div className="relative w-full max-w-[895px] mx-auto mt-4">
                  <SendMessages
                    input={input}
                    setInput={setInput}
                    setMessages={setMessages}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    sendMessage={sendMessage}
                  />
                </div>

                {/* Quick action buttons */}
                <div className="flex gap-2 justify-center mt-4">
                  {[
                    "Байгууллагын үнэт зүйл",
                    "Дотоод журам",
                    "Хэдэн хүн ажилдаг вэ",
                  ].map((text) => (
                    <button
                      key={text}
                      type="button"
                      onClick={() => setInput(text)}
                      className="px-4 py-2 rounded-lg bg-[#181B2C] text-[#98A2B3] hover:bg-[#23263a] border border-[#23263a] transition-colors text-[16px] font-medium flex items-center gap-2"
                    >
                      {text}
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto w-full flex flex-col items-center">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                bottomRef={bottomRef}
              />
            </div>
          )}
        </div>
        {messages.length > 0 && (
          <div className="w-full absolute left-0 bottom-0 z-10 bg-[#101522] pb-4">
            <div className="relative w-full max-w-[895px] mx-auto mt-4">
              <SendMessages
                input={input}
                setInput={setInput}
                setMessages={setMessages}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chat History Sidebar */}
      <ChatSidebar isSidebarOpen={isSidebarOpen} groupedChats={groupedChats} />
    </div>
  );
}
