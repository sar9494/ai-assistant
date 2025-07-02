"use client";

import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { CalendarDate } from "./_components/DatePicker";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Folder, Tag, Trash } from "lucide-react";
import { ChooseFile } from "./_components/ChooseFile";
import SearchFile from "./_components/SearchFileByName";
import { Badge } from "@/components/ui/badge";
import UploadFile from "./_components/UploadFile";
import { getAllFile } from "@/lib/getAllFile";
import axios from "axios";
import { File } from "@/types/types";
import { da } from "date-fns/locale";

export type mockFileDataType = {
  id: string;
  fileName: string;
  url: string;
  type: string;
  createdAt: string;
};

const Page = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(Boolean);
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [filteredData, setFilteredData] = useState<File[]>([]);

  const mockFileData: mockFileDataType[] = [
    {
      id: "1",
      fileName: "project_plan.pdf",
      url: "https://mockserver.com/files/project_plan.pdf",
      type: "COMPANY",
      createdAt: "2025-07-01T10:00:00Z",
    },
    {
      id: "2",
      fileName: "team_photo.jpg",
      url: "https://mockserver.com/images/team_photo.jpg",
      type: "EMPLOYEE",
      createdAt: "2025-07-01T10:01:00Z",
    },
    {
      id: "3",
      fileName: "budget_2025.xlsx",
      url: "https://mockserver.com/files/budget_2025.xlsx",
      type: "HR",
      createdAt: "2025-07-01T10:02:00Z",
    },
    {
      id: "4",
      fileName: "client_contract.docx",
      url: "https://mockserver.com/files/client_contract.docx",
      type: "COMPANY",
      createdAt: "2025-07-01T10:03:00Z",
    },
    {
      id: "5",
      fileName: "presentation_slides.pptx",
      url: "https://mockserver.com/files/presentation_slides.pptx",
      type: "TOOL",
      createdAt: "2025-07-01T10:04:00Z",
    },
    {
      id: "6",
      fileName: "product_demo.mp4",
      url: "https://mockserver.com/videos/product_demo.mp4",
      type: "TOOL",
      createdAt: "2025-07-01T10:05:00Z",
    },
    {
      id: "7",
      fileName: "design_mockup.png",
      url: "https://mockserver.com/images/design_mockup.png",
      type: "TOOL",
      createdAt: "2025-07-01T10:06:00Z",
    },
    {
      id: "8",
      fileName: "user_guide.pdf",
      url: "https://mockserver.com/docs/user_guide.pdf",
      type: "EMPLOYEE",
      createdAt: "2025-07-01T10:07:00Z",
    },
    {
      id: "9",
      fileName: "error_log.txt",
      url: "https://mockserver.com/logs/error_log.txt",
      type: "TOOL",
      createdAt: "2025-07-01T10:08:00Z",
    },
    {
      id: "10",
      fileName: "company_logo.svg",
      url: "https://mockserver.com/assets/company_logo.svg",
      type: "COMPANY",
      createdAt: "2025-07-01T10:09:00Z",
    },
    // ... repeat for ids 11–20 with incremented timestamps or random values
  ];
  const filteredByDate = selectedDate
    ? mockFileData.filter((file) => {
        const fileDate = new Date(file.createdAt);
        return (
          fileDate.getFullYear() === selectedDate.getFullYear() &&
          fileDate.getMonth() === selectedDate.getMonth() &&
          fileDate.getDate() === selectedDate.getDate()
        );
      })
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
  const fetchFilesByName = async (name: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/file/searchName?name=${name}`
      );
      setFilteredData(res.data.files);
    } catch (error) {
      toast("Файл хайхад алдаа гарлаа.");
    }
  };
  useEffect(() => {
    fetchFilesByName(searchTerm);
    setFilteredData(
      selectedType
        ? allFiles.filter((file) => file.type === selectedType)
        : allFiles
    );
  }, [searchTerm, selectedType]);

  const handleDeleteFile = async (id: string) => {
    try {
      setDeleteLoader(true);
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/file`,
        {
          data: {
            id,
          },
        }
      );
      await fetchData();
      if (data.data.success) {
        toast("Амжилттай файлыг устгалаа.");
      } else {
        toast("Файл устгахад алдаа гарлаа.");
      }
    } catch (error) {
      toast("Файл устгахад алдаа гарлаа.");
    } finally {
      setDeleteLoader(false);
    }
  };
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
  const fetchData = async () => {
    const files = await getAllFile();
    setAllFiles(files);
    console.log(files);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1E23] flex flex-col px-16">
      <div className="max w-full mt-16">
        <p className="text-white text-xl mb-12">Манай файлууд</p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <CalendarDate date={date} setDate={setDate} />
            <ChooseFile
              selectedType={selectedType}
              onChange={(val) => setSelectedType(val)}
            />
          </div>
          <SearchFile searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8 gap-6 overflow-x-auto scrollbar-hide">
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
            <CardFooter className="flex justify-between items-start  w-full ">
              <div className="w-2/3 flex flex-col justify-start gap-2 mb-10">
                <p className="font-semibold text-white">{file.name}</p>
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
              {deleteLoader ? (
                <span
                  className={`loading loading-spinner text-[${
                    getColorsByType(file.type).textColor
                  }] loading-sm`}
                ></span>
              ) : (
                <Trash
                  className="w-6 h-6 cursor-pointer"
                  color={getColorsByType(file.type).textColor}
                  onClick={() => handleDeleteFile(file.id.toString())}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
