"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "./types";

type SendMessageProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendMessages(props: SendMessageProps) {
  const { message, setMessage, setMessages, isLoading, setIsLoading } = props;
  const socketRef = useRef<Socket | null>(null);

  const sendMessage = () => {
    if (message !== "" && socketRef.current && !isLoading) {
      setIsLoading(true);
      socketRef.current.emit("chatMessage", {
        content: message,
        room: 4,
        received: false,
        userId: 4,
      });

      const newMessage: Message = {
        id: crypto.randomUUID(),
        received: false,
        content: message,
        timestamp: new Date().toLocaleTimeString("mn-MN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("chatMessage", (msg: { content: string; received: boolean }) => {
      const receivedMessage: Message = {
        id: crypto.randomUUID(),
        received: msg.received,
        content: msg.content,
        timestamp: new Date().toLocaleTimeString("mn-MN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      setMessages((prev) => [...prev, receivedMessage]);
      setIsLoading(false);
    });

    socket.emit("join_room", 1);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Танд ямар тусламж хэрэгтэй вэ?"
        className="bg-[#1b1d2f] text-white border-none pr-12 h-30 pb-[72px] pl-5 pt-6 rounded-xl placeholder:text-[#667085] placeholder:text-lg !text-lg focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        disabled={isLoading}
      />
      <Button
        onClick={sendMessage}
        className={`absolute bottom-[14px] right-[14px] h-[46px] w-[46px] p-0 rounded-xl transition-colors ${message ? 'bg-[#455074] hover:bg-[#455074]' : 'bg-[#2b344b] hover:bg-[#3a4560]'}`}
        disabled={isLoading}
      >
        <ArrowUp
          style={{ width: "1.875rem", height: "1.875rem" }}
          className={`text-white ${message ? 'opacity-100' : 'opacity-40'}`}
        />
      </Button>
    </div>
  );
}
