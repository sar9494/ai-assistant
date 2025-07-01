import React from "react";
import { MessageCircle } from "lucide-react";

type ChatItemProps = {
  title: string;
  date: string;
};

const ChatItem: React.FC<ChatItemProps> = ({ title, date }) => (
  <div className="w-[310px] p-3 rounded-lg hover:bg-[#1B202F] transition-colors cursor-pointer -ml-3">
    <div className="flex items-start justify-between">
      <p className="text-[20px] font-semibold text-[#C8CBCF] truncate max-w-[230px]">
        {title}
      </p>
      <MessageCircle className="text-[#98A2B3] w-[18px] h-[18px] mt-[2px]" />
    </div>
    <p className="text-[18px] text-[#98A2B3]">{date}</p>
  </div>
);

export default ChatItem;
