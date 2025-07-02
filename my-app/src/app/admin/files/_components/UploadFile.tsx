"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { FileIcon, UploadCloud } from "lucide-react";
import { toast } from "sonner";

export const UploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleFileAdded = async () => {
    if (!file) {
      toast("Файл сонгоно уу.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("type", type);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      toast("Файл амжилттай орууллаа.");
    } catch (error) {
      toast("Файл оруулахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#1A1E23] border-2 border-dashed border-[#2C2F36] p-6 rounded-2xl shadow-none">
      <CardContent className="py-6 mt-12 flex flex-col items-center text-white">
        <UploadCloud className="w-10 h-10 mb-2 text-white" />
        <p className="text-xl font-semibold">Файл оруулах</p>
        <Label className="text-sm text-[#7C7F85]">Энд дарж файлаа оруулна уу</Label>
      </CardContent>

      <CardFooter className="w-full flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#5987BA] w-1/2 border-none rounded-xl text-white"
            >
              Сонгох
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg bg-[#1B202F] rounded-xl p-6 border border-[#2C2F36] shadow-none">
            <DialogHeader>
              <DialogTitle className="text-lg text-white font-bold">Файл оруулах</DialogTitle>
              <DialogDescription className="text-sm text-[#7C7F85]">
                Файлын мэдээллийг бөглөөд хадгалаарай.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Файлын гарчиг
                </Label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#2C2F36] px-4 py-2 mt-1 rounded-lg bg-[#101523] text-white text-sm placeholder:text-gray-500 focus:outline-none"
                  placeholder="Жишээ: Ажлын журам"
                />
              </div>

              <div>
                <Label htmlFor="type" className="text-white">
                  Файлын төрөл
                </Label>
                <Select onValueChange={(val) => setType(val)}>
                  <SelectTrigger className="w-full border border-[#2C2F36] px-4 py-2 rounded-lg bg-[#101523] text-sm text-white mt-1 ">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1B202F] text-white border border-[#2C2F36]">
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
                  file ? "border-blue-400 bg-[#182533]" : "border-[#2C2F36] bg-[#101523]"
                }`}
              >
                <label htmlFor="file" className="w-full cursor-pointer">
                  {file ? (
                    <>
                      <span className="inline-block bg-[#2C2F36] text-[#D1D5DB] text-xs px-3 py-1 rounded-full mb-2 font-medium truncate block max-w-full">
                        {file.name}
                      </span>
                      <FileIcon className="w-8 h-8 text-[#D1D5DB] mx-auto" />
                      <p className="text-[#D1D5DB] text-sm mt-2">Энд дарж файл өөрчлөх</p>
                    </>
                  ) : (
                    <>
                      <FileIcon className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-400 mt-2">Энд дарж файл нэмэх</p>
                    </>
                  )}
                  <input
                    id="file"
                    type="file"
                    accept=".docx"
                    onChange={(e) => setFile(e.target.files?.[0] || undefined)}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-xs text-[#7C7F85] mt-1">Дэмжигдэх формат: DOCX</p>
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-[#101523] text-white border-[#2C2F36] hover:bg-white hover:text-[#101523] transition-colors duration-200"
                >
                  Болих
                </Button>
              </DialogClose>
              <Button
                disabled={loading || !file || !name || !type}
                className="bg-[#101523] text-white border border-[#2C2F36] hover:bg-white hover:text-[#101523] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleFileAdded}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Файл оруулах"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
