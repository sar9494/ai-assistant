"use client";

import React, { useState } from "react";
import { Plus, Trash2, File as FileIcon } from "lucide-react";
import AddFileModal from "./AddFileModal";


import { toast } from "sonner";
import { CalendarDate } from "./_components/DatePicker";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EllipsisVertical, Folder, Tag } from "lucide-react";
import { ChooseFile } from "./_components/ChooseFile";
import SearchFile from "./_components/SearchFileByName";
import { Badge } from "@/components/ui/badge";
import UploadFile from "./_components/UploadFile";

export type mockFileDataType = {
  id: string;
  fileName: string;
  url: string;
  type: string;
};

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const { data, refetch, error } = useGetAllFilesQuery();
  // const [deleteFile] = useDelete_FileMutation({
  //   onError: () => toast("Файл устгах үед алдаа гарлаа: "),
  //   onCompleted: () => toast("Файл амжилттай устгагдлаа"),
  // });

  const mockFileData: mockFileDataType[] = [
    {
      id: "1",
      fileName: "project_plan.pdf",
      url: "https://mockserver.com/files/project_plan.pdf",
      type: "COMPANY",
    },
    {
      id: "2",
      fileName: "team_photo.jpg",
      url: "https://mockserver.com/images/team_photo.jpg",
      type: "EMPLOYEE",
    },
    {
      id: "3",
      fileName: "budget_2025.xlsx",
      url: "https://mockserver.com/files/budget_2025.xlsx",
      type: "HR",
    },
    {
      id: "4",
      fileName: "client_contract.docx",
      url: "https://mockserver.com/files/client_contract.docx",
      type: "COMPANY",
    },
    {
      id: "5",
      fileName: "presentation_slides.pptx",
      url: "https://mockserver.com/files/presentation_slides.pptx",
      type: "TOOL",
    },
    {
      id: "6",
      fileName: "product_demo.mp4",
      url: "https://mockserver.com/videos/product_demo.mp4",
      type: "TOOL",
    },
    {
      id: "7",
      fileName: "design_mockup.png",
      url: "https://mockserver.com/images/design_mockup.png",
      type: "TOOL",
    },
    {
      id: "8",
      fileName: "user_guide.pdf",
      url: "https://mockserver.com/docs/user_guide.pdf",
      type: "EMPLOYEE",
    },
    {
      id: "9",
      fileName: "error_log.txt",
      url: "https://mockserver.com/logs/error_log.txt",
      type: "TOOL",
    },
    {
      id: "10",
      fileName: "company_logo.svg",
      url: "https://mockserver.com/assets/company_logo.svg",
      type: "COMPANY",
    },
    {
      id: "11",
      fileName: "project_plan.pdf",
      url: "https://mockserver.com/files/project_plan.pdf",
      type: "COMPANY",
    },
    {
      id: "12",
      fileName: "team_photo.jpg",
      url: "https://mockserver.com/images/team_photo.jpg",
      type: "EMPLOYEE",
    },
    {
      id: "13",
      fileName: "budget_2025.xlsx",
      url: "https://mockserver.com/files/budget_2025.xlsx",
      type: "HR",
    },
    {
      id: "14",
      fileName: "client_contract.docx",
      url: "https://mockserver.com/files/client_contract.docx",
      type: "COMPANY",
    },
    {
      id: "15",
      fileName: "presentation_slides.pptx",
      url: "https://mockserver.com/files/presentation_slides.pptx",
      type: "TOOL",
    },
    {
      id: "16",
      fileName: "product_demo.mp4",
      url: "https://mockserver.com/videos/product_demo.mp4",
      type: "TOOL",
    },
    {
      id: "17",
      fileName: "design_mockup.png",
      url: "https://mockserver.com/images/design_mockup.png",
      type: "TOOL",
    },
    {
      id: "18",
      fileName: "user_guide.pdf",
      url: "https://mockserver.com/docs/user_guide.pdf",
      type: "EMPLOYEE",
    },
    {
      id: "19",
      fileName: "error_log.txt",
      url: "https://mockserver.com/logs/error_log.txt",
      type: "TOOL",
    },
    {
      id: "20",
      fileName: "company_logo.svg",
      url: "https://mockserver.com/assets/company_logo.svg",
      type: "COMPANY",
    },
  ];

  const filteredData = selectedType
    ? mockFileData.filter((file) => file.type === selectedType)
    : mockFileData;

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "EMPLOYEE":
        return "#6566E1";
      case "COMPANY":
        return "#5987BA";
      case "HR":
        return "#B740A1";
      case "TOOL":
        return "#FFAA64";
      default:
        return "#58AF54";
    }
  };

  const handleDeleteFile = async (id: string) => {};
  const getColorsByType = (type: string) => {
    switch (type) {
      case "EMPLOYEE":
        return {
          textColor: "#6566E1",
          backgroundColor: "rgba(101, 102, 225, 0.08)",
        };
      case "COMPANY":
        return {
          textColor: "#5987BA",
          backgroundColor: "rgba(89, 135, 186, 0.08)",
        };
      case "HR":
        return {
          textColor: "#B740A1",
          backgroundColor: "rgba(183, 64, 161, 0.08)",
        };
      case "TOOL":
        return {
          textColor: "#FFAA64",
          backgroundColor: "rgba(255, 170, 100, 0.08)",
        };
      default:
        return {
          textColor: "#58AF54",
          backgroundColor: "rgba(88, 175, 84, 0.08)",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1E23] flex flex-col px-16">
      <div className="max w-full mt-16">
        <p className="text-white text-xl mb-12">Манай файлууд</p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <CalendarDate />
            <ChooseFile
              selectedType={selectedType}
              onChange={(val) => setSelectedType(val)}
            />
          </div>
          <SearchFile searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8 gap-6">
        <UploadFile />
        {filteredData.map((file) => (
          <Card
            key={file.id}
            className=" max-w-sm bg-[#1A1E23] border-gray-600"
          >
            <CardContent
              style={{
                color: getColorsByType(file.type).textColor,
                backgroundColor: getColorsByType(file.type).backgroundColor,
              }}
              className="text-black p-5 flex justify-center items-center m-3 rounded-md h-2/3 bg-gray-600"
            >
              <Folder
                className="w-1/2 h-1/2"
                fill={getBackgroundColor(file.type)}
                stroke={getBackgroundColor(file.type)}
              />
            </CardContent>
            <CardFooter className="flex justify-between items-start w-full">
              <div className="w-2/3 flex flex-col justify-start gap-2 mb-10">
                <p className="font-semibold text-white">{file.fileName}</p>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <Badge
                    style={{
                      color: getColorsByType(file.type).textColor,
                      backgroundColor: getColorsByType(file.type)
                        .backgroundColor,
                    }}
                    className="w-full"
                  >
                    <Tag className="mr-1.5 w-5 h-5" />
                    <p className="truncate">{file.url}</p>
                  </Badge>
                </a>
              </div>
              <EllipsisVertical className="w-6 h-6 cursor-pointer"/>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
