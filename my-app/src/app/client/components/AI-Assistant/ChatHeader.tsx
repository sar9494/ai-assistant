import { Button } from "@/components/ui/button";
import { Plus, Trash, PanelRight } from "lucide-react";
import React from "react";
import styles from "./Assistant.module.css";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => (
  <div className="flex items-center justify-between pl-3 py-5 border-b border-[#2c2f48] pr-[14px]">
    <h1 className="text-[22px] font-semibold text-[#C8CBCF] hover:bg-[#1b1d2f] p-2 tracking-[0px] leading-[100%] cursor-pointer">
      Шинэ чат
    </h1>
    <div className="flex items-center gap-5">
      <Button
        className={`${styles["gradient-btn"]} text-white flex gap-2 items-center w-[133px] h-[42px] text-[18px] font-semibold justify-center rounded-[12px]`}
        style={{
          background:
            "linear-gradient(93.26deg, #82BCDF 11.08%, #967ADE 54.22%, #CB98E5 83.62%)",
        }}
      >
        <Plus style={{ width: "22px", height: "22px" }} /> Шинэ чат
      </Button>
      <div className="border-r h-[42px] border-[#344054] bg-[#344054] opacity-70 mr-[2px]"></div>

      {/* Trash Icon with hover effect */}
      <div className="hover:bg-[#344054] rounded-[10px] p-2 transition-colors cursor-pointer">
        <Trash className="text-[#98A2B3] hover:text-white" />
      </div>

      {/* PanelRight Icon with hover effect */}
      <div
        className="hover:bg-[#344054] rounded-[10px] p-2 transition-colors cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <PanelRight className="text-[#98A2B3] hover:text-white" />
      </div>
    </div>
  </div>
);

export default ChatHeader;
