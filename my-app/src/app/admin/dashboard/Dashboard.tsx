"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, User, Calendar, File, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Delete from "./Delete";
import SearchFile from "../files/_components/SearchFileByName";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function AdminDashboardPage() {
  const mockMessages = [
    {
      id: "1",
      content: "Та надад ажлын хувцас өгнө үү?",
      createdAt: "2025-07-01T09:20:00Z",
      file: {
        url: "#",
        name: "clothing_request.pdf",
      },
      user: {
        name: "Бат-Эрдэнэ",
        role: "Ажилтан",
        avatarUrl: "",
      },
    },
    {
      id: "2",
      content: "Цалингийн хуулга илгээж өгнө үү?",
      createdAt: "2025-06-29T12:15:00Z",
      file: null,
      user: {
        name: "Сарангэрэл",
        role: "Нягтлан",
        avatarUrl: "",
      },
    },
    {
      id: "3",
      content: "Өчигдрийн эвдэрсэн төхөөрөмжийн талаар мэдээлэл хэрэгтэй.",
      createdAt: "2025-06-30T15:45:00Z",
      file: {
        url: "#",
        name: "device_report.docx",
      },
      user: {
        name: "Ган-Очир",
        role: "Тоног төхөөрөмж",
        avatarUrl: "",
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const loading = false;

  const handleDeleteFile = async (id: string) => {
    toast.success(`Мессеж устгагдлаа: ID #${id}`);
  };

  return (
    <div className="min-h-screen bg-[#1A1E23] flex flex-col px-16">
      <div className="max w-full mt-16">
        <p className="text-white text-xl mb-12">Хариулаагүй асуултууд</p>
        <div className="flex justify-between">
          <div className="flex gap-4">
          </div>
          <SearchFile searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#232733] mt-10">
        <Table className="min-w-[920px] w-full text-left">
          <TableHeader className="w=-full bg-[#1E2530] text-[13px] font-semibold text-md">
            <TableRow>
              <TableHead className="w-[70px] p-4 text-white">ID</TableHead>
              <TableHead className="p-4 text-white">Асуулт</TableHead>
              <TableHead className="w-[220px] p-4">
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-gray-400"/> Ажилтан
                </div>
              </TableHead>
              <TableHead className="w-[150px] p-4">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4 text-gray-400"/> Огноо
                </div>
              </TableHead>
              <TableHead className="w-[180px] p-4">
                <div className="flex items-center gap-2 text-white">
                  <File className="w-4 h-4 text-gray-400" />
                  Файл
                </div>
              </TableHead>
              <TableHead className="w-[80px] p-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMessages.map((item, index) => (
              <TableRow
                key={item.id}
                className="transition-colors hover:bg-[#20232B] border-t border-[#232733]"
              >
                <TableCell className="p-4 font-mono text-sm text-gray-400">
                  #{index + 1}
                </TableCell>
                <TableCell className="p-4 text-white">{item.content}</TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-3">
                    {item.user.avatarUrl ? (
                      <Image
                        width={32}
                        height={32}
                        src={item.user.avatarUrl}
                        alt={item.user.name}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
                        <MoreVertical className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="leading-none text-white">
                        {item.user.name}
                      </p>
                      <p className="mt-[2px] text-xs text-gray-400">
                        {item.user.role}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-4 text-xs text-gray-400">
                  {dayjs(item.createdAt).fromNow()}
                </TableCell>
                <TableCell className="p-4">
                  {item.file ? (
                    <a
                      href={item.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline text-[#3F72FF]"
                    >
                      {item.file.name}
                    </a>
                  ) : (
                    <Button variant="ghost" size="icon" className="flex w-full justify-start  text-white hover:bg-[#20232B]">
                    <Plus className="h-4 w-4 text-[#3F72FF]"/>
                    <p className="text-[#3F72FF]">Файл оруулах</p>
                    </Button>
                  )}
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-1">
                    <Delete
                      handleDeleteFile={handleDeleteFile}
                      id={item.id}
                      loading={loading}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!mockMessages.length && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="p-12 text-center text-gray-500"
                >
                  Мэдээлэл алга
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
