import axios from "axios";
import { toast } from "sonner";

export const createConversation = async ({ userId }: { userId: string }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/conversation`,
      {
        data: {
          userId,
        },
      }
    );
    if (res.data.success) {
      toast("Шинэ чат амжилттай үүслээ.");
    } else {
      toast("Шинэ чат үүсгэхэд алдаа гарлаа.");
    }
  } catch (error) {
    toast("Шинэ чат үүсгэхэд алдаа гарлаа.");
  }
};
