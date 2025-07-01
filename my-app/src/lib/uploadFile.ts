import { toast } from "sonner";

export const uploadFile = async ({ formData }: { formData: FormData }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}}/api/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    if (data.data.success) {
      toast("Файл амжилттай орууллаа.");
    } else {
      toast("Файл оруулахад алдаа гарлаа.");
    }
  } catch (error) {
    toast("Файл оруулахад алдаа гарлаа.");
  }
};
