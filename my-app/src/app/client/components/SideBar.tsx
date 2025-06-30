"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CheckSquare,
  Clock,
  SparklesIcon,
} from "lucide-react";

type SidebarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Sidebar({ value, onChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen  bg-[#0C101C] px-6 py-8 flex flex-col text-white">
      {/* Profile */}
      <div className="flex items-center gap-3 mb-10">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://i.pravatar.cc/100?u=user" alt="User" />
          <AvatarFallback>AE</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="font-semibold text-sm text-white">A. Enkh–Erdene</p>
          <p className="text-xs text-[#98A2B3]">Marketing manager</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={value} onValueChange={onChange} className="w-full mt-[200px] gap-2">
        <TabsList className="flex flex-col gap-6 items-start w-full bg-transparent p-0">
          <SidebarItem value="dashboard" icon={<LayoutDashboard className='text-white' />} label="Dashboard" />
          <SidebarItem value="team" icon={<Users className='text-white' />} label="Team member" />
          <SidebarItem value="calendar" icon={<CalendarDays className='text-white' />} label="Calendar" />
          <SidebarItem value="todo" icon={<CheckSquare className='text-white' />} label="To-do" />
          <SidebarItem value="time" icon={<Clock className='text-white' />} label="Time tracker" />
          <SidebarItem value="assistant" icon={<SparklesIcon className='text-white' />} label="AI assistant" />
        </TabsList>
      </Tabs>
    </div>
  );
}

function SidebarItem({
  value,
  icon,
  label,
}: {
  value: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TabsTrigger
      value={value}
      className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm font-medium rounded text-left text-white transition-all duration-200 hover:bg-[#181E2A] hover:scale-105 hover:text-[#82BCDF] data-[state=active]:bg-muted"
    >
      <div className="w-5 h-5 stroke-[1.5] shrink-0">{icon}</div>
      <span className="truncate">{label}</span>
    </TabsTrigger>
  );
}
