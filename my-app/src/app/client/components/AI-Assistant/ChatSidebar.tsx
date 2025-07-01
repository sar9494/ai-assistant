import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Command, Heading } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatItem from "./ChatItem";

type ChatSidebarProps = {
  isSidebarOpen: boolean;
  groupedChats: Record<string, { title: string; date: string }[]>;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isSidebarOpen,
  groupedChats,
}) => {
  if (!isSidebarOpen) return null;
  return (
    <div className="w-[340px] border-l border-[#2c2f48] pt-[47px] px-3 bg-[#0b111c]">
      <div className=" relative">
        <Input
          placeholder="Хайх"
          className="bg-[#1b1d2f] text-white border-none pl-[49px] h-12 text-[20px] placeholder:text-[#667085] placeholder:text-[20px] !text-xl"
        />
        <Search className="text-[#98A2B3] absolute left-[10px] top-1/2 -translate-y-1/2 w-8 h-8" />
        <div className="absolute right-[50px] top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
          <Command size={20.74} className="text-[#98A2B3]" />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#455072] w-8 h-8 rounded flex items-center justify-center">
          <Heading size={20.74} className="text-[#98A2B3]" />
        </div>
      </div>
      <ScrollArea className="h-[85vh] pr-2">
        <div className="space-y-4 px-3">
          {Object.entries(groupedChats).map(([group, items]) => (
            <div className="mb-10" key={group}>
              <div className="text-[20px] text-[#98A2B3] mb-[12px] mt-[32px]">
                {group}
              </div>
              <div className="flex flex-col ">
                {items.map((item, idx) => (
                  <ChatItem
                    key={idx}
                    title={item.title}
                    date={`${group}, ${item.date}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
