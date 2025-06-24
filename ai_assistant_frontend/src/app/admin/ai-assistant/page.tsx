"use client"; 

import React, { useState } from "react";
import { Plus, Trash2, File as FileIcon } from "lucide-react";
import AddFileModal from "./AddFileModal";
import { useUpload_FileMutation } from "@/generated/graphql";

interface FileCard {
  fileId: string;
  name: string;
  url: string;
  size: number;
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<FileCard[]>([]);
  const [uploadFile] = useUpload_FileMutation();

  const formatSize = (size: number) => {
    if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + "MB";
    if (size > 1024) return (size / 1024).toFixed(1) + "KB";
    return size + "B";
  };

  const handleFileAdded = async (title: string, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const fileId = Math.random().toString(36).substring(2, 10);
    await uploadFile({
      variables: {
        input: {
          fileId,
          name: file.name,
          url,
        },
      },
    });
    setFiles((prev) => [
      ...prev,
      {
        fileId,
        name: file.name,
        url,
        size: file.size,
      },
    ]);
  };

  const handleDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <main className="flex-1 p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h4 className="text-2xl text-gray-800 font-bold">Файлууд</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Plus className="w-3 h-3 mr-2" />
            <span>Файл нэмэх</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-8">
          <input
            type="text"
            placeholder="Гарчгаар хайх"
            className="w-72 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-[#F7FAFC] focus:outline-none"
            disabled
          />
          <button
            className="px-4 py-2 bg-blue-100 text-blue-400 text-sm rounded-lg font-semibold"
            disabled
          >
            Хайх
          </button>
        </div>
        <div className="flex flex-wrap gap-6">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="relative w-56 h-40 bg-[#F7FAFC] rounded-xl shadow-sm flex flex-col items-center justify-center p-4"
            >
              <button
                className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                onClick={() => handleDelete(file.fileId)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <FileIcon className="w-12 h-12 text-blue-400 mb-2" />
              <div className="text-base font-medium text-gray-800 text-center truncate w-full">
                {file.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatSize(file.size)}
              </div>
            </div>
          ))}
        </div>
        <AddFileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileAdded={handleFileAdded}
        />
      </main>
    </div>
  );
};

export default Page;