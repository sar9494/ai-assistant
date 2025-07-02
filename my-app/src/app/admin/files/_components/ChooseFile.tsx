// ChooseFile.tsx
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChooseFile({ selectedType, onChange }: {
  selectedType: string | null;
  onChange: (value: string) => void;
}) {
  const fileTypes = ["CALENDAR", "HR", "COMPANY", "TOOL", "EMPLOYEE"];

  return (
    <Select onValueChange={onChange} value={selectedType ?? ""}>
      <SelectTrigger className="bg-[#1E2530] border-[#2C2F36] text-[#818994]">
        <SelectValue placeholder="Төрөл сонгох" />
      </SelectTrigger>
      <SelectContent className="bg-[#1E2530] text-secondary">
        <SelectGroup>
          <SelectLabel>Төрөл</SelectLabel>
          {fileTypes.map((file, index) => (
            <SelectItem key={index} value={file}>
              {file}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
