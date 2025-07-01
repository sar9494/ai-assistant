import React from "react";
import { Message } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  bottomRef,
}) => {
  const groupedMessages = messages.reduce((groups, msg) => {
    const date = new Date(msg.timestamp);
    const dateKey = date.toDateString();

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
    return groups;
  }, {} as Record<string, typeof messages>);

  const formatDate = (dateString: string, firstMsgTimestamp: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const time = formatTime(firstMsgTimestamp);

    if (date.toDateString() === today.toDateString()) {
      return `Өнөөдөр, ${time}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Өчигдөр, ${time}`;
    } else {
      return (
        date.toLocaleDateString("mn-MN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) + `, ${time}`
      );
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="w-full max-w-[895px] mx-auto flex flex-col gap-4 px-2 font-gip bg-[#101522]">
      {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
        <div key={dateKey}>
          <div className="flex items-center justify-center my-4">
            <div className="flex-1 h-px bg-[#34405466]" />
            <span className="px-4 text-lg text-[#C8CBCF] font-medium">
              {formatDate(dayMessages[0].timestamp, dayMessages[0].timestamp)}
            </span>
            <div className="flex-1 h-px bg-[#34405466]" />
          </div>

          {dayMessages.map((msg, idx) => {
            const isAI = msg.received;
            const prevIsAI = idx > 0 ? dayMessages[idx - 1].received : false;
            const marginClass = isAI && !prevIsAI ? "my-[50px]" : "";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-5 w-full max-w-full ${marginClass}`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {msg.name === "Анухай" && msg.received ? (
                    <Image
                      src="/blob.png"
                      alt="Анухай"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={msg.avatar || ""}
                        alt={msg.name || ""}
                      />
                      <AvatarFallback>{msg.name?.[0] || "A"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Message content */}
                <div className="flex flex-col gap-2 relative w-full">
                  {/* Timestamp - top right */}
                  <span className="absolute top-0 right-0 text-[#C8CBCF] text-[18px] font-normal">
                    {formatTime(msg.timestamp)}
                  </span>
                  {/* Name */}
                  <span className="text-xl text-[#C8CBCF] font-semibold">
                    {msg.received ? "AnuxAI" : msg.name || "User"}
                  </span>
                  {/* Message bubble */}
                  <div
                    className="text-[#98A2B3] text-xl whitespace-pre-wrap break-words max-w-full font-medium"
                    style={
                      msg.received
                        ? {
                            background: "#1B202FB2",
                            border: "1.5px solid #344054B3",
                            borderRadius: "12px",
                            padding: "12px 16px",
                          }
                        : {}
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Loading */}
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
};

export default ChatMessages;
