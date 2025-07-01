import axios from "axios";
import { toast } from "sonner";
export const deleteFile = async ({ id }: { id: string }) => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/file`,
      {
        data: {
          id,
        },
      }
    );
    if (data.data.success) {
      toast("Амжилттай файлыг устгалаа.");
    } else {
      toast("Файл устгахад алдаа гарлаа.");
    }
  } catch (error) {
    toast("Файл устгахад алдаа гарлаа.");
  }
};
