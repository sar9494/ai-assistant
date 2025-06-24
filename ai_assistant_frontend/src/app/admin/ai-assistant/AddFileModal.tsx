"use client";

import React, { useRef, useState } from "react";
import { File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AddFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileAdded: (title: string, file: File | null) => void;
}

const AddFileModal: React.FC<AddFileModalProps> = ({
  isOpen,
  onClose,
  onFileAdded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fixedTitle = "Гарчиг";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileDropAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDoneClick = () => {
    onFileAdded(fixedTitle, selectedFile); 
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl p-0 shadow-lg">
        <DialogHeader className="px-8 pt-8 pb-2">
          <DialogTitle>
            Файл нэмэх
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              value={fixedTitle}
              readOnly
              className="col-span-4 border-none bg-transparent shadow-none px-0 text-base font-medium"
            />
          </div>
          <div
            className={`border-2 rounded-xl p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center ${
              selectedFile
                ? "border-blue-400 bg-blue-50 border-dashed"
                : "border-gray-300 border-dashed bg-white"
            }`}
            onClick={handleFileDropAreaClick}
          >
            {selectedFile ? (
              <>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-2 font-medium">
                  {selectedFile.name}
                </span>
                <FileIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-600 font-medium mt-1">
                  Энд дарж файл өөрчилнө үү!
                </p>
              </>
            ) : (
              <>
                <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">
                  Энд дарж файл нэмнэ үү!
                </p>
              </>
            )}
            <Input
              id="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Дэмжигдэх формат: DOCX
          </p>
        </div>
        <DialogFooter className="px-8 pb-8 pt-2">
          <Button
            type="submit"
            onClick={handleDoneClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 text-base shadow-none"
          >
            Болсон
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFileModal;
