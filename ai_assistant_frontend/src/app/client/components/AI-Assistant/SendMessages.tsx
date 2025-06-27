"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "./types";

type SendMessageProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
export default function SendMessages(props: SendMessageProps) {
  const { message, setMessage, setMessages } = props;
  const socketRef = useRef<Socket | null>(null);

  const sendMessage = () => {
    if (message !== "" && socketRef.current) {
      socketRef.current.emit("chatMessage", {
        content: message,
        room: 1,
        received: false,
        userId: 1,
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
    });

    socket.emit("join_room", 1);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-full ">
      <div className="w-1/2 max-w-full flex gap-2">
        <Input
          placeholder="Танд ямар тусламж хэрэгтэй вэ?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
