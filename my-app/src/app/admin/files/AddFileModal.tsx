"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { FileIcon, Plus, UploadCloud } from "lucide-react";
import { toast } from "sonner";

export const AddFile = () => {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | undefined>();
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleFileAdded = async () => {
    setLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("type", type);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      toast("Файл оруулахад алдаа гарлаа.");
    } finally {
      setLoading(false);
      toast("Файл амжилттай орууллаа.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex w-full justify-start  text-white hover:bg-[#20232B]"
        >
          <Plus className="h-4 w-4 text-[#3F72FF]" />
          <p className="text-[#3F72FF]">Файл оруулах</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Файл оруулах</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Файлын мэдээллийг бөглөөд хадгалаарай.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Файлын гарчиг
            </Label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 mt-1 rounded-lg bg-gray-100 text-sm focus:outline-none"
              placeholder="Жишээ: Ажлын журам"
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-gray-700">
              Файлын төрөл
            </Label>
            <Select onValueChange={(val) => setType(val)}>
              <SelectTrigger className="w-full border px-4 py-2 rounded-lg bg-gray-100 text-sm mt-1">
                <SelectValue placeholder="Сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Төрөл</SelectLabel>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="COMPANY">Company</SelectItem>
                  <SelectItem value="TOOL">Tool</SelectItem>
                  <SelectItem value="CALENDAR">Calendar</SelectItem>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div
            className={`border-2 rounded-lg p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center ${
              file ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            <label htmlFor="file" className="w-full cursor-pointer">
              {file ? (
                <>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-2 font-medium">
                    {file.name}
                  </span>
                  <FileIcon className="w-8 h-8 text-blue-400 mx-auto" />
                  <p className="text-blue-600 text-sm mt-2">
                    Энд дарж файл өөрчлөх
                  </p>
                </>
              ) : (
                <>
                  <FileIcon className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">
                    Энд дарж файл нэмэх
                  </p>
                </>
              )}
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || undefined)}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-gray-400 mt-1">Дэмжигдэх формат: DOCX</p>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Болих</Button>
          </DialogClose>
          <Button onClick={handleFileAdded}>
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Файл оруулах"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
