import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Trash2 } from "lucide-react";

const Delete = (props: {
  handleDeleteFile: (id: string) => Promise<void>;
  id: string;
}) => {
  const { handleDeleteFile, id } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteFile(id)}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px] p-4">
        <DialogHeader className="items-center">
          <div className="bg-yellow-100 rounded-full p-3 mb-2">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <DialogTitle className="text-center text-xl font-medium w-[300px]">
            Асуултыг устгахад итгэлтэй байна уу?
          </DialogTitle>
          <DialogDescription className="p-3 text-gray-900 text-sm font-light bg-gray-100 rounded-md">
            Уг асуултыг устгавал дахин сэргээх боломжгүй болохыг анхаарна уу.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-around w-full gap-2 mt-2">
          <Button
            variant="outline"
            className="w-[49%] border-blue-400 text-blue-600 hover:bg-blue-50"
          >
            Болих
          </Button>
          <Button className="w-[49%] bg-blue-500 hover:bg-blue-600">
            Устгах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
