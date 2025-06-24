
import { Message } from "./types";
import { cn } from "@/lib/utils";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs rounded-lg px-4 py-2 text-sm",
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
