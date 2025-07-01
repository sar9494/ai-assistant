"use client";
// import { useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "./types";
// import { useSocket } from "@/app/components/context/SocketContext";

type SendMessageProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: number;
  roomId?: number;
  sendMessage: () => void;
};

export default function SendMessages(props: SendMessageProps) {
  const {
    message,
    setMessage,
    // setMessages,
    isLoading,
    // setIsLoading,
    // userId = 4,
    // roomId = 1,
    sendMessage,
  } = props;

  // const { socket, isConnected, joinRoom } = useSocket(); // Use the context

  // useEffect(() => {
  // //   if (isConnected && socket) {
  // //     joinRoom(roomId);
  // //   }
  // // }, [isConnected, roomId, joinRoom, socket]);

  // // useEffect(() => {
  // //   if (!socket) return;

  // //   const handleChatMessage = (msg: {
  // //     content: string;
  // //     received: boolean;
  // //     userId?: number;
  // //     isAI?: boolean;
  // //     error?: boolean;
  // //   }) => {
  // //     console.log("💬 Мессеж хүлээн авлаа:", msg);

  //     // const receivedMessage: Message = {
  //     //   id: crypto.randomUUID(),
  //     //   received: true,
  //     //   content: message,
  //     //   timestamp: new Date().toLocaleTimeString("mn-MN", {
  //     //     hour: "2-digit",
  //     //     minute: "2-digit",
  //     //     hour12: false,
  //     //   }),
  //     // };

  //     // setMessages((prev) => [...prev, receivedMessage]);
  //     // setIsLoading(false);

  //   // socket.on("chatMessage", handleChatMessage);

  //   // return () => {
  //   //   socket.off("chatMessage", handleChatMessage);
  //   // };
  // }, [socket, setMessages, setIsLoading]);

  // Send message function
  // const sendMessage = useCallback(() => {
  //   if (message.trim() === "" || !socket || isLoading || !isConnected) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     socket.emit("chatMessage", {
  //       content: message.trim(),
  //       room: roomId,
  //       received: false,
  //       userId: userId,
  //     });

  //     const newMessage: Message = {
  //       id: crypto.randomUUID(),
  //       received: false,
  //       content: message.trim(),
  //       timestamp: new Date().toLocaleTimeString("mn-MN", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: false,
  //       }),
  //     };

  //     setMessages((prev) => [...prev, newMessage]);
  //     setMessage("");
  //   } catch (error) {
  //     console.error("❌ Мессеж илгээхэд алдаа:", error);
  //     setIsLoading(false);
  //   }
  // }, [
  //   message,
  //   isLoading,
  //   roomId,
  //   userId,
  //   setMessage,
  //   setMessages,
  //   setIsLoading,
  //   socket,
  //   isConnected,
  // ]);

  // Handle Enter key
  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       sendMessage();
  //     }
  //   },
  //   [sendMessage]
  // );

  return (
    <div className="relative">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendMessage}
        placeholder="Танд ямар тусламж хэрэгтэй вэ?"
        className="bg-[#1b1d2f] text-white border-none pr-12 h-30 pb-[72px] pl-5 pt-6 rounded-xl placeholder:text-[#667085] placeholder:text-lg focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
        disabled={isLoading}
        maxLength={1000}
      />
      <Button
        onClick={sendMessage}
        className="absolute bottom-[14px] right-[14px] h-[46px] w-[46px] p-0 bg-[#2b344b] hover:bg-[#3a4560] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || message.trim() === ""}
      >
        <ArrowUp
          style={{ width: "1.875rem", height: "1.875rem" }}
          className={`text-white transition-opacity ${
            isLoading || message.trim() === ""
              ? "opacity-40"
              : "opacity-80 hover:opacity-100"
          }`}
        />
      </Button>
    </div>
  );
}
