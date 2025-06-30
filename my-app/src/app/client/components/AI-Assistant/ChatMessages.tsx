import React from "react";
import { Message } from "./types";

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, bottomRef }) => (
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
        <span className="text-xs mt-1 text-gray-400">{msg.timestamp}</span>
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
);

export default ChatMessages; 