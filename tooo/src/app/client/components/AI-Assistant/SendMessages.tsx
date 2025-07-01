"use client";
import { useCallback, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/types";

type SendMessageProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: () => void;
};

export default function SendMessages(props: SendMessageProps) {
  const { input, setInput, isLoading, sendMessage } = props;
  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <div className="relative">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Танд ямар тусламж хэрэгтэй вэ?"
        className="bg-[#1b1d2f] text-white border-none pr-12 h-30 pb-[72px] pl-5 pt-6 rounded-xl placeholder:text-[#667085] placeholder:text-lg focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
        disabled={isLoading}
        maxLength={1000}
      />
      <Button
        onClick={sendMessage}
        className="absolute bottom-[14px] right-[14px] h-[46px] w-[46px] p-0 bg-[#2b344b] hover:bg-[#3a4560] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || input.trim() === ""}
      >
        <ArrowUp
          style={{ width: "1.875rem", height: "1.875rem" }}
          className={`text-white transition-opacity ${
            isLoading || input.trim() === ""
              ? "opacity-40"
              : "opacity-80 hover:opacity-100"
          }`}
        />
      </Button>
    </div>
  );
}
