import axios from "axios";
import { toast } from "sonner";
export const deleteMessage = async ({ id }: { id: string }) => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/message`,
      {
        data: {
          id,
        },
      }
    );
    if (data.data.success) {
      toast("Амжилттай мессиж устгалаа.");
    } else {
      toast("Мессиж устгахад алдаа гарлаа.");
    }
  } catch (error) {
    toast("Мессиж устгахад алдаа гарлаа.");
  }
};
