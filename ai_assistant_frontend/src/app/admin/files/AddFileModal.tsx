"use client";

import { useEffect, useState } from "react";
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
import { Exact, GetAllFilesQuery } from "@/generated/graphql";
import { ApolloQueryResult } from "@apollo/client";

const AddFileModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetAllFilesQuery>>;
}) => {
  const { isOpen, onClose, refetch } = props;
  const [file, setFile] = useState<File | undefined>();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFile(undefined);
    }
  }, [isOpen]);

  const handleFileAdded = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    await refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl p-0 shadow-lg">
        <DialogHeader className="px-8 pt-8 pb-2">
          <DialogTitle>Файл нэмэх</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-4 border-none bg-transparent shadow-none px-0 text-base font-medium"
            />
          </div>
          <div
            className={`border-2 rounded-xl p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center ${
              file
                ? "border-blue-400 bg-blue-50 border-dashed"
                : "border-gray-300 border-dashed bg-white"
            }`}
          >
            {file ? (
              <label htmlFor="file">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-2 font-medium">
                  {file.name}
                </span>
                <FileIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-600 font-medium mt-1">
                  Энд дарж файл өөрчилнө үү!
                </p>
              </label>
            ) : (
              <label htmlFor="file">
                <FileIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">
                  Энд дарж файл нэмнэ үү!
                </p>
              </label>
            )}
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || undefined)}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500 text-start mt-2">
            Дэмжигдэх формат: DOCX
          </p>
        </div>
        <DialogFooter className="px-8 pb-8 pt-2">
          <Button
            type="submit"
            onClick={handleFileAdded}
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
