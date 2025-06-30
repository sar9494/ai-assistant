import React from "react";
import { Message } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import blob from "@/../public/blob.png";

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  bottomRef,
}) => (
  <div className="w-full max-w-[895px] mx-auto flex flex-col gap-4 px-2 pb-4">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className="flex gap-3 self-start items-start max-w-[80%] w-full"
      >
        {/* Avatar */}
        {msg.name === "Анухай" && msg.received ? (
          <Image
            src="/blob.png"
            alt="Анухай"
            width={32}
            height={32}
            className="w-8 h-8 mt-1 rounded-full bg-red-500 object-cover"
          />
        ) : (
          <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src={msg.avatar || ""} alt={msg.name || ""} />
            <AvatarFallback>{msg.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
        )}

        {/* Message Block */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            {/* Name */}
            <span className="text-sm font-semibold text-white">{msg.name}</span>
            {/* Timestamp */}
            <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
          </div>
          {/* Message Content */}
          <div className="text-sm text-white whitespace-pre-wrap px-0 py-0">{msg.content}</div>
        </div>
      </div>
    ))}

    {/* Loading bubble */}
    {isLoading && (
      <div className="flex gap-3 self-start items-start max-w-[80%]">
        <Avatar className="w-8 h-8 mt-1" />
        <div className="bg-[#1f2937] text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <span>Анухай уншиж байна</span>
          <span className="animate-bounce">...</span>
        </div>
      </div>
    )}
    <div ref={bottomRef} />
  </div>
);

export default ChatMessages;
