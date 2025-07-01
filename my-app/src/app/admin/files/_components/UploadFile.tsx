import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "postcss";
import { DialogClose } from "@radix-ui/react-dialog";
const UploadFile = () => {
  return (
    <Card className="max-w-sm bg-[#1A1E23] border-gray-600 flex flex-col items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center">
        <UploadCloud className="w-10 h-10 text-white" />
        <p className="text-secondary text-lg">Файл оруулах</p>
        <Label className="text-gray-500">Энд файлаа зөөж оруулна уу?</Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center w-full">
        <Dialog>
          <form className="w-full flex justify-center">
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-[#5987BA] w-1/2">Сонгох</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default UploadFile;
