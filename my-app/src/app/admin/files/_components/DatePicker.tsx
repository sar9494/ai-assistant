"use client";

import * as React from "react";
import { Calendar1, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarDate(props: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);
  const { date, setDate } = props;
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal bg-[#1E2530] text-[#818994] hover:bg-[#1E2530] hover:text-white"
          >
            <Calendar1 />
            {selectedDate ? selectedDate.toLocaleDateString() : "Он сар сонгох"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            className="bg-[#1E2530] text-[#818994]"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

