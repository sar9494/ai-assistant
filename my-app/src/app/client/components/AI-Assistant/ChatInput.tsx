import React from "react";
import SendMessages from "./SendMessages";
import { Message } from "./types";

type ChatInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, setMessages, isLoading, setIsLoading }) => (
  <div className="relative w-full max-w-[895px] mx-auto mt-4">
    <SendMessages
      message={input}
      setMessage={setInput}
      setMessages={setMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  </div>
);

export default ChatInput; 