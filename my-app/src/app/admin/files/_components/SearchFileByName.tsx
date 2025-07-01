import { Input } from "@/components/ui/input";
import { Command, Heading, Search } from "lucide-react";

type SearchFileProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};
const SearchFile = (props: SearchFileProps) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <div className="relative max-w-md mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#818994] w-5 h-5" />
      <Input
        type="text"
        placeholder="Хайх..."
        className="pl-10 pr-10 bg-[#1E2530] text-[#818994] w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-[38px] top-1/2 -translate-y-1/2 bg-[#455072] w-6 h-6 rounded flex items-center justify-center p-1">
        <Command size={20.74} className="text-[#98A2B3]" />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#455072] w-6 h-6 rounded flex items-center justify-center p-1">
        <Heading size={20.74} className="text-[#98A2B3]" />
      </div>
    </div>
  );
};

export default SearchFile;
