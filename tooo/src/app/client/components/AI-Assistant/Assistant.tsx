"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
// import { MessageCircle } from "lucide-react";
import Blob from "../Blob";
import { Message } from "./types";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import SendMessages from "./SendMessages";

let socket: Socket;
// function getTimeString(): string {
//   const now = new Date();
//   return now.toLocaleTimeString("mn-MN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
// }

// type ChatItemProps = {
//   title: string;
//   date: string;
// };

// function ChatItem({ title, date }: ChatItemProps) {
//   return (
//     <div className="flex flex-col hover:bg-[#1b1d2f] rounded-lg cursor-pointer">
//       <div className="flex items-center justify-between">
//         <p className="text-[20px] font-semibold text-white truncate max-w-[230px]">
//           {title}
//         </p>
//         <MessageCircle className="text-[#98A2B3] w-[18px] h-[18px] mt-4" />
//       </div>
//       <p className="text-[18px] text-[#98A2B3]">{date}</p>
//     </div>
//   );
// }

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
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chatMessage", {
        content: message,
        room: 1,
        received: false,
        userId: 1,
      });
      console.log("sending", message);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          received: false,
          content: message,
          timestamp: new Date().toLocaleTimeString("mn-MN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      ]);
      setMessage("");
    }
  };
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          received: msg.received,
          content: msg.content,
          timestamp: new Date().toLocaleTimeString("mn-MN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
      ]);
    });
    socket.emit("join_room", 1);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#101522] text-white">
      {/* Main Chat Area */}

      <div className="flex-1 flex flex-col relative">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
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

          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            bottomRef={bottomRef}
          />
        </div>
        <div className="w-full absolute left-0 bottom-0 z-10 bg-[#101522] pb-4">
          <div className="relative w-full max-w-[895px] mx-auto mt-4">
            <SendMessages
              message={input}
              setMessage={setInput}
              setMessages={setMessages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>

      {/* Chat History Sidebar */}
      <ChatSidebar isSidebarOpen={isSidebarOpen} groupedChats={groupedChats} />
    </div>
  );
}
