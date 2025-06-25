"use client";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDelete_FileMutation,
  useUnAnsweredQuestionsQuery,
} from "@/generated/graphql";
import Delete from "./Delete";

export default function AdminDashboardPage() {
  const { data } = useUnAnsweredQuestionsQuery();
  const [deleteFile] = useDelete_FileMutation();

  const handleDeleteFile = async (id: string) => {
    await deleteFile({
      variables: {
        input: {
          id,
        },
      },
    });
  };
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Хариулагдаагүй асуултууд</h1>

      <div className="space-y-4">
        {data?.unansweredMessages.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-slate-100 p-4 rounded-xl"
          >
            <p className="text-base text-gray-800">{item.content}</p>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <FileUp className="w-4 h-4 text-muted-foreground" />
              </Button>

              <Delete handleDeleteFile={handleDeleteFile} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
