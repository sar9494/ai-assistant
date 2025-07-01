"use client";

import React, { useState } from "react";
import { Plus, Trash2, File as FileIcon } from "lucide-react";
import AddFileModal from "./AddFileModal";

import { toast } from "sonner";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatSize = (size: number) => {
    if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + "MB";
    if (size > 1024) return (size / 1024).toFixed(1) + "KB";
    return size + "B";
  };

  const handleDeleteFile = async (id: string) => {};

  return (
    <div className="min-h-screen bg-white  text-black flex flex-col">
      <main className="flex-1 p-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h4 className="text-2xl text-black">Файлууд</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center pr-4 p-2 mr-20 bg-blue-600 text-white rounded-lg shadow-md "
          >
            <Plus className="w-5 h-5 mr-1" />
            <span>Файл нэмэх</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-8">
          <input
            type="text"
            placeholder="Гарчгаар хайх"
            className="w-72 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-[#F7FAFC] focus:outline-none"
          />
          <button
            className="px-4 py-2 bg-blue-100 text-blue-400 text-sm rounded-lg font-semibold"
            disabled
          >
            Хайх
          </button>
        </div>
        <div className="flex flex-wrap gap-6">
          {/* {data?.files.map((file) => ( */}
          <div
            // key={file.id}
            className="relative w-56 h-40 bg-[#F7FAFC] rounded-xl shadow-sm flex flex-col items-center justify-center p-4"
          >
            <button
              className="absolute top-3 right-3 text-red-400 hover:text-red-600"
              // onClick={() => handleDeleteFile(file.id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <FileIcon className="w-12 h-12 text-blue-400 mb-2" />
            <div className="text-base font-medium text-gray-800 text-center truncate w-full">
              {/* {file.name} */}
            </div>
            <div className="text-xs text-gray-500 mt-1">{formatSize(2)}</div>
          </div>
          {/* ))} */}
        </div>
        <AddFileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // refetch={refetch}
        />
      </main>
    </div>
  );
};

export default Page;
