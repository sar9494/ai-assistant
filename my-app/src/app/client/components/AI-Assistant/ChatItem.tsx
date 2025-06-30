import React from "react";
import { MessageCircle } from "lucide-react";

type ChatItemProps = {
  title: string;
  date: string;
};

const ChatItem: React.FC<ChatItemProps> = ({ title, date }) => (
  <div className="flex flex-col hover:bg-[#1b1d2f] rounded-lg cursor-pointer">
    <div className="flex items-center justify-between">
      <p className="text-[20px] font-semibold text-white truncate max-w-[230px]">
        {title}
      </p>
      <MessageCircle className="text-[#98A2B3] w-[18px] h-[18px] mt-4" />
    </div>
    <p className="text-[18px] text-[#98A2B3]">{date}</p>
  </div>
);

export default ChatItem; 