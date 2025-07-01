"use client";

import Image from "next/image";
import {
  FileUp,
  MoreVertical,
  CalendarDays,
  User,
  Search,
  Calendar,
  File,
  Loader,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteMessageMutation,
  useUnAnsweredQuestionsQuery,
} from "@/generated/graphql";
import Delete from "./Delete";
import { toast } from "sonner";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function AdminDashboardPage() {
  const { data, refetch } = useUnAnsweredQuestionsQuery();
  const [deleteMessage, { loading }] = useDeleteMessageMutation({
    onError: () => toast("Message устгах үед алдаа гарлаа"),
    onCompleted: () => toast("Message амжилттай устгагдлаа"),
  });

  const handleDeleteFile = async (id: string) => {
    await deleteMessage({ variables: { input: { id } } });
    await refetch();
  };

  const renderStatus = (status: string) => {
    const label: Record<string, string> = {
      pending: "Хүлээгдэж байна",
      success: "Амжилттай",
      irrelevant: "Хамааралгүй",
    };

    const colour: Record<string, string> = {
      pending: "bg-[#735f25]/80 text-[#F5D36C]",
      success: "bg-[#01442e]/80 text-[#34C759]",
      irrelevant: "bg-[#3a3e47] text-gray-300",
    };

    return (
      <span
        className={classNames(
          "inline-flex items-center justify-center rounded-full px-3 py-[2px] text-xs font-medium",
          colour[status] ?? colour.pending
        )}
      >
        {label[status] ?? status}
      </span>
    );
  };

  return (
    <div className="w-full p-8 pl-14">
      <h1 className="text-2xl font-semibold text-white mb-4 ">
        Хариулагдаагүй асуултууд
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-3">
  <div className="relative">
  <select className="appearance-none rounded-lg bg-[#232733] px-3 py-2 pl-10 pr-8 text-gray-400 outline-none">
  <option>Он сар сонгох</option>
    </select>
    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>

  <div className="relative">
    <select className="appearance-none rounded-lg bg-[#232733] px-3 py-2 pl-10 pr-8 text-gray-400 outline-none">
      <option>Ажилтан</option>
    </select>
    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>

  <span className="whitespace-nowrap text-gray-400">32 хайлт</span>

  <div className="relative ml-auto">
    <input
      placeholder="Хайх"
      className="placeholder:text-gray-500 bg-[#232733] pl-10 pr-10 py-2 rounded-lg text-white outline-none"
    />
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-[2px] rounded bg-[#2C303C] py-[1px] px-[4px] text-[10px] font-mono leading-none text-gray-300">
      ⌘ <span className="font-sans">H</span>
    </kbd>
  </div>
</div>
      <div className="mb-4 flex space-x-8 border-b border-[#232733]">
        {["Бүгд", "Шийдсэн", "Шийдээгүй"].map((tab, i) => (
          <button
            key={tab}
            className={classNames(
              "pb-3 transition-colors text-sm",
              i === 0
                ? "border-b-2 border-[#3F72FF] text-white font-semibold"
                : "text-gray-400 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#232733]">
        <table className="min-w-[920px] w-full text-left">
        <thead className="bg-[#1E222B] text-[13px] font-semibold uppercase text-white">
  <tr>
    <th className="w-[70px] p-4">ID</th>
    <th className="p-4">Асуулт</th>

    <th className="w-[220px] p-4">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-400" /> Ажилтан
      </div>
    </th>

    <th className="w-[140px] p-4">
      <div className="flex items-center gap-2">
        <Loader className="w-4 h-4 text-gray-400" /> Төлөв
      </div>
    </th>

    <th className="w-[150px] p-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" /> Огноо
      </div>
    </th>

    <th className="w-[180px] p-4">
      <div className="flex items-center gap-2">
        <File className="w-4 h-4 text-gray-400" /> Файл
      </div>
    </th>

    <th className="w-[80px] p-4" />
  </tr>
</thead>


          <tbody>
            {data?.unansweredMessages.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#20232B] border-t border-[#232733]"
              >
                <td className="p-4 font-mono text-sm text-gray-400">#{item.id}</td>
                <td className="p-4 text-white">{item.content}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.user?.avatarUrl ? (
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
                        {item.user?.name ?? "N/A"}
                      </p>
                      <p className="mt-[2px] text-xs text-gray-400">
                        {item.user?.role ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{renderStatus(item.status ?? "pending")}</td>
                <td className="p-4 text-xs text-gray-400">
                  {dayjs(item.createdAt).fromNow()}
                </td>
                <td className="p-4">
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
                    <FileUp className="h-4 w-4 text-[#3F72FF]" />
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <FileUp className="h-[18px] w-[18px] text-muted-foreground" />
                    </Button>
                    <Delete
                      handleDeleteFile={handleDeleteFile}
                      id={item.id}
                      loading={loading}
                    />
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-[18px] w-[18px] text-gray-400" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {!data?.unansweredMessages?.length && (
              <tr>
                <td colSpan={7} className="p-12 text-center text-gray-500">
                  Мэдээлэл алга
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
